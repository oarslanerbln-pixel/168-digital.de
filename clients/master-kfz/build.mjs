/*
 * Static site generator — no dependencies. Renders every page in DE/TR/EN to
 * dist/, plus sitemap (with hreflang), robots.txt, llms.txt and the manifest.
 *
 *   node build.mjs            build into dist/
 *
 * Env: WEB3FORMS_KEY (form delivery by e-mail). On Vercel production a missing
 * key fails the build unless LEAD_FALLBACK_ONLY=true — a form that silently
 * drops leads behind a green deploy is the worst failure this site can have.
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import de from './src/copy/de.mjs';
import tr from './src/copy/tr.mjs';
import en from './src/copy/en.mjs';
import { business, services, routes, servicePath, SITE_URL, LANGS, priceGroups } from './src/data.mjs';
import { buildPages, layout, setAssetVersion, priceText } from './src/views.mjs';
import { legal } from './src/legal.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const copy = { de, tr, en };

const key = process.env.WEB3FORMS_KEY?.trim() || null;
if (!key && process.env.VERCEL_ENV === 'production' && process.env.LEAD_FALLBACK_ONLY !== 'true') {
  throw new Error('WEB3FORMS_KEY is missing. Set it in Vercel, or set LEAD_FALLBACK_ONLY=true to ship a WhatsApp-only form on purpose.');
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'static'), dist, { recursive: true });

const assets = await Promise.all(['static/css/site.css', 'static/js/site.js'].map((f) => readFile(join(root, f))));
setAssetVersion(createHash('sha256').update(Buffer.concat(assets)).digest('hex').slice(0, 10));

const pages = buildPages(copy, { key }, legal);
for (const p of pages) {
  const file = p.file ?? join(p.path, 'index.html');
  const out = join(dist, file);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, layout(p, copy));
}

/* Sitemap with hreflang clusters. */
const indexable = pages.filter((p) => !p.noindex);
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((p) => {
    const alts = Object.entries(p.alternates);
    const links = alts.length > 1 ? alts.map(([l, h]) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${h}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${p.alternates.de}"/>` : '';
    const prio = p.path === routes.home[p.lang] ? '1.0' : p.service || p.nav === 'booking' ? '0.8' : p.nav ? '0.7' : '0.2';
    return `<url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod><priority>${prio}</priority>${links}</url>`;
  })
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);

await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /logo-konzepte/\nDisallow: /ui-stile/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

/* llms.txt — a plain-text fact sheet for AI answer engines (GEO). */
const hours = business.hours.map((h) => `${h.days.join(', ')}: ${h.opens}–${h.closes}`).join('; ');
const llms = `# ${business.name}

> Kfz-Meisterwerkstatt (master-certified car repair garage) in Berlin-Neukölln, Germany. All makes. Fixed price agreed before any work starts. Service in German, Turkish and English.

- Address: ${business.street}, ${business.zip} ${business.city} (Neukölln), Germany
- Phone / WhatsApp: ${business.phoneDisplay} (${business.phoneIntl})
- E-mail: ${business.email}
- Opening hours: ${hours}; Sunday closed
- Owner / managing director: ${business.owner}
- Instagram: ${business.instagram}

## Services and starting prices (EUR, incl. VAT)

${services.map((s) => `- [${en.services[s.id].name} / ${de.services[s.id].name}](${SITE_URL}${servicePath('en', s)}): ${s.price == null ? 'price on request' : priceText('en', s.price, s.from)} — ${en.services[s.id].short}`).join('\n')}

## Price list

${priceGroups.flatMap((g) => g.items).map((i) => `- ${en.pricesPage.items[i.id].name}: ${i.price == null ? 'on request' : priceText('en', i.price, i.from)} (${en.pricesPage.items[i.id].note})`).join('\n')}

## Pages

${LANGS.map((l) => `- ${copy[l].label}: ${SITE_URL}${routes.home[l]}`).join('\n')}
- Appointment: ${SITE_URL}${routes.booking.de}
`;
await writeFile(join(dist, 'llms.txt'), llms);

await writeFile(
  join(dist, 'site.webmanifest'),
  JSON.stringify({
    name: business.name,
    short_name: 'Master KFZ',
    start_url: '/',
    display: 'standalone',
    background_color: '#060607',
    theme_color: '#060607',
    icons: [
      { src: '/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/img/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }),
);

const todos = (await readFile(join(root, 'src/data.mjs'), 'utf8')).match(/TODO\(confirm\)/g)?.length ?? 0;
console.log(`Built ${pages.length} pages → dist/ (form: ${key ? 'Web3Forms' : 'WhatsApp fallback'}; ${todos} facts marked TODO(confirm) in src/data.mjs)`);
