/**
 * Decides whether a component may play its entrance animation on mount.
 *
 * Every route is prerendered to static HTML, and the client replaces that
 * markup with createRoot (not hydration). An entrance that starts from
 * opacity 0 would therefore make the prerendered text, already on screen,
 * vanish and fade back in; and if the prerender itself carried the start
 * state, crawlers, no-JS visitors and the first paint on a slow network
 * would get an empty block. So the entrance plays only when the component
 * mounts into a page that did not already show it:
 *
 * - never during the server render (the prerender gets the finished state);
 * - not on the first mount when the prerendered element is still in the
 *   document (that mount replaces it);
 * - yes on every later mount, i.e. client-side navigation.
 *
 * One gate per component, created at module level with the selector of
 * the component's root element.
 */
export function entranceGate(prerenderedSelector: string): () => boolean {
  let mountedBefore = false;
  return () => {
    if (typeof document === 'undefined') return false;
    const replacingPrerender = !mountedBefore && !!document.querySelector(prerenderedSelector);
    mountedBefore = true;
    return !replacingPrerender;
  };
}
