import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import Preloader from './components/Preloader';
import LanguageToggle from './components/LanguageToggle';
import CustomCursor from './components/CustomCursor';
import NavigationMenu from './components/NavigationMenu';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import WhatsAppWidget from './components/WhatsAppWidget';
import { ReactLenis } from '@studio-freight/react-lenis';
import DevConsole from './components/DevConsole';

// Route-level code splitting: each page ships its own chunk, so a visitor
// landing directly on a service or legal page never downloads the Home
// page's heavy hero/catalog code, and vice versa.
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./components/ServicePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);
  const [forceShowCookies, setForceShowCookies] = useState(false);

  // Check for preloader bypass
  useEffect(() => {
    const savedBypass = localStorage.getItem('1618_bypass_preloader') === 'true';
    if (savedBypass) {
      setIsLoaded(true);
    }
  }, []);

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
      }
    };
    const handleOpenConsole = () => setIsConsoleOpen(true);

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
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* Ambient particle backdrop — fixed background */}
      {isLoaded && <AmbientBackground />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{ pointerEvents: isLoaded ? 'auto' : 'none' }}
      >
        <CustomCursor />
        <DevConsole isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} />
        <NavigationMenu />
        <LanguageToggle />
        <WhatsAppWidget />
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
      </motion.div>
    </ReactLenis>
  );
}

export default App;
