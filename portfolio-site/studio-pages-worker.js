const icons = {
  home: '<path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9 21v-7h6v7"/>',
  projects: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  lab: '<path d="M9 3h6m-5 0v7L4.5 19a1 1 0 0 0 .9 2h13.2a1 1 0 0 0 .9-2L14 10V3M7.5 15h9"/>',
  resume: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8m-8 4h6"/>',
  contact: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  process: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h9a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9"/>',
  skills: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  play: '<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
  feature: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  terminal: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
  moon: '<path d="M20.9 13.4A9 9 0 0 1 10.6 3.1 9 9 0 1 0 20.9 13.4Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19"/>',
  download: '<path d="M12 3v12m-4-4 4 4 4-4M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
};
const icon = name => `<svg class="studio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icons[name]}</svg>`;
const labels = (fa, en) => `<span class="studio-fa">${fa}</span><span class="studio-en">${en}</span>`;

const links = [
  ['home', '/', 'خانه', 'Home'],
  ['projects', '/#showcase', 'پروژه‌ها', 'Projects'],
  ['lab', '/preview/system-lab', 'آزمایشگاه', 'Lab'],
  ['resume', '/resume', 'رزومه', 'Résumé'],
  ['contact', '/#contact', 'تماس', 'Contact'],
];
const page = {
  projects: ['projects', 'مطالعهٔ موردی', 'Case study'],
  demo: ['play', 'دموی پروژه', 'Project demo', 'projects'],
  features: ['feature', 'قابلیت‌ها', 'Capabilities', 'projects'],
  resume: ['resume', 'رزومه', 'Résumé'],
  lab: ['lab', 'آزمایشگاه سیستم', 'System lab'],
  sample: ['terminal', 'دموی کد اصلی', 'Original code demo', 'lab'],
  storefront: ['terminal', 'دموی فروشگاه', 'Storefront demo', 'lab'],
};

function pageType(path) {
  if (path === '/resume') return 'resume';
  if (path === '/preview/system-lab') return 'lab';
  if (path === '/original/haniel') return 'storefront';
  if (/^\/original\/(loomera|velo|haniel-finance)$/.test(path)) return 'sample';
  return path.match(/^\/(projects|demo|features)\/[^/]+$/)?.[1];
}

export function withStudioPages(upstream, css) {
  const stylesheet = '/assets/studio-pages.v1.css';
  return {
    ...upstream,
    async fetch(request, env, context) {
      const path = new URL(request.url).pathname.replace(/\/$/, '') || '/';
      const isGet = request.method === 'GET';
      if (path === stylesheet && (isGet || request.method === 'HEAD')) {
        return new Response(isGet ? css : null, { headers: {
          'content-type': 'text/css; charset=utf-8',
          'cache-control': 'public, max-age=300',
          'x-content-type-options': 'nosniff',
        } });
      }

      const result = await upstream.fetch(request, env, context);
      if (!isGet || !result.ok || !result.headers.get('content-type')?.includes('text/html')) return result;

      if (['/', '/index.html', '/preview/silver-studio'].includes(path)) {
        const rewriter = new HTMLRewriter().on('head', { element(el) {
          el.append(`<link rel="stylesheet" href="${stylesheet}">`, { html: true });
        } });
        const rail = [
          ['#top', 'home'], ['#showcase', 'projects'], ['#lab', 'lab'], ['#process', 'process'],
          ['#skills', 'skills'], ['/resume', 'resume'], ['#contact', 'contact'],
        ];
        for (const [href, name] of rail) {
          rewriter.on(`.rail-links a[href="${href}"] > span`, { element(el) {
            el.setInnerContent(icon(name), { html: true });
          } });
        }
        rewriter.on('.shelf-top > div > span', { element(el) { el.setInnerContent(icon('projects'), { html: true }); } });
        return rewriter.transform(result);
      }

      const type = pageType(path);
      if (!type) return result;
      const [name, fa, en, active = name] = page[type];
      const nav = `<aside class="studio-navigation"><a href="/" class="studio-brand" aria-label="Alireza Anari"><span class="studio-brand-mark" aria-hidden="true">A</span>Alireza Anari</a><nav class="studio-links" aria-label="Portfolio">${links.map(([id, href, local, english]) =>
        `<a href="${href}"${id === active ? ` aria-current="${type === 'resume' || type === 'lab' ? 'page' : 'location'}"` : ''}>${icon(id)}${labels(local, english)}</a>`
      ).join('')}</nav></aside>`;
      const location = `<div class="studio-location"><a href="/">${labels('خانه', 'Home')}</a><span aria-hidden="true">/</span>${icon(name)}${labels(fa, en)}</div>`;
      return new HTMLRewriter()
        .on('head', { element(el) { el.append(`<link rel="stylesheet" href="${stylesheet}">`, { html: true }); } })
        .on('body', { element(el) {
          const classes = el.getAttribute('class');
          el.setAttribute('class', classes ? `${classes} studio-shell` : 'studio-shell');
          el.setAttribute('data-studio', type);
          el.prepend(nav + location, { html: true });
        } })
        .transform(result);
    },
  };
}
