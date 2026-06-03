import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const servicesList = [
  "3D CONFIGURATORS",
  "AI VOICE AGENTS",
  "PREMIUM HOCHZEITSFILME",
  "AERIAL CINEMATICS",
  "CUSTOM SOFTWARE"
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);  // Open catalog
    const t2 = setTimeout(() => setPhase(2), 3200); // Close catalog, show brand
    const t3 = setTimeout(() => setPhase(3), 4800); // Open shutters
    const t4 = setTimeout(() => onComplete(), 6000); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const isLoaded = phase >= 3;
  const showCatalog = phase === 1;
  const showBrand = phase === 2;

  return (
    <motion.div
      key="preloader-wrapper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ pointerEvents: isLoaded ? 'none' : 'all', background: '#050505' }}
      className="preloader-overlay-p"
    >
      {/* ── Top & Bottom cinematic black shutters ── */}
      <motion.div
        className="pl-shutter-top"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'top', background: '#050505' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="pl-shutter-bottom"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isLoaded ? 0 : 1 }}
        style={{ transformOrigin: 'bottom', background: '#050505' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* ── Ultra Minimal Stage ── */}
      <motion.div
        className="pl-stage"
        animate={{
          opacity: isLoaded ? 0 : 1,
          scale: isLoaded ? 1.05 : 1,
          filter: isLoaded ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 20px' }}
      >
        {/* Animated Gold/Platinum Line TOP */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: phase > 0 ? '160px' : '0px', opacity: phase > 0 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)', marginBottom: '15px' }}
        />

        {/* Catalog Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
          <AnimatePresence mode="wait">
            {showCatalog && (
              <motion.div
                key="catalog"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                {servicesList.map((service) => (
                  <motion.div
                    key={service}
                    variants={{
                      hidden: { height: 0, opacity: 0, y: 10, margin: 0 },
                      visible: { height: 'auto', opacity: 1, y: 0, margin: '8px 0', transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
                      exit: { height: 0, opacity: 0, y: -10, margin: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }
                    }}
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: '300',
                      textTransform: 'uppercase',
                      letterSpacing: '0.25em',
                      fontSize: 'clamp(0.65rem, 2.5vw, 1rem)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      textAlign: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    {service}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showBrand && (
              <motion.div
                key="brand"
                initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)', height: 0 }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', height: 'auto' }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4em',
                  fontSize: 'clamp(1.4rem, 6vw, 2.5rem)',
                  marginRight: '-0.4em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5c185 50%, #c5a073 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  padding: '10px 0'
                }}
              >
                1618 DIGITAL
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated Gold/Platinum Line BOTTOM */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: phase > 0 ? '160px' : '0px', opacity: phase > 0 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)', marginTop: '15px' }}
        />
      </motion.div>
    </motion.div>
  );
}
