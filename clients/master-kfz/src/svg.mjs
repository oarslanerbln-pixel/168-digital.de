/*
 * Hand-drawn vector art instead of stock photos: the "blueprint car" is the
 * site's visual signature (hero, vehicle-check scan) and costs ~2 kB instead
 * of a 200 kB hero image. Every stroke carries pathLength="1" so CSS can
 * draw it with a single dash offset, whatever the path's real length.
 */

const ICONS = {
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 11.5l2 2 4-4M9 17h6"/>',
  drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  disc: '<circle cx="11" cy="13" r="7.5"/><circle cx="11" cy="13" r="2"/><path d="M14.5 4.5h4a2 2 0 0 1 2 2V11"/>',
  tyre: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21"/>',
  snow: '<path d="M12 2v20M3.5 7l17 10M3.5 17l17-10M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  belt: '<circle cx="7" cy="16" r="3.5"/><circle cx="17" cy="7.5" r="3.5"/><path d="M4.6 13.4 14.4 4.9M9.6 18.6l9.8-8.5"/>',
  shift: '<circle cx="6" cy="5" r="1.6"/><circle cx="12" cy="5" r="1.6"/><circle cx="18" cy="5" r="1.6"/><circle cx="6" cy="19" r="1.6"/><circle cx="12" cy="19" r="1.6"/><path d="M6 6.6v10.8M12 6.6v10.8M18 6.6V12H6"/>',
  pulse: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  chat: '<path d="M20 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-4.4A8.5 8.5 0 1 1 20 11.5z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  insta: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};

export function icon(name, cls = 'i') {
  return `<svg class="${cls}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}

function wheel(cx) {
  const spokes = [0, 72, 144, 216, 288]
    .map((deg) => {
      const a = ((deg - 90) * Math.PI) / 180;
      const p = (r) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(300 + r * Math.sin(a)).toFixed(1)}`;
      return `M${p(13)}L${p(38)}`;
    })
    .join('');
  return `<g class="car__wheel">
<circle class="d" pathLength="1" cx="${cx}" cy="300" r="60"/>
<circle class="d" pathLength="1" cx="${cx}" cy="300" r="41"/>
<circle class="d" pathLength="1" cx="${cx}" cy="300" r="9"/>
<path class="d" pathLength="1" d="${spokes}"/>
</g>`;
}

/* Side profile of a generic sports coupé, facing right. viewBox 1200 × 400. */
const CAR_PATHS = `
<path class="d car__body" pathLength="1" d="M92 298C86 266 94 236 122 216C176 190 252 168 332 150C420 112 518 92 612 90C694 90 762 106 824 142C902 160 1010 172 1082 192C1114 200 1130 224 1126 254C1124 276 1114 292 1094 298L996 300A76 76 0 0 0 844 300L376 300A76 76 0 0 0 224 300Z"/>
<path class="d" pathLength="1" d="M360 166C444 128 532 110 608 108C676 108 732 122 790 150C700 160 520 166 360 166Z"/>
<path class="d" pathLength="1" d="M604 108L592 164C590 210 590 256 594 298"/>
<path class="d" pathLength="1" d="M806 156C818 200 822 250 816 298"/>
<path class="d" pathLength="1" d="M132 232C380 214 780 206 1104 214"/>
<path class="d" pathLength="1" d="M384 286L836 286"/>
<path class="d car__light" pathLength="1" d="M1050 196C1080 200 1104 210 1116 226C1090 224 1066 216 1050 196Z"/>
<path class="d car__tail" pathLength="1" d="M120 218C140 206 160 198 182 192C172 206 150 214 120 218Z"/>
<path class="d" pathLength="1" d="M812 150C826 146 840 148 846 158L826 162Z"/>
${wheel(300)}
${wheel(920)}
<path class="d car__ground" pathLength="1" d="M40 362L1160 362"/>`;

export function carSvg(cls) {
  return `<svg class="${cls}" viewBox="0 0 1200 400" fill="none" aria-hidden="true" focusable="false">${CAR_PATHS}</svg>`;
}

/* Gear outline echoing the logo's cog; teeth are computed, not traced. */
export function gearSvg(cls, teeth = 12) {
  const c = 100;
  const rOut = 96;
  const rIn = 80;
  const step = (2 * Math.PI) / teeth;
  const pt = (a, r) => `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const w = step * 0.22;
    d += `${i ? 'L' : 'M'}${pt(a - w * 1.25, rIn)}L${pt(a - w, rOut)}L${pt(a + w, rOut)}L${pt(a + w * 1.25, rIn)}`;
  }
  return `<svg class="${cls}" viewBox="0 0 200 200" fill="none" aria-hidden="true" focusable="false">
<path class="d" pathLength="1" d="${d}Z"/>
<circle class="d" pathLength="1" cx="100" cy="100" r="62"/>
<circle class="d gear__accent" pathLength="1" cx="100" cy="100" r="48"/>
</svg>`;
}

/*
 * Logo concepts (drafts for the client's review, see /logo-konzepte/).
 * Pure geometry — no font dependency — so the mark renders identically in
 * the header, the favicon and the OG image. The wordmark next to it is live
 * text in CSS. Swap LOGO_VARIANT to change the mark site-wide.
 */
export const LOGO_VARIANT = 'velocity';
const SKEW = Math.tan((12 * Math.PI) / 180);
const M_SHAPE = [[0, 72], [0, 0], [22, 0], [48, 38], [74, 0], [96, 0], [96, 72], [76, 72], [76, 32], [55, 62], [41, 62], [20, 32], [20, 72]];
const r2 = (n) => +n.toFixed(2);
const poly = (pts) => 'M' + pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L') + 'Z';

export function mPoints(x0, y0, w, h, skewBase = null) {
  return M_SHAPE.map(([px, py]) => {
    const x = x0 + (px * w) / 96;
    const y = y0 + (py * h) / 72;
    return [skewBase == null ? x : x + (skewBase - y) * SKEW, y];
  });
}

export function speedBars() {
  return [[40, 30], [52, 22], [64, 14]].map(([y, len]) => {
    const end = 34 + (86 - y) * SKEW - 6;
    return [[end - len, y], [end, y], [end - 6 * SKEW, y + 6], [end - len - 6 * SKEW, y + 6]];
  });
}

const MARKS = {
  velocity: {
    viewBox: '0 0 150 100',
    body: () => `<path class="logo__m" d="${poly(mPoints(34, 14, 96, 72, 86))}"/>${speedBars().map((b) => `<path class="logo__bar" d="${poly(b)}"/>`).join('')}`,
  },
  gear: {
    viewBox: '0 0 120 120',
    body: () => {
      const teeth = 10, c = 60, step = (2 * Math.PI) / teeth;
      const pt = (a, r) => `${r2(c + r * Math.cos(a))} ${r2(c + r * Math.sin(a))}`;
      let d = '';
      for (let i = 0; i < teeth; i++) {
        const a = i * step - Math.PI / 2, w = step * 0.2;
        d += `${i ? 'L' : 'M'}${pt(a - w * 1.4, 50)}L${pt(a - w, 58)}L${pt(a + w, 58)}L${pt(a + w * 1.4, 50)}`;
      }
      d += `ZM${c + 42} ${c}A42 42 0 1 0 ${c - 42} ${c}A42 42 0 1 0 ${c + 42} ${c}Z`;
      return `<path class="logo__ring" fill-rule="evenodd" d="${d}"/><path class="logo__m" d="${poly(mPoints(34, 40, 52, 40))}"/>`;
    },
  },
  badge: {
    viewBox: '0 0 120 120',
    body: () => `<path class="logo__frame" fill="none" stroke-width="5" stroke-linejoin="round" d="M22 12H98L108 22V76C108 95 86 106 60 113C34 106 12 95 12 76V22Z"/><path class="logo__m" d="${poly(mPoints(30, 32, 60, 44, 76))}"/><path class="logo__bar" d="M36 86H86L84 91H34Z"/>`,
  },
};

export function logoMark(cls = 'logo', variant = LOGO_VARIANT) {
  const m = MARKS[variant];
  return `<svg class="${cls} logo--${variant}" viewBox="${m.viewBox}" aria-hidden="true" focusable="false">${m.body()}</svg>`;
}

export const LOGO_VARIANTS = Object.keys(MARKS);

/*
 * Premium car for the "Ein Blick. Jedes System." scan: shaded body, glass,
 * detailed rims with brake discs, a soft floor reflection — and, on the lit
 * layer only, an x-ray of the systems the hotspots point to (engine, timing
 * belt, gearbox, exhaust, ECU, A/C), revealed as the scan beam passes.
 */
const BODY = 'M92 298C86 266 94 236 122 216C176 190 252 168 332 150C420 112 518 92 612 90C694 90 762 106 824 142C902 160 1010 172 1082 192C1114 200 1130 224 1126 254C1124 276 1114 292 1094 298L996 300A76 76 0 0 0 844 300L376 300A76 76 0 0 0 224 300Z';
const GLASS = 'M360 166C444 128 532 110 608 108C676 108 732 122 790 150C700 160 520 166 360 166Z';
function premiumWheel(cx, lit) {
  const spokes = Array.from({ length: 10 }, (_, i) => {
    const a = ((i * 36 - 90) * Math.PI) / 180, b = a + 0.12;
    const p = (r, ang) => `${(cx + r * Math.cos(ang)).toFixed(1)} ${(300 + r * Math.sin(ang)).toFixed(1)}`;
    return `M${p(11, a)}L${p(39, a)}L${p(39, b)}L${p(11, b)}Z`;
  }).join('');
  const holes = Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return `<circle cx="${(cx + 22 * Math.cos(a)).toFixed(1)}" cy="${(300 + 22 * Math.sin(a)).toFixed(1)}" r="1.6" fill="#0b0b0c"/>`; }).join('');
  return `<g class="pc__wheel"><circle cx="${cx}" cy="300" r="60" fill="#0d0d0f" stroke="${lit ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.14)'}" stroke-width="2"/>
<circle cx="${cx}" cy="300" r="44" fill="url(#pcRim)"/><circle cx="${cx}" cy="300" r="31" fill="${lit ? '#6b6f75' : '#2a2b2e'}"/>${lit ? holes : ''}
<path d="M${cx + 10} 266A34 34 0 0 1 ${cx + 33} 290" stroke="#e3141c" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="${spokes}" fill="${lit ? '#d9dce0' : '#3a3b3f'}"/><circle cx="${cx}" cy="300" r="9" fill="${lit ? '#e8eaed' : '#3a3b3f'}"/></g>`;
}
const XRAY = `<g class="pc__xray" fill="none" stroke-linecap="round" stroke-linejoin="round">
<rect x="958" y="196" width="104" height="58" rx="6" stroke="#ff3138"/>${[978, 1002, 1026, 1050].map((x) => `<circle cx="${x - 4}" cy="214" r="7" stroke="#ff3138"/>`).join('')}
<path d="M968 262H1052L1046 280H974Z" stroke="#ffd166"/>
<circle cx="1086" cy="214" r="9" stroke="#fff"/><circle cx="1090" cy="252" r="11" stroke="#fff"/><path d="M1095 214L1099 252M1077 214L1081 252" stroke="#fff"/>
<rect x="1104" y="222" width="10" height="44" rx="2" stroke="#7dd3fc"/><path d="M1104 236C980 230 860 160 780 150" stroke="#7dd3fc" stroke-dasharray="4 4"/>
<path d="M958 236H900V270H958" stroke="#ff3138"/><path d="M900 252L880 254C780 262 600 270 420 276L320 282" stroke="#c7c7cc"/>
<path d="M1000 282C900 292 600 294 330 294C250 294 190 292 150 286" stroke="#8e9398" stroke-dasharray="2 5"/><ellipse cx="198" cy="288" rx="26" ry="7" stroke="#8e9398"/>
<rect x="688" y="180" width="30" height="22" rx="3" stroke="#22d3ee"/><path d="M703 180V166M688 191H676M718 191H730M703 202V214" stroke="#22d3ee"/>
<rect x="1018" y="168" width="26" height="18" rx="2" stroke="#a3e635"/></g>`;

export function carPremium(cls, lit = false) {
  return `<svg class="${cls}" viewBox="0 0 1200 400" aria-hidden="true" focusable="false">
<defs><linearGradient id="pcBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit ? '#3b3d42' : '#1c1d20'}"/><stop offset=".55" stop-color="${lit ? '#16171a' : '#0d0d0f'}"/><stop offset="1" stop-color="#050506"/></linearGradient>
<linearGradient id="pcGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${lit ? '#5d6f86' : '#1d2129'}"/><stop offset=".6" stop-color="#0b0d12"/><stop offset="1" stop-color="#20242c"/></linearGradient>
<radialGradient id="pcRim" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="${lit ? '#f2f3f5' : '#3d3e42'}"/><stop offset="1" stop-color="${lit ? '#6b6f75' : '#141416'}"/></radialGradient>
<linearGradient id="pcFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="pcMask"><rect x="0" y="362" width="1200" height="120" fill="url(#pcFade)"/></mask></defs>
<ellipse cx="610" cy="364" rx="520" ry="14" fill="${lit ? 'rgba(227,20,28,.35)' : 'rgba(0,0,0,.6)'}"/>
<g mask="url(#pcMask)"><g transform="translate(0 724) scale(1 -1)"><path d="${BODY}" fill="url(#pcBody)"/></g></g>
<path d="${BODY}" fill="url(#pcBody)" stroke="${lit ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.16)'}" stroke-width="2"/>
<path d="M132 232C380 214 780 206 1104 214" stroke="${lit ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.08)'}" stroke-width="2" fill="none"/>
<path d="M340 150C450 118 560 104 640 104" stroke="rgba(255,255,255,${lit ? '.55' : '.12'})" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="${GLASS}" fill="url(#pcGlass)" stroke="${lit ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.1)'}" stroke-width="1.5"/>
<path d="M604 108L592 164M592 164C590 210 590 256 594 298M806 156C818 200 822 250 816 298" stroke="rgba(255,255,255,${lit ? '.35' : '.07'})" stroke-width="1.5" fill="none"/>
${lit ? XRAY : ''}
<path d="M1050 196C1080 200 1104 210 1116 226C1090 224 1066 216 1050 196Z" fill="${lit ? '#fff' : '#3a3b3f'}"/>
<path d="M120 218C140 206 160 198 182 192C172 206 150 214 120 218Z" fill="#e3141c" opacity="${lit ? 1 : 0.5}"/>
${premiumWheel(300, lit)}${premiumWheel(920, lit)}</svg>`;
}
