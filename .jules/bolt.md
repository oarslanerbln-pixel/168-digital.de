## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).

## 2024-11-20 - Memoizing static string components
**Learning:** `useMemo` can prevent expensive string allocation / concatenation logic on every render, especially inside components like MarqueeTextBand when words prop is statically passed.
**Action:** When working on generic components that are passed static array inputs that perform `Array.from` and `.join`, wrap them in `useMemo`.
