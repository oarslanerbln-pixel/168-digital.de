import { useMemo } from 'react';
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

export default function MarqueeTextBand({ direction = 'left', words = defaultWords }: MarqueeTextBandProps) {
  // ⚡ Bolt Optimization: Memoize the strip string calculation.
  // Prevents re-building the repeated string array structure on every render
  const strip = useMemo(() => buildStrip(words), [words]);
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
