import React, { useMemo } from 'react';
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

const MarqueeTextBand = React.memo(function MarqueeTextBand({ direction = 'left', words = defaultWords }: MarqueeTextBandProps) {
  // Memoize the strip calculation to avoid unnecessary string concatenation on re-renders
  const strip = useMemo(() => buildStrip(words), [words]);

  return (
    <div className="marquee-band">
      {/* fade masks left & right */}
      <div className="marquee-mask" />

      <div
        className={`marquee-inner direction-${direction}`}
      >
        <span className="marquee-text">
          {strip}
        </span>
      </div>
    </div>
  );
});

export default MarqueeTextBand;
