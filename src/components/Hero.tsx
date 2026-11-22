import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { playClick, playTick } from '../utils/audio';
import { ArrowRight, Check } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { useInlineWhatsApp } from '../utils/inlineWhatsApp';
import { LEAD_WHATSAPP_NUMBER } from '../utils/leads';
import { INTRO_DONE_EVENT } from '../utils/introEvent';
import { entranceGate } from '../utils/entranceGate';
import '../styles/cta.css';
import './Hero.css';

/* ════════════════════════════════════════════════════════════════
   HERO — outcome first, the ratio visible, one obvious next step.

   A restaurant owner or a Mittelstand manager arriving from Instagram
   must know within five seconds what they get and what to do next:

   - the headline names the result (customers won, hours saved), set in
     the display serif with exactly those two words in deep-gold italic;
   - one solid CTA goes straight to the inquiry form, WhatsApp sits next
     to it, and three short trust lines answer the usual "but…";
   - on the right, the studio's name drawn as a picture: a golden
     rectangle divided into its squares (377 : 233 : 144 : 89 : 55 : 34),
     the spiral drawing itself across them and a point travelling along
     it. "Phi" visual language, Nov 2026 — it replaced a product photo:
     the services band right below shows what we build, while this says
     who we are, and it paints instantly (inline SVG, no image request).

   MOTION. The headline rises word by word out of a mask; copy, buttons
   and the composition follow in one short cascade — the squares settle
   in from largest to smallest, then the spiral is drawn. It is all CSS
   keyed on `.hero-play`, and that class is only set when the reveal can
   actually be seen:
   - never in the prerendered HTML, so crawlers, no-JS visitors and the
     first paint get the finished hero;
   - not on the first mount over that prerendered hero either — React
     replaces identical markup, and replaying the intro there would make
     visible text vanish and come back;
   - yes when the intro overlay lifts (the "1618:intro-done" event from
     App) and when a visitor navigates to the homepage in the app.
   The travelling point and the slowly turning dotted orbit run in every
   case (they never hide content) and stop for reduced motion.
   ════════════════════════════════════════════════════════════════ */

/** See MOTION above: play unless this mount replaces the prerendered hero. */
const shouldPlayOnMount = entranceGate('.hero-section');

type Segment = { text: string; key?: boolean };

/**
 * Splits the headline into masked words for the reveal. Punctuation glued
 * to a word ("getiren," in Turkish) stays in that word's mask, so it can
 * never wrap onto a line of its own; the key words keep their class.
 */
function headlineWords(parts: Segment[]): Segment[][] {
  const words: Segment[][] = [];
  let glue = false;
  for (const part of parts) {
    for (const token of part.text.split(/(\s+)/)) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        glue = false;
        continue;
      }
      const segment = { text: token, key: part.key };
      if (glue && words.length) words[words.length - 1].push(segment);
      else words.push([segment]);
      glue = true;
    }
  }
  return words;
}

const trustKeys = ['hero_trust_1', 'hero_trust_2', 'hero_trust_3'];

export default function Hero() {
  const { t } = useTranslation();
  const [play, setPlay] = useState(shouldPlayOnMount);
  const [replay, setReplay] = useState(0);
  const ctaRef = useMagnetic<HTMLButtonElement>();
  const whatsappRef = useMagnetic<HTMLAnchorElement>();
  const actionsRef = useInlineWhatsApp<HTMLDivElement>();

  useEffect(() => {
    const onIntroDone = () => {
      setPlay(true);
      setReplay((n) => n + 1);
    };
    window.addEventListener(INTRO_DONE_EVENT, onIntroDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
  }, []);

  const scrollToContact = () => {
    playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const words = headlineWords([
    { text: t('hero_title_pre') },
    { text: t('hero_title_word1'), key: true },
    { text: t('hero_title_mid') },
    { text: t('hero_title_word2'), key: true },
    { text: t('hero_title_post') },
  ]);

  return (
    <section
      id="hero"
      className={`hero-section${play ? ' hero-play' : ''}`}
    >
      <div className="hero-inner" key={replay}>
        <div className="hero-main">
          <span className="hero-eyebrow hero-rise" style={{ '--d': '0s' } as CSSProperties}>
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            {t('hero_eyebrow')}
          </span>

          <h1 className="hero-headline">
            {words.map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                <span className="hero-word-mask">
                  <span className="hero-word" style={{ '--d': `${0.1 + i * 0.045}s` } as CSSProperties}>
                    {word.map((seg, j) =>
                      seg.key ? (
                        <span key={j} className="hero-key">
                          {seg.text}
                        </span>
                      ) : (
                        seg.text
                      )
                    )}
                  </span>
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-subtitle hero-rise" style={{ '--d': '0.45s' } as CSSProperties}>
            {t('hero_subtitle')}
          </p>

          <div ref={actionsRef} className="hero-actions hero-rise" style={{ '--d': '0.55s' } as CSSProperties}>
            <button
              ref={ctaRef}
              type="button"
              className="hero-cta"
              onMouseEnter={playTick}
              onClick={scrollToContact}
            >
              {t('hero_button')}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </button>

            <a
              ref={whatsappRef}
              className="hero-cta-ghost"
              // The opening line is already typed: the visitor only has to
              // press send, instead of facing an empty chat.
              href={`https://wa.me/${LEAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(t('wa_message'))}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playTick}
              onClick={playClick}
            >
              {t('hero_whatsapp', 'WhatsApp')}
            </a>
          </div>

          <ul className="hero-trust hero-rise" style={{ '--d': '0.65s' } as CSSProperties}>
            {trustKeys.map((key) => (
              <li key={key}>
                <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero-visual">
          <PhiComposition />
          <figcaption className="hero-phi-caption hero-rise" style={{ '--d': '1.9s' } as CSSProperties}>
            {t('hero_phi_caption')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* The golden rectangle, 610 × 377, cut into its squares; each square
   carries a quarter of the spiral. Coordinates are the Fibonacci sizes
   themselves, so the drawing IS the ratio rather than an illustration
   of it. Decorative (the caption says what it is), hence aria-hidden. */
const SPIRAL =
  'M0,377 A377,377 0 0 1 377,0 A233,233 0 0 1 610,233 A144,144 0 0 1 466,377 ' +
  'A89,89 0 0 1 377,288 A55,55 0 0 1 432,233 A34,34 0 0 1 466,267';

const SQUARES = [
  { x: 0, y: 0, s: 377, tone: 'ink' },
  { x: 377, y: 0, s: 233, tone: 'saffron' },
  { x: 466, y: 233, s: 144, tone: 'paper' },
  { x: 377, y: 288, s: 89, tone: 'terracotta' },
  { x: 377, y: 233, s: 55, tone: 'ink' },
  { x: 432, y: 233, s: 34, tone: 'saffron' },
] as const;

function PhiComposition() {
  return (
    <svg className="phi" viewBox="-40 -60 690 497" aria-hidden="true" focusable="false">
      <circle className="phi-orbit" cx="305" cy="188" r="250" />
      {SQUARES.map((q, i) => (
        <rect
          key={q.s}
          className={`phi-sq phi-sq-${q.tone}`}
          x={q.x}
          y={q.y}
          width={q.s}
          height={q.s}
          style={{ '--d': `${0.35 + i * 0.22}s` } as CSSProperties}
        />
      ))}
      <path className="phi-spiral" d={SPIRAL} pathLength={1} />
      <circle className="phi-point" r="9" />
    </svg>
  );
}
