## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).

## 2024-11-20 - 3D Transform Layout Thrashing
**Learning:** Calling `getBoundingClientRect()` on an element that is actively being transformed (especially in 3D via `rotateX`/`rotateY`) returns a rect that changes size and position based on the rotation. If done during `mousemove` to drive the 3D effect, this creates a recursive layout invalidation (transform -> bounds -> transform) and causes non-linear, jittery mouse mapping.
**Action:** When calculating mouse offsets for 3D tilt effects, always attach the `mousemove` listener to a static wrapper/parent element and call `getBoundingClientRect()` on that wrapper, never on the element being transformed.
