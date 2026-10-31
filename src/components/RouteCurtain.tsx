import { useRef } from 'react';
import './RouteCurtain.css';

/**
 * A short ink curtain that wipes away upwards whenever the page changes —
 * the cut between two shots. It hides the jump to the top and the swap
 * of content, and gives navigation the same deliberate pace as the rest
 * of the site. Not on the first load (the page is already there), not
 * when only the language changes (same page), never with reduced motion
 * (CSS). Purely visual: pointer-events none, hidden from assistive tech.
 */
export default function RouteCurtain({ path }: { path: string }) {
  const firstPath = useRef(path);
  const navigated = useRef(false);
  if (path !== firstPath.current) navigated.current = true;
  if (!navigated.current) return null;
  return (
    <div key={path} className="route-curtain" aria-hidden="true">
      <span className="route-curtain-mark">1618</span>
    </div>
  );
}
