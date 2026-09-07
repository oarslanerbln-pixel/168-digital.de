## 2024-11-20 - Fast DOM query short-circuit
**Learning:**  is an expensive synchronous layout/style read. When chaining with other DOM checks like , always put  at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Fast DOM query short-circuit
**Learning:** `window.getComputedStyle(target)` is an expensive synchronous layout/style read. When chaining with other DOM checks like `target.closest()`, always put `getComputedStyle` at the end to leverage short-circuiting.
**Action:** When handling frequent UI events (like `mousemove` or `mouseover`), arrange conditional checks so that fast methods (`closest`, `matches`) are evaluated before slow layout reads (`getComputedStyle`, `getBoundingClientRect`).
## 2024-11-20 - Cache `getBoundingClientRect()` on hover
**Learning:** Calling `getBoundingClientRect()` inside a `mousemove` handler forces a synchronous layout reflow on every single frame, which is extremely expensive and can cause stuttering.
**Action:** When calculating relative mouse positions for hover effects (like magnetic buttons or 3D cards), calculate and cache `getBoundingClientRect()` on `mouseenter` (or store it in a ref), and read from that cache during `mousemove`. Clear the cache on `mouseleave`.
## 2024-11-20 - Global event listener leak
**Learning:** Attaching global event listeners like `scroll` unconditionally within a component's `useEffect` means they fire continuously across the entire app, even when the UI element they manage (like a tooltip) is hidden.
**Action:** When using global listeners to dismiss an active state (like closing a dropdown on scroll or click outside), wrap the listener attachments in a `useEffect` that checks `if (!isOpen) return;` so they are only bound when actually needed.
