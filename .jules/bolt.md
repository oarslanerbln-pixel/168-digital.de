## 2024-07-15 - React State in High-Frequency Events
**Learning:** CustomCursor.tsx used `useState` to track `mousemove` events, causing the entire component to re-render on every pixel moved.
**Action:** Use framer-motion's `useMotionValue` and `useSpring` to directly update the DOM bypassing React state updates. Separate continuous movement from discrete hover state using a nested `motion.div`.
