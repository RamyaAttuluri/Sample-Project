import { createHash, randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";

import { ContactConfigError, getContactConfig } from "@/lib/contact/config";
import { logContact } from "@/lib/contact/log";
import { processInquiry } from "@/lib/contact/service";
import { validateContact, type ContactInput, type ContactResponse } from "@/lib/contact/shared";
import { aliasInquiry, createInquiry, findInquiry, hitRateLimit, type InquiryRecord } from "@/lib/contact/store";

/*
 * POST /api/contact/send-message
 *
 * Validates a contact-form submission and sends, via Microsoft Graph from the
 * company mailbox:
 *   1. a confirmation email to the customer
 *   2. a notification email to the company inbox (Reply-To: customer)
 *
 * Idempotency: send an `Idempotency-Key` header (the website form does). A
 * repeat with the same key never re-sends an accepted email; it replays the
 * result, or re-sends only the email that failed. Without a key, identical
 * payloads are de-duplicated by content fingerprint for 24 hours.
 */

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_TIME_MS = 3_000;
const IDEMPOTENCY_KEY_RE = /^[A-Za-z0-9_-]{16,128}$/;

const LIMITS = {
  requestsPerIp: { limit: 20, windowMs: 10 * 60_000 },
  inquiriesPerIp: { limit: 5, windowMs: 60 * 60_000 },
  inquiriesPerEmail: { limit: 3, windowMs: 60 * 60_000 },
};

function reply(status: number, body: ContactResponse, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function tooMany(retryAfterSec: number) {
  return reply(
    429,
    { ok: false, retryable: true, message: "You've sent several messages in a short time. Please try again a little later." },
    { "Retry-After": String(retryAfterSec) },
  );
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Browsers always send Origin on cross-site POSTs; reject foreign sites. Tools like Postman send none. */
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const extra = (process.env.CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  return originHost === host || extra.includes(origin);
}

function outcomeResponse(record: InquiryRecord, retryAfterSec?: number) {
  const { company, customer } = record.emails;
  if (record.state === "completed") {
    return reply(200, {
      ok: true,
      inquiryId: record.id,
      message: "Thank you! Your message has been sent. A confirmation email is on its way to your inbox.",
    });
  }

  // Not everything was accepted. Nothing is silently dropped: the client keeps
  // the form filled and a retry with the same Idempotency-Key re-sends only
  // the email(s) still pending.
  const message =
    company.status === "accepted" && customer.status !== "accepted"
      ? "We received your inquiry, but couldn't send your confirmation email. Please click Send Message again to retry."
      : "We couldn't send your message right now. Please try again in a few minutes.";
  return reply(
    502,
    { ok: false, retryable: true, inquiryId: record.id, message },
    retryAfterSec !== undefined ? { "Retry-After": String(retryAfterSec) } : undefined,
  );
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    logContact("warn", "rejected_origin");
    return reply(403, { ok: false, message: "Forbidden." });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply(415, { ok: false, message: "Content-Type must be application/json." });
  }

  const ip = clientIp(request);
  const ipKey = hash(ip);
  const blocked = hitRateLimit(`req:${ipKey}`, LIMITS.requestsPerIp.limit, LIMITS.requestsPerIp.windowMs);
  if (blocked) {
    logContact("warn", "rate_limited", { scope: "requests_per_ip" });
    return tooMany(blocked);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return reply(413, { ok: false, message: "Request is too large." });

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > MAX_BODY_BYTES) return reply(413, { ok: false, message: "Request is too large." });
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    raw = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { ok: false, message: "Invalid JSON body." });
  }

  // Spam: honeypot. Real users never see or fill the `_gotcha` field. Bots get
  // a normal-looking success so they don't adapt; no email is sent.
  if (typeof raw._gotcha === "string" && raw._gotcha.trim() !== "") {
    logContact("warn", "spam_honeypot");
    return reply(200, { ok: true, message: "Thank you! Your message has been sent." });
  }

  // Spam: minimum time between the form rendering and submitting.
  if (typeof raw.elapsedMs !== "number" || !Number.isFinite(raw.elapsedMs) || raw.elapsedMs < MIN_FILL_TIME_MS) {
    logContact("warn", "spam_too_fast");
    return reply(400, { ok: false, message: "Please take a moment to review your message, then send it again." });
  }

  const validation = validateContact(raw);
  if (!validation.ok) {
    return reply(422, { ok: false, errors: validation.errors, message: Object.values(validation.errors)[0] ?? "Invalid input." });
  }
  const input: ContactInput = validation.data;

  try {
    getContactConfig();
  } catch (err) {
    if (err instanceof ContactConfigError) logContact("error", "config_invalid", { problems: err.problems.join("; ") });
    else logContact("error", "config_invalid");
    return reply(503, { ok: false, retryable: true, message: "Our messaging service is temporarily unavailable. Please try again later." });
  }

  const fingerprint = hash(JSON.stringify(input));
  const headerKey = request.headers.get("idempotency-key")?.trim();
  if (headerKey && !IDEMPOTENCY_KEY_RE.test(headerKey)) {
    return reply(400, { ok: false, message: "Idempotency-Key must be 16-128 characters of A-Z, a-z, 0-9, '-' or '_'." });
  }
  const key = headerKey ? `key:${headerKey}` : `fp:${fingerprint}`;

  let record = findInquiry(key, fingerprint);
  if (record) {
    if (record.fingerprint !== fingerprint) {
      return reply(422, { ok: false, message: "This Idempotency-Key was already used for a different submission." });
    }
    aliasInquiry(key, record);
    if (record.state === "processing") {
      return reply(409, { ok: false, retryable: true, inquiryId: record.id, message: "Your message is already being sent. Please wait a moment." });
    }
    if (record.state === "completed") {
      logContact("info", "duplicate_replayed", { inquiryId: record.id });
      return outcomeResponse(record);
    }
    logContact("info", "inquiry_resumed", { inquiryId: record.id });
  } else {
    // Only brand-new inquiries count toward the stricter limits, so retrying a
    // partial failure is never blocked.
    const perIp = hitRateLimit(`inq-ip:${ipKey}`, LIMITS.inquiriesPerIp.limit, LIMITS.inquiriesPerIp.windowMs);
    const perEmail = hitRateLimit(`inq-email:${hash(input.email)}`, LIMITS.inquiriesPerEmail.limit, LIMITS.inquiriesPerEmail.windowMs);
    if (perIp || perEmail) {
      logContact("warn", "rate_limited", { scope: perIp ? "inquiries_per_ip" : "inquiries_per_email" });
      return tooMany(Math.max(perIp, perEmail));
    }
    record = createInquiry(key, randomUUID(), fingerprint);
    logContact("info", "inquiry_received", { inquiryId: record.id });
  }

  try {
    const { retryAfterSec } = await processInquiry(record, input);
    return outcomeResponse(record, retryAfterSec);
  } catch (err) {
    // processInquiry handles per-email errors itself; this is a last-resort guard.
    record.state = "failed";
    logContact("error", "inquiry_crashed", { inquiryId: record.id, errorName: (err as Error)?.name });
    return reply(500, { ok: false, retryable: true, inquiryId: record.id, message: "Something went wrong. Please try again." });
  }
}
