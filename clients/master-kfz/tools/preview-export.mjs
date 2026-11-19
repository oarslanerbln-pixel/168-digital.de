/* Copies dist/ to dist-preview/ with relative links so the full site can be published as a claude.ai artifact: node tools/preview-export.mjs */
import { cp, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { join, relative, dirname } from 'node:path';
const root = new URL('..', import.meta.url).pathname;
const src = root + 'dist', out = root + 'dist-preview';
await rm(out, { recursive: true, force: true });
await cp(src, out, { recursive: true });
/* Preview only: a colour-style switcher so the client can compare the styles on every page.
   The choice survives page changes (sessionStorage) and can be linked with ?theme=gold|blue. */
const SHOW_THEME_SWITCH = process.argv.includes('--themes'); // node tools/preview-export.mjs --themes
const THEME_HEAD = `<script>(function(){try{var q=new URLSearchParams(location.search).get('theme');if(q)sessionStorage.setItem('mk-theme',q);var t=sessionStorage.getItem('mk-theme');if(t&&t!=='red')document.documentElement.dataset.theme=t;}catch(e){}})()</script>`;
const THEME_SWITCH = `<div class="tsw" role="group" aria-label="Farbstil"><span>Stil</span><button data-t="red" style="--c:#e3141c">Rot</button><button data-t="gold" style="--c:#c9a35c">Gold</button><button data-t="blue" style="--c:#2a6df0">Blau</button></div>
<style>.tsw{position:fixed;z-index:200;left:50%;top:calc(var(--hdr-h) + 10px);translate:-50% 0;display:flex;align-items:center;gap:4px;padding:5px;border-radius:999px;background:rgba(15,15,18,.82);border:1px solid rgba(255,255,255,.16);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);font:500 11px/1 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#a1a1a6}
.tsw span{padding:0 8px 0 10px}.tsw button{display:flex;align-items:center;gap:6px;padding:8px 12px;border:0;border-radius:999px;background:none;color:inherit;font:inherit;letter-spacing:inherit;text-transform:inherit;cursor:pointer}
.tsw button::before{content:'';width:10px;height:10px;border-radius:50%;background:var(--c)}.tsw button[aria-pressed=true]{background:rgba(255,255,255,.12);color:#fff}</style>
<script>(function(){var h=document.documentElement,b=document.querySelectorAll('.tsw button');function set(t){if(t==='red')delete h.dataset.theme;else h.dataset.theme=t;try{sessionStorage.setItem('mk-theme',t)}catch(e){}b.forEach(function(x){x.setAttribute('aria-pressed',x.dataset.t===t)})}set(h.dataset.theme||'red');b.forEach(function(x){x.onclick=function(){set(x.dataset.t)}})})()</script>`;
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
    .replace(/(href|src|poster)="(\/(?!\/)[^"]*)"/g, (m, a, p) => `${a}="${fix(p)}"`)
    .replace(/srcset="([^"]*)"/g, (m, list) => `srcset="${list.replace(/(^|,\s*)(\/(?!\/)[^\s,]+)/g, (_, sep, p) => sep + fix(p))}"`);
  if (SHOW_THEME_SWITCH && !/logo-konzepte|ui-stile/.test(f)) h = h.replace('</head>', THEME_HEAD + '</head>').replace('</body>', THEME_SWITCH + '</body>');
  await writeFile(f, h);
}
const list = [];
async function walk2(d) { for (const n of await readdir(d)) { const p = join(d, n); (await stat(p)).isDirectory() ? await walk2(p) : list.push({ as: relative(out, p), path: p }); } }
await walk2(out);
await writeFile(root + 'dist-preview/files.json', JSON.stringify(list));
console.log(list.length, 'files');
