## 2024-05-15 - React Re-renders on High-Frequency Events
**Learning:** Using React state (`useState`) to track high-frequency `mousemove` events for a custom cursor causes excessive re-renders and potential layout thrashing across the application.
**Action:** Replace `useState` with Framer Motion's `useMotionValue` and `useSpring` for continuous values, and decouple continuous tracking from discrete hover states using nested `motion.div` components.
