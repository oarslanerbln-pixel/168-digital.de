import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own long-cacheable chunks so the
        // main bundle stays small.
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
