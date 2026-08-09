## 2026-08-09 - HTML5 Canvas String Allocation GC Pressure
**Learning:** Constructing style strings like `rgba()` and calculating constant values dynamically inside a canvas `requestAnimationFrame` loop creates unnecessary main-thread CPU overhead and high Garbage Collection (GC) pressure.
**Action:** Pre-compute static properties (e.g., color strings, scaled radii, and adjusted velocities) during object initialization to eliminate redundant math operations and string allocations on every frame.
