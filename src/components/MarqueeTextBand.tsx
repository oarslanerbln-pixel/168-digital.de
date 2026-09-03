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
}
