## 2026-06-23 - [Framer Motion Custom Cursor]
**Learning:** [Using React `useState` to track high-frequency events like `mousemove` causes excessive and crippling layout re-renders on the main thread for the entire React application.]
**Action:** [Use Framer Motion's `useMotionValue` and `useSpring` to attach motion updates directly to the `style` object of `motion.div`. This skips the React rendering cycle entirely, vastly improving frame rates. Also animate `scale` rather than `width`/`height` for layout reflow prevention.]
