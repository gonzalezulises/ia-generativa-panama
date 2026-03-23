import { useState, useRef, useCallback, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Code, Eye, FileSearch, Sparkles, RefreshCw, Copy, Check, Thermometer, AlertCircle, Repeat, Lock, Unlock } from 'lucide-react';

// Model + presenter context — shared across all demos
const ModelContext = createContext({ model: 'openai', setModel: () => {}, presenterMode: false });

const MODELS = {
  openai: { label: 'GPT-4o-mini', provider: 'OpenAI', color: '#10a37f' },
  claude: { label: 'Claude Sonnet', provider: 'Anthropic', color: '#d97706' },
};

// Model selector — two buttons with brand colors
function ModelSelector() {
  const { model, setModel } = useContext(ModelContext);

  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => setModel('openai')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          model === 'openai'
            ? 'bg-[#10a37f]/20 border border-[#10a37f]/50 text-[#10a37f]'
            : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/></svg>
        GPT-4o-mini
      </button>
      <button
        onClick={() => setModel('claude')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          model === 'claude'
            ? 'bg-[#d97706]/20 border border-[#d97706]/50 text-[#d97706]'
            : 'bg-white/5 border border-white/10 text-gray-500 hover:text-gray-300'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.709 15.955l4.72-2.756.08-.046 2.803-1.636a.205.205 0 0 0 0-.355L8.088 8.522 4.709 6.522a.205.205 0 0 1 0-.355L12 2l7.291 4.167a.205.205 0 0 1 0 .355l-3.379 2-4.224 2.64a.205.205 0 0 0 0 .355l4.224 2.64 3.379 2a.205.205 0 0 1 0 .355L12 18.679l-7.291-4.167a.205.205 0 0 1 0-.355z"/></svg>
        Claude Sonnet
      </button>
    </div>
  );
}

// API helpers — all calls go through serverless functions (keys never in frontend)

async function streamSSE(res, onStream) {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    for (const line of chunk.split('\n').filter(l => l.startsWith('data: '))) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content || parsed.delta?.text || '';
        if (delta) { fullText += delta; onStream(fullText); }
      } catch { /* skip */ }
    }
  }
  return fullText;
}

async function callAI({ model = 'openai', messages, temperature = 0.7, max_tokens = 500, onStream, presenterKey }) {
  if (!presenterKey) throw new Error('Activa el modo presentador para usar los demos en vivo');

  const endpoint = model === 'claude' ? '/api/claude' : '/api/generate';

  // For Claude, extract system message
  let body = { messages, temperature, max_tokens, stream: !!onStream };
  if (model === 'claude') {
    const sysIdx = messages.findIndex(m => m.role === 'system');
    if (sysIdx !== -1) {
      body.system = messages[sysIdx].content;
      body.messages = messages.filter((_, i) => i !== sysIdx);
    }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-presenter-key': presenterKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Error ${res.status}`);
  }

  if (onStream) return streamSSE(res, onStream);

  const data = await res.json();
  return data.content || '';
}

// Temperature indicator
function TempIndicator({ value }) {
  const label = value <= 0.3 ? 'Preciso' : value <= 0.7 ? 'Balanceado' : value <= 1.2 ? 'Creativo' : 'Experimental';
  const color = value <= 0.3 ? 'text-blue-400' : value <= 0.7 ? 'text-emerald-400' : value <= 1.2 ? 'text-amber-400' : 'text-red-400';
  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}

// Demo 1: IstmoStory Studio — Real AI generation
function IstmoStoryDemo() {
  const { model, presenterKey } = useContext(ModelContext);
  const [tema, setTema] = useState('Canal de Panamá');
  const [tono, setTono] = useState('inspirador');
  const [temperatura, setTemperatura] = useState(0.7);
  const [generating, setGenerating] = useState(false);
  const [story, setStory] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const temas = ['Canal de Panamá', 'Biodiversidad', 'Vida urbana en PTY', 'Emprendimiento tech', 'Casco Viejo'];
  const tonos = ['inspirador', 'humor', 'thriller', 'documental'];

  const generateStory = async () => {
    setGenerating(true);
    setStory('');
    setError(null);

    try {
      await callAI({
        model, presenterKey,
        messages: [
          {
            role: 'system',
            content: `Eres un escritor creativo panameño. Genera un párrafo (3-5 oraciones) sobre el tema dado con el tono indicado. Solo texto narrativo, sin títulos ni marcadores. Contexto local de Panamá.`
          },
          {
            role: 'user',
            content: `Tema: ${tema}\nTono: ${tono}\n\nEscribe un párrafo narrativo.`
          }
        ],
        temperature: temperatura,
        max_tokens: 300,
        onStream: model === 'openai' ? (text) => setStory(text) : undefined,
      }).then(text => { if (model === 'claude') setStory(text); });
    } catch (err) {
      setError(err?.message || 'Error desconocido');
    }

    setGenerating(false);
  };

  const copyStory = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tema</label>
          <select value={tema} onChange={(e) => setTema(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none">
            {temas.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tono</label>
          <select value={tono} onChange={(e) => setTono(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none">
            {tonos.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Thermometer className="w-3 h-3" /> Temperatura: {temperatura.toFixed(1)}
            </span>
            <TempIndicator value={temperatura} />
          </label>
          <input type="range" min="0" max="1.5" step="0.1" value={temperatura}
            onChange={(e) => setTemperatura(parseFloat(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>0.0</span><span>0.5</span><span>1.0</span><span>1.5</span>
          </div>
        </div>
      </div>

      <button onClick={generateStory} disabled={generating} className="btn-primary flex items-center gap-2">
        {generating ? (
          <><RefreshCw className="w-4 h-4 animate-spin" /> Generando con IA...</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Generar</>
        )}
      </button>
      <ModelSelector />

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {story && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-200 leading-relaxed">{story}{generating && <span className="animate-pulse text-primary">|</span>}</p>
          {!generating && (
            <button onClick={copyStory} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
            </button>
          )}
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-4 text-xs text-gray-500">
            <span>Temp: {temperatura.toFixed(1)}</span>
            <span>Modelo: {MODELS[model]?.label}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 2: Code Mentor — Real AI analysis
function CodeMentorDemo() {
  const { model, presenterKey } = useContext(ModelContext);
  const [code, setCode] = useState(`function validarCedula(cedula) {
  // TODO: Implementar validación
  return true;
}`);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [temperatura, setTemperatura] = useState(0.3);
  const [error, setError] = useState(null);

  const analyze = async () => {
    setAnalyzing(true);
    setResult('');
    setError(null);

    try {
      await callAI({
        messages: [
          {
            role: 'system',
            content: `Eres un code reviewer senior. Analiza el código, encuentra problemas, sugiere mejoras y genera tests.
Formato de respuesta:
## Problemas
- (lista de problemas encontrados)

## Código Mejorado
\`\`\`javascript
(código mejorado)
\`\`\`

## Tests
\`\`\`javascript
(tests unitarios)
\`\`\`

Sé conciso. Contexto: Panamá (cédulas formato X-XXX-XXXX).`
          },
          { role: 'user', content: `Analiza este código:\n\`\`\`\n${code}\n\`\`\`` }
        ],
        model,
        temperature: temperatura,
        max_tokens: 800,
        onStream: model === 'openai' ? (text) => setResult(text) : undefined,
      }).then(text => { if (model === 'claude') setResult(text); });
    } catch (err) {
      setError(err?.message || 'Error desconocido');
    }

    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Tu código</label>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={6}
          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-green-400 font-mono text-sm focus:border-primary focus:outline-none" />
      </div>

      <div className="flex items-center gap-4">
        <button onClick={analyze} disabled={analyzing} className="btn-primary flex items-center gap-2">
          {analyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Analizando...</>
          ) : (
            <><Code className="w-4 h-4" /> Analizar</>
          )}
        </button>
        <ModelSelector />
        <div className="flex items-center gap-2 flex-1">
          <Thermometer className="w-3 h-3 text-gray-500" />
          <input type="range" min="0" max="1" step="0.1" value={temperatura}
            onChange={(e) => setTemperatura(parseFloat(e.target.value))}
            className="flex-1 accent-primary" />
          <span className="text-xs text-gray-500 w-8">{temperatura.toFixed(1)}</span>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">{result}{analyzing && <span className="animate-pulse text-primary">|</span>}</pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 3: Vision Explainer — AI-powered image description
function VisionDemo() {
  const { model, presenterKey } = useContext(ModelContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [temperatura, setTemperatura] = useState(0.7);
  const [error, setError] = useState(null);

  const images = [
    { name: 'Canal de Panamá', img: 'https://images.pexels.com/photos/2906490/pexels-photo-2906490.jpeg?auto=compress&cs=tinysrgb&w=600', scene: 'Las esclusas de Miraflores del Canal de Panamá con buques de carga cruzando. Compuertas metálicas masivas, agua, infraestructura portuaria, vegetación tropical alrededor.' },
    { name: 'Selva Tropical', img: 'https://images.pexels.com/photos/28769443/pexels-photo-28769443.jpeg?auto=compress&cs=tinysrgb&w=600', scene: 'Selva tropical exuberante con vegetación densa, helechos gigantes, hojas verdes brillantes, niebla entre los árboles. Biodiversidad tropical centroamericana.' },
    { name: 'Casco Viejo', img: 'https://images.pexels.com/photos/22194974/pexels-photo-22194974.jpeg?auto=compress&cs=tinysrgb&w=600', scene: 'Casco Viejo de Panamá. Edificio colonial con fachada deteriorada, balcones de hierro forjado, acera empedrada, arquitectura histórica del siglo XVII.' },
    { name: 'Skyline Ciudad', img: 'https://images.pexels.com/photos/18185251/pexels-photo-18185251.jpeg?auto=compress&cs=tinysrgb&w=600', scene: 'Skyline de Ciudad de Panamá con rascacielos modernos, bahía de Panamá, edificios de vidrio y acero, cielo despejado, vista panorámica costera.' }
  ];

  const analyzeImage = async () => {
    setAnalyzing(true);
    setResult('');
    setError(null);

    try {
      await callAI({
        messages: [
          {
            role: 'system',
            content: `Eres un modelo de visión multimodal analizando una imagen. Genera un análisis completo en este formato:

**Descripción:** (1-2 oraciones describiendo la escena)

**Objetos detectados:** (lista separada por comas)

**Copy para redes:** (1 tweet con emojis y hashtags)

**Dato curioso:** (1 dato interesante sobre lo que se ve)

Sé específico y preciso con detalles de Panamá.`
          },
          { role: 'user', content: `Analiza esta imagen: ${images[selectedImage].scene}` }
        ],
        model,
        temperature: temperatura,
        max_tokens: 400,
        onStream: model === 'openai' ? (text) => setResult(text) : undefined,
      }).then(text => { if (model === 'claude') setResult(text); });
    } catch (err) {
      setError(err?.message || 'Error desconocido');
    }

    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Image selector thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button key={i}
            onClick={() => { setSelectedImage(i); setResult(''); }}
            className={`rounded-xl border overflow-hidden transition-all ${
              selectedImage === i ? 'border-primary ring-2 ring-primary/30' : 'border-white/10 hover:border-white/30'
            }`}>
            <img src={img.img} alt={img.name} className="w-full h-20 object-cover" />
            <div className="px-2 py-1.5 bg-black/60 text-xs text-gray-300 text-center">{img.name}</div>
          </button>
        ))}
      </div>

      {/* Selected image preview */}
      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <img src={images[selectedImage].img} alt={images[selectedImage].name}
          className="w-full h-64 object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <span className="text-sm text-white font-medium">{images[selectedImage].name}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={analyzeImage} disabled={analyzing} className="btn-primary flex items-center gap-2">
          {analyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Analizando...</>
          ) : (
            <><Eye className="w-4 h-4" /> Analizar</>
          )}
        </button>
        <ModelSelector />
        <div className="flex items-center gap-2 flex-1">
          <Thermometer className="w-3 h-3 text-gray-500" />
          <input type="range" min="0" max="1.5" step="0.1" value={temperatura}
            onChange={(e) => setTemperatura(parseFloat(e.target.value))}
            className="flex-1 accent-primary" />
          <TempIndicator value={temperatura} />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-300">{result}{analyzing && <span className="animate-pulse text-primary">|</span>}</pre>
        </motion.div>
      )}
    </div>
  );
}

// Demo 4: RAG + Agent — AI-powered Q&A
function RAGDemo() {
  const { model, presenterKey } = useContext(ModelContext);
  const [question, setQuestion] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchPhase, setSearchPhase] = useState('');
  const [result, setResult] = useState('');
  const [temperatura, setTemperatura] = useState(0.3);
  const [error, setError] = useState(null);

  const sampleQuestions = [
    '¿Qué exige la Ley 81 sobre protección de datos?',
    '¿Cuál es la estrategia nacional de IA de Panamá?',
    '¿Cómo puede una PYME panameña empezar con IA?'
  ];

  const search = async (q = question) => {
    if (!q.trim()) return;
    setSearching(true);
    setResult('');
    setError(null);

    // Simulate RAG phases
    setSearchPhase('Buscando en documentos...');
    await new Promise(r => setTimeout(r, 800));
    setSearchPhase('Fragmentos relevantes encontrados (3)');
    await new Promise(r => setTimeout(r, 600));
    setSearchPhase('Generando respuesta con contexto...');

    try {
      await callAI({
        messages: [
          {
            role: 'system',
            content: `Eres un asistente RAG especializado en Panamá. Responde basándote en estos documentos simulados:

[DOC1] Ley 81 de 2019: Protección de datos personales. Exige consentimiento, finalidad específica, derechos ARCO.
[DOC2] SENACYT Feb 2025: Estrategia Nacional de IA. Madurez 2.3/5.0. Ejes: talento, regulación, sector público, investigación.
[DOC3] Portal de Datos Abiertos: 150+ datasets. Presupuesto, salud, educación, transporte. API REST disponible.
[DOC4] Spark AI Summit 2025: Comunidad IA Panamá. +500 asistentes. Casos de Jetour, ISJUP, CSS.
[DOC5] Guía PYME y IA: Empezar con chatbot, automatizar atención, medir ROI en 90 días.

Formato de respuesta:
1. Respuesta directa (2-3 oraciones)
2. **Fuentes:** lista de documentos usados [DOC#]
3. **Acciones sugeridas:** 2-3 acciones concretas

Sé preciso y cita las fuentes.`
          },
          { role: 'user', content: q }
        ],
        model,
        temperature: temperatura,
        max_tokens: 500,
        onStream: model === 'openai' ? (text) => setResult(text) : undefined,
      }).then(text => { if (model === 'claude') setResult(text); });
    } catch (err) {
      setError(err?.message || 'Error desconocido');
    }

    setSearchPhase('');
    setSearching(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((q, i) => (
          <button key={i}
            onClick={() => { setQuestion(q); search(q); }}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && search()}
          placeholder="Pregunta sobre IA en Panamá..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none" />
        <button onClick={() => search()} disabled={searching || !question.trim()} className="btn-primary px-6">
          {searching ? <RefreshCw className="w-5 h-5 animate-spin" /> : <FileSearch className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <ModelSelector />
        <Thermometer className="w-3 h-3 text-gray-500" />
        <input type="range" min="0" max="1" step="0.1" value={temperatura}
          onChange={(e) => setTemperatura(parseFloat(e.target.value))}
          className="flex-1 accent-primary" />
        <span className="text-xs text-gray-500">Temp: {temperatura.toFixed(1)}</span>
        <TempIndicator value={temperatura} />
      </div>

      {searchPhase && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-primary">
          <RefreshCw className="w-4 h-4 animate-spin" />
          {searchPhase}
        </motion.div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6">
          <pre className="whitespace-pre-wrap text-sm text-gray-300">{result}{searching && <span className="animate-pulse text-primary">|</span>}</pre>
        </motion.div>
      )}
    </div>
  );
}

// Main Demos component
export default function Demos() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [model, setModel] = useState('openai');
  const [presenterKey, setPresenterKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const demos = [
    { id: 0, title: 'IstmoStory Studio', subtitle: 'Generación de Contenido', icon: PenTool, color: '#00B4D8', component: IstmoStoryDemo },
    { id: 1, title: 'Code Mentor', subtitle: 'Análisis de Código', icon: Code, color: '#10B981', component: CodeMentorDemo },
    { id: 2, title: 'Vision Explainer', subtitle: 'IA Multimodal', icon: Eye, color: '#F43F5E', component: VisionDemo },
    { id: 3, title: 'RAG + Agente', subtitle: 'Q&A con Documentos', icon: FileSearch, color: '#8B5CF6', component: RAGDemo }
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <ModelContext.Provider value={{ model, setModel, presenterKey }}>
      <section id="demos" className="py-24 relative bg-bg-dark">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
              Demos en Vivo — Multi-herramienta
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              4 <span className="gradient-text">Demos</span> con IA Real
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cambia entre OpenAI y Claude en cada demo. Ajusta la temperatura y compara resultados.
            </p>

            {/* Presenter mode toggle */}
            <div className="mt-6 flex justify-center">
              {presenterKey ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <Unlock className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">Modo presentador activo</span>
                  <button onClick={() => setPresenterKey('')} className="ml-2 text-xs text-gray-500 hover:text-red-400 transition-colors">Desactivar</button>
                </div>
              ) : showKeyInput ? (
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    placeholder="Clave de presentador"
                    autoFocus
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-primary focus:outline-none w-48"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        setPresenterKey(e.target.value);
                        setShowKeyInput(false);
                      }
                      if (e.key === 'Escape') setShowKeyInput(false);
                    }}
                  />
                  <button onClick={() => setShowKeyInput(false)} className="text-xs text-gray-500 hover:text-white">Cancelar</button>
                </div>
              ) : (
                <button
                  onClick={() => setShowKeyInput(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Demos bloqueados — clic para activar modo presentador</span>
                </button>
              )}
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <button key={demo.id} onClick={() => setActiveDemo(demo.id)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
                    activeDemo === demo.id ? 'bg-white/10 border-2' : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                  style={{ borderColor: activeDemo === demo.id ? demo.color : undefined }}>
                  <Icon className="w-5 h-5" style={{ color: demo.color }} />
                  <div className="text-left">
                    <div className="text-white font-medium text-sm">{demo.title}</div>
                    <div className="text-gray-500 text-xs">{demo.subtitle}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div key={activeDemo} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8">
            <ActiveComponent />
          </motion.div>
        </div>
      </section>
    </ModelContext.Provider>
  );
}
