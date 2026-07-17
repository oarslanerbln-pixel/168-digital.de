## 2024-07-17 - React State for High Frequency Events
**Learning:** Using `useState` for `mousemove` causes excessive re-renders and layout thrashing, severely degrading performance.
**Action:** Always use `framer-motion` primitives (`useMotionValue`, `useSpring`) to directly update styles for continuous, high-frequency interactions, and separate continuous tracking from discrete CSS transitions via nested wrappers.
