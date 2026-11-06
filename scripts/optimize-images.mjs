/* ════════════════════════════════════════════════════════════════
   optimize-images — converts editable source PNGs in /assets-src to
   shipped WebP in /public.  Run with:  node scripts/optimize-images.mjs
   Sources live in /assets-src (versioned, NOT deployed); only the
   optimized WebP outputs go to /public and reach users.
   Add new entries to SOURCES as content images are added.
   ════════════════════════════════════════════════════════════════ */
import sharp from 'sharp';
import { statSync, mkdirSync } from 'node:fs';
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

// Service tiles on the homepage. Frames pulled from the studio's own
// showreel (public/reel-960.mp4) with ffmpeg, so every film tile shows
// real footage rather than stock. `social` is cropped portrait because
// the tile frames it in a phone.
const SERVICE_SOURCES = [
  { in: 'services/event.jpg', out: 'services/event.webp', w: 800, h: 520 },
  { in: 'services/drone.jpg', out: 'services/drone.webp', w: 800, h: 520 },
  { in: 'services/travel.jpg', out: 'services/travel.webp', w: 800, h: 520 },
  { in: 'services/social.jpg', out: 'services/social.webp', w: 300, h: 540 },
];

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

// Homepage product photos (generated mockups, see docs/redesign-2026-10.md):
// the hero visual and one per solution card. Two widths each so a phone
// on mobile data never downloads the desktop file (srcset in Hero.tsx /
// Solutions.tsx). Card crops are 16:10 to match the card's visual area;
// `position` keeps the screen — the part that sells — inside the crop.
const SOLUTION_SOURCES = [
  { name: 'hero', ratio: 1, position: 'centre' },
  { name: 'booking', ratio: 1.6, position: 'centre' },
  { name: 'ordering', ratio: 1.6, position: 'centre' },
  { name: 'dashboard', ratio: 1.6, position: 'centre' },
  { name: 'automation', ratio: 1.6, position: 'centre' },
];
const SOLUTION_WIDTHS = [640, 1080];

mkdirSync(join(pub, 'solutions'), { recursive: true });

for (const s of SOLUTION_SOURCES) {
  const src = join(srcDir, 'solutions', `${s.name}.jpg`);
  for (const w of SOLUTION_WIDTHS) {
    const dst = join(pub, 'solutions', `${s.name}-${w}.webp`);
    await sharp(src)
      .resize(w, Math.round(w / s.ratio), { fit: 'cover', position: s.position, withoutEnlargement: false })
      .webp({ quality: 72 })
      .toFile(dst);
    console.log(`solutions/${s.name}.jpg (${kb(src)} KB) -> solutions/${s.name}-${w}.webp (${kb(dst)} KB)`);
  }
}

console.log('Done.');

mkdirSync(join(pub, 'services'), { recursive: true });

for (const s of SERVICE_SOURCES) {
  const src = join(srcDir, s.in);
  const dst = join(pub, s.out);
  await sharp(src).resize(s.w, s.h, { fit: 'cover' }).webp({ quality: 74 }).toFile(dst);
  console.log(`${s.in} (${kb(src)} KB) -> ${s.out} (${kb(dst)} KB)`);
}
