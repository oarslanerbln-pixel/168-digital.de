import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTvMenuDemo } from '../data/tvMenuDemo';
import './TvMenuDemo.css';

/* ════════════════════════════════════════════════════════════════
   TV MENU-BOARD DEMO — the product itself, not a video of it.

   A café owner deciding on menu boards wants to see what the screen
   above their counter would do. A rendered clip would cost megabytes on
   a phone connection and could not be translated; this is the real
   thing in ~3 kB: three scenes on an 18s CSS cycle (coffee list with a
   live price change, drink of the day, breakfast offer).

   All motion is CSS (transform/opacity). The cycle only runs while the
   screen is on-screen: an IntersectionObserver sets data-playing, and
   CSS pauses every animation otherwise, so nothing ticks in the
   background. Reduced-motion visitors get the first scene, still.
   ════════════════════════════════════════════════════════════════ */
export default function TvMenuDemo() {
  const { i18n } = useTranslation();
  const c = getTvMenuDemo(i18n.language);
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure className="tvdemo">
      <span className="service-overline">{c.overline}</span>
      <h2 className="service-section-heading tvdemo-heading">{c.heading}</h2>

      <div className="tvdemo-tv" ref={ref} data-playing={playing}>
        <div className="tvdemo-screen" role="img" aria-label={c.ariaLabel}>
          <div className="tvdemo-brand" aria-hidden="true">
            <span className="tvdemo-brand-dot" />
            {c.cafe}
          </div>

          {/* Scene 1 — the menu, and the moment a price changes. */}
          <div className="tvdemo-scene tvdemo-scene-1" aria-hidden="true">
            <h3 className="tvdemo-title">{c.scene1.title}</h3>
            <ul className="tvdemo-list">
              {c.scene1.items.map((item, i) => (
                <li key={item.name} className="tvdemo-row" style={{ '--i': i } as React.CSSProperties}>
                  <span className="tvdemo-row-name">
                    {item.name}
                    <small>{item.note}</small>
                  </span>
                  <span className="tvdemo-row-dots" />
                  {i === c.scene1.items.length - 1 ? (
                    <span className="tvdemo-price tvdemo-price-swap">
                      <span className="tvdemo-price-old">{c.scene1.oldPrice}</span>
                      <span className="tvdemo-price-new">{item.price}</span>
                    </span>
                  ) : (
                    <span className="tvdemo-price">{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            <span className="tvdemo-toast">{c.scene1.updated}</span>
          </div>

          {/* Scene 2 — one drink, large. The cup is drawn in CSS. */}
          <div className="tvdemo-scene tvdemo-scene-2" aria-hidden="true">
            <div className="tvdemo-cup">
              <span className="tvdemo-steam" />
              <span className="tvdemo-steam" />
              <span className="tvdemo-steam" />
              <span className="tvdemo-cup-body" />
              <span className="tvdemo-cup-handle" />
              <span className="tvdemo-cup-plate" />
            </div>
            <div className="tvdemo-feature">
              <span className="tvdemo-badge">{c.scene2.badge}</span>
              <h3 className="tvdemo-feature-name">{c.scene2.name}</h3>
              <p className="tvdemo-feature-desc">{c.scene2.desc}</p>
              <span className="tvdemo-feature-price">{c.scene2.price}</span>
            </div>
          </div>

          {/* Scene 3 — a bundle with a time window. */}
          <div className="tvdemo-scene tvdemo-scene-3" aria-hidden="true">
            <h3 className="tvdemo-title">
              {c.scene3.title} <em>{c.scene3.until}</em>
            </h3>
            <ul className="tvdemo-combo">
              {c.scene3.items.map((item, i) => (
                <li key={item.name} style={{ '--i': i } as React.CSSProperties}>
                  {item.name}
                </li>
              ))}
            </ul>
            <span className="tvdemo-combo-price">{c.scene3.price}</span>
          </div>

          {/* Progress ticks: which of the three scenes is on air. */}
          <div className="tvdemo-ticks" aria-hidden="true">
            <span /><span /><span />
          </div>
        </div>
        <div className="tvdemo-stand" aria-hidden="true" />
      </div>

      <figcaption className="tvdemo-caption">{c.caption}</figcaption>
    </figure>
  );
}
