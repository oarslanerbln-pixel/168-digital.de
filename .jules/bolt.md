## 2024-08-14 - Pre-allocate strings in tight requestAnimationFrame loops
**Learning:** String interpolation (e.g., `rgba(${r}, ${g}, ${b}, ${a})`) inside a highly active `requestAnimationFrame` loop (like the AmbientBackground canvas) forces frequent garbage collection. This causes micro-stutters and frame drops that kill smooth animations.
**Action:** When a particle's color (or any string property) doesn't change every frame, pre-calculate it once in the `build()` or initialization phase instead of computing it dynamically in `draw()`. Also, pre-calculate loop constants like `Math.PI * 2`.
