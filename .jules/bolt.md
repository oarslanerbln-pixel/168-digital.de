
## 2024-05-30 - High-frequency events with Framer Motion
**Learning:** Updating React state on every `mousemove` event causes a full component re-render 60+ times per second, leading to severe layout thrashing and high CPU usage.
**Action:** Use Framer Motion's `useMotionValue` and `useSpring` to track coordinates and update `motion.div` styles directly, bypassing the React render cycle for high-frequency events.
