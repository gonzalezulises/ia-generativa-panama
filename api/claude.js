// Vercel Serverless — proxies to Anthropic API
// Keys are server-side only (not exposed in frontend bundle)

// Simple in-memory rate limiter
const rateMap = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60_000;

function checkRateLimit(key) {
  const now = Date.now();
  const entry = rateMap.get(key) || { count: 0, resetAt: now + RATE_WINDOW };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + RATE_WINDOW; }
  entry.count++;
  rateMap.set(key, entry);
  return entry.count <= RATE_LIMIT;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = ['https://ia-generativa-panama.vercel.app', 'http://localhost'];
  const corsOrigin = allowed.find(o => origin.startsWith(o)) || allowed[0];
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-presenter-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify presenter key
  const presenterKey = req.headers['x-presenter-key'];
  if (!presenterKey || presenterKey !== process.env.PRESENTER_KEY) {
    return res.status(403).json({ error: 'Modo presentador no activado' });
  }

  // Rate limit
  if (!checkRateLimit(presenterKey)) {
    return res.status(429).json({ error: 'Demasiadas solicitudes. Espera un momento.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server configuration error' });

  try {
    const { messages, temperature = 0.7, max_tokens = 500, system, stream = false } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const body = {
      model: 'claude-sonnet-4-20250514',
      messages,
      temperature: Math.min(Math.max(temperature, 0), 1),
      max_tokens: Math.min(max_tokens, 1000),
      stream,
    };
    if (system) body.system = system;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: error.error?.message || 'Anthropic API error' });
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(decoder.decode(value, { stream: true }));
        }
      } finally { res.end(); }
      return;
    }

    const data = await response.json();
    return res.status(200).json({ content: data.content?.[0]?.text || '', usage: data.usage });
  } catch {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
