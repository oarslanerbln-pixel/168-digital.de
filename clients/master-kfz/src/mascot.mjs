/*
 * Brand mascot "der Meister" in a retro print style: limited inks (paper,
 * navy, signal red), halftone on the dark surfaces and a slightly
 * misregistered red under-print, like a 1950s garage sign. Deliberately not
 * a red cap with a letter plus moustache (too close to a famous game
 * character): navy cap, full beard, the M badge on the chest.
 *
 * One parametric drawing serves every pose, so site, sticker and social
 * posts stay the same character. Strokes share one weight; nothing depends
 * on a web font (badge lettering comes pre-converted from mascot-type.mjs).
 */
import { TYPE } from './mascot-type.mjs';

export const INK = {
  paper: '#f3ecdc', navy: '#1c2742', navyHi: '#2c3a63', ink: '#151a2b', red: '#d4161d', oxblood: '#9e1016',
  skin: '#f2cba6', skinShade: '#e2ad86', beard: '#6e3624', beardHi: '#8a4a34', steel: '#ebe4d3', cheek: '#ee8f7c',
};
const C = INK;
const O = `stroke="${C.ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;

/* Pattern/filter ids are prefixed so several drawings can share one page. */
export const mascotDefs = (p = 'mk') => `<defs>
<pattern id="${p}-dots" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2" cy="2" r="1.4" fill="${C.ink}" opacity="0.32"/></pattern>
<pattern id="${p}-dotsSkin" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="2" cy="2" r="1.2" fill="#c98a62" opacity="0.45"/></pattern>
<filter id="${p}-flat" x="-5%" y="-5%" width="110%" height="110%"><feFlood flood-color="${C.red}"/><feComposite in2="SourceAlpha" operator="in"/></filter>
</defs>`;

const sleeve = (d) => `<path d="${d}" fill="none" stroke="${C.ink}" stroke-width="52" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${C.navy}" stroke-width="42" stroke-linecap="round"/>`;

const eye = (x, y, kind) => ({
  wink: `<path d="M${x - 13} ${y + 3}q13-12 26 0" fill="none" ${O} stroke-width="6"/>`,
  happy: `<path d="M${x - 12} ${y + 5}q12-15 24 0" fill="none" ${O} stroke-width="6"/>`,
  open: `<ellipse cx="${x}" cy="${y}" rx="9.5" ry="11.5" fill="${C.ink}"/><circle cx="${x + 3.5}" cy="${y - 4.5}" r="3.4" fill="#fff"/>`,
})[kind];
const brows = (kind) => ({
  raised: 'M149 197q14-9 28 0M223 187q15-12 30-3',
  cool: 'M148 199l30-5M222 194l30 5',
  soft: 'M150 198q14-10 28 0M222 198q14-10 28 0',
})[kind];
const mouth = (kind) => ({
  smile: `<path d="M173 265q27 22 54 0z" fill="#fff" ${O}/><path d="M178 268q22 6 44 0" fill="none" stroke="#e7ddcf" stroke-width="3"/>`,
  smirk: `<path d="M178 269q26 12 48-9" fill="none" ${O} stroke-width="6"/>`,
  open: `<path d="M170 261q30 40 60 0z" fill="${C.ink}" ${O}/><path d="M183 279q17 11 34 0q-17-8-34 0z" fill="${C.red}"/>`,
})[kind];

const hands = {
  thumb: () => `<g ${O}>${sleeve('M318 400c24-4 34-30 30-58')}
<path d="M314 310c0-8 6-14 14-14h26c8 0 14 6 14 14v22c0 8-6 14-14 14h-26c-8 0-14-6-14-14z" fill="${C.skin}"/>
<path d="M330 298v-38c0-12 18-12 18 0v38" fill="${C.skin}"/><path d="M320 313h22M320 327h24" fill="none" stroke-width="3.5"/></g>`,
  wave: () => `<g ${O}>${sleeve('M318 410c28-8 40-46 34-90')}
<path d="M330 330c-20-4-30-24-26-48l4-40c2-10 16-10 16 0l-2 34 4-46c2-10 16-10 16 0l-2 46 6-42c2-10 16-8 16 2l-4 44 8-30c4-10 18-6 16 4l-10 50c-4 22-18 30-38 26z" fill="${C.skin}"/></g>
<path d="M392 252q16-12 14-34M398 282q22-2 32-20" fill="none" stroke="${C.red}" stroke-width="5" stroke-linecap="round"/>`,
};

/* The character, drawn in a 400 × 470 box. */
function meister({ eyes = ['open', 'open'], brow = 'soft', mth = 'smile', hand = 'thumb', p = 'mk' } = {}) {
  return `<g ${O}>
<path d="M44 470c0-96 60-152 156-152s156 56 156 152z" fill="${C.navy}"/>
<path d="M44 470c0-96 60-152 156-152s156 56 156 152z" fill="url(#${p}-dots)" stroke="none"/>
<path d="M80 470c0-70 40-118 100-132" fill="none" stroke="${C.navyHi}" stroke-width="10" opacity="0.7"/>
<path d="M148 324l52 56 52-56" fill="${C.red}"/><path d="M160 328l40 42 40-42" fill="none" stroke="${C.paper}" stroke-width="2" stroke-dasharray="5 5"/>
<path d="M112 470V376M288 470V376" fill="none" stroke="${C.red}" stroke-width="7"/>
<path d="M124 470V384M276 470V384" fill="none" stroke="${C.paper}" stroke-width="2" stroke-dasharray="5 6"/>
<path d="M170 300h60v32c0 18-60 18-60 0z" fill="${C.skinShade}"/>
<path d="M120 382l22-9 22 9v23l-22 15-22-15z" fill="${C.paper}"/>
</g>
<path d="M131 389l11 12 11-12v19h-5v-10l-6 7-6-7v10h-5z" fill="${C.red}"/>
<g ${O}>
<ellipse cx="106" cy="222" rx="15" ry="23" fill="${C.skinShade}"/><ellipse cx="294" cy="222" rx="15" ry="23" fill="${C.skinShade}"/>
<ellipse cx="200" cy="214" rx="94" ry="100" fill="${C.skin}"/>
</g>
<path d="M262 140c26 22 36 56 30 92-4 24-14 44-30 58 30-40 26-110 0-150z" fill="url(#${p}-dotsSkin)"/>
<ellipse cx="137" cy="249" rx="12" ry="7" fill="${C.cheek}" opacity="0.55"/><ellipse cx="263" cy="249" rx="12" ry="7" fill="${C.cheek}" opacity="0.55"/>
<g ${O}>
<path d="M108 236c4 58 44 78 92 78s88-20 92-78c-10 26-30 30-46 30-14-14-30-18-46-18s-32 4-46 18c-16 0-36-4-46-30z" fill="${C.beard}"/>
</g>
<path d="M132 268q8 18 22 28M162 286q6 12 16 18M238 286q-6 12-16 18M268 268q-8 18-22 28" fill="none" stroke="${C.beardHi}" stroke-width="3.5" stroke-linecap="round"/>
<g ${O}>
<path d="M106 172c-2-66 40-108 94-108s96 42 94 108c-30 8-158 8-188 0z" fill="${C.navy}"/>
<path d="M106 172c-2-66 40-108 94-108s96 42 94 108c-30 8-158 8-188 0z" fill="url(#${p}-dots)" stroke="none"/>
<path d="M128 140c4-36 26-60 56-66" fill="none" stroke="${C.navyHi}" stroke-width="9" opacity="0.9"/>
<path d="M200 68v100M152 78q-12 38-10 92M248 78q12 38 10 92" fill="none" stroke="${C.navyHi}" stroke-width="2.5"/>
<circle cx="200" cy="66" r="6" fill="${C.red}" stroke-width="4"/>
<path d="M112 170c26 10 150 10 176 0 6 20-2 34-14 36-30 6-118 6-148 0-12-2-20-16-14-36z" fill="${C.ink}"/>
<path d="M120 172c30 8 130 8 160 0" fill="none" stroke="${C.red}" stroke-width="5"/>
<path d="${brows(brow)}" fill="none" stroke-width="7"/>
</g>
${eye(164, 222, eyes[0])}${eye(236, 222, eyes[1])}
<path d="M192 235q8 12 16 0" fill="${C.skinShade}" ${O}/>
${mouth(mth)}${hands[hand]()}`;
}

/* Character with the red under-print, ready to place anywhere. */
export function meisterPrint(opts = {}, shift = [7, 6]) {
  const art = meister(opts);
  return `<g transform="translate(${shift[0]} ${shift[1]})" filter="url(#${opts.p || 'mk'}-flat)" opacity="0.85">${art}</g>${art}`;
}

export function meisterSvg(opts = {}, label = 'Der Meister – Maskottchen von Master KFZ') {
  const p = opts.p || 'mk';
  return `<svg viewBox="0 0 450 480" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'} xmlns="http://www.w3.org/2000/svg">${mascotDefs(p)}${meisterPrint({ ...opts, p })}</svg>`;
}

/* Lay pre-converted glyphs along a circle (top: clockwise, bottom: counter-clockwise). */
function arcText(text, cx, cy, r, centerDeg, bottom = false, fill = C.paper, track = 3) {
  const g = text.split('').map((ch) => TYPE.arc[ch] || { d: '', a: 9 });
  const total = g.reduce((s, x) => s + x.a + track, -track);
  let pos = -total / 2, out = '';
  for (const x of g) {
    const mid = pos + x.a / 2, deg = centerDeg + (mid / r) * (180 / Math.PI) * (bottom ? -1 : 1);
    const rad = (deg - 90) * Math.PI / 180, px = cx + r * Math.cos(rad), py = cy + r * Math.sin(rad);
    const rot = bottom ? deg - 180 : deg;
    if (x.d) out += `<path d="${x.d}" transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${rot.toFixed(1)}) translate(${(-x.a / 2).toFixed(1)} 8)" fill="${fill}"/>`;
    pos += x.a + track;
  }
  return out;
}

const star = (x, y, r, fill) => {
  let d = '';
  for (let i = 0; i < 10; i++) { const rr = i % 2 ? r * 0.42 : r, a = -Math.PI / 2 + i * Math.PI / 5; d += `${i ? 'L' : 'M'}${(x + rr * Math.cos(a)).toFixed(1)} ${(y + rr * Math.sin(a)).toFixed(1)}`; }
  return `<path d="${d}z" fill="${fill}"/>`;
};

/*
 * Garage-sign badge: enamel ring with lettering, sunburst field, the winking
 * Meister and a ribbon. 600 × 600, transparent outside the disc.
 */
export function badgeSvg(cls = 'badge', label = 'Master KFZ – Meisterwerkstatt Berlin', p = 'bd') {
  const cx = 300, cy = 300;
  let rays = '';
  for (let i = 0; i < 36; i += 2) {
    const a1 = (i / 36) * 2 * Math.PI, a2 = ((i + 1) / 36) * 2 * Math.PI;
    rays += `M${cx} ${cy + 40}L${(cx + 400 * Math.cos(a1)).toFixed(1)} ${(cy + 40 + 400 * Math.sin(a1)).toFixed(1)}L${(cx + 400 * Math.cos(a2)).toFixed(1)} ${(cy + 40 + 400 * Math.sin(a2)).toFixed(1)}z`;
  }
  const rb = TYPE.ribbon, rw = 330, ry = 432;
  return `<svg class="${cls}" viewBox="0 0 600 600" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"'} xmlns="http://www.w3.org/2000/svg">${mascotDefs(p)}
<clipPath id="${p}-in"><circle cx="${cx}" cy="${cy}" r="198"/></clipPath>
<circle cx="${cx}" cy="${cy}" r="292" fill="${C.ink}"/>
<circle cx="${cx}" cy="${cy}" r="284" fill="${C.navy}"/>
<circle cx="${cx}" cy="${cy}" r="284" fill="url(#${p}-dots)"/>
<circle cx="${cx}" cy="${cy}" r="272" fill="none" stroke="${C.paper}" stroke-width="2"/>
<circle cx="${cx}" cy="${cy}" r="214" fill="none" stroke="${C.paper}" stroke-width="2"/>
${arcText('MEISTERWERKSTATT', cx, cy, 236, 0)}
${arcText('BERLIN', cx, cy, 236, 180, true)}
${star(cx - 236 * Math.sin(Math.PI / 2.35), cy + 236 * Math.cos(Math.PI / 2.35) - 10, 11, C.red)}${star(cx + 236 * Math.sin(Math.PI / 2.35), cy + 236 * Math.cos(Math.PI / 2.35) - 10, 11, C.red)}
<circle cx="${cx}" cy="${cy}" r="204" fill="${C.ink}"/>
<g clip-path="url(#${p}-in)">
<rect x="0" y="0" width="600" height="600" fill="${C.paper}"/>
<path d="${rays}" fill="${C.red}" opacity="0.13"/>
<g transform="translate(115 150) scale(0.9)">${meisterPrint({ eyes: ['open', 'wink'], brow: 'raised', mth: 'smile', p })}</g>
</g>
<g stroke="${C.ink}" stroke-width="5" stroke-linejoin="round">
<path d="M${cx - rw / 2 - 52} ${ry + 14}l52-12v58l-52 12 16-29z" fill="${C.oxblood}"/>
<path d="M${cx + rw / 2 + 52} ${ry + 14}l-52-12v58l52 12-16-29z" fill="${C.oxblood}"/>
<path d="M${cx - rw / 2} ${ry - 6}q${rw / 2} -26 ${rw} 0v60q-${rw / 2} -26 -${rw} 0z" fill="${C.red}"/>
</g>
<path d="M${cx - rw / 2 + 10} ${ry + 2}q${rw / 2 - 10} -24 ${rw - 20} 0" fill="none" stroke="${C.paper}" stroke-width="1.5" stroke-dasharray="4 5" opacity="0.7"/>
<path d="${rb.d}" transform="translate(${(cx - rb.w / 2 - rb.x).toFixed(1)} ${ry + 36})" fill="${C.paper}"/>
</svg>`;
}
