## 2023-10-27 - Preventing List Re-renders in `Works.tsx`
**Learning:** Selecting a single project from a mapped list stored in the parent component's state (`Works.tsx`) triggered a re-render of all projects in the grid.
**Action:** Extract list items into a separate `ProjectCard` component, wrap it with `React.memo`, and wrap the state-updating handler in `useCallback` to prevent O(N) re-renders for O(1) state changes.
