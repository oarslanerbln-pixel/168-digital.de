/*
 * Facts about the business — the single source for every page, the JSON-LD,
 * llms.txt and the sitemap. Anything marked TODO(confirm) was inferred from
 * the Instagram profile or is a placeholder; `npm run verify` lists those
 * markers so nothing unconfirmed goes live by accident.
 */

export const SITE_URL = 'https://www.kfz-master.com';
export const LANGS = ['de', 'tr', 'en'];
export const DEFAULT_LANG = 'de';
/* Button style: 'pill' (current) · 'precision' · 'glass' · 'racing' · 'swipe' – see /ui-stile/. */
export const UI_STYLE = 'pill';

export const business = {
  name: 'Master KFZ Werkstatt',
  legalName: 'Master KFZ Werkstatt GmbH', // TODO(confirm): exact company name from the register
  owner: 'Ömer Ates',
  street: 'Treptower Str. 51',
  zip: '12059',
  city: 'Berlin',
  district: 'Neukölln',
  region: 'DE-BE',
  country: 'DE',
  phoneDisplay: '0176 216 77 888',
  phoneIntl: '+4917621677888',
  whatsapp: '4917621677888',
  email: 'masterteam.kfz@gmail.com',
  instagram: 'https://www.instagram.com/masterkfz/',
  registerCourt: 'Amtsgericht Charlottenburg', // TODO(confirm)
  registerNumber: null, // TODO(confirm): HRB … B
  vatId: null, // TODO(confirm): USt-IdNr.
  // TODO(confirm): opening hours are placeholders.
  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '08:00', closes: '18:00' },
    { days: ['Sa'], opens: '09:00', closes: '14:00' },
  ],
  // TODO(confirm): languages spoken in the workshop.
  languages: ['de', 'tr', 'en'],
  areaServed: ['Berlin-Neukölln', 'Berlin-Treptow', 'Berlin-Kreuzberg', 'Berlin-Britz', 'Berlin'],
};

export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${business.name}, ${business.street}, ${business.zip} ${business.city}`);

/*
 * Services in display order. `hotspot` places the marker on the blueprint car
 * (viewBox 1200 × 400). Prices come from the workshop's Instagram flyers.
 * TODO(confirm): prices incl. VAT, and that diagnostics are offered.
 */
export const services = [
  { id: 'inspection', slug: { de: 'inspektion', tr: 'bakim', en: 'inspection' }, price: 129, from: true, icon: 'clipboard', hotspot: [600, 236] },
  { id: 'oil', slug: { de: 'oelwechsel', tr: 'yag-degisimi', en: 'oil-change' }, price: 64, from: true, icon: 'drop', hotspot: [968, 180] },
  { id: 'brakes', slug: { de: 'bremsen', tr: 'fren', en: 'brakes' }, price: 69, from: true, icon: 'disc', hotspot: [920, 300] },
  { id: 'tyres', slug: { de: 'reifenwechsel', tr: 'lastik-degisimi', en: 'tyre-change' }, price: 19, from: true, icon: 'tyre', hotspot: [300, 300] },
  { id: 'aircon', slug: { de: 'klimaservice', tr: 'klima-bakimi', en: 'air-conditioning' }, price: 89, from: false, icon: 'snow', hotspot: [760, 130] },
  { id: 'timingbelt', slug: { de: 'zahnriemen', tr: 'triger-kayisi', en: 'timing-belt' }, price: 399, from: true, icon: 'belt', hotspot: [1096, 252] },
  { id: 'gearbox', slug: { de: 'getriebeoel', tr: 'sanziman-yagi', en: 'transmission-oil' }, price: 199, from: true, icon: 'shift', hotspot: [470, 280] },
  { id: 'diagnostics', slug: { de: 'diagnose', tr: 'ariza-tespiti', en: 'diagnostics' }, price: null, from: false, icon: 'pulse', hotspot: [520, 140] },
];

/* Price list. `service` links a row to its service page. */
export const priceGroups = [
  { id: 'oil', service: 'oil', items: [
    { id: 'oil-5w40', price: 64 },
    { id: 'oil-5w30', price: 74 },
    { id: 'oil-spec', price: 84 },
    { id: 'oil-longlife', price: 99 },
  ] },
  { id: 'service', service: 'inspection', items: [{ id: 'inspection', price: 129, from: true }] },
  { id: 'wheels', service: 'tyres', items: [{ id: 'tyres', price: 19, from: true }] },
  { id: 'brakes', service: 'brakes', items: [{ id: 'brakes', price: 69, from: true }] },
  { id: 'aircon', service: 'aircon', items: [{ id: 'aircon', price: 89 }] },
  { id: 'drive', service: 'timingbelt', items: [
    { id: 'gearbox', price: 199, from: true, service: 'gearbox' },
    { id: 'timingbelt', price: 399, from: true },
  ] },
  { id: 'diag', service: 'diagnostics', items: [{ id: 'diagnostics', price: null }] },
];

/* Featured on the home page price band. */
export const featuredPrices = ['tyres', 'oil', 'brakes', 'aircon'];

export const brands = [
  'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Porsche', 'Opel', 'Ford', 'Škoda',
  'Seat', 'Renault', 'Peugeot', 'Toyota', 'Hyundai', 'Kia', 'Fiat', 'Mini', 'Volvo', 'Nissan',
];

/* Localised paths. Legal pages exist in German only — German law, German text. */
export const routes = {
  home: { de: '/', tr: '/tr/', en: '/en/' },
  services: { de: '/leistungen/', tr: '/tr/hizmetler/', en: '/en/services/' },
  prices: { de: '/preise/', tr: '/tr/fiyatlar/', en: '/en/prices/' },
  about: { de: '/ueber-uns/', tr: '/tr/hakkimizda/', en: '/en/about/' },
  booking: { de: '/termin/', tr: '/tr/randevu/', en: '/en/appointment/' },
  imprint: { de: '/impressum/' },
  privacy: { de: '/datenschutz/' },
};

export function servicePath(lang, service) {
  return routes.services[lang] + service.slug[lang] + '/';
}
