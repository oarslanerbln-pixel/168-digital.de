/* ════════════════════════════════════════════════════════════════
   optimize-images — converts editable source PNGs in /assets-src to
   shipped WebP in /public.  Run with:  node scripts/optimize-images.mjs
   Sources live in /assets-src (versioned, NOT deployed); only the
   optimized WebP outputs go to /public and reach users.
   Add new entries to SOURCES as content images are added.
   ════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { statSync, mkdirSync, existsSync } from 'node:fs';
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

// Works gallery thumbnails: live-site captures, cropped to a consistent
// 16:10 card ratio (gravity 'north' keeps the hero/nav — the part that
// actually reads as "a website" — in frame) and shipped small since they
// only ever render inside a ~300-500px grid card.
const WORKS_SOURCES = [
  { in: 'works_taka.png', out: 'works/taka.webp', quality: 76 },
  { in: 'works_sera.png', out: 'works/sera.webp', quality: 76 },
  { in: 'works_boxx36.png', out: 'works/boxx36.webp', quality: 76 },
  { in: 'works_donerbros.png', out: 'works/donerbros.webp', quality: 76 },
  { in: 'works_impulse.png', out: 'works/impulse.webp', quality: 76 },
];

// Showroom posters: first-screen captures of the 3D product-stage demos
// (vitrin-demo). Same 16:10 card crop as the Works thumbnails; self-hosted
// so the homepage never loads anything from the demo domain itself.
const SHOWROOM_SOURCES = ['gischt', 'solenne', 'kivilcim', 'elara', 'arca', 'origo'].map((n) => ({
  in: `showroom/${n}.png`,
  out: `showroom/${n}.webp`,
  quality: 74,
}));

const kb = (p) => (statSync(p).size / 1024).toFixed(0);

for (const s of SOURCES) {
  const src = join(srcDir, s.in);
  const dst = join(pub, s.out);
  await sharp(src).webp({ quality: s.quality }).toFile(dst);
  console.log(`${s.in} (${kb(src)} KB) -> ${s.out} (${kb(dst)} KB)`);
}

mkdirSync(join(pub, 'works'), { recursive: true });

for (const s of WORKS_SOURCES) {
  const src = join(srcDir, s.in);
  const dst = join(pub, s.out);
  await sharp(src)
    .resize(960, 600, { fit: 'cover', position: 'north' })
    .webp({ quality: s.quality })
    .toFile(dst);
  console.log(`${s.in} (${kb(src)} KB) -> ${s.out} (${kb(dst)} KB)`);
}

mkdirSync(join(pub, 'showroom'), { recursive: true });

for (const s of SHOWROOM_SOURCES) {
  const src = join(srcDir, s.in);
  const dst = join(pub, s.out);
  await sharp(src)
    .resize(960, 600, { fit: 'cover', position: 'north' })
    .webp({ quality: s.quality })
    .toFile(dst);
  console.log(`${s.in} (${kb(src)} KB) -> ${s.out} (${kb(dst)} KB)`);
}

// Hero background: one source in assets-src/hero/hero.png, shipped as a
// wide desktop WebP and a smaller mobile crop. Skipped until the source
// exists; Hero.tsx keeps HERO_IMAGE null until then.
const heroSrc = join(srcDir, 'hero', 'hero.png');
if (existsSync(heroSrc)) {
  mkdirSync(join(pub, 'hero'), { recursive: true });
  for (const v of [
    { out: 'hero/hero.webp', width: 2000, quality: 72 },
    { out: 'hero/hero-mobile.webp', width: 900, quality: 70 },
  ]) {
    const dst = join(pub, v.out);
    await sharp(heroSrc).resize({ width: v.width, withoutEnlargement: true }).webp({ quality: v.quality }).toFile(dst);
    console.log(`hero/hero.png (${kb(heroSrc)} KB) -> ${v.out} (${kb(dst)} KB)`);
  }
}

console.log('Done.');
