# Mirsons Global — Website Proposal

Prepared for: Mirsons Global
Scope: Phase 1 — credible B2B website that converts international visitors into qualified inquiries, at low running cost.

---

## 1. Sitemap

```
Home  /
├── About Us                         /about
├── Our Services                     /services
│     (Lead Generation · Buyer Identification · Supplier Sourcing ·
│      Market Research · Appointment Setting · Buyer–Supplier Matchmaking)
├── For Manufacturers & Suppliers    /manufacturers     → Manufacturer inquiry form
├── For Buyers                       /buyers            → Sourcing requirements form
├── Industries We Serve              /industries        (+ International markets)
├── How It Works                     /how-it-works      (+ FAQs)
├── Contact / Book a Consultation    /contact           → Consultation form, email, WhatsApp
├── Privacy Policy                   /privacy
├── Terms of Use                     /terms
├── Thank-you (after any form)       /thank-you
└── 404 page

Admin (private)                      /admin
├── Overview  (totals, 30-day chart, follow-ups due)
├── Leads     (search, filter, status, follow-up date, notes, CSV export)
└── Website content (contact details, homepage, services, industries, markets, FAQs, SEO)
```

## 2. Homepage wireframe

```
┌──────────────────────────────────────────────────────────────────────┐
│ [M logo] MIRSONS GLOBAL   About Services Manufacturers Buyers …  [Book a Consultation] │
├──────────────────────────────────────────────────────────────────────┤
│ HERO — navy, dotted world map with gold trade routes                 │
│  ──                                                                  │
│  B2B LEAD GENERATION & BUYER–SUPPLIER MATCHMAKING                    │
│  Connecting Manufacturers with Qualified International Buyers        │
│  Short introduction                                                  │
│  [Find Qualified Buyers →]  [Submit Sourcing Requirements]           │
├──────────────────────────────────────────────────────────────────────┤
│ 4 value pillars: Research-led · Decision-makers · Qualified · Meetings│
├──────────────────────────────────────────────────────────────────────┤
│ WHO WE HELP — two cards                                              │
│  [Manufacturers & suppliers → Find buyers] [Buyers → Source suppliers]│
├──────────────────────────────────────────────────────────────────────┤
│ WHO WE CONNECT — Importers · Distributors · Wholesalers · Dealers ·  │
│  EPC Contractors · Commercial Buyers · OEM Opportunities             │
├──────────────────────────────────────────────────────────────────────┤
│ SERVICES — 6 cards                                                   │
├──────────────────────────────────────────────────────────────────────┤
│ OUR PROCESS (navy) — 01 Define · 02 Build · 03 Reach · 04 Follow up ·│
│  05 Qualify · 06 Book meetings                                       │
├──────────────────────────────────────────────────────────────────────┤
│ INDUSTRIES — 8 category tiles                                        │
├──────────────────────────────────────────────────────────────────────┤
│ WHY MIRSONS GLOBAL — "What you receive" checklist + 4 reasons        │
├──────────────────────────────────────────────────────────────────────┤
│ FAQs — accordion                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ CTA (navy) — Ready to Find Your Next Market?                         │
│  [Discuss Your Requirements]  [Chat on WhatsApp]                     │
├──────────────────────────────────────────────────────────────────────┤
│ FOOTER — logo · Company links · Solutions links · Contact · Legal    │
└──────────────────────────────────────────────────────────────────────┘
                                             (floating WhatsApp button)
```

## 3. Recommended platform and hosting

**Recommendation: Next.js website (already built) on Vercel, with a free Turso database.**

| | Next.js + Vercel (recommended) | WordPress + shared hosting |
| --- | --- | --- |
| Speed & SEO | Very fast, static pages | Depends on theme/plugins |
| Lead dashboard | Built in, no plugins | Needs form + CRM plugins (often paid) |
| Editing content | Built-in admin for text, services, industries, FAQs, SEO | Full page builder |
| Security / upkeep | No plugins to patch | Regular plugin/core updates needed |
| Running cost | Low (see below) | Low hosting, but premium plugins add up |

WordPress gives more freedom to design new pages without a developer; the Next.js build gives a faster,
more secure site with the lead system included. Since the core requirement is converting visitors into
tracked B2B inquiries, the Next.js build is the better fit.

## 4. Costs

### One-time
| Item | Cost |
| --- | --- |
| Design & development (all pages, 3 forms, lead dashboard, content admin, SEO, analytics, deployment) | **[your fee]** |
| Domain registration (.com), first year | ~USD 10–15 |

### Recurring (approximate — confirm current prices when signing up)
| Item | Monthly | Notes |
| --- | --- | --- |
| Hosting — Vercel Pro | ~USD 20 | Vercel's free Hobby plan is for non-commercial use only, so a business site should use Pro. A free-tier alternative host (e.g. Netlify) can also run this site. |
| Database — Turso | USD 0 | Free tier is far more than enough for inquiry volumes |
| Business email — Zoho Mail Lite / Google Workspace | ~USD 1–7 per user | Also used to send inquiry notifications |
| Analytics — Google Analytics 4 / Plausible | USD 0 / ~USD 9 | GA4 is free; Plausible is privacy-friendly and cookie-free |
| Domain renewal | ~USD 1 (USD 10–15 / year) | |
| **Typical total** | **~USD 22–40 / month** | |

### Optional maintenance
| Item | Cost |
| --- | --- |
| Monthly care plan (updates, backups check, small content changes, uptime monitoring) | **[your fee] / month** |
| New pages / features (case studies, testimonials, market pages) | Quoted per request |

## 5. Delivery timeline

| Week | Work |
| --- | --- |
| 1 | Confirm content, contact details, industries and markets; client review of the built site |
| 2 | Revisions, domain + business email + database setup, deployment, email notification testing |
| 3 | Final QA (mobile, forms, dashboard), Google Search Console + analytics, handover and training |

**Estimated total: 2–3 weeks** from content approval, depending on client feedback time.

## 6. Handover

- Live website on your domain
- Admin access for leads and content
- Source code in your GitHub account
- Short guide for managing content and leads (README)

## 7. Information needed from Mirsons Global

- Final business email, phone and WhatsApp number
- Domain name (existing or to purchase)
- Confirmation of initial industries and target markets
- Any company details for the About page (founders, location, registration) and legal review of Privacy / Terms
- Optional: photos, LinkedIn page, testimonials or case studies (Phase 2)
