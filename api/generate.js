// Vercel Serverless — proxies to OpenAI
// Keys are server-side only (not exposed in frontend bundle)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-presenter-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify presenter key
  const presenterKey = req.headers['x-presenter-key'];
  if (!presenterKey || presenterKey !== process.env.PRESENTER_KEY) {
    return res.status(403).json({ error: 'Modo presentador no activado' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

  try {
    const { messages, temperature = 0.7, max_tokens = 500, stream = false } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: Math.min(Math.max(temperature, 0), 2),
        max_tokens: Math.min(max_tokens, 1000),
        stream,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: error.error?.message || 'OpenAI API error' });
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
    return res.status(200).json({ content: data.choices?.[0]?.message?.content || '', usage: data.usage });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
