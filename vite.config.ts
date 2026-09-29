import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/*
 * Refuse to build production without the lead-delivery key.
 *
 * VITE_* values are inlined at build time. When VITE_WEB3FORMS_KEY is
 * missing, the minifier folds sendLead() down to "warn and return false"
 * and the Web3Forms request disappears from the bundle entirely — the site
 * deploys green and the contact form, its only conversion path, drops
 * every inquiry. That happened once and went unnoticed for weeks. A failed
 * deploy is loud; a silently broken form is not.
 *
 * Scoped to Vercel's production environment: GitHub CI, preview
 * deployments and local builds have no key and must keep building.
 */
function assertLeadDeliveryConfigured(mode: string) {
  if (process.env.VERCEL_ENV !== 'production') return
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  if (!env.VITE_WEB3FORMS_KEY) {
    throw new Error(
      'VITE_WEB3FORMS_KEY is not set for this production build. Without it the ' +
        'contact form cannot deliver leads. Set it in Vercel → Project → Settings → ' +
        'Environment Variables (Production) and redeploy. See .env.example.'
    )
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  assertLeadDeliveryConfigured(mode)

  return {
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
  }
})
