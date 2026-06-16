## 2025-02-18 - Prevent React Layout Thrashing with Framer Motion
**Learning:** Using React's `useState` for tracking high-frequency events like `mousemove` coordinates causes severe performance degradation due to triggering constant component re-renders.
**Action:** Always use Framer Motion's `useMotionValue` and `useSpring` to update `motion.div` styles directly, bypassing the React render cycle entirely for smooth, 60fps interactions without main thread blocking.
