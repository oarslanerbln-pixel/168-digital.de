import type { VercelRequest, VercelResponse } from '@vercel/node';
import { buildSystemPrompt, getLocalFallback, isRateLimited } from './chatConfig';

const ALLOWED_ORIGINS = [
  'https://1618-digital.de',
  'https://www.1618-digital.de',
  'http://localhost:5174',
];

function applyCors(req: VercelRequest, res: VercelResponse) {
  const origin = String(req.headers.origin || '');
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd)) return fwd[0];
  return req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (isRateLimited(clientIp(req))) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  try {
    const { message, language, history, customPrompt } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message parameter' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Using local fallback.');
      return res.status(200).json({ reply: getLocalFallback(message, language || 'en') });
    }

    // Map history to Google's contents structure
    const formattedHistory = Array.isArray(history)
      ? history.map((item: any) => ({
          role: item.role === 'model' ? 'model' : 'user',
          parts: Array.isArray(item.parts) ? item.parts : [{ text: String(item.text || '') }],
        }))
      : [];

    // Append the current message
    formattedHistory.push({ role: 'user', parts: [{ text: message }] });

    const requestBody = {
      contents: formattedHistory,
      systemInstruction: {
        parts: [{ text: customPrompt || buildSystemPrompt(language || 'en') }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 600,
      },
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API returned status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in chat API handler:', error);
    const lang = req.body?.language || 'en';
    return res.status(200).json({ reply: getLocalFallback(req.body?.message || '', lang) });
  }
}
