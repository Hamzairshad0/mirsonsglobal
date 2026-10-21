# Mirsons Global — Website

B2B lead generation, buyer–supplier matchmaking and international sourcing website.
Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**, a **SQLite/Turso** database, and a built-in
**lead dashboard** and **content editor** at `/admin`.

---

## What's included

| Area | Details |
| --- | --- |
| Public pages | Home, About, Our Services, For Manufacturers & Suppliers, For Buyers, Industries We Serve, How It Works, Contact / Consultation, Privacy Policy, Terms of Use, Thank-you page, custom 404 |
| Forms | Manufacturer inquiry, Buyer sourcing request, Consultation request — validated on the server, stored in the database, with reference numbers (e.g. `MG-2600012`) |
| Spam protection | Hidden honeypot field, minimum fill-time check, per-IP rate limit |
| Email | Team alert + visitor acknowledgement via your business mailbox (SMTP). If email fails, the lead is still saved and the dashboard shows the email status |
| WhatsApp | Floating button + links everywhere, using the number set in the admin |
| Lead dashboard | `/admin` — totals, 30-day chart, follow-ups due, search & filter, status pipeline, follow-up dates, notes, CSV export (opens in Excel) |
| Content admin | `/admin/content` — edit contact details, homepage text, services, industries, markets, buyer types, FAQs and SEO. Add / remove / reorder items. Changes go live on save |
| SEO | Per-page titles & descriptions, Open Graph image, `sitemap.xml`, `robots.txt`, Organization structured data, clean URLs |
| Analytics | Plausible (privacy-friendly) or Google Analytics 4 — set one env variable. Form submissions are tracked as conversion events |
| Performance | Static pages with on-demand revalidation, optimised images, ~110 kB first load JS |

---

## Run locally

Requirements: Node.js 20+.

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

Admin: http://localhost:3000/admin — password is `ADMIN_PASSWORD` from `.env.local`.

The local database is created automatically at `data/mirsons.db`.

---

## Deploy (GitHub + Vercel + Turso)

1. **Push to GitHub** (private repository).
2. **Create the database** — free Turso account at https://turso.tech:
   ```bash
   turso db create mirsons
   turso db show mirsons --url        # -> DATABASE_URL
   turso db tokens create mirsons     # -> DATABASE_AUTH_TOKEN
   ```
   Tables are created automatically on first request.
3. **Import the repository in Vercel** and add the environment variables from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — `https://www.yourdomain.com`
   - `DATABASE_URL`, `DATABASE_AUTH_TOKEN`
   - `ADMIN_PASSWORD` — long and unique
   - `SESSION_SECRET` — random 32+ characters (e.g. `openssl rand -base64 32`)
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM`, `NOTIFY_EMAIL`
   - Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` **or** `NEXT_PUBLIC_GA_ID`
4. **Connect the domain** in Vercel → Settings → Domains and update DNS at your registrar.
5. **Submit the sitemap** (`https://yourdomain.com/sitemap.xml`) in Google Search Console.

> Do not deploy without `DATABASE_URL` pointing to Turso: Vercel's file system is read-only, so the local
> SQLite file cannot store inquiries in production.

### Email settings examples

| Provider | SMTP_HOST | SMTP_PORT |
| --- | --- | --- |
| Zoho Mail | `smtp.zoho.com` | 465 |
| Google Workspace | `smtp.gmail.com` | 465 (use an App Password) |
| Microsoft 365 | `smtp.office365.com` | 587 |
| Hostinger Email | `smtp.hostinger.com` | 465 |

---

## Managing the website (client guide)

### Leads
1. Sign in at `/admin`.
2. **Overview** shows new inquiries, follow-ups due this week and the latest submissions.
3. **Leads** — search by name, company, product, country or reference; filter by type and status.
4. Open a lead to see every submitted field, then:
   - set the **status**: New → Contacted → Qualified → Meeting arranged → Deal / client won (or Closed – not a fit),
   - set a **follow-up date** (overdue dates turn red),
   - add **notes** after calls or emails,
   - reply by **Email** or **WhatsApp** with one click.
5. **Export CSV** downloads the current filtered list for Excel or a CRM.

### Website content
`/admin/content` → choose a section → edit → **Save changes**. The live site updates immediately.

- **Industries** — add a new category, list example products (one per line), or untick *Show on website* to hide it.
- **Contact details** — email, phone, WhatsApp number (digits only, with country code) and business hours.
- **SEO** — default title and description for search engines.
- *Restore default text* at the bottom of each section undoes all edits to that section.

---

## Photos, graphics and animation

- **Photos** live in `public/images/` as optimised **WebP** (1.3 MB total). Next.js `<Image>` then serves each visitor a
  resized AVIF/WebP copy for their screen. All photos are from Unsplash (free for commercial use) — see
  `public/images/CREDITS.md`. `npm run photos` re-downloads and re-encodes them (`scripts/build-photos.mjs`).
- **Industry photos** can be changed in Admin → Website content → Industries → *Photo* (path to an image in `public/images`).
- **SVG**: the world map with moving trade-route pulses (`public/world-map.svg`, animated with CSS inside the SVG), the
  matchmaking diagram, ornaments and icons — no extra image requests.
- **Animation** is CSS-only plus one ~0.5 kB scroll observer (`src/components/RevealObserver.tsx`): scroll reveals,
  slow hero zoom, hover lift/zoom, gold button sheen, markets ticker. Everything switches off for visitors with
  *reduce motion* enabled, and content is never hidden if JavaScript fails.
- **Performance** (production build, mobile with 4× CPU slowdown and 4G): LCP 1.3–2.3 s on every page, CLS 0;
  desktop home LCP ≈ 1.1 s.

---

## Project structure

```
src/
  app/
    (site)/            public pages (one folder per page)
    admin/             sign-in, dashboard, leads, content editor, CSV export, server actions
    api/inquiries/     form submission endpoint
  components/          header, footer, forms, shared UI
  lib/
    content-schema.ts  editable content: defaults + admin field definitions
    inquiry.ts         form options and validation rules
    leads.ts           lead queries
    email.ts           notification emails
scripts/build-assets.mjs   regenerates logos, favicon, social image and world map from the source logo
```

### Extending later
- **New editable section** (e.g. testimonials, case studies): add its type, default and field list in
  `src/lib/content-schema.ts`, then render it with `getContent("yourKey")` on any page.
- **New page**: add `src/app/(site)/your-page/page.tsx` and a link in `src/lib/site.ts` and `src/app/sitemap.ts`.
- **New form field**: add it to the schema in `src/lib/inquiry.ts` (+ label in `FIELD_LABELS`) and to the form in
  `src/components/forms/Forms.tsx`. It is stored, emailed and exported automatically.
