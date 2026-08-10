## 2026-08-10 - Lazy Load Optimization using `hasMounted`
**Learning:** Using `React.lazy()` alone isn't enough to prevent eager bundle loading if the component is immediately rendered in the JSX but hidden by internal state/props.
**Action:** Combine `React.lazy()` with a `hasMounted` state to conditionally render the component's `<Suspense>` boundary only upon user interaction.
