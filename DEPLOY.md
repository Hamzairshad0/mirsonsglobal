# Deploy guide — GitHub → Vercel → Turso

About 20 minutes. You need: Node.js 20+, Git, a GitHub account, and the Vercel account.

---

## Step 1 — Test it on your computer (optional, 3 min)

Unzip, open a terminal inside the `mirsons-global` folder:

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open http://localhost:3000. Admin: http://localhost:3000/admin (password = `ADMIN_PASSWORD` in `.env.local` —
change it to anything first, and set `SESSION_SECRET` to any 32+ characters).

---

## Step 2 — Push to GitHub (3 min)

1. On github.com → **New repository** → name `mirsons-global` → **Private** → do NOT add README/.gitignore → **Create**.
2. In the project folder:

```bash
git init -b main
git add .
git commit -m "Mirsons Global website"
git remote add origin https://github.com/YOUR-USERNAME/mirsons-global.git
git push -u origin main
```

(If the repo belongs to a company organisation, use `https://github.com/ORG-NAME/mirsons-global.git`.)

---

## Step 3 — Import into Vercel (3 min)

1. vercel.com → **Add New… → Project**.
2. Connect GitHub if asked, then **Import** `mirsons-global`.
   - If the repo isn't listed: *Adjust GitHub App Permissions* → give Vercel access to that repo.
3. Framework is detected as **Next.js**. Leave build settings as they are.
4. Open **Environment Variables** and add these before the first deploy:

| Name | Value |
| --- | --- |
| `ADMIN_PASSWORD` | a long password for /admin |
| `SESSION_SECRET` | random 32+ characters — generate one with the command below |
| `NEXT_PUBLIC_SITE_URL` | `https://mirsons-global.vercel.app` for now (change to your domain later) |

Generate `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

5. Click **Deploy**. The first deploy works even before the database exists (the site shows the default content),
   but **forms will not save until Step 4 is done.**

---

## Step 4 — Add the Turso database (3 min)

**Option A — from inside Vercel (easiest)**
1. Vercel → your project → **Storage** tab → **Create Database** → choose **Turso** (Marketplace) → follow the prompts
   (free plan) → connect it to this project for **Production, Preview and Development**.
2. This adds `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` automatically — the code already reads these.

**Option B — from turso.tech**
1. Sign up at https://turso.tech → **Create Database** → name `mirsons` → pick a region close to your users
   (e.g. Frankfurt or Mumbai).
2. Copy the database URL (`libsql://….turso.io`) and **Create Token**.
3. In Vercel → Settings → Environment Variables add `DATABASE_URL` = the URL and `DATABASE_AUTH_TOKEN` = the token.

The tables are created automatically on first use — no SQL to run.

**Then redeploy:** Vercel → **Deployments** → ⋯ on the latest → **Redeploy**. (Environment variable changes only apply to new deployments.)

---

## Step 5 — Check it works (3 min)

1. Open the live site → **For Buyers** → submit a test request → you should land on the Thank-you page with a reference like `MG-2600001`.
2. Open `/admin` → sign in → the test lead appears under **Leads**.
3. **Website content → Contact details** → put in the real email, phone and WhatsApp number → **Save**.
4. Delete the test lead (open it → *Delete lead* at the bottom).

If a form shows *"We could not save your request"*, the database variables are missing — recheck Step 4 and redeploy.
Vercel → project → **Logs** shows the exact error.

---

## Step 6 — Email notifications (when the business mailbox is ready)

Add in Vercel → Settings → Environment Variables, then redeploy:

| Name | Example |
| --- | --- |
| `SMTP_HOST` | `smtp.zoho.com` / `smtp.gmail.com` / `smtp.office365.com` |
| `SMTP_PORT` | `465` (Office 365: `587`) |
| `SMTP_USER` | `info@mirsonsglobal.com` |
| `SMTP_PASS` | mailbox password or app password |
| `EMAIL_FROM` | `Mirsons Global <info@mirsonsglobal.com>` |
| `NOTIFY_EMAIL` | inbox(es) that get new-lead alerts, comma separated |

Until this is set, leads still save to the dashboard; the lead page just says *"Email not configured"*.

---

## Step 7 — Custom domain

1. Vercel → Settings → **Domains** → add `mirsonsglobal.com` and `www.mirsonsglobal.com`.
2. Add the DNS records Vercel shows at your domain registrar. HTTPS is automatic.
3. Change `NEXT_PUBLIC_SITE_URL` to `https://www.mirsonsglobal.com` → **Redeploy**.
4. Google Search Console → add the domain → submit `https://www.mirsonsglobal.com/sitemap.xml`.

## Step 8 — Analytics (optional)

Add **one** of these and redeploy:
- `NEXT_PUBLIC_GA_ID` = `G-XXXXXXX` (Google Analytics 4, free), or
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = `mirsonsglobal.com` (Plausible, privacy-friendly, paid).

---

After this, every `git push` to `main` redeploys the site automatically.
