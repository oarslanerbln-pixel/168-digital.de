/* ════════════════════════════════════════════════════════════════
   LEADS — Delivers contact form & chat leads to email via Web3Forms
   ----------------------------------------------------------------
   Leads are delivered to the inbox that registered the access key
   (arslaner1993@gmail.com). No server or SMTP password required.

   Get your free access key in 30 seconds:
     1. Go to https://web3forms.com
     2. Enter arslaner1993@gmail.com  ->  a key is emailed to you
     3. Paste it below as WEB3FORMS_ACCESS_KEY, OR set the environment
        variable VITE_WEB3FORMS_KEY (recommended, e.g. in Vercel).
   ════════════════════════════════════════════════════════════════ */

export const WEB3FORMS_ACCESS_KEY =
  (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) ||
  'd10c80c0-53bb-42bc-8c88-13b634b41996';

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
        subject: `New lead — 168 Digital (${payload.source || 'Website'})`,
        from_name: '168 Digital Website',
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
