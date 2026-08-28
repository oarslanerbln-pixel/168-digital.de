import { memo } from 'react';
import './ConceptMockup.css';

/**
 * Real mini website mockups (not just typography swatches) for a curated
 * subset of the 50-concept design library — one hand-built CSS composition
 * per concept, reusing that concept's exact theme palette/fonts so it reads
 * as a genuine preview rather than a decorative header.
 */
const ConceptMockup = memo(function ConceptMockup({ theme }: { theme: string }) {
  switch (theme) {
    case 'c01': // Obsidian Editorial — luxury magazine cover
      return (
        <div className="cm cm-c01">
          <span className="cm-rule" />
          <span className="cm-headline">Aesthetic&nbsp;<br />Perfection</span>
          <span className="cm-tag">ISSUE 01 · READ</span>
        </div>
      );

    case 'c02': // Neon Noir — cyberpunk glass hero
      return (
        <div className="cm cm-c02">
          <span className="cm-glow" />
          <span className="cm-headline">SYSTEM//<br />ONLINE</span>
          <span className="cm-glass">
            <span className="cm-dot" />NODE_ACTIVE
          </span>
        </div>
      );

    case 'c09': // Brutalist Punch — raw, hard-edged blocks
      return (
        <div className="cm cm-c09">
          <span className="cm-headline">RAW<br />FORM.</span>
          <span className="cm-block" />
          <span className="cm-tag">NO.09</span>
        </div>
      );

    case 'c30': // Risograph Print — offset duotone misprint
      return (
        <div className="cm cm-c30">
          <span className="cm-circle cm-circle-a" />
          <span className="cm-circle cm-circle-b" />
          <span className="cm-headline">Print<br />Riso</span>
        </div>
      );

    case 'c13': // Terra Organica — organic, earthy blob
      return (
        <div className="cm cm-c13">
          <span className="cm-blob" />
          <span className="cm-headline">Rooted<br />&amp; Real</span>
          <span className="cm-tag">TERRA · 25</span>
        </div>
      );

    case 'c17': // HUD Interface — sci-fi targeting reticle
      return (
        <div className="cm cm-c17">
          <span className="cm-corner cm-corner-tl" />
          <span className="cm-corner cm-corner-tr" />
          <span className="cm-corner cm-corner-bl" />
          <span className="cm-corner cm-corner-br" />
          <span className="cm-headline">TARGET.LOCK</span>
          <span className="cm-bars">
            <i /><i /><i /><i /><i />
          </span>
        </div>
      );

    case 'c38': // Holographic Foil — iridescent premium band
      return (
        <div className="cm cm-c38">
          <span className="cm-foil" />
          <span className="cm-headline cm-headline-foil">Prism</span>
          <span className="cm-card" />
        </div>
      );

    case 'c43': // Zine Culture — cut-paper punk collage
      return (
        <div className="cm cm-c43">
          <span className="cm-scrap cm-scrap-a" />
          <span className="cm-scrap cm-scrap-b" />
          <span className="cm-headline">CUT&amp;<br />PASTE</span>
          <span className="cm-stamp">ISSUE№7</span>
        </div>
      );

    case 'c29': // Memphis Revival — playful 80s geometric pop
      return (
        <div className="cm cm-c29">
          <span className="cm-tri" />
          <span className="cm-ring" />
          <span className="cm-stripes" />
          <span className="cm-headline">Shapes<br />&amp; Joy</span>
          <span className="cm-dot cm-dot-a" />
          <span className="cm-dot cm-dot-b" />
          <span className="cm-dot cm-dot-c" />
        </div>
      );

    case 'c50': // Streaming Dark — content carousel
      return (
        <div className="cm cm-c50">
          <span className="cm-topbar" />
          <span className="cm-headline">Now Playing</span>
          <span className="cm-row">
            <i /><i /><i /><i />
          </span>
        </div>
      );

    default:
      return null;
  }
});

export default ConceptMockup;
