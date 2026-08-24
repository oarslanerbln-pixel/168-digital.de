## 2024-05-18 - Canvas Drawing String Optimization
**Learning:** Using template literals (e.g., `rgba(r,g,b,${alpha})`) inside a 60fps canvas `requestAnimationFrame` loop causes significant garbage collection overhead and string parsing latency. Modifying `ctx.globalAlpha` instead of `ctx.fillStyle` dynamically is magnitudes faster since it avoids string allocations.
**Action:** When animating transparency in `<canvas>`, hoist the base `ctx.fillStyle = '#hex'` outside the loop and update `ctx.globalAlpha` inside the loop per frame/particle.
