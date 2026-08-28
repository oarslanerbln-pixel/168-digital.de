
## 2026-08-28 - Optimizing hidden intervals and decorative component re-renders
**Learning:** Purely decorative, expensive components (like `HeroEmblem` or `ConceptMockup` in a large list) can easily bloat React's render cycles if they are updated frequently, even if their state hasn't changed. Furthermore, intervals driving visual state in below-the-fold components (like `Reel.tsx`'s carousel) will continue ticking off-screen causing a high volume of pointless re-renders.
**Action:** Use `React.memo` aggressively on pure declarative subcomponents that do not depend on external state. Always pause intervals (`setInterval`, `requestAnimationFrame`) when a component is not `inView` (using IntersectionObserver or framer-motion's `whileInView`/viewport features).
