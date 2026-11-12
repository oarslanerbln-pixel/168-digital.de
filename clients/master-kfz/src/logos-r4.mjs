/*
 * Round 4: 50 refinements of the client's shortlist — #27 (split shield),
 * #28 (winged M) and the style directions S01–S24 except S03–S05.
 * Parametric families keep every variant consistent: one geometry, many
 * premium treatments (heritage, gold, monochrome, lockups).
 */
import { mPoints } from './svg.mjs';

const n = (v) => +v.toFixed(2);
const poly = (pts) => 'M' + pts.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') + 'Z';
const SANS = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
const SERIF = "Didot,'Bodoni 72',Georgia,'Times New Roman',serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const T = (str, x, y, size, fill, extra = '', font = SANS, anchor = 'middle') =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="${font}" text-anchor="${anchor}"${extra}>${str}</text>`;
const pt = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const star = (cx, cy, r, fill) => `<path d="${poly(Array.from({ length: 10 }, (_, i) => pt(cx, cy, i % 2 ? r * 0.42 : r, -90 + i * 36)))}" fill="${fill}"/>`;
const M = (x, y, w, h, fill, skew = null, extra = '') => `<path d="${poly(mPoints(x, y, w, h, skew))}" fill="${fill}"${extra}/>`;

const RED = '#e3141c', GOLD = '#c9a646', CREAM = '#efe4cc', NAVY = '#14213d', SILV = '#c7c7cc', INK = '#111', BLK = '#0b0b0c', BORD = '#7a0f30', WHITE = '#f5f5f7';

/* Wordmark lockup under a mark. */
const wm = (y, color, { size = 16, sub = '', subColor = color, serif = false, spacing = 2, weight = 800 } = {}) =>
  T('MASTER KFZ', 100, y, size, color, ` font-weight="${serif ? 400 : weight}" letter-spacing="${serif ? 6 : spacing}"`, serif ? SERIF : SANS) +
  (sub ? T(sub, 100, y + 14, 7, subColor, ' font-weight="600" letter-spacing="2.4"') : '');

/* ---------- Family: split shield (#27) ---------- */
function shieldPaths(cx, top, w, h) {
  const hw = w / 2, a = top + h * 0.48, b = top + h * 0.74, c = top + h * 0.92, bot = top + h;
  const half = (s) => `M${cx} ${top}H${cx + s * hw}V${a}C${cx + s * hw} ${b} ${cx + s * hw * 0.55} ${c} ${cx} ${bot}Z`;
  return { left: half(-1), right: half(1), full: `M${cx - hw} ${top}H${cx + hw}V${a}C${cx + hw} ${b} ${cx + hw * 0.55} ${c} ${cx} ${bot}C${cx - hw * 0.55} ${c} ${cx - hw} ${b} ${cx - hw} ${a}Z` };
}
function shield(id, { cx = 100, top = 24, w = 92, h = 112, left = RED, right = SILV, m = 'invert', outline = null }) {
  const s = shieldPaths(cx, top, w, h);
  const mp = poly(mPoints(cx - w * 0.29, top + h * 0.25, w * 0.58, h * 0.34));
  let out = `<path d="${s.left}" fill="${left}"/><path d="${s.right}" fill="${right}"/>`;
  if (m === 'invert') {
    out += `<defs><clipPath id="${id}l"><path d="${s.left}"/></clipPath><clipPath id="${id}r"><path d="${s.right}"/></clipPath></defs>
<path d="${mp}" fill="${right}" clip-path="url(#${id}l)"/><path d="${mp}" fill="${left}" clip-path="url(#${id}r)"/>`;
  } else if (m) out += `<path d="${mp}" fill="${m}"/>`;
  if (outline) out += `<path d="${s.full}" fill="none" stroke="${outline}" stroke-width="2.4"/>`;
  return out;
}

/* ---------- Family: wings (#28) ---------- */
function wings({ cx = 100, cy = 70, inner = 26, count = 4, len = 58, step = 11, th = 7, color = SILV, lift = 6, side = 'both', stroke = 0 }) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const y = cy + i * step, l = len - i * (len / (count + 1.4));
    for (const s of side === 'both' ? [-1, 1] : side === 'left' ? [-1] : [1]) {
      const x0 = cx + s * inner, x1 = x0 + s * l;
      const pts = [[x0, y], [x1, y - lift], [x1 - s * 6, y + th * 0.5], [x0, y + th]];
      out += stroke ? `<path d="M${n(x0)} ${y}L${n(x1)} ${y - lift}" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"/>` : `<path d="${poly(pts)}" fill="${color}"/>`;
    }
  }
  return out;
}

/* ---------- Family: ring badge (S01) ---------- */
function badge(id, { bg, ring, text, m, top = 'MASTER KFZ', bottom = 'MEISTERBETRIEB · BERLIN', band = false, dotted = false, extra = '' }) {
  return `<defs><path id="${id}t" d="M${band ? 28 : 34} 100A${band ? 72 : 66} ${band ? 72 : 66} 0 0 1 ${band ? 172 : 166} 100"/><path id="${id}b" d="M${band ? 21 : 24} 100A${band ? 79 : 76} ${band ? 79 : 76} 0 0 0 ${band ? 179 : 176} 100"/></defs>
${band ? `<circle cx="100" cy="100" r="76" fill="none" stroke="${ring}" stroke-width="24"/>` : `<circle cx="100" cy="100" r="88" fill="none" stroke="${ring}" stroke-width="3"/><circle cx="100" cy="100" r="80" fill="none" stroke="${ring}" stroke-width="1.2"${dotted ? ' stroke-dasharray="1 3"' : ''}/>`}
<text font-size="14" font-weight="800" letter-spacing="3" fill="${text}" font-family="${SANS}"><textPath href="#${id}t" startOffset="50%" text-anchor="middle">${top}</textPath></text>
<text font-size="8.5" font-weight="700" letter-spacing="2.4" fill="${text}" font-family="${SANS}"><textPath href="#${id}b" startOffset="50%" text-anchor="middle">${bottom}</textPath></text>
${star(band ? 24 : 31, 100, 4, text)}${star(band ? 176 : 169, 100, 4, text)}${extra}${M(72, 80, 56, 40, m)}`;
}

const roundel51 = ({ ring, fill, num, word, sub }) =>
  `<circle cx="100" cy="92" r="56" fill="${fill}" stroke="${ring}" stroke-width="6"/>${T('51', 100, 118, 70, num, ' font-weight="900" font-style="italic" letter-spacing="-4"')}${wm(178, word, { size: 17, sub, subColor: word })}`;

const halftone = (fill) => {
  const m = mPoints(56, 62, 88, 74);
  const inside = (x, y) => {
    let c = false;
    for (let i = 0, j = m.length - 1; i < m.length; j = i++) {
      const [xi, yi] = m[i], [xj, yj] = m[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  };
  let out = '';
  for (let y = 12; y <= 188; y += 8) for (let x = 12; x <= 188; x += 8) {
    const d = Math.hypot(x - 100, y - 100);
    if (d < 86 && !inside(x, y)) out += `<circle cx="${x}" cy="${y}" r="${n(1.3 + 2.6 * (1 - d / 86))}" fill="${fill}"/>`;
  }
  return out;
};

const origami = (a, b, c, d, text) => `<path d="M40 56L64 68V146H40Z" fill="${a}"/><path d="M40 56L100 114V138L64 100V68Z" fill="${b}"/><path d="M160 56L100 114V138L136 100V68Z" fill="${c}"/><path d="M160 56L136 68V146H160Z" fill="${d}"/>${wm(180, text, { size: 14, spacing: 3 })}`;

const neon = (id, a, b, word) => `<defs><filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`
  + `<g filter="url(#${id})" fill="none" stroke-linecap="round" stroke-linejoin="round">${a}</g><g filter="url(#${id})">${T('MASTER KFZ', 100, 178, 15, b, ' font-weight="700" letter-spacing="4"')}</g>${word || ''}`;

const enamel = ({ shape = 'rect', base, frame, title, sub }) =>
  (shape === 'oval'
    ? `<ellipse cx="100" cy="100" rx="86" ry="56" fill="${base}" stroke="${frame}" stroke-width="6"/><ellipse cx="100" cy="100" rx="76" ry="46" fill="none" stroke="${frame}" stroke-width="1.4"/>`
    : `<rect x="18" y="52" width="164" height="96" rx="14" fill="${base}" stroke="${frame}" stroke-width="6"/><rect x="28" y="62" width="144" height="76" rx="8" fill="none" stroke="${frame}" stroke-width="1.5"/>${[[32, 66], [168, 66], [32, 134], [168, 134]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#8a8a8a"/>`).join('')}`)
  + T('MASTER KFZ', 100, 104, 20, title, ' font-weight="900"') + T('KFZ-MEISTERWERKSTATT', 100, 121, 7.2, sub, ' font-weight="700" letter-spacing="2"');

const chromeDefs = (id) => `<defs><linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".46" stop-color="#a3a8ad"/><stop offset=".5" stop-color="#3c3f44"/><stop offset="1" stop-color="#dcdfe3"/></linearGradient></defs>`;

const bodoni = (fill, accent) => `<g fill="${fill}"><rect x="52" y="50" width="5" height="92"/><path d="M52 50H72L106 132L100 144Z"/><path d="M143 50H149L103 144H100Z"/><rect x="132" y="50" width="18" height="92"/><rect x="42" y="46" width="26" height="4"/><rect x="40" y="140" width="28" height="4"/><rect x="124" y="46" width="34" height="4"/><rect x="122" y="140" width="38" height="4"/></g><circle cx="168" cy="140" r="5" fill="${accent}"/>`;

const laurel = (color) => [-1, 1].map((s) => Array.from({ length: 6 }, (_, i) => {
  const [x, y] = pt(100, 96, 62, 90 + s * (40 + i * 18));
  return `<ellipse cx="${n(x)}" cy="${n(y)}" rx="7" ry="3" fill="${color}" transform="rotate(${n(90 + s * (40 + i * 18) + s * 50)} ${n(x)} ${n(y)})"/>`;
}).join('')).join('');

const PIX = ['110000011', '111000111', '110101011', '110010011', '110000011'];

export const LOGO_R4 = [
  /* ---- 27 · Wappen ---- */
  { base: '27', name: 'Wappen Klassik', bg: BLK, svg: (k) => shield(k, {}) + wm(166, WHITE, { size: 17, sub: 'MEISTERBETRIEB · BERLIN', subColor: SILV }) },
  { base: '27', name: 'Wappen Gold', bg: BLK, svg: (k) => shield(k, { left: GOLD, right: BLK, outline: GOLD }) + wm(168, GOLD, { serif: true, size: 13 }) },
  { base: '27', name: 'Wappen mit Band', bg: BLK, svg: (k) => shield(k, { top: 14, h: 104 }) + `<path d="M26 128H174L164 140L174 152H26L36 140Z" fill="${RED}"/>` + T('MEISTERBETRIEB', 100, 143.5, 9, WHITE, ' font-weight="800" letter-spacing="3"') + wm(182, WHITE, { size: 15 }) },
  { base: '27', name: 'Wappen Sparren', bg: WHITE, svg: (k) => { const s = shieldPaths(100, 24, 92, 112); return `<defs><clipPath id="${k}s"><path d="${s.full}"/></clipPath></defs><path d="${s.full}" fill="${INK}"/><path d="M40 106L100 76L160 106V140H40Z" fill="${RED}" clip-path="url(#${k}s)"/>${M(74, 44, 52, 30, WHITE)}${wm(166, INK, { size: 17, sub: 'KFZ-MEISTERWERKSTATT', subColor: '#6e6e73' })}`; } },
  { base: '27', name: 'Wappen Kontur', bg: BLK, svg: () => { const a = shieldPaths(100, 24, 92, 112), b = shieldPaths(100, 31, 78, 98); return `<path d="${a.full}" fill="none" stroke="${SILV}" stroke-width="2.2"/><path d="${b.full}" fill="none" stroke="${SILV}" stroke-width=".8"/>${M(73, 54, 54, 38, RED)}${T('MASTER <tspan font-weight="800" fill="' + RED + '">KFZ</tspan>', 100, 168, 17, WHITE, ' font-weight="300" letter-spacing="2"')}`; } },
  { base: '27 + 28', name: 'Wappen mit Flügeln', bg: BLK, svg: (k) => wings({ cy: 50, inner: 34, color: SILV, len: 50 }) + shield(k, { top: 34, w: 62, h: 76 }) + wm(146, WHITE, { size: 16, sub: 'MEISTERBETRIEB · BERLIN', subColor: SILV }) },
  { base: '27', name: 'Wappen quer', bg: BLK, svg: (k) => shield(k, { cx: 46, top: 70, w: 50, h: 60 }) + T('MASTER KFZ', 82, 100, 15.5, WHITE, ' font-weight="900" letter-spacing="1"', SANS, 'start') + `<rect x="82" y="107" width="94" height="1.2" fill="${RED}"/>` + T('KFZ-MEISTERWERKSTATT', 82, 120, 6.6, SILV, ' font-weight="600" letter-spacing="1.8"', SANS, 'start') },
  { base: '27', name: 'Wappen Heritage', bg: CREAM, svg: (k) => shield(k, { left: BORD, right: NAVY, m: CREAM }) + wm(168, NAVY, { serif: true, size: 13, sub: 'BERLIN · NEUKÖLLN', subColor: BORD }) },
  { base: '27', name: 'Wappen geviert', bg: BLK, svg: (k) => { const s = shieldPaths(100, 24, 92, 112); const ck = Array.from({ length: 16 }, (_, i) => `<rect x="${54 + (i % 4) * 11.5}" y="${80 + Math.floor(i / 4) * 14}" width="11.5" height="14" fill="${(i + Math.floor(i / 4)) % 2 ? INK : WHITE}"/>`).join(''); return `<defs><clipPath id="${k}q"><path d="${s.full}"/></clipPath></defs><g clip-path="url(#${k}q)"><rect x="54" y="24" width="46" height="56" fill="${RED}"/><rect x="100" y="24" width="46" height="56" fill="${SILV}"/>${ck}<rect x="100" y="80" width="46" height="60" fill="${RED}"/></g><path d="${s.full}" fill="none" stroke="${WHITE}" stroke-width="2"/>${wm(168, WHITE, { size: 16, sub: 'RACING HERITAGE · BERLIN', subColor: SILV })}`; } },
  /* ---- 28 · Flügel ---- */
  { base: '28', name: 'Flügel Klassik', bg: BLK, svg: () => wings({}) + M(76, 58, 48, 40, RED) + wm(150, WHITE, { size: 17, sub: 'KFZ-MEISTERWERKSTATT', subColor: SILV }) },
  { base: '28', name: 'Flügel Gold', bg: CREAM, svg: () => wings({ color: GOLD }) + M(76, 58, 48, 40, INK) + wm(150, INK, { serif: true, size: 13, sub: 'BERLIN', subColor: GOLD }) },
  { base: '28', name: 'Flügel mit Plakette', bg: BLK, svg: () => wings({ inner: 32, color: SILV }) + `<circle cx="100" cy="78" r="28" fill="${RED}"/>` + M(84, 66, 32, 24, BLK) + wm(150, WHITE, { size: 16 }) },
  { base: '28 + 27', name: 'Flügel mit Wappen', bg: NAVY, svg: (k) => wings({ cy: 56, inner: 30, color: SILV }) + shield(k, { top: 42, w: 54, h: 66 }) + wm(150, WHITE, { size: 16, sub: 'MEISTERBETRIEB', subColor: SILV }) },
  { base: '28', name: 'Flügel Linie', bg: BLK, svg: () => wings({ stroke: 2.4, color: SILV }) + `<path d="${poly(mPoints(76, 58, 48, 40))}" fill="none" stroke="${RED}" stroke-width="2.4"/>` + T('MASTER KFZ', 100, 150, 15, WHITE, ' font-weight="300" letter-spacing="6"') },
  { base: '28', name: 'Flügel Schriftband', bg: BLK, svg: () => wings({ cy: 54, inner: 24, len: 66, color: SILV }) + M(78, 44, 44, 36, RED) + `<rect x="18" y="108" width="164" height="30" fill="${RED}"/>` + T('MASTER KFZ', 100, 129, 19, WHITE, ' font-weight="900" letter-spacing="4"') + T('KFZ-MEISTERWERKSTATT BERLIN', 100, 160, 7, SILV, ' font-weight="600" letter-spacing="2.2"') },
  { base: '28', name: 'Flügel einfarbig', bg: WHITE, svg: () => wings({ color: RED }) + M(76, 58, 48, 40, RED) + wm(150, RED, { size: 17, sub: 'STEMPEL- & STICKTAUGLICH', subColor: RED }) },
  { base: '28', name: 'Flügel Tempo', bg: BLK, svg: () => wings({ side: 'left', inner: 18, cx: 82, len: 64, lift: 10, color: SILV }) + M(74, 56, 64, 46, RED, 102) + wm(150, WHITE, { size: 17 }) },
  { base: '28', name: 'Flügel mit Stern', bg: NAVY, svg: () => star(100, 40, 9, GOLD) + wings({ cy: 64, color: SILV }) + M(76, 56, 48, 40, RED) + wm(150, WHITE, { serif: true, size: 13, sub: 'SEIT DEM ERSTEN TAG MEISTERHAFT', subColor: GOLD }) },
  /* ---- S01 · Vintage ---- */
  { base: 'S01', name: 'Vintage Marine', bg: NAVY, svg: (k) => badge(k, { ring: CREAM, text: CREAM, m: RED }) },
  { base: 'S01', name: 'Vintage Gold', bg: BLK, svg: (k) => badge(k, { ring: GOLD, text: GOLD, m: GOLD, dotted: true }) },
  { base: 'S01', name: 'Vintage Ringband', bg: CREAM, svg: (k) => badge(k, { ring: RED, text: CREAM, m: NAVY, band: true }) },
  /* ---- S02 · Startnummer ---- */
  { base: 'S02', name: 'Startnummer Gold', bg: BLK, svg: () => roundel51({ ring: GOLD, fill: BLK, num: GOLD, word: GOLD }) },
  { base: 'S02', name: 'Startnummer Le Mans', bg: CREAM, svg: () => `<rect x="70" y="0" width="22" height="146" fill="${RED}"/><rect x="108" y="0" width="22" height="146" fill="${NAVY}"/>` + roundel51({ ring: NAVY, fill: '#fff', num: NAVY, word: NAVY, sub: 'TREPTOWER STR. 51' }) },
  /* ---- S06 · Swiss ---- */
  { base: 'S06', name: 'Swiss Block', bg: '#fff', svg: () => `<rect x="30" y="40" width="12" height="12" fill="${RED}"/>` + T('MASTER', 30, 104, 36, INK, ' font-weight="900" letter-spacing="-2.5"', SANS, 'start') + T('KFZ', 30, 142, 36, RED, ' font-weight="900" letter-spacing="-2.5"', SANS, 'start') + T('MEISTERWERKSTATT · BERLIN', 31, 168, 7.5, '#6e6e73', ' font-weight="600" letter-spacing="2"', SANS, 'start') },
  { base: 'S06', name: 'Swiss Nacht', bg: BLK, svg: () => T(`master<tspan fill="${RED}">.</tspan>`, 100, 106, 48, WHITE, ' font-weight="700" letter-spacing="-2.5"') + `<rect x="40" y="122" width="120" height="1" fill="#3a3a3c"/>` + T('kfz meisterwerkstatt berlin', 100, 140, 9, SILV, ' letter-spacing="2"') },
  /* ---- S07 · Brutalismus ---- */
  { base: 'S07', name: 'Brutal Rot', bg: RED, svg: () => `<path d="M24 146V40H64L100 90L136 40H176V146H140V96L100 146L60 96V146Z" fill="${INK}"/><rect x="24" y="154" width="152" height="24" fill="${INK}"/>` + T('KFZ — NEUKÖLLN', 100, 171, 12, WHITE, ' font-weight="800" letter-spacing="3"') },
  /* ---- S08 · Neon ---- */
  { base: 'S08', name: 'Neon Rot', bg: '#08060a', svg: (k) => neon(k, `<path d="M58 136V64L100 110L142 64V136" stroke="${RED}" stroke-width="6"/><path d="M22 82H44M28 98H44M34 114H44" stroke="#fff" stroke-width="4.5"/>`, '#fff') },
  { base: 'S08', name: 'Neon Rahmen', bg: '#0a0614', svg: (k) => neon(k, `<rect x="30" y="34" width="140" height="116" rx="18" stroke="#22d3ee" stroke-width="3.5"/><path d="M64 128V68L100 106L136 68V128" stroke="#ff2d55" stroke-width="6"/>`, '#f5f5f7') },
  /* ---- S09 · Blaupause ---- */
  { base: 'S09', name: 'Konstruktion', bg: '#0b3d91', svg: () => `<g fill="none" stroke="rgba(255,255,255,.35)" stroke-width=".8"><circle cx="100" cy="92" r="62"/><circle cx="100" cy="92" r="38.3"/><circle cx="100" cy="92" r="23.7"/><path d="M20 92H180M100 18V166M56 48L144 136M144 48L56 136"/></g>${`<path d="${poly(mPoints(64, 64, 72, 56))}" fill="none" stroke="#fff" stroke-width="2"/>`}${T('MASTER KFZ · ⌀ 1,618', 100, 184, 8, '#fff', ' letter-spacing="2"', MONO)}` },
  /* ---- S10 · Pixel ---- */
  { base: 'S10', name: 'Pixel Gold', bg: BLK, svg: () => PIX.map((row, y) => [...row].map((on, x) => (on === '1' ? `<rect x="${37 + x * 14}" y="${50 + y * 14}" width="13" height="13" fill="${GOLD}"/>` : '')).join('')).join('') + [[0, 0], [1, 1], [0, 2]].map(([x, y]) => `<rect x="${12 + x * 8}" y="${64 + y * 14}" width="7" height="7" fill="${RED}"/><rect x="${181 - x * 8}" y="${64 + y * 14}" width="7" height="7" fill="${RED}"/>`).join('') + T('MASTER_KFZ', 100, 158, 13, GOLD, ' font-weight="700" letter-spacing="2"', MONO) },
  /* ---- S11 · Isometrie ---- */
  { base: 'S11', name: 'Isometrie Gold', bg: BLK, svg: () => { const f = (u, v) => [48 + 52 * u, 70 + 30 * u + 60 * v]; const m = [[0.2, 0.85], [0.2, 0.2], [0.5, 0.6], [0.8, 0.2], [0.8, 0.85]].map(([u, v]) => f(u, v).map(n).join(' ')).join('L'); return `<path d="M100 40L152 70L100 100L48 70Z" fill="#e6cf7a"/><path d="M48 70L100 100V160L48 130Z" fill="${GOLD}"/><path d="M100 100L152 70V130L100 160Z" fill="#7c6420"/><path d="M${m}" fill="none" stroke="${BLK}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>${wm(188, GOLD, { size: 13, spacing: 3 })}`; } },
  /* ---- S12 · Hanko ---- */
  { base: 'S12', name: 'Hanko rund', bg: '#f4efe6', svg: () => `<circle cx="100" cy="92" r="62" fill="#c8102e"/><circle cx="100" cy="92" r="54" fill="none" stroke="#f4efe6" stroke-width="2"/>${M(70, 66, 60, 42, '#f4efe6')}${T('KFZ', 100, 132, 13, '#f4efe6', ' font-weight="900" letter-spacing="4"')}<path d="M52 70l8 2M146 120l-5 6M96 34l7 1" stroke="#f4efe6" stroke-width="2"/>${wm(180, '#c8102e', { size: 13, spacing: 3 })}` },
  { base: 'S12', name: 'Hanko Tusche', bg: '#f4efe6', svg: () => `<rect x="44" y="40" width="112" height="112" rx="8" fill="${INK}"/><rect x="52" y="48" width="96" height="96" rx="4" fill="none" stroke="#f4efe6" stroke-width="2"/>${[['M', 78, 94], ['K', 122, 94], ['F', 78, 136], ['Z', 122, 136]].map(([c, x, y]) => T(c, x, y, 36, '#f4efe6', ' font-weight="900"')).join('')}<rect x="140" y="40" width="16" height="16" fill="#c8102e"/>${wm(180, INK, { size: 13, spacing: 3 })}` },
  /* ---- S13 · Raster ---- */
  { base: 'S13', name: 'Raster Gold', bg: NAVY, svg: () => halftone(GOLD) },
  /* ---- S14 · Origami ---- */
  { base: 'S14', name: 'Origami Gold', bg: BLK, svg: () => origami('#7c6420', GOLD, '#e6cf7a', '#5a4815', GOLD) },
  { base: 'S14', name: 'Origami Mono', bg: WHITE, svg: () => origami('#2c2c2e', '#48484a', RED, '#1c1c1e', INK) },
  /* ---- S15 · Typenschild ---- */
  { base: 'S15', name: 'Messingschild', bg: BLK, svg: (k) => `<defs><linearGradient id="${k}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8cf7c"/><stop offset=".5" stop-color="#b08a2e"/><stop offset="1" stop-color="#d9bb5e"/></linearGradient></defs><rect x="24" y="50" width="152" height="100" rx="8" fill="url(#${k}b)"/>${[[34, 60], [166, 60], [34, 140], [166, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#6b5414"/>`).join('')}<text x="42" y="86" font-size="17" font-weight="800" fill="#2b2108" font-family="${MONO}">MASTER KFZ</text><rect x="42" y="94" width="116" height="1.5" fill="#6b5414"/>${['MEISTERWERKSTATT', '12059 BERLIN', 'NR. 51'].map((l, i) => `<text x="42" y="${110 + i * 12}" font-size="7.5" fill="#3b2d0a" font-family="${MONO}">${l}</text>`).join('')}` },
  /* ---- S16 · Luxus-Serif ---- */
  { base: 'S16', name: 'Lorbeer Gold', bg: BLK, svg: () => laurel(GOLD) + T('M', 100, 122, 76, GOLD, ' font-style="italic"', SERIF) + wm(184, CREAM, { serif: true, size: 12 }) },
  { base: 'S16', name: 'Serif Marine', bg: NAVY, svg: () => `<rect x="54" y="30" width="92" height="112" fill="none" stroke="${SILV}" stroke-width="1"/><rect x="59" y="35" width="82" height="102" fill="none" stroke="${SILV}" stroke-width=".5"/>${T('M', 100, 114, 78, SILV, '', SERIF)}${wm(176, WHITE, { serif: true, size: 12 })}` },
  { base: 'S16', name: 'Monogramm MK', bg: CREAM, svg: () => `<circle cx="100" cy="88" r="58" fill="none" stroke="${BORD}" stroke-width="1.2"/>${T('M', 90, 116, 72, BORD, ' font-style="italic"', SERIF)}${T('K', 120, 124, 52, NAVY, ' font-style="italic" opacity=".9"', SERIF)}${wm(176, NAVY, { serif: true, size: 12 })}` },
  /* ---- S17 · Prüfstempel ---- */
  { base: 'S17', name: 'Rundstempel', bg: '#f5f2ea', svg: (k) => `<g transform="rotate(-10 100 96)"><defs><path id="${k}p" d="M36 96A64 64 0 1 1 164 96A64 64 0 1 1 36 96"/></defs><circle cx="100" cy="96" r="76" fill="none" stroke="${NAVY}" stroke-width="3.5"/><circle cx="100" cy="96" r="52" fill="none" stroke="${NAVY}" stroke-width="1.4"/><text font-size="11" font-weight="800" letter-spacing="3.2" fill="${NAVY}" font-family="${SANS}"><textPath href="#${k}p">MASTER KFZ · MEISTERBETRIEB · BERLIN ·</textPath></text>${T('GEPRÜFT', 100, 102, 17, NAVY, ' font-weight="900" letter-spacing="1.5"')}<path d="M50 80l24 2M116 120l30-3M60 110l12 0" stroke="#f5f2ea" stroke-width="1.8"/></g>` },
  /* ---- S18 · Chrom ---- */
  { base: 'S18', name: 'Chrom auf Rot', bg: RED, svg: (k) => chromeDefs(k) + `<path d="${poly(mPoints(46, 50, 116, 88, 138))}" fill="#5a080b" transform="translate(5 5)"/><path d="${poly(mPoints(46, 50, 116, 88, 138))}" fill="url(#${k}c)"/>` + T('MASTER KFZ', 100, 180, 16, `url(#${k}c)`, ' font-weight="900" font-style="italic" letter-spacing="1"') },
  { base: 'S18 + 28', name: 'Chrom mit Flügeln', bg: BLK, svg: (k) => chromeDefs(k) + wings({ color: `url(#${k}c)` }) + M(76, 58, 48, 40, RED) + T('MASTER KFZ', 100, 152, 16, `url(#${k}c)`, ' font-weight="900" font-style="italic" letter-spacing="1"') },
  /* ---- S19 · Linien-Auto ---- */
  { base: 'S19', name: 'Silhouette', bg: BLK, svg: () => `<path d="M24 114C24 104 30 98 40 96L70 90L92 74C98 70 106 68 114 68H136C146 68 154 72 160 80L170 92C176 94 180 100 180 108V116H24Z" fill="none" stroke="${WHITE}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="58" cy="116" r="12" fill="${BLK}" stroke="${WHITE}" stroke-width="2.4"/><circle cx="146" cy="116" r="12" fill="${BLK}" stroke="${WHITE}" stroke-width="2.4"/><path d="M16 134H184" stroke="${RED}" stroke-width="3"/>${wm(166, WHITE, { size: 17, sub: 'KFZ-MEISTERWERKSTATT', subColor: SILV })}` },
  /* ---- S20 · Duoton ---- */
  { base: 'S20', name: 'Duoton Gold', bg: BLK, svg: () => { const [ax, ay] = pt(100, 92, 64, -45), [bx, by] = pt(100, 92, 64, 135); return `<path d="M${n(ax)} ${n(ay)}A64 64 0 0 0 ${n(bx)} ${n(by)}Z" fill="${GOLD}"/><path d="M${n(ax)} ${n(ay)}A64 64 0 0 1 ${n(bx)} ${n(by)}Z" fill="#1c1c1e"/>${M(66, 70, 68, 46, CREAM)}${wm(182, GOLD, { serif: true, size: 12 })}`; } },
  /* ---- S21 · U-Bahn ---- */
  { base: 'S21', name: 'U-Bahn Marine', bg: '#e9e4d8', svg: () => `<rect x="16" y="60" width="168" height="80" fill="${RED}"/>${Array.from({ length: 6 }, (_, r) => Array.from({ length: 16 }, (_, c) => `<rect x="${20 + c * 10}" y="${64 + r * 12}" width="9.2" height="11.2" fill="${(r * 3 + c * 7) % 5 ? NAVY : '#1b2a52'}"/>`).join('')).join('')}${T('MASTER KFZ', 100, 108, 22, WHITE, ' font-weight="800" letter-spacing="1"')}${T('Treptower Str. 51', 100, 160, 9, '#555', ' font-weight="600" letter-spacing="1"')}` },
  /* ---- S22 · Emaille ---- */
  { base: 'S22', name: 'Emaille oval', bg: '#e7e2d6', svg: () => enamel({ shape: 'oval', base: '#f1ead8', frame: RED, title: RED, sub: NAVY }) },
  { base: 'S22', name: 'Emaille schwarz', bg: '#2a2a2c', svg: () => enamel({ base: INK, frame: GOLD, title: GOLD, sub: CREAM }) },
  /* ---- S23 · Reifenspur ---- */
  { base: 'S23', name: 'Profil Rot', bg: BLK, svg: () => `<path d="M44 150V64L100 118L156 64V150" fill="none" stroke="${RED}" stroke-width="24" stroke-dasharray="7 4" stroke-linejoin="round"/><path d="M44 150V64L100 118L156 64V150" fill="none" stroke="${BLK}" stroke-width="3" stroke-linejoin="round"/>${wm(184, WHITE, { size: 14, spacing: 3 })}` },
  /* ---- S24 · Kontrast ---- */
  { base: 'S24', name: 'Bodoni Gold', bg: BLK, svg: () => bodoni(GOLD, RED) + `<rect x="40" y="160" width="120" height=".8" fill="${GOLD}"/>` + T('MASTER KFZ', 100, 180, 11, CREAM, ' letter-spacing="8"', SERIF) },
];

export const r4Svg = (l, i, cls = 'l3') => `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="${l.name}">${l.svg(`r4v${i}`)}</svg>`;

/* Shared with round 5 (shortlist alternatives). */
export { T, M, wm, poly, pt, n, shield, shieldPaths, wings, halftone, origami, neon, chromeDefs, RED, GOLD, CREAM, NAVY, SILV, INK, BLK, WHITE, SANS, SERIF, MONO };
