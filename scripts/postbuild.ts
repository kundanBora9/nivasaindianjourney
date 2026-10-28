/**
 * Runs after `vite build` (see package.json "build").
 *
 * For every real URL on the site it writes dist/<path>/index.html with that page's own <title>,
 * meta description, canonical, Open Graph / Twitter tags and JSON-LD already in the HTML, so
 * Google, Bing, WhatsApp, Facebook, LinkedIn etc. see the right tags without running JavaScript.
 * The React app then takes over exactly as before.
 *
 * It also generates sitemap.xml, 404.html (noindex) and a Netlify-style _redirects file.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getAllPaths, getMetaForPath, REDIRECTS, type RouteMeta } from '../src/seo/routeMeta';
import { SITE_URL, absUrl } from '../src/seo/siteConfig';
import { TOUR_PACKAGES } from '../src/data/packages';

const DIST = path.resolve('dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const seoBlock = (m: RouteMeta): string => {
  const canonical = absUrl(m.canonicalPath);
  const robots = m.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1';
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    ...(m.noindex ? [] : [`<link rel="canonical" href="${canonical}" />`]),
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${esc(m.ogImage)}" />`,
    `<meta property="og:image:alt" content="${esc(m.h1)}" />`,
    `<meta property="og:site_name" content="Nivasa India Journey" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.ogImage)}" />`
  ].join('\n    ');
};

const jsonLdBlock = (m: RouteMeta): string =>
  m.jsonLd
    .map(o => `<script type="application/ld+json" data-seo="route">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');

const noscriptBlock = (m: RouteMeta): string =>
  `<noscript><main style="max-width:720px;margin:2rem auto;padding:0 1rem;font-family:sans-serif"><h1>${esc(m.h1)}</h1><p>${esc(
    m.description
  )}</p><nav><ul><li><a href="/tour-packages">Tour Packages</a></li><li><a href="/rajasthan-tours">Rajasthan Tours</a></li><li><a href="/golden-triangle-tour">Golden Triangle Tours</a></li><li><a href="/destinations">Destinations</a></li><li><a href="/offers">Offers</a></li><li><a href="/travel-blog">Travel Blog</a></li><li><a href="/contact">Contact: +91 8126716179</a></li></ul></nav></main></noscript>`;

const render = (m: RouteMeta): string =>
  template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${seoBlock(m)}\n    <!--seo:end-->`)
    .replace('<!--seo:jsonld-->', jsonLdBlock(m))
    .replace('<!--seo:noscript-->', noscriptBlock(m));

const write = (urlPath: string, html: string) => {
  const target = urlPath === '/' ? path.join(DIST, 'index.html') : path.join(DIST, urlPath, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
};

/* 1. One prerendered HTML file per real URL */
const paths = getAllPaths();
const metas = paths.map(getMetaForPath);
metas.forEach(m => write(m.path, render(m)));

/* 2. Redirect stubs for retired URLs (real 301s come from _redirects on hosts that support it) */
Object.entries(REDIRECTS).forEach(([from, to]) => {
  const target = absUrl(to);
  write(
    from,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><meta http-equiv="refresh" content="0; url=${to}"></head><body><a href="${to}">Continue</a></body></html>`
  );
});
fs.writeFileSync(
  path.join(DIST, '_redirects'),
  Object.entries(REDIRECTS).map(([from, to]) => `${from} ${to} 301`).join('\n') + '\n'
);

/* 3. 404 page (noindex). Hosts that support it serve this with a real 404 status. */
fs.writeFileSync(path.join(DIST, '404.html'), render(getMetaForPath('/__404__')));

/* 4. sitemap.xml: only canonical, indexable URLs */
const urls = metas
  .filter(m => m.inSitemap && !m.noindex)
  .map(m => `  <url>\n    <loc>${SITE_URL}${m.canonicalPath === '/' ? '/' : m.canonicalPath}</loc>\n    <lastmod>${m.lastmod}</lastmod>\n  </url>`)
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
// keep the committed copy in public/ in sync too
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemap);

console.log(
  `[seo] prerendered ${metas.length} pages, ${Object.keys(REDIRECTS).length} redirects, sitemap with ${
    sitemap.split('<url>').length - 1
  } URLs (${TOUR_PACKAGES.length} packages)`
);
