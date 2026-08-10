import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import AngebotWidget from './components/AngebotWidget';
import { ReactLenis } from '@studio-freight/react-lenis';

// Route-level code splitting: each page ships its own chunk, so a visitor
// landing directly on a service or legal page never downloads the Home
// page's heavy hero/catalog code, and vice versa.
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./components/ServicePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DevConsole = lazy(() => import('./components/DevConsole'));

const INTRO_SEEN_KEY = '1618_intro_seen_at';
const INTRO_TTL_MS = 24 * 60 * 60 * 1000; // show the intro at most once per 24h

// Computed synchronously (not in an effect) so the very first render already
// reflects whether the intro should play — no post-mount flash for admins,
// returning visitors, or people who've asked for reduced motion.
function getInitialLoadedState(): boolean {
  if (typeof window === 'undefined') return false;

  const adminBypass = localStorage.getItem('1618_bypass_preloader') === 'true';
  if (adminBypass) return true;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return true;

  const seenAt = Number(localStorage.getItem(INTRO_SEEN_KEY));
  if (seenAt && Date.now() - seenAt < INTRO_TTL_MS) return true;

  return false;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(() => getInitialLoadedState());
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [hasDevConsoleMounted, setHasDevConsoleMounted] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);
  const [forceShowCookies, setForceShowCookies] = useState(false);

  const handlePreloaderComplete = () => {
    localStorage.setItem(INTRO_SEEN_KEY, String(Date.now()));
    setIsLoaded(true);
  };

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoaded]);

  // Listen for global events to open legal modals (e.g. from cookie banner) and dev console
  useEffect(() => {
    const handleOpenDatenschutz = () => setLegalModalType('datenschutz');
    const handleOpenImpressum = () => setLegalModalType('impressum');
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsConsoleOpen(prev => !prev);
        setHasDevConsoleMounted(true);
      }
    };
    const handleOpenConsole = () => {
      setIsConsoleOpen(true);
      setHasDevConsoleMounted(true);
    };

    window.addEventListener('openDatenschutz', handleOpenDatenschutz);
    window.addEventListener('openImpressum', handleOpenImpressum);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-dev-console', handleOpenConsole);

    return () => {
      window.removeEventListener('openDatenschutz', handleOpenDatenschutz);
      window.removeEventListener('openImpressum', handleOpenImpressum);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-dev-console', handleOpenConsole);
    };
  }, []);

  const location = useLocation();

  // Scroll to top on every route change (client-side navigation doesn't
  // reset scroll position the way a full page load does).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ReactLenis root>
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
        {hasDevConsoleMounted && (
          <Suspense fallback={null}>
            <DevConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
          </Suspense>
        )}
        <NavigationMenu />
        <LanguageToggle />
        <HomeLogo />
        <WhatsAppWidget />
        <AngebotWidget />
        <CookieConsent forceShow={forceShowCookies} onCloseForceShow={() => setForceShowCookies(false)} />
        <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/impressum" element={<LegalPage />} />
              <Route path="/datenschutz" element={<LegalPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/:slug" element={<ServicePage />} />
              <Route path="*" element={<Home />} />
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
