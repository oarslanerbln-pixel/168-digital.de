## 2024-11-20 - High-Frequency Event State Management with Framer Motion
**Learning:** Using React's `useState` for high-frequency events like `mousemove` causes severe performance degradation due to constant component tree re-rendering.
**Action:** Always use Framer Motion's `useMotionValue` combined with `useSpring` (if smoothing is needed) and assign directly to `motion.div` styles for properties tracking continuous input like mouse positions or scroll, completely bypassing the React render cycle.
