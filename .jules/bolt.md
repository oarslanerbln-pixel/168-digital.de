## 2025-02-28 - [Ambient Background CPU usage]
**Learning:** The AmbientBackground component redraws particles continuously using requestAnimationFrame unless prefers-reduced-motion is enabled. This can lead to high CPU usage on the main thread for devices that do not have prefers-reduced-motion set, particularly because of the large number of particles.
**Action:** Used Page Visibility API to pause the requestAnimationFrame loop when the tab is not in view to save resources.
