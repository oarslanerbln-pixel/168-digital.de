/*
 * Build-time prerender: writes one static HTML file per route into dist/.
 *
 * Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`
 * (see the "build" script). For each route it takes the built index.html,
 * puts the rendered page inside <div id="root">, and rewrites the <head>
 * (title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD)
 * with the values that route's SEOHead resolved.
 *
 * Output follows Vercel's cleanUrls: /about -> dist/about.html,
 * /blog/x -> dist/blog/x.html, / -> dist/index.html. The untouched SPA
 * shell is written as dist/404.html, which Vercel serves for every URL
 * without its own file — with a real 404 status, so crawlers drop typos
 * instead of indexing them, while visitors still get the client app and
 * its not-found view with the way back. (A rewrite to a shell file does
 * not work with cleanUrls: the .html target itself is no longer served.)
 *
 * Any failure throws, so a broken prerender fails the deploy loudly.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve('dist');
const SSR_DIR = path.resolve('dist-ssr');

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: <meta ${attr}="${key}"> not found in index.html`);
  return html.replace(re, `$1${escapeAttr(content)}$2`);
}

function applySeo(template, seo) {
  let html = template;

  html = html.replace(/<html lang="[^"]*"/, `<html lang="${seo.lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(seo.title)}</title>`);
  html = setMeta(html, 'name', 'title', seo.title);
  html = setMeta(html, 'name', 'description', seo.description);
  html = setMeta(html, 'name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow');
  for (const [attr, key, value] of [
    ['property', 'og:url', seo.canonical],
    ['property', 'og:title', seo.title],
    ['property', 'og:description', seo.description],
    ['property', 'twitter:url', seo.canonical],
    ['property', 'twitter:title', seo.title],
    ['property', 'twitter:description', seo.description],
  ]) {
    html = setMeta(html, attr, key, value);
  }

  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escapeAttr(seo.canonical)}$2`
  );

  // hreflang: same pattern SEOHead writes in the browser.
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '');
  const alternates = [
    ['en', seo.pageUrl],
    ['de', `${seo.pageUrl}?lang=de`],
    ['tr', `${seo.pageUrl}?lang=tr`],
    ['x-default', seo.pageUrl],
  ]
    .map(([lang, href]) => `\n    <link rel="alternate" hreflang="${lang}" href="${escapeAttr(href)}" />`)
    .join('');
  html = html.replace(/(<link rel="canonical" href="[^"]*" \/>)/, `$1${alternates}`);

  // Page JSON-LD. Same data-page-jsonld marker SEOHead uses, so the client
  // replaces these on mount instead of duplicating them. "<" is escaped so
  // no string inside can close the script element.
  const scripts = seo.jsonLd
    .map(
      (item) =>
        `    <script type="application/ld+json" data-page-jsonld="true">${JSON.stringify(item).replace(/</g, '\\u003c')}</script>\n`
    )
    .join('');
  html = html.replace('</head>', `${scripts}  </head>`);

  return html;
}

const template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: dist/index.html has no empty <div id="root"></div> — already prerendered?');
}
await fs.writeFile(path.join(DIST, '404.html'), template);

const { render, routes } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')).href);

for (const route of routes) {
  const { html, seo } = await render(route);
  if (!seo) throw new Error(`prerender: ${route} rendered no SEOHead`);
  if (seo.noindex) throw new Error(`prerender: ${route} rendered the not-found view`);
  if (!/<h1[\s>]/.test(html)) throw new Error(`prerender: ${route} has no <h1>`);

  const page = applySeo(template, seo).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  await fs.mkdir(path.dirname(path.join(DIST, file)), { recursive: true });
  await fs.writeFile(path.join(DIST, file), page);
  console.log(`prerendered ${route.padEnd(48)} → dist/${file}  (${(page.length / 1024).toFixed(1)} kB)`);
}

await fs.rm(SSR_DIR, { recursive: true, force: true });
