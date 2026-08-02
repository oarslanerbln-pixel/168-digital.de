## 2024-08-02 - DevConsole Lazy Loading
**Learning:** Large developer utilities (like DevConsole) that are only accessed via keyboard shortcuts will bloat the initial production bundle if statically imported or lazily loaded but immediately mounted (even conditionally rendering `null` internally).
**Action:** Use `React.lazy()` for the component and wrap it in a `<Suspense>` boundary that is conditionally rendered only *after* a state flag (`hasConsoleMounted`) is set to true via the user's active interaction (shortcut/event).
