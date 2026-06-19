## 2026-06-19 - [CustomCursor High-Frequency React Renders]
**Learning:** React component `CustomCursor` was using `useState` to track `mousemove` events, triggering unnecessary and expensive React re-renders for the entire component tree on every single pixel of mouse movement.
**Action:** Use Framer Motion's `useMotionValue` combined with `useSpring` and pass them directly to the `motion.div` `style` prop to bypass the React render cycle completely and let Framer Motion directly manipulate the DOM.
