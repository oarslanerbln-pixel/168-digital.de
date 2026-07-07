## 2024-05-15 - Prevent Layout Thrashing on Custom Cursor
**Learning:** Using React's `useState` for high-frequency events like `mousemove` causes excessive re-renders and potential layout thrashing, severely impacting performance for components like custom cursors.
**Action:** Use Framer Motion's `useMotionValue` and `useSpring` to continuously track high-frequency variables directly, without triggering React component re-renders. Decouple continuous movement and discrete state animations (like hovers) by using a nested `motion.div` structure.
