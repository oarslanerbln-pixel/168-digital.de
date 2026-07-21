import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSystemPrompt, getLocalFallback } from './api/chatConfig'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-chat-mock',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/chat' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body);
                const apiKey = process.env.GEMINI_API_KEY;
                let reply = '';

                if (apiKey) {
                  const systemPrompt = buildSystemPrompt(parsed.language || 'en');

                  const formattedHistory = Array.isArray(parsed.history)
                    ? parsed.history.map((item: any) => ({
                        role: item.role === 'model' ? 'model' : 'user',
                        parts: Array.isArray(item.parts) ? item.parts : [{ text: String(item.text || '') }]
                      }))
                    : [];

                  formattedHistory.push({
                    role: 'user',
                    parts: [{ text: parsed.message }]
                  });

                  const requestBody = {
                    contents: formattedHistory,
                    systemInstruction: {
                      parts: [{ text: systemPrompt }]
                    },
                    generationConfig: {
                      temperature: 0.7,
                      maxOutputTokens: 600
                    }
                  };

                  try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(requestBody)
                    });

                    if (response.ok) {
                      const data = await response.json();
                      reply = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    } else {
                      console.error(`Gemini API error status: ${response.status}`);
                    }
                  } catch (fetchErr) {
                    console.error('Gemini API fetch failed:', fetchErr);
                  }
                }

                if (!reply) {
                  reply = getLocalFallback(parsed.message, parsed.language || 'en');
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ reply }));
              } catch (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy vendors into their own long-cacheable chunks so the
        // main bundle stays small and 3D libs only load when needed.
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
