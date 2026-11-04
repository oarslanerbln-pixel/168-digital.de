/*
 * Build-time CSS pass. Two jobs, both measured with Lighthouse:
 *  1. Rules that only style the internal review boards (/logo-konzepte/, /ui-stile/) are left
 *     out of site.css – about 18 % that every visitor otherwise downloads before the first
 *     paint. The boards load boards.css instead: the complete sheet in source order, so the
 *     cascade there is exactly what was designed.
 *  2. Comments and indentation go. The source keeps its explanatory comments.
 * The parser handles exactly what site.css contains: plain rules plus one level of
 * @media/@supports nesting; everything else (@font-face, @keyframes) stays in the main file.
 */
const BOARD = /\.(lx-|lc\b|lc__|l3-|pal-|ui-demo|ui-(?!carbon\b)[a-z]+)|\bis-board\b/;
const isBoard = (selector) => selector.split(',').every((s) => BOARD.test(s));

function blocks(css) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}' && --depth === 0) { out.push(css.slice(start, i + 1).trim()); start = i + 1; }
  }
  return out.filter(Boolean);
}

const tidy = (css) => css
  .replace(/\s+/g, ' ')
  .replace(/\s*([{};,>])\s*/g, '$1')
  .replace(/;}/g, '}');

export function splitCss(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const main = [];
  for (const b of blocks(css)) {
    const head = b.slice(0, b.indexOf('{')).trim();
    if (/^@(media|supports)/.test(head)) {
      const inner = blocks(b.slice(b.indexOf('{') + 1, -1));
      const keep = inner.filter((r) => !isBoard(r.slice(0, r.indexOf('{'))));
      if (keep.length) main.push(`${head}{${keep.join('')}}`);
    } else if (!head.startsWith('@') && isBoard(head)) continue;
    else main.push(b);
  }
  return { main: tidy(main.join('')), all: tidy(blocks(css).join('')) };
}
