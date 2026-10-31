import { useEffect, useRef } from 'react';

/**
 * Pulls an element a little towards the pointer while it hovers, and lets
 * it spring back on leave (the spring is the element's CSS transition on
 * `transform`). Only for a real mouse and only when the visitor has not
 * asked for reduced motion; on touch the button stays exactly where the
 * thumb expects it.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia?.('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    };
    const leave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return ref;
}
