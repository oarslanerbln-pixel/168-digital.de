/* Builds docs/logo-shortlist.pdf from the logo modules. Needs Playwright (preinstalled in the cloud container): node tools/logo-pdf.cjs */
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const root = require('path').resolve(__dirname, '..') + '/';
  const { LOGO_SET, logoSetSvg, wordmark } = await import(root + 'src/logos.mjs');
  const { LOGO_STYLES, styleSvg } = await import(root + 'src/logos-r3.mjs');
  const { LOGO_R4, r4Svg } = await import(root + 'src/logos-r4.mjs');
  const { LOGO_R5, r5Svg } = await import(root + 'src/logos-r5.mjs');
  const { LOGO_R6, r6Svg } = await import(root + 'src/logos-r6.mjs');
  const css = fs.readFileSync(root + 'static/css/site.css', 'utf8');
  const r2 = (i, ref) => ({ ref, name: LOGO_SET[i].name, bg: '#000', note: LOGO_SET[i].note, svg: (c) => `<div class="lx-card pal-1 r2w"><div class="r2t">${logoSetSvg(LOGO_SET[i], 'lx ' + c)}${wordmark(LOGO_SET[i].wm)}</div></div>`, mark: (c) => `<span class="lx-card pal-1" style="--tile:#000;display:contents">${logoSetSvg(LOGO_SET[i], 'lx ' + c)}</span>` });
  const r3 = (i, ref) => ({ ref, name: LOGO_STYLES[i].name, bg: LOGO_STYLES[i].bg, note: LOGO_STYLES[i].note, svg: (c) => styleSvg(LOGO_STYLES[i], c) });
  const r4 = (i, ref) => ({ ref, name: LOGO_R4[i].name, bg: LOGO_R4[i].bg, note: `Ausarbeitung auf Basis ${LOGO_R4[i].base}.`, svg: (c) => r4Svg(LOGO_R4[i], i, c) });
  const r5 = (fam) => LOGO_R5.map((l, i) => ({ l, i })).filter(({ l }) => l.family === fam).map(({ l, i }) => ({ ref: 'neu', name: l.name, bg: l.bg, note: 'Neue Alternative für diese Familie.', svg: (c) => r5Svg(l, i, c) }));
  const r6 = (fam) => LOGO_R6.map((l, i) => ({ l, i })).filter(({ l }) => l.family === fam).map(({ l, i }) => ({ ref: 'neu', name: l.name, bg: l.bg, note: fam === 'wappen' ? 'Realistische Plakette: Metallrand, Emaille-Feld, geprägtes M, Glanzlicht – druckt scharf, da reiner Vektor.' : 'Neue Alternative für diese Familie.', svg: (c) => r6Svg(l, i, c) }));
  const fams = [
    ['Flügel', 'Geflügeltes M – klassisches Automobil-Emblem, deine stärkste Familie.', [r2(27, '28'), r4(9, 'V10'), r4(10, 'V11'), r4(11, 'V12'), r4(13, 'V14'), r4(14, 'V15'), r4(15, 'V16'), r4(16, 'V17'), r4(42, 'V43')]],
    ['Wappen', 'Schild mit M – jetzt auch als realistische Plakette mit Metallrand, Emaille und Prägung.', [...r6('wappen'), r4(4, 'V05'), ...r5('kontur')]],
    ['Swiss Typo', 'Reine Wortmarke – maximal reduziert, wirkt wie eine Premiummarke.', [r3(5, 'S06'), r4(23, 'V24'), r4(24, 'V25'), ...r6('swiss')]],
    ['Origami', 'M aus gefalteten Flächen – Tiefe ohne Effekte.', [r3(13, 'S14'), r4(34, 'V35'), r4(35, 'V36'), ...r6('origami')]],
    ['Isometrie', 'Würfel mit M – dreidimensional und technisch.', [r3(10, 'S11'), r4(30, 'V31'), ...r5('iso'), ...r6('iso')]],
    ['Raster', 'Halbton-Punkte mit ausgespartem M – grafisch und modern.', [r3(12, 'S13'), ...r5('raster'), ...r6('raster')]],
    ['Neon', 'Leuchtröhren-Look – stark für Social Media und Fassade.', [r4(26, 'V27'), ...r5('neon'), ...r6('neon')]],
    ['Chrom', 'Chrom-M – moderne Fortführung des Bestandslogos.', [r4(41, 'V42'), ...r5('chrom'), ...r6('chrom')]],
    ['Schablone', 'Stencil-M – handwerklich, robust, Werkstatt-Charakter.', [r2(1, '02'), ...r5('stencil'), ...r6('stencil')]],
  ];
  const total = fams.reduce((a, f) => a + f[2].length, 0);
  const id = (fi, li) => `l-${fi + 1}-${li + 1}`;
  const big = (it) => `<div class="tile" style="background:${it.bg}">${it.svg('bigsvg')}</div>`;
  let pages = `<section class="page cover"><div><p class="k">MASTER KFZ · LOGO-AUSWAHL</p><h1>Deine Shortlist.<br><em>Neu sortiert.</em></h1><p class="lead">${total} Entwürfe in ${fams.length} Familien – aus deinen Favoriten plus weiteren Alternativen; das Wappen jetzt auch als realistische Plakette. Neue Nummerierung: <b>Familie.Variante</b> (z. B. 1.3).</p><p class="meta">Oktober 2026 · 1618 Digital</p></div></section>`;
  pages += `<section class="page toc"><h2 id="inhalt">Inhalt</h2><div class="tocgrid">${fams.map(([t, d, items], fi) => `<div><a class="tf" href="#fam-${fi + 1}"><b>${fi + 1}</b> ${t}</a><ul>${items.map((it, li) => `<li><a href="#${id(fi, li)}">${fi + 1}.${li + 1} &nbsp;${it.name}</a> <span>${it.ref === 'neu' ? '<i>neu</i>' : 'vorher ' + it.ref}</span></li>`).join('')}</ul></div>`).join('')}</div></section>`;
  fams.forEach(([t, d, items], fi) => {
    pages += `<section class="page fam" id="fam-${fi + 1}"><p class="k">FAMILIE ${fi + 1}</p><h2>${t}</h2><p class="lead">${d}</p><div class="famgrid">${items.map((it, li) => `<a href="#${id(fi, li)}" class="fcard"><div class="tile" style="background:${it.bg}">${it.svg('smsvg')}</div><p><b>${fi + 1}.${li + 1}</b> ${it.name}</p></a>`).join('')}</div><a class="back" href="#inhalt">← Inhalt</a></section>`;
    items.forEach((it, li) => {
      pages += `<section class="page det" id="${id(fi, li)}"><div class="detl">${big(it)}</div><div class="detr"><p class="k">FAMILIE ${fi + 1} · ${t.toUpperCase()}</p><p class="num">${fi + 1}.${li + 1}</p><h3>${it.name}</h3><p class="ref">${it.ref === 'neu' ? 'Neue Alternative' : 'Vorher: ' + it.ref}</p><p class="note">${it.note}</p>
<p class="k" style="margin-top:28px">GRÖSSENTEST</p><div class="sizes">${[128, 64, 32].map((s) => `<div><div class="tile" style="background:${it.bg};width:${s}px;height:${s}px">${it.svg('szsvg')}</div><span>${s} px</span></div>`).join('')}</div>
<div class="nav"><a href="#fam-${fi + 1}">← ${t}</a><a href="#inhalt">Inhalt</a></div></div></section>`;
    });
  });
  let html = `<!DOCTYPE html><html lang="de"><head><meta charset="utf-8"><style>${css}
@page{size:A4 landscape;margin:0}html,body{background:#0b0b0c}body{padding:0!important;font-family:-apple-system,'Helvetica Neue',Arial,'DejaVu Sans',sans-serif}
.page{width:297mm;height:210mm;page-break-after:always;break-after:page;position:relative;overflow:hidden;background:#0b0b0c;color:#f5f5f7;padding:18mm 20mm;box-sizing:border-box}
.k{font:600 9pt ui-monospace,Menlo,'DejaVu Sans Mono',monospace;letter-spacing:.18em;color:#ff3138;margin:0}
.cover{display:flex;align-items:flex-end;background:radial-gradient(70% 60% at 85% 10%,rgba(227,20,28,.35),transparent 70%),#0b0b0c}
.cover h1{font-size:60pt;line-height:.95;letter-spacing:-.04em;margin:14px 0 18px}.cover h1 em{color:#e3141c}
.lead{font-size:13pt;color:#a1a1a6;max-width:150mm;line-height:1.5}.meta{margin-top:18mm;color:#6e6e73;font-size:10pt}
.toc h2,.fam h2{font-size:34pt;letter-spacing:-.03em;margin:6px 0 10px}
.tocgrid{columns:4;column-gap:9mm;margin-top:5mm;font-size:7.6pt}.tocgrid>div{break-inside:avoid;margin-bottom:4mm}
.tf{display:block;font-size:12pt;font-weight:700;color:#f5f5f7;text-decoration:none;margin-bottom:2mm}.tf b{color:#e3141c;margin-right:4px}
.tocgrid ul{list-style:none;padding:0;margin:0}.tocgrid li{display:flex;justify-content:space-between;gap:6px;padding:.7mm 0;border-bottom:1px solid #222}.tocgrid li a{color:#d1d1d6;text-decoration:none}.tocgrid li span{color:#6e6e73}.tocgrid i{color:#ff3138;font-style:normal}
.famgrid{display:grid;grid-template-columns:repeat(6,1fr);gap:4mm;margin-top:6mm}.fcard{color:#f5f5f7;text-decoration:none}.fcard p{font-size:9pt;margin:2mm 0 0}.fcard b{color:#ff3138;margin-right:3px}
.tile{display:grid;place-items:center;border-radius:4mm;overflow:hidden;aspect-ratio:1}.tile svg{width:86%;height:86%}
.det{display:grid;grid-template-columns:174mm 1fr;gap:12mm;align-items:center}.detl .tile{width:174mm;height:174mm;border-radius:6mm}
.num{font-size:64pt;font-weight:800;letter-spacing:-.05em;line-height:1;margin:6px 0 4px;color:#e3141c}.detr h3{font-size:22pt;margin:0}.ref{color:#6e6e73;margin:4px 0 14px}.note{color:#a1a1a6;line-height:1.5}
.sizes{display:flex;align-items:flex-end;gap:6mm;margin-top:4mm}.sizes span{display:block;font-size:8pt;color:#6e6e73;margin-top:2mm}.sizes .tile{border-radius:2mm}
.nav{position:absolute;bottom:14mm;display:flex;gap:8mm;font-size:9pt}.nav a,.back{color:#a1a1a6;text-decoration:none}.back{position:absolute;bottom:14mm;left:20mm;font-size:9pt}
.r2w{--tile:#000;display:grid;place-items:center;width:100%;height:100%;border:0;background:none;border-radius:0}.r2t{display:flex;flex-direction:column;align-items:center;gap:6%;color:#f5f5f7;width:100%}.r2t .wm{color:#f5f5f7}.r2t b{color:#f5f5f7}.r2t .bigsvg{width:300px;height:auto}.r2t .bigsvg+.wm{font-size:40px}.r2t .smsvg{width:56%;height:auto}.r2t .smsvg+.wm{font-size:10px}.r2t .szsvg{width:70%;height:auto}
.smsvg + .wm{font-size:9px}.szsvg + .wm{display:none}
</style></head><body>${pages}</body></html>`;
  html = html.replace(/<text([^>]*?)fill="url\(#[^)]*\)"/g, '<text$1fill="#d9dce0"');
  fs.writeFileSync('/tmp/logo-shortlist.html', html);
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(html, { waitUntil: 'load' });
  const opts = { path: root + 'docs/logo-shortlist.pdf', format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true };
  try { await p.pdf({ ...opts, outline: true, tagged: true }); } catch (e) { console.log('no outline', e.message.slice(0, 80)); await p.pdf(opts); }
  await p.setViewportSize({ width: 1123, height: 794 });
  await p.screenshot({ path: '/tmp/logo-pdf-p1.png', fullPage: false });
  await b.close();
  console.log('pages', 2 + fams.length + total);
})();
