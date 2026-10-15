/*
 * Contact form contract shared by the browser (ContactForm.tsx) and the API
 * route. Keep this file free of secrets and Node-only imports: it ships to the
 * client bundle.
 */

export const SERVICES = [
  "Digital Engineering",
  "Enterprise Solutions",
  "AI, Data & Automation",
  "Business operations & BPO",
  "ODC & Dedicated Teams",
  "Workforce & Staffing",
] as const;

export type Service = (typeof SERVICES)[number];

export const CONTACT_ENDPOINT = "/api/contact/send-message";

export interface ContactInput {
  firstName: string;
  lastName: string;
  service: Service;
  mobileNumber: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export type ValidationResult = { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors };

/** Shape of every JSON response from the send-message endpoint. */
export interface ContactResponse {
  ok: boolean;
  message: string;
  inquiryId?: string;
  errors?: ContactErrors;
  retryable?: boolean;
}

export const LIMITS = {
  name: 50,
  email: 254,
  messageMin: 10,
  messageMax: 3000,
} as const;

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
const PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/;

// Control characters (incl. CR/LF) are stripped from single-line fields so they
// can never break an email subject or header.
const CONTROL_CHARS = new RegExp("[\u0000-\u001F\u007F-\u009F\u2028\u2029]", "g");
const CONTROL_CHARS_EXCEPT_NEWLINE = new RegExp("[\u0000-\u0008\u000B-\u001F\u007F-\u009F\u2028\u2029]", "g");

function singleLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.normalize("NFC").replace(CONTROL_CHARS, " ").replace(/\s+/g, " ").trim();
}

function multiLine(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .normalize("NFC")
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS_EXCEPT_NEWLINE, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function validateName(value: string, label: string): string | undefined {
  if (!value) return `${label} is required.`;
  if (value.length > LIMITS.name) return `${label} must be ${LIMITS.name} characters or fewer.`;
  if (!NAME_RE.test(value)) return `${label} contains invalid characters.`;
}

/** Normalizes and validates raw form input. Runs on both client and server. */
export function validateContact(raw: Record<string, unknown>): ValidationResult {
  const data = {
    firstName: singleLine(raw.firstName),
    lastName: singleLine(raw.lastName),
    service: singleLine(raw.service),
    mobileNumber: singleLine(raw.mobileNumber),
    email: singleLine(raw.email).toLowerCase(),
    message: multiLine(raw.message),
  };
  const errors: ContactErrors = {};

  const first = validateName(data.firstName, "First name");
  if (first) errors.firstName = first;
  const last = validateName(data.lastName, "Last name");
  if (last) errors.lastName = last;

  if (!(SERVICES as readonly string[]).includes(data.service)) errors.service = "Please select a service.";

  const digits = data.mobileNumber.replace(/\D/g, "").length;
  if (!data.mobileNumber) errors.mobileNumber = "Mobile number is required.";
  else if (!PHONE_RE.test(data.mobileNumber) || digits < 7 || digits > 15)
    errors.mobileNumber = "Please enter a valid mobile number.";

  if (!data.email) errors.email = "Email address is required.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email))
    errors.email = "Please enter a valid email address.";

  if (data.message.length < LIMITS.messageMin)
    errors.message = `Please enter a message of at least ${LIMITS.messageMin} characters.`;
  else if (data.message.length > LIMITS.messageMax)
    errors.message = `Message must be ${LIMITS.messageMax} characters or fewer.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: data as ContactInput };
}
