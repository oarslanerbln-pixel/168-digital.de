/* Copies dist/ to dist-preview/ with relative links so the full site can be published as a claude.ai artifact: node tools/preview-export.mjs */
import { cp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const src = root + 'dist', out = root + 'dist-preview';
await rm(out, { recursive: true, force: true });
await cp(src, out, { recursive: true });
const files = [];
async function walk(d) { for (const n of await readdir(d)) { const p = join(d, n); (await stat(p)).isDirectory() ? await walk(p) : files.push(p); } }
await walk(out);
for (const f of files.filter((f) => /preview-.*\.html$/.test(f))) await rm(f);
const html = files.filter((f) => f.endsWith('.html') && !/preview-/.test(f));
for (const f of html) {
  const up = relative(dirname(f), out) || '.';
  const fix = (p) => { const [path, rest = ''] = p.split(/(?=[?#])/); const target = path.endsWith('/') ? path + 'index.html' : path; return (up === '.' ? '' : up + '/') + target.slice(1) + rest; };
  let h = await readFile(f, 'utf8');
  h = h.replace(/<meta http-equiv="Content-Security-Policy"[^>]*>\n/, '')
    .replace(/(href|src|poster)="(\/(?!\/)[^"]*)"/g, (m, a, p) => `${a}="${fix(p)}"`);
  await writeFile(f, h);
}
const list = [];
async function walk2(d) { for (const n of await readdir(d)) { const p = join(d, n); (await stat(p)).isDirectory() ? await walk2(p) : list.push({ as: relative(out, p), path: p }); } }
await walk2(out);
await writeFile(root + 'dist-preview/files.json', JSON.stringify(list));
console.log(list.length, 'files');
