# Deployment guide — Ministry of Nomadic and Pastoral Affairs

This is the official website (`nmpa-official-website`): Next.js 14, Prisma 6, Neon PostgreSQL, next-intl, and a custom JWT admin login.

Recommended host: **Vercel** + the **Neon** database you already use. A VPS option is at the end.

Do not commit `.env`. Production secrets must be set in the host dashboard, not in Git.

---

## 1. What goes live

| URL | What it is |
| --- | --- |
| `https://your-domain/` | Redirects to a locale, e.g. `/en` |
| `/en`, `/ha`, `/ff`, `/nup`, `/gbr`, `/fr` | Public ministry site |
| `/admin` | Staff login (not localised) |
| `/admin/dashboard` | Live admin after login |
| `/sitemap.xml`, `/robots.txt` | SEO (admin and `/api` are disallowed) |

Admin roles: Super Admin, Commissioner, Permanent Secretary, Director, Content Editor, Enumerator, Viewer.

---

## 2. What you need

- Node.js **20** or newer
- A GitHub (or GitLab) account
- A [Vercel](https://vercel.com) account (free Hobby works; Pro if the ministry needs a custom SLA)
- A [Neon](https://console.neon.tech) project (you already have one)
- A production domain, ideally `nomadicafairs.nigerstate.gov.ng` (this hostname is already baked into sitemap, robots, and Open Graph)

On your PC, from the project folder:

```powershell
node -v
npm.cmd install
npx.cmd prisma generate
```

---

## 3. Environment variables

Copy `.env.example`. Production needs these:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Neon **pooled** URL (hostname contains `-pooler`). App queries use this. |
| `DIRECT_URL` | Yes | Neon **direct** URL (no `-pooler`). Used for `db push` / migrations. |
| `AUTH_SECRET` | Yes | At least **32 random characters**. Signs admin session cookies. Generate a new one for production. |
| `AUTH_COOKIE_NAME` | No | Defaults to `nmpa_session` |
| `AUTH_SESSION_HOURS` | No | Defaults to `8` |
| `SEED_ADMIN_EMAIL` | Seed only | First Super Admin email |
| `SEED_ADMIN_PASSWORD` | Seed only | First Super Admin password — change after first login |

`JWT_SECRET`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` in a local `.env` are **not used**. Login is custom (`jose` + `AUTH_SECRET`), not NextAuth.

### Neon URL format

**Pooled** (`DATABASE_URL`) — add `sslmode=require` and `pgbouncer=true`:

```
postgresql://USER:PASSWORD@ep-xxxxx-pooler.REGION.aws.neon.tech/neondb?sslmode=require&pgbouncer=true
```

**Direct** (`DIRECT_URL`) — same credentials, **no** `-pooler` and **no** `pgbouncer`:

```
postgresql://USER:PASSWORD@ep-xxxxx.REGION.aws.neon.tech/neondb?sslmode=require
```

The app sets `connection_limit=8` and `pool_timeout=20` in code. You do not need to add those by hand.

### Generate `AUTH_SECRET`

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 4. Database (first time)

This repo does **not** yet contain a `prisma/migrations` folder. First production schema sync is a push, not `migrate deploy`.

On your PC, with production (or the same Neon) URLs in `.env`:

```powershell
npx.cmd prisma generate
npx.cmd prisma db push
npx.cmd prisma db seed
```

That will:

1. Create tables from `prisma/schema.prisma`
2. Insert the 25 Niger LGAs
3. Create the Super Admin from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
4. Add demo schools, households, conflicts, and projects if those tables are empty

If the Neon database already has this data from local development, **skip the seed** so you do not duplicate demo records. You can still upsert the admin user by running seed; LGA upserts are safe.

After the first push, create a real migration so future deploys can use `prisma migrate deploy`:

```powershell
npx.cmd prisma migrate dev --name init
```

Commit the new `prisma/migrations` folder. Then you may change the Vercel build command to:

```
prisma generate && prisma migrate deploy && next build
```

Do **not** use `prisma migrate deploy` until that folder exists — the build will fail.

---

## 5. Put the code on GitHub

1. Create a private repository (ministry source + schema should not be public unless ICT approves).
2. From the project folder:

```powershell
git init
git add .
git commit -m "Initial ministry website"
git branch -M main
git remote add origin https://github.com/YOUR-ORG/nmpa-official-website.git
git push -u origin main
```

Confirm `.env` is listed in `.gitignore` and is **not** in the commit.

---

## 6. Deploy on Vercel (recommended)

### 6.1 Import the project

1. Open [vercel.com/new](https://vercel.com/new)
2. Import the GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Root directory: the folder that contains `package.json` (this project root)
5. Node.js: **20.x**

### 6.2 Build settings

| Setting | Value |
| --- | --- |
| Install command | `npm install` |
| Build command | `prisma generate && next build` |
| Output | leave default (Next.js) |
| Install Command / `postinstall` | `prisma generate` already runs from `package.json` |

### 6.3 Environment variables

In Vercel → Project → **Settings → Environment Variables**, add for **Production**, **Preview**, and **Development**:

- `DATABASE_URL`
- `DIRECT_URL`
- `AUTH_SECRET` (new value, not the local one)
- `AUTH_COOKIE_NAME` = `nmpa_session`
- `AUTH_SESSION_HOURS` = `8`

Save, then **Redeploy**.

### 6.4 Region

Pick a Vercel region close to the Neon region (this project’s Neon host is typically `us-east-2`). Mismatched regions cause the same pool timeouts you saw locally.

### 6.5 First deploy

Push to `main` or click **Deploy**. When it succeeds you get a URL like:

`https://nmpa-official-website-xxxx.vercel.app`

Open:

- `https://….vercel.app/en` — public site
- `https://….vercel.app/admin` — login

---

## 7. Custom domain (ministry hostname)

Sitemap, robots, and metadata already use:

`https://nomadicafairs.nigerstate.gov.ng`

1. Vercel → Project → **Settings → Domains**
2. Add `nomadicafairs.nigerstate.gov.ng` and `www.nomadicafairs.nigerstate.gov.ng` if needed
3. At the domain registrar / Niger State ICT DNS, add the records Vercel shows (usually `A` / `CNAME`)
4. Wait for TLS (Let’s Encrypt) to become **Valid**
5. Set the apex domain as **primary**

Admin cookies use `secure: true` in production. The site **must** be served over HTTPS or login will not stick.

---

## 8. After go-live

1. Open `/admin` and sign in with the seed Super Admin.
2. **Change that password** immediately (Users → edit the admin account, or create a new Super Admin and disable the seed user).
3. Create real staff accounts. Do not share the seed password.
4. Confirm public pages: Home, About, Departments, Programmes, Projects, Education map, Peace & Security, Data, Gallery, Contact, News.
5. Confirm language prefixes: `/en`, `/ha`, `/fr` at minimum.
6. Submit a contact form and a public conflict report; check they appear in admin.
7. In Google Search Console, add the property and submit `https://nomadicafairs.nigerstate.gov.ng/sitemap.xml`.

---

## 9. Admin URLs (for ICT)

| Path | Who |
| --- | --- |
| `/admin` | Login |
| `/admin/dashboard` | All signed-in roles |
| `/admin/households` | Leadership + enumerators |
| `/admin/schools` | Leadership + content editors |
| `/admin/projects` | Leadership + content editors |
| `/admin/conflicts` | Leadership |
| `/admin/committee` | Leadership |
| `/admin/users` | Super Admin only |
| `/admin/audit` | Super Admin, Commissioner, Permanent Secretary |

---

## 10. Alternative: Linux VPS (no Vercel)

Use this if the ministry must host on government infrastructure.

1. Ubuntu 22.04+, Node 20, nginx, a process manager (`pm2`).
2. Clone the repo, `npm ci`, set a production `.env` (same variables as above).
3. `npx prisma generate && npx prisma db push && npm run build`
4. `pm2 start npm --name nmpa -- start` (this runs `next start` on port 3000).
5. nginx reverse proxy to `127.0.0.1:3000` with TLS (Let’s Encrypt or the state certificate).
6. `server_name nomadicafairs.nigerstate.gov.ng;`

Example nginx location:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

---

## 11. Common production errors

| Symptom | Fix |
| --- | --- |
| Build: `@prisma/client did not initialize` | `prisma generate` must run on the host (`postinstall` + build command). |
| Build: `migrate deploy` / no migrations | Do not run `migrate deploy` until `prisma/migrations` exists. Use `db push` once. |
| `Timed out fetching a new connection` | Use the **pooler** URL in `DATABASE_URL`, keep `DIRECT_URL` unpooled, and put Vercel in the same region as Neon. |
| Admin login does nothing / cookie missing | Site must be HTTPS. `AUTH_SECRET` must be ≥ 32 characters and the same on every instance. |
| `/admin` 404 after deploy | Confirm the deployment is this Next.js app, not a static export. |
| Images blank | Unsplash is loaded in the browser. A blocked network still shows the navy hero. |
| Locale URLs 404 | Public routes are `/en/...`, not `/`. Middleware redirects `/` to a locale. |

---

## 12. Security checklist

- [ ] `.env` is not in Git
- [ ] Production `AUTH_SECRET` is new and long
- [ ] Seed admin password changed
- [ ] Neon role password is not the example from local notes
- [ ] `/admin` is HTTPS only
- [ ] Super Admin accounts are limited to ICT
- [ ] Preview deployments on Vercel use a separate Neon branch if possible, not production data
