import { memo } from 'react';
import { motion } from 'framer-motion';
import './MarqueeTextBand.css';

const defaultWords = [
  'CINEMATIC VIDEOGRAPHY', 'DRONE PRODUCTION', 'DIGITAL ECOSYSTEMS',
  'SaaS', 'INNOVATION', 'BRANDING', 'STRATEGY', 'DEVELOPMENT'
];

const separator = ' — ';
const repeatCount = 4; // repeat the list enough so it wraps seamlessly

function buildStrip(words: string[]) {
  return Array.from({ length: repeatCount }, () => words.join(separator)).join(separator) + separator;
}

interface MarqueeTextBandProps {
  direction?: 'left' | 'right';
  words?: string[];
}

function MarqueeTextBand({ direction = 'left', words = defaultWords }: MarqueeTextBandProps) {
  const strip = buildStrip(words);
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
          {strip}
        </span>
      </motion.div>
    </div>
  );
}

// ⚡ Bolt: Wrapped component in React.memo() to prevent unnecessary re-renders when parent
// components (like Home.tsx) re-render. This is especially useful here because MarqueeTextBand
// receives relatively static props but performs its own internal animation.
export default memo(MarqueeTextBand);
