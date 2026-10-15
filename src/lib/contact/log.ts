import "server-only";

/*
 * Structured logging for the contact mailer.
 *
 * PRIVACY RULE: only pass identifiers, statuses and error codes here, never
 * names, emails, phone numbers, message text, tokens or secrets. The field
 * types below intentionally only allow primitives so nothing nested (like a
 * request body) slips through.
 *
 * Note: next.config.ts strips console.info in production builds, so only
 * warnings/errors (console.error) are emitted there.
 */

type LogFields = Record<string, string | number | boolean | undefined>;

export function logContact(level: "info" | "warn" | "error", event: string, fields: LogFields = {}) {
  const line = JSON.stringify({ ts: new Date().toISOString(), scope: "contact", level, event, ...fields });
  if (level === "info") console.info(line);
  else console.error(line);
}
