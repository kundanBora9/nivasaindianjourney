import nodemailer, { type Transporter } from 'nodemailer';

/* ------------------------------------------------------------------ */
/* Types + validation                                                  */
/* ------------------------------------------------------------------ */

export interface EnquiryInput {
  source: string;
  fullName: string;
  phone: string;
  email?: string;
  destination?: string;
  travelDate?: string;
  travellers?: string;
  hotelCategory?: string;
  message?: string;
}

const clean = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';

/** Returns the cleaned enquiry, or an error message safe to show to the visitor. */
export function validateEnquiry(body: any): { ok: true; data: EnquiryInput } | { ok: false; error: string } {
  const data: EnquiryInput = {
    source: clean(body?.source, 40) || 'website',
    fullName: clean(body?.fullName, 100),
    phone: clean(body?.phone, 30),
    email: clean(body?.email, 150),
    destination: clean(body?.destination, 150),
    travelDate: clean(body?.travelDate, 100),
    travellers: clean(body?.travellers, 100),
    hotelCategory: clean(body?.hotelCategory, 100),
    message: clean(body?.message, 3000)
  };

  if (data.fullName.length < 2) return { ok: false, error: 'Please enter your full name.' };
  if (!/^[+()\d][\d\s\-().+]{6,28}$/.test(data.phone) || data.phone.replace(/\D/g, '').length < 7) {
    return { ok: false, error: 'Please enter a valid phone / WhatsApp number.' };
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
    return { ok: false, error: 'Please enter a valid email address, or leave it blank.' };
  }
  return { ok: true, data };
}

/* ------------------------------------------------------------------ */
/* Gmail SMTP transport                                                */
/* ------------------------------------------------------------------ */

const env = (k: string) => (process.env[k] || '').trim();

export const mailConfigured = () => Boolean(env('GMAIL_USER') && env('GMAIL_APP_PASSWORD'));
const dryRun = () => env('MAIL_DRY_RUN') === 'true';

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporter) return transporter;
  transporter = dryRun()
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL
        auth: { user: env('GMAIL_USER'), pass: env('GMAIL_APP_PASSWORD').replace(/\s/g, '') },
        connectionTimeout: 10_000,
        greetingTimeout: 10_000,
        socketTimeout: 15_000
      });
  return transporter;
}

/** Called once at startup so a wrong password shows up in the logs immediately. */
export async function verifyMail(): Promise<void> {
  if (dryRun()) return console.log('[mail] DRY RUN mode: emails are printed to the console, not sent.');
  if (!mailConfigured()) {
    return console.warn('[mail] GMAIL_USER / GMAIL_APP_PASSWORD not set. Enquiry forms will return an error until you set them in .env');
  }
  try {
    await getTransporter().verify();
    console.log(`[mail] Gmail SMTP ready (sending as ${env('GMAIL_USER')})`);
  } catch (err: any) {
    console.error('[mail] Gmail SMTP login FAILED:', err?.message || err);
    console.error('[mail] Check GMAIL_USER and that GMAIL_APP_PASSWORD is a 16-character App Password (not your normal password).');
  }
}

/* ------------------------------------------------------------------ */
/* Email content                                                       */
/* ------------------------------------------------------------------ */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

const SOURCE_LABEL: Record<string, string> = {
  'enquiry-modal': 'Enquiry popup (Get Personalized Quote)',
  'contact-page': 'Contact page form'
};

function buildOwnerEmail(d: EnquiryInput) {
  const rows: [string, string][] = [
    ['Name', d.fullName],
    ['Phone / WhatsApp', d.phone],
    ['Email', d.email || 'Not provided'],
    ['Tour / Destination', d.destination || 'Not specified'],
    ['Travel date', d.travelDate || 'Flexible / not specified'],
    ['Travellers', d.travellers || 'Not specified'],
    ['Hotel category', d.hotelCategory || 'Not specified'],
    ['Message', d.message || '(none)'],
    ['Submitted from', SOURCE_LABEL[d.source] || d.source]
  ];
  const waNumber = d.phone.replace(/\D/g, '');

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nWhatsApp: https://wa.me/${waNumber}`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:auto;border:1px solid #E8E1DA;border-radius:8px;overflow:hidden">
  <div style="background:#650018;color:#fff;padding:16px 20px"><h2 style="margin:0;font-size:18px">New tour enquiry</h2>
  <p style="margin:4px 0 0;font-size:12px;color:#DFCA95">${esc(d.destination || 'General enquiry')}</p></div>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
  ${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 20px;border-bottom:1px solid #f0ebe4;color:#6B7280;width:38%;vertical-align:top">${esc(k)}</td><td style="padding:10px 20px;border-bottom:1px solid #f0ebe4;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join('')}
  </table>
  <div style="padding:16px 20px"><a href="https://wa.me/${waNumber}" style="background:#047857;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px;font-size:13px;display:inline-block">Reply on WhatsApp</a></div>
</div>`;
  return { text, html };
}

function buildAutoReply(d: EnquiryInput) {
  const text = `Dear ${d.fullName},

Thank you for contacting Nivasa India Journey. We have received your enquiry${
    d.destination ? ` for "${d.destination}"` : ''
  } and our travel specialist will contact you on ${d.phone} with a customised itinerary and quote within a few hours.

For anything urgent, call or WhatsApp us on +91 8126716179.

Warm regards,
Nivasa India Journey
https://nivasaindiajourney.com`;
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:auto;font-size:14px;line-height:1.6;color:#262626">
  <h2 style="color:#650018;margin-bottom:8px">Thank you, ${esc(d.fullName)}</h2>
  <p>We have received your enquiry${d.destination ? ` for <strong>${esc(d.destination)}</strong>` : ''}. Our travel specialist will contact you on <strong>${esc(d.phone)}</strong> with a customised itinerary and quote within a few hours.</p>
  <p>For anything urgent, call or WhatsApp us on <a href="tel:+918126716179" style="color:#650018">+91 8126716179</a>.</p>
  <p style="margin-top:24px">Warm regards,<br><strong>Nivasa India Journey</strong><br><a href="https://nivasaindiajourney.com" style="color:#650018">nivasaindiajourney.com</a></p>
</div>`;
  return { text, html };
}

/* ------------------------------------------------------------------ */
/* Send                                                                */
/* ------------------------------------------------------------------ */

export async function sendEnquiryEmails(d: EnquiryInput): Promise<void> {
  const user = env('GMAIL_USER');
  const to = env('MAIL_TO') || user; // where enquiries land
  const fromName = env('MAIL_FROM_NAME') || 'Nivasa India Journey';
  const t = getTransporter();

  // 1. Email to you (the business). Reply-To is the customer, so "Reply" in Gmail answers them directly.
  const owner = buildOwnerEmail(d);
  const info = await t.sendMail({
    from: `"${fromName} Website" <${user}>`,
    to,
    replyTo: d.email ? `"${oneLine(d.fullName).replace(/"/g, '')}" <${d.email}>` : undefined,
    subject: oneLine(`New Enquiry: ${d.destination || 'General'} | ${d.fullName} | ${d.phone}`),
    text: owner.text,
    html: owner.html
  });
  if (dryRun()) console.log('[mail] DRY RUN owner email:\n', JSON.parse(info.message as string));

  // 2. Optional confirmation to the customer. A failure here must not fail the enquiry.
  if (d.email && env('SEND_AUTO_REPLY') !== 'false') {
    try {
      const reply = buildAutoReply(d);
      await t.sendMail({
        from: `"${fromName}" <${user}>`,
        to: d.email,
        replyTo: to,
        subject: 'We received your India tour enquiry | Nivasa India Journey',
        text: reply.text,
        html: reply.html
      });
    } catch (err: any) {
      console.error('[mail] auto-reply failed (enquiry itself was delivered):', err?.message || err);
    }
  }
}
