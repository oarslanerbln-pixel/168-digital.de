## 2024-05-18 - Prevent Unnecessary Re-renders in Lists

**Learning:** When clicking an item updates a parent component's state, inline list items will re-render needlessly. This is a common pattern in list rendering that can cause performance issues.
**Action:** Extract inline list items into separate components wrapped in `React.memo` and use stable callbacks (`useCallback`) to prevent unnecessary re-renders of the entire list. Pass primitives (like strings) down instead of the full object when possible (or evaluate translations in the parent).
