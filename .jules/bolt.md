## 2024-08-30 - Prevent recalculations inside RequestAnimationFrame

**Learning:** When writing canvas animations using `requestAnimationFrame`, avoid doing constant calculations per frame that do not change over time. Operations like multiplying random offsets or constructing complex `rgba()` strings every single frame can add up and affect rendering performance.
**Action:** Pre-calculate these static values once during the initialization phase (e.g. in the `build()` method) and store them in the particle object. Use these pre-computed values during the render (`draw()`) loop.
