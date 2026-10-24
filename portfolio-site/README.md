# Alireza Anari — Project-first Portfolio

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

## Client conversion and trust update — 2026-10-24

The portfolio has been revised after a skeptical nontechnical customer review. **Verified public email:** `alirezaanari119@gmail.com` (provided by the owner for the website). A phone number has not been published.

- Primary contact buttons now open a direct `mailto:` link; LinkedIn remains an alternative, not a required step.
- The homepage project brief still runs entirely in the browser, but can prepare a recipient/subject/body in the visitor's email app through `mailto:`. Pressing the email link only opens a draft; nothing is auto-submitted or stored by the site.
- The homepage explains the three-step proposed working process: describe the need, clarify scope and dependencies before any estimate, then implement and review agreed work. No unverified schedule or success claims.
- Project pages now contrast **actual runnable or source-verifiable functionality** with clear limitations. No fabricated customer reviews, conversion metrics, revenue claims or completed-client logos.
- The three actual project source excerpts remain linked, while Python code excerpts are collapsed by default under an optional technical detail section. The main project path remains plain-language overview → gallery → runnable slice → optional source code.
- Standalone feature pages have one (not duplicate) copy-link button, a direct email action and preserved WhatsApp share/request-similar routes. The original-feature sandboxes are explicitly not production-integrated.
- The isolated Loomera and Velo sample pages include direct project email links and explain that their runnable parts are **not** complete production apps; the original Haniel frontend gains a small portfolio-only email overlay without modifying the original business logic.
- Deployed Cloudflare Worker includes updated server-rendered pages and metadata/fallback email actions. The GitHub repository itself is never linked from public portfolio pages.

## Final launch audit — 2026-10-24

**Live site:** https://alireza-portfolio.alirezaanari117.workers.dev/

The production Worker now serves the original source-backed project slices, the 15 separately shareable feature demos, the bilingual portfolio, and the locally generated project inquiry. No GitHub repository URL is displayed in the portfolio interface. Standalone feature pages remain clearly labeled simulations; the three project slices run specified original project modules. No payments, production accounts, real VPN tunnel, customer bookings or SMS services are connected.

### Persian typography and performance

The supplied YekanBakh4 ProPlus FaNum WOFF2 fonts (400 Regular, 600 SemiBold, 700 Bold) were verified byte-for-byte using SHA-256 against the provided ZIP. The initial CSS contained approximately 195 kB of embedded base64 font data. The production Worker now serves a compact ~2.5 kB CSS file at `/assets/fonts/yekanbakh4-proplus-fanum.v2.css` and three separately cached original WOFF2 weights at `/assets/fonts/yekanbakh4-{regular,semibold,bold}.woff2`. Browsers fetch only needed weights; the actual font bytes are unchanged. V2 CSS URLs were added in `showcase-v2.html`, `index.html`, `authentic-loomera.html` and `authentic-velo.html`. The original Haniel frontend has its own embedded font. The font binaries are not committed to the portfolio repository.

### Final UI and accessibility hardening

- Responsive navigation tightened down to 320px width: the mobile header shows the brand monogram, visible navigation links and language toggle without relying on the wide desktop wordmark.
- Reduced-motion support was added to transitions/animated scroll.
- Basic SSR/no-JavaScript fallback has project/service listings and an external LinkedIn contact link for all three project pages.
- Each individual feature page has a shareable URL and a copy-link control. Request-similar feature links prefill the local brief form with the right work category and capability name.
- Browser-backed interaction QA covers the project brief and copy action, feature search aliases, Loomera service selection, Velo security module and Haniel storefront frontend. The Worker source remains independent of the source repository (GitHub updates do not automatically redeploy it).
### Final post-deploy verification

- Live Cloudflare Browser Rendering checked the **320px** homepage: header and navigation stayed within x=11..309 (viewport 320), hero height was cut from roughly 1178px to 498px, and project cards were visible starting near y=769. Desktop still retains the full hero side panel.
- At **390px** on `/projects/loomera`, the page title, all four gallery images and three source-code blocks stayed within the 390px viewport (geometry x=15..375; code blocks x=16..374).
- At **390px**, the exact `/original/haniel/` frontend rendered multiple product images in the original interface. The storefront returned eight image links, with directly verified hero and necklace image assets. An earlier browser-agent failure appears to have navigated away from the original storefront rather than proving broken images.
- `/assets/fonts/yekanbakh4-proplus-fanum.v2.css` serves only 2.5 kB of style rules, with 400/600/700 fonts loading from separately cached valid `wOF2` endpoints; SHA-256 matches the supplied ZIP.
- `/sitemap.xml` lists **19 public pages**: one homepage, three project pages and fifteen independent feature pages.
- LinkedIn inquiry form submission and its copy action are client-side only, and no actual external communication occurs unless a visitor manually sends the generated message.
## Client conversion improvements — 2026-10-24

- The home hero now explains three services (Backend/API, Bots/Automation, Product Development) rather than using internal wording about source links.
- Added three service-path cards so a visitor can quickly identify the kind of work they need.
- Added a **local-only project brief builder** on the home page: select a work type, optionally describe the need, generate a ready-to-copy Persian/English message, and copy it for LinkedIn. Nothing is submitted automatically or sent to any server.
- Added search to the 15-item feature catalog. Search indexes both Persian and English feature names plus slugs, so queries such as OTP, bot and booking find the relevant standalone page.
- The feature catalog explicitly explains that those individual feature demos are isolated simulations, not live production integrations.
- The first HTML response now includes the service cards and feature links as a no-JavaScript fallback; homepage metadata has also been updated for backend/API/automation search intent.
- Persian UI uses the supplied YekanBakh4 ProPlus FaNum regular, semibold and bold webfont faces. The embedded WOFF2 payloads were SHA-256 checked against the uploaded archive; Regular, SemiBold and Bold match byte-for-byte. The font is served through the Worker CSS route, not checked into the public source repository. Monospace is retained for code samples and technical labels.

**QA:** browser automation verified the new hero and three service cards, service-card-to-contact preselection, generated message and copy action, feature-search filtering, project details with four gallery images/three real-code excerpts, and both real-source Loomera demo links. OTP search initially revealed that search only matched visible Persian labels; the index now includes each feature's English name and slug as well.

## Project demos now execute original source (2026-10-24)

Earlier handcrafted `/demo/:slug` project simulations have been replaced. Those legacy URLs now redirect to actual isolated source-backed project slices. Do **not** market the earlier local-only feature simulations as the original application.

- **Loomera:** https://alireza-portfolio.alirezaanari117.workers.dev/original/loomera/ — Original unmodified ES modules `static/js/components/services.js`, `bookingBar.js`, `storage_keys.js` run within an isolated page. The surrounding service cards and prices are fictional and the flow safely stops after service selection; no Django service or appointment DB.
- **Haniel Gold:** https://alireza-portfolio.alirezaanari117.workers.dev/original/haniel/ — Original frontend `index.html`, `app.js`, `styles.css` and its bundled gallery assets are served directly from allowlisted original source. The original code performs product browsing, filters, favorites and local cart. Only runtime config is overridden to `apiBaseUrl: ''` so no production backend, checkout, payment, customer account or real market prices are accessed.
- **Velo:** https://alireza-portfolio.alirezaanari117.workers.dev/original/velo/ — Original unchanged Python `backend/app/security.py` executes `token_for_user()` and `decode_subject()` directly in the browser using Pyodide WASM with a fake local signing key. The test validates an example identity and rejects a tampered token. This is a genuine FastAPI backend module, **not** the complete Kotlin Android app and **not** a working VPN connection.

Authentic frontend media routes and code modules are allowlisted in the Cloudflare Worker. No GitHub repository links are displayed on the website. Existing standalone `/features/:slug` demos remain mock/synthetic and are clearly separate from original source-backed project slices.

Source templates used for these slices in the portfolio repository: `authentic-loomera.html`, `authentic-velo.html`. Legacy simulated demo source remains for historical feature pages. Full-feature Django and Android production demos require separate isolated backend/Android builds; those are not deployed here.

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
