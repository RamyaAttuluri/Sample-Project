"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChevronsRight, Hatch } from "../Shared";
import {
  CONTACT_ENDPOINT,
  SERVICES as services,
  validateContact,
  type ContactInput,
  type ContactResponse,
} from "@/lib/contact/shared";

const field =
  "mt-2 w-full border border-line-input bg-transparent px-3 py-3 font-mono text-sm text-ink outline-none transition-colors focus:border-focus";
const label = "font-mono text-xs text-ink";

// Maps validated fields back to the <input name> so we can focus the bad one.
const inputNames: Record<keyof ContactInput, string> = {
  firstName: "firstName",
  lastName: "lastName",
  service: "service",
  mobileNumber: "mobile number",
  email: "email",
  message: "message",
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

function newIdempotencyKey(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inFlight = useRef(false);
  const startedAt = useRef(0);
  // Same payload => same key, so a retry after a failure can never send duplicates.
  const attempt = useRef<{ signature: string; key: string } | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const form = e.currentTarget;
    const fd = new FormData(form);

    const result = validateContact({
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      service: fd.get("service"),
      mobileNumber: fd.get("mobile number"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!result.ok) {
      const [first, message] = Object.entries(result.errors)[0] as [keyof ContactInput, string];
      setStatus({ kind: "error", message });
      (form.elements.namedItem(inputNames[first]) as HTMLElement | null)?.focus();
      return;
    }

    const signature = JSON.stringify(result.data);
    if (attempt.current?.signature !== signature) attempt.current = { signature, key: newIdempotencyKey() };

    inFlight.current = true;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.current.key },
        body: JSON.stringify({
          ...result.data,
          _gotcha: fd.get("_gotcha") ?? "",
          elapsedMs: Date.now() - startedAt.current,
        }),
      });
      const body = (await res.json().catch(() => null)) as ContactResponse | null;

      if (res.ok && body?.ok) {
        // Only clear the form once the server confirms both emails were accepted.
        form.reset();
        attempt.current = null;
        startedAt.current = Date.now();
        setStatus({ kind: "success", message: body.message });
      } else {
        setStatus({
          kind: "error",
          message: body?.message ?? "We couldn't send your message right now. Please try again in a few minutes.",
        });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      inFlight.current = false;
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={handleSubmit} className="relative mt-12 grid max-w-4xl gap-x-6 gap-y-7 sm:grid-cols-2">
      <Hatch className="left-[30%] top-10 hidden h-10 w-16 md:block" />
      <Hatch className="right-[25%] top-0 hidden h-8 w-14 md:block" />

      {/* Spam honeypot: off-screen and hidden from assistive tech; humans never fill it. */}
      <div aria-hidden="true" className="absolute -left-[10000px] top-0 h-px w-px overflow-hidden">
        <label>
          Website
          <input name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={label}>
        First Name
        <input name="firstName" required autoComplete="given-name" className={field} />
      </label>
      <label className={label}>
        Last Name
        <input name="lastName" required autoComplete="family-name" className={field} />
      </label>

      <label className={label}>
        Service
        <div className="relative">
          <select name="service" required defaultValue="" className={`${field} appearance-none pr-10 invalid:text-muted`}>
            <option value="" disabled>
              Select Service
            </option>
            {services.map((s) => (
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-ink"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </label>
      <label className={label}>
        Mobile Number
        <input name="mobile number" type="tel" required className={field} />
      </label>

      <label className={`${label} sm:col-span-2`}>
        Mail Address
        <input name="email" type="email" required className={field} />
      </label>

      <label className={`${label} sm:col-span-2`}>
        Message
        <textarea name="message" required rows={7} className={`${field} resize-y`} />
      </label>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="flex items-center gap-3 btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "Sending..." : "Send Message"}
          <ChevronsRight />
        </button>
        {status.kind === "success" && (
          <p role="status" className="font-mono text-sm text-accent">
            {status.message}
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" className="font-mono text-sm text-tone-red">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
