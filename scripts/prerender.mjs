/* ════════════════════════════════════════════════════════════════
   prerender — bakes real, per-route static HTML for every URL in
   sitemap.xml, so a crawler or link-preview bot that never runs
   JavaScript sees the actual page instead of the SPA shell.

   THE PROBLEM THIS SOLVES: this app is a pure client-rendered SPA —
   `vite build` emits exactly one dist/index.html, and vercel.json
   rewrites every route to it. Per-page title, description, canonical,
   hreflang and JSON-LD are all applied by SEOHead.tsx inside a
   useEffect, which only runs once JavaScript executes. Any bot that
   doesn't run JS (most link-preview/unfurl services — WhatsApp, Slack,
   iMessage, Twitter/X's and LinkedIn's first-pass fetchers — plus
   simpler crawlers) saw the exact same homepage meta tags, and the
   exact same (empty, pre-hydration) content, for every URL on the
   site — including a <link rel="canonical"> that read
   "https://1618-digital.de/" on every single page.

   HOW IT WORKS: run *after* `vite build`. Serves the fresh dist/ with
   `vite preview` (Vite's own SPA-fallback static server — the same
   history-API-fallback behaviour vercel.json's rewrite gives in
   production), then drives a real headless Chromium (Playwright) to
   each route in sitemap.xml, waits for React to mount and SEOHead's
   effect to run, and freezes the resulting DOM to a static file:
     "/"           -> dist/index.html            (overwritten in place)
     "/about"      -> dist/about/index.html
     "/blog/slug"  -> dist/blog/slug/index.html
   Vercel's static file serving resolves a request for "/about" to
   "/about/index.html" automatically (its standard "clean URLs"
   convention), so no vercel.json change is needed for this to take
   effect once deployed.

   The app still mounts and takes over normally for real visitors —
   main.tsx uses ReactDOM.createRoot (not hydrateRoot), so React simply
   clears #root and renders fresh on top of the prerendered markup.
   Nothing about the runtime app changes; this only changes what a
   crawler sees before that JS runs.

   KNOWN LIMITATION: only the default-language URL of each route (no
   ?lang= param) is prerendered. Vercel's static file serving matches
   by pathname only, so a request for "/about?lang=de" resolves to the
   same physical file as "/about" regardless of what content that file
   holds — there is no way to serve a different static file per query
   string without reintroducing a server-side rewrite layer. This is
   not a regression (today every URL, language variants included, shows
   literal homepage content to a non-JS bot); it means the DE/TR ?lang=
   variants still rely on client-side hydration for bots that skip JS,
   same as before. Properly fixing that would mean moving language
   variants to their own paths (e.g. /de/about) — a bigger, separate
   decision that touches every canonical URL, hreflang tag and the
   sitemap itself.

   Failure mode: exits non-zero on any error (a route that fails to
   load, a check that doesn't pass) rather than silently shipping a
   partial or unrendered build — a broken prerender should fail the
   deploy, not quietly ship the very bug this script exists to fix.

   `npm install`'s "postinstall" hook (`playwright install chromium ||
   true`) fetches the browser this script needs, but is deliberately
   allowed to fail without failing the install itself — a blocked
   download shouldn't also take down typecheck/tests, which don't need
   a browser at all. This script is what actually enforces "a working
   browser is required": if postinstall's fetch failed, chromium.launch()
   below throws and the build fails here, loudly, instead of silently
   shipping the unrendered SPA shell this whole script exists to avoid.
   ════════════════════════════════════════════════════════════════ */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 41734; // arbitrary, unlikely to collide with anything else
const HOST = '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;

/** Pull the route list straight from sitemap.xml, so that file stays the
 * single source of truth for "what pages exist" instead of a second,
 * driftable list living here. */
function readRoutesFromSitemap() {
  const xml = readFileSync(join(root, 'public/sitemap.xml'), 'utf-8');
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return locs.map((url) => new URL(url).pathname);
}

/** dist/index.html for "/", dist/<route>/index.html for everything else —
 * Vercel's "clean URLs" static serving resolves a request for a path to
 * exactly this file layout with no rewrite needed. */
function outputPathFor(route) {
  if (route === '/') return join(root, 'dist/index.html');
  return join(root, 'dist', route.replace(/^\//, ''), 'index.html');
}

async function waitForHydration(page) {
  // SEOHead's effect runs synchronously once React mounts; this waits for
  // its actual output (a non-empty title that isn't the pre-hydration
  // default) rather than a fixed sleep, so the script can't race it.
  await page.waitForFunction(
    () => document.title.trim().length > 0 && document.readyState === 'complete',
    { timeout: 15_000 },
  );
  // One more frame so framer-motion's initial mount styles (opacity: 0
  // before the first animation frame) don't get frozen into the static
  // output — a real visitor's browser paints past this in milliseconds,
  // but a prerendered snapshot taken mid-transition would freeze it.
  await page.waitForTimeout(400);
}

async function main() {
  const routes = readRoutesFromSitemap();
  console.log(`[prerender] ${routes.length} route(s) from sitemap.xml`);

  const preview = spawn(
    'npx',
    // --host pins the bind address to match BASE_URL exactly. Without it,
    // Vite binds the bare string "localhost", and on some CI runners (seen
    // on GitHub Actions' Ubuntu images) Node resolves that to the IPv6
    // loopback (::1) first — the server comes up fine, but our health check
    // below is fetching the IPv4 127.0.0.1, gets ECONNREFUSED on every
    // attempt, and times out reporting "did not become ready" even though
    // the process is alive and listening (visible in CI logs as an orphan
    // node process still running at job cleanup).
    ['vite', 'preview', '--host', HOST, '--port', String(PORT), '--strictPort'],
    { cwd: root, stdio: 'pipe' },
  );
  let previewOutput = '';
  preview.stdout.on('data', (d) => { previewOutput += d; });
  preview.stderr.on('data', (d) => { previewOutput += d; });

  const previewExited = new Promise((_, reject) => {
    preview.once('exit', (code) => reject(new Error(`vite preview exited early (code ${code}):\n${previewOutput}`)));
  });

  try {
    await Promise.race([waitForServer(BASE_URL), previewExited]);

    // Optional escape hatch: point at an already-installed Chromium binary
    // instead of the one `playwright install` manages. Useful in
    // environments where downloading Playwright's own browser build isn't
    // possible or desirable (e.g. a locked-down network, or swapping in a
    // serverless-optimized build like @sparticuz/chromium on Vercel).
    const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined;
    const browser = await chromium.launch({ executablePath });
    try {
      const page = await browser.newPage();
      // Same flag the rest of this app's own dev/QA tooling uses to skip
      // the intro preloader — without it every prerendered page would
      // freeze on the loading screen instead of the real content.
      await page.addInitScript(() => {
        localStorage.setItem('1618_bypass_preloader', 'true');
      });

      for (const route of routes) {
        const url = `${BASE_URL}${route}`;
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
        await waitForHydration(page);

        const canonical = await page.evaluate(
          () => document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        );
        if (!canonical) {
          throw new Error(`${route}: no canonical link found after hydration — SEOHead may not have run`);
        }

        const html = await page.content();
        const outPath = outputPathFor(route);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, html);
        console.log(`[prerender] ${route.padEnd(40)} -> ${outPath.replace(root + '/', '')}`);
      }
    } finally {
      await browser.close();
    }
  } finally {
    preview.kill();
  }

  console.log(`[prerender] done: ${routes.length} route(s) written.`);
}

async function waitForServer(url, timeoutMs = 15_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error(`vite preview did not become ready at ${url} within ${timeoutMs}ms`);
}

main().catch((err) => {
  console.error('[prerender] FAILED:', err);
  process.exit(1);
});
