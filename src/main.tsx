import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App, { preloadRoute } from './App.tsx'
import './index.css'
import './i18n'
import { Analytics } from '@vercel/analytics/react'
import { isAnalyticsAllowed } from './components/CookieConsent'
import { initThirdPartyAnalytics } from './utils/thirdPartyAnalytics'

// DSGVO: Only load analytics if user explicitly consented via Cookie Banner.
// (CookieConsent reloads the page on every consent change, so this always
// reflects the current choice — no separate re-init path is needed.)
if (isAnalyticsAllowed()) {
  initThirdPartyAnalytics()
}

// Load this URL's page chunk first: the prerendered page stays on screen
// meanwhile, and React's first commit can then swap in the same page
// instead of an empty Suspense fallback (see lazyPage in App.tsx). A
// failed preload just falls back to the normal lazy load.
preloadRoute(window.location.pathname)
  .catch(() => undefined)
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {isAnalyticsAllowed() && <Analytics />}
      </React.StrictMode>,
    )
  })
