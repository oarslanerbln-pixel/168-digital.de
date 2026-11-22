/* ════════════════════════════════════════════════════════════════
   SERVICE GLYPHS — one sign per service, built from the pieces of the
   golden spiral: squares, quarter circles, Fibonacci proportions.

   "Phi" visual language (Nov 2026). The homepage service tiles lead with
   these instead of photos: six photos in a row read as a stock grid,
   six signs read as one studio's alphabet, and they cost no request.
   Colours come from CSS classes (.g-ink / .g-saffron / .g-terra /
   .g-line), so a tile can invert on hover by changing one custom
   property instead of every fill. Decorative: the tile's title names the
   service, hence aria-hidden.
   ════════════════════════════════════════════════════════════════ */

const glyphs: Record<string, JSX.Element> = {
  // Web: a square opened by a quarter circle — screen and the ratio.
  'web-saas-development': (
    <>
      <rect className="g-ink" x="0" y="0" width="56" height="56" />
      <path className="g-saffron" d="M0,56 A56,56 0 0 1 56,0 L56,56Z" />
    </>
  ),
  // Menus: a board divided in Fibonacci panels.
  'digital-menus': (
    <>
      <rect className="g-ink" x="0" y="0" width="34" height="34" />
      <rect className="g-saffron" x="34" y="0" width="22" height="22" />
      <rect className="g-terra" x="34" y="22" width="22" height="34" />
      <rect className="g-line" x="1" y="35" width="32" height="20" />
    </>
  ),
  // Event & wedding films: a lens — rings around a point.
  'wedding-event-films': (
    <>
      <circle className="g-line" cx="28" cy="28" r="27" />
      <circle className="g-saffron" cx="28" cy="28" r="14" />
      <circle className="g-ink" cx="28" cy="28" r="5" />
    </>
  ),
  // Video & drone: a peak with the sun rising behind it.
  'video-drone-production': (
    <>
      <path className="g-ink" d="M0,56 L28,0 L56,56Z" />
      <path className="g-saffron" d="M14,56 A14,14 0 0 1 42,56Z" />
    </>
  ),
  // Social: a phone between a square and a circle.
  'social-media-marketing': (
    <>
      <rect className="g-ink" x="16" y="0" width="24" height="56" rx="6" />
      <circle className="g-terra" cx="44" cy="12" r="12" />
      <rect className="g-saffron" x="0" y="40" width="16" height="16" />
    </>
  ),
  // Travel: two arcs of a route and the destination.
  'travel-films-journals': (
    <>
      <path className="g-line g-line-thick" d="M1.5,56 A54.5,54.5 0 0 1 56,1.5" />
      <path className="g-line g-line-thick g-line-saffron" d="M1.5,56 A32.5,32.5 0 0 1 34,23.5" />
      <circle className="g-ink" cx="50" cy="6" r="6" />
    </>
  ),
};

export default function ServiceGlyph({ slug, size = 56 }: { slug: string; size?: number }) {
  const glyph = glyphs[slug];
  if (!glyph) return null;
  return (
    <svg className="svc-glyph" width={size} height={size} viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      {glyph}
    </svg>
  );
}
