/* ════════════════════════════════════════════════════════════════
   optimize-images — converts editable source PNGs in /assets-src to
   shipped WebP in /public.  Run with:  node scripts/optimize-images.mjs
   Sources live in /assets-src (versioned, NOT deployed); only the
   optimized WebP outputs go to /public and reach users.
   Add new entries to SOURCES as content images are added.
   ════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'assets-src');
const pub = join(root, 'public');

// Content images that benefit from WebP. og-image stays PNG for maximum
// social-scraper compatibility and is intentionally excluded.
const SOURCES = [
  { in: 'philosophy_cinematic_visual.png', out: 'philosophy_cinematic_visual.webp', quality: 80 },
];

const kb = (p) => (statSync(p).size / 1024).toFixed(0);

for (const s of SOURCES) {
  const src = join(srcDir, s.in);
  const dst = join(pub, s.out);
  await sharp(src).webp({ quality: s.quality }).toFile(dst);
  console.log(`${s.in} (${kb(src)} KB) -> ${s.out} (${kb(dst)} KB)`);
}

console.log('Done.');
