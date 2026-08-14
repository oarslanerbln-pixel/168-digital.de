import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {isAnalyticsAllowed() && <Analytics />}
  </React.StrictMode>,
)
