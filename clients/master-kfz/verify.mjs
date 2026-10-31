/*
 * Post-build checks — the rules this site must never break:
 * three complete languages, valid SEO head per page, no runtime resource from
 * a foreign domain (DSGVO), no dead internal links, parseable JSON-LD.
 * STRICT=1 additionally fails on open TODO placeholders (use before go-live).
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import de from './src/copy/de.mjs';
import tr from './src/copy/tr.mjs';
import en from './src/copy/en.mjs';

const dist = join(import.meta.dirname, 'dist');
const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);

/* 1. Copy parity: same keys, same array lengths, no empty strings. */
function shape(a, b, path, lang) {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) return fail(`${lang}: type mismatch at ${path}`);
  if (Array.isArray(a)) {
    if (a.length !== b.length) fail(`${lang}: ${path} has ${b.length} items, de has ${a.length}`);
    a.forEach((x, i) => b[i] !== undefined && shape(x, b[i], `${path}[${i}]`, lang));
  } else if (a && typeof a === 'object') {
    for (const k of Object.keys(a)) (k in b ? shape(a[k], b[k], `${path}.${k}`, lang) : fail(`${lang}: missing ${path}.${k}`));
    for (const k of Object.keys(b)) if (!(k in a)) fail(`${lang}: extra key ${path}.${k}`);
  } else if (typeof b === 'string' && !b.trim() && !path.endsWith('.suffix')) fail(`${lang}: empty string at ${path}`);
}
shape(de, tr, 'copy', 'tr');
shape(de, en, 'copy', 'en');

/* 2. Pages. */
async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else if (name.endsWith('.html')) out.push(p);
  }
  return out;
}
/*
 * Tag balance check. Browsers silently "repair" broken markup – an unclosed <a> once
 * got re-opened around a section header and painted an empty box on the home page.
 * Dependency-free on purpose: catches unclosed/stray tags and links inside links.
 */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
function tagErrors(html) {
  const out = [];
  const stack = [];
  const src = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, '');
  for (const [, close, name, selfClose] of src.matchAll(/<(\/?)([a-zA-Z][\w:-]*)\b(?:"[^"]*"|'[^']*'|[^'">])*?(\/?)>/g)) {
    const t = name.toLowerCase();
    if (!close) {
      if (VOID.has(t) || selfClose) continue;
      if (t === 'a' && stack.includes('a')) out.push('<a> inside <a>');
      stack.push(t);
    } else if (stack.at(-1) === t) stack.pop();
    else if (stack.includes(t)) { out.push(`<${stack.at(-1)}> not closed before </${t}>`); while (stack.pop() !== t); }
    else out.push(`stray </${t}>`);
  }
  if (stack.length) out.push(`unclosed at end: ${stack.join(' > ')}`);
  return [...new Set(out)];
}

const exists = async (p) => stat(p).then(() => true, () => false);
const files = await walk(dist);
const titles = new Map();

for (const file of files) {
  const rel = file.slice(dist.length);
  const html = await readFile(file, 'utf8');
  const noindex = html.includes('name="robots" content="noindex"');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  for (const m of tagErrors(html)) fail(`${rel}: markup – ${m}`);
  if (!title) fail(`${rel}: no <title>`);
  if (!desc) fail(`${rel}: no meta description`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(`${rel}: needs exactly one <h1>`);
  if (!/^<!doctype html>\n<html lang="(de|tr|en)"/.test(html)) fail(`${rel}: missing lang`);

  if (!noindex) {
    if (titles.has(title)) fail(`${rel}: duplicate title with ${titles.get(title)}`);
    titles.set(title, rel);
    const t = title.replace(/&amp;/g, '&');
    if (t.length > 70) warnings.push(`${rel}: title ${t.length} chars`);
    if (desc && desc.length > 170) warnings.push(`${rel}: description ${desc.length} chars`);
    if (!html.includes('rel="canonical"')) fail(`${rel}: no canonical`);
    /* hreflang must be reciprocal */
    for (const [, lang, href] of html.matchAll(/hreflang="(de|tr|en)" href="https:\/\/www\.kfz-master\.com([^"]+)"/g)) {
      const target = join(dist, href, 'index.html');
      if (!(await exists(target))) { fail(`${rel}: hreflang ${lang} → missing ${href}`); continue; }
      const canonical = html.match(/rel="canonical" href="https:\/\/www\.kfz-master\.com([^"]+)"/)[1];
      if (!(await readFile(target, 'utf8')).includes(`href="https://www.kfz-master.com${canonical}"`)) fail(`${rel}: ${href} does not link back`);
    }
  }

  /* No runtime loads from foreign origins: scripts, styles, images, iframes. */
  for (const [tag] of html.matchAll(/<(script|link|img|iframe|source|video|audio)\b[^>]*>/g)) {
    if (/^<link[^>]*rel="(canonical|alternate)"/.test(tag)) continue;
    const url = tag.match(/\s(?:src|href)="([^"]+)"/)?.[1];
    if (url && /^(https?:)?\/\//.test(url)) fail(`${rel}: external resource ${url}`);
  }

  /* Internal links resolve. */
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)) {
    const target = href.endsWith('/') ? join(dist, href, 'index.html') : join(dist, href);
    if (!(await exists(target))) fail(`${rel}: dead link ${href}`);
  }

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json); } catch { fail(`${rel}: invalid JSON-LD`); }
  }
  if (html.includes('class="todo"')) (process.env.STRICT ? fail : (m) => warnings.push(m))(`${rel}: open TODO placeholder`);
}

/* 3. Sitemap entries exist. */
const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
for (const [, path] of sitemap.matchAll(/<loc>https:\/\/www\.kfz-master\.com([^<]+)<\/loc>/g)) {
  if (!(await exists(join(dist, path, 'index.html')))) fail(`sitemap: ${path} missing`);
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`FAIL  ${e}`);
console.log(`${files.length} pages checked, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
