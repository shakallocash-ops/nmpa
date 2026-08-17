# FINAL PROMPT — CMS control of public site + local testing (copy everything below this line)

---

You are a senior Next.js 14 / Prisma engineer working in this existing repository: **Ministry of Nomadic and Pastoral Affairs, Niger State** (`nmpa-official-website`). Read `CMS-PROMPT.md` for the full CMS architecture spec — it is still valid. This prompt adds the current, verified state of the project and the exact order of work.

## VERIFIED CURRENT STATE (do not re-diagnose from scratch)

1. **Local Neon connection is BLOCKED.** TCP to the Neon pooler host succeeds, but Prisma reports "Can't reach database server" even with `connect_timeout=30`. This means the Neon compute endpoint is suspended/disabled in the Neon console, or the local VPN (interface "ProTUN") breaks the TLS session. It is NOT a code bug. Re-test any time with: `node scripts/db-check.js`. Never print `DATABASE_URL`, passwords, or `AUTH_SECRET`.
2. **Logo management already works WITHOUT the database.** `/admin/content/branding` uploads a logo via `actions/branding.ts` → stores the file in `public/uploads/` → records it in `data/branding.json` (`lib/branding.ts`) → `revalidatePath` → the public header and footer (`SiteHeader`, `SiteFooter`, `MinistryMark`) show it immediately. Do not rebuild this; extend the same pattern.
3. **Not yet CMS-managed:** homepage hero image, page heroes, news, gallery, contact info, about/departments content. Heroes are CSS `background-image` in `components/public/Hero.tsx` / `PageHero.tsx` reading Unsplash URLs from `lib/content/images.ts`.
4. **Admin auth works offline-tolerant:** login and the dashboard degrade gracefully when the DB is down (`app/admin/error.tsx`, fallback stats). Keep that behaviour.
5. **Project size is already solved:** the 1.5 GB is `node_modules` (689 MB) + `.next` (448 MB); actual source is under 5 MB. `.gitignore` is already hardened (ignores `node_modules/`, `.next/`, `.env*`, `public/uploads/*`, `data/branding.json`, logs, archives, local DBs). The folder is NOT a git repo yet, so nothing large is tracked — when you run `git init` and commit, verify with `git ls-files | measure` that only source files are staged.

## OBJECTIVE

Make the admin CMS actually control the public website and prove it locally BEFORE any deployment. Because Neon is unreachable locally, use this strategy:

### Local testing strategy (IMPORTANT — do not fight Neon)

- For **logo, homepage hero, page heroes, and contact info**: use the existing **file-based pattern** (`data/*.json` + `public/uploads/` + server actions + `revalidatePath`), exactly like `lib/branding.ts`. This works with zero database and is what we can fully test today.
- For **news and gallery** (need real records): these are Prisma-backed per `CMS-PROMPT.md`. If Neon is still down, implement the admin UI and public wiring anyway, keep the existing `lib/content/*` fallbacks when tables are empty/unreachable, and clearly report: "LOCAL DATABASE CONNECTION BLOCKED — news/gallery end-to-end test requires Neon; check console.neon.tech that the compute is Active and the connection string is current."
- Do NOT switch the Prisma schema to SQLite. Do NOT change production configuration. Do NOT run `prisma db push --force-reset` or anything destructive.

## WORK ORDER

### Phase 1 — Homepage hero + page heroes (file-based, testable today)
1. Extend `lib/branding.ts` (or a sibling `lib/site-media.ts`) to store `heroUrl`, `heroAlt`, and per-page hero overrides in `data/` JSON.
2. Add upload/replace/remove UI at `/admin/content/branding` (or a new `/admin/content/heroes`) reusing the `BrandingForm` pattern: file validation (jpg/png/webp, ≤8MB), preview, remove button.
3. Wire `Hero.tsx` and `PageHero.tsx` to prefer the CMS value and fall back to the current `lib/content/images.ts` URL when unset.
4. `revalidatePath` for all affected locale paths (`/en`, `/ha`, `/fr` variants) on every save.
5. PROVE IT: upload a hero in admin → hard-refresh `/en` → new image appears. Same for logo (already built — re-verify).

### Phase 2 — Contact info (file-based)
1. Store email, phone, HQ address, social links in `data/site-settings.json` with an admin form at `/admin/content/settings`.
2. Public footer and contact page read from it with fallback to the existing `ministry` object.
3. PROVE IT: change email → footer updates after refresh.

### Phase 3 — News + Gallery (Prisma, per CMS-PROMPT.md Phase 2)
- Implement models, admin CRUD with image upload (files to `public/uploads/`, metadata in DB), public pages reading from Prisma with `lib/content/*` fallback.
- If Neon is reachable by then, seed the existing 4 news posts and 12 gallery items and test end-to-end. If not, report the exact blocker.

### Phase 4 — Verification + build
1. Run the local test plan: admin login → logo swap → hero swap → contact change → language check `/en` `/ha` `/fr` → hard refresh after each change → confirm no source edit or rebuild was needed for content to update.
2. `npx prisma generate` and `npm run build` must pass. Fix any TypeScript/Next.js errors you introduced.
3. Never claim a test passed if it did not run. List every test that was blocked by the Neon outage.

## RULES (unchanged from CMS-PROMPT.md — enforce all of them)
- Do not break existing admin CRUD, auth, roles, middleware, or i18n routing.
- Server-side permission checks on every CMS action (`contentWriteRoles` in `lib/roles.ts`); never trust the client.
- Do not invent ministry facts, people, news, or translations.
- Targeted `revalidatePath`/`revalidateTag` only — do not disable caching globally.
- Do not commit `.env`, uploads, or generated files.

## FINAL REPORT — answer each explicitly
1. Logo management: works? tested?
2. Homepage hero management: works? tested?
3. Contact settings: works? tested?
4. News / Gallery: implemented? tested or blocked by Neon?
5. Which public pages read CMS data now.
6. Neon status locally and the exact reason if still blocked.
7. `npm run build` result and TypeScript result.
8. Confirmation that the future git repo will exclude `node_modules`, `.next`, `.env`, uploads (show `git status` summary if a repo was initialized).
9. Remaining blockers before deployment.
