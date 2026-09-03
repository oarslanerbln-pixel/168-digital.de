import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { playWhoosh, playTick, playClose } from '../utils/audio';
import { services } from '../data/services';
import { useEscapeToClose } from '../hooks/useEscapeToClose';
import './NavigationMenu.css';

/* ════════════════════════════════════════════════════════════════
   NAVIGATION — light, plain-language, three tiers.

   Replaces a near-black sci-fi overlay that had several real problems:

   • It was never actually full-screen. `.nav-overlay` set
     `position: fixed`, but the `hud-scanline-container` class it also
     carried set `position: relative` at equal specificity and won the
     cascade, so the panel laid out in normal flow. On a 390×844 phone
     it measured 788px tall — the bottom 56px of the screen stayed
     uncovered, which is where the floating WhatsApp and quote buttons
     were showing through it.
   • Grey text on near-black failed contrast; the labels were hard to
     read at any size.
   • The labels were jargon: CINEMATICS, PROJECTS, CAPABILITIES,
     INITIATE. A visitor cannot tell that "INITIATE" means contact.
   • Twelve items at one visual weight, main items centred while the
     service sub-list was left-aligned, plus a grid overlay, corner
     brackets, a status bar and blue numerals.

   Now: paper ground and ink type to match the rest of the site (no
   jarring theme flip when you open the menu), plain words, and a real
   hierarchy — pages, then services, then everything else.
   ════════════════════════════════════════════════════════════════ */

const ease = [0.16, 1, 0.3, 1] as const;

export default function NavigationMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    playClose();
    setIsOpen(false);
  };

  useEscapeToClose(isOpen, closeMenu);

  const toggleMenu = () => {
    if (!isOpen) playWhoosh();
    else playClose();
    setIsOpen(!isOpen);
  };

  const scrollTo = (id: string) => {
    playClose();
    setIsOpen(false);
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 500);
    } else {
      setTimeout(scroll, 400);
    }
  };

  /* While the menu is open, lock the page and mark <body> so the floating
     widgets can take themselves out of the way. They are siblings of this
     overlay, not children, so CSS here cannot reach them any other way. */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-menu-open');
      return () => {
        document.body.style.overflow = '';
        document.body.classList.remove('nav-menu-open');
      };
    }
  }, [isOpen]);

  // In-page anchors. Every id must exist on the homepage — a miss is
  // silent, so the item would simply stop working.
  const pages = [
    { label: t('nav_home', 'Home'), id: 'hero' },
    { label: t('nav_ecosystems', 'Work'), id: 'works' },
    { label: t('nav_capabilities', 'Services'), id: 'services' },
    { label: t('nav_cinematics', 'Showreel'), id: 'reel-card' },
    { label: t('nav_initiate', 'Contact'), id: 'contact' },
  ];

  const morePages = [
    { to: '/about', label: t('nav_about', 'Approach') },
    { to: '/concepts', label: t('nav_concepts', 'Concepts') },
    { to: '/blog', label: t('nav_blog', 'Blog') },
  ];

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        onMouseEnter={() => !isOpen && playTick()}
        className={`nav-toggle-btn ${isOpen ? 'open' : ''}`}
        aria-label={isOpen ? t('nav_close', 'Close menu') : t('nav_open', 'Open menu')}
        aria-expanded={isOpen}
      >
        {isOpen
          ? <X size={20} strokeWidth={1.75} aria-hidden="true" />
          : <Menu size={20} strokeWidth={1.75} aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            /* A plain fade. The previous circle-reveal clip-path was the
               kind of effect that has to be perfect to not look broken,
               and on tall viewports it wasn't. */
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav_menu', 'Menu')}
          >
            <div className="nav-panel">
              {/* ── Tier 1: pages ── */}
              <nav className="nav-pages" aria-label={t('nav_menu', 'Menu')}>
                {pages.map((item, i) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    className="nav-page-item"
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={playTick}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.5, ease }}
                  >
                    <span className="nav-page-label">{item.label}</span>
                    <ArrowUpRight className="nav-page-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                  </motion.button>
                ))}
              </nav>

              {/* ── Tier 2: services, grouped and labelled ── */}
              <motion.div
                className="nav-group"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease }}
              >
                <span className="nav-group-label">{t('services_overline', 'What we do')}</span>
                <div className="nav-group-items">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/${service.slug}`}
                      className="nav-sub-item"
                      onClick={closeMenu}
                      onMouseEnter={playTick}
                    >
                      {t(service.titleKey)}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* ── Tier 3: everything else ── */}
              <motion.div
                className="nav-group"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5, ease }}
              >
                <span className="nav-group-label">{t('nav_more', 'More')}</span>
                <div className="nav-group-items">
                  {morePages.map((page) => (
                    <Link
                      key={page.to}
                      to={page.to}
                      className="nav-sub-item"
                      onClick={closeMenu}
                      onMouseEnter={playTick}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* ── Footer: the one action worth a button ── */}
              <motion.a
                href={`https://wa.me/491787277867?text=${encodeURIComponent(t('wa_message'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-whatsapp"
                onClick={closeMenu}
                onMouseEnter={playTick}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease }}
              >
                <MessageCircle size={17} strokeWidth={1.75} aria-hidden="true" />
                {t('nav_whatsapp', 'Message us on WhatsApp')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
