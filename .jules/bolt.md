## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-12-07 - Conditional Global Event Listeners
**Learning:** Components that toggle UI (like dropdowns, tooltips, widgets) often attach global `window.addEventListener('scroll')` or `document.addEventListener('click')` listeners to handle closing themselves. If attached unconditionally in a `useEffect` with an empty dependency array `[]`, these listeners fire constantly across the entire application lifecycle, executing state setters or logic unnecessarily, leading to main thread blocking and jank.
**Action:** When a global listener is only needed while a specific component state is active (e.g., `isOpen` or `isExpanded`), include that state in the `useEffect` dependency array and exit early (`if (!isOpen) return;`) to ensure the listener is only attached when genuinely required.
