# Alireza Anari — Feature-first Portfolio

**Live**: https://alireza-portfolio.alirezaanari117.workers.dev/

This portfolio is intentionally **client-facing and source-free**: no GitHub repo links, no public repository listing, and no dependency on the development status of a repo. It focuses on skills, product overviews and individually shareable interactive feature demos.

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
