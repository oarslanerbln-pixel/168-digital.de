## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Prevent layout thrashing on mousemove
**Learning:** Calling `getBoundingClientRect()` inside high-frequency event handlers like `mousemove` causes severe layout thrashing and forces synchronous DOM reflows.
**Action:** When calculating relative positions for interactive effects (like 3D tilts), cache the element bounds on `mouseenter` (including `window.scrollX`/`scrollY`) and use `e.pageX`/`e.pageY` in `mousemove` to avoid recalculating bounds repeatedly.
