## 2024-05-15 - React Component Re-rendering on State Changes
**Learning:** In list rendering situations where clicking an item changes a parent's state (e.g. tracking `selectedItem`), inline rendering of the list items causes the entire list to re-render.
**Action:** Extract list items into their own components and wrap them with `React.memo` so that only the changed item and its parent re-render, preventing unnecessary layout and DOM diffing calculations.
