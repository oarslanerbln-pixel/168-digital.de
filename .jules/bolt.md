## 2024-05-24 - Lazily loading heavy 3D scenes
**Learning:** Initial bundle sizes can be heavily bloated by Three.js and react-three-fiber dependencies (over 800KB).
**Action:** Always verify if heavy 3D components like Hero3DScene need to block the initial render. Using React.lazy with a Suspense boundary splits these libraries into their own chunks, cutting the main bundle by over half and drastically improving TTI.
