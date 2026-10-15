import "server-only";

import { getContactConfig } from "./config";

/*
 * Minimal Microsoft Graph mail client using the OAuth 2.0 client-credentials
 * flow (app-only). The access token lives only in server memory.
 *
 * A 202 from /sendMail means Exchange Online ACCEPTED the message for
 * processing, not that it was delivered. Bounces (e.g. a mistyped customer
 * address) arrive later as NDRs in the sender mailbox.
 */

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";
const GRAPH_SCOPE = "https://graph.microsoft.com/.default";
const TOKEN_TIMEOUT_MS = 10_000;
const SEND_TIMEOUT_MS = 15_000;
const TOKEN_EXPIRY_SKEW_MS = 5 * 60_000;
const MAX_ATTEMPTS = 3;
const MAX_RETRY_DELAY_MS = 10_000;
const RETRYABLE_STATUS = new Set([408, 429, 500, 502, 503, 504]);

export type GraphErrorKind = "auth" | "permission" | "throttled" | "transient" | "rejected";

export class GraphError extends Error {
  constructor(
    message: string,
    readonly kind: GraphErrorKind,
    readonly status: number,
    readonly code?: string,
    readonly retryAfterMs?: number,
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "GraphError";
  }

  get retryable() {
    return this.kind === "throttled" || this.kind === "transient";
  }
}

/* ---------- Access token (cached, single-flight) ---------- */

let token: { value: string; expiresAt: number } | undefined;
let pendingToken: Promise<string> | undefined;

function invalidateToken() {
  token = undefined;
}

async function getAccessToken(): Promise<string> {
  if (token && Date.now() < token.expiresAt) return token.value;
  pendingToken ??= requestToken().finally(() => {
    pendingToken = undefined;
  });
  return pendingToken;
}

async function requestToken(): Promise<string> {
  const { tenantId, clientId, clientSecret } = getContactConfig();
  let res: Response;
  try {
    res = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: GRAPH_SCOPE,
        grant_type: "client_credentials",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(TOKEN_TIMEOUT_MS),
    });
  } catch (err) {
    throw networkError(err, "token request");
  }

  const body = (await res.json().catch(() => ({}))) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_codes?: number[];
    correlation_id?: string;
  };

  if (!res.ok || !body.access_token) {
    // Only the AADSTS code is surfaced; error_description can echo tenant/app details.
    const code = body.error_codes?.length ? `AADSTS${body.error_codes[0]}` : body.error;
    const kind: GraphErrorKind =
      res.status === 429 ? "throttled" : res.status >= 500 ? "transient" : "auth";
    throw new GraphError(
      `Microsoft Entra ID token request failed (${res.status})`,
      kind,
      res.status,
      code,
      parseRetryAfter(res.headers.get("retry-after")),
      body.correlation_id,
    );
  }

  token = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in ?? 3600) * 1000 - TOKEN_EXPIRY_SKEW_MS,
  };
  return token.value;
}

/* ---------- sendMail ---------- */

export interface MailMessage {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export interface SendResult {
  attempts: number;
  requestId?: string;
}

/**
 * Sends one message from `from` via POST /users/{from}/sendMail, retrying
 * throttling (429, honouring Retry-After), transient 5xx, timeouts and network
 * errors with exponential backoff. A 401 refreshes the token once.
 */
export async function sendMail(from: string, mail: MailMessage, clientRequestId: string): Promise<SendResult> {
  const payload = JSON.stringify({
    message: {
      subject: mail.subject,
      body: { contentType: "HTML", content: mail.html },
      toRecipients: [{ emailAddress: { address: mail.to } }],
      ...(mail.replyTo ? { replyTo: [{ emailAddress: { address: mail.replyTo } }] } : {}),
    },
    saveToSentItems: true,
  });

  let refreshedAfter401 = false;
  for (let attempt = 1; ; attempt++) {
    try {
      const requestId = await postSendMail(from, payload, clientRequestId);
      return { attempts: attempt, requestId };
    } catch (err) {
      const error = err instanceof GraphError ? err : networkError(err, "sendMail");

      // An expired/revoked token: refresh once, immediately, without spending an attempt.
      if (error.kind === "auth" && error.status === 401 && !refreshedAfter401) {
        refreshedAfter401 = true;
        invalidateToken();
        attempt--;
        continue;
      }

      if (!error.retryable || attempt >= MAX_ATTEMPTS) throw error;
      const delay = error.retryAfterMs ?? backoff(attempt);
      if (delay > MAX_RETRY_DELAY_MS) throw error; // don't hold the HTTP request open; the caller can retry later
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function postSendMail(from: string, payload: string, clientRequestId: string): Promise<string | undefined> {
  const accessToken = await getAccessToken();
  let res: Response;
  try {
    res = await fetch(`${GRAPH_BASE}/users/${encodeURIComponent(from)}/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "client-request-id": clientRequestId,
      },
      body: payload,
      cache: "no-store",
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
  } catch (err) {
    throw networkError(err, "sendMail");
  }

  const requestId = res.headers.get("request-id") ?? undefined;
  if (res.status === 202) return requestId;

  const body = (await res.json().catch(() => ({}))) as { error?: { code?: string } };
  const code = body.error?.code;
  const retryAfterMs = parseRetryAfter(res.headers.get("retry-after"));

  let kind: GraphErrorKind;
  if (res.status === 401) kind = "auth";
  else if (res.status === 403) kind = "permission"; // missing Mail.Send consent or mailbox outside the app's RBAC scope
  else if (res.status === 429) kind = "throttled";
  else if (RETRYABLE_STATUS.has(res.status)) kind = "transient";
  else kind = "rejected"; // 400/404 etc.: bad request or sender mailbox not found

  throw new GraphError(`Graph sendMail failed (${res.status})`, kind, res.status, code, retryAfterMs, requestId);
}

/* ---------- helpers ---------- */

function networkError(err: unknown, stage: string): GraphError {
  const timedOut = err instanceof DOMException && (err.name === "TimeoutError" || err.name === "AbortError");
  return new GraphError(`${stage} ${timedOut ? "timed out" : "network error"}`, "transient", 0, timedOut ? "Timeout" : "NetworkError");
}

function backoff(attempt: number): number {
  const base = 1000 * 2 ** (attempt - 1); // 1s, 2s, 4s…
  return base + Math.floor(Math.random() * 250);
}

function parseRetryAfter(header: string | null): number | undefined {
  if (!header) return undefined;
  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);
  const date = Date.parse(header);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}
