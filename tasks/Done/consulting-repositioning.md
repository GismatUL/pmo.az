# Task: Reposition PMO.az as a project management consulting firm

Branch: feature/consulting-repositioning

## Objective

We need to reposition the PMO.az website based on new client feedback.

#### Business context

The client likes the current website design but feels that its messaging and content are too focused on training, education, and professional development. The current direction feels more suitable for PMU (their training-oriented platform).

PMO.az must have a different business identity. Its primary focus should be:

- Project Management Consulting
- Project Management Advisory Services
- Project Management Office (PMO) Establishment and Implementation
- Project Portfolio Management
- Project Planning, Monitoring, and Control
- Project Governance and Management Systems
- Organizational Project Management Improvement

Training and educational programs can remain as secondary offerings, but they must not dominate the website.

#### Your task

Analyze the existing PMO.az project, particularly its homepage, content structure, components, and messaging.

Your primary responsibility is to **rewrite and restructure the website content to position PMO.az as a professional project management consulting and advisory company.**

#### Key requirements

1. **Hero section**
    - Replace training-oriented messaging with consulting-focused positioning.
    - Communicate how PMO.az helps organizations manage projects effectively and achieve strategic objectives.
    - Use professional, confident, business-oriented messaging.
    - Introduce relevant CTAs such as "Explore Our Services" and "Request a Consultation".

2. **Services**
    - Prioritize consulting and project management services.
    - Explain the actual business value of each service.
    - Avoid presenting courses and training programs as primary services.

3. **Why PMO.az**
    - Communicate the value of professional project management.
    - Focus on organizational efficiency, project delivery, governance, transparency, and strategic alignment.

4. **Our approach**
    - Present a consulting-oriented methodology, such as assessment, planning, implementation, monitoring, and continuous improvement.
    - Explain how PMO.az works with organizations.

5. **Experience and expertise**
    - Make room for case studies, completed projects, achievements, and relevant expertise.
    - Do not invent clients, statistics, certifications, or project results.

6. **Training**
    - Keep training as a secondary offering if appropriate.
    - It should not compete visually or contextually with consulting services.

7. **Final CTA**
    - Encourage businesses and organizations to discuss their project management challenges and request professional consultation.

#### Design and technical constraints

- Do not redesign the entire website from scratch.
- Preserve the existing visual identity, typography, color palette, spacing system, and reusable components wherever possible.
- Preserve the existing responsive behavior.
- Maintain the current Next.js 15 frontend, Laravel 12 backend, Livewire 3 CMS, REST API, and MySQL architecture.
- Keep the existing CMS functionality and content management capabilities working.
- Do not introduce unnecessary dependencies or architectural changes.

#### Content quality

- Write natural, professional, convincing business-oriented copy.
- Avoid generic marketing buzzwords and exaggerated claims.
- Make the website feel like an established consulting firm rather than an educational institution.
- Ensure headings, descriptions, CTAs, and section content communicate a consistent business identity.
- Keep the content concise and easy to scan.

#### Important workflow

Before implementing changes:

1. Inspect the existing website and identify all training-oriented content.
2. Map the current homepage sections against the desired consulting-oriented structure.
3. Propose replacement content and explain what should be changed, retained, removed, or repositioned.
4. Identify any existing CMS content that needs updating.

After that, implement the content and structural changes.

**Important:** The goal is not simply to replace a few words. The entire homepage should communicate a coherent consulting-focused business proposition. Think from the perspective of a company executive looking for a professional partner to establish a PMO, improve project governance, or manage complex projects.

## Investigation

Training-oriented content found before the change:

| Where | What it said | Problem |
| --- | --- | --- |
| Site title / meta | "Layihə düşüncə məktəbi" (school); "təlim, sertifikasiya və konsaltinq" | Education first |
| Navigation | "Proqramlar" first, then "Xidmətlər" | Courses lead the menu |
| Home hero | "Layihə düşüncə məktəbi"; CTA "Proqramları kəşf et" → /programs | Training is the primary CTA |
| Home trust strip | IPMA, GPM, PeopleCert, APMG, "PMI imtahan hazırlığı" | Training accreditations |
| Home section 01 | Program catalogue with filter chips ("Növbəti addımınız buradan başlayır") | Courses are the first content block |
| Home section 02 | Pillars Təlimlər / Sertifikasiya / Tətbiq, training first | Consulting is pillar 3 of 3 |
| Home section 04 | Books with prices, video-course banner | Product shop on the home page |
| Home contact | "Sizə uyğun proqramı … müəyyən edək" | Course enquiry |
| Stats (CMS) | 2000+ məzun, 500+ sertifikasiya first | Training numbers lead |
| Services page | "Bilikdən tətbiqə"; pillars training first; 4-step approach | Training-first framing |
| About page | "Layihə Düşüncə Məktəbi", "Sadəcə təlim deyil. Düşüncə məktəbi." | School identity |
| Contact page | Intro and FAQ about program registration and video lessons | Course enquiries |
| Service detail "Related" | "Korporativ təlimlər" first, static list | Training cross-sell on consulting pages |
| Footer | "Proqramlar" first | |

## Home page mapping (current → new)

| Before | After | Action |
| --- | --- | --- |
| Hero: school slogan, CTA "Proqramları kəşf et" | Hero: "Strategiyadan icraya. Sistemli idarəetmə. Nəzarətdə layihələr."; CTAs "Xidmətlərlə tanış olun", "Konsultasiya istəyin" | Rewritten |
| Stats (2000+ məzun first) | Same stats, projects and experts first | Reordered (no new numbers) |
| Trust: training accreditations | "Beynəlxalq standartlara əsaslanan yanaşma": ISO 21500/21502, IPMA ICB4 · Delta®, ISO 10006, GPM P5 · GPM360®, APMG · PeopleCert | Repositioned |
| 01 Programs catalogue | 01 Consulting services (top 5 from CMS) | Replaced; catalogue stays on /programs |
| 02 Pillars (training first) | 02 Why professional project management (4 values + why PMO.az) | New |
| — | 03 Our approach: Qiymətləndirmə → Planlaşdırma → Tətbiq → Monitorinq → Təkmilləşdirmə | New |
| 03 GreenPM case study | 04 Experience: GreenPM case + İTMİM, Drakaris/Yigim, AZS ISO 21500/21502 | Extended with existing facts |
| 04 Knowledge: news, books with prices, video banner | 05 Training and knowledge: news + compact training list linking to /programs | Condensed, secondary |
| 05 Contact: "Növbəti layihəniz haqqında danışaq" | 06 Consultation: "Layihə ehtiyacınızı müzakirə edək", company field, "Konsultasiya istəyin" | Rewritten |

## Proposed Solution

- Position PMO.az as a project-management consulting and advisory firm on
  every page, training kept as a clearly secondary line.
- Consulting services, in priority order (CMS `consulting_services`):
  1. PMO qurulması və inkişafı (existing, full detail page)
  2. Layihə portfelinin idarə edilməsi (new)
  3. Layihə və proqram idarəetmə dəstəyi: planning, monitoring and control (rewritten)
  4. Layihə idarəetmə sistemi və governance (new)
  5. Layihə idarəetmə yetkinliyinin qiymətləndirilməsi (new; IPMA Delta®, ISO 10006 from the live site)
  6. Dayanıqlı layihə menecmenti
  7. DÖT / PPP məsləhətçiliyi
  8. Transformasiya və dəyişikliklər
  Each service got a value statement (`intro`) shown on its page.
- Pillars reordered and renamed: Konsaltinq və tətbiq → Qiymətləndirmə və
  sertifikasiya → Təlimlər.
- No invented clients, statistics or results. Every claim comes from the
  approved design or the live pmo.az content (İTMİM, Drakaris/Yigim,
  Hilton Garden Inn GPM360, AZS ISO 21500/21502, ISO 10006, IPMA Delta®,
  "dəstəkverici və birbaşa layihələrdə iştirak edən PMO modeli").
- No new dependencies, models or API changes. The existing components and
  CSS classes are reused; about 25 lines of CSS were added for the new home
  sections.

## Approval

- [x] Approved: the task brief asks to propose and then implement.

## Implementation

- **Frontend:**
  - `src/app/page.tsx`: home page restructured as mapped above.
  - `src/lib/services.ts`: 8 consulting services with intros, consulting-first pillars, and new `APPROACH`, `VALUE` and `EXPERIENCE` data.
  - `services/page.tsx`: new hero, shared 5-step approach, consultation CTA.
  - `services/[slug]/page.tsx`: service intro in the hero; related services now come from the consulting list instead of a static training-first list.
  - `about`, `contact`, `programs` (renamed "Təlimlər"), `layout` metadata, NAV and footer order and tagline.
- **Backend seed data:** `database/seeders/data/site.php` now matches the frontend: stats order, pillars and 8 consulting services. The seeder is idempotent.
- **Local CMS:** `ContentSeeder` was run on the local `pmo` database, so the CMS now holds the new content.
- **Fixed along the way:** the build reused API responses from `.next/cache/fetch-cache`, so rebuilding after CMS edits served stale content. New services were missing from the build. `npm run build` now clears that cache first (`prebuild`).

## Verification

- **Tests:** `php artisan test`: 29 passed (165 assertions). `ContentApiTest` now asserts the consulting order (8 services, PMO then portfolio) and the pillar and stats order.
- **Static analysis / lint:** `tsc --noEmit` is clean and Pint passes.
- **Build:** a static build from the live local API generates all 8 service pages.
- **Visual:**
  - Home was screenshotted at 1440 px and at an exact 390 px (iframe harness), along with the services page and a new service page. No overflow, and the layout and tokens are unchanged.
  - Fixed during this check: "Qiymətləndirmə" broke mid-word in the 5-column step row. Five-step rows now use 26 px titles.

## Measurements

Not applicable.

## Completion

- Status: Done
- Started: 2026-11-14 (time not recorded)
- Completed: 2026-11-14
- Active work: unknown
- Elapsed time: unknown

## Notes

- Branch: `feature/consulting-repositioning` (from `origin/main`). Not committed or pushed yet; awaiting review.
- Re-running `ContentSeeder` on another environment overwrites admin edits to programs, pillars, consulting services and stats with this content.

## Remaining Work

1. **Logo tagline.** The logo image itself reads "layihə düşüncə məktəbi" (school). The client should supply a consulting-appropriate logo lockup.
2. **Detail pages for new services.** Only the PMO service has a full detail page (outcomes, process, experience). The other 7 show hero, intro, related services and CTA. The client should provide outcome and process content and real case examples.
3. **Case studies in the CMS.** The experience cards are code constants. A "Layihələr / Case studies" content type would let the team add projects without a deploy.
4. **Stats.** All four numbers come from the design. Consulting-specific figures (for example organisations served, PMOs established) would strengthen the message, but only with real data from the client.
5. **Header "Daxil ol".** It links to the edu.pmo.az learning platform. Consider moving it to the footer or the Təlimlər page.
6. **Featured news.** The home news card shows the latest featured post, currently a training announcement. Featuring an article or case in the CMS would fit the new positioning better.
7. **RU / EN** versions of the new copy.
