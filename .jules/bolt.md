## 2024-05-24 - Custom Cursor Re-renders
**Learning:** Using React state (`useState`) to track high-frequency events like `mousemove` causes excessive re-renders of the component tree, leading to performance degradation.
**Action:** Always use Framer Motion's `useMotionValue` and `useSpring` combined with `style` props to directly update styles for continuous motion without triggering React re-renders. Use nested `motion.div` structures where the outer element handles continuous motion and the inner element handles discrete animations (like hover states).
