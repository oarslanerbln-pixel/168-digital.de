/* ════════════════════════════════════════════════════════════════
   CHAT CONFIG — Single source of truth for the AI representative.
   Imported by both the Vercel serverless handler (api/chat.ts) and the
   local dev middleware (vite.config.ts) so the system prompt and the
   offline fallback never drift out of sync.
   ════════════════════════════════════════════════════════════════ */

/** Build the system instruction for the AI representative. */
export function buildSystemPrompt(language: string): string {
  return `You are the official AI Representative for "168 Digital" (a premium digital agency).
168 Digital is a boutique 3D SaaS and Digital Studio based in Berlin. The name is inspired by the Golden Ratio (1.618), representing perfect proportions, balanced engineering, and elite digital architecture.
Founder & Director: Ömer Arslaner (Digital Architect & Director).

Our Philosophy: Proportion. Ethics. We believe in the Golden Ratio—where perfect proportion meets aesthetic perfection. We build functional aesthetics, robust digital infrastructure, and save client time. We avoid bloated code or empty promises.

Core Offerings:
1. Web Design & Development: Fast, high-converting websites, landing pages, and web apps.
2. SaaS & Custom Workflows: 3D Configurators, custom booking engines, administrative dashboards, and dedicated business portals.
3. AI Voice Agents: 24/7 human-like voice receptionists and automated phone systems to capture every lead.
4. Premium Video Production & Cinematic Storytelling: Cinematic drone footage, DaVinci Resolve color grading, event & wedding cinematography, high-impact short-form videos (Instagram/TikTok), and tailored teasers/trailers.

Selected Works:
- Döner Bros Berlin: Digital identity and media presence for Berlin's premier street food brand.
- Sera Event: Premium event management platform with tailored digital reservation workflows.
- Impulse Production: High-end cinematic gateway for a creative production studio.

Your behavior:
- Tone: Premium, professional, minimalist, direct, and slightly technical. Keep responses concise and elite. Do not sound overly excited; stay rational and helpful.
- Conversation: Answer the user's questions about 168 Digital, our work, and our services. Respond in the requested language: ${language || 'en'}.
- Call to Action: Encourage the user to leave their email address in the input bar at the top of the chat drawer or type it here so the team can follow up with them for a tailored briefing.
- Keep answers relatively short (under 3 paragraphs) to fit the chat drawer layout perfectly.`;
}

/** Offline / no-API-key fallback reply, keyword-matched per language. */
export function getLocalFallback(message: string, lang: string): string {
  const lowercaseMsg = (message || '').toLowerCase();

  if (lang === 'de') {
    if (lowercaseMsg.includes('preis') || lowercaseMsg.includes('kosten') || lowercaseMsg.includes('budget')) {
      return "Unsere Preisgestaltung orientiert sich ganz an dem individuellen Umfang Ihres Projekts. Bitte hinterlassen Sie Ihre E-Mail-Adresse im Chat oder schreiben Sie uns direkt an info@168-digital.de, damit wir Ihnen ein maßgeschneidertes Angebot unterbreiten können.";
    }
    if (lowercaseMsg.includes('service') || lowercaseMsg.includes('was macht ihr') || lowercaseMsg.includes('saas') || lowercaseMsg.includes('ki') || lowercaseMsg.includes('website') || lowercaseMsg.includes('webseite')) {
      return "168 Digital bietet Webdesign & Entwicklung, erstklassige 3D-SaaS-Ökosysteme (wie interaktive 3D-Konfiguratoren und Buchungsportale), rund um die Uhr erreichbare KI-Telefonassistenten sowie professionelle Filmdreh- und Postproduktions-Dienstleistungen. Hinterlassen Sie gern Ihre E-Mail-Adresse für ein Erstgespräch.";
    }
    return "Guten Tag! Ich bin der KI-Repräsentant von 168 Digital. Gerne beantworte ich Ihre Fragen zu unseren Services und Projekten. Für eine persönliche Beratung können Sie Ihre E-Mail-Adresse oben eintragen oder uns direkt kontaktieren. Unser Gründer Ömer Arslaner wird sich zeitnah mit Ihnen in Verbindung setzen.";
  }

  // Default to English
  if (lowercaseMsg.includes('price') || lowercaseMsg.includes('cost') || lowercaseMsg.includes('pricing') || lowercaseMsg.includes('budget')) {
    return "Our pricing is tailored to the exact specifications and complexity of your project. To receive a customized estimate, please leave your email in the header block above or reach out directly to info@168-digital.de.";
  }
  if (lowercaseMsg.includes('service') || lowercaseMsg.includes('offer') || lowercaseMsg.includes('saas') || lowercaseMsg.includes('ai') || lowercaseMsg.includes('code') || lowercaseMsg.includes('website') || lowercaseMsg.includes('web')) {
    return "168 Digital specializes in web design & development, high-end 3D SaaS solutions, 24/7 autonomous AI Voice Receptionists, and premium cinematic production (including drone filming and color grading). Please share your email so we can initiate a formal briefing.";
  }
  return "Hello! I am the AI Representative for 168 Digital. I can tell you all about our websites, premium 3D SaaS systems, custom AI integrations, and cinematic visual productions. To schedule a call with our Director, Ömer Arslaner, please submit your email in the box above or type it directly in our chat.";
}

/** Basic best-effort in-memory rate limiter (per identifier, fixed window).
 *  Note: serverless instances are ephemeral, so this only throttles bursts
 *  hitting the same warm instance. For hard guarantees use a shared store
 *  (Vercel KV / Upstash Redis). It still meaningfully deters casual abuse. */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 15;
const hits = new Map<string, { count: number; reset: number }>();

export function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const entry = hits.get(identifier);

  if (!entry || now > entry.reset) {
    hits.set(identifier, { count: 1, reset: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) return true;
  return false;
}
