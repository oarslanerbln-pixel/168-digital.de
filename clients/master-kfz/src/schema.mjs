/*
 * JSON-LD per page. The AutoRepair node is the backbone for local SEO and for
 * AI answer engines (GEO): name, address, phone, hours, prices and languages
 * as machine-readable facts — identical on every page via a stable @id.
 */
import { business, services, routes, servicePath, SITE_URL, LANGS } from './data.mjs';

const ID = `${SITE_URL}/#business`;
const DAY = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };

function offer(c, lang, s) {
  const o = {
    '@type': 'Offer',
    url: SITE_URL + servicePath(lang, s),
    itemOffered: { '@type': 'Service', name: c.services[s.id].name },
  };
  if (s.price != null) {
    o.priceCurrency = 'EUR';
    o.priceSpecification = { '@type': 'PriceSpecification', priceCurrency: 'EUR', [s.from ? 'minPrice' : 'price']: s.price };
  }
  return o;
}

function businessNode(c, lang) {
  return {
    '@type': 'AutoRepair',
    '@id': ID,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL + routes.home[lang],
    logo: `${SITE_URL}/img/icon-512.png`,
    image: `${SITE_URL}/img/og.jpg`,
    description: c.meta.home.description,
    telephone: business.phoneIntl,
    email: business.email,
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      postalCode: business.zip,
      addressLocality: business.city,
      addressRegion: 'Berlin',
      addressCountry: business.country,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.street}, ${business.zip} ${business.city}`)}`,
    areaServed: business.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: business.languages,
    openingHoursSpecification: business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => DAY[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    founder: { '@type': 'Person', name: business.owner },
    sameAs: [business.instagram],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: c.nav.services,
      itemListElement: services.map((s) => offer(c, lang, s)),
    },
  };
}

function breadcrumb(p) {
  const { c, lang } = p;
  const items = [[c.nav.home, routes.home[lang]]];
  if (p.service) items.push([c.nav.services, routes.services[lang]], [c.services[p.service.id].name, p.path]);
  else if (p.nav && p.nav !== 'home') items.push([c.nav[p.nav], p.path]);
  else if (p.path !== routes.home[lang]) items.push([p.title.split(' | ')[0], p.path]);
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path })),
  };
}

export function schemaGraph(p, copy) {
  const { c, lang } = p;
  const graph = [
    businessNode(c, lang),
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${p.path}#webpage`,
      url: SITE_URL + p.path,
      name: p.title,
      description: p.description,
      inLanguage: lang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': ID },
    },
    breadcrumb(p),
  ];
  if (p.path === routes.home[lang]) {
    graph.push({
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL + '/',
      name: business.name,
      inLanguage: LANGS,
      publisher: { '@id': ID },
    });
  }
  if (p.service) {
    const s = p.service;
    const t = c.services[s.id];
    graph.push({
      '@type': 'Service',
      name: t.name,
      description: t.lead,
      serviceType: copy.de.services[s.id].name,
      provider: { '@id': ID },
      areaServed: { '@type': 'City', name: 'Berlin' },
      url: SITE_URL + p.path,
      offers: offer(c, lang, s),
    });
  }
  if (p.faq) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
