## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).

## 2024-11-20 - Cache getBoundingClientRect on mouseenter
**Learning:** Calling `getBoundingClientRect()` inside a high-frequency event listener like `mousemove` causes forced synchronous layout (layout thrashing) on every frame, which severely impacts rendering performance and can lead to jank.
**Action:** When calculating mouse position relative to an element in a `mousemove` handler, cache the element's bounding rect on `mouseenter` into a ref and use that cached value during `mousemove`. Clear the cache on `mouseleave` to handle edge cases.
