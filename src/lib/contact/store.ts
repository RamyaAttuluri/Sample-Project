import "server-only";

/*
 * Inquiry + email-processing status store, used for idempotency and for
 * resuming partial failures.
 *
 * The project has no database, so this is in-process memory with a TTL. That
 * is correct for a single long-running Node server (`next start`, PM2, a VM or
 * container). On serverless / multi-instance hosting each instance has its own
 * memory, so swap these functions for a shared store (Redis, Postgres, Cosmos…)
 * with the same signatures; nothing else needs to change.
 */

export type EmailKind = "company" | "customer";
export type EmailStatus = "pending" | "accepted" | "failed";
export type InquiryState = "processing" | "completed" | "partial" | "failed";

export interface EmailRecord {
  status: EmailStatus;
  /** Processing runs for this email (each run may make several Graph retries). */
  attempts: number;
  graphRequestId?: string;
  lastErrorCode?: string;
  acceptedAt?: string;
}

export interface InquiryRecord {
  id: string;
  fingerprint: string;
  state: InquiryState;
  createdAt: number;
  updatedAt: number;
  emails: Record<EmailKind, EmailRecord>;
}

const TTL_MS = 24 * 60 * 60_000;
const MAX_RECORDS = 5_000;

interface StoreState {
  byKey: Map<string, InquiryRecord>;
  byFingerprint: Map<string, InquiryRecord>;
  rate: Map<string, { count: number; resetAt: number }>;
}

// Kept on globalThis so dev-mode hot reloads don't wipe it.
const g = globalThis as typeof globalThis & { __contactStore?: StoreState };
const state: StoreState = (g.__contactStore ??= { byKey: new Map(), byFingerprint: new Map(), rate: new Map() });

function prune(now: number) {
  for (const map of [state.byKey, state.byFingerprint]) {
    for (const [k, r] of map) if (now - r.createdAt > TTL_MS) map.delete(k);
    // Maps iterate in insertion order, so the first entries are the oldest.
    while (map.size > MAX_RECORDS) map.delete(map.keys().next().value!);
  }
  for (const [k, r] of state.rate) if (now >= r.resetAt) state.rate.delete(k);
}

export function findInquiry(key: string, fingerprint: string): InquiryRecord | undefined {
  prune(Date.now());
  return state.byKey.get(key) ?? state.byFingerprint.get(fingerprint);
}

export function createInquiry(key: string, id: string, fingerprint: string): InquiryRecord {
  const now = Date.now();
  const record: InquiryRecord = {
    id,
    fingerprint,
    state: "processing",
    createdAt: now,
    updatedAt: now,
    emails: {
      company: { status: "pending", attempts: 0 },
      customer: { status: "pending", attempts: 0 },
    },
  };
  state.byKey.set(key, record);
  state.byFingerprint.set(fingerprint, record);
  return record;
}

/** Lets a retry that arrives with a new key (e.g. from Postman) map onto the same record. */
export function aliasInquiry(key: string, record: InquiryRecord) {
  state.byKey.set(key, record);
}

/**
 * Fixed-window counter. Returns the seconds until the window resets when the
 * limit is exceeded, otherwise 0.
 */
export function hitRateLimit(key: string, limit: number, windowMs: number): number {
  const now = Date.now();
  const entry = state.rate.get(key);
  if (!entry || now >= entry.resetAt) {
    state.rate.set(key, { count: 1, resetAt: now + windowMs });
    return 0;
  }
  entry.count++;
  return entry.count > limit ? Math.ceil((entry.resetAt - now) / 1000) : 0;
}
