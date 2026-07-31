## 2024-07-31 - Lazy loading large overlapping elements in React
**Learning:** When lazy loading large developer utilities or modal overlays using `React.lazy()`, relying solely on the component's internal conditional rendering props returning `null` does not prevent the bundler from eagerly fetching the component's chunk on initial page load.
**Action:** Combine `React.lazy()` with a `hasMounted` state flag to conditionally render the component's `<Suspense>` boundary only after active user interaction to defer downloading the chunk until it's actually needed.
