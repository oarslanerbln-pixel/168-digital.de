import { useEffect, useState } from 'react';

/**
 * Tracks a media query. False during the build-time prerender and on the
 * first browser render, so prerendered HTML always carries the simple
 * (small-screen) variant and the enhanced one switches on after mount.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia?.(query);
    if (!mql) return;
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener?.('change', update);
    return () => mql.removeEventListener?.('change', update);
  }, [query]);

  return matches;
}
