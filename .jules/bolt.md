## 2024-05-24 - React.memo Optimization in Works.tsx
**Learning:** Re-rendering an entire list of complex components with `framer-motion` animations whenever a single item is selected (to show a modal) is a performance anti-pattern.
**Action:** Always extract complex list items into separate memoized components when passing simple props and stable callbacks, so state updates in the parent (`Works.tsx`) do not trigger expensive re-renders across all siblings.
