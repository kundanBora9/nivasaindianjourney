import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getMetaForPath } from './routeMeta';
import { absUrl, SITE_NAME } from './siteConfig';

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

/**
 * Keeps <title>, meta description, canonical, Open Graph, Twitter and JSON-LD in sync with the
 * current route. The same data (src/seo/routeMeta.ts) is used at build time by
 * scripts/postbuild.ts, so crawlers that do not run JavaScript see identical tags.
 */
export const RouteSEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMetaForPath(pathname);
    const canonical = absUrl(meta.canonicalPath);

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta(
      'name',
      'robots',
      meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'
    );
    if (meta.noindex) {
      document.head.querySelector('link[rel="canonical"]')?.remove();
    } else {
      upsertCanonical(canonical);
    }

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:type', meta.ogType);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', meta.ogImage);
    upsertMeta('property', 'og:image:alt', meta.h1 || SITE_NAME);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.ogImage);

    document.head.querySelectorAll('script[data-seo="route"]').forEach(n => n.remove());
    meta.jsonLd.forEach(obj => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', 'route');
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [pathname]);

  return null;
};
