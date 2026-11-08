import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { buildGoldenSpiral } from '../utils/goldenSpiral';
import { requestContactTopic } from '../utils/contactTopic';
import { playClick, playTick } from '../utils/audio';
import '../styles/cta.css';
import './Statement.css';

/* ════════════════════════════════════════════════════════════════
   STATEMENT — one sentence the visitor reads at the pace they scroll.

   Between the work and the process, the page says once, plainly, what
   the studio is for: not looking good, but bringing inquiries and
   saving time. The sentence is set large and starts as a faint
   imprint; each word inks in as the visitor scrolls past it, so the
   sentence is read word by word instead of skimmed. The two key words
   switch to the hero's voice (Playfair italic, gold), so the page's
   promise and its first screen rhyme. A golden spiral turns slowly
   behind it with the scroll — the studio's name drawn once more, as a
   watermark.

   The section ends in the same button as the hero: the one moment the
   page states its case outright is the natural moment to ask.

   Motion is scroll-linked (Motion's useScroll), so nothing runs while
   the page is still and it only touches opacity and transform. Reduced
   motion and the prerendered HTML get the finished sentence in full ink.
   ════════════════════════════════════════════════════════════════ */

const SPIRAL = buildGoldenSpiral(440, 200, 3.75, 280);

interface Token {
  text: string;
  /** Trailing punctuation outside the key word's emphasis ("time," → "time" + ","). */
  tail: string;
  key: boolean;
}

/** Splits the sentence into words; *word* marks a key word. */
function tokenize(sentence: string): Token[] {
  return sentence
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => {
      const match = /^\*(.+?)\*(.*)$/.exec(word);
      return match ? { text: match[1], tail: match[2], key: true } : { text: word, tail: '', key: false };
    });
}

function WordContent({ token }: { token: Token }) {
  return (
    <>
      {token.key ? <em className="stmt-key">{token.text}</em> : token.text}
      {token.tail}
    </>
  );
}

function InkWord({ token, progress, range }: { token: Token; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="stmt-word" style={{ opacity }}>
      <WordContent token={token} />
    </motion.span>
  );
}

export default function Statement() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const animate = typeof window !== 'undefined' && !reduceMotion;

  // Ink runs from when the sentence enters the lower screen until its
  // last line passes the middle — read comfortably, never rushed.
  const { scrollYProgress: ink } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.5'] });
  const { scrollYProgress: pass } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const spiralRotate = useTransform(pass, [0, 1], [-36, 36]);
  const spiralY = useTransform(pass, [0, 1], [60, -60]);

  const tokens = tokenize(t('statement_text'));
  const n = tokens.length;

  return (
    <section ref={sectionRef} className="stmt-section" aria-labelledby="stmt-text">
      <motion.svg
        className="stmt-spiral"
        viewBox="0 0 440 440"
        aria-hidden="true"
        style={animate ? { rotate: spiralRotate, y: spiralY } : undefined}
      >
        <path d={SPIRAL} fill="none" stroke="currentColor" strokeWidth={1} />
      </motion.svg>

      <div className="stmt-inner">
        <span className="home-overline">{t('statement_overline')}</span>
        <h2 id="stmt-text" ref={textRef} className="stmt-text">
          {tokens.map((token, i) => (
            <span key={i}>
              {i > 0 && ' '}
              {animate ? (
                <InkWord token={token} progress={ink} range={[i / n, Math.min(1, (i + 1.5) / n)]} />
              ) : (
                <span className="stmt-word">
                  <WordContent token={token} />
                </span>
              )}
            </span>
          ))}
        </h2>
        <button
          type="button"
          className="hero-cta stmt-cta"
          onMouseEnter={playTick}
          onClick={() => {
            playClick();
            requestContactTopic();
          }}
        >
          {t('hero_button')}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
