import "server-only";

import { getContactConfig } from "./config";
import { GraphError, sendMail, type MailMessage } from "./graph";
import { logContact } from "./log";
import type { ContactInput } from "./shared";
import type { EmailKind, InquiryRecord } from "./store";
import { companyNotificationEmail, customerConfirmationEmail } from "./templates";

export interface ProcessOutcome {
  record: InquiryRecord;
  /** Smallest Retry-After hint from Graph when throttled, in seconds. */
  retryAfterSec?: number;
}

/**
 * Sends whichever of the two emails is not yet accepted. Both are attempted
 * independently and in parallel, so a failure of one never skips the other,
 * and a retry of a partially failed inquiry only re-sends the missing one.
 */
export async function processInquiry(record: InquiryRecord, input: ContactInput): Promise<ProcessOutcome> {
  const config = getContactConfig();
  const submittedAt = new Date(record.createdAt);

  const build: Record<EmailKind, () => MailMessage> = {
    company: () => ({
      ...companyNotificationEmail(input, config, submittedAt, record.id),
      to: config.receiverEmail,
      replyTo: input.email,
    }),
    customer: () => ({
      ...customerConfirmationEmail(input, config),
      to: input.email,
      replyTo: config.contactEmail,
    }),
  };

  record.state = "processing";
  const kinds = (Object.keys(build) as EmailKind[]).filter((k) => record.emails[k].status !== "accepted");
  let retryAfterSec: number | undefined;

  await Promise.all(
    kinds.map(async (kind) => {
      const email = record.emails[kind];
      try {
        const result = await sendMail(config.senderEmail, build[kind](), `${record.id}-${kind}`);
        email.status = "accepted";
        email.attempts += 1;
        email.graphRequestId = result.requestId;
        email.acceptedAt = new Date().toISOString();
        email.lastErrorCode = undefined;
        logContact("info", "email_accepted", { inquiryId: record.id, kind, attempts: result.attempts, graphRequestId: result.requestId });
      } catch (err) {
        email.status = "failed";
        email.attempts += 1;
        if (err instanceof GraphError) {
          email.lastErrorCode = err.code ?? String(err.status);
          if (err.retryAfterMs !== undefined) {
            const sec = Math.ceil(err.retryAfterMs / 1000);
            retryAfterSec = retryAfterSec === undefined ? sec : Math.min(retryAfterSec, sec);
          }
          logContact("error", "email_failed", {
            inquiryId: record.id,
            kind,
            errorKind: err.kind,
            status: err.status,
            code: err.code,
            graphRequestId: err.requestId,
          });
        } else {
          email.lastErrorCode = "Unexpected";
          logContact("error", "email_failed", { inquiryId: record.id, kind, errorKind: "unexpected", errorName: (err as Error)?.name });
        }
      }
    }),
  );

  const { company, customer } = record.emails;
  record.state =
    company.status === "accepted" && customer.status === "accepted"
      ? "completed"
      : company.status === "accepted" || customer.status === "accepted"
        ? "partial"
        : "failed";
  record.updatedAt = Date.now();

  logContact(record.state === "completed" ? "info" : "warn", "inquiry_processed", {
    inquiryId: record.id,
    state: record.state,
    company: company.status,
    customer: customer.status,
  });

  return { record, retryAfterSec };
}
