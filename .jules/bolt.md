
## 2024-05-30 - Prevent React state layout thrashing in custom cursor
**Learning:** High-frequency events like `mousemove` mapped directly to React state (`useState`) can cause excessive re-renders and layout thrashing.
**Action:** Use Framer Motion's `useMotionValue` and `useSpring` to directly manipulate DOM attributes in a `motion.div` bypassing React renders, and nest components if both continuous and discrete animations are needed.
