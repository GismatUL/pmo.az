# PMO.az

Monorepo for the PMO.az website — *Layihə düşüncə məktəbi*.

```
pmo.az/
├── frontend/          Next.js 15 site, pixel-matched to the Figma design (static export)
├── backend/           Laravel 12 + Livewire 3 CMS and public JSON API (MySQL)
├── design/            Figma link, frame → route map, original Figma Make export
├── tools/scrape-pmo/  One-off scraper that turned the live pmo.az content into seed data
├── docs/              Implementation report and decisions
└── ai-engineering/    Shared Claude Code workflows (git submodule)
```

```
 Figma ──► frontend (Next.js, static) ──build-time fetch──► backend /api/v1 ◄── Livewire CMS (/admin)
                     └── browser POST /api/v1/enquiries ───────┘                  │
                                                                                  MySQL
```

## Requirements

PHP 8.4 (Laragon: `C:\laragon\bin\php\php-8.4.5-nts-Win32-vs17-x64`), Composer 2,
MySQL 8, Node 22.

## Backend — API + CMS

```bash
cd backend
composer install
cp .env.example .env && php artisan key:generate   # set DB_* (database: pmo)
php artisan migrate --seed                          # schema + live pmo.az content
php artisan storage:link
php artisan serve                                   # http://127.0.0.1:8000
```

- **CMS:** <http://127.0.0.1:8000/admin> — seeded admin `admin@pmo.az`.
  Locally the password is `password`. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD`
  before seeding anywhere else.
- **Tests:** `php artisan test` (uses the `pmo_testing` MySQL database) ·
  **Style:** `./vendor/bin/pint`
- **Seeding:** `php artisan db:seed --class=ContentSeeder` is idempotent. It
  updates content in place and never overwrites settings an admin changed.

### API (`/api/v1`)

| Method | Endpoint | Notes |
| --- | --- | --- |
| GET | `/site` | settings (contact, social), stats, partners, testimonials |
| GET | `/programs` | `?featured=1`, `?family=IPMA`, `?q=` |
| GET | `/services` | pillars + consulting services |
| GET | `/services/{slug}` | consulting service incl. detail page sections |
| GET | `/posts` | paginated; `?category=Məqalələr`, `?per_page=` |
| GET | `/posts/{slug}` | article body + 2 related posts |
| GET | `/experts`, `/books`, `/video-courses` | |
| POST | `/enquiries` | contact form; validated, captcha, honeypot, 5/min per IP, emails the team |

CORS origins come from `CORS_ALLOWED_ORIGINS`.

### Captcha (Cloudflare Turnstile)

The CMS login and the public enquiry form are protected by
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/).

| Where | Setting |
| --- | --- |
| backend `.env` | `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `TURNSTILE_ENABLED` |
| frontend build env | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (same site key) |

- The `.env.example` files ship Cloudflare's always-pass **test keys**. For
  production, create a widget in the Cloudflare dashboard for the site's
  domains and use its keys.
- On the website the widget is invisible unless Cloudflare needs the visitor
  to click it. On the login page it is always shown.
- If captcha is enabled but the secret is missing, or Cloudflare can't be
  reached, submissions are rejected (fails closed). `TURNSTILE_ENABLED=false`
  turns captcha off.

## Frontend

```bash
cd frontend
npm install
npm run dev                         # http://localhost:3000, bundled content
```

Static build:

```bash
# with live content from the API (backend running)
PMO_API_URL=http://127.0.0.1:8000/api/v1 NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1 \
  NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build
# or standalone, using the content bundled in src/lib
npm run build                       # → frontend/out
```

`PMO_API_URL` is read at build time and `NEXT_PUBLIC_API_URL` by the browser
for the enquiry form. Without them the site builds from the design content in
`src/lib/*.ts`, and the form confirms locally.

Seeded images (news covers, experts, testimonials, partners) point at their
live URLs on `https://pmo.az/images/...` (`SeedData::media`). Images uploaded in
the admin live on the backend's `/storage/...`; after the build,
`scripts/localize-media.mjs` (`postbuild`) copies those into `out/storage/` and
rewrites the links, so the exported site does not depend on the backend
running.

## Content sources

- **Live pmo.az** (scraped November 2026 by `tools/scrape-pmo`): 14 news and
  blog posts, 14 experts, service texts, books, video courses, testimonials,
  partner logos and their images. The data is in
  `backend/database/seeders/data/*.json` and the images in `seeders/assets`.
- **Figma design:** programs, stats, consulting services, the PMO service
  detail page and page copy (`backend/database/seeders/data/site.php`).
