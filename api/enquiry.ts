/**
 * Vercel serverless function: POST /api/enquiry
 * Same logic as the Express route in server.ts, using the shared code in server/enquiry.ts.
 * Env vars to set in Vercel (Project Settings > Environment Variables):
 *   GMAIL_USER, GMAIL_APP_PASSWORD, MAIL_TO  (optional: MAIL_FROM_NAME, SEND_AUTO_REPLY)
 */
import { validateEnquiry, sendEnquiryEmails, mailConfigured } from '../server/enquiry.js';

type Req = { method?: string; body?: any; headers: Record<string, string | string[] | undefined>; socket?: { remoteAddress?: string } };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (k: string, v: string) => void };

/* Best-effort rate limit: 5 enquiries / 10 min per IP. Serverless instances are short-lived, so this only
   slows down simple floods; the hidden honeypot field and validation do the rest. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every(t => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > LIMIT;
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const fwd = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (tooMany(ip)) {
    return res.status(429).json({ ok: false, error: 'Too many requests. Please wait a few minutes or call us on +91 8126716179.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }

  // Honeypot: bots fill the hidden field. Pretend success so they move on.
  if (typeof body?.website === 'string' && body.website.trim() !== '') return res.status(200).json({ ok: true });

  const result = validateEnquiry(body);
  if (!result.ok) return res.status(400).json({ ok: false, error: result.error });

  if (!mailConfigured() && process.env.MAIL_DRY_RUN !== 'true') {
    console.error('[enquiry] GMAIL_USER / GMAIL_APP_PASSWORD are not set in the Vercel environment variables');
    return res.status(503).json({ ok: false, error: 'Our enquiry form is temporarily unavailable. Please call or WhatsApp us on +91 8126716179.' });
  }

  try {
    await sendEnquiryEmails(result.data);
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('[enquiry] send failed:', err?.message || err);
    return res.status(502).json({ ok: false, error: 'We could not send your enquiry right now. Please call or WhatsApp us on +91 8126716179.' });
  }
}
