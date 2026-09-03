import './AmbientBackground.css';

/**
 * AmbientBackground — a still, neutral backdrop.
 *
 * This used to run a 90-particle canvas field on a permanent
 * requestAnimationFrame loop, drifting bronze dots over warm aurora
 * gradients. On a light, minimal page that read as texture-for-its-own-
 * sake, and it kept a phone's compositor busy for as long as the tab was
 * open. It is now two static, near-invisible neutral washes: enough to
 * stop the page from being a flat white rectangle, not enough to notice.
 *
 * No canvas, no rAF loop, no state — this component renders once.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-wash" />
    </div>
  );
}
