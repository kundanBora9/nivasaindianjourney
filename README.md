<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/89e8db52-718b-4fd6-983d-8815828a3b33

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Enquiry emails (Gmail SMTP + Nodemailer)

Both forms (the "Get Personalized Quote" popup and the Contact page) POST to `/api/enquiry`, handled by `server.ts`,
which emails the enquiry to you through Gmail SMTP.

1. In the Google account: turn on **2-Step Verification**, then create an **App Password** at https://myaccount.google.com/apppasswords
2. Copy `.env.example` to `.env` and fill in `GMAIL_USER`, `GMAIL_APP_PASSWORD` (the 16 characters) and `MAIL_TO`.
   Never commit `.env` (it is already git-ignored). On a host, set the same values as environment variables.
3. Run locally in two terminals: `npm run dev:server` (API on :3001) and `npm run dev` (site on :3000, proxies `/api`).
4. Production: `npm run build` then `npm start`. This serves the prerendered site and the API from one Node process.
   Needs a host that runs Node (Render, Railway, a VPS, etc.), not a static-only host.

Set `MAIL_DRY_RUN=true` to test without sending: emails are printed to the console instead.
