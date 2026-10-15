import "server-only";

/*
 * Server-only configuration for the contact mailer. Values come from
 * environment variables (see .env.example) and must never be prefixed with
 * NEXT_PUBLIC_, which would inline them into the browser bundle.
 */

export interface ContactConfig {
  tenantId: string;
  clientId: string;
  clientSecret: string;
  senderEmail: string;
  receiverEmail: string;
  contactEmail: string;
  companyName: string;
  companyWebsite: string;
}

export class ContactConfigError extends Error {
  constructor(readonly problems: string[]) {
    super(`Contact mailer is misconfigured: ${problems.join("; ")}`);
    this.name = "ContactConfigError";
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let cached: ContactConfig | undefined;

export function getContactConfig(): ContactConfig {
  if (cached) return cached;

  const env = (name: string) => process.env[name]?.trim() ?? "";
  const config: ContactConfig = {
    tenantId: env("MICROSOFT_TENANT_ID"),
    clientId: env("MICROSOFT_CLIENT_ID"),
    clientSecret: env("MICROSOFT_CLIENT_SECRET"),
    senderEmail: env("OUTLOOK_SENDER_EMAIL"),
    receiverEmail: env("COMPANY_RECEIVER_EMAIL"),
    contactEmail: env("COMPANY_CONTACT_EMAIL") || env("OUTLOOK_SENDER_EMAIL"),
    companyName: env("COMPANY_NAME"),
    companyWebsite: env("COMPANY_WEBSITE"),
  };

  // Only variable names are reported, never their values.
  const problems: string[] = [];
  const required: [keyof ContactConfig, string][] = [
    ["tenantId", "MICROSOFT_TENANT_ID"],
    ["clientId", "MICROSOFT_CLIENT_ID"],
    ["clientSecret", "MICROSOFT_CLIENT_SECRET"],
    ["senderEmail", "OUTLOOK_SENDER_EMAIL"],
    ["receiverEmail", "COMPANY_RECEIVER_EMAIL"],
    ["companyName", "COMPANY_NAME"],
    ["companyWebsite", "COMPANY_WEBSITE"],
  ];
  for (const [key, name] of required) if (!config[key]) problems.push(`${name} is missing`);

  for (const [key, name] of [
    ["senderEmail", "OUTLOOK_SENDER_EMAIL"],
    ["receiverEmail", "COMPANY_RECEIVER_EMAIL"],
    ["contactEmail", "COMPANY_CONTACT_EMAIL"],
  ] as const) {
    if (config[key] && !EMAIL_RE.test(config[key])) problems.push(`${name} is not a valid email address`);
  }

  if (config.companyWebsite) {
    try {
      const url = new URL(config.companyWebsite);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error();
    } catch {
      problems.push("COMPANY_WEBSITE is not a valid http(s) URL");
    }
  }

  if (problems.length > 0) throw new ContactConfigError(problems);
  cached = config;
  return config;
}
