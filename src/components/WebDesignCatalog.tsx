import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { webDesignConcepts } from '../data/webDesignConcepts';
import ConceptMockup from './ConceptMockup';
import './WebDesignCatalog.css';

// A curated subset of the 50 concepts gets a real hand-built mini mockup
// (distinct layout, not just a typography swatch) instead of plain text —
// see ConceptMockup.tsx for the compositions.
const MOCKUP_THEMES = new Set(['c01', 'c02', 'c09', 'c13', 'c17', 'c29', 'c30', 'c38', 'c43', 'c50']);

/* The catalog demos 37 decorative typefaces. Rather than block first paint by
   loading them in <head> for every visitor, we inject the Google Fonts stylesheet
   once, on demand, when the gallery approaches the viewport. */
const CATALOG_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Sora:wght@300;400;500&family=Syne:wght@700;800&family=Bebas+Neue&family=Lora:ital@0;1&family=Libre+Baskerville:ital@0;1&family=Caveat:wght@400;600&family=Fraunces:ital,wght@0,400;1,300&family=Jost:wght@300;400&family=Noto+Serif+JP:wght@300;400&family=Noto+Sans+JP:wght@300&family=Amiri:wght@400;700&family=Share+Tech+Mono&family=Orbitron:wght@400;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400&family=Instrument+Sans:wght@300;400&family=Courier+Prime:wght@400;700&family=Plus+Jakarta+Sans:wght@700;800&family=Figtree:wght@400;600;900&family=Bodoni+Moda:ital,wght@1,400&family=Cinzel:wght@700&family=Josefin+Sans:wght@300;400;600&family=Unbounded:wght@400;700&family=Anton&family=Oswald:wght@600&family=Spectral:ital,wght@0,300;1,300&family=Righteous&family=Pacifico&family=Staatliches&family=Big+Shoulders+Display:wght@900&family=Yeseva+One&family=Abril+Fatface&family=VT323&family=Press+Start+2P&display=swap';

function loadCatalogFonts() {
  if (document.getElementById('catalog-fonts')) return;
  const link = document.createElement('link');
  link.id = 'catalog-fonts';
  link.rel = 'stylesheet';
  link.href = CATALOG_FONTS_HREF;
  document.head.appendChild(link);
}

export default function WebDesignCatalog() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Lazy-load the decorative fonts only when the gallery nears the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          loadCatalogFonts();
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Show 8 initially
  const displayedConcepts = isExpanded ? webDesignConcepts : webDesignConcepts.slice(0, 8);

  return (
    <section ref={sectionRef} className="web-design-catalog-container">
      {/* Tailwind is not installed in this project, so the utility classes
          that used to be here (max-w-[1300px] mx-auto px-6) were inert —
          the catalog had no max width and no side padding, which is what
          let its mobile carousel's negative margin overhang the screen.
          .wd-wrap is the real stylesheet equivalent. */}
      <div className="wd-wrap">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="services-overline">DESIGN LIBRARY</span>
          {/* "Concepts" used to be an italic outline (-webkit-text-stroke in
              bronze) that read as a different, scrappier typeface next to
              the solid words beside it. It is now simply the same heading
              in the muted ink, which sets it apart without shouting. */}
          <h2 className="services-title">
            50 Premium Web <em className="wd-title-em">Concepts</em>
          </h2>
          <p className="services-subtitle">
            A curated collection of highly aesthetic, conversion-optimized design archetypes crafted for forward-thinking brands.
          </p>
        </motion.div>

        <motion.div layout className="wd-grid">
          <AnimatePresence>
            {displayedConcepts.map((concept, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: isExpanded ? (i % 8) * 0.05 : 0 }}
                key={concept.id}
                className={`card ${concept.theme}${MOCKUP_THEMES.has(concept.theme) ? ' has-mockup' : ''}`}
              >
                {MOCKUP_THEMES.has(concept.theme) && <ConceptMockup theme={concept.theme} />}
                <div className="cn">{concept.category}</div>
                <div className="ct">{concept.title}</div>
                <div className="div"></div>
                <div className="cd">{concept.description}</div>
                <div className="meta">
                  {concept.tags.map(tag => (
                    <div key={tag} className="pill">{tag}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {!isExpanded && (
          <div className="wd-explore-wrap">
            {/* Smooth gradient mask to fade out the grid gracefully */}
            <div className="wd-fade-mask" />
            
            {/* Premium Button */}
            <button
              onClick={() => setIsExpanded(true)}
              className="wd-explore-btn"
            >
              <span>Explore All Concepts</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
