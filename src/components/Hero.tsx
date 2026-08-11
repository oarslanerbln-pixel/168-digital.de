import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { playClick, playTick } from '../utils/audio';
import { useRef, MouseEvent } from 'react';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import HeroEmblem from './HeroEmblem';
import Reel from './Reel';
import './Hero.css';

function MagneticButton({
  children,
  className,
  onClick,
  onMouseEnter: onEnter,
  ...rest
}: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const bx = useMotionValue(0);
  const by = useMotionValue(0);
  const springX = useSpring(bx, { stiffness: 150, damping: 25 });
  const springY = useSpring(by, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    bx.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    by.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { bx.set(0); by.set(0); }}
      onMouseEnter={onEnter}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={className}
      style={{ x: springX, y: springY }}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="hero-section" style={{ minHeight: '100vh', height: 'auto', paddingTop: '120px', paddingBottom: '80px', display: 'flex', flexDirection: 'column' }}>
      <div className="hero-3d-bg" />

      <div className="hero-content-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '80px', pointerEvents: 'none' }}>
        
        {/* Centered, symmetric hero column */}
        <div className="hero-content-grid">
          <div className="hero-left">
            <motion.div
              className="hero-emblem-mark"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ pointerEvents: 'auto' }}
            >
              <HeroEmblem />
            </motion.div>

            <motion.span
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero_eyebrow')}
            </motion.span>

            <motion.h1
              className="hero-headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero_title_pre')}
              <span className="hero-title-word hero-title-word-blue">{t('hero_title_word1')}</span>
              {t('hero_title_mid')}
              <span className="hero-title-word hero-title-word-gold">{t('hero_title_word2')}</span>
              {t('hero_title_post')}
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('hero_subtitle')}
            </motion.p>

            {/* Premium Minimalist Actions */}
            <motion.div
              className="hero-actions-v2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton
                className="hero-btn-primary-v2"
                onMouseEnter={playTick}
                onClick={() => {
                  playClick();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="hero-btn-text">{t('hero_button')}</span>
                <span className="hero-btn-arrow">
                  <ArrowRight size={16} strokeWidth={2} />
                </span>
                <span className="hero-btn-line" />
              </MagneticButton>

              <span className="hero-actions-dot" />

              <div className="hero-contact-pills">
                <MagneticButton
                  className="hero-pill"
                  onMouseEnter={playTick}
                  onClick={() => {
                    playClick();
                    window.open('https://wa.me/491787277867', '_blank', 'noopener,noreferrer');
                  }}
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  <span className="hero-pill-label">WhatsApp</span>
                </MagneticButton>

                <MagneticButton
                  className="hero-pill"
                  onMouseEnter={playTick}
                  onClick={() => {
                    playClick();
                    window.location.href = 'mailto:info@1618-digital.de';
                  }}
                  aria-label="Email"
                >
                  <Mail size={18} strokeWidth={1.5} />
                  <span className="hero-pill-label">Email</span>
                </MagneticButton>
              </div>
            </motion.div>

            {/* Scannable service strip — instant clarity for search visitors */}
            <motion.ul
              className="hero-service-strip"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              aria-label={t('services_title')}
            >
              <li><Link to="/web-saas-development" className="hero-service-chip">{t('chip_web')}</Link></li>
              <li><Link to="/video-drone-production" className="hero-service-chip">{t('chip_video')}</Link></li>
              <li><Link to="/wedding-event-films" className="hero-service-chip">{t('chip_event')}</Link></li>
              <li><Link to="/social-media-marketing" className="hero-service-chip">{t('chip_social')}</Link></li>
            </motion.ul>
          </div>
        </div>

        {/* Large Drone Video Section (Reel) Below the fold */}
        <motion.div 
          className="hero-reel-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', pointerEvents: 'auto' }}
        >
          <Reel />
        </motion.div>

      </div>
    </section>
  );
}
