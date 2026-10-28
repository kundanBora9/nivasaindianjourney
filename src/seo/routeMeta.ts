import { TOUR_PACKAGES, getPackageBySlug } from '../data/packages';
import { DESTINATIONS, getDestinationBySlug } from '../data/destinations';
import { ALL_OFFERS, getOfferBySlug } from '../data/offers';
import { BLOG_POSTS, getBlogPostBySlug } from '../data/blogs';
import { ALL_FAQS } from '../data/faqs';
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, LOGO_PATH, absUrl } from './siteConfig';

export interface RouteMeta {
  path: string; // the URL this meta belongs to
  title: string;
  description: string;
  canonicalPath: string; // may differ from path for alias URLs
  ogImage: string; // absolute
  ogType: 'website' | 'article';
  noindex: boolean;
  jsonLd: Record<string, unknown>[];
  h1: string; // used for the <noscript> fallback only
  inSitemap: boolean;
  lastmod?: string; // YYYY-MM-DD
}

/* ---------- helpers ---------- */

export const normalizePath = (p: string): string => {
  let out = (p || '/').split('?')[0].split('#')[0];
  if (!out.startsWith('/')) out = '/' + out;
  if (out.length > 1) out = out.replace(/\/+$/, '');
  return out;
};

const clip = (text: string, max: number): string => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:\-–—\s]+$/, '') + '…';
};

/** "<base> | Nivasa India Journey" when it fits in ~60 chars, otherwise the base alone. */
const buildTitle = (base: string): string => {
  const withBrand = `${base} | ${SITE_NAME}`;
  return withBrand.length <= 62 ? withBrand : clip(base, 62);
};

const parseDate = (human: string): string | undefined => {
  const d = new Date(human);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
};

const BUILD_DATE = new Date().toISOString().slice(0, 10);

const crumbsLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absUrl(it.path)
  }))
});

const faqLd = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer }
  }))
});

const providerRef = { '@type': 'TravelAgency', '@id': `${SITE_URL}/#agency`, name: SITE_NAME };

const make = (partial: Partial<RouteMeta> & Pick<RouteMeta, 'path' | 'title' | 'description' | 'h1'>): RouteMeta => ({
  canonicalPath: partial.path,
  ogImage: absUrl(DEFAULT_OG_IMAGE),
  ogType: 'website',
  noindex: false,
  jsonLd: [],
  inSitemap: true,
  lastmod: BUILD_DATE,
  ...partial
});

/* ---------- listing / static page definitions ---------- */

interface ListingDef {
  path: string;
  category?: string;
  title: string;
  description: string;
  h1: string;
  crumb: string;
}

const LISTINGS: ListingDef[] = [
  {
    path: '/tour-packages',
    title: 'India Tour Packages: Private Chauffeur Tours',
    description:
      'Browse private chauffeur-driven India tour packages: Rajasthan, Golden Triangle, Taj Mahal sunrise, Delhi and same-day tours with verified hotels and guides.',
    h1: 'All India Tour Packages & Itineraries',
    crumb: 'Tour Packages'
  },
  {
    path: '/rajasthan-tours',
    category: 'rajasthan',
    title: 'Rajasthan Tour Packages: Forts, Palaces & Deserts',
    description:
      'Private Rajasthan tour packages covering Jaipur, Jodhpur, Udaipur, Jaisalmer and Ranthambore with AC cars, verified heritage havelis and licensed guides.',
    h1: 'Rajasthan Tour Packages & Royal Forts',
    crumb: 'Rajasthan Tours'
  },
  {
    path: '/golden-triangle-tour',
    category: 'golden-triangle',
    title: 'Golden Triangle Tour Packages: Delhi, Agra, Jaipur',
    description:
      'Private Golden Triangle tours from Delhi to Agra and Jaipur, with Taj Mahal sunrise and optional Udaipur or Varanasi extensions. Chauffeur-driven and customizable.',
    h1: 'Golden Triangle Tours (Delhi · Agra · Jaipur)',
    crumb: 'Golden Triangle Tours'
  },
  {
    path: '/agra-tour-packages',
    category: 'agra-taj',
    title: 'Agra & Taj Mahal Tour Packages | Sunrise Tours',
    description:
      'Private Taj Mahal sunrise tours, Agra Fort and Mehtab Bagh visits, plus same-day Agra car tours from Delhi via the Yamuna Expressway with licensed guides.',
    h1: 'Agra & Taj Mahal Tour Packages',
    crumb: 'Agra & Taj Mahal Tours'
  },
  {
    path: '/delhi-tour-packages',
    category: 'delhi',
    title: 'Delhi Sightseeing Tours: Old & New Delhi Heritage',
    description:
      'Private Delhi sightseeing tours covering Chandni Chowk, Jama Masjid, Humayun’s Tomb, Qutub Minar and India Gate with verified local drivers and guides.',
    h1: 'Delhi Sightseeing & Heritage Tours',
    crumb: 'Delhi Tours'
  },
  {
    path: '/same-day-tours',
    category: 'same-day',
    title: 'Same Day Tours from Delhi: Agra, Jaipur, Mathura',
    description:
      'One-day private car tours from Delhi: same-day Agra Taj Mahal, Jaipur express sightseeing and Mathura-Vrindavan spiritual trips with a dedicated chauffeur.',
    h1: 'Same Day Express Tours from Delhi',
    crumb: 'Same Day Tours'
  }
];

const itemListLd = (name: string, items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: absUrl(it.path),
      name: it.name
    }))
  }
});

/* ---------- alias handling ---------- */

/** Package slugs that are also reachable at a top-level URL (see App.tsx). */
const PACKAGE_ALIAS_PATHS = [
  '/rajasthan-tour-packages',
  '/jaipur-tour-packages',
  '/jaisalmer-tour-packages',
  '/ranthambore-tour-packages',
  '/golden-triangle-tour-with-udaipur',
  '/same-day-agra-tour-from-delhi'
];

/** Old/broken URLs that never matched a package. They redirect (App.tsx + _redirects). */
export const REDIRECTS: Record<string, string> = {
  '/golden-triangle-tour-5-days': '/tour-packages/golden-triangle-tour',
  '/taj-mahal-sunrise-tour': '/tour-packages/same-day-agra-tour-from-delhi',
  '/delhi-one-day-tour': '/tour-packages/delhi-tour-packages'
};

/* ---------- main resolver ---------- */

const notFoundMeta = (path: string): RouteMeta =>
  make({
    path,
    title: `Page Not Found | ${SITE_NAME}`,
    description: 'The page you are looking for could not be found. Explore our India tour packages instead.',
    h1: 'Page Not Found',
    noindex: true,
    inSitemap: false
  });

export function getMetaForPath(rawPath: string): RouteMeta {
  const path = normalizePath(rawPath);

  /* Home */
  if (path === '/') {
    return make({
      path,
      title: 'Nivasa India Journey | Rajasthan & Golden Triangle Tours',
      description:
        'Private Rajasthan, Golden Triangle and Taj Mahal sunrise tours with chauffeur-driven cars, verified heritage hotels and licensed guides. Call +91 8126716179.',
      h1: 'Discover India’s Royal Heritage',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: 'en-IN',
          publisher: { '@id': `${SITE_URL}/#agency` }
        }
      ]
    });
  }

  /* Listing pages */
  const listing = LISTINGS.find(l => l.path === path);
  if (listing) {
    const pkgs = listing.category ? TOUR_PACKAGES.filter(p => p.category === listing.category) : TOUR_PACKAGES;
    return make({
      path,
      title: listing.title,
      description: listing.description,
      h1: listing.h1,
      jsonLd: [
        crumbsLd([{ name: listing.crumb, path }]),
        itemListLd(listing.h1, pkgs.map(p => ({ name: p.title, path: `/tour-packages/${p.slug}` })))
      ]
    });
  }

  /* Package detail: canonical is /tour-packages/:slug */
  const pkgSlug = path.startsWith('/tour-packages/')
    ? path.replace('/tour-packages/', '')
    : PACKAGE_ALIAS_PATHS.includes(path)
    ? path.slice(1)
    : null;
  if (pkgSlug) {
    const tour = getPackageBySlug(pkgSlug);
    if (!tour) return notFoundMeta(path);
    const canonicalPath = `/tour-packages/${tour.slug}`;
    const isAlias = path !== canonicalPath;
    const desc = `${tour.duration}: ${tour.overview}`;
    return make({
      path,
      canonicalPath,
      title: buildTitle(`${tour.title}`),
      description: clip(desc, 158),
      ogImage: absUrl(tour.featuredImage),
      h1: tour.title,
      inSitemap: !isAlias,
      jsonLd: [
        crumbsLd([
          { name: 'Tour Packages', path: '/tour-packages' },
          { name: tour.title, path: canonicalPath }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: tour.title,
          description: tour.overview,
          url: absUrl(canonicalPath),
          image: [tour.featuredImage, ...tour.galleryImages.slice(0, 3)].map(absUrl),
          touristType: tour.idealFor,
          provider: providerRef,
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: tour.itinerary.length,
            itemListElement: tour.itinerary.map(d => ({
              '@type': 'ListItem',
              position: d.day,
              name: `Day ${d.day}: ${d.title}`
            }))
          }
        },
        ...(tour.faqs && tour.faqs.length ? [faqLd(tour.faqs)] : [])
      ]
    });
  }

  /* Destinations */
  if (path === '/destinations') {
    return make({
      path,
      title: 'India Destinations: Jaipur, Agra, Udaipur & More',
      description:
        'Explore top India destinations: Jaipur, Agra, Udaipur, Jodhpur, Jaisalmer, Delhi and Ranthambore. Best time to visit, key attractions and recommended trip length.',
      h1: 'India Destinations',
      jsonLd: [
        crumbsLd([{ name: 'Destinations', path }]),
        itemListLd('India Destinations', DESTINATIONS.map(d => ({ name: d.name, path: `/destinations/${d.slug}` })))
      ]
    });
  }
  if (path.startsWith('/destinations/')) {
    const dest = getDestinationBySlug(path.replace('/destinations/', ''));
    if (!dest) return notFoundMeta(path);
    return make({
      path,
      title: buildTitle(`${dest.name} Travel Guide & Tours`),
      description: clip(`${dest.tagline}. ${dest.description}`, 158),
      ogImage: absUrl(dest.image),
      h1: dest.name,
      jsonLd: [
        crumbsLd([
          { name: 'Destinations', path: '/destinations' },
          { name: dest.name, path }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'TouristDestination',
          name: dest.name,
          description: dest.description,
          url: absUrl(path),
          image: absUrl(dest.image),
          containedInPlace: { '@type': 'AdministrativeArea', name: dest.state },
          includesAttraction: dest.keyAttractions.map(a => ({ '@type': 'TouristAttraction', name: a }))
        }
      ]
    });
  }

  /* Offers */
  if (path === '/offers') {
    return make({
      path,
      title: 'India Tour Offers & Holiday Deals | Nivasa India Journey',
      description:
        'Current India tour offers: Rajasthan heritage packages and Golden Triangle deals with private cars, verified hotels and licensed guides. Request a custom quote.',
      h1: 'Tour Offers & Holiday Deals',
      jsonLd: [crumbsLd([{ name: 'Offers', path }])]
    });
  }
  if (path === '/offers/rajasthan-tour-offers' || path === '/offers/golden-triangle-tour-offers') {
    const isRaj = path.includes('rajasthan');
    const list = ALL_OFFERS.filter(o => o.category === (isRaj ? 'rajasthan' : 'golden-triangle'));
    return make({
      path,
      title: isRaj ? 'Rajasthan Tour Offers & Packages | Nivasa' : 'Golden Triangle Tour Offers | Nivasa India Journey',
      description: isRaj
        ? 'Rajasthan tour offers with private AC cars, heritage stays and licensed guides across Jaipur, Jodhpur, Udaipur and Jaisalmer. Request your custom quote.'
        : 'Golden Triangle tour offers covering Delhi, Agra and Jaipur with private cars, verified hotels and Taj Mahal sunrise options. Request your custom quote.',
      h1: isRaj ? 'Rajasthan Tour Offers' : 'Golden Triangle Tour Offers',
      jsonLd: [
        crumbsLd([
          { name: 'Offers', path: '/offers' },
          { name: isRaj ? 'Rajasthan Offers' : 'Golden Triangle Offers', path }
        ]),
        itemListLd(isRaj ? 'Rajasthan Tour Offers' : 'Golden Triangle Tour Offers', list.map(o => ({ name: o.title, path: `/offers/${o.slug}` })))
      ]
    });
  }
  if (path.startsWith('/offers/')) {
    const slug = path.split('/').pop() || '';
    const offer = getOfferBySlug(slug);
    if (!offer) return notFoundMeta(path);
    const canonicalPath = `/offers/${offer.slug}`;
    return make({
      path,
      canonicalPath,
      title: buildTitle(offer.title),
      description: clip(`${offer.duration} offer. ${offer.overview || offer.route} ${offer.validity}.`, 158),
      ogImage: absUrl(offer.image || DEFAULT_OG_IMAGE),
      h1: offer.title,
      inSitemap: path === canonicalPath,
      jsonLd: [
        crumbsLd([
          { name: 'Offers', path: '/offers' },
          { name: offer.title, path: canonicalPath }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: offer.title,
          description: offer.overview || offer.route,
          url: absUrl(canonicalPath),
          image: [offer.image, ...(offer.galleryImages || [])].filter(Boolean).slice(0, 4).map(i => absUrl(i as string)),
          provider: providerRef
        }
      ]
    });
  }

  /* Blog */
  if (path === '/travel-blog') {
    return make({
      path,
      title: 'India Travel Blog & Guides | Nivasa India Journey',
      description:
        'India travel guides from local specialists: Golden Triangle planning, best places to visit in Rajasthan, Taj Mahal sunrise tips and more.',
      h1: 'India Travel Blog & Guides',
      jsonLd: [
        crumbsLd([{ name: 'Travel Blog', path }]),
        itemListLd('India Travel Blog', BLOG_POSTS.map(b => ({ name: b.title, path: `/travel-blog/${b.slug}` })))
      ]
    });
  }
  if (path.startsWith('/travel-blog/')) {
    const post = getBlogPostBySlug(path.replace('/travel-blog/', ''));
    if (!post) return notFoundMeta(path);
    const iso = parseDate(post.publishDate) || BUILD_DATE;
    return make({
      path,
      title: buildTitle(post.title),
      description: clip(post.excerpt, 158),
      ogImage: absUrl(post.image),
      ogType: 'article',
      h1: post.title,
      lastmod: iso,
      jsonLd: [
        crumbsLd([
          { name: 'Travel Blog', path: '/travel-blog' },
          { name: post.title, path }
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: absUrl(post.image),
          datePublished: iso,
          dateModified: iso,
          keywords: post.tags.join(', '),
          mainEntityOfPage: { '@type': 'WebPage', '@id': absUrl(path) },
          author: { '@type': 'Organization', name: post.author || SITE_NAME, url: SITE_URL },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: absUrl(LOGO_PATH) }
          }
        }
      ]
    });
  }

  /* Company / info pages */
  switch (path) {
    case '/about-us':
      return make({
        path,
        title: 'About Us | Nivasa India Journey Travel Agency',
        description:
          'Meet Nivasa India Journey: local India travel specialists offering private chauffeur tours, verified heritage hotels and licensed monument guides.',
        h1: 'About Nivasa India Journey',
        jsonLd: [
          crumbsLd([{ name: 'About Us', path }]),
          { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Nivasa India Journey', url: absUrl(path), about: { '@id': `${SITE_URL}/#agency` } }
        ]
      });
    case '/contact':
      return make({
        path,
        title: 'Contact Us | Nivasa India Journey',
        description:
          'Plan your India trip with Nivasa India Journey. Call or WhatsApp +91 8126716179 or email contact@nivasaindiajourney.com for a custom itinerary and quote.',
        h1: 'Contact Nivasa India Journey',
        jsonLd: [
          crumbsLd([{ name: 'Contact', path }]),
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Nivasa India Journey', url: absUrl(path), about: { '@id': `${SITE_URL}/#agency` } }
        ]
      });
    case '/travel-faqs':
      return make({
        path,
        title: 'India Travel FAQs: Booking, Taj Mahal & Rajasthan',
        description:
          'Answers to common questions about booking, payments, vehicles, the Taj Mahal Friday closure, best time for Rajasthan and cancellations with Nivasa India Journey.',
        h1: 'India Travel FAQs',
        jsonLd: [crumbsLd([{ name: 'Travel FAQs', path }]), faqLd(ALL_FAQS)]
      });
    case '/privacy-policy':
      return make({
        path,
        title: 'Privacy Policy | Nivasa India Journey',
        description: 'How Nivasa India Journey collects and uses the information you share when you enquire about a tour.',
        h1: 'Privacy Policy',
        jsonLd: [crumbsLd([{ name: 'Privacy Policy', path }])]
      });
    case '/terms-and-conditions':
      return make({
        path,
        title: 'Terms & Conditions | Nivasa India Journey',
        description: 'Booking, payment, vehicle and itinerary terms for tours operated by Nivasa India Journey.',
        h1: 'Terms & Conditions',
        jsonLd: [crumbsLd([{ name: 'Terms & Conditions', path }])]
      });
    case '/cancellation-policy':
      return make({
        path,
        title: 'Cancellation Policy | Nivasa India Journey',
        description: 'Cancellation and refund terms for private tours booked with Nivasa India Journey.',
        h1: 'Cancellation Policy',
        jsonLd: [crumbsLd([{ name: 'Cancellation Policy', path }])]
      });
  }

  return notFoundMeta(path);
}

/** Every real URL on the site (used for prerendering and the sitemap). */
export function getAllPaths(): string[] {
  const paths = new Set<string>(['/']);
  LISTINGS.forEach(l => paths.add(l.path));
  TOUR_PACKAGES.forEach(p => paths.add(`/tour-packages/${p.slug}`));
  PACKAGE_ALIAS_PATHS.forEach(p => paths.add(p));
  paths.add('/destinations');
  DESTINATIONS.forEach(d => paths.add(`/destinations/${d.slug}`));
  paths.add('/offers');
  paths.add('/offers/rajasthan-tour-offers');
  paths.add('/offers/golden-triangle-tour-offers');
  ALL_OFFERS.forEach(o => paths.add(`/offers/${o.slug}`));
  paths.add('/travel-blog');
  BLOG_POSTS.forEach(b => paths.add(`/travel-blog/${b.slug}`));
  ['/about-us', '/contact', '/travel-faqs', '/privacy-policy', '/terms-and-conditions', '/cancellation-policy'].forEach(p => paths.add(p));
  return Array.from(paths);
}
