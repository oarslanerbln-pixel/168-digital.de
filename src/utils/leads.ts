/* ════════════════════════════════════════════════════════════════
   LEADS — Delivers contact form & chat leads to email via Web3Forms
   ----------------------------------------------------------------
   Leads are delivered to whichever inbox registered the access key
   currently set in the VITE_WEB3FORMS_KEY env var — intended to be
   info.1618digital@gmail.com, the address published on the contact page
   and in the Impressum, so replies come from the same inbox visitors
   already write to. No server or SMTP password required.

   If the destination inbox ever needs to change, Web3Forms has no
   per-request "to" override — register a new key under the new inbox
   at https://web3forms.com, then update VITE_WEB3FORMS_KEY in Vercel
   (Project -> Settings -> Environment Variables) and redeploy. Do NOT
   commit the key itself to this file.

   The key is public by design: Vite inlines every VITE_* variable into
   the client bundle, so moving it out of this file keeps configuration
   in one place but hides nothing. Abuse protection has to come from
   Web3Forms itself (domain restriction, spam filtering).

   Two safety nets exist because this path once failed silently for
   weeks — the key was moved out of the code and never set in Vercel, so
   the minifier compiled sendLead() down to "warn and return false":
   - vite.config.ts refuses to build production without the key;
   - leadFallbackLinks() lets the visitor send the same text via
     WhatsApp or email when delivery fails for any reason, so an
     inquiry is never lost to a configuration or network problem.
   ════════════════════════════════════════════════════════════════ */

/** Same inbox as the Impressum and the contact page. */
export const LEAD_EMAIL = 'info.1618digital@gmail.com';
/** Same number as every wa.me link on the site, without "+". */
export const LEAD_WHATSAPP_NUMBER = '491787277867';

export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ||
  '';

export function isLeadDeliveryConfigured(): boolean {
  return (
    !!WEB3FORMS_ACCESS_KEY && !WEB3FORMS_ACCESS_KEY.startsWith('REPLACE_')
  );
}

export interface LeadPayload {
  /** Visitor's email — used as reply-to so you can answer directly. */
  email: string;
  name?: string;
  message?: string;
  /** Where the lead came from, e.g. "Contact Form" or "AI Chat". */
  source?: string;
}

/**
 * One-tap alternatives for when sendLead() fails: the visitor's own text,
 * pre-filled into a WhatsApp chat and into an email to the studio inbox.
 * Both are plain navigations the visitor triggers themselves — no request
 * leaves the page on its own, which keeps the DSGVO rule intact.
 */
export function leadFallbackLinks(
  body: string,
  subject: string
): { whatsapp: string; mailto: string } {
  return {
    whatsapp: `https://wa.me/${LEAD_WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`,
    mailto:
      `mailto:${LEAD_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`,
  };
}

/**
 * Send a lead to the configured inbox.
 * Returns true on success, false on failure or missing configuration.
 */
export async function sendLead(payload: LeadPayload): Promise<boolean> {
  if (!isLeadDeliveryConfigured()) {
    console.warn(
      '[leads] Web3Forms access key not configured — lead was NOT delivered. See src/utils/leads.ts'
    );
    return false;
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New lead — 1618 Digital (${payload.source || 'Website'})`,
        from_name: '1618 Digital Website',
        name: payload.name || 'Website Visitor',
        email: payload.email,
        message: payload.message || '(no message provided)',
        source: payload.source || 'Website',
      }),
    });

    const data = await response.json();
    return response.ok && data.success === true;
  } catch (error) {
    console.error('[leads] Failed to deliver lead:', error);
    return false;
  }
}
