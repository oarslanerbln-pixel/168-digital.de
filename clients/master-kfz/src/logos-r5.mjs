/*
 * Round 5: alternatives for shortlisted families that had fewer than three
 * options (shield outline, isometric, halftone, neon, chrome, stencil).
 */
import { mPoints } from './svg.mjs';
import { T, M, wm, poly, pt, n, shieldPaths, neon, chromeDefs, RED, GOLD, INK, BLK, WHITE, SILV, SANS } from './logos-r4.mjs';

const outlineShield = (stroke, inner, mFill, bg) => {
  const a = shieldPaths(100, 24, 92, 112), b = shieldPaths(100, 31, 78, 98);
  return `<path d="${a.full}" fill="${bg}" stroke="${stroke}" stroke-width="2.2"/><path d="${b.full}" fill="none" stroke="${inner}" stroke-width=".8"/>${M(73, 54, 54, 38, mFill)}`;
};
const cube = (top, left, right, mStroke, wire = false) => {
  const f = (u, v) => [48 + 52 * u, 70 + 30 * u + 60 * v];
  const m = [[0.2, 0.85], [0.2, 0.2], [0.5, 0.6], [0.8, 0.2], [0.8, 0.85]].map(([u, v]) => f(u, v).map(n).join(' ')).join('L');
  const faces = wire
    ? `<path d="M100 40L152 70L100 100L48 70ZM48 70V130L100 160V100M152 70V130L100 160" fill="none" stroke="${top}" stroke-width="2" stroke-linejoin="round"/>`
    : `<path d="M100 40L152 70L100 100L48 70Z" fill="${top}"/><path d="M48 70L100 100V160L48 130Z" fill="${left}"/><path d="M100 100L152 70V130L100 160Z" fill="${right}"/>`;
  return `${faces}<path d="M${m}" fill="none" stroke="${mStroke}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`;
};
const dots = (cx, cy, R, fill, step = 8, skipM = true) => {
  const m = mPoints(cx - R * 0.51, cy - R * 0.44, R * 1.02, R * 0.86);
  const inside = (x, y) => { let c = false; for (let i = 0, j = m.length - 1; i < m.length; j = i++) { const [xi, yi] = m[i], [xj, yj] = m[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
  let out = '';
  for (let y = cy - R; y <= cy + R; y += step) for (let x = cx - R; x <= cx + R; x += step) {
    const d = Math.hypot(x - cx, y - cy);
    if (d < R && !(skipM && inside(x, y))) out += `<circle cx="${n(x)}" cy="${n(y)}" r="${n((1.3 + 2.6 * (1 - d / R)) * step / 8)}" fill="${fill}"/>`;
  }
  return out;
};
const stencil = (x, y, w, h, fill, cut, skew = null) => M(x, y, w, h, fill, skew) + `<path d="M${x - 8} ${n(y + h * 0.28)}H${x + w + 30}M${x - 8} ${n(y + h * 0.6)}H${x + w + 30}" stroke="${cut}" stroke-width="${n(h / 18)}"/>`;

export const LOGO_R5 = [
  { family: 'kontur', name: 'Wappen Kontur Gold', bg: BLK, svg: () => outlineShield(GOLD, GOLD, GOLD, 'none') + wm(168, GOLD, { serif: true, size: 13 }) },
  { family: 'kontur', name: 'Wappen Kontur Hell', bg: WHITE, svg: () => outlineShield(INK, INK, RED, 'none') + T(`MASTER <tspan font-weight="800" fill="${RED}">KFZ</tspan>`, 100, 168, 17, INK, ' font-weight="300" letter-spacing="2"') },
  { family: 'kontur', name: 'Wappen Kontur Signal', bg: BLK, svg: () => outlineShield(RED, WHITE, WHITE, RED) + T('MASTER <tspan font-weight="800">KFZ</tspan>', 100, 168, 17, WHITE, ' font-weight="300" letter-spacing="2"') },
  { family: 'iso', name: 'Isometrie Mono', bg: '#f2f2f2', svg: () => cube(RED, '#2c2c2e', '#111', WHITE) + wm(188, INK, { size: 13, spacing: 3 }) },
  { family: 'iso', name: 'Isometrie Draht', bg: BLK, svg: () => cube(WHITE, '', '', RED, true) + wm(188, WHITE, { size: 13, spacing: 3 }) },
  { family: 'iso', name: 'Isometrie quer', bg: '#121214', svg: () => `<g transform="translate(-26 18) scale(.72)">${cube('#ff4d4f', RED, '#8f0b10', WHITE)}</g>` + T('MASTER', 92, 100, 22, WHITE, ' font-weight="900" letter-spacing="1"', SANS, 'start') + T('KFZ', 92, 124, 22, RED, ' font-weight="900" letter-spacing="1"', SANS, 'start') + T('MEISTERWERKSTATT', 93, 140, 6.5, SILV, ' font-weight="600" letter-spacing="2"', SANS, 'start') },
  { family: 'raster', name: 'Raster Weiß', bg: '#fafafa', svg: () => dots(100, 100, 86, RED) },
  { family: 'raster', name: 'Raster App', bg: '#ececec', svg: () => `<rect x="24" y="24" width="152" height="152" rx="36" fill="${BLK}"/>` + dots(100, 100, 66, RED, 7) },
  { family: 'raster', name: 'Raster quer', bg: BLK, svg: () => dots(52, 100, 38, RED, 5) + T('MASTER', 100, 98, 22, WHITE, ' font-weight="900"', SANS, 'start') + T('KFZ', 100, 122, 22, RED, ' font-weight="900"', SANS, 'start') },
  { family: 'neon', name: 'Neon Ring', bg: '#08060a', svg: (k) => neon(k, `<circle cx="100" cy="90" r="56" stroke="#fff" stroke-width="3.5"/><path d="M72 116V68L100 98L128 68V116" stroke="${RED}" stroke-width="6"/>`, '#fff') },
  { family: 'neon', name: 'Neon Schild', bg: '#08060a', svg: (k) => neon(k, `<path d="${shieldPaths(100, 26, 92, 110).full}" stroke="${RED}" stroke-width="3.5"/><path d="M76 108V64L100 92L124 64V108" stroke="#fff" stroke-width="5.5"/>`, '#fff') },
  { family: 'neon', name: 'Neon Schriftzug', bg: '#08060a', svg: (k) => neon(k, `<path d="M30 132H170" stroke="${RED}" stroke-width="4"/><path d="M56 112V60L100 100L144 60V112" stroke="#fff" stroke-width="5.5"/>`, RED) },
  { family: 'chrom', name: 'Chrom auf Schwarz', bg: BLK, svg: (k) => chromeDefs(k) + `<path d="${poly(mPoints(46, 50, 116, 88, 138))}" fill="${RED}" transform="translate(6 6)"/><path d="${poly(mPoints(46, 50, 116, 88, 138))}" fill="url(#${k}c)"/>` + T('MASTER KFZ', 100, 180, 16, `url(#${k}c)`, ' font-weight="900" font-style="italic" letter-spacing="1"') },
  { family: 'chrom', name: 'Chrom-Plakette', bg: '#1a1a1c', svg: (k) => chromeDefs(k) + `<circle cx="100" cy="90" r="62" fill="url(#${k}c)"/><circle cx="100" cy="90" r="52" fill="${RED}"/>` + M(72, 70, 56, 40, WHITE) + T('MASTER KFZ', 100, 184, 15, `url(#${k}c)`, ' font-weight="900" letter-spacing="2"') },
  { family: 'chrom', name: 'Chrom quer', bg: RED, svg: (k) => chromeDefs(k) + `<path d="${poly(mPoints(18, 74, 66, 50, 124))}" fill="url(#${k}c)"/>` + T('MASTER', 96, 100, 24, WHITE, ' font-weight="900" font-style="italic"', SANS, 'start') + T('KFZ', 96, 124, 24, `url(#${k}c)`, ' font-weight="900" font-style="italic"', SANS, 'start') },
  { family: 'stencil', name: 'Schablone Creme', bg: '#efe8d8', svg: () => stencil(42, 46, 116, 90, RED, '#efe8d8') + T('MASTER KFZ', 100, 168, 16, INK, ' font-weight="800" letter-spacing="5"') },
  { family: 'stencil', name: 'Schablone Kiste', bg: '#1d1f1c', svg: () => `<rect x="22" y="30" width="156" height="140" fill="none" stroke="#c9c2a5" stroke-width="3" stroke-dasharray="14 5"/>` + stencil(50, 50, 100, 74, '#c9c2a5', '#1d1f1c') + T('MASTER · KFZ', 100, 156, 13, RED, ' font-weight="800" letter-spacing="5"') },
  { family: 'stencil', name: 'Schablone Tempo', bg: BLK, svg: () => stencil(44, 50, 112, 86, RED, BLK, 136) + [[64, 30], [82, 22], [100, 14]].map(([y, l]) => `<path d="M${36 - l} ${y}H32" stroke="${SILV}" stroke-width="6"/>`).join('') + T('MASTER KFZ', 100, 170, 16, WHITE, ' font-weight="800" font-style="italic" letter-spacing="2"') },
];
export const r5Svg = (l, i, cls = 'l3') => `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="${l.name}">${l.svg(`r5v${i}`)}</svg>`;
