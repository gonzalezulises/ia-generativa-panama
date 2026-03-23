// Vercel Serverless Function — proxies to Anthropic API
// Required because Anthropic doesn't support browser CORS

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });

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
      } finally {
        res.end();
      }
      return;
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    return res.status(200).json({ content, usage: data.usage });
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
