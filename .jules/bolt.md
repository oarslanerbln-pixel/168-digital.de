## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).

## 2024-11-20 - Fast DOM query short-circuit
**Learning:** Avoid `getBoundingClientRect()` inside high-frequency event handlers like `mousemove`. It's a synchronous layout read and causes layout recalculations which hurt performance.
**Action:** When working with cursor-following UI that depends on bounding client rect, measure and cache `getBoundingClientRect()` on `mouseenter`, use the cached value on `mousemove`, and clear it on `mouseleave`.

## 2024-11-20 - Safe DOM Query Caching
**Learning:** Caching `getBoundingClientRect()` on `mouseenter` introduces visual bugs if the element moves relative to the viewport (e.g., via scrolling or resizing).
**Action:** When caching `getBoundingClientRect()`, always attach `scroll` and `resize` event listeners to invalidate the cache. Recompute conditionally if the cache is empty during the high-frequency event.
