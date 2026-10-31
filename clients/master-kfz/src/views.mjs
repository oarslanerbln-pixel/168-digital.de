/*
 * HTML templates. Every page is rendered at build time into static HTML —
 * crawlers and AI answer engines read the full content without running JS;
 * site.js only adds motion and the booking wizard on top.
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { business, services, priceGroups, featuredPrices, brands, routes, servicePath, SITE_URL, LANGS, mapsUrl, UI_STYLE } from './data.mjs';
import { icon, iconPro, carSvg, carPremium, gearSvg, logoMark } from './svg.mjs';
import { schemaGraph } from './schema.mjs';
import { LOGO_SET, LOGO_PALETTES, logoSetSvg, wordmark } from './logos.mjs';
import { LOGO_STYLES, styleSvg } from './logos-r3.mjs';
import { LOGO_R4, r4Svg } from './logos-r4.mjs';

export const e = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);

/* Runs before first paint: flips no-js → js and decides once per session whether the intro plays. */
const BOOT =
  "(function(h){h.className=h.className.replace('no-js','js');try{if(h.hasAttribute('data-intro')&&!sessionStorage.getItem('mk-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){h.classList.add('is-intro');sessionStorage.setItem('mk-intro','1')}}catch(e){}})(document.documentElement)";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${createHash('sha256').update(BOOT).digest('base64')}'`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com",
  "form-action 'self' https://api.web3forms.com",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ');

let assetVersion = 'dev';

/*
 * Optional photography/video (e.g. generated in Flow, see FLOW-PROMPTS.md).
 * A slot renders only when its file exists in static/media/, so the site
 * never shows a broken image — without files it falls back to line art.
 */
const MEDIA_DIR = new URL('../static/media/', import.meta.url);
const media = (name) => (existsSync(new URL(name, MEDIA_DIR)) ? `/media/${name}` : null);
export const setAssetVersion = (v) => (assetVersion = v);

const tel = `tel:${business.phoneIntl}`;
const wa = (c) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(c.booking.greeting)}`;
const ext = 'target="_blank" rel="noopener noreferrer"';
const svc = (id) => services.find((s) => s.id === id);

export function priceText(lang, value, from) {
  if (value == null) return null;
  if (lang === 'en') return `${from ? 'from ' : ''}€${value}`;
  if (lang === 'tr') return `${value}\u00a0€${from ? '’dan' : ''}`;
  return `${from ? 'ab ' : ''}${value}\u00a0€`;
}

function priceBig(lang, value, from) {
  if (lang === 'en') return `${from ? '<small>from</small>' : ''}<span class="cur">€</span><b>${value}</b>`;
  if (lang === 'tr') return `<b>${value}</b><span class="cur">€</span>${from ? '<small>’dan</small>' : ''}`;
  return `${from ? '<small>ab</small>' : ''}<b>${value}</b><span class="cur">€</span>`;
}

function hoursRows(c) {
  return business.hours.map((h) => [
    h.days.length > 1 ? `${c.days[h.days[0]]}–${c.days[h.days.at(-1)]}` : c.days[h.days[0]],
    `${h.opens}–${h.closes}${c.hours.suffix ? ' ' + c.hours.suffix : ''}`,
  ]);
}

function hoursList(c) {
  return `<dl class="hours">${hoursRows(c).map(([d, t]) => `<div><dt>${e(d)}</dt><dd>${e(t)}</dd></div>`).join('')}</dl><p class="hours__note">${e(c.hours.closed)}</p>`;
}

const kicker = (text, cls = '') => `<p class="kicker ${cls}">${e(text)}</p>`;
const twoLine = ([a, b]) => `<span class="ln"><span>${e(a)}</span></span><span class="ln"><em>${e(b)}</em></span>`;
const btn = (href, label, mod = 'red', ico = 'arrow', attrs = '') =>
  `<a class="btn btn--${mod}" href="${e(href)}" ${attrs}><span>${e(label)}</span>${icon(ico)}</a>`;

/* ---------- Shell ---------- */

function langSwitch(p, cls = 'lang') {
  return `<div class="${cls}" role="group" aria-label="${e(p.c.nav.lang)}">${LANGS.map((l) => {
    const href = p.alternates[l] ?? routes.home[l];
    const cur = l === p.lang ? ' aria-current="true"' : '';
    return `<a href="${href}" hreflang="${l}" lang="${l}" data-lang="${l}"${cur}>${l.toUpperCase()}</a>`;
  }).join('')}</div>`;
}

function header(p) {
  const { c, lang } = p;
  const items = ['services', 'prices', 'about'];
  return `<header class="hdr" data-hdr>
<div class="hdr__in">
<a class="brand" href="${routes.home[lang]}" aria-label="${e(business.name)} – ${e(c.nav.home)}">${logoMark('logo brand__mark')}<span class="brand__word"><b>MASTER</b><i>KFZ</i></span></a>
<nav class="nav" aria-label="${e(c.nav.menu)}">${items.map((k) => `<a href="${routes[k][lang]}"${p.nav === k ? ' aria-current="page"' : ''}>${e(c.nav[k])}</a>`).join('')}</nav>
<div class="hdr__end">${langSwitch(p)}<a class="btn btn--red btn--sm hdr__cta" href="${routes.booking[lang]}"${p.nav === 'booking' ? ' aria-current="page"' : ''}><span>${e(c.cta.book)}</span></a>
<button class="burger" type="button" aria-expanded="false" aria-controls="menu" data-menu-btn><span class="sr">${e(c.nav.menu)}</span><i></i><i></i></button></div>
</div>
</header>
<div class="menu" id="menu" data-menu inert>
<nav class="menu__nav" aria-label="${e(c.nav.menu)}">${['home', 'services', 'prices', 'about', 'booking'].map((k, i) => `<a href="${routes[k][lang]}" style="--i:${i}"><small>0${i + 1}</small>${e(c.nav[k])}</a>`).join('')}</nav>
<div class="menu__foot"><a href="${tel}">${icon('phone')}${business.phoneDisplay}</a><a href="${wa(c)}" ${ext}>${icon('chat')}WhatsApp</a>${langSwitch(p, 'lang lang--menu')}</div>
</div>`;
}

function footer(p) {
  const { c, lang } = p;
  return `<footer class="ftr">
<div class="wrap ftr__grid">
<div class="ftr__brand"><a class="brand" href="${routes.home[lang]}" aria-label="${e(business.name)}">${logoMark('logo brand__mark')}<span class="brand__word"><b>MASTER</b><i>KFZ</i></span></a>
<p>${e(c.footer.tagline)}</p>
<a class="ftr__social" href="${business.instagram}" ${ext}>${icon('insta')}<span>@masterkfz</span></a></div>
<div><h2 class="ftr__h">${e(c.footer.explore)}</h2><ul class="ftr__list">${['services', 'prices', 'about', 'booking'].map((k) => `<li><a href="${routes[k][lang]}">${e(c.nav[k])}</a></li>`).join('')}</ul></div>
<div><h2 class="ftr__h">${e(c.footer.contact)}</h2><address class="ftr__list">
<a href="${mapsUrl}" ${ext}>${e(business.street)}<br>${business.zip} ${e(business.city)}-${e(business.district)}</a>
<a href="${tel}">${business.phoneDisplay}</a>
<a href="${wa(c)}" ${ext}>WhatsApp</a>
<a href="mailto:${business.email}">${business.email}</a></address></div>
<div><h2 class="ftr__h">${e(c.hours.title)}</h2>${hoursList(c)}</div>
</div>
<div class="wrap ftr__bottom">
<p>© ${new Date().getFullYear()} ${e(business.legalName)}</p>
<nav aria-label="${e(c.footer.legal)}"><a href="${routes.imprint.de}" hreflang="de">${e(c.footer.imprint)}</a><a href="${routes.privacy.de}" hreflang="de">${e(c.footer.privacy)}</a></nav>
${langSwitch(p, 'lang lang--footer')}
<p class="ftr__credit">${e(c.footer.credit)}: <a href="https://1618-digital.de" ${ext}>1618 Digital</a></p>
</div>
<p class="ftr__giant" aria-hidden="true">MASTER<em>KFZ</em></p>
</footer>
<nav class="mbar" aria-label="${e(c.footer.contact)}">
<a href="${tel}" class="mbar__btn">${icon('phone')}<span>${e(c.cta.call)}</span></a>
<a href="${wa(c)}" class="mbar__btn mbar__btn--wa" ${ext}>${icon('chat')}<span>WhatsApp</span></a>
<a href="${routes.booking[lang]}" class="mbar__btn mbar__btn--red">${icon('calendar')}<span>${e(c.nav.booking)}</span></a>
</nav>`;
}

function intro() {
  return `<div class="intro" aria-hidden="true">
<div class="intro__stage">${logoMark('logo intro__mark')}
<p class="intro__word"><span>MASTER</span><em>KFZ</em></p>
<p class="intro__sub">Kfz-Meisterwerkstatt · Berlin</p></div>
<i class="intro__bar"></i>
</div>`;
}

export function layout(p, allCopy) {
  const { c, lang } = p;
  const alts = Object.entries(p.alternates);
  const toast = Object.fromEntries(LANGS.map((l) => [l, allCopy[l].langToast]));
  return `<!doctype html>
<html lang="${lang}" class="no-js"${p.intro ? ' data-intro' : ''}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(p.title)}</title>
<meta name="description" content="${e(p.description)}">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
${p.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${SITE_URL}${p.path}">`}
${p.noindex ? '' : alts.map(([l, href]) => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${href}">`).join('\n')}
${!p.noindex && p.alternates.de ? `<link rel="alternate" hreflang="x-default" href="${SITE_URL}${p.alternates.de}">` : ''}
<meta name="theme-color" content="#060607">
<meta name="color-scheme" content="dark">
<meta name="format-detection" content="telephone=no">
<meta name="geo.region" content="${business.region}">
<meta name="geo.placename" content="Berlin-Neukölln">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${e(business.name)}">
<meta property="og:title" content="${e(p.title)}">
<meta property="og:description" content="${e(p.description)}">
<meta property="og:url" content="${SITE_URL}${p.path}">
<meta property="og:image" content="${SITE_URL}/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="${c.locale}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="stylesheet" href="/css/site.css?v=${assetVersion}">
<script>${BOOT}</script>
<script src="/js/site.js?v=${assetVersion}" defer></script>
${p.schema ? `<script type="application/ld+json">${JSON.stringify(p.schema).replace(/</g, '\\u003c')}</script>` : ''}
</head>
<body class="ui-${p.ui ?? UI_STYLE} ${p.bodyClass ?? ''}">
<a class="skip" href="#main">${e(c.nav.skip)}</a>
${p.intro ? intro() : ''}
${header(p)}
<main id="main">
${p.body}
</main>
${footer(p)}
<div class="toast" data-lang-toast='${e(JSON.stringify(toast))}' hidden></div>
</body>
</html>`;
}

/* ---------- Shared sections ---------- */

function pageHero(k, title, lead, extra = '') {
  return `<section class="phero">
<div class="phero__glow" aria-hidden="true"></div>
<div class="wrap">${kicker(k, 'rv')}<h1 class="h1 rv" style="--i:1">${twoLine(title)}</h1>
${lead ? `<p class="lead rv" style="--i:2">${e(lead)}</p>` : ''}${extra}</div>
</section>`;
}

function crumbs(c, lang, trail) {
  return `<nav class="crumbs wrap" aria-label="${e(c.service.crumbs)}"><ol>${trail
    .map(([label, href], i) => (i < trail.length - 1 ? `<li><a href="${href}">${e(label)}</a></li>` : `<li aria-current="page">${e(label)}</li>`))
    .join('')}</ol></nav>`;
}

function serviceCard(c, lang, s, i) {
  const t = c.services[s.id];
  const price = s.price == null ? c.cta.onRequest : priceText(lang, s.price, s.from);
  return `<a class="card rv" href="${servicePath(lang, s)}" style="--i:${i % 4}">
<span class="card__icon">${iconPro(s.icon)}</span>
<h3 class="card__title">${e(t.name)}</h3>
<p class="card__text">${e(t.short)}</p>
<span class="card__foot"><span class="card__price">${e(price)}</span><span class="card__arrow">${icon('arrow')}</span></span>
</a>`;
}

const cards = (c, lang, list, mod = '') => `<div class="cards${mod}">${list.map((s, i) => serviceCard(c, lang, s, i)).join('')}</div>`;

function faqList(items) {
  return `<div class="faq__list">${items
    .map((f) => `<details class="faq__item rv"><summary><span>${e(f.q)}</span>${icon('plus')}</summary><div class="faq__a"><p>${e(f.a)}</p></div></details>`)
    .join('')}</div>`;
}

function steps(c, compact = false) {
  return `<section class="section process${compact ? ' process--compact' : ''}" data-scroll="pass">
<div class="wrap">
<header class="shead">${kicker(c.home.processKicker, 'rv')}<h2 class="h2 rv" style="--i:1">${e(c.home.processTitle)}</h2></header>
<div class="steps__rail" aria-hidden="true"><i></i></div>
<ol class="steps">${c.home.steps.map((s, i) => `<li class="step rv" style="--i:${i}"><span class="step__n">0${i + 1}</span><h3>${e(s.title)}</h3><p>${e(s.text)}</p></li>`).join('')}</ol>
</div>
</section>`;
}

function finalCta(c, lang) {
  return `<section class="final">
<div class="final__glow" aria-hidden="true"></div>
${gearSvg('gear final__gear')}
<div class="wrap">
<h2 class="final__title rv">${twoLine(c.home.finalTitle)}</h2>
<p class="lead rv" style="--i:1">${e(c.home.finalText)}</p>
<div class="btns rv" style="--i:2">${btn(routes.booking[lang], c.cta.book)}${btn(wa(c), c.cta.whatsapp, 'ghost btn--wa', 'chat', ext)}</div>
</div>
</section>`;
}

function visit(c, lang, heading = 'h2') {
  return `<section class="section visit">
<div class="wrap visit__grid">
<div>${kicker(c.home.visitKicker, 'rv')}
<${heading} class="visit__addr rv" style="--i:1">${e(business.street)}<span>${business.zip} Berlin-${e(business.district)}</span></${heading}>
<p class="lead rv" style="--i:2">${e(c.home.visitText)}</p>
<div class="btns rv" style="--i:3">${btn(mapsUrl, c.cta.route, 'light', 'pin', ext)}${btn(tel, business.phoneDisplay, 'ghost', 'phone')}</div></div>
<div class="visit__card rv" style="--i:2">
<h3 class="visit__h">${icon('clock')}${e(c.hours.title)}</h3>${hoursList(c)}
<ul class="visit__contact"><li><a href="${tel}">${icon('phone')}${business.phoneDisplay}</a></li><li><a href="${wa(c)}" ${ext}>${icon('chat')}WhatsApp</a></li><li><a href="mailto:${business.email}">${icon('mail')}${business.email}</a></li></ul>
</div>
</div>
</section>`;
}

/* ---------- Pages ---------- */

function home(c, lang) {
  const words = c.home.statement.split(' ').map((w) => `<span class="w">${e(w)}</span>`).join(' ');
  const scanSpots = services
    .map((s, i) => {
      const [x, y] = s.hotspot;
      return `<a class="hot${y > 250 ? ' hot--below' : ''}" href="${servicePath(lang, s)}" style="--x:${((x / 1200) * 100).toFixed(2)}%;--y:${((y / 400) * 100).toFixed(2)}%" data-x="${x}" data-y="${y}" data-at="${(x / 1200).toFixed(3)}"><span class="hot__dot">${i + 1}</span><span class="hot__label">${e(c.services[s.id].name)}</span></a>`;
    })
    .join('');
  const heroImg = media('hero.webp');
  const heroVid = heroImg && media('hero.mp4');
  // With at least three photos the reel shows only photographed services; mixing photos and line art looks unfinished.
  const photographed = ['inspection', 'diagnostics', 'brakes', 'oil', 'tyres', 'timingbelt', 'aircon', 'gearbox'].filter((id) => media(`reel-${id}.webp`));
  const reelIds = photographed.length >= 3 ? photographed : ['diagnostics', 'brakes', 'tyres', 'oil', 'timingbelt'];
  const reel = reelIds.map((id, i) => {
    const s = svc(id);
    const img = media(`reel-${id}.webp`);
    return `<a class="flow__item" href="${servicePath(lang, s)}">${img ? `<img src="${img}" alt="${e(c.services[id].name)}" loading="lazy" decoding="async">` : `<span class="flow__art" aria-hidden="true">${iconPro(s.icon, 'ico flow__ico')}</span>`}<span class="flow__cap"><small>0${i + 1}</small><b>${e(c.services[id].name)}</b></span>`;
  }).join('');
  const tick = c.home.ticker.map((w) => `<span>${e(w)}</span><i>✦</i>`).join('');
  return `
<section class="hero${heroImg ? ' hero--media' : ''}" data-scroll="pass" data-spot>
<div class="hero__bg" aria-hidden="true">${heroImg ? `<div class="hero__media">${heroVid ? `<video poster="${heroImg}" autoplay muted loop playsinline preload="auto" data-scrub>${media('hero-m.mp4') ? `<source src="/media/hero-m.mp4" type="video/mp4" media="(max-width: 767px)">` : ''}<source src="${heroVid}" type="video/mp4"></video>` : `<img src="${heroImg}" alt="" fetchpriority="high" decoding="async">`}</div>` : ''}<div class="hero__glow"></div><div class="hero__spot"></div></div>
<div class="wrap hero__in">
${kicker(c.home.kicker, 'hero__kicker')}
<h1 class="hero__title">${twoLine(c.home.h1)}</h1>
<p class="hero__lead">${e(c.home.lead)}</p>
<div class="btns hero__cta">${btn(routes.booking[lang], c.cta.book)}${btn(wa(c), c.cta.whatsapp, 'ghost btn--wa', 'chat', ext)}</div>
</div>
<div class="hero__car" aria-hidden="true">${carSvg('car car--hero')}<i class="hero__sweep"></i></div>
<ul class="hero__trust wrap">${c.home.trust.map((t) => `<li>${icon('check')}${e(t)}</li>`).join('')}</ul>
</section>

<section class="brands" aria-label="${e(c.home.brands)}">
<p class="kicker kicker--center">${e(c.home.brands)}</p>
<div class="marquee"><div class="marquee__track">${[0, 1].map((k) => `<ul${k ? ' aria-hidden="true"' : ''}>${brands.map((b) => `<li>${e(b)}</li>`).join('')}</ul>`).join('')}</div></div>
</section>

<section class="statement" data-scroll="pass" data-words>
<div class="wrap"><p class="statement__text">${words}</p></div>
</section>

<section class="flowsec" aria-labelledby="reel-title">
<header class="wrap shead shead--split"><div>${kicker(c.home.reelKicker, 'rv')}<h2 class="h2 rv" style="--i:1" id="reel-title">${e(c.home.reelTitle)}</h2></div><p class="lead rv" style="--i:2">${e(c.home.reelLead)}</p></header>
<div class="flow"><div class="flow__track">${[0, 1, 2, 3].map((k) => `<div class="flow__set"${k ? ' aria-hidden="true"' : ''}>${reel.replaceAll('<a class=', k ? '<a tabindex="-1" class=' : '<a class=')}</div>`).join('')}</div></div>
</section>

<section class="section" id="services">
<div class="wrap">
<header class="shead shead--split"><div>${kicker(c.home.servicesKicker, 'rv')}<h2 class="h2 rv" style="--i:1">${e(c.home.servicesTitle)}</h2></div>
<div><p class="lead rv" style="--i:2">${e(c.home.servicesLead)}</p><a class="link rv" style="--i:3" href="${routes.services[lang]}">${e(c.cta.allServices)}${icon('arrow')}</a></div></header>
${cards(c, lang, services, ' cards--compact')}
</div>
</section>

<section class="scan" data-scroll="sticky" data-tour="${e(JSON.stringify(['oil', 'timingbelt', 'brakes', 'gearbox', 'diagnostics', 'aircon', 'inspection', 'tyres'].map((id) => services.findIndex((x) => x.id === id))))}" aria-labelledby="scan-title">
<div class="scan__sticky">
<header class="wrap shead shead--center">${kicker(c.home.scanKicker)}<h2 class="h2" id="scan-title">${e(c.home.scanTitle)}</h2><p class="lead">${e(c.home.scanLead)}</p></header>
<div class="scan__stage"><div class="scan__car">
${carPremium('pc pc--base')}
<div class="scan__lit" aria-hidden="true">${carPremium('pc pc--lit', true)}</div>
${scanSpots}
</div></div>
</div>
</section>

<section class="section section--light">
<div class="wrap">
<header class="shead shead--split"><div>${kicker(c.home.pricesKicker, 'rv')}<h2 class="h2 rv" style="--i:1">${e(c.home.pricesTitle)}</h2></div>
<div><p class="lead rv" style="--i:2">${e(c.home.pricesLead)}</p><a class="link rv" style="--i:3" href="${routes.prices[lang]}">${e(c.cta.allPrices)}${icon('arrow')}</a></div></header>
<div class="tiles">${featuredPrices.map((id, i) => {
    const s = svc(id);
    return `<a class="tile rv" style="--i:${i}" href="${servicePath(lang, s)}"><span class="tile__name">${e(c.services[id].name)}</span><span class="tile__price" data-count="${s.price}">${priceBig(lang, s.price, s.from)}</span><span class="tile__note">${e(c.services[id].short)}</span>${icon('arrow')}</a>`;
  }).join('')}</div>
</div>
</section>

${steps(c)}

<section class="section stance">
<div class="wrap stance__grid">
<div>${kicker(c.home.meisterKicker, 'rv')}<h2 class="h2 rv" style="--i:1">${e(c.home.meisterTitle)}</h2><p class="lead rv" style="--i:2">${e(c.home.meisterText)}</p>
<ul class="values">${c.home.values.map((v, i) => `<li class="rv" style="--i:${i + 2}"><h3>${e(v.title)}</h3><p>${e(v.text)}</p></li>`).join('')}</ul></div>
<div class="stance__visual" aria-hidden="true">${gearSvg('gear stance__gear')}${logoMark('logo stance__mark')}</div>
</div>
</section>

<section class="section faq">
<div class="wrap faq__grid"><h2 class="h2 rv">${e(c.home.faqTitle)}</h2>${faqList(c.home.faq)}</div>
</section>

${visit(c, lang)}
<section class="ticker" data-scroll="pass" aria-hidden="true"><div class="ticker__row">${tick.repeat(3)}</div><div class="ticker__row ticker__row--alt">${tick.repeat(3)}</div></section>
${finalCta(c, lang)}`;
}

function servicesIndex(c, lang) {
  return `${pageHero(c.servicesPage.kicker, c.servicesPage.title, c.servicesPage.lead)}
<section class="section section--tight"><div class="wrap">${cards(c, lang, services)}</div></section>
${steps(c)}
${finalCta(c, lang)}`;
}

function serviceDetail(c, lang, s) {
  const t = c.services[s.id];
  const others = services.filter((o) => o.id !== s.id);
  const start = services.indexOf(s);
  const related = [1, 2, 3].map((k) => others[(start + k - 1) % others.length]);
  const book = `${routes.booking[lang]}?s=${s.id}`;
  const price = s.price == null ? `<b class="pbox__req">${e(c.cta.onRequest)}</b>` : priceBig(lang, s.price, s.from);
  return `<section class="phero phero--service">
<div class="phero__glow" aria-hidden="true"></div>
${crumbs(c, lang, [[c.nav.home, routes.home[lang]], [c.nav.services, routes.services[lang]], [t.name, null]])}
<div class="wrap phero__split">
<div><p class="kicker rv"><span class="kicker__icon">${icon(s.icon)}</span>${e(c.nav.services)}</p>
<h1 class="h1 rv" style="--i:1">${e(t.name)}</h1>
<p class="lead rv" style="--i:2">${e(t.lead)}</p>
<div class="btns rv" style="--i:3">${btn(book, c.service.bookThis)}${btn(wa(c), c.cta.whatsapp, 'ghost btn--wa', 'chat', ext)}</div></div>
<aside class="pbox rv" style="--i:2"><p class="pbox__label">${e(c.service.priceLabel)}</p><p class="pbox__price">${price}</p><p class="pbox__note">${e(c.service.priceNote)}</p></aside>
</div>
</section>
<section class="section section--tight">
<div class="wrap duo">
<div class="duo__col rv"><h2 class="h3">${e(c.service.includes)}</h2><ul class="checks">${t.includes.map((x) => `<li>${icon('check')}${e(x)}</li>`).join('')}</ul></div>
<div class="duo__col rv" style="--i:1"><h2 class="h3">${e(c.service.signs)}</h2><ul class="signs">${t.signs.map((x) => `<li>${e(x)}</li>`).join('')}</ul></div>
</div>
</section>
${steps(c, true)}
<section class="section faq">
<div class="wrap faq__grid"><h2 class="h2 rv">${e(c.service.faq)}</h2>${faqList(t.faq)}</div>
</section>
<section class="section section--tight">
<div class="wrap"><h2 class="h3 rv">${e(c.service.related)}</h2>${cards(c, lang, related)}</div>
</section>
${finalCta(c, lang)}`;
}

function prices(c, lang) {
  const P = c.pricesPage;
  return `${pageHero(P.kicker, P.title, P.lead)}
<section class="section section--tight">
<div class="wrap ptable">
${priceGroups
  .map(
    (g, gi) => `<section class="pgroup rv" style="--i:${gi % 3}"><h2 class="pgroup__h">${e(P.groups[g.id])}</h2><ul>${g.items
      .map((it) => {
        const s = svc(it.service ?? g.service);
        const val = it.price == null ? c.cta.onRequest : priceText(lang, it.price, it.from);
        return `<li><a href="${servicePath(lang, s)}"><span class="pname">${e(P.items[it.id].name)}<small>${e(P.items[it.id].note)}</small></span><span class="pval">${e(val)}</span></a></li>`;
      })
      .join('')}</ul></section>`,
  )
  .join('')}
<p class="ptable__foot">${e(P.footnote)}</p>
</div>
</section>
${finalCta(c, lang)}`;
}

function about(c, lang) {
  const A = c.about;
  return `${pageHero(A.kicker, A.title, A.lead)}
<section class="section section--tight">
<div class="wrap story">
<div class="story__text">${A.story.map((s, i) => `<p class="rv" style="--i:${i}">${e(s)}</p>`).join('')}
<div class="owner rv" style="--i:2"><span class="owner__badge" aria-hidden="true">ÖA</span><p><b>${e(business.owner)}</b><span>${e(A.ownerRole)}</span></p></div></div>
<div class="story__visual rv" style="--i:1" aria-hidden="true">${gearSvg('gear story__gear')}${logoMark('logo story__mark')}</div>
</div>
</section>
<section class="facts"><div class="wrap facts__row">${A.facts.map((f, i) => `<p class="fact rv" style="--i:${i}"><b>${e(f.value)}</b><span>${e(f.label)}</span></p>`).join('')}</div></section>
<section class="section">
<div class="wrap"><header class="shead">${kicker(A.kicker, 'rv')}<h2 class="h2 rv" style="--i:1">${e(A.valuesTitle)}</h2></header>
<ul class="values values--grid">${A.values.map((v, i) => `<li class="rv" style="--i:${i}"><span class="values__n">0${i + 1}</span><h3>${e(v.title)}</h3><p>${e(v.text)}</p></li>`).join('')}</ul></div>
</section>
${visit(c, lang)}
${finalCta(c, lang)}`;
}

function booking(c, lang, formCfg) {
  const B = c.booking;
  const field = (name, label, attrs = '', optional = false, type = 'text') =>
    `<label class="fld"><span class="fld__l">${e(label)}${optional ? ` <small>${e(B.optional)}</small>` : ''}</span><input type="${type}" name="${name}" data-label="${e(label)}" ${attrs}${optional ? '' : ' required'}></label>`;
  const i18n = { sending: B.sending, submit: formCfg.key ? B.submit : B.submitWhatsapp, pickOne: B.pickOne, successTitle: B.successTitle, successText: B.successText, errorTitle: B.errorTitle, errorText: B.errorText, whatsappOpened: B.whatsappOpened, greeting: B.greeting, services: B.steps[0], vehicle: B.steps[1], date: B.date, time: B.time, name: B.name, phone: B.phone, email: B.email, message: B.message, whatsapp: c.cta.whatsapp };
  const names = Object.fromEntries([...services.map((s) => [s.id, c.services[s.id].name]), ['other', B.other]]);
  return `${pageHero(B.kicker, B.title, B.lead)}
<section class="section section--tight">
<div class="wrap bk-grid">
<form class="bk rv" data-booking method="post" action="${formCfg.key ? 'https://api.web3forms.com/submit' : '#'}" data-mode="${formCfg.key ? 'web3forms' : 'whatsapp'}" data-wa="${business.whatsapp}" data-tel="${business.phoneIntl}" data-i18n='${e(JSON.stringify(i18n))}' data-names='${e(JSON.stringify(names))}'>
${formCfg.key ? `<input type="hidden" name="access_key" value="${e(formCfg.key)}"><input type="hidden" name="subject" value="${e(B.subject)}"><input type="hidden" name="from_name" value="${e(business.name)} Website">` : ''}
<input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
<ol class="bk__progress" aria-hidden="true">${B.steps.map((s, i) => `<li data-progress="${i}"><span>${i + 1}</span>${e(s)}</li>`).join('')}</ol>
<fieldset class="bk__step" data-step="0">
<legend class="bk__legend">${e(B.servicesLabel)}</legend>
<div class="chips">${[...services.map((s) => [s.id, c.services[s.id].name, s.icon]), ['other', B.other, 'plus']].map(([id, label, ic]) => `<label class="chip"><input type="checkbox" name="services" value="${id}">${icon(ic)}<span>${e(label)}</span></label>`).join('')}</div>
<p class="bk__err" data-err hidden>${e(B.pickOne)}</p>
<div class="bk__nav"><button class="btn btn--red" type="button" data-next><span>${e(B.next)}</span>${icon('arrow')}</button></div>
</fieldset>
<fieldset class="bk__step" data-step="1">
<legend class="bk__legend">${e(B.steps[1])}</legend>
<div class="fgrid">${field('make', B.make, 'autocomplete="off" maxlength="40"')}${field('model', B.model, 'autocomplete="off" maxlength="60"')}${field('year', B.year, 'inputmode="numeric" pattern="(19|20)[0-9]{2}" maxlength="4"', true)}${field('plate', B.plate, 'autocapitalize="characters" maxlength="12"', true)}${field('km', B.km, 'inputmode="numeric" maxlength="7"', true)}</div>
<div class="bk__nav"><button class="btn btn--ghost" type="button" data-back><span>${e(B.back)}</span></button><button class="btn btn--red" type="button" data-next><span>${e(B.next)}</span>${icon('arrow')}</button></div>
</fieldset>
<fieldset class="bk__step" data-step="2">
<legend class="bk__legend">${e(B.steps[2])}</legend>
<div class="fgrid">${field('date', B.date, '', true, 'date')}
<div class="fld"><span class="fld__l" id="bk-time">${e(B.time)}</span><div class="seg" role="radiogroup" aria-labelledby="bk-time">${B.timeOptions.map((o, i) => `<label><input type="radio" name="time" value="${e(o)}"${i ? '' : ' checked'}><span>${e(o)}</span></label>`).join('')}</div></div>
${field('name', B.name, 'autocomplete="name" maxlength="80"')}${field('phone', B.phone, 'autocomplete="tel" minlength="6" maxlength="30"', false, 'tel')}${field('email', B.email, 'autocomplete="email" maxlength="120"', true, 'email')}
<label class="fld fld--wide"><span class="fld__l">${e(B.message)} <small>${e(B.optional)}</small></span><textarea name="message" rows="4" maxlength="1500" placeholder="${e(B.messagePlaceholder)}" data-label="${e(B.message)}"></textarea></label></div>
<label class="consent"><input type="checkbox" name="consent" required><span>${e(B.consent)} <a href="${routes.privacy.de}" hreflang="de" ${ext}>${e(B.privacyLink)}</a>.</span></label>
<div class="bk__nav"><button class="btn btn--ghost" type="button" data-back><span>${e(B.back)}</span></button><button class="btn btn--red" type="submit" data-submit><span>${e(i18n.submit)}</span>${icon(formCfg.key ? 'arrow' : 'chat')}</button></div>
</fieldset>
<div class="bk__done" data-done hidden tabindex="-1"></div>
<p class="sr" role="status" aria-live="polite" data-status></p>
<noscript><p class="bk__noscript">${e(B.noscript)}</p></noscript>
</form>
<aside class="bk-aside rv" style="--i:1">
<h2 class="h3">${e(B.directTitle)}</h2><p>${e(B.directText)}</p>
<div class="btns btns--stack">${btn(tel, business.phoneDisplay, 'light', 'phone')}${btn(wa(c), c.cta.whatsapp, 'ghost btn--wa', 'chat', ext)}</div>
<div class="bk-aside__block"><h3 class="visit__h">${icon('pin')}${e(business.street)}</h3><p>${business.zip} Berlin-${e(business.district)}</p><a class="link" href="${mapsUrl}" ${ext}>${e(c.cta.route)}${icon('arrow')}</a></div>
<div class="bk-aside__block"><h3 class="visit__h">${icon('clock')}${e(c.hours.title)}</h3>${hoursList(c)}</div>
</aside>
</div>
</section>`;
}

function notFound(c, lang) {
  return `${pageHero('404', c.notFound.title, c.notFound.text, `<div class="btns rv" style="--i:3">${btn(routes.home[lang], c.nav.home)}${btn(routes.services[lang], c.nav.services, 'ghost')}${btn(routes.booking[lang], c.cta.book, 'ghost')}</div>`)}`;
}

function legal(title, html) {
  return `<section class="phero phero--legal"><div class="wrap"><h1 class="h1">${e(title)}</h1></div></section>
<section class="section section--tight"><div class="wrap prose">${html}</div></section>`;
}

/* Logo concept board for the client — noindex, not linked from the site. */
function logoBoard() {
  return `<section class="phero phero--legal"><div class="wrap">${kicker('Entwurf · nicht öffentlich verlinkt')}<h1 class="h1">Logo-Konzepte</h1><p class="lead">Logo-Entwürfe für Master KFZ in drei Runden – plus das Bestandslogo zum Vergleich. Bis zur Entscheidung zeigt die Website ein vorläufiges Zeichen.</p></div></section>
<section class="section section--tight"><div class="wrap lc-grid">
<article class="lc"><header><p class="kicker">Bestand</p><h2 class="h3">Aktuelles Logo</h2></header><div class="lc__row"><div class="lc__tile lc__tile--dark lc__tile--wide"><img src="/img/logo.webp" width="1000" height="425" alt="Bestandslogo Master KFZ Werkstatt" loading="lazy"></div></div>
<p>Detailreich (Chrom, Schlagschatten, Zahnrad, Schraubenschlüssel) – stark auf Schildern, aber in kleinen Größen (Favicon, Navigation) kaum lesbar und nur als Rastergrafik vorhanden.</p></article>
</div></section>
<section class="section section--tight"><div class="wrap">${kicker('Runde 2')}<h2 class="h2">${LOGO_SET.length} weitere Richtungen</h2>
<p class="lead">Monogramme, Werkstatt-Objekte, Embleme und typografische Marken – jeweils auf Dunkel, auf Hell und als App-Icon, in acht Farbwelten. Die Leiste schaltet alle Logos auf eine Palette um. Nummer + Farbe nennen genügt.</p>
<div class="lx-board"><div class="pal-bar" role="radiogroup" aria-label="Farbwelt">${['Gemischt', ...LOGO_PALETTES].map((p, k) => `<label><input type="radio" name="pal" id="pal-${k}"${k ? '' : ' checked'}><span class="pal-swatch pal-swatch--${k}"></span>${e(p)}</label>`).join('')}</div>
<div class="lx-grid">${LOGO_SET.map((l, i) => `<article class="lx-card pal-${(i % LOGO_PALETTES.length) + 1}">
<div class="lx-hero">${logoSetSvg(l)}${wordmark(l.wm)}</div>
<div class="lx-mini"><span class="lx-light">${logoSetSvg(l)}</span><span class="lx-app">${logoSetSvg(l)}</span></div>
<p class="lx-meta"><b>${String(i + 1).padStart(2, '0')}</b> ${e(l.name)}<span class="lx-pal">· ${e(LOGO_PALETTES[i % LOGO_PALETTES.length])}</span></p><p class="lx-note">${e(l.note)}</p>
</article>`).join('')}</div></div></div></section>
<section class="section section--tight"><div class="wrap">${kicker('Runde 3')}<h2 class="h2">${LOGO_STYLES.length} Stilrichtungen</h2>
<p class="lead">Jede Karte ist ein eigener Charakter mit eigener Farbe und Typografie – erst den Stil wählen, dann die Form verfeinern. Schriften sind hier Systemschriften; die gewählte Richtung wird für den Druck in Pfade umgewandelt.</p>
<div class="l3-grid">${LOGO_STYLES.map((st, i) => `<article class="l3-card"><div class="l3-stage" style="background:${st.bg}">${styleSvg(st)}</div><p class="lx-meta"><b>S${String(i + 1).padStart(2, '0')}</b> ${e(st.name)}</p><p class="lx-note">${e(st.note)}</p></article>`).join('')}</div></div></section>
<section class="section section--tight"><div class="wrap">${kicker('Runde 4 · Auswahl verfeinert')}<h2 class="h2">${LOGO_R4.length} Varianten aus 27, 28 und S-Modellen</h2>
<p class="lead">Ausgearbeitet aus deiner Vorauswahl: Wappen (27), Flügel (28) und die Stilrichtungen ohne S03–S05 – je mit Wortmarke, in Premium-Farbwelten (Gold, Marine, Heritage, Monochrom).</p>
<div class="l3-grid">${LOGO_R4.map((l, i) => `<article class="l3-card"><div class="l3-stage" style="background:${l.bg}">${r4Svg(l, i)}</div><p class="lx-meta"><b>V${String(i + 1).padStart(2, '0')}</b> ${e(l.name)}<span class="lx-pal">· Basis ${e(l.base)}</span></p></article>`).join('')}</div></div></div></section>`;
}

/* Button style comparison for the client — noindex, not linked. */
function uiBoard(c, p) {
  const styles = [
    ['pill', 'Aktuell · Pille', 'Runde Pillen mit rotem Schein – freundlich, modern.'],
    ['precision', 'A · Präzision', 'Scharfe Kanten, Versalien in Monospace, Pfeil in eigener Zelle – technisch, wie ein Messgerät.'],
    ['glass', 'B · Glas', 'Weiche Radien, mattiertes Glas, feine Lichtkante – Apple-artig, sehr hochwertig.'],
    ['racing', 'C · Racing', 'Schräge Formen, kursive Versalien, Rennstreifen im Hauptbutton – Motorsport-Charakter.'],
    ['swipe', 'D · Swipe', 'Konturbuttons, die sich beim Hover rot füllen, Pfeil im weißen Kreis – lebendig, interaktiv.'],
    ['carbon', 'E · Racing Carbon', 'Racing-Schräge auf Carbon-Struktur, Doppelwinkel » statt Pfeil – sportlich und edel.'],
    ['livery', 'F · Racing Livery', 'Ruhigere Schräge mit Doppelstreifen wie auf einem GT-Rennwagen – elegant, nicht laut.'],
    ['cockpit', 'G · Cockpit', 'Abgeschrägte Ecken und feine rote Kante wie ein Head-up-Display – technisch-ästhetisch.'],
  ];
  const demo = ([k, t, d]) => `<section class="ui-demo ui-${k}"><h2>${t}</h2><p>${d}</p>
<div class="ui-demo__bar"><span class="brand">${logoMark('logo brand__mark')}<span class="brand__word"><b>MASTER</b><i>KFZ</i></span></span><div class="hdr__end">${langSwitch(p)}<a class="btn btn--red btn--sm" href="#"><span>${e(c.cta.book)}</span></a></div></div>
<div class="ui-demo__row">${btn('#', c.cta.book)}${btn('#', c.cta.whatsapp, 'ghost btn--wa', 'chat')}${btn('#', c.cta.route, 'light', 'pin')}<a class="link" href="#">${e(c.cta.allServices)}${icon('arrow')}</a></div>
<nav class="mbar" aria-label="Demo"><a href="#" class="mbar__btn">${icon('phone')}<span>${e(c.cta.call)}</span></a><a href="#" class="mbar__btn">${icon('chat')}<span>WhatsApp</span></a><a href="#" class="mbar__btn mbar__btn--red">${icon('calendar')}<span>${e(c.nav.booking)}</span></a></nav></section>`;
  return `<section class="phero phero--legal"><div class="wrap">${kicker('Entwurf · nicht öffentlich verlinkt')}<h1 class="h1">Button-Stile</h1><p class="lead">A–D: erste Runde. E–G: drei neue Richtungen aus deinem Favoriten C (Racing). Vier neue Richtungen für alle Buttons, die Sprachwahl und die mobile Leiste – das Hamburger-Menü bleibt. Mit der Maus über die Buttons fahren, um die Animation zu sehen.</p></div></section>
<section class="section section--tight"><div class="wrap">${styles.map(demo).join('')}</div></section>`;
}

/* ---------- Page registry ---------- */

const alternatesFor = (key) => ({ ...routes[key] });

export function buildPages(copy, formCfg, legalHtml) {
  const pages = [];
  for (const lang of LANGS) {
    const c = copy[lang];
    const base = { lang, c };
    const std = (key, body, extra = {}) => ({
      ...base,
      path: routes[key][lang],
      alternates: alternatesFor(key),
      title: c.meta[key].title,
      description: c.meta[key].description,
      nav: key,
      body,
      ...extra,
    });
    pages.push(std('home', home(c, lang), { intro: true, nav: null, bodyClass: 'is-home', faq: c.home.faq }));
    pages.push(std('services', servicesIndex(c, lang)));
    for (const s of services) {
      const t = c.services[s.id];
      pages.push({
        ...base,
        path: servicePath(lang, s),
        alternates: Object.fromEntries(LANGS.map((l) => [l, servicePath(l, s)])),
        title: t.metaTitle,
        description: t.metaDescription,
        nav: 'services',
        service: s,
        faq: t.faq,
        body: serviceDetail(c, lang, s),
      });
    }
    pages.push(std('prices', prices(c, lang)));
    pages.push(std('about', about(c, lang)));
    pages.push(std('booking', booking(c, lang, formCfg)));
  }
  const de = copy.de;
  for (const key of ['imprint', 'privacy']) {
    pages.push({
      lang: 'de', c: de, path: routes[key].de, alternates: { de: routes[key].de }, nav: null,
      title: `${legalHtml[key].title} | ${business.name}`, description: legalHtml[key].description,
      body: legal(legalHtml[key].title, legalHtml[key].html),
    });
  }
  for (const p of pages) p.schema = schemaGraph(p, copy);
  pages.push({
    lang: 'de', c: de, path: '/404.html', file: '404.html', alternates: {}, noindex: true, nav: null,
    title: de.meta.notFound.title, description: de.meta.notFound.description, body: notFound(de, 'de'),
  });
  pages.push({
    lang: 'de', c: de, path: '/ui-stile/', alternates: {}, noindex: true, nav: null,
    title: 'Button-Stile | Master KFZ', description: 'Interne Entwurfsseite.', body: uiBoard(de, { c: de, lang: 'de', alternates: {} }),
  });
  pages.push({
    lang: 'de', c: de, path: '/logo-konzepte/', alternates: {}, noindex: true, nav: null,
    title: 'Logo-Konzepte | Master KFZ', description: 'Interne Entwurfsseite.', body: logoBoard(), bodyClass: 'is-board',
  });
  return pages;
}
