import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { playClick, playTick } from '../utils/audio';
import { ArrowRight, Check } from 'lucide-react';
import { heroImage, srcSet } from '../data/homeContent';
import { useMagnetic } from '../hooks/useMagnetic';
import { INTRO_DONE_EVENT } from '../utils/introEvent';
import './Hero.css';

/* ════════════════════════════════════════════════════════════════
   HERO — outcome first, product visible, one obvious next step.

   The previous hero led with a manifesto ("where image and code become
   one") and a full-width showreel. Beautiful, but a restaurant owner or
   a Mittelstand manager arriving from Instagram could not tell within
   five seconds what they would get or what to do next. This version
   answers both on the first screen:

   - the headline names the result (customers won, hours saved), with
     the blue-to-gold shimmer kept on exactly those two words — still the
     only colour gradient on the site (CLAUDE.md rule 7);
   - a product photo on the right shows the kind of system we build —
     a dashboard and a guest-facing menu in a real café — kept in the
     page's monochrome with the one blue accent, so it supports the
     shimmer instead of competing with it;
   - one solid CTA goes straight to the inquiry form, WhatsApp sits next
     to it for people who would rather message, and three short trust
     lines answer the usual "but…" before it is asked.

   The showreel moved down next to the film services, where it proves
   the film half of the business instead of competing with the software
   half for the first impression.

   MOTION. The headline rises word by word out of a mask, then the
   shimmer starts; copy, buttons and photo follow in one short cascade.
   It is all CSS keyed on `.hero-play`, and that class is only set when
   the reveal can actually be seen:
   - never in the prerendered HTML, so crawlers, no-JS visitors and the
     first paint get the finished hero (it used to ship at opacity 0
     until JavaScript ran);
   - not on the first mount over that prerendered hero either — React
     replaces identical markup, and replaying the intro there would make
     visible text vanish and come back;
   - yes when the intro overlay lifts (the "1618:intro-done" event from
     App) and when a visitor navigates to the homepage in the app.
   ════════════════════════════════════════════════════════════════ */

let mountedBefore = false;

/** See MOTION above: play unless this mount replaces the prerendered hero. */
function shouldPlayOnMount(): boolean {
  if (typeof document === 'undefined') return false;
  const replacingPrerender = !mountedBefore && !!document.querySelector('.hero-section');
  mountedBefore = true;
  return !replacingPrerender;
}

type Segment = { text: string; shimmer?: 'blue' | 'gold' };

/**
 * Splits the headline into masked words for the reveal. Punctuation glued
 * to a word ("getiren," in Turkish) stays in that word's mask, so it can
 * never wrap onto a line of its own; the shimmer words keep their class.
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
      const segment = { text: token, shimmer: part.shimmer };
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
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useMagnetic<HTMLButtonElement>();
  const whatsappRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const onIntroDone = () => {
      setPlay(true);
      setReplay((n) => n + 1);
    };
    window.addEventListener(INTRO_DONE_EVENT, onIntroDone);
    return () => window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
  }, []);

  // A soft light that follows the mouse across the hero (CSS reads the
  // two custom properties). Set directly on the element: no re-render.
  const trackPointer = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    sectionRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    sectionRef.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const scrollToContact = () => {
    playClick();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const words = headlineWords([
    { text: t('hero_title_pre') },
    { text: t('hero_title_word1'), shimmer: 'blue' },
    { text: t('hero_title_mid') },
    { text: t('hero_title_word2'), shimmer: 'gold' },
    { text: t('hero_title_post') },
  ]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`hero-section${play ? ' hero-play' : ''}`}
      onPointerMove={trackPointer}
    >
      {/* Backdrop: a perspective grid with light pulses running along
          it and two slow glow orbs — the "screen at night" the dark
          theme is built around. Pure CSS, decorative, frozen for
          reduced motion. */}
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-grid" />
        <span className="hero-beam hero-beam-1" />
        <span className="hero-beam hero-beam-2" />
        <span className="hero-beam hero-beam-3" />
        <span className="hero-orb hero-orb-a" />
        <span className="hero-orb hero-orb-b" />
      </div>
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
                      seg.shimmer ? (
                        <span key={j} className={`hero-title-word hero-title-word-${seg.shimmer}`}>
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

          <div className="hero-actions hero-rise" style={{ '--d': '0.55s' } as CSSProperties}>
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
              href="https://wa.me/491787277867"
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

        <div className="hero-visual hero-unveil" style={{ '--d': '0.3s' } as CSSProperties}>
          {/* Two small status cards float over the photo — the kind of
              message the systems we build send to an owner. They make the
              still photo read as a live product; decorative, so hidden
              from assistive tech (the copy beside it says the same). */}
          <span className="hero-chip hero-chip-a" aria-hidden="true">
            <span className="hero-chip-dot" />
            {t('hero_chip_1')}
          </span>
          <span className="hero-chip hero-chip-b" aria-hidden="true">
            <Check size={14} strokeWidth={2.4} />
            {t('hero_chip_2')}
          </span>
          {/* The likely LCP element: eager, high priority, and sized by
              srcset so a phone takes the 640 px file (about 24 kB). The
              copy beside it says what it shows, hence the empty alt. */}
          <img
            className="hero-photo"
            src={`${heroImage.stem}-1080.webp`}
            srcSet={srcSet(heroImage)}
            sizes="(max-width: 900px) 92vw, 540px"
            width={heroImage.width}
            height={heroImage.height}
            alt=""
            // Lower-case on purpose: React 18 does not know the
            // camel-cased prop yet and would warn instead of passing it.
            {...{ fetchpriority: 'high' }}
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
