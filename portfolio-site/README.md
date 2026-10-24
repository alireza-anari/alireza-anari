# Alireza Anari — Feature-first Portfolio

**Live**: https://alireza-portfolio.alirezaanari117.workers.dev/

This portfolio is intentionally **client-facing and source-free**: no GitHub repo links, no public repository listing, and no dependency on the development status of a repo. It focuses on skills, product overviews and individually shareable interactive feature demos.

## 2026-10-24: Project-first redesign (deployed)

**The homepage and project pages now target nontechnical clients.** Visitors first pick one of three products. Each project detail is ordered as: plain-language summary, business challenge, solution, an authentic-labeled image gallery with click-to-enlarge, a prominent **Launch Interactive Demo** CTA, and finally **three curated excerpts from actual source files** with Persian/English explanations and source path labels. No source repository links are published on the portfolio.

Standalone safe sample-data demos:

- [Loomera project demo](https://alireza-portfolio.alirezaanari117.workers.dev/demo/loomera): appointment-slot conflict checks from the sandbox API, sample Loomi assistant and bot interface.
- [Velo project demo](https://alireza-portfolio.alirezaanari117.workers.dev/demo/velo): guest/premium, time credits, reward controls and simulated connection state. **No VPN tunnel**.
- [Haniel Gold project demo](https://alireza-portfolio.alirezaanari117.workers.dev/demo/haniel-gold): product imagery and sample pricing via isolated API. **Not a live quote**.

**New sources:** `showcase-v2.html` (design/template), `showcase-v2.js` (bilingual page and interactive product demos), `showcase-v2-data.json` (nontechnical stories, labeled images and original curated code snippets). The previous `index.html` remains for 15 feature-specific URLs (backwards compatibility), using the existing `advanced-demos.js` and `showcase-api-worker.js`.

Images proxy through allowlisted `/media/gallery/:asset` from already published assets. Loomera shows a pre-launch UI overview and frontend visuals; Velo shows mockups and a brand asset; Haniel shows storefront visual assets. Images are explicitly labeled rather than presented as real production screenshots. All API demos use fictional values, are isolated from the original products, and do not create real users/bookings/payments.

## Published feature demos

- [لومی؛ دستیار هوشمند](https://alireza-portfolio.alirezaanari117.workers.dev/features/loomi) — Loomera
- [ربات تلگرام](https://alireza-portfolio.alirezaanari117.workers.dev/features/telegram-bot) — Loomera
- [ربات بله](https://alireza-portfolio.alirezaanari117.workers.dev/features/bale-bot) — Loomera
- [احراز هویت OTP](https://alireza-portfolio.alirezaanari117.workers.dev/features/otp-auth) — Loomera · Velo
- [موتور رزرو و زمان‌بندی](https://alireza-portfolio.alirezaanari117.workers.dev/features/booking) — Loomera
- [لینک و QR رزرو](https://alireza-portfolio.alirezaanari117.workers.dev/features/quick-links) — Loomera
- [داشبوردهای چندنقشی](https://alireza-portfolio.alirezaanari117.workers.dev/features/role-dashboards) — Loomera
- [سیستم اعلان و یادآوری](https://alireza-portfolio.alirezaanari117.workers.dev/features/notifications) — Loomera
- [چرخه وضعیت پرداخت](https://alireza-portfolio.alirezaanari117.workers.dev/features/payment-states) — Loomera
- [گزارش‌ها و تحلیل عملیات](https://alireza-portfolio.alirezaanari117.workers.dev/features/analytics) — Loomera
- [جست‌وجوی خدمات](https://alireza-portfolio.alirezaanari117.workers.dev/features/discovery) — Loomera
- [تخفیف و کوپن](https://alireza-portfolio.alirezaanari117.workers.dev/features/discounts) — Loomera
- [مدیریت اتصال VPN](https://alireza-portfolio.alirezaanari117.workers.dev/features/vpn-control) — Velo
- [پاداش و وفاداری](https://alireza-portfolio.alirezaanari117.workers.dev/features/loyalty) — Velo
- [موتور قیمت‌گذاری طلا](https://alireza-portfolio.alirezaanari117.workers.dev/features/gold-pricing) — Haniel Gold

## Product overviews

- [Loomera — پلتفرم رزرو و عملیات](https://alireza-portfolio.alirezaanari117.workers.dev/projects/loomera)
- [Velo — محصول Android و شبکه](https://alireza-portfolio.alirezaanari117.workers.dev/projects/velo)
- [Haniel Gold — تجارت الکترونیک](https://alireza-portfolio.alirezaanari117.workers.dev/projects/haniel-gold)

## Edge-backed interactive demonstrations

Four important showcases now send real HTTP requests to an isolated Cloudflare Worker **demo API** with simulated, invented data. The relevant routes are:

- `POST /api/showcase/loomi` — deterministic, public-read-only sample intent handling (no real LLM inference)
- `POST /api/showcase/bot` — simulated Telegram/Bale role-based menus; no messages are sent
- `POST /api/showcase/booking` — booking conflict check; busy time returns `HTTP 409`; no bookings are stored
- `POST /api/showcase/otp` — fixed code `123456`; no OTP delivery, account or session is created
- `GET /api/showcase/health` — stateless API health response

Source for the API route logic is documented in `showcase-api-worker.js`. All API request and response bodies are sample-only, payload-size limited, and not intentionally persisted. This **demonstrates the HTTP interaction pattern, not the live product's backend**.

Additionally, the home page includes an optional, locally composed project brief: users can describe the kind of work they need, preview a proposed message, and copy it. This runs in the browser and does not transmit the brief to a server.

## Product case studies and visuals

- `/projects/loomera`: engineering challenge, architectural approach, client use cases, related module demos and an approved pre-launch product UI showcase.
- `/projects/velo`: mobile/backend engineering story and a **labeled design mockup**, not a released-app screenshot.
- `/projects/haniel-gold`: rate-sensitive commerce engineering narrative with a clear staging/real-payment disclaimer and **no reused brand imagery**.
- Two explicitly allowlisted `/media/project/:slug` endpoints fetch public, already-published media as same-origin images with long cache headers. Media is lazy-loaded, and visitors are not directed to source repositories. If origin media becomes unavailable, it must be replaced with independent approved assets; do not silently claim it remains online.

## Feature-specific sales funnel

- All standalone demos have a direct URL; each can be shared by copying the link, and feature pages include a WhatsApp sharing option.
- A project's collaboration CTA goes to `/?project=<slug>#contact`. A feature's collaboration CTA goes to `/?feature=<slug>#contact`.
- The contact composer selects a suitable project category and includes the originating demo/project URL in the locally assembled message. The customer manually copies the text and contacts the engineer through LinkedIn. **The site does not collect or send submitted leads**; do not imply that clicking compose has sent a message.
- Persian and English display text are supported. The underlying sample feature functionality remains intentionally limited and honest about pre-launch status.

## Extended server-backed feature catalog (October 2026)

Seven additional feature showcases now use isolated Cloudflare Worker POST endpoints and show request/response traces:

| Route | Demonstration | Important boundary |
| --- | --- | --- |
| `POST /api/showcase/discounts` | Code validation, minimum subtotal, discount caps, explicit error responses | No real purchases or transactions |
| `POST /api/showcase/notifications` | Event templates, roles, channels and opt-out suppression | No SMS, Bale or other messages sent |
| `POST /api/showcase/analytics` | Aggregation and trend series by sample period | Fixed synthetic data, no real analytics |
| `POST /api/showcase/gold-pricing` | Weight × fictional base rate plus illustrative labor | No verified market rate, taxes, margin or selling price |
| `POST /api/showcase/role-dashboards` | Role-scoped views and a sample HTTP 403 denial | Policy simulation, not actual user authentication |
| `POST /api/showcase/quick-links` | Sample direct-booking paths and attribution labels | No live booking links or scannable QR codes |
| `POST /api/showcase/payment-states` | Allowed transitions and HTTP 409 for invalid order | Stateless scenario, no funds moved or payment recorded |

The existing four demos (`loomi`, `bot`, `booking`, `otp`) remain in service, giving **11 API-backed showcase concepts across 15 feature pages**. Advanced feature UI lives in `advanced-demos.js`, served at `/assets/advanced-demos.js`. The other feature pages use local-only interactive sample scenarios. Both styles are clearly labeled as nonproduction.

Structured metadata includes WebSite/CreativeWork JSON-LD and per-page Open Graph metadata, with appropriate product imagery for selected case studies. Scripts are dependency-free; images load lazily. Social sharing and sitemap URLs point to the portfolio, never to source repositories.

## Demo boundaries

All interactive demos are independently implemented in client-side JavaScript, using **fictional data and illustrative flows**. They are **not connected** to the original products, live LLM inference, messaging providers, SMS, payments, real VPN connections or operational databases. Some underlying product modules require deployment configuration or additional release readiness work. The portfolio describes capabilities without claiming that unfinished products are production-ready.

## Files & deployment

- `index.html`: responsive, bilingual HTML/CSS/JS website, initial static content and feature catalog.
- Published as Cloudflare Worker `alireza-portfolio` (Cloudflare account subdomain `alirezaanari117`).
- The Worker includes server-rendered introductory content for each `/features/:slug` and `/projects/:slug` URL, and then client JavaScript enhances the detail page into a functional demo.
- The Worker serves favicon, robots.txt, sitemap.xml, and feature-specific SEO metadata.

**Deployment process:** Changes to this GitHub source file do not automatically redeploy Cloudflare. The current live Worker is a separate deployed copy. Re-upload the updated page to the Worker, or configure Git-based CI/CD later.

## Maintainability

Feature definitions and demo scenarios are inside the inline script. Edit the feature catalog, translations and demo logic together when changing features. Do not add live service credentials or private code to the public portfolio.
