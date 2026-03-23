import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Code, Eye, FileSearch, Sparkles, RefreshCw, Copy, Check, Thermometer, AlertCircle } from 'lucide-react';

// API helper — calls OpenAI directly
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

async function callAI({ messages, temperature = 0.7, max_tokens = 500, onStream }) {
  if (!OPENAI_KEY) throw new Error('API key no configurada. Agrega VITE_OPENAI_API_KEY al .env');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: Math.min(Math.max(temperature, 0), 2),
      max_tokens: Math.min(max_tokens, 1000),
      stream: !!onStream,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error ${res.status}`);
  }

  // Streaming
  if (onStream) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const delta = parsed.choices?.[0]?.delta?.content || '';
          fullText += delta;
          onStream(fullText);
        } catch { /* skip */ }
      }
    }
    return fullText;
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

// Temperature indicator
function TempIndicator({ value }) {
  const label = value <= 0.3 ? 'Preciso' : value <= 0.7 ? 'Balanceado' : value <= 1.2 ? 'Creativo' : 'Experimental';
  const color = value <= 0.3 ? 'text-blue-400' : value <= 0.7 ? 'text-emerald-400' : value <= 1.2 ? 'text-amber-400' : 'text-red-400';
  return <span className={`text-xs font-medium ${color}`}>{label}</span>;
}

// Demo 1: IstmoStory Studio — Real AI generation
function IstmoStoryDemo() {
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
        onStream: (text) => setStory(text),
      });
    } catch (err) {
      setError(err.message);
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
          <><Sparkles className="w-4 h-4" /> Generar con GPT-4o-mini</>
        )}
      </button>

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
            <span>Modelo: gpt-4o-mini</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Demo 2: Code Mentor — Real AI analysis
function CodeMentorDemo() {
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
        temperature: temperatura,
        max_tokens: 800,
        onStream: (text) => setResult(text),
      });
    } catch (err) {
      setError(err.message);
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
            <><Code className="w-4 h-4" /> Analizar con IA</>
          )}
        </button>
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState('');
  const [temperatura, setTemperatura] = useState(0.7);
  const [error, setError] = useState(null);

  const images = [
    { name: 'Canal de Panamá', emoji: '🚢', scene: 'Las esclusas de Miraflores del Canal de Panamá con un buque portacontenedores cruzando. Agua turquesa, compuertas metálicas masivas, vegetación tropical alrededor.' },
    { name: 'Selva Tropical', emoji: '🌴', scene: 'Selva tropical del Darién en Panamá. Vegetación exuberante, árboles gigantes, niebla matutina, un río cristalino. Aves coloridas (tucanes, quetzales).' },
    { name: 'Casco Viejo', emoji: '🏛️', scene: 'Casco Viejo de Panamá. Edificios coloniales restaurados con balcones de hierro forjado, calles empedradas, iglesia al fondo, atardecer dorado.' },
    { name: 'Skyline Ciudad', emoji: '🏙️', scene: 'Skyline de Ciudad de Panamá desde la Cinta Costera. Rascacielos modernos (F&F Tower, JW Marriott), bahía de Panamá, atardecer naranja y púrpura.' }
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
        temperature: temperatura,
        max_tokens: 400,
        onStream: (text) => setResult(text),
      });
    } catch (err) {
      setError(err.message);
    }

    setAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button key={i}
            onClick={() => { setSelectedImage(i); setResult(''); }}
            className={`p-4 rounded-xl border transition-all ${
              selectedImage === i ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}>
            <div className="text-3xl mb-2">{img.emoji}</div>
            <div className="text-xs text-gray-400">{img.name}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button onClick={analyzeImage} disabled={analyzing} className="btn-primary flex items-center gap-2">
          {analyzing ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Analizando...</>
          ) : (
            <><Eye className="w-4 h-4" /> Analizar con IA</>
          )}
        </button>
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
        temperature: temperatura,
        max_tokens: 500,
        onStream: (text) => setResult(text),
      });
    } catch (err) {
      setError(err.message);
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

  const demos = [
    { id: 0, title: 'IstmoStory Studio', subtitle: 'Generación de Contenido', icon: PenTool, color: '#00B4D8', component: IstmoStoryDemo },
    { id: 1, title: 'Code Mentor', subtitle: 'Análisis de Código', icon: Code, color: '#10B981', component: CodeMentorDemo },
    { id: 2, title: 'Vision Explainer', subtitle: 'IA Multimodal', icon: Eye, color: '#F43F5E', component: VisionDemo },
    { id: 3, title: 'RAG + Agente', subtitle: 'Q&A con Documentos', icon: FileSearch, color: '#8B5CF6', component: RAGDemo }
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
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
            Demos en Vivo con IA Real
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            4 <span className="gradient-text">Demos</span> con GPT-4o-mini
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Generación real con OpenAI. Ajusta la temperatura y observa cómo cambia el resultado.
          </p>
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
  );
}
