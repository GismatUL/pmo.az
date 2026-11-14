# Implementation report — PMO.az monorepo (2026-11-14)

## Scope delivered

| Requirement | Status | Where |
| --- | --- | --- |
| Monorepo: frontend, backend, design, ai-engineering submodule | Done | repo root |
| Pixel-matched frontend for all 8 Figma screens, desktop + mobile | Done | `frontend/` |
| Frontend built (static export) | Done | `frontend/out` (`npm run build`) |
| Laravel backend with Livewire, MySQL | Done | `backend/` |
| Data from current pmo.az via factories + seeders | Done | `backend/database/seeders`, `tools/scrape-pmo` |
| Frontend reads content from the backend | Done | `frontend/src/lib/api.ts` (build-time) |
| Enquiry form posts to the backend | Done | `POST /api/v1/enquiries` |

## Frontend

- Next.js 15 App Router, `output: "export"`, plain CSS on design tokens (no
  Tailwind — Figma's generated Tailwind was translated to project CSS).
- Routes: `/`, `/programs`, `/services`, `/services/[slug]`, `/about`,
  `/blog`, `/blog/[slug]`, `/contact`.
- Interactive pieces: mobile menu, program filter chips, catalogue
  search + filters, blog category chips + "Daha çox yazı" pagination, share
  links (copy link), enquiry forms with honeypot and status messages.
- **Verification:** every page was rendered headless at 1440 px and 390 px
  and diffed against Figma's own renders of the same frames (side-by-side +
  difference blend). Remaining differences are 1–3 px of accumulated
  line-height rounding and the `↗` glyph, which Figma draws with a symbol
  fallback font slightly wider than Inter's.

## Backend

- Laravel 12.72, Livewire 3.6, MySQL 8.4 (`pmo`, tests on `pmo_testing`).
- Models: Program, ServicePillar, ConsultingService, Post, Expert, Book,
  VideoCourse, Partner, Testimonial, Stat, Setting, Enquiry (+ `users.is_admin`).
- **API v1:** thin controllers → API Resources, Form Request validation,
  `EnquiryService` → `EnquirySubmitted` event → queued
  `NotifyTeamOfEnquiry` mail. Rate limit: 5/min and 50/day per IP. CORS is
  limited to `CORS_ALLOWED_ORIGINS`.
- **CMS (`/admin`):**
  - Livewire login, rate limited and admin-only.
  - Dashboard and an enquiry inbox with status and internal notes.
  - Settings screen.
  - Generic list/edit screens for 10 content types, declared in
    `app/Admin/AdminResources.php`: search, filter, image upload, a
    rich-body editor and JSON fields.
- **Seeders:** `ContentSeeder` builds every record through its model factory
  and upserts on a stable key, so it's idempotent. Images are copied from
  `seeders/assets` to the public disk.
- **Verification:**
  - `php artisan test` → 29 tests passed (162 assertions): API, enquiries
    (validation, captcha, honeypot, mass assignment, rate limit, mail, CORS), admin
    access, login, CRUD, uploads, settings, seeder idempotency, and
    `BlockText`.
  - Pint passes.
  - Manual: every API endpoint returned 200, the 404 path returned 404, a
    browser-style CORS preflight and POST were accepted, and CMS screens
    were screenshotted after a headless login.

## Decisions

1. **Static export plus build-time API fetch, with a bundled fallback.** It
   keeps the site deployable as static files and buildable without the
   backend. Content changes in the CMS need a frontend rebuild (see open
   question 1).
2. **A generic Livewire CRUD instead of an admin package** (Filament/Nova):
   no extra dependency, and it matches the request for Livewire. Content
   types are declared in one registry.
3. **Rich text stored as JSON blocks** (`p`, `h2`, `image`), edited as
   lightweight markdown (`## `, `![](path)`). The scraped bodies and the
   frontend renderer share this one format.
4. **Design copy wins over live copy where they differ:** program
   descriptions, stats, pillar summaries and the PMO service page come from
   Figma. Long-form texts, posts, experts, books and courses come from the
   live site.
5. **Captcha: Cloudflare Turnstile** on the admin login and the enquiry
   form, verified server-side (`App\Support\Turnstile`, rule
   `ValidCaptcha`). It's free and has no picture puzzles. On the site it
   runs invisibly, so the Figma layout is unchanged. It fails closed when
   misconfigured.
6. **Uploads are limited to raster images.** SVG is excluded because it
   would be served same-origin (XSS risk). The seeded partner SVG logos are
   static.

## Open questions for the product owner

1. **Publishing flow.** Should CMS edits go live immediately? Options:
   switch the frontend from static export to ISR/SSR, or add a "rebuild
   site" webhook (e.g. a CI/Vercel deploy hook) that fires when content is
   saved.
2. **Social and community links.** LinkedIn, Instagram, YouTube and Telegram
   URLs are not on the live site. They're empty settings, so the labels
   render as plain text until filled in under *Parametrlər*.
3. **Partner names.** Three live partner logos have no identifiable name
   ("Tərəfdaş 2/4/6"). Rename them in *Tərəfdaşlar*.
4. **Prices.** Program prices stay "Qiymət təsdiqlənir", as the design's
   draft note asks. Book prices come from the design (60 / 9,90 / 19,90 ₼).
5. **Four of the five consulting services have no detail content** in the
   design. Their pages show the hero, related services and CTA until a
   `detail` JSON is added in the CMS.
6. **Language switch.** AZ / RU / EN is shown as in the design, but only AZ
   content exists. RU/EN need translated content and a locale strategy.
7. **Mail delivery.** Enquiry emails are queued
   (`QUEUE_CONNECTION=database`, `MAIL_MAILER=log` locally). Production
   needs SMTP settings and a running `php artisan queue:work`.
8. **Captcha keys.** Local setup uses Cloudflare's test keys. Production
   needs a (free) Turnstile widget for the live domains: its site key goes
   in the backend `.env` and the frontend build env, its secret key in the
   backend `.env` only.
