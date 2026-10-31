import { useState, useEffect, useLayoutEffect, useRef, Suspense, lazy, type ComponentType } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import Preloader from './components/Preloader';
import LanguageToggle from './components/LanguageToggle';
import HomeLogo from './components/HomeLogo';
import CustomCursor from './components/CustomCursor';
import NavigationMenu from './components/NavigationMenu';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import WhatsAppWidget from './components/WhatsAppWidget';
import { ReactLenis } from '@studio-freight/react-lenis';
import { INTRO_DONE_EVENT } from './utils/introEvent';
import RouteCurtain from './components/RouteCurtain';
import { PREFIXED_LANGUAGES, getPathLanguage, hasLanguagePrefix, localizePath, stripLanguagePrefix, toLanguage } from './utils/localePath';

/**
 * A route-level chunk that can also be loaded ahead of rendering.
 *
 * main.tsx loads the current URL's page before React starts. The page is
 * already on screen as prerendered HTML, and React replaces that markup
 * on its first commit — if the page were still a pending lazy() chunk at
 * that moment, the commit would show the Suspense fallback (nothing)
 * and the visitor would see the page blink out until the chunk arrived.
 * Once loaded, the page renders directly. Each mount picks its component
 * once, so a page that started as the lazy wrapper is never swapped for
 * the loaded one mid-life (that would remount it and lose its state).
 */
function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | null = null;
  const loadAndKeep = () =>
    load().then((module) => {
      Loaded = module.default;
      return module;
    });
  const Lazy = lazy(loadAndKeep);
  function Page() {
    const [Component] = useState<ComponentType>(() => Loaded ?? Lazy);
    return <Component />;
  }
  Page.preload = loadAndKeep;
  return Page;
}

// Route-level code splitting: each page ships its own chunk, so a visitor
// landing directly on a service or legal page never downloads the Home
// page's heavy hero/catalog code, and vice versa.
const Home = lazyPage(() => import('./pages/Home'));
const ServicePage = lazyPage(() => import('./components/ServicePage'));
const LegalPage = lazyPage(() => import('./pages/LegalPage'));
const ContactPage = lazyPage(() => import('./pages/ContactPage'));
const BlogPage = lazyPage(() => import('./pages/BlogPage'));
const BlogPostPage = lazyPage(() => import('./pages/BlogPostPage'));
// Philosophy and the 50-concept design library used to render inside the
// homepage; they now have their own routes and their own chunks.
const AboutPage = lazyPage(() => import('./pages/AboutPage'));
const ConceptsPage = lazyPage(() => import('./pages/ConceptsPage'));
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'));

/** The page chunk for a URL, mirroring pageRoutes below. Used by main.tsx. */
export function preloadRoute(pathname: string): Promise<unknown> {
  const path = stripLanguagePrefix(pathname);
  const exact: Record<string, { preload: () => Promise<unknown> }> = {
    '/': Home,
    '/impressum': LegalPage,
    '/datenschutz': LegalPage,
    '/contact': ContactPage,
    '/about': AboutPage,
    '/concepts': ConceptsPage,
    '/blog': BlogPage,
  };
  const page =
    exact[path] ??
    (/^\/blog\/[^/]+$/.test(path) ? BlogPostPage : /^\/[^/]+$/.test(path) ? ServicePage : NotFoundPage);
  return page.preload();
}

const INTRO_SEEN_KEY = '1618_intro_seen_at';
const INTRO_TTL_MS = 24 * 60 * 60 * 1000; // show the intro at most once per 24h

// Computed synchronously (not in an effect) so the very first render already
// reflects whether the intro should play — no post-mount flash for admins,
// returning visitors, or people who've asked for reduced motion.
function getInitialLoadedState(): boolean {
  // Prerendered HTML is for crawlers and the first paint before the script
  // runs: it carries the page, not the intro. The browser decides about the
  // intro itself when React takes over.
  if (typeof window === 'undefined') return true;

  const adminBypass = localStorage.getItem('1618_bypass_preloader') === 'true';
  if (adminBypass) return true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;

  const seenAt = Number(localStorage.getItem(INTRO_SEEN_KEY));
  if (seenAt && Date.now() - seenAt < INTRO_TTL_MS) return true;

  return false;
}

// useLayoutEffect warns in a server render; the prerender never needs it.
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Keeps the visible language and the URL in step. The path is the source
 * of truth (/de/… German, /tr/… Turkish, bare English), so every link,
 * reload and shared URL shows the language it names.
 *
 * One exception, on the very first load only: a bare URL opened by
 * someone whose last choice or browser language is German/Turkish (i18n
 * already starts in that language, see i18n.ts) is moved to that
 * language's URL. Most visitors arrive through bare links (Instagram bio,
 * QR codes) and used to get German automatically; this keeps that, while
 * crawlers — no stored choice, English browser — get exactly the URL
 * they asked for. Later navigation never redirects: switching to English
 * means going to the bare URL on purpose.
 */
function LanguageRouting() {
  const { i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const firstLoad = useRef(true);

  useBrowserLayoutEffect(() => {
    const current = toLanguage(i18n.language);

    if (firstLoad.current) {
      firstLoad.current = false;
      const params = new URLSearchParams(search);
      const hadLangParam = params.has('lang');
      params.delete('lang');
      const query = params.toString() ? `?${params}` : '';
      if (!hasLanguagePrefix(pathname) && PREFIXED_LANGUAGES.includes(current)) {
        navigate(`${localizePath(pathname, current)}${query}${hash}`, { replace: true });
        return;
      }
      // A leftover ?lang= (e.g. ?lang=en, or carried through the 301) is
      // now meaningless: drop it so the address bar shows the clean URL.
      if (hadLangParam) navigate(`${pathname}${query}${hash}`, { replace: true });
    }

    const pathLang = getPathLanguage(pathname);
    if (pathLang !== current) i18n.changeLanguage(pathLang);
  }, [pathname, search, hash, i18n, navigate]);

  return null;
}

/**
 * Every page, mounted once per language: at "/" for English and under
 * "/de" and "/tr". Relative paths, so each set nests under its prefix.
 * The static "de"/"tr" segments outrank the ":slug" service route, so
 * /de is the German homepage, not a service called "de".
 */
const pageRoutes = (
  <>
    <Route index element={<Home />} />
    <Route path="impressum" element={<LegalPage />} />
    <Route path="datenschutz" element={<LegalPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="concepts" element={<ConceptsPage />} />
    <Route path="blog" element={<BlogPage />} />
    <Route path="blog/:slug" element={<BlogPostPage />} />
    <Route path=":slug" element={<ServicePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(() => getInitialLoadedState());
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);
  const [forceShowCookies, setForceShowCookies] = useState(false);

  const handlePreloaderComplete = () => {
    localStorage.setItem(INTRO_SEEN_KEY, String(Date.now()));
    setIsLoaded(true);
    // The hero plays its entrance as the overlay lifts, not unseen beneath it.
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
  };

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoaded]);

  // Listen for global events to open legal modals (e.g. from cookie banner)
  useEffect(() => {
    const handleOpenDatenschutz = () => setLegalModalType('datenschutz');
    const handleOpenImpressum = () => setLegalModalType('impressum');

    window.addEventListener('openDatenschutz', handleOpenDatenschutz);
    window.addEventListener('openImpressum', handleOpenImpressum);

    return () => {
      window.removeEventListener('openDatenschutz', handleOpenDatenschutz);
      window.removeEventListener('openImpressum', handleOpenImpressum);
    };
  }, []);

  const location = useLocation();

  // Scroll to top on every route change (client-side navigation doesn't
  // reset scroll position the way a full page load does). Switching only
  // the language keeps the visitor where they are.
  const neutralPath = stripLanguagePrefix(location.pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [neutralPath]);

  return (
    <ReactLenis root>
      <LanguageRouting />
      <RouteCurtain path={neutralPath} />
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Ambient particle backdrop — fixed background */}
      {isLoaded && <AmbientBackground />}

      {/*
        No opacity gating here: the Preloader's own overlay is fully opaque
        and sits on top for the entire intro, so real content underneath can
        paint immediately (this is what makes it LCP-eligible) without any
        visible difference — pointer-events is the only thing this wrapper
        still needs to gate.
      */}
      <div style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}>
        <CustomCursor />
        <NavigationMenu />
        <LanguageToggle />
        <HomeLogo />
        <WhatsAppWidget />
        <CookieConsent forceShow={forceShowCookies} onCloseForceShow={() => setForceShowCookies(false)} />
        <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/">{pageRoutes}</Route>
              {PREFIXED_LANGUAGES.map((lang) => (
                <Route key={lang} path={`/${lang}`}>{pageRoutes}</Route>
              ))}
            </Routes>
          </Suspense>
          <Footer
            onOpenCookies={() => setForceShowCookies(true)}
          />
        </main>
      </div>
    </ReactLenis>
  );
}

export default App;
