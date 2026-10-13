import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import i18n from './i18n';
import { getPathLanguage } from './utils/localePath';
import App from './App';
import { SeoCollectorContext, type SeoData } from './components/SEOHead';
import { services } from './data/services';
import { blogPosts } from './data/blogContent';

/* ════════════════════════════════════════════════════════════════
   BUILD-TIME PRERENDER ENTRY — used only by scripts/prerender.mjs.

   The site is a client-rendered SPA. Without this, every URL answered
   with the same empty <div id="root"> and the homepage's meta tags, so
   link previews (WhatsApp, LinkedIn), simpler crawlers and AI crawlers
   (which mostly do not run JavaScript) saw neither the page's own title
   nor any of its content. Each route below is rendered once at build
   time into real HTML, with the <head> values its SEOHead resolved.

   The browser does not hydrate this markup: main.tsx still mounts with
   createRoot, which replaces it. That keeps the client exactly as it was
   (no hydration-mismatch class of bugs from localStorage, the intro or
   the visitor's language) at the cost of one re-render on load.
   ════════════════════════════════════════════════════════════════ */

// The prerender script builds URLs and sitemap entries with the same
// helpers the app uses, so the two cannot drift apart.
export { SITE_URL, SUPPORTED_LANGUAGES, OG_LOCALES, localizePath, absoluteUrl, hreflangAlternates } from './utils/localePath';

/**
 * Every indexable page, language-neutral. The prerender renders each one
 * once per language (/about, /de/about, /tr/about) and checks the list
 * against public/sitemap.xml.
 */
export const routes: string[] = [
  '/',
  ...services.map((s) => `/${s.slug}`),
  '/contact',
  '/about',
  '/concepts',
  '/blog',
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  '/impressum',
  '/datenschutz',
];

export async function render(url: string): Promise<{ html: string; seo: SeoData | null }> {
  // The URL names the language (/de/… German); render that version.
  await i18n.changeLanguage(getPathLanguage(url));
  let seo: SeoData | null = null;

  return new Promise((resolve, reject) => {
    const stream = renderToPipeableStream(
      <SeoCollectorContext.Provider value={(data) => { seo = data; }}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </SeoCollectorContext.Provider>,
      {
        // Wait for every lazy route chunk, so the HTML holds the page and
        // not a Suspense fallback.
        onAllReady() {
          let html = '';
          const sink = new Writable({
            write(chunk, _encoding, done) {
              html += chunk.toString();
              done();
            },
            final(done) {
              resolve({ html, seo });
              done();
            },
          });
          stream.pipe(sink);
        },
        onShellError: reject,
        // An error anywhere in the tree must fail the build, not ship a
        // half-rendered page.
        onError: reject,
      }
    );
  });
}
