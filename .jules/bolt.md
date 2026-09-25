## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Global event listener optimization
**Learning:** React components that mount globally (like widgets or overlays) often attach `scroll` or `click` event listeners to the `window` or `document` unconditionally. For high-frequency events like `scroll`, this introduces unnecessary main-thread overhead even when the component is inactive (e.g. collapsed or hidden).
**Action:** When working with global UI components, conditionally attach global event listeners (e.g. `scroll`, `mousemove`) only when the component is active or expanded. Use early returns (`if (!isActive) return;`) inside the `useEffect` and include the active state in the dependency array to correctly mount and unmount the listeners.
