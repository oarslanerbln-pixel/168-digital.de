## 2025-02-14 - Prevent re-renders in mapped lists with inline click handlers

**Learning:** In React components like `Works.tsx`, passing an inline function to child elements in a `.map()` (e.g. `onClick={() => setSelectedProject(project)}`) creates a new function reference on every render. Because clicking an item updates the parent's state (`selectedProject`), the entire list re-renders. For large, complex `framer-motion` elements, this causes noticeable performance degradation.

**Action:** Extract list items into their own components wrapped in `React.memo` and use stable callbacks (via `useCallback`) in the parent to prevent unnecessary re-renders of list items that haven't changed.
