# Contact Form Email (Microsoft Graph) – Setup & Testing

When a visitor submits the Contact Us form, `POST /api/contact/send-message` sends two emails from the company's Microsoft 365 mailbox through Microsoft Graph:

| # | To | Reply-To | Subject |
|---|----|----------|---------|
| 1 | Customer | `COMPANY_CONTACT_EMAIL` | Thank You for Contacting {Company} |
| 2 | `COMPANY_RECEIVER_EMAIL` | Customer | New Contact Inquiry – {Service} – {Name} |

Authentication uses OAuth 2.0 client credentials (app-only). The token and secret stay on the server.

---

## 1. Microsoft Entra ID setup

You need a Global Administrator or Privileged Role Administrator for consent, and an Exchange Administrator for step 1.5.

### 1.1 Register the application
1. Go to <https://entra.microsoft.com>, then **Identity → Applications → App registrations → New registration**.
2. Fill in:
   - **Name:** `Website Contact Mailer`
   - **Supported account types:** *Accounts in this organizational directory only (Single tenant)*
   - **Redirect URI:** leave empty.
3. Click **Register**. On the **Overview** page, copy:
   - **Application (client) ID** → `MICROSOFT_CLIENT_ID`
   - **Directory (tenant) ID** → `MICROSOFT_TENANT_ID`

### 1.2 Create a client secret
1. Go to **Certificates & secrets → Client secrets → New client secret**.
2. Enter the description `website-prod` and pick an expiry (24 months at most).
3. Copy the **Value** immediately. It is only shown once. This is `MICROSOFT_CLIENT_SECRET`.
4. Set a calendar reminder to rotate the secret before it expires. An expired secret makes every submission fail with `AADSTS7000222`.

> For stronger security you can use a certificate credential instead of a secret. That would need a small change to `requestToken()` in `src/lib/contact/graph.ts`.

### 1.3 Mail.Send permission and admin consent
The right setup depends on how you restrict mailbox access in step 1.5:

- **Option A: RBAC for Applications (recommended).** Do **not** grant `Mail.Send` in Entra. Permissions granted in Entra apply to *every* mailbox in the tenant and are added on top of any Exchange scope, so leaving a grant in place cancels the restriction. Exchange grants the permission instead, scoped to one mailbox. If you already added `Mail.Send` under API permissions, remove it and revoke admin consent.
- **Option B: Application Access Policy (legacy).** Go to **API permissions → Add a permission → Microsoft Graph → Application permissions → `Mail.Send` → Add**, then click **Grant admin consent for {tenant}**. The status must show a green check.

### 1.4 Prepare the sender mailbox
`OUTLOOK_SENDER_EMAIL` (for example `techops1@ggstinnovations.com`) must be an existing Exchange Online mailbox, either a licensed user mailbox or a **shared mailbox**. A shared mailbox needs no license and is a good fit for this.

### 1.5 Restrict the app to the company mailbox
Run these in PowerShell as an Exchange administrator:

```powershell
Install-Module ExchangeOnlineManagement   # once
Connect-ExchangeOnline -UserPrincipalName admin@ggstinnovations.com
```

**Option A: RBAC for Applications (recommended)**

```powershell
$AppId    = "<Application (client) ID>"
# Object ID of the *Enterprise application* (Entra → Enterprise applications → Website Contact Mailer),
# NOT the object ID shown on the App registration page.
$SpObjId  = "<Enterprise application Object ID>"
$Mailbox  = "techops1@ggstinnovations.com"

New-ServicePrincipal -AppId $AppId -ObjectId $SpObjId -DisplayName "Website Contact Mailer"

New-ManagementScope -Name "Website Contact Mailbox" `
  -RecipientRestrictionFilter "PrimarySmtpAddress -eq '$Mailbox'"

New-ManagementRoleAssignment -App $AppId -Role "Application Mail.Send" `
  -CustomResourceScope "Website Contact Mailbox"

# Verify: InScope should be True for the company mailbox and False for any other mailbox
Test-ServicePrincipalAuthorization -Identity $AppId -Resource $Mailbox
Test-ServicePrincipalAuthorization -Identity $AppId -Resource someone.else@ggstinnovations.com
```

**Option B: Application Access Policy (legacy)**

```powershell
New-DistributionGroup -Name "Website Mailer Senders" -Type Security `
  -PrimarySmtpAddress websitemailer-senders@ggstinnovations.com -Members techops1@ggstinnovations.com

New-ApplicationAccessPolicy -AppId "<Application (client) ID>" `
  -PolicyScopeGroupId websitemailer-senders@ggstinnovations.com `
  -AccessRight RestrictAccess -Description "Website contact form may only send as techops1"

# Verify: AccessCheckResult should be Granted, and Denied for any other mailbox
Test-ApplicationAccessPolicy -Identity techops1@ggstinnovations.com -AppId "<Application (client) ID>"
```

Changes can take 30 minutes to 2 hours to take effect. Until then, Graph may return `403 ErrorAccessDenied`.

---

## 2. Environment configuration

Copy `.env.example` to `.env.local` for local development. For production, set the same variables in your hosting provider's secret settings.

```env
MICROSOFT_TENANT_ID=your_tenant_id
MICROSOFT_CLIENT_ID=your_client_id
MICROSOFT_CLIENT_SECRET=your_client_secret

OUTLOOK_SENDER_EMAIL=techops1@yourcompany.com
COMPANY_RECEIVER_EMAIL=techops1@yourcompany.com
COMPANY_CONTACT_EMAIL=            # optional; defaults to OUTLOOK_SENDER_EMAIL

COMPANY_NAME=GGST Innovations Private Limited
COMPANY_WEBSITE=https://ggstinnovations.com

CONTACT_ALLOWED_ORIGINS=          # optional extra origins, comma-separated
```

- `.env*` files are git-ignored. Only `.env.example` is committed.
- Never prefix these variables with `NEXT_PUBLIC_`.
- Restart `next dev` / `next start` after changing them.
- If any required variable is missing, the API returns `503` and logs the **names** of the missing variables (never their values).

---

## 3. API reference

`POST /api/contact/send-message`

**Headers**

| Header | Required | Notes |
|---|---|---|
| `Content-Type: application/json` | yes | Anything else returns `415`. |
| `Idempotency-Key` | recommended | 16–128 chars of `A–Z a–z 0–9 - _`. The website sends a UUID. |

**Body**

```json
{
  "firstName": "Ramya",
  "lastName": "Attuluri",
  "service": "Enterprise Solutions",
  "mobileNumber": "+91 94909 91949",
  "email": "customer@example.com",
  "message": "We'd like to discuss an ERP rollout.",
  "elapsedMs": 8000,
  "_gotcha": ""
}
```

- `service` must be one of: `Digital Engineering`, `Enterprise Solutions`, `AI, Data & Automation`, `Business operations & BPO`, `ODC & Dedicated Teams`, `Workforce & Staffing`.
- `elapsedMs` is the time in milliseconds the form was open before submitting. It must be at least `3000` (spam check).
- `_gotcha` is a hidden honeypot field. If it is non-empty, the request gets a normal-looking `200` but no email is sent.

**Responses** (all JSON: `{ ok, message, inquiryId?, errors?, retryable? }`)

| Status | Meaning |
|---|---|
| `200` | Both emails were **accepted** by Microsoft Graph (Graph returned 202). The response is the same when an idempotent request is replayed. |
| `400` | Invalid JSON, bad `Idempotency-Key`, or the form was submitted too quickly. |
| `403` | The `Origin` header is from a foreign site. |
| `409` | The same inquiry is already being processed. |
| `413` | The body is larger than 16 KB. |
| `415` | Wrong `Content-Type`. |
| `422` | Validation failed (see `errors`), or the `Idempotency-Key` was reused with a different body. |
| `429` | Rate limited. See the `Retry-After` header. |
| `502` | One or both emails failed after retries. `retryable: true`. Repeating the request with the **same key** re-sends only the email that failed. |
| `503` | The mailer is not configured. |

> **Accepted ≠ delivered.** Graph's `202` means Exchange Online queued the message. If the customer's address doesn't exist, a bounce (NDR) arrives later in the sender mailbox.

### Built-in protections
- **Validation and escaping:** the same validator (`src/lib/contact/shared.ts`) runs in the browser and on the server, and every user value is HTML-escaped in the templates.
- **Rate limits:** 20 requests per IP per 10 min, 5 new inquiries per IP per hour, and 3 new inquiries per email address per hour. Retrying a failed inquiry doesn't count toward the inquiry limits.
- **Idempotency:** the result is keyed by `Idempotency-Key`, or by a hash of the content when there is no key, for 24 hours. A double-click, page retry or duplicate Postman send never produces duplicate emails.
- **Retries:** 429 responses (honouring `Retry-After`), 5xx responses, timeouts and network errors are retried up to 3 times with exponential backoff. A `401` refreshes the token once. `403` and `400` are not retried.
- **Logging:** logs contain only the inquiry ID, email kind, status, Graph `request-id` and error codes (for example `AADSTS7000215` or `ErrorAccessDenied`). They never contain names, emails, phone numbers, messages, tokens or secrets.

### Hosting note
The idempotency, status and rate-limit store lives in server memory (`src/lib/contact/store.ts`), because the project has no database. That works for a single Node server (`next start`, PM2, VM or container). On serverless or multi-instance hosting, back those functions with Redis or a database. Their signatures are designed for that swap. If the site runs behind a proxy or CDN, make sure it sets `X-Forwarded-For`, which the IP rate limit relies on.

---

## 4. Testing with Postman

1. Start the app with real credentials in `.env.local`: `npm run dev`.
2. In Postman, create a request:
   - **Method/URL:** `POST http://localhost:3000/api/contact/send-message`
   - **Headers:**
     - `Content-Type: application/json`
     - `Idempotency-Key: {{$guid}}` (Postman generates a new GUID for each send)
   - **Body → raw → JSON:** use the example body above, with `email` set to an inbox you can check.
3. Click **Send**. You should get `200 {"ok":true,"inquiryId":"…"}`, then:
   - the customer inbox receives "Thank You for Contacting GGST Innovations Private Limited"
   - `COMPANY_RECEIVER_EMAIL` receives "New Contact Inquiry – …"; clicking **Reply** addresses the customer
   - both messages appear in the sender mailbox's **Sent Items**

**Test cases**

| Case | How | Expected |
|---|---|---|
| Idempotent replay | Replace `{{$guid}}` with a fixed value such as `postman-test-key-0001` and send twice | `200` both times, only **one** pair of emails |
| Key reuse with new body | Same fixed key, change `message` | `422` |
| Validation | `"email": "not-an-email"`, `"service": "Other"` | `422` with `errors.email` and `errors.service` |
| Spam: too fast | `"elapsedMs": 500` | `400` |
| Spam: honeypot | `"_gotcha": "x"` | `200`, **no** email sent |
| Rate limit | Send 4 different messages with the same `email` | 4th returns `429` with `Retry-After` |
| Bad secret | Set a wrong `MICROSOFT_CLIENT_SECRET`, restart | `502`; server log shows `AADSTS7000215` |
| Mailbox outside scope | Set `OUTLOOK_SENDER_EMAIL` to a mailbox not in the RBAC scope | `502`; server log shows `403 ErrorAccessDenied` |

### Troubleshooting

| Log code | Cause / fix |
|---|---|
| `AADSTS700016` | Wrong `MICROSOFT_CLIENT_ID` or tenant. |
| `AADSTS7000215` / `AADSTS7000222` | Wrong or expired client secret. Create a new one. |
| `AADSTS90002` | Wrong `MICROSOFT_TENANT_ID`. |
| `403 ErrorAccessDenied` | Missing Mail.Send (consent or RBAC assignment), the mailbox is outside the scope, or the change hasn't propagated yet. |
| `404 ErrorInvalidUser` / `MailboxNotEnabledForRESTAPI` | `OUTLOOK_SENDER_EMAIL` is not an Exchange Online mailbox. |
| `429 ApplicationThrottled` | Graph throttling. Retries happen automatically; persistent throttling returns `502` with `Retry-After`. |
