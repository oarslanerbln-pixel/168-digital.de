## 2026-06-05 - Avoid React State for High-Frequency Mouse Events
**Learning:** Using `useState` to track `mousemove` events in the `CustomCursor` component triggered 60+ React re-renders per second, heavily impacting main thread performance.
**Action:** Always use `framer-motion`'s `useMotionValue` combined with `useSpring` (or standard `motion.div` transforms) to bypass React's render cycle completely for high-frequency DOM updates.
