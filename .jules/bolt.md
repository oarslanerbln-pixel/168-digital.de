## 2024-05-18 - Continuous JS Animations Anti-Pattern
**Learning:** Found an anti-pattern where continuous background animations (infinite marquees) were driven by `framer-motion` instead of CSS. This causes constant main-thread activity, React layout/paint recalculations, and hardcoded pixel offsets that break on ultrawide screens.
**Action:** Always favor CSS `@keyframes` and percentage-based `transform: translateX` for continuous loops over `framer-motion` to offload work to the GPU and reduce React tree updates.
