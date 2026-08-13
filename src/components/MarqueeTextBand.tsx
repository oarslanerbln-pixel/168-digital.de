import React from 'react';
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
  const strip = buildStrip(words);
  const dur = 40; // seconds for one full loop

  return (
    <div className="marquee-band">
      {/* fade masks left & right */}
      <div className="marquee-mask" />

      <div
        className={`marquee-inner marquee-${direction}`}
        style={{ '--marquee-duration': `${dur}s` } as React.CSSProperties}
      >
        <span className="marquee-text">
          {strip}
        </span>
        <span className="marquee-text">
          {strip}
        </span>
      </div>
    </div>
  );
}
