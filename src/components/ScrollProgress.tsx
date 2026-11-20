import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

/**
 * ScrollProgress — a 3px aurora line across the top of the screen that
 * fills as the visitor reads down the page.
 *
 * Long pages (home, service pages) give no sense of "how much is left";
 * the line answers that quietly and is the one piece of chrome that
 * shows the aurora on every route. It is a single scaleX transform
 * driven by framer-motion's scroll value — no layout, no rAF loop of our
 * own — and decorative, so hidden from assistive tech. Reduced motion
 * drops the spring and simply tracks the scroll position.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
      aria-hidden="true"
    />
  );
}
