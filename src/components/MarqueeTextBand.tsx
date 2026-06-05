import React from 'react';
import { motion } from 'framer-motion';
import './MarqueeTextBand.css';

const words = [
  '3D PRODUCTION', 'EVENT VIDEOGRAPHY', 'ANIMATED WEBSITES', 'AI SYSTEMS', 'DIGITAL ECOSYSTEMS',
  'SaaS', 'INNOVATION', 'BRANDING', 'STRATEGY', 'DEVELOPMENT'
];

const separator = ' — ';
const repeatCount = 4; // repeat the list enough so it wraps seamlessly

function buildStrip() {
  return Array.from({ length: repeatCount }, () => words.join(separator)).join(separator) + separator;
}

// ⚡ Bolt Optimization: Compute the strip once at module level rather than on every render.
const STRIP_CONTENT = buildStrip();

interface MarqueeTextBandProps {
  direction?: 'left' | 'right';
}

// ⚡ Bolt Optimization: Added React.memo to prevent unnecessary re-renders when parent App.tsx updates state
const MarqueeTextBand = React.memo(function MarqueeTextBand({ direction = 'left' }: MarqueeTextBandProps) {
  const dur = 40; // seconds for one full loop

  return (
    <div className="marquee-band">
      {/* fade masks left & right */}
      <div className="marquee-mask" />

      <motion.div
        animate={{ x: direction === 'left' ? [0, -2400] : [-2400, 0] }}
        transition={{ duration: dur, ease: 'linear', repeat: Infinity }}
        className="marquee-inner"
      >
        <span className="marquee-text">
          {STRIP_CONTENT}
        </span>
      </motion.div>
    </div>
  );
});

export default MarqueeTextBand;
