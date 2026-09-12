## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).

## 2024-11-20 - Cache document-relative bounding box on mouseenter
**Learning:** Calling `getBoundingClientRect()` on every `mousemove` event forces synchronous layout thrashing, severely degrading framerate.
**Action:** Instead, cache the bounding box in a `useRef` on `mouseenter`. To prevent the layout calculations from breaking if the user scrolls while hovering, cache the *document-relative* position (e.g., `rect.top + window.scrollY`) and compare it against `e.pageX` and `e.pageY` during the `mousemove` event.
