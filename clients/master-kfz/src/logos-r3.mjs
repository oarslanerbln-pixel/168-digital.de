/*
 * Round 3: style directions. Rounds 1–2 explored shapes in one flat idiom;
 * here each concept is a complete lockup in a distinct design style with its
 * own colours and lettering, so the client can choose a *character* first
 * (vintage, Bauhaus, neon, enamel sign …) and refine the shape after.
 * Lettering uses SVG text in system fonts — fine for concept review; the
 * chosen direction gets outlined paths before production.
 */
import { mPoints } from './svg.mjs';

const n = (v) => +v.toFixed(2);
const poly = (pts) => 'M' + pts.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') + 'Z';
const SANS = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";
const SERIF = "Didot,'Bodoni 72',Georgia,'Times New Roman',serif";
const MONO = "ui-monospace,'SF Mono',Menlo,Consolas,monospace";
const T = (str, x, y, size, fill, extra = '', font = SANS) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-family="${font}" text-anchor="middle"${extra}>${str}</text>`;
const pt = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const inPoly = (x, y, p) => {
  let c = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    const [xi, yi] = p[i], [xj, yj] = p[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
};
const PIXEL_M = ['110000011', '111000111', '110101011', '110010011', '110000011', '110000011', '110000011'];

export const LOGO_STYLES = [
  {
    name: 'Vintage-Abzeichen', bg: '#1b1a18', note: 'Rundes Werkstatt-Abzeichen mit Umschrift – Tradition, Handwerk, Patch für Arbeitskleidung.',
    svg: () => `<defs><path id="v3t" d="M34 100A66 66 0 0 1 166 100"/><path id="v3b" d="M24 100A76 76 0 0 0 176 100"/></defs>
<circle cx="100" cy="100" r="88" fill="none" stroke="#efe4cc" stroke-width="3"/><circle cx="100" cy="100" r="80" fill="none" stroke="#efe4cc" stroke-width="1.2"/>
<text font-size="15" font-weight="800" letter-spacing="3" fill="#efe4cc" font-family="${SANS}"><textPath href="#v3t" startOffset="50%" text-anchor="middle">MASTER KFZ</textPath></text>
<text font-size="9.5" font-weight="700" letter-spacing="2.5" fill="#efe4cc" font-family="${SANS}"><textPath href="#v3b" startOffset="50%" text-anchor="middle">BERLIN · NEUKÖLLN</textPath></text>
<circle cx="31" cy="100" r="3" fill="#d4302b"/><circle cx="169" cy="100" r="3" fill="#d4302b"/>
<path d="${poly(mPoints(70, 76, 60, 44))}" fill="#d4302b"/><rect x="70" y="128" width="60" height="3" fill="#efe4cc"/>`,
  },
  {
    name: 'Startnummer 51', bg: '#efe9dc', note: 'Rennsport-Startnummer – die 51 ist die Hausnummer. Eigene Geschichte, sofort wiedererkennbar.',
    svg: () => `<path d="M-10 160L160 -10H196L-10 196Z" fill="#d7261e"/><path d="M-10 204L204 -10H214L-10 214Z" fill="#14213d"/>
<circle cx="100" cy="94" r="56" fill="#fff" stroke="#111" stroke-width="6"/>
${T('51', 100, 120, 72, '#111', ' font-weight="900" font-style="italic" letter-spacing="-4"')}${T('MASTER KFZ', 100, 184, 18, '#111', ' font-weight="900" font-style="italic"')}`,
  },
  {
    name: 'Art déco', bg: '#0e0e0e', note: 'Strahlenkranz und doppelte Linienführung in Gold – Glanz der 1920er, Premium-Anmutung.',
    svg: () => `${Array.from({ length: 11 }, (_, i) => { const [x, y] = pt(100, 122, 74, 195 + i * 15); return `<path d="M100 122L${n(x)} ${n(y)}" stroke="#c9a646" stroke-width="1.2"/>`; }).join('')}
<path d="M26 122A74 74 0 0 1 174 122" fill="none" stroke="#c9a646" stroke-width="2"/>
<path d="M60 152V94L100 130L140 94V152" fill="none" stroke="#c9a646" stroke-width="9" stroke-linejoin="miter"/><path d="M60 152V94L100 130L140 94V152" fill="none" stroke="#0e0e0e" stroke-width="2.5" stroke-linejoin="miter"/>
<rect x="36" y="160" width="128" height="1.5" fill="#c9a646"/>${T('MASTER · KFZ', 100, 182, 11, '#c9a646', ' font-weight="600" letter-spacing="6"')}`,
  },
  {
    name: '70er-Streifen', bg: '#f3e7d3', note: 'Drei Retro-Streifen biegen sich zum M – warm, sympathisch, Garage-Kult.',
    svg: () => `${[['#6b3a1e', 40], ['#c8341f', 26], ['#e8742c', 12]].map(([c, w]) => `<path d="M44 152V72L100 126L156 72V152" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`).join('')}
${T('MASTER KFZ', 100, 186, 16, '#6b3a1e', ' font-weight="900" letter-spacing="2"')}`,
  },
  {
    name: 'Bauhaus', bg: '#f2f0ea', note: 'Quadrat, Dreieck, Kreis in Primärfarben – Berliner Designgeschichte, sehr eigenständig.',
    svg: () => `<rect x="40" y="56" width="28" height="100" fill="#111"/><rect x="132" y="56" width="28" height="100" fill="#111"/>
<path d="M68 56H132L100 118Z" fill="#d62718"/><circle cx="100" cy="142" r="13" fill="#f2c12e"/>${T('MASTER KFZ', 100, 186, 13, '#111', ' font-weight="700" letter-spacing="5"')}`,
  },
  {
    name: 'Swiss Typo', bg: '#ffffff', note: 'Reine Wortmarke mit rotem Punkt – maximal reduziert, wirkt wie eine Premiummarke.',
    svg: () => `${T('Master<tspan fill="#e3141c">.</tspan>', 100, 108, 50, '#111', ' font-weight="800" letter-spacing="-2.5"')}${T('KFZ-MEISTERWERKSTATT BERLIN', 100, 132, 8.5, '#6e6e73', ' font-weight="600" letter-spacing="2.2"')}`,
  },
  {
    name: 'Brutalismus', bg: '#d9d9d6', note: 'Schweres Block-M und harter Balken – laut, industriell, ehrlich.',
    svg: () => `<rect x="160" y="22" width="16" height="16" fill="#e3141c"/><path d="M24 148V42H64L100 92L136 42H176V148H140V98L100 148L60 98V148Z" fill="#111"/>
<rect x="24" y="156" width="152" height="24" fill="#111"/>${T('KFZ — NEUKÖLLN', 100, 173, 12, '#fff', ' font-weight="800" letter-spacing="3"')}`,
  },
  {
    name: 'Neon', bg: '#0a0614', note: 'Leuchtröhren-M wie ein Werkstattschild bei Nacht – stark für Social Media und Fassade.',
    svg: () => `<defs><filter id="g3n" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g filter="url(#g3n)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M58 138V66L100 112L142 66V138" stroke="#ff2d55" stroke-width="6"/><path d="M22 84H44M28 100H44M34 116H44" stroke="#22d3ee" stroke-width="5"/></g>
<g filter="url(#g3n)">${T('MASTER KFZ', 100, 176, 15, '#f5f5f7', ' font-weight="700" letter-spacing="4"')}</g>`,
  },
  {
    name: 'Blaupause', bg: '#0b3d91', note: 'Technische Zeichnung mit Maßlinien – Präzision und Ingenieurskunst als Marke.',
    svg: () => `${Array.from({ length: 9 }, (_, i) => `<path d="M${20 + i * 20} 10V190M10 ${20 + i * 20}H190" stroke="rgba(255,255,255,.1)" stroke-width="1"/>`).join('')}
<path d="${poly(mPoints(50, 62, 100, 78))}" fill="none" stroke="#fff" stroke-width="1.6"/>
<path d="M50 48H150M50 42V54M150 42V54M164 62V140M158 62H170M158 140H170" stroke="#fff" stroke-width="1"/>
${T('1000', 100, 44, 8, '#fff', '', MONO)}<text x="178" y="104" font-size="8" fill="#fff" font-family="${MONO}" transform="rotate(90 178 104)" text-anchor="middle">780</text>
${T('MASTER KFZ · BLATT 1/1', 100, 172, 8, '#fff', ' letter-spacing="2"', MONO)}`,
  },
  {
    name: 'Pixel', bg: '#111214', note: '8-Bit-M wie aus einem Diagnosegerät – verspielt, digital, jüngere Zielgruppe.',
    svg: () => `${PIXEL_M.map((row, y) => [...row].map((on, x) => (on === '1' ? `<rect x="${37 + x * 14}" y="${40 + y * 14}" width="13" height="13" fill="#ff3b30"/>` : '')).join('')).join('')}
<rect x="160" y="26" width="8" height="8" fill="#f5f5f7"/><rect x="170" y="16" width="8" height="8" fill="#f5f5f7"/>${T('MASTER_KFZ', 100, 168, 13, '#f5f5f7', ' font-weight="700" letter-spacing="2"', MONO)}`,
  },
  {
    name: 'Isometrie', bg: '#121214', note: 'Würfel in drei Rottönen, M auf der Seite – dreidimensional ohne Effekte.',
    svg: () => {
      const f = (u, v) => [48 + 52 * u, 70 + 30 * u + 60 * v];
      const m = [[0.2, 0.85], [0.2, 0.2], [0.5, 0.6], [0.8, 0.2], [0.8, 0.85]].map(([u, v]) => f(u, v).map(n).join(' ')).join('L');
      return `<path d="M100 40L152 70L100 100L48 70Z" fill="#ff4d4f"/><path d="M48 70L100 100V160L48 130Z" fill="#e3141c"/><path d="M100 100L152 70V130L100 160Z" fill="#8f0b10"/>
<path d="M${m}" fill="none" stroke="#fff" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>${T('MASTER KFZ', 100, 188, 13, '#f5f5f7', ' font-weight="800" letter-spacing="3"')}`;
    },
  },
  {
    name: 'Hanko-Stempel', bg: '#f4efe6', note: 'Quadratisches Siegel nach japanischem Vorbild – wirkt wie ein Qualitätsversprechen.',
    svg: () => `<rect x="44" y="44" width="112" height="112" rx="10" fill="#c8102e"/><rect x="52" y="52" width="96" height="96" rx="6" fill="none" stroke="#f4efe6" stroke-width="2"/>
${[['M', 78, 98], ['K', 122, 98], ['F', 78, 140], ['Z', 122, 140]].map(([c, x, y]) => T(c, x, y, 36, '#f4efe6', ' font-weight="900"')).join('')}
<path d="M50 70l10 1M140 58l6 4M150 130l-4 8M60 150l9-2M98 50l7 0" stroke="#f4efe6" stroke-width="2"/>`,
  },
  {
    name: 'Raster', bg: '#0f0f10', note: 'Halbton-Punkte mit ausgespartem M – grafisch, editorial, sehr modern.',
    svg: () => {
      const m = mPoints(56, 62, 88, 74);
      let out = '';
      for (let y = 12; y <= 188; y += 8) for (let x = 12; x <= 188; x += 8) {
        const d = Math.hypot(x - 100, y - 100);
        const r = d > 86 ? 0 : 1.3 + 2.6 * (1 - d / 86);
        if (r > 0 && !inPoly(x, y, m)) out += `<circle cx="${x}" cy="${y}" r="${n(r)}" fill="#e3141c"/>`;
      }
      return out;
    },
  },
  {
    name: 'Origami', bg: '#f5f5f7', note: 'M aus gefalteten Flächen in vier Rottönen – Tiefe, Präzision, Leichtigkeit.',
    svg: () => `<path d="M40 60L64 72V150H40Z" fill="#b3121a"/><path d="M40 60L100 118V142L64 104V72Z" fill="#e3141c"/><path d="M160 60L100 118V142L136 104V72Z" fill="#ff4d4f"/><path d="M160 60L136 72V150H160Z" fill="#8f0b10"/>
${T('MASTER KFZ', 100, 182, 14, '#1d1d1f', ' font-weight="800" letter-spacing="3"')}`,
  },
  {
    name: 'Typenschild', bg: '#2a2a2c', note: 'Gebürstetes Metallschild mit Nieten – wie das Typenschild im Motorraum.',
    svg: () => `<defs><linearGradient id="tp3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4e4e8"/><stop offset=".5" stop-color="#b9b9c0"/><stop offset="1" stop-color="#d6d6db"/></linearGradient></defs>
<rect x="24" y="50" width="152" height="100" rx="8" fill="url(#tp3)" stroke="#6e6e73"/>${[[34, 60], [166, 60], [34, 140], [166, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#6e6e73"/>`).join('')}
<text x="42" y="84" font-size="17" font-weight="800" fill="#1d1d1f" font-family="${MONO}">MASTER KFZ</text><rect x="42" y="92" width="116" height="1.5" fill="#6e6e73"/>
${['TYP  MEISTERWERKSTATT', 'ORT  12059 BERLIN', 'NR.  51'].map((l, i) => `<text x="42" y="${108 + i * 13}" font-size="7.5" fill="#3a3a3c" font-family="${MONO}">${l}</text>`).join('')}
<rect x="134" y="104" width="24" height="32" rx="2" fill="#e3141c"/>${T('M', 146, 127, 18, '#fff', ' font-weight="900"')}`,
  },
  {
    name: 'Luxus-Serif', bg: '#0e0e0e', note: 'Serifen-M im Goldring – Autohaus-Eleganz, spricht Premiumfahrer an.',
    svg: () => `<circle cx="100" cy="94" r="60" fill="none" stroke="#c9a646" stroke-width="1.2"/><circle cx="100" cy="94" r="54" fill="none" stroke="#c9a646" stroke-width=".6"/>
${T('M', 100, 122, 82, '#c9a646', ' font-style="italic"', SERIF)}${T('MASTER KFZ', 100, 182, 12, '#efe4cc', ' letter-spacing="7"', SERIF)}`,
  },
  {
    name: 'Prüfstempel', bg: '#f5f2ea', note: 'Abgenutzter Stempel „Geprüft“ – Vertrauen, Gründlichkeit, Meisterbetrieb.',
    svg: () => `<g transform="rotate(-8 100 100)"><rect x="26" y="60" width="148" height="80" rx="6" fill="none" stroke="#c8102e" stroke-width="4"/><rect x="34" y="68" width="132" height="64" rx="3" fill="none" stroke="#c8102e" stroke-width="1.2"/>
${T('GEPRÜFT', 100, 104, 27, '#c8102e', ' font-weight="900" letter-spacing="2"')}${T('MASTER KFZ · MEISTERBETRIEB', 100, 122, 7, '#c8102e', ' font-weight="700" letter-spacing="1.5"')}
<path d="M40 82l30 2M92 110l40-3M120 74l25 1M52 126l20-1M140 96l14 2" stroke="#f5f2ea" stroke-width="1.8"/></g>`,
  },
  {
    name: 'Chrom', bg: '#0b0b0c', note: 'Moderne Interpretation des Bestandslogos: Chrom-M mit rotem Schatten.',
    svg: () => `<defs><linearGradient id="chr3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".46" stop-color="#a3a8ad"/><stop offset=".5" stop-color="#3c3f44"/><stop offset="1" stop-color="#dcdfe3"/></linearGradient>
<linearGradient id="rd3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff4d4f"/><stop offset="1" stop-color="#a50e14"/></linearGradient></defs>
<path d="${poly(mPoints(46, 56, 116, 88, 144))}" fill="url(#rd3)" transform="translate(6 6)"/><path d="${poly(mPoints(46, 56, 116, 88, 144))}" fill="url(#chr3)"/>
${T('MASTER KFZ', 100, 182, 16, 'url(#chr3)', ' font-weight="900" font-style="italic" letter-spacing="1"')}`,
  },
  {
    name: 'Linien-Auto', bg: '#f5f5f7', note: 'Freundliche Auto-Front als Linienicon – sofort verständlich, ideal für Google Maps.',
    svg: () => `<g fill="none" stroke="#1d1d1f" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M44 120V100C44 92 50 86 58 84L70 60C72 56 76 54 80 54H120C124 54 128 56 130 60L142 84C150 86 156 92 156 100V120Z"/><path d="M74 62H126L136 84H64Z"/><path d="M84 100H116M84 108H116M52 120V132H70V120M130 120V132H148V120"/></g>
<circle cx="62" cy="102" r="7" fill="none" stroke="#e3141c" stroke-width="3"/><circle cx="138" cy="102" r="7" fill="none" stroke="#e3141c" stroke-width="3"/>
${T('MASTER KFZ', 100, 164, 17, '#1d1d1f', ' font-weight="800" letter-spacing="1"')}${T('WERKSTATT', 100, 180, 8, '#e3141c', ' font-weight="700" letter-spacing="5"')}`,
  },
  {
    name: 'Duoton-Kreis', bg: '#f5f5f7', note: 'Diagonal geteilter Kreis, weißes M quer darüber – klar, kontrastreich, plakativ.',
    svg: () => { const [ax, ay] = pt(100, 96, 66, -45), [bx, by] = pt(100, 96, 66, 135); return `<path d="M${n(ax)} ${n(ay)}A66 66 0 0 0 ${n(bx)} ${n(by)}Z" fill="#e3141c"/><path d="M${n(ax)} ${n(ay)}A66 66 0 0 1 ${n(bx)} ${n(by)}Z" fill="#111"/>
<path d="${poly(mPoints(64, 72, 72, 50))}" fill="#fff"/>${T('MASTER KFZ', 100, 186, 13, '#111', ' font-weight="800" letter-spacing="4"')}`; },
  },
  {
    name: 'U-Bahn-Kacheln', bg: '#e9e4d8', note: 'Gekachelte Schrifttafel wie in Berliner U-Bahnhöfen – lokal, nostalgisch, unverwechselbar.',
    svg: () => `${Array.from({ length: 6 }, (_, r) => Array.from({ length: 16 }, (_, c) => `<rect x="${20 + c * 10}" y="${64 + r * 12}" width="9.2" height="11.2" fill="${(r * 3 + c * 7) % 5 ? '#c8102e' : '#b30d29'}"/>`).join('')).join('')}
${T('MASTER KFZ', 100, 108, 22, '#fff', ' font-weight="800" letter-spacing="1"')}${T('Treptower Str. 51', 100, 156, 9, '#555', ' font-weight="600" letter-spacing="1"')}`,
  },
  {
    name: 'Emailleschild', bg: '#e7e2d6', note: 'Altes Emaille-Werkstattschild mit Schrauben – Charme der Traditionswerkstatt.',
    svg: () => `<rect x="18" y="52" width="164" height="96" rx="14" fill="#f1ead8" stroke="#1f3a68" stroke-width="6"/><rect x="28" y="62" width="144" height="76" rx="8" fill="none" stroke="#1f3a68" stroke-width="1.5"/>
${[[32, 66], [168, 66], [32, 134], [168, 134]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#8a8a8a"/>`).join('')}
${T('MASTER KFZ', 100, 106, 20, '#c8102e', ' font-weight="900"')}${T('KFZ-MEISTERWERKSTATT', 100, 124, 7.5, '#1f3a68', ' font-weight="700" letter-spacing="2.2"')}`,
  },
  {
    name: 'Reifenspur', bg: '#f2f2f2', note: 'Das M als Reifenabdruck mit Profilblöcken – Bewegung und Reifenservice in einem.',
    svg: () => `<path d="M44 154V66L100 120L156 66V154" fill="none" stroke="#1d1d1f" stroke-width="24" stroke-dasharray="7 4" stroke-linejoin="round"/><path d="M44 154V66L100 120L156 66V154" fill="none" stroke="#f2f2f2" stroke-width="3" stroke-linejoin="round"/>
<rect x="44" y="170" width="112" height="4" fill="#e3141c"/>`,
  },
  {
    name: 'Kontrast-M', bg: '#f5f2ea', note: 'Bodoni-artiger Wechsel von Haar- und Grundstrich – edel, redaktionell, zeitlos.',
    svg: () => `<g fill="#111"><rect x="52" y="56" width="5" height="92"/><path d="M52 56H72L106 138L100 150Z"/><path d="M143 56H149L103 150H100Z"/><rect x="132" y="56" width="18" height="92"/>
<rect x="42" y="52" width="26" height="4"/><rect x="40" y="146" width="28" height="4"/><rect x="124" y="52" width="34" height="4"/><rect x="122" y="146" width="38" height="4"/></g>
<circle cx="168" cy="146" r="5" fill="#c8102e"/>${T('MASTER KFZ', 100, 182, 12, '#111', ' letter-spacing="8"', SERIF)}`,
  },
];

export const styleSvg = (s, cls = 'l3') => `<svg class="${cls}" viewBox="0 0 200 200" role="img" aria-label="${s.name}">${s.svg()}</svg>`;
