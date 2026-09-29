/* ════════════════════════════════════════════════════════════════
   FONT PIPELINE — self-hosted, DSGVO-compliant, WOFF2 + subsets.

   Usage: node download-fonts.mjs

   Why this script exists in this shape:

   Google's font CSS API serves a *different* format depending on the
   User-Agent it sees. With no UA (plain fetch) it falls back to TTF —
   which is how this project ended up shipping 441 KB of .ttf files,
   Playfair alone being 121 KB per weight. Asking with a modern browser
   UA returns WOFF2, the same outlines at roughly a third of the bytes
   (Playfair 400: 121 KB → 37 KB).

   The API also splits each face into unicode-range subsets. That split
   is kept here instead of being flattened, because it is what makes the
   site's three languages cheap: a German or English visitor downloads
   only the `latin` subset, and the `latin-ext` subset (which carries the
   Turkish ş ğ İ) is fetched by the browser only when such a character is
   actually rendered. Subsets the site never needs (cyrillic, vietnamese)
   are dropped entirely.

   The script owns both halves of the job so they cannot drift apart:
   it downloads the .woff2 files into public/fonts/ AND rewrites the
   @font-face block in index.html between the FONT-FACE markers.

   Variable fonts: Outfit, Plus Jakarta Sans and Playfair Display are
   variable, so the API answers every requested weight with the SAME file
   URL. Saved per weight, that became up to four byte-identical files —
   and four separate downloads, because a browser caches by URL. Faces
   that share a source URL now share one file (see shareVariableFiles).
   Each weight keeps its own @font-face with its single weight value, so
   the rendered weights stay exactly what they were.
   ════════════════════════════════════════════════════════════════ */

import { writeFileSync, mkdirSync, existsSync, readFileSync, readdirSync, unlinkSync } from 'fs';
import path from 'path';

/** Modern-browser UA — without it the API answers with TTF, not WOFF2. */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/** Only these subsets are shipped; the site is DE / EN / TR only. */
const KEEP_SUBSETS = new Set(['latin', 'latin-ext']);

/** Short file-name prefixes, kept identical to the previous filenames. */
const FAMILY_SLUG = {
  'Outfit': 'outfit',
  'Playfair Display': 'playfair',
  'Plus Jakarta Sans': 'jakarta',
};

const CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Outfit:wght@300;400;600;800' +
  '&family=Playfair+Display:ital,wght@0,400;0,700;1,400' +
  '&family=Plus+Jakarta+Sans:wght@500;600;700;800' +
  '&display=swap';

/**
 * The two faces the hero paints with. They are preloaded so the headline
 * does not sit in fallback type while the browser discovers the CSS —
 * everything else may swap in late without anyone noticing.
 */
const PRELOAD = ['outfit-latin.woff2', 'playfair-latin.woff2'];

const fontsDir = path.join('public', 'fonts');
if (!existsSync(fontsDir)) mkdirSync(fontsDir, { recursive: true });

/** Parse the API's CSS into one record per (face × subset). */
function parseFaces(css) {
  const faces = [];
  // Each @font-face is preceded by a `/* subset */` comment.
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(css))) {
    const [, subset, body] = m;
    const family = /font-family:\s*'([^']+)'/.exec(body)?.[1];
    const weight = /font-weight:\s*(\d+)/.exec(body)?.[1];
    const style = /font-style:\s*(\w+)/.exec(body)?.[1] ?? 'normal';
    const url = /url\((https:[^)]+)\)/.exec(body)?.[1];
    const range = /unicode-range:\s*([^;]+);/.exec(body)?.[1]?.trim();
    if (!family || !weight || !url || !KEEP_SUBSETS.has(subset)) continue;
    if (!FAMILY_SLUG[family]) continue;

    const slug = FAMILY_SLUG[family];
    const file = `${slug}-${weight}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;
    faces.push({ family, weight, style, subset, url, range, file });
  }
  return faces;
}

/**
 * Point every face that shares a source URL at one file. The weight drops
 * out of the name because the file serves all of them: outfit-latin.woff2
 * rather than outfit-300-latin.woff2 … outfit-800-latin.woff2. A face with
 * a URL of its own keeps its per-weight name.
 */
function shareVariableFiles(faces, slugOf) {
  const byUrl = new Map();
  for (const f of faces) {
    if (!byUrl.has(f.url)) byUrl.set(f.url, []);
    byUrl.get(f.url).push(f);
  }
  for (const group of byUrl.values()) {
    if (group.length < 2) continue;
    const { family, style, subset } = group[0];
    const name = `${slugOf(family)}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;
    for (const f of group) f.file = name;
  }
  return faces;
}

/** Download each distinct file once, however many faces point at it. */
async function downloadUnique(faces, dir) {
  const seen = new Set();
  let total = 0;
  for (const face of faces) {
    if (seen.has(face.file)) continue;
    seen.add(face.file);
    const data = Buffer.from(
      await (await fetch(face.url, { headers: { 'User-Agent': UA } })).arrayBuffer()
    );
    writeFileSync(path.join(dir, face.file), data);
    total += data.length;
    console.log(`✅ ${face.file} (${(data.length / 1024).toFixed(1)} KB)`);
  }
  return total;
}

/** Emit the @font-face rules for index.html, indented to match the file. */
function renderCss(faces) {
  const pad = '      ';
  return faces
    .map(f =>
      [
        `${pad}@font-face {`,
        `${pad}  font-family: '${f.family}';`,
        `${pad}  font-style: ${f.style};`,
        `${pad}  font-weight: ${f.weight};`,
        `${pad}  font-display: swap;`,
        `${pad}  src: url('/fonts/${f.file}') format('woff2');`,
        `${pad}  unicode-range: ${f.range};`,
        `${pad}}`,
      ].join('\n')
    )
    .join('\n');
}

function renderPreloads(faces) {
  const pad = '    ';
  return PRELOAD.filter(name => faces.some(f => f.file === name))
    .map(
      name =>
        `${pad}<link rel="preload" href="/fonts/${name}" as="font" type="font/woff2" crossorigin />`
    )
    .join('\n');
}

/**
 * Replace everything between a START and an END marker.
 *
 * The preload block sits in markup and uses HTML comments; the @font-face
 * block sits inside <style> and must use CSS comments, because an HTML
 * comment in there is parsed as CSS and would be a syntax error.
 */
function replaceBlock(html, name, content, { css = false } = {}) {
  const [open, close] = css
    ? [`/* ${name}:START */`, `/* ${name}:END */`]
    : [`<!-- ${name}:START -->`, `<!-- ${name}:END -->`];
  const esc = s => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const re = new RegExp(`(${esc(open)})[\\s\\S]*?(${esc(close)})`);
  if (!re.test(html)) {
    throw new Error(`index.html is missing the ${name} START/END markers`);
  }
  const indent = ' '.repeat(css ? 6 : 4);
  return html.replace(re, `$1\n${content}\n${indent}$2`);
}

const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } });
if (!res.ok) throw new Error(`Font CSS request failed: ${res.status}`);
const faces = shareVariableFiles(parseFaces(await res.text()), family => FAMILY_SLUG[family]);
if (!faces.length) throw new Error('No usable @font-face rules came back');

// Any .woff2/.ttf already in the folder that this run does not produce is
// stale (e.g. the old TTFs) — drop it so the folder always mirrors the CSS.
const wanted = new Set(faces.map(f => f.file));
for (const existing of readdirSync(fontsDir)) {
  if (/\.(woff2|ttf)$/.test(existing) && !wanted.has(existing)) {
    unlinkSync(path.join(fontsDir, existing));
    console.log(`🗑  removed stale ${existing}`);
  }
}

const bytes = await downloadUnique(faces, fontsDir);

let html = readFileSync('index.html', 'utf8');
html = replaceBlock(html, 'FONT-FACE', renderCss(faces), { css: true });
html = replaceBlock(html, 'PRELOAD', renderPreloads(faces));
writeFileSync('index.html', html);


/* ════════════════════════════════════════════════════════════════
   PASS 2 — the Web Design Concepts catalog's decorative fonts.

   These used to be pulled straight from fonts.googleapis.com at runtime.
   That is a direct connection from the visitor's browser to Google
   carrying their IP address, which is exactly what the rest of this site
   self-hosts to avoid — and what German courts have treated as a DSGVO
   violation. The catalog is therefore mirrored locally too.

   It stays a separate stylesheet rather than going inline: it is ~60
   faces that only /concepts needs, and WebDesignCatalog.tsx still
   injects it lazily when the gallery nears the viewport, so nobody who
   doesn't scroll to the gallery ever pays for it.
   ════════════════════════════════════════════════════════════════ */

// Plus Jakarta Sans is deliberately absent: the site already declares it
// (500–800) in index.html. Listing it here again gave the same family a
// second URL, so /concepts downloaded a second copy of a cached file.
const CATALOG_CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400' +
  '&family=DM+Mono:wght@300;400;500&family=Sora:wght@300;400;500' +
  '&family=Syne:wght@700;800&family=Bebas+Neue&family=Lora:ital@0;1' +
  '&family=Libre+Baskerville:ital@0;1&family=Caveat:wght@400;600' +
  '&family=Fraunces:ital,wght@0,400;1,300&family=Jost:wght@300;400' +
  '&family=Noto+Serif+JP:wght@300;400&family=Noto+Sans+JP:wght@300' +
  '&family=Amiri:wght@400;700&family=Share+Tech+Mono' +
  '&family=Orbitron:wght@400;700&family=IBM+Plex+Mono:wght@400;500' +
  '&family=IBM+Plex+Sans:wght@300;400&family=Instrument+Sans:wght@300;400' +
  '&family=Courier+Prime:wght@400;700' +
  '&family=Figtree:wght@400;600;900&family=Bodoni+Moda:ital,wght@1,400' +
  '&family=Cinzel:wght@700&family=Josefin+Sans:wght@300;400;600' +
  '&family=Unbounded:wght@400;700&family=Anton&family=Oswald:wght@600' +
  '&family=Spectral:ital,wght@0,300;1,300&family=Righteous&family=Pacifico' +
  '&family=Staatliches&family=Big+Shoulders+Display:wght@900' +
  '&family=Yeseva+One&family=Abril+Fatface&family=VT323' +
  '&family=Press+Start+2P&display=swap';

const catalogDir = path.join(fontsDir, 'catalog');
if (!existsSync(catalogDir)) mkdirSync(catalogDir, { recursive: true });

const catalogCss = await (
  await fetch(CATALOG_CSS_URL, { headers: { 'User-Agent': UA } })
).text();

const catalogSlug = family => family.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const catalogFaces = [];
{
  // Same shape as parseFaces, but the family list is open-ended here, so
  // the slug is derived from the family name instead of a lookup table.
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
  let m;
  while ((m = re.exec(catalogCss))) {
    const [, subset, body] = m;
    const family = /font-family:\s*'([^']+)'/.exec(body)?.[1];
    const weight = /font-weight:\s*(\d+)/.exec(body)?.[1] ?? '400';
    const style = /font-style:\s*(\w+)/.exec(body)?.[1] ?? 'normal';
    const url = /url\((https:[^)]+)\)/.exec(body)?.[1];
    const range = /unicode-range:\s*([^;]+);/.exec(body)?.[1]?.trim();
    if (!family || !url || !KEEP_SUBSETS.has(subset)) continue;
    const slug = catalogSlug(family);
    const file = `${slug}-${weight}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;
    catalogFaces.push({ family, weight, style, subset, url, range, file });
  }
}
shareVariableFiles(catalogFaces, catalogSlug);

const catalogWanted = new Set(catalogFaces.map(f => f.file));
for (const existing of readdirSync(catalogDir)) {
  if (/\.woff2$/.test(existing) && !catalogWanted.has(existing)) {
    unlinkSync(path.join(catalogDir, existing));
  }
}

const catalogBytes = await downloadUnique(catalogFaces, catalogDir);

writeFileSync(
  path.join(fontsDir, 'catalog.css'),
  '/* GENERATED by download-fonts.mjs — do not edit by hand.\n' +
    '   Decorative faces for the Web Design Concepts catalog, self-hosted so\n' +
    "   the gallery never opens a connection to Google from a visitor's browser. */\n" +
    catalogFaces
      .map(f =>
        [
          '@font-face {',
          `  font-family: '${f.family}';`,
          `  font-style: ${f.style};`,
          `  font-weight: ${f.weight};`,
          '  font-display: swap;',
          `  src: url('/fonts/catalog/${f.file}') format('woff2');`,
          f.range ? `  unicode-range: ${f.range};` : null,
          '}',
        ]
          .filter(Boolean)
          .join('\n')
      )
      .join('\n') +
    '\n'
);

console.log(
  `🎨 catalog: ${catalogFaces.length} faces, ${(catalogBytes / 1024 / 1024).toFixed(1)} MB ` +
    '→ public/fonts/catalog.css (lazy-loaded, /concepts only)'
);

console.log(
  `\n🎉 ${faces.length} faces, ${(bytes / 1024).toFixed(1)} KB total — index.html updated.`
);
