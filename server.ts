/**
 * Production + API server.
 *  - POST /api/enquiry  -> validates the form and emails it through Gmail SMTP (nodemailer)
 *  - everything else    -> serves the prerendered site from ./dist (run `npm run build` first)
 *
 * Local dev: run `npm run dev:server` (API on :3001) next to `npm run dev` (Vite on :3000, proxies /api).
 */
import 'dotenv/config';
import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { validateEnquiry, sendEnquiryEmails, mailConfigured, verifyMail } from './server/enquiry';
import { REDIRECTS } from './src/seo/routeMeta';

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const DIST = path.resolve('dist');

app.set('trust proxy', 1); // correct client IPs behind a host / reverse proxy (needed for rate limiting)
app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));

/* ---------------- API ---------------- */

// 5 enquiries per 10 minutes per IP, plenty for a real person, stops form spam
const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Too many requests. Please wait a few minutes or call us on +91 8126716179.' }
});

app.post('/api/enquiry', enquiryLimiter, async (req, res) => {
  // Honeypot: real visitors never see/fill this field, bots do. Pretend success so bots move on.
  if (typeof req.body?.website === 'string' && req.body.website.trim() !== '') {
    return res.json({ ok: true });
  }

  const result = validateEnquiry(req.body);
  if (!result.ok) return res.status(400).json({ ok: false, error: result.error });

  if (!mailConfigured() && process.env.MAIL_DRY_RUN !== 'true') {
    console.error('[enquiry] email is not configured (GMAIL_USER / GMAIL_APP_PASSWORD)');
    return res.status(503).json({
      ok: false,
      error: 'Our enquiry form is temporarily unavailable. Please call or WhatsApp us on +91 8126716179.'
    });
  }

  try {
    await sendEnquiryEmails(result.data);
    return res.json({ ok: true });
  } catch (err: any) {
    console.error('[enquiry] send failed:', err?.message || err);
    return res.status(502).json({
      ok: false,
      error: 'We could not send your enquiry right now. Please call or WhatsApp us on +91 8126716179.'
    });
  }
});

app.all('/api/*', (_req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

/* ---------------- Static site (prerendered by scripts/postbuild.ts) ---------------- */

if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { index: false, redirect: false, maxAge: '7d', setHeaders: res => {
    // HTML must always revalidate so new deploys show up immediately
    if (res.req.url?.endsWith('.html') || res.req.url === '/') res.setHeader('Cache-Control', 'no-cache');
  } }));

  app.get('*', (req, res) => {
    let p = req.path;
    if (p.length > 1 && p.endsWith('/')) return res.redirect(301, p.replace(/\/+$/, '') + (req.url.slice(req.path.length) || ''));

    if (REDIRECTS[p]) return res.redirect(301, REDIRECTS[p]);

    const page = path.join(DIST, p === '/' ? '' : p, 'index.html');
    if (page.startsWith(DIST) && fs.existsSync(page)) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(page);
    }
    // Unknown URL: real 404 status + the noindex 404 page (the React app renders "Page Not Found")
    res.status(404).sendFile(path.join(DIST, '404.html'));
  });
} else {
  console.log('[server] ./dist not found, running API only. Run `npm run build` to serve the full site from here.');
}

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  void verifyMail();
});
