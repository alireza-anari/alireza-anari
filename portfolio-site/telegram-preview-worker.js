// Apply after the public portfolio preview middleware.
export function withMinimalTelegramPreview(upstream) {
  return {...upstream, async fetch(request, env, context) {
    const result = await upstream.fetch(request, env, context);
    const path = new URL(request.url).pathname;
    if (request.method !== 'GET' || !['/', '/index.html'].includes(path) ||
        !/TelegramBot/i.test(request.headers.get('user-agent') || '') ||
        !result.ok || !result.headers.get('content-type')?.includes('text/html')) return result;
    const blank = '\u2800';
    const headers = new Headers(result.headers);
    headers.append('Vary', 'User-Agent');
    const response = new Response(result.body, {status: result.status, headers});
    return new HTMLRewriter()
      .on('title', {element(el) { el.setInnerContent(blank); }})
      .on('meta[property="og:title"], meta[property="og:description"], meta[property="og:site_name"], meta[name="description"], meta[name="twitter:title"], meta[name="twitter:description"]',
        {element(el) { el.remove(); }})
      .on('head', {element(el) {
        el.append(['og:title','og:description','og:site_name'].map(property =>
          '<meta property="' + property + '" content="' + blank + '">').join(''), {html:true});
      }})
      .transform(response);
  }};
}
