import './MarqueeTextBand.css';

const defaultWords = [
  'VIDEO PRODUCTION', 'DRONE PRODUCTION', 'DIGITAL ECOSYSTEMS',
  'SaaS', 'INNOVATION', 'BRANDING', 'STRATEGY', 'DEVELOPMENT'
];

const repeatCount = 4; // repeat the list enough so it wraps seamlessly

/* A solid ink band with the names in the display serif, each followed by
   a saffron diamond ("Phi" language, Nov 2026): the first full-width
   stroke of ink under the hero, so the page reads as drawn, not as a
   stack of light boxes. */
function buildStrip(words: string[]) {
  return Array.from({ length: repeatCount }, () => words).flat();
}

interface MarqueeTextBandProps {
  direction?: 'left' | 'right';
  words?: string[];
}

export default function MarqueeTextBand({ direction = 'left', words = defaultWords }: MarqueeTextBandProps) {
  const strip = buildStrip(words);

  return (
    <div className="marquee-band">
      <div
        className={`marquee-inner direction-${direction}`}
      >
        {strip.map((word, i) => (
          <span key={i} className="marquee-text">
            {word}
            <span className="marquee-sep" aria-hidden="true">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
