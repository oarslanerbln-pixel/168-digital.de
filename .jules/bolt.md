## 2026-08-31 - Pre-calculated Canvas Colors
**Learning:** Found a 60fps canvas render loop doing expensive string interpolation (`rgba(...)`) inside the loop. This causes unnecessary CPU overhead and garbage collection.
**Action:** Pre-calculate static colors in the build phase and store them in the particle object to improve loop performance and prevent dropping frames.
