import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import Preloader from './components/Preloader';
import LanguageToggle from './components/LanguageToggle';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Works from './components/Works';
import WebDesignCatalog from './components/WebDesignCatalog';
import SEOHead from './components/SEOHead';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import NavigationMenu from './components/NavigationMenu';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import CookieConsent from './components/CookieConsent';
import MarqueeTextBand from './components/MarqueeTextBand';
import AIChatDrawer from './components/AIChatDrawer';
import WhatsAppWidget from './components/WhatsAppWidget';
import { ReactLenis } from '@studio-freight/react-lenis';
import DevConsole from './components/DevConsole';

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

  return (
    <ReactLenis root>
      <SEOHead />
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
        <AIChatDrawer />
        <WhatsAppWidget />
        <CookieConsent forceShow={forceShowCookies} onCloseForceShow={() => setForceShowCookies(false)} />
        <LegalModal isOpen={!!legalModalType} type={legalModalType} onClose={() => setLegalModalType(null)} />
        <main>
          <Hero />
          {/* Marquee Band #1 — between Hero and Works */}
          <MarqueeTextBand direction="left" />
          <div className="section-divider" />
          <Works />
          {/* Marquee Band #2 — between Works and About, reverse direction */}
          <MarqueeTextBand direction="right" />
          <About />
          <div className="section-divider" />
          <Services />
          <div className="section-divider" />
          <WebDesignCatalog />
          <div className="section-divider" />
          <Contact />
          <Footer 
            onOpenLegal={(type) => setLegalModalType(type)} 
            onOpenCookies={() => setForceShowCookies(true)} 
          />
        </main>
      </motion.div>
    </ReactLenis>
  );
}

export default App;
