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
   ════════════════════════════════════════════════════════════════ */

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
