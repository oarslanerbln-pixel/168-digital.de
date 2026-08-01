## 2024-05-19 - React Batching in Keydown Events
**Learning:** State updates triggered within a React `KeyboardEvent` (like `keydown`) are batched together. However, calling a state setter inside the updater function of *another* state setter is an anti-pattern. While it might functionally work in production builds, it violates the pure-updater rule and causes issues in Strict Mode.
**Action:** When multiple state updates need to happen on a keyboard shortcut, trigger them sequentially inside the event handler instead of nesting them inside the updater callback.
