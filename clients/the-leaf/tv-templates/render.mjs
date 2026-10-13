/*
 * Renders The Leaf signage clips: footage + overlay template -> H.264 MP4.
 *
 * Why a frame-by-frame capture instead of an editor template (AE/Premiere):
 * the client will swap products and texts every few weeks. A JSON file per
 * slide plus one command keeps every clip pixel-identical in layout and
 * lets anyone at the agency produce a new one without opening an editor.
 *
 * Pipeline per slide:
 *   1. Chromium loads template/overlay.html, receives the slide config.
 *   2. Each frame is captured as a PNG (transparent where footage shows).
 *   3. ffmpeg scales/crops the footage to 9:16, lays the PNG stream on top
 *      and encodes a signage-safe file (H.264 High, yuv420p, no audio).
 *
 * Usage:
 *   node render.mjs                       # all slides in slides/
 *   node render.mjs slides/02-*.json      # selected slides
 *   --fps 25|30|50   frame rate (default 25 – matches 50 Hz PAL footage)
 *   --scale 2        render 2160 × 3840 (4K portrait) instead of 1080 × 1920
 *   --rotate cw|ccw  extra 1920 × 1080 file for players that cannot rotate
 *   --stills-only    write preview JPGs only (fast, for client approval)
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'out');
const W = 1080;
const H = 1920;

function parseArgs(argv) {
  const opts = { fps: 25, scale: 1, rotate: null, stillsOnly: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--fps') opts.fps = Number(argv[++i]);
    else if (a === '--scale') opts.scale = Number(argv[++i]);
    else if (a === '--rotate') opts.rotate = argv[++i];
    else if (a === '--stills-only') opts.stillsOnly = true;
    else opts.files.push(a);
  }
  if (![1, 2].includes(opts.scale)) throw new Error('--scale must be 1 or 2');
  if (opts.rotate && !['cw', 'ccw'].includes(opts.rotate)) throw new Error('--rotate must be cw or ccw');
  return opts;
}

async function loadSlides(files) {
  const list = files.length
    ? files
    : (await readdir(path.join(ROOT, 'slides')))
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => path.join('slides', f));
  return Promise.all(
    list.map(async (file) => {
      const slide = JSON.parse(await readFile(path.resolve(ROOT, file), 'utf8'));
      slide.id ??= path.basename(file, '.json');
      return slide;
    }),
  );
}

// Resolve asset paths relative to the project root and hand the page file
// URLs; a missing asset fails loudly instead of rendering a silent gap.
function resolveAssets(slide) {
  const abs = (p) => {
    const full = path.resolve(ROOT, p);
    if (!existsSync(full)) throw new Error(`${slide.id}: file not found: ${p}`);
    return full;
  };
  const background = slide.background ? abs(slide.background) : null;
  const page = {
    ...slide,
    background: background ? true : null,
    logo: slide.logo ? pathToFileURL(abs(slide.logo)).href : null,
    motif: slide.motif?.image
      ? { image: pathToFileURL(abs(slide.motif.image)).href }
      : slide.motif ?? null,
  };
  return { background, page };
}

function run(cmd, args, { stdin = false } = {}) {
  const child = spawn(cmd, args, { stdio: [stdin ? 'pipe' : 'ignore', 'ignore', 'pipe'] });
  let err = '';
  child.stderr.on('data', (d) => (err += d));
  const done = new Promise((resolve, reject) =>
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} failed:\n${err.slice(-2000)}`)))),
  );
  return { child, done };
}

function encoderArgs(scale) {
  // High@4.2 plays on practically every signage SoC at 1080p; 4K needs 5.1.
  // The bitrate cap matters as much as the profile: grain and steam are
  // barely compressible, and cheap USB/Android players stutter above it.
  return [
    '-c:v', 'libx264', '-profile:v', 'high', '-level', scale === 2 ? '5.1' : '4.2',
    '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p',
    '-maxrate', scale === 2 ? '30M' : '12M', '-bufsize', scale === 2 ? '60M' : '24M',
    '-movflags', '+faststart', '-an',
  ];
}

async function renderSlide(page, slide, opts) {
  const { background, page: pageCfg } = resolveAssets(slide);
  const duration = slide.duration ?? 10;
  const frames = Math.round(duration * opts.fps);
  const w = W * opts.scale;
  const h = H * opts.scale;

  await page.evaluate((cfg) => window.setup(cfg), pageCfg);

  // Preview still at 3 s: animations have settled, nothing is fading out yet.
  const stillPath = path.join(OUT, `${slide.id}.jpg`);
  await page.evaluate((t) => window.renderAt(t), 3);
  if (background) {
    const overlay = await page.screenshot({ omitBackground: true });
    const { child, done } = run('ffmpeg', [
      '-y', '-ss', String((slide.backgroundStart ?? 0) + 3), '-i', background,
      '-f', 'image2pipe', '-c:v', 'png', '-i', '-',
      '-filter_complex', `[0:v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}[bg];[bg][1:v]overlay=0:0`,
      '-frames:v', '1', '-q:v', '2', stillPath,
    ], { stdin: true });
    child.stdin.end(overlay);
    await done;
  } else {
    await page.screenshot({ path: stillPath, type: 'jpeg', quality: 92 });
  }
  console.log(`  still  ${path.relative(ROOT, stillPath)}`);
  if (opts.stillsOnly) return;

  const mp4 = path.join(OUT, `${slide.id}.mp4`);
  const input = background
    ? [
        '-stream_loop', '-1', '-ss', String(slide.backgroundStart ?? 0), '-i', background,
        '-f', 'image2pipe', '-framerate', String(opts.fps), '-c:v', 'png', '-i', '-',
        '-filter_complex',
        `[0:v]scale=${w}:${h}:force_original_aspect_ratio=increase:flags=lanczos,crop=${w}:${h},setsar=1,fps=${opts.fps}[bg];` +
          `[bg][1:v]overlay=0:0:format=auto:shortest=1,format=yuv420p[v]`,
        '-map', '[v]',
      ]
    : ['-f', 'image2pipe', '-framerate', String(opts.fps), '-c:v', 'png', '-i', '-'];

  const { child, done } = run('ffmpeg', [
    '-y', ...input, '-frames:v', String(frames), '-r', String(opts.fps),
    ...encoderArgs(opts.scale), mp4,
  ], { stdin: true });

  let lastKey = null;
  let lastFrame = null;
  for (let i = 0; i < frames; i++) {
    const key = await page.evaluate(([t, f]) => window.renderAt(t, f), [i / opts.fps, i]);
    if (key !== lastKey) {
      lastFrame = await page.screenshot({ omitBackground: Boolean(background) });
      lastKey = key;
    }
    if (!child.stdin.write(lastFrame)) await new Promise((r) => child.stdin.once('drain', r));
  }
  child.stdin.end();
  await done;
  console.log(`  video  ${path.relative(ROOT, mp4)}`);

  if (opts.rotate) {
    // Many players (USB playback, MagicInfo Lite) ignore the panel's
    // portrait orientation; they need the picture pre-rotated in a 16:9 file.
    const rotated = path.join(OUT, `${slide.id}_rotated-${opts.rotate}.mp4`);
    const { done: rdone } = run('ffmpeg', [
      '-y', '-i', mp4, '-vf', `transpose=${opts.rotate === 'cw' ? 1 : 2}`,
      ...encoderArgs(opts.scale), rotated,
    ]);
    await rdone;
    console.log(`  video  ${path.relative(ROOT, rotated)}`);
  }
}

const opts = parseArgs(process.argv.slice(2));
const slides = await loadSlides(opts.files);
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: opts.scale });
await page.goto(pathToFileURL(path.join(ROOT, 'template', 'overlay.html')).href);

try {
  for (const slide of slides) {
    console.log(`${slide.id}`);
    await renderSlide(page, slide, opts);
  }
} finally {
  await browser.close();
}
