# Sigaram LLC — Website

Static website for Sigaram LLC (women-owned IT staffing, Maryland). Zero frameworks,
zero build step, zero hosting cost.

## What's inside

- `index.html` — home
- `services.html` — direct-hire, contract, contract-to-hire + roles
- `about.html` — story, values, women-owned
- `contact.html` — contact form + info
- `css/styles.css` — full design system (edit colors/type here)
- `js/main.js` — nav, animations, FAQ, form handling
- `images/` — AI-generated originals, no copyright concerns

## Before you deploy — 3 small things

1. **Contact email.** The site uses `info@sigaramllc.com`, which matches the
   real domain — just create that mailbox (or an alias) with your email
   provider. To use a different address instead, search-and-replace it:
   `grep -r "info@sigaramllc.com" .` (it appears in the 4 HTML files).
2. **Contact form.** The form posts to Formspree (free: 50 submissions/month).
   Create a free form at https://formspree.io, then paste your endpoint into
   `js/main.js` where it says `FORMSPREE_ENDPOINT`. One line — that's it.
3. **Domain: sigaramllc.com.** Add it as a custom domain in Cloudflare Pages
   (step 4 below) and update DNS at your registrar.

## Deploy for $0 — Cloudflare Pages

1. Push this folder to a GitHub repo (e.g. `sigaram-website`).
2. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git** → select the repo.
   - Framework preset: **None**
   - Build command: *(leave empty)*
   - Build output directory: `/`
3. Hit **Save and Deploy**. You get a `*.pages.dev` URL instantly.
4. **Custom domain:** in the Pages project → **Custom domains** → add
   `sigaramllc.com` (add `www.sigaramllc.com` too if you want www to work).
   Cloudflare will show you the DNS records to add at your registrar — or move
   the domain's nameservers to Cloudflare for free DNS + proxying.
5. Every `git push` to the repo redeploys automatically.

## Customizing

- **Colors:** edit the `:root` variables at the top of `css/styles.css`
  (`--brand-600`, `--accent-500`, `--navy-900`, …).
- **Fonts:** the Google Fonts link is in each page's `<head>` (Sora + Inter).
- **Copy:** it's plain HTML — edit directly, no build step.

## Cost

$0/month. Cloudflare Pages free tier: unlimited bandwidth, free SSL,
free custom domain. Formspree free tier covers the contact form.
