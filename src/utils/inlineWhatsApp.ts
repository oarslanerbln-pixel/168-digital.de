import { useCallback, useRef, useSyncExternalStore } from 'react';

/* ════════════════════════════════════════════════════════════════
   The floating WhatsApp button yields to an on-page WhatsApp link.

   The homepage hero and every service hero carry their own WhatsApp
   link next to the main button. While one of them is on screen, the
   floating button only repeated it — and on a 1280×800 laptop it sat
   on top of the service hero's primary button. Rows that hold such a
   link register here (useInlineWhatsApp); the floating widget reads
   useInlineWhatsAppVisible() and steps aside until the row scrolls
   away, so there is always exactly one WhatsApp entry point in view.

   A tiny external store rather than context: the rows and the widget
   live in unrelated parts of the tree (page chunk vs. app shell).
   ════════════════════════════════════════════════════════════════ */

const visibleRows = new Set<symbol>();
const listeners = new Set<() => void>();

function setRowVisible(id: symbol, visible: boolean) {
  const changed = visible ? !visibleRows.has(id) : visibleRows.has(id);
  if (!changed) return;
  if (visible) visibleRows.add(id);
  else visibleRows.delete(id);
  listeners.forEach((notify) => notify());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const anyRowVisible = () => visibleRows.size > 0;

/**
 * Callback ref for the element that holds an on-page WhatsApp link. A
 * callback rather than an effect, so a row that appears later (a service
 * page reached from its own not-found state) or is replaced is still
 * observed, and an unmounted one always unregisters.
 */
export function useInlineWhatsApp<T extends Element>() {
  const stop = useRef<(() => void) | null>(null);

  return useCallback((el: T | null) => {
    stop.current?.();
    stop.current = null;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const id = Symbol('inline-whatsapp');
    const observer = new IntersectionObserver(([entry]) => setRowVisible(id, entry.isIntersecting));
    observer.observe(el);
    stop.current = () => {
      observer.disconnect();
      setRowVisible(id, false);
    };
  }, []);
}

/** True while any registered on-page WhatsApp link is on screen. */
export function useInlineWhatsAppVisible(): boolean {
  return useSyncExternalStore(subscribe, anyRowVisible, () => false);
}
