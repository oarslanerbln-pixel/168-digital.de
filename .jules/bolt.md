
## 2024-06-03 - High-Frequency Event Handlers and Layout Thrashing in Framer Motion
**Learning:** Using React's `useState` for high-frequency events (like `mousemove` for custom cursors) causes continuous, unnecessary component re-renders. Furthermore, animating dimensions like `width` or `height` during interaction states (e.g., hover effects) triggers costly browser layout recalculations (layout thrashing).
**Action:** For high-frequency events, always use Framer Motion's `useMotionValue` and `useSpring` to update `motion.div` styles directly, bypassing React state entirely. For UI animations, animate hardware-accelerated CSS transforms like `scale` instead of layout-triggering properties like `width`/`height`.

## 2024-05-18 - Framer Motion CSS Transforms vs Borders
**Learning:** While using hardware-accelerated CSS transforms like `scale` instead of `width`/`height` prevents layout thrashing, it causes unintended visual regressions on borders (e.g., a 1px border scales to a much thicker size).
**Action:** When animating elements with visible borders, you must use dimensional properties (`width`/`height`) or use an alternative approach (like scaling an inset pseudo-element or utilizing `box-shadow`) to prevent border thickness scaling.
