import "server-only";

import type { ContactConfig } from "./config";
import type { ContactInput } from "./shared";

/*
 * Email templates. Every user-supplied value goes through escapeHtml().
 * Layout is table-based with inline styles so it renders in Outlook desktop,
 * Outlook on the web, Gmail and mobile clients. Colors mirror
 * src/styles/tokens.css.
 */

const BRAND = {
  primary: "#1f2a3a",
  accent: "#2f8fd8",
  background: "#f4f6f9",
  surface: "#ffffff",
  line: "#d3dbe6",
  muted: "#3d6a99",
  subtle: "#6b7686",
} as const;

const FONT = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function multiline(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

export function formatIst(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
}

interface Row {
  label: string;
  value: string; // already-escaped HTML
}

function detailsTable(rows: Row[]): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border:1px solid ${BRAND.line};">
  ${rows
    .map(
      (r, i) => `
  <tr>
    <td class="stack" valign="top" style="width:34%;padding:12px 16px;${i ? `border-top:1px solid ${BRAND.line};` : ""}background:${BRAND.background};font-family:${FONT};font-size:13px;font-weight:600;color:${BRAND.primary};">${escapeHtml(r.label)}</td>
    <td class="stack" valign="top" style="padding:12px 16px;${i ? `border-top:1px solid ${BRAND.line};` : ""}font-family:${FONT};font-size:14px;line-height:1.55;color:${BRAND.primary};word-break:break-word;">${r.value}</td>
  </tr>`,
    )
    .join("")}
</table>`;
}

function layout(opts: { title: string; preheader: string; companyName: string; body: string; footer: string }): string {
  const company = escapeHtml(opts.companyName);
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<title>${escapeHtml(opts.title)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .container { width: 100% !important; }
    .px { padding-left: 20px !important; padding-right: 20px !important; }
    .stack { display: block !important; width: 100% !important; box-sizing: border-box; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${BRAND.background};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.background};">
  <tr>
    <td align="center" style="padding:32px 12px;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${BRAND.surface};border:1px solid ${BRAND.line};">
        <tr>
          <td style="height:4px;line-height:4px;font-size:0;background:${BRAND.accent};">&nbsp;</td>
        </tr>
        <tr>
          <td class="px" style="padding:24px 40px;background:${BRAND.primary};font-family:${FONT};font-size:18px;font-weight:600;letter-spacing:0.2px;color:#ffffff;">${company}</td>
        </tr>
        <tr>
          <td class="px" style="padding:32px 40px 8px;font-family:${FONT};font-size:15px;line-height:1.6;color:${BRAND.primary};">
            ${opts.body}
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:24px 40px 32px;border-top:1px solid ${BRAND.line};font-family:${FONT};font-size:12px;line-height:1.6;color:${BRAND.subtle};">
            ${opts.footer}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/* ---------- Email 1: customer confirmation ---------- */

export function customerConfirmationEmail(input: ContactInput, config: ContactConfig) {
  const company = escapeHtml(config.companyName);
  const website = escapeHtml(config.companyWebsite);
  const contact = escapeHtml(config.contactEmail);
  const service = escapeHtml(input.service);
  const p = `margin:0 0 16px;`;

  const body = `
<p style="${p}">Dear ${escapeHtml(input.firstName)},</p>
<p style="${p}">Thank you for reaching out to <strong>${company}</strong>!</p>
<p style="${p}">We have successfully received your inquiry regarding <strong style="color:${BRAND.accent};">${service}</strong>.</p>
<p style="${p}">Our team will review your requirements and get back to you as soon as possible.</p>
<p style="margin:24px 0 12px;font-size:16px;font-weight:600;">Your Inquiry Summary</p>
${detailsTable([
  { label: "Name", value: escapeHtml(`${input.firstName} ${input.lastName}`) },
  { label: "Service", value: service },
  { label: "Message", value: multiline(input.message) },
])}
<p style="margin:24px 0 16px;">We appreciate your interest and look forward to assisting you.</p>
<p style="margin:0 0 24px;">Warm Regards,<br><strong>${company} Team</strong></p>`;

  const footer = `
<strong style="color:${BRAND.primary};">${company}</strong><br>
<a href="${website}" style="color:${BRAND.accent};text-decoration:none;">${website}</a><br>
<a href="mailto:${contact}" style="color:${BRAND.accent};text-decoration:none;">${contact}</a><br><br>
You are receiving this email because you submitted the contact form on our website.`;

  return {
    subject: `Thank You for Contacting ${config.companyName}`,
    html: layout({
      title: `Thank You for Contacting ${config.companyName}`,
      preheader: `We've received your inquiry about ${input.service}.`,
      companyName: config.companyName,
      body,
      footer,
    }),
  };
}

/* ---------- Email 2: company notification ---------- */

export function companyNotificationEmail(input: ContactInput, config: ContactConfig, submittedAt: Date, inquiryId: string) {
  const email = escapeHtml(input.email);
  const phone = escapeHtml(input.mobileNumber);
  const telHref = escapeHtml(input.mobileNumber.replace(/[^\d+]/g, ""));
  const fullName = `${input.firstName} ${input.lastName}`;

  const body = `
<p style="margin:0 0 16px;">Hello Team,</p>
<p style="margin:0 0 24px;">A new customer inquiry has been received from the website.</p>
<p style="margin:0 0 12px;font-size:16px;font-weight:600;">Customer Details</p>
${detailsTable([
  { label: "First Name", value: escapeHtml(input.firstName) },
  { label: "Last Name", value: escapeHtml(input.lastName) },
  { label: "Mobile Number", value: `<a href="tel:${telHref}" style="color:${BRAND.accent};text-decoration:none;">${phone}</a>` },
  { label: "Email", value: `<a href="mailto:${email}" style="color:${BRAND.accent};text-decoration:none;">${email}</a>` },
  { label: "Selected Service", value: escapeHtml(input.service) },
  { label: "Message", value: multiline(input.message) },
  { label: "Submitted At", value: escapeHtml(formatIst(submittedAt)) },
])}
<p style="margin:24px 0 16px;">Please review the inquiry and contact the customer. Replying to this email will respond directly to the customer.</p>
<p style="margin:0 0 24px;">Regards,<br><strong>Website Contact System</strong></p>`;

  const footer = `Inquiry ID: ${escapeHtml(inquiryId)}<br>This is an automated notification from the ${escapeHtml(config.companyName)} website contact form.`;

  return {
    subject: `New Contact Inquiry – ${input.service} – ${fullName}`,
    html: layout({
      title: "New Contact Inquiry",
      preheader: `${fullName} enquired about ${input.service}.`,
      companyName: config.companyName,
      body,
      footer,
    }),
  };
}
