# PROMPT — Complete website CMS (copy everything below this line)

---

You are a senior Next.js / Prisma engineer working in this existing repository:

**Ministry of Nomadic and Pastoral Affairs, Niger State**  
Workspace: the current project root (`nmpa-official-website`).

## Goal

Build a **real, production-quality Content Management System** so an authorized administrator can log into `/admin` and manage the **public website’s content and images** without editing React, TypeScript, or message files.

This is **not** a dashboard redesign.  
This is **not** fake CMS screens that do not write to a database.  
The public site must **read CMS data at runtime**.

The most important CMS capability is **images**: hero photos, news photos, gallery photos, project photos, programme photos, about/education/peace photos. An admin must be able to **upload, replace, and remove** those images, and the public pages must show the new files immediately (after cache revalidate).

## Non-negotiable rules

1. FIRST inspect the existing architecture. THEN implement incrementally. Do not rewrite the app.
2. Preserve all existing functionality: public i18n routes, admin CRUD (households, schools, conflicts, committee, projects, users, audit), auth/roles, contact form, conflict report form, maps, data explorer.
3. Do **not** invent government facts, phone numbers, staff names, statistics, or news. Seed CMS tables from the **existing** `lib/content/*` records only.
4. Do **not** create controls that are not wired to Prisma / uploaded files.
5. Do **not** translate official names, LGA names, or live DB records unless a proper multilingual field exists.
6. Gold (`#C6A15B`) stays accent-only. Keep the institutional public look and the existing admin shell.
7. Do not break `/admin` login or role gates in `middleware.ts` and `lib/roles.ts`.
8. Do not store uploaded files only in git. Use a durable store: `public/uploads` for local/Vercel Blob **or** a documented local disk + `next.config` rewrite. Prefer **Vercel Blob** if `@vercel/blob` is easy; otherwise `public/uploads` with an API route and `.gitignore` for uploads. Images must work in production, not only localhost.
9. After each phase, the public page must actually change when you edit CMS data.

## What already exists (do not rebuild)

### Working admin (operational data — keep it)

| Route | Already manages |
| --- | --- |
| `/admin` | Login (jose + `AUTH_SECRET`, not NextAuth) |
| `/admin/dashboard` | Live stats |
| `/admin/households` | Household + livestock CRUD |
| `/admin/schools` | Nomadic schools (CONTENT_EDITOR can write) |
| `/admin/projects` | Project text/status (CONTENT_EDITOR can write) — **no image fields** |
| `/admin/conflicts` | Conflict cases |
| `/admin/committee` | 30-Man / Peace committee |
| `/admin/users` | Super Admin only |
| `/admin/audit` | Audit log |

`middleware.ts` already allows `CONTENT_EDITOR` onto `/admin/content` and `/admin/content/*` — **those pages do not exist yet. Build them.**

### Hardcoded public content (this is what the CMS must take over)

| Content | Current source | Admin today |
| --- | --- | --- |
| All photos | `lib/content/images.ts` (Unsplash URLs) | None |
| News (4 posts) | `lib/content/news.ts` | None |
| Gallery (12 items + 1 video) | `lib/content/gallery.ts` | None |
| Featured project images / galleries / timelines | `lib/content/projects.ts` | Text only in Prisma `Project` |
| Ministry identity, vision, mission, mandates, departments, leadership | `lib/content/ministry.ts` + `messages/*.ts` | None |
| Staff directory | `lib/content/staff.ts` | None |
| Peace stories, timeline, rally gallery | `lib/content/peace.ts` | None |
| Programmes page cards | hardcoded in `app/[locale]/(public)/programmes/page.tsx` | None |
| Contact HQ / email / social | `ministry` object | None |
| Contact form inbox | Prisma `ContactInquiry` | **No admin UI** |
| Headline stats floor | `PUBLISHED_STATS` | Indirect only |
| 275-school directory | `lib/content/schools-directory.ts` (synthetic) | Real DB schools already editable |

UI chrome (nav labels, buttons) may stay in `messages/*.ts`. **Pictures, news, gallery, about/ministry facts, programmes, and contact details must move to the CMS.**

### Public pages that must consume CMS

`app/[locale]/(public)/` — home, about, departments, department `[slug]`, programmes, projects, project `[id]`, news, news `[slug]`, gallery, peace-security, education, education/schools, contact, resources.

Heroes use CSS `background-image` in `components/public/Hero.tsx` and `PageHero.tsx`. News/gallery/projects still use `next/image`. After CMS, both must accept a CMS URL (uploaded file or existing Unsplash fallback).

`next.config.mjs` has `images.unoptimized: true` and only `images.unsplash.com`. If you store local `/uploads/...`, that works as a relative path. If you use Vercel Blob, add that hostname to `images.remotePatterns`.

## Architecture to build

### A. Prisma CMS models (new — add to `prisma/schema.prisma`)

Create real models. Suggested minimum (adjust names if cleaner, but keep relations clear):

1. **`MediaAsset`**
   - `id`, `url`, `alt`, `filename`, `mimeType`, `width?`, `height?`, `createdAt`, `uploadedById?`
   - This is the media library.

2. **`SiteSettings`** (single row)
   - Headquarters, email, phone, social URLs
   - Home hero `mediaId`
   - Default page-hero images (about, departments, programmes, news, gallery, peace, education, contact, data, resources)
   - `PUBLISHED_STATS` floors (lgas, schools, households, livestock, conflictsResolved, appointments, solarBoreholes)
   - Commissioner name/title, Governor name/title, established date (seed from existing `ministry` / `gov` — do not invent new people)

3. **`NewsPost`**
   - `slug` unique, `title`, `excerpt`, `body` (text or JSON paragraphs), `category`, `publishedAt`, `isPublished`, `coverMediaId`
   - Seed the 4 existing posts from `lib/content/news.ts`

4. **`GalleryItem`**
   - `title`, `caption`, `category`, `sortOrder`, `mediaId`, `isPublished`
   - Seed from `lib/content/gallery.ts`

5. **`GalleryVideo`**
   - `title`, `youtubeUrl`, `sortOrder`
   - Seed the existing video entry (keep the current URL; do not invent a ministry YouTube channel)

6. **`PageBlock` or typed models for:**
   - Mandates (id/key, title, body, sortOrder)
   - Departments (slug, name, summary, body, directorate, heroMediaId)
   - Programmes (key, title, summary, body, status, href, heroMediaId, sortOrder)
   - Leadership (name, roleKey, bio, sortOrder) — names stay as in `lib/content/ministry.ts`
   - Staff offices (office, role, department, email)
   - Peace stories + peace timeline + rally gallery images

7. **Extend `Project`**
   - `coverMediaId?`, optional gallery relation (`ProjectImage`)
   - Timeline can stay JSON or a `ProjectTimelineStep` model
   - Admin project form must upload/select cover + gallery

After schema change: `npx prisma db push` (this repo has no migrations folder yet) and seed CMS rows from existing `lib/content/*` so the public site looks the same on first load.

### B. Media upload (highest priority)

- Admin UI: **Media library** at `/admin/content/media`
  - Upload image (jpg/png/webp, max ~8MB)
  - See grid of assets
  - Copy URL / set alt text
  - Delete unused assets
- API: `app/api/admin/media/route.ts` (auth required; CONTENT_EDITOR and leadership)
- Store files; persist `MediaAsset`
- Audit log `CREATE` / `DELETE` on `MediaAsset`
- Public pages resolve `media.url` (fallback to current Unsplash `IMAGES.*` if CMS row empty)

### C. Admin CMS screens (use existing `AdminShell` / sidebar)

Add a **Website** or **Content** group in `components/admin/Sidebar.tsx` for roles that already include CONTENT_EDITOR:

1. `/admin/content` — CMS home (cards linking to the sections below)
2. `/admin/content/media` — media library (**do this first**)
3. `/admin/content/settings` — site settings + default hero images + contact/social + published stats floors
4. `/admin/content/news` — list / create / edit / unpublish news
5. `/admin/content/gallery` — gallery photos + video URL
6. `/admin/content/pages` — about/vision/mission, mandates, programmes
7. `/admin/content/departments` — department copy + hero image
8. `/admin/content/leadership` — leadership + staff directory
9. `/admin/content/peace` — stories, timeline, rally photos
10. `/admin/inbox` — ContactInquiry list (mark read) — leadership + CONTENT_EDITOR

Also update **existing** `/admin/projects` so a project can pick a cover image and gallery from the media library.

Every save must write Prisma and write an `AuditLog` row.

### D. Public site must read CMS

Create `lib/cms/getters.ts` (or similar) used by public pages:

- `getSiteSettings()`
- `getNewsPosts()` / `getNewsPost(slug)`
- `getGalleryItems()`
- `getMediaUrl(key)` for named heroes
- `getMandates()`, `getDepartments()`, `getProgrammes()`, `getLeadership()`, etc.

Wire:

- `getLocalisedNewsPosts()` to Prisma news (keep `messages` only for UI chrome, not article bodies, unless you add optional locale fields later)
- `GalleryGrid` to Prisma gallery
- `Hero` / `PageHero` to settings hero URLs
- Home/about/departments/programmes/contact/peace to CMS getters
- `getPublicProjects()` to use Project cover/gallery from DB when present

Keep published fallbacks from `lib/content/*` **only** when the CMS table is empty, so a failed DB does not blank the ministry site (same pattern as `actions/public.ts` `rememberPublic`).

Use `revalidatePath` / `revalidateTag` after CMS writes so `/en`, `/ha`, etc. update.

### E. i18n

Do not block the CMS on completing Fulfulde/Nupe/Gbagyi catalogues.

- CMS fields are stored in the **source language** (English / official wording already in the repo).
- Public UI chrome stays in `messages/*`.
- Optional later: `titleHa`, `bodyHa` — **do not** invent translations now.
- Official names stay untranslated.

## Implementation order (mandatory)

### Phase 1 — Media + settings (ship this before anything else)

1. `MediaAsset` + `SiteSettings` models, `db push`, seed settings from `ministry` + `IMAGES`
2. Upload API + `/admin/content/media`
3. `/admin/content/settings` with image pickers for every named hero
4. `Hero` + `PageHero` + footer/contact email/social read from `SiteSettings`
5. Prove: replace the home hero in admin → `/en` shows the new image

### Phase 2 — News + Gallery

1. Models, seed existing 4 news + 12 gallery items
2. Admin CRUD with cover image picker
3. Public news list/detail + gallery read from Prisma
4. Prove: add a news post with an uploaded photo → it appears on `/en/news`

### Phase 3 — Projects images + programmes + about structure

1. Project cover/gallery in existing admin projects UI
2. Programmes + mandates + departments + leadership/staff CMS
3. Public pages switched to getters

### Phase 4 — Peace extras + contact inbox

1. Peace stories/timeline/rally images
2. `/admin/inbox` for `ContactInquiry`

Stop after each phase and make sure the public site still builds (`npm run build` or at least typecheck).

## UI quality

- CMS forms must be usable: image preview, required fields, publish toggle, slug validation, delete confirm.
- Match existing admin components (`PageHeader`, tables, buttons, cards).
- Do not turn the public site into a SaaS marketing theme.

## Out of scope

- Do not replace household enumeration, school register, conflict casework, or user admin.
- Do not add a visual page-builder / drag-and-drop layout engine.
- Do not scrape or generate fake ministry news or photos of real officials.
- Do not put secrets in the repo.

## Done means

An admin can log into `/admin`, open **Content**, upload a photo, set it as the home hero, publish a news article with that photo, add a gallery image, and change the contact email — and all of that appears on the public localised website **without editing source files**.

Begin with Phase 1. Inspect the repo first. Then implement.
