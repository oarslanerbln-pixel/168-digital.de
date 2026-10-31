/*
 * 40 further logo directions for the client's review (/logo-konzepte/).
 * Each mark is pure geometry in a 100 × 100 box — no fonts — so it renders
 * the same on a dark tile, a light tile and as an app icon. Knock-outs use
 * the tile colour (`kf`, `cut` → var(--tile)) instead of masks, which keeps
 * every mark self-contained and id-free.
 *
 * Classes: r red · rd deep red · s silver · sr/ss red/silver stroke ·
 * kf tile-coloured fill · cut tile-coloured stroke · dim faint silver.
 */
import { mPoints } from './svg.mjs';

const n = (v) => +v.toFixed(2);
const poly = (pts) => 'M' + pts.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') + 'Z';
const P = (d, c = 'r', a = '') => `<path class="${c}" d="${d}"${a}/>`;
const C = (cx, cy, r, c = 'r', a = '') => `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"${a}/>`;
const R = (x, y, w, h, c = 'r', a = '') => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="${h}"${a}/>`;
const sw = (w) => ` stroke-width="${w}"`;
const M = (x, y, w, h, c = 'r', skew = null) => P(poly(mPoints(x, y, w, h, skew)), c);
const pt = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
const arc = (cx, cy, r, a0, a1) => {
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  return `M${n(x0)} ${n(y0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${n(x1)} ${n(y1)}`;
};
const sector = (cx, cy, r1, r2, a0, a1) => {
  const [ax, ay] = pt(cx, cy, r2, a0), [bx, by] = pt(cx, cy, r2, a1), [cx2, cy2] = pt(cx, cy, r1, a1), [dx, dy] = pt(cx, cy, r1, a0);
  return `M${n(ax)} ${n(ay)}A${r2} ${r2} 0 0 1 ${n(bx)} ${n(by)}L${n(cx2)} ${n(cy2)}A${r1} ${r1} 0 0 0 ${n(dx)} ${n(dy)}Z`;
};
const ngon = (cx, cy, r, k, rot = 0) => poly(Array.from({ length: k }, (_, i) => pt(cx, cy, r, rot + (360 / k) * i)));
const ring = (count, f) => Array.from({ length: count }, (_, i) => f((360 / count) * i, i)).join('');
const gear = (cx, cy, rIn, rOut, teeth) => {
  const step = 360 / teeth;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step - 90;
    const w = step * 0.22;
    pts.push(pt(cx, cy, rIn, a - w * 1.4), pt(cx, cy, rOut, a - w), pt(cx, cy, rOut, a + w), pt(cx, cy, rIn, a + w * 1.4));
  }
  return poly(pts);
};
const tick = (cx, cy, r1, r2, deg) => {
  const [a, b] = pt(cx, cy, r1, deg), [c, d] = pt(cx, cy, r2, deg);
  return `M${n(a)} ${n(b)}L${n(c)} ${n(d)}`;
};
const DOTS = ['10001', '11011', '10101', '10001', '10001'];

export const LOGO_SET = [
  /* Monograms */
  { name: 'Schnitt-M', wm: 'italic', note: 'Kursives M, diagonal durchtrennt – Dynamik ohne Zusatzelemente.', svg: () => M(14, 22, 70, 56, 'r', 78) + P('M8 74L92 30', 'cut', sw(5)) },
  { name: 'Schablone', wm: 'wide', note: 'Stencil-M wie auf Werkzeugkisten gesprüht – rau, handwerklich.', svg: () => M(15, 20, 70, 60) + P('M8 40H92M8 60H92', 'cut', sw(4)) },
  { name: 'Linien-M', wm: 'light', note: 'Ein durchgehender Strich – reduziert, sehr gut stickbar.', svg: () => P('M15 80V22L50 62L85 22V80', 'sr', sw(10)) },
  { name: 'Zwei Gipfel', wm: 'stack', note: 'Zwei Dreiecke ergeben das M – stabil, ruhig, präzise.', svg: () => P('M6 80L30 28L54 80Z', 's') + P('M42 80L68 20L94 80Z') },
  { name: 'Ring-M', wm: 'italic', note: 'M im Ring – funktioniert als Stempel, Aufkleber, Profilbild.', svg: () => C(50, 50, 40, 'sr', sw(6)) + M(30, 33, 40, 34) },
  { name: 'App-Kachel', wm: 'wide', note: 'Ausgestanztes M in roter Kachel – sofort als App-Icon nutzbar.', svg: () => R(10, 10, 80, 80, 'r', ' rx="20"') + M(25, 31, 50, 38, 'kf') },
  { name: 'Kolben-M', wm: 'mono', note: 'Zwei Zylinder, dazwischen das V – Motorenbau als Buchstabe.', svg: () => R(12, 20, 14, 62, 's', ' rx="3"') + R(74, 20, 14, 62, 's', ' rx="3"') + P('M28 20L50 54L72 20V40L50 74L28 40Z') },
  { name: 'Zielflagge', wm: 'italic', note: 'Kursives M plus Karo-Flagge – Tempo und Ziel erreicht.', svg: () => M(6, 26, 54, 48, 'r', 74) + [0, 1, 2, 3].map((row) => [0, 1].map((col) => R(66 + col * 13, 26 + row * 12, 13, 12, (row + col) % 2 ? 'dim' : 's')).join('')).join('') },
  { name: 'Doppel-Chevron', wm: 'stack', note: 'Zwei Winkel nach oben: Fortschritt, Leistung, „hoch hinaus“.', svg: () => P('M10 76L30 30L50 76', 'ss', sw(11)) + P('M50 76L70 30L90 76', 'sr', sw(11)) },
  { name: 'Faltband', wm: 'light', note: 'Zweifarbiges M wie ein gefaltetes Band – Tiefe ohne Verlauf.', svg: () => P('M14 80V20H30L50 52V74L30 44V80Z', 'rd') + P('M50 52L70 20H86V80H70V44L50 74Z') },
  /* Ligatures & plates */
  { name: 'MK-Ligatur', wm: 'wide', note: 'M und K teilen sich einen Strich – Master + KFZ in einem Zeichen.', svg: () => M(6, 22, 56, 56) + P('M62 50L82 22H95L71 54Z', 's') + P('M66 48L95 78H82L62 56Z', 's') },
  { name: 'Werkstatt-Siegel', wm: 'stack', note: 'Quadratisches Siegel mit Unterstreichung – amtlich, verlässlich.', svg: () => R(12, 12, 76, 76, 'ss', sw(4) + ' rx="6"') + M(25, 22, 50, 32) + R(25, 62, 50, 6, 's') + R(25, 74, 30, 4, 's') },
  { name: 'Kennzeichen', wm: 'mono', note: 'Nummernschild mit rotem Länderstreifen – jeder kennt die Form.', svg: () => R(4, 30, 92, 40, 'ss', sw(3) + ' rx="6"') + R(8, 34, 12, 32, 'r', ' rx="3"') + M(28, 40, 34, 20, 's') + R(70, 40, 18, 5, 's') + R(70, 48, 13, 5, 's') + R(70, 56, 8, 5, 's') },
  /* Workshop objects */
  { name: 'Gekreuzte Schlüssel', wm: 'italic', note: 'Zwei Maulschlüssel im X – klassisches Werkstatt-Wappen.', svg: () => ['s', 'r'].map((c, i) => `<g transform="rotate(${i ? -40 : 40} 50 50)">${C(50, 20, 13, c)}${R(44.5, 4, 11, 13, 'kf')}${R(45, 28, 10, 58, c, ' rx="5"')}</g>`).join('') },
  { name: 'Kolben', wm: 'wide', note: 'Kolben mit Pleuel – Herzstück jedes Motors.', svg: () => R(24, 12, 52, 32, 's', ' rx="4"') + R(24, 20, 52, 3, 'kf') + R(24, 27, 52, 3, 'kf') + P('M43 46L37 80H63L57 46Z', 's') + C(50, 46, 8) + C(50, 84, 9, 'sr', sw(5)) },
  { name: 'Zündkerze', wm: 'stack', note: 'Zündkerze mit Funken – der Moment, in dem der Motor anspringt.', svg: () => R(44, 6, 12, 10, 's', ' rx="2"') + P('M40 16H60L58 44H42Z', 's') + R(32, 44, 36, 13) + P('M40 61H60M40 67H60M40 73H60', 'ss', sw(3)) + P('M50 78V88H60', 'sr', sw(4)) + P('M70 78l6-8v6l6-8', 'sr', sw(3)) },
  { name: 'Drehzahlmesser', wm: 'light', note: 'Tacho mit Nadel im roten Bereich – Leistung auf einen Blick.', svg: () => P(arc(50, 60, 38, 150, 330), 'ss', sw(6)) + P(arc(50, 60, 38, 330, 390), 'sr', sw(6)) + ring(9, (a, i) => P(tick(50, 60, 26, 31, 150 + i * 30), 'ss', sw(2.5))) + P(tick(50, 60, 0, 32, 305), 'sr', sw(5)) + C(50, 60, 6, 's') },
  { name: 'Lenkrad', wm: 'italic', note: 'Lenkrad mit roter Nabe – Kontrolle, Sicherheit, Vertrauen.', svg: () => C(50, 50, 38, 'ss', sw(8)) + P('M14 48H40M60 48H86M50 64V86', 'ss', sw(8)) + C(50, 52, 12) },
  { name: 'Reifen', wm: 'mono', note: 'Reifenprofil im Ring, rote Felge – Reifenservice als Marke.', svg: () => C(50, 50, 42, 's') + ring(18, (a) => P(sector(50, 50, 36, 43, a, a + 8), 'kf')) + C(50, 50, 30, 'kf') + C(50, 50, 18) + ring(5, (a) => C(...pt(50, 50, 10, a - 90), 2.6, 'kf')) },
  { name: 'Bremsscheibe', wm: 'wide', note: 'Gelochte Bremsscheibe mit rotem Sattel – Sportwagen-Ästhetik.', svg: () => C(50, 50, 38, 's') + C(50, 50, 13, 'kf') + ring(12, (a) => C(...pt(50, 50, 26, a), 2.8, 'kf')) + P(sector(50, 50, 30, 46, -75, -5)) },
  { name: 'Hebebühne', wm: 'stack', note: 'Auto auf der Hebebühne – zeigt sofort: Hier wird geschraubt.', svg: () => R(10, 22, 8, 64, 's') + R(82, 22, 8, 64, 's') + R(10, 56, 80, 5, 's') + P('M20 52C22 44 28 41 38 39L48 30H64L75 39C82 40 84 46 84 52Z') + C(34, 52, 5, 'kf') + C(70, 52, 5, 'kf') },
  { name: 'Straße', wm: 'light', note: 'Fluchtende Straße mit Mittelstreifen – formt zugleich ein A/M.', svg: () => P('M8 88L42 16H58L92 88H76L54 34H46L24 88Z', 's') + R(47, 70, 6, 13) + R(47.5, 52, 5, 10) + R(48, 38, 4, 7) },
  { name: 'Scheinwerfer', wm: 'italic', note: 'Lichtkegel nach vorn – Durchblick, Klarheit, Diagnose.', svg: () => P('M12 32A18 18 0 0 1 12 68Z') + P('M34 38L90 22M34 50H92M34 62L90 78', 'ss', sw(6)) },
  { name: 'Sechskant', wm: 'mono', note: 'Schraubenkopf mit M – solide, technisch, zeitlos.', svg: () => P(ngon(50, 50, 44, 6, 30), 's') + C(50, 50, 28, 'kf') + M(36, 40, 28, 20) },
  { name: 'Ratsche', wm: 'wide', note: 'Ratschenkopf mit rotem Innensechskant – Präzisionswerkzeug.', svg: () => R(44, 42, 12, 50, 's', ' rx="6"') + C(50, 30, 24, 's') + C(50, 30, 14, 'kf') + P(ngon(50, 30, 10, 6)) },
  { name: 'Zahnrad-Stanze', wm: 'stack', note: 'Rotes Zahnrad, M ausgestanzt – kräftig, auch einfarbig druckbar.', svg: () => P(gear(50, 50, 38, 47, 12)) + M(30, 36, 40, 30, 'kf') },
  /* Emblems */
  { name: 'Wappen geteilt', wm: 'italic', note: 'Wappenschild rot/silber geteilt, M ausgespart – Tradition, Meisterbrief.', svg: () => P('M50 8H16V48C16 70 31 84 50 93Z') + P('M50 8H84V48C84 70 69 84 50 93Z', 's') + M(31, 32, 38, 30, 'kf') },
  { name: 'Flügel', wm: 'wide', note: 'Geflügeltes M – klassisches Automobil-Emblem, neu gezeichnet.', svg: () => M(37, 30, 26, 30) + [34, 44, 54].map((y, i) => P(`M34 ${y}H${6 + i * 8}L${12 + i * 8} ${y + 6}H34Z`, 's') + P(`M66 ${y}H${94 - i * 8}L${88 - i * 8} ${y + 6}H66Z`, 's')).join('') },
  { name: 'Tacho-M', wm: 'light', note: 'M unter einem Skalenbogen – Werkstatt trifft Messtechnik.', svg: () => P(arc(50, 64, 42, 200, 340), 'ss', sw(5)) + C(...pt(50, 64, 42, 340), 4.5) + M(28, 46, 44, 34) },
  { name: 'Öltropfen', wm: 'stack', note: 'Roter Tropfen mit M – direkt verständlich für Ölwechsel & Service.', svg: () => P('M50 6C50 6 20 44 20 62A30 30 0 0 0 80 62C80 44 50 6 50 6Z') + M(35, 52, 30, 22, 'kf') },
  { name: 'Sucher', wm: 'mono', note: 'Eckklammern wie ein Diagnose-Sucher – „wir finden den Fehler“.', svg: () => P('M12 30V12H30M70 12H88V30M88 70V88H70M30 88H12V70', 'ss', sw(5)) + M(26, 32, 46, 36, 'r', 68) },
  { name: 'Punktmatrix', wm: 'mono', note: 'M aus Punkten wie auf einem Diagnose-Display – digital, modern.', svg: () => DOTS.map((row, y) => [...row].map((on, x) => C(16 + x * 17, 16 + y * 17, 6, on === '1' ? 'r' : 'dim')).join('')).join('') },
  { name: 'Fahrtwind', wm: 'italic', note: 'Kursives M, von feinen Linien durchzogen – Bewegung, Windkanal.', svg: () => M(10, 18, 76, 64, 'r', 82) + P('M4 32H96M4 42H96M4 52H96M4 62H96M4 72H96', 'cut', sw(2.2)) },
  { name: 'Kontur-M', wm: 'wide', note: 'Nur die Kontur – leicht, elegant, ideal für Folierung auf Glas.', svg: () => P(poly(mPoints(16, 18, 68, 56)), 'sr', sw(5)) + R(16, 84, 68, 5, 's') },
  { name: 'Bogen-M', wm: 'light', note: 'Zwei Bögen statt Spitzen – freundlicher, nahbarer Charakter.', svg: () => P('M16 84V46A17 17 0 0 1 50 46V84M50 46A17 17 0 0 1 84 46V84', 'sr', sw(12)) },
  { name: 'Sechseck-Plakette', wm: 'stack', note: 'Sechseckige Plakette – erinnert an Prüfsiegel und Schraubenkopf.', svg: () => P(ngon(50, 50, 44, 6, 0), 'ss', sw(5)) + M(29, 35, 42, 30) },
  { name: 'Raute', wm: 'italic', note: 'Rote Raute mit ausgespartem M – kompakt, stark auf Schildern.', svg: () => P('M50 4L96 50L50 96L4 50Z') + M(30, 38, 40, 26, 'kf') },
  { name: 'Rennstreifen', wm: 'wide', note: 'Drei schräge Streifen – Motorsport-Zitat ohne Buchstaben.', svg: () => P('M10 82L32 18H46L24 82Z', 's') + P('M36 82L58 18H72L50 82Z') + P('M62 82L84 18H98L76 82Z', 's') },
  { name: 'Berlin-Turm', wm: 'stack', note: 'Fernsehturm in Werkstattfarben – lokaler Anker für „Berlin“.', svg: () => R(48.5, 4, 3, 20, 's') + C(50, 34, 17, 'ss', sw(2)) + C(50, 34, 12) + P('M46 46H54L57 94H43Z', 's') },
  { name: 'Ziffernblatt', wm: 'mono', note: 'Rundes Siegel mit Skala – Pünktlichkeit und Präzision.', svg: () => C(50, 50, 44, 'ss', sw(2)) + ring(24, (a, i) => P(tick(50, 50, i % 2 ? 36 : 32, 40, a), i ? 'ss' : 'sr', sw(i ? 2 : 4))) + M(31, 37, 38, 28) },
];

const WORDMARKS = {
  italic: '<span class="wm wm--italic"><b>MASTER</b><i>KFZ</i></span>',
  wide: '<span class="wm wm--wide"><b>MASTER</b><i>KFZ</i></span>',
  stack: '<span class="wm wm--stack"><b>MASTER</b><small>KFZ-WERKSTATT</small></span>',
  light: '<span class="wm wm--light"><span>MASTER</span><b>KFZ</b></span>',
  mono: '<span class="wm wm--mono">MASTER<i>/KFZ</i></span>',
};

export const logoSetSvg = (concept, cls = 'lx') =>
  `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true" focusable="false">${concept.svg()}</svg>`;
export const wordmark = (v) => WORDMARKS[v];
