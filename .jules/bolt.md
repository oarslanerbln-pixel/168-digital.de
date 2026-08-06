## 2024-05-20 - [Pre-computing static properties in requestAnimationFrame loops]
**Learning:** [In HTML5 Canvas particle systems, dynamic template string allocations (like `rgba(...)`) and repeated static math operations inside a `requestAnimationFrame` loop cause unnecessary Garbage Collection (GC) pressure and CPU overhead, especially at high frame rates.]
**Action:** [Pre-compute static string properties (like colors) and scaled values during initialization and attach them to the particle object so the render loop only reads properties and performs minimal math updates.]
