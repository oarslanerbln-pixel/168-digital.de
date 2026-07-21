/* Golden ratio (φ = 1.618) logarithmic spiral as an SVG path.
   Built in a 1-unit-per-pixel space and centered on its own bounding box,
   so an SVG stroke and a CSS offset-path can share identical geometry.
   Shared by the intro Preloader and the Hero emblem. */
export function buildGoldenSpiral(
  size = 360,
  maxR = 150,
  turns = 3.75,
  steps = 260
): string {
  const PHI = 1.618;
  const C = size / 2;
  const b = Math.log(PHI) / (Math.PI / 2); // radius ×φ every quarter turn
  const thetaEnd = turns * Math.PI;
  const r0 = maxR / Math.exp(b * thetaEnd);

  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * thetaEnd;
    const r = r0 * Math.exp(b * t);
    const a = t - Math.PI / 2;
    pts.push([C + r * Math.cos(a), C + r * Math.sin(a)]);
  }

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) {
    minX = Math.min(minX, x); minY = Math.min(minY, y);
    maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
  }
  const dx = C - (minX + maxX) / 2;
  const dy = C - (minY + maxY) / 2;

  let d = '';
  pts.forEach(([x, y], i) => {
    const X = (x + dx).toFixed(2);
    const Y = (y + dy).toFixed(2);
    d += i === 0 ? `M ${X} ${Y}` : ` L ${X} ${Y}`;
  });
  return d;
}
