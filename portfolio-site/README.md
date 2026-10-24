# Alireza Anari — Portfolio Website

A lightweight, responsive, bilingual (FA/EN) engineering portfolio focusing on Django, Python, REST APIs, booking platforms and practical software development.

## Live website

https://alireza-portfolio.alirezaanari117.workers.dev/

## Source

- [index.html](./index.html): Entire static portfolio (HTML, CSS, JavaScript). No build step or external UI framework required.
- Public GitHub projects are rendered in a built-in fallback gallery. After page load, the gallery refreshes from the public GitHub REST API for `alireza-anari`. Private repositories and the profile README repository are excluded.
- Featured projects have editorial descriptions drawn from public README documents.
- Language toggle supports Persian RTL and English LTR.

## Working with the design

To preview locally, open `index.html` in a browser, or start a static server in this folder:

```sh
python -m http.server 8000
```

To change content, update the HTML and the `messages.fa` / `messages.en` strings in the inline script.

## Deployment

The live version was published as a standalone Cloudflare Worker named `alireza-portfolio` in the connected Cloudflare account. The Worker returns the static HTML and serves /favicon.svg, /robots.txt and /sitemap.xml.

**Note:** The Cloudflare Worker currently contains a deployed copy of index.html. Editing this GitHub file does not update the live Worker until you deploy the modified HTML again. A separate CI/CD pipeline is not configured.

An alternative is to deploy this folder as a static project on Cloudflare Pages (output folder = this folder, no build command) and connect a GitHub workflow, enabling automatic redeployments on changes.

## Privacy

This site intentionally does not disclose private-repository details, private credentials or a contact email not explicitly confirmed for public use. Visitors can contact via the LinkedIn and GitHub links in the site.

## Next enhancements

- Add a verified public contact email and/or inquiry form.
- Connect a custom domain and configure Search Console.
- Add selected project screenshots and measurable engineering outcomes, where accurate.
- Create dedicated case-study pages for flagship projects.
