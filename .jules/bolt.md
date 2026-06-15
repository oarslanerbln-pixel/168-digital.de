## 2024-05-18 - Framer Motion State vs MotionValue
**Learning:** High-frequency events like mousemove cause layout thrashing and excessive React component re-renders when directly tied to `useState`. While we've seen this before, Framer Motion provides a specific fix for this pattern: assigning `motionValues` directly to the `x` and `y` properties on a `motion.div` style object.
**Action:** Use `useMotionValue` and `useSpring` tied directly to a `motion.div` style prop instead of React state for any value that updates on every mouse movement.
