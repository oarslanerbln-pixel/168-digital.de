/*
 * Round 6: refinements requested on the shortlist PDF.
 * The shield family gets a "real badge" treatment — metal rim, enamel field,
 * embossed M and a gloss highlight — built from gradients only, so it stays
 * vector and prints sharp. Swiss Typo and Origami get three more options,
 * every other family one more.
 */
import { mPoints } from './svg.mjs';
import { T, M, poly, shieldPaths, neon, chromeDefs, RED, GOLD, CREAM, NAVY, INK, BLK, WHITE, SILV, SANS } from './logos-r4.mjs';

const lin = (id, stops, x2 = 1, y2 = 1) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
const rad = (id, stops) => `<radialGradient id="${id}" cx=".38" cy=".3" r=".85">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</radialGradient>`;
const METAL = {
  chrome: [[0, '#ffffff'], [0.22, '#9ea3a8'], [0.45, '#eef0f2'], [0.62, '#5d6268'], [0.8, '#d4d7db'], [1, '#7c8187']],
  gold: [[0, '#fff3c4'], [0.25, '#b8902f'], [0.45, '#f6e7a1'], [0.65, '#7a5c17'], [0.85, '#d9b95b'], [1, '#8a6a1f']],
};
const ENAMEL = {
  red: [[0, '#ff5a5f'], [0.45, '#d3141b'], [1, '#6e070b']],
  black: [[0, '#3a3a3e'], [0.5, '#141416'], [1, '#030303']],
  navy: [[0, '#3b5a99'], [0.5, '#16264a'], [1, '#070d1c']],
  silver: [[0, '#ffffff'], [0.5, '#c9ccd1'], [1, '#7d8288']],
};

/* A badge-quality shield: shadow, metal rim, groove, enamel field, gloss, embossed M. */
function realShield(k, { rim = 'chrome', field = 'red', mMetal = 'chrome', split = null, carbon = false, star = null, top = 18, h = 124, w = 104 }) {
  const cx = 100;
  const outer = shieldPaths(cx, top, w, h), groove = shieldPaths(cx, top + 6, w - 12, h - 12), inner = shieldPaths(cx, top + 9, w - 18, h - 18);
  const mp = poly(mPoints(cx - w * 0.27, top + h * 0.3, w * 0.54, h * 0.32));
  const defs = `<defs>${lin(`${k}rim`, METAL[rim])}${lin(`${k}m`, METAL[mMetal], 0.4, 1)}${rad(`${k}f`, ENAMEL[field])}${split ? rad(`${k}f2`, ENAMEL[split]) : ''}
<linearGradient id="${k}gl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<clipPath id="${k}c"><path d="${inner.full}"/></clipPath>${split ? `<clipPath id="${k}l"><path d="${inner.left}"/></clipPath><clipPath id="${k}r"><path d="${inner.right}"/></clipPath>` : ''}
${carbon ? `<pattern id="${k}cb" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#141416"/><rect width="3" height="6" fill="#222226"/></pattern>` : ''}
<filter id="${k}sh" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter></defs>`;
  const fieldFill = carbon ? `<path d="${inner.full}" fill="url(#${k}cb)"/><path d="${inner.full}" fill="url(#${k}f)" opacity=".35"/>` : split
    ? `<path d="${inner.left}" fill="url(#${k}f)"/><path d="${inner.right}" fill="url(#${k}f2)"/>`
    : `<path d="${inner.full}" fill="url(#${k}f)"/>`;
  const mLayer = split
    ? `<path d="${mp}" fill="url(#${k}f2)" clip-path="url(#${k}l)"/><path d="${mp}" fill="url(#${k}f)" clip-path="url(#${k}r)"/><path d="${mp}" fill="none" stroke="url(#${k}m)" stroke-width="1.6"/>`
    : `<path d="${mp}" fill="rgba(0,0,0,.45)" transform="translate(1.5 2.5)"/><path d="${mp}" fill="url(#${k}m)"/><path d="${mp}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width=".7"/>`;
  return `${defs}<path d="${outer.full}" fill="#000" opacity=".55" transform="translate(0 5)" filter="url(#${k}sh)"/>
<path d="${outer.full}" fill="url(#${k}rim)"/><path d="${groove.full}" fill="#0a0a0b"/>${fieldFill}
<g clip-path="url(#${k}c)"><ellipse cx="${cx - 18}" cy="${top + 18}" rx="${w * 0.62}" ry="${h * 0.34}" fill="url(#${k}gl)" transform="rotate(-18 ${cx} ${top + 30})"/></g>
${star ? `<path d="${poly(Array.from({ length: 10 }, (_, i) => { const a = ((-90 + i * 36) * Math.PI) / 180, r = i % 2 ? 2.6 : 6.2; return [cx + r * Math.cos(a), top + 26 + r * Math.sin(a)]; }))}" fill="url(#${k}m)"/>` : ''}${mLayer}`;
}

const wordmark = (y, color, sub, subColor) => T('MASTER KFZ', 100, y, 15, color, ' font-weight="800" letter-spacing="4"') + (sub ? T(sub, 100, y + 13, 6.6, subColor, ' font-weight="600" letter-spacing="2.4"') : '');
const origamiM = (a, b, c, d, dx = 0, dy = 0, s = 1) => `<g transform="translate(${dx} ${dy}) scale(${s})"><path d="M40 56L64 68V146H40Z" fill="${a}"/><path d="M40 56L100 114V138L64 100V68Z" fill="${b}"/><path d="M160 56L100 114V138L136 100V68Z" fill="${c}"/><path d="M160 56L136 68V146H160Z" fill="${d}"/></g>`;

export const LOGO_R6 = [
  /* ---- Wappen: realistic badges ---- */
  { family: 'wappen', name: 'Wappen Emaille Chrom', bg: BLK, svg: (k) => realShield(k, {}) + wordmark(170, '#d9dce0', 'KFZ-MEISTERWERKSTATT', '#8e9398') },
  { family: 'wappen', name: 'Wappen Gold geprägt', bg: '#0e0e0e', svg: (k) => realShield(k, { rim: 'gold', field: 'black', mMetal: 'gold' }) + wordmark(170, '#d9b95b', 'BERLIN · NEUKÖLLN', '#8a6a1f') },
  { family: 'wappen', name: 'Wappen Carbon', bg: '#121214', svg: (k) => realShield(k, { carbon: true, field: 'red', mMetal: 'chrome' }) + wordmark(170, WHITE, 'MEISTERBETRIEB', RED) },
  { family: 'wappen', name: 'Wappen geteilt 3D', bg: BLK, svg: (k) => realShield(k, { field: 'red', split: 'silver' }) + wordmark(170, WHITE, 'KFZ-MEISTERWERKSTATT', SILV) },
  { family: 'wappen', name: 'Wappen Marine Heritage', bg: CREAM, svg: (k) => realShield(k, { rim: 'gold', field: 'navy', mMetal: 'chrome', star: true }) + wordmark(170, NAVY, 'MEISTERBETRIEB · BERLIN', '#8a6a1f') },
  /* ---- Swiss Typo: three more ---- */
  { family: 'swiss', name: 'Swiss Rot', bg: RED, svg: () => T('Master<tspan fill="#111">.</tspan>', 100, 108, 50, '#fff', ' font-weight="800" letter-spacing="-2.5"') + T('KFZ-MEISTERWERKSTATT BERLIN', 100, 132, 8.5, 'rgba(255,255,255,.75)', ' font-weight="600" letter-spacing="2.2"') },
  { family: 'swiss', name: 'Swiss Raster', bg: '#fff', svg: () => `${[40, 80, 120, 160].map((x) => `<path d="M${x} 20V180" stroke="#ececec"/>`).join('')}${[60, 140].map((y) => `<path d="M20 ${y}H180" stroke="#ececec"/>`).join('')}` + T('MASTER', 28, 104, 34, INK, ' font-weight="900" letter-spacing="-1.5"', SANS, 'start') + T('KFZ', 28, 136, 34, RED, ' font-weight="900" letter-spacing="-1.5"', SANS, 'start') + `<rect x="28" y="148" width="40" height="3" fill="${INK}"/>` + T('Neukölln · 12059', 172, 176, 7.5, '#6e6e73', ' font-weight="600" letter-spacing="1"', SANS, 'end') },
  { family: 'swiss', name: 'Swiss Monogramm', bg: '#f5f5f7', svg: () => `<rect x="54" y="34" width="92" height="92" fill="${INK}"/>` + T(`M<tspan fill="${RED}">.</tspan>`, 104, 106, 64, '#fff', ' font-weight="800" letter-spacing="-3"') + T('Master KFZ', 100, 156, 15, INK, ' font-weight="700" letter-spacing="-.3"') + T('MEISTERWERKSTATT', 100, 172, 6.8, '#6e6e73', ' font-weight="600" letter-spacing="2.4"') },
  /* ---- Origami: three more ---- */
  { family: 'origami', name: 'Origami Kupfer', bg: BLK, svg: () => origamiM('#7a3f1d', '#b5652e', '#e09a5f', '#5a2e14') + T('MASTER KFZ', 100, 180, 14, '#e09a5f', ' font-weight="800" letter-spacing="3"') },
  { family: 'origami', name: 'Origami Ring', bg: '#fff', svg: () => `<circle cx="100" cy="96" r="70" fill="none" stroke="${RED}" stroke-width="2"/>` + origamiM('#b3121a', RED, '#ff4d4f', '#8f0b10', 32, 25, 0.68) + T('MASTER KFZ', 100, 186, 12, INK, ' font-weight="800" letter-spacing="4"') },
  { family: 'origami', name: 'Origami Schatten', bg: '#f2f0ea', svg: () => `<path d="M40 56L160 56L184 80V170H64L40 146Z" fill="#e2ded4"/>` + origamiM('#b3121a', RED, '#ff4d4f', '#8f0b10') + T('MASTER KFZ', 100, 182, 14, INK, ' font-weight="800" letter-spacing="3"') },
  /* ---- One more for each remaining family ---- */
  { family: 'iso', name: 'Isometrie Marine', bg: '#f4f1ea', svg: () => { const f = (u, v) => [48 + 52 * u, 70 + 30 * u + 60 * v]; const m = [[0.2, 0.85], [0.2, 0.2], [0.5, 0.6], [0.8, 0.2], [0.8, 0.85]].map(([u, v]) => f(u, v).map((x) => +x.toFixed(2)).join(' ')).join('L'); return `<path d="M100 40L152 70L100 100L48 70Z" fill="#3b5a99"/><path d="M48 70L100 100V160L48 130Z" fill="${NAVY}"/><path d="M100 100L152 70V130L100 160Z" fill="#0a1328"/><path d="M${m}" fill="none" stroke="${RED}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>${T('MASTER KFZ', 100, 188, 13, NAVY, ' font-weight="800" letter-spacing="3"')}`; } },
  { family: 'raster', name: 'Raster Gold', bg: BLK, svg: () => { const m = mPoints(56, 62, 88, 74); const inside = (x, y) => { let c = false; for (let i = 0, j = m.length - 1; i < m.length; j = i++) { const [xi, yi] = m[i], [xj, yj] = m[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; }; let o = ''; for (let y = 12; y <= 188; y += 8) for (let x = 12; x <= 188; x += 8) { const d = Math.hypot(x - 100, y - 100); if (d < 86 && !inside(x, y)) o += `<circle cx="${x}" cy="${y}" r="${(1.3 + 2.6 * (1 - d / 86)).toFixed(2)}" fill="${GOLD}"/>`; } return o; } },
  { family: 'neon', name: 'Neon Blau', bg: '#05070d', svg: (k) => neon(k, `<path d="M58 136V64L100 110L142 64V136" stroke="#38bdf8" stroke-width="6"/><path d="M22 82H44M28 98H44M34 114H44" stroke="${RED}" stroke-width="4.5"/>`, '#e0f2fe') },
  { family: 'chrom', name: 'Chrom-Emblem', bg: '#0b0b0c', svg: (k) => chromeDefs(k) + `<rect x="30" y="44" width="140" height="92" rx="16" fill="url(#${k}c)"/><rect x="38" y="52" width="124" height="76" rx="11" fill="${RED}"/>` + M(68, 66, 64, 46, WHITE) + T('MASTER KFZ', 100, 166, 15, `url(#${k}c)`, ' font-weight="900" font-style="italic" letter-spacing="2"') },
  { family: 'stencil', name: 'Schablone Signal', bg: '#f2c12e', svg: (k) => `<defs><pattern id="${k}w" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="${INK}"/></pattern></defs><rect x="0" y="0" width="200" height="22" fill="url(#${k}w)"/><rect x="0" y="178" width="200" height="22" fill="url(#${k}w)"/>` + M(46, 52, 108, 82, INK) + `<path d="M38 77H170M38 106H170" stroke="#f2c12e" stroke-width="4.5"/>` + T('MASTER KFZ', 100, 160, 14, INK, ' font-weight="900" letter-spacing="5"') },
];

export const r6Svg = (l, i, cls = 'l3') => `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="${l.name}">${l.svg(`r6v${i}`)}</svg>`;
