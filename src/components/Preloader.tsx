import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

interface PreloaderProps {
  onComplete: () => void;
}

const bootSequence = [
  "SYS.INIT // KERNEL 1.618",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING 3D ENVIRONMENT...",
  "CALIBRATING AI MODELS...",
  "ACCESS GRANTED."
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // Cycle through boot sequence text rapidly
    const textInterval = setInterval(() => {
      setTextIndex(prev => {
        if (prev < bootSequence.length - 1) return prev + 1;
        clearInterval(textInterval);
        return prev;
      });
    }, 400);

    const t1 = setTimeout(() => setPhase(1), 2400);  // Show brand
    const t2 = setTimeout(() => setPhase(2), 4200);  // Open shutters
    const t3 = setTimeout(() => onComplete(), 5400); // Unmount

    return () => {
      clearInterval(textInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isLoaded = phase >= 2;
  const showBootText = phase === 0;
  const showBrand = phase === 1;

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

      {/* ── Stage ── */}
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
        {/* Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80px' }}>
          <AnimatePresence mode="wait">
            {showBootText && (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontWeight: '400',
                  fontSize: 'clamp(0.7rem, 2vw, 1rem)',
                  color: '#c8ff00',
                  textAlign: 'center',
                  letterSpacing: '0.1em'
                }}
              >
                {bootSequence.map((text, idx) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: idx <= textIndex ? 1 : 0, 
                      height: idx <= textIndex ? 'auto' : 0 
                    }}
                    transition={{ duration: 0.1 }}
                    style={{ margin: '4px 0' }}
                  >
                    {idx === textIndex ? `> ${text} _` : `> ${text}`}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {showBrand && (
              <motion.div
                key="brand"
                initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4em',
                  fontSize: 'clamp(1.5rem, 7vw, 3rem)',
                  marginRight: '-0.4em',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5c185 50%, #c5a073 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                  textShadow: '0 0 30px rgba(229, 193, 133, 0.3)'
                }}>
                  1618 DIGITAL
                </div>
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  style={{ 
                    height: '1px', 
                    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.8), transparent)', 
                    marginTop: '20px' 
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
