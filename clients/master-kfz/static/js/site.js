/*
 * Progressive enhancement only — every page is complete without this file.
 * One rAF-throttled scroll loop drives all scroll-linked motion (header glass,
 * statement words, vehicle scan, process rail) via a --p custom property.
 */
(() => {
  const d = document;
  const html = d.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  /* ---------- Intro: removed after its CSS timeline, skippable ---------- */
  const intro = d.querySelector('div.intro');
  if (intro) {
    if (!html.classList.contains('is-intro')) intro.remove();
    else {
      const done = () => { intro.remove(); d.removeEventListener('keydown', skip); };
      const timer = setTimeout(done, 2700);
      const skip = () => { clearTimeout(timer); intro.classList.add('is-skip'); setTimeout(done, 380); };
      intro.addEventListener('click', skip, { once: true });
      d.addEventListener('keydown', skip, { once: true });
    }
  }

  /* ---------- Mobile menu ---------- */
  const menuBtn = d.querySelector('[data-menu-btn]');
  const menu = d.querySelector('[data-menu]');
  const isOpen = () => menuBtn?.getAttribute('aria-expanded') === 'true';
  function setMenu(open, restoreFocus = true) {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    html.classList.toggle('menu-open', open);
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
    else if (restoreFocus) menuBtn.focus({ preventScroll: true });
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!isOpen()));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) setMenu(false); });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false, false); });
    matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches && isOpen()) setMenu(false, false); });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveal = d.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveal.forEach((el) => io.observe(el));
  } else reveal.forEach((el) => el.classList.add('is-in'));

  /* ---------- Scroll-linked motion ---------- */
  const hdr = d.querySelector('[data-hdr]');
  const scrollers = [...d.querySelectorAll('[data-scroll]')].map((el) => ({
    el,
    sticky: el.dataset.scroll === 'sticky',
    words: [...el.querySelectorAll('.w')],
    spots: [...el.querySelectorAll('[data-at]')],
  }));
  const clamp = (n) => Math.min(1, Math.max(0, n));
  let ticking = false;
  function frame() {
    ticking = false;
    hdr?.classList.toggle('is-scrolled', scrollY > 8);
    if (reduce) return;
    const vh = innerHeight;
    for (const s of scrollers) {
      const r = s.el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) continue;
      // sticky: 0 when the section pins, 1 a little before it unpins; pass: 0 entering, 1 leaving
      const p = s.sticky ? clamp((-r.top / Math.max(1, r.height - vh)) * 1.15) : clamp((vh - r.top) / (vh + r.height));
      s.el.style.setProperty('--p', p.toFixed(4));
      if (s.words.length) {
        const lit = Math.round(clamp((p - 0.18) / 0.42) * s.words.length);
        s.words.forEach((w, i) => w.classList.toggle('on', i < lit));
      }
      let last = null;
      s.spots.forEach((h) => { const on = p >= +h.dataset.at - 0.01; h.classList.toggle('on', on); if (on && (!last || +h.dataset.at > +last.dataset.at)) last = h; });
      s.spots.forEach((h) => h.classList.toggle('cur', h === last));
    }
  }
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  frame();

  /* ---------- Pointer spotlight on cards ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    d.addEventListener('pointermove', (e) => {
      const card = e.target.closest?.('.card');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Language: remember explicit choice, suggest once otherwise ---------- */
  d.addEventListener('click', (e) => {
    const a = e.target.closest?.('[data-lang]');
    if (a) store.set('mk-lang', a.dataset.lang);
  });
  const toast = d.querySelector('[data-lang-toast]');
  if (toast && !store.get('mk-lang')) {
    const want = (navigator.languages || [navigator.language])
      .map((l) => (l || '').slice(0, 2).toLowerCase())
      .find((l) => ['de', 'tr', 'en'].includes(l));
    const alt = want && want !== html.lang && d.querySelector(`link[rel="alternate"][hreflang="${want}"]`);
    if (alt) {
      const t = JSON.parse(toast.dataset.langToast)[want];
      const p = d.createElement('p');
      p.lang = want;
      p.textContent = t.text;
      const go = d.createElement('a');
      go.className = 'btn btn--red btn--sm';
      go.lang = want;
      go.dataset.lang = want;
      go.href = new URL(alt.href).pathname;
      go.textContent = t.action;
      const x = d.createElement('button');
      x.type = 'button';
      x.className = 'toast__x';
      x.setAttribute('aria-label', t.dismiss);
      x.textContent = '×';
      x.addEventListener('click', () => { store.set('mk-lang', html.lang); toast.hidden = true; });
      toast.append(p, go, x);
      setTimeout(() => { toast.hidden = false; }, html.classList.contains('is-intro') ? 3200 : 1200);
    }
  }

  /* ---------- Booking wizard ---------- */
  const form = d.querySelector('[data-booking]');
  if (form) booking(form);

  function booking(form) {
    form.noValidate = true;
    const T = JSON.parse(form.dataset.i18n);
    const names = JSON.parse(form.dataset.names);
    const steps = [...form.querySelectorAll('[data-step]')];
    const progress = [...form.querySelectorAll('[data-progress]')];
    const status = form.querySelector('[data-status]');
    const done = form.querySelector('[data-done]');
    const err = form.querySelector('[data-err]');
    let cur = 0;

    function show(i, focus = true) {
      cur = i;
      steps.forEach((s, j) => { s.hidden = j !== i; });
      progress.forEach((p, j) => { p.classList.toggle('is-active', j === i); p.classList.toggle('is-done', j < i); });
      if (!focus) return;
      const top = form.getBoundingClientRect().top;
      if (top < 0 || top > innerHeight * 0.5) form.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      steps[i].querySelector('input:not([type=hidden]):not([type=radio]), textarea')?.focus({ preventScroll: true });
    }

    function valid(i) {
      const s = steps[i];
      if (i === 0) {
        const ok = !!s.querySelector('input[name=services]:checked');
        err.hidden = ok;
        if (!ok) { status.textContent = T.pickOne; s.querySelector('input').focus(); }
        return ok;
      }
      for (const el of s.querySelectorAll('input, textarea')) {
        if (!el.checkValidity()) { el.reportValidity(); return false; }
      }
      return true;
    }

    form.addEventListener('click', (e) => {
      if (e.target.closest('[data-next]') && valid(cur)) show(cur + 1);
      else if (e.target.closest('[data-back]')) show(cur - 1);
    });
    form.addEventListener('change', (e) => { if (e.target.name === 'services') err.hidden = true; });
    form.addEventListener('keydown', (e) => {
      // Enter in a text field advances instead of submitting a half-filled form.
      if (e.key === 'Enter' && e.target.matches('input:not([type=checkbox]):not([type=radio])') && cur < steps.length - 1) {
        e.preventDefault();
        if (valid(cur)) show(cur + 1);
      }
    });

    const preset = new URLSearchParams(location.search).get('s');
    const box = preset && form.querySelector(`input[name=services][value="${CSS.escape(preset)}"]`);
    if (box) box.checked = true;
    if (form.elements.date) form.elements.date.min = new Date().toISOString().slice(0, 10);
    show(0, false);

    const val = (n) => (form.elements[n]?.value || '').trim();
    function summary() {
      const services = [...form.querySelectorAll('input[name=services]:checked')].map((i) => names[i.value]).join(', ');
      const car = [val('make'), val('model'), val('year'), val('plate'), val('km') && `${val('km')} km`].filter(Boolean).join(' · ');
      const when = [val('date'), form.querySelector('input[name=time]:checked')?.value].filter(Boolean).join(' · ');
      return [
        T.greeting, '',
        `${T.services}: ${services}`,
        `${T.vehicle}: ${car}`,
        when ? `${T.date}: ${when}` : null,
        `${T.name}: ${val('name')}`,
        `${T.phone}: ${val('phone')}`,
        val('email') ? `${T.email}: ${val('email')}` : null,
        val('message') ? `${T.message}: ${val('message')}` : null,
      ].filter((l) => l !== null).join('\n');
    }
    const waUrl = () => `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(summary())}`;

    const ICON = {
      check: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>',
      chat: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20l1.1-4.4A8.5 8.5 0 1 1 20 11.5z"/></svg>',
      alert: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 7v6M12 17h.01"/></svg>',
    };
    function finish(kind) {
      steps.forEach((s) => { s.hidden = true; });
      form.querySelector('.bk__progress').hidden = true;
      const title = { success: T.successTitle, wa: T.whatsappOpened, error: T.errorTitle }[kind];
      const text = { success: T.successText, wa: '', error: T.errorText }[kind];
      const wa = kind === 'success' ? '' : `<div class="btns"><a class="btn btn--red" href="${waUrl()}" target="_blank" rel="noopener noreferrer">${ICON.chat}<span>${T.whatsapp}</span></a>${kind === 'error' ? `<a class="btn btn--ghost" href="tel:${form.dataset.tel}"><span>${form.dataset.tel}</span></a>` : ''}</div>`;
      done.innerHTML = `<span class="done__icon">${kind === 'error' ? ICON.alert : ICON.check}</span><h2></h2>${text ? '<p></p>' : ''}${wa}`;
      done.querySelector('h2').textContent = title;
      if (text) done.querySelector('p').textContent = text;
      done.hidden = false;
      done.focus({ preventScroll: true });
      done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      status.textContent = title;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (cur !== steps.length - 1) { if (valid(cur)) show(cur + 1); return; }
      if (!valid(cur)) return;
      if (form.elements.botcheck?.checked) return finish('success');
      if (form.dataset.mode !== 'web3forms') {
        // 'noopener' would make window.open return null, so detach the opener by hand.
        const win = window.open(waUrl(), '_blank');
        if (win) win.opener = null;
        else location.href = waUrl();
        return finish('wa');
      }
      const submit = form.querySelector('[data-submit]');
      const label = submit.querySelector('span');
      submit.disabled = true;
      label.textContent = T.sending;
      try {
        const payload = {
          access_key: form.elements.access_key.value,
          subject: `${form.elements.subject.value} – ${val('name')}`,
          from_name: form.elements.from_name.value,
          name: val('name'),
          phone: val('phone'),
          message: summary(),
        };
        if (val('email')) payload.email = val('email');
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error(json.message || String(res.status));
        finish('success');
      } catch {
        finish('error');
      } finally {
        submit.disabled = false;
        label.textContent = T.submit;
      }
    });
  }
})();
