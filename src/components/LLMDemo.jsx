import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Lightbulb, Puzzle, Zap, Brain, Database, Wrench, Bot } from 'lucide-react';
import { llmConcepts } from '../data/content';

const iconMap = {
  tokenization: Puzzle,
  attention: Lightbulb,
  generation: Zap,
  rag: Database,
  tools: Wrench,
  agents: Bot
};

// Tokenizer demo
function TokenizerDemo() {
  const [inputText, setInputText] = useState('La IA generativa transforma Panamá');
  const [tokens, setTokens] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getTokenColor = (index) => {
    const colors = [
      'bg-primary/20 border-primary text-primary',
      'bg-emerald-500/20 border-emerald-500 text-emerald-400',
      'bg-rose-500/20 border-rose-500 text-rose-400',
      'bg-amber-500/20 border-amber-500 text-amber-400',
      'bg-violet-500/20 border-violet-500 text-violet-400',
      'bg-cyan-500/20 border-cyan-500 text-cyan-400'
    ];
    return colors[index % colors.length];
  };

  const runTokenization = () => {
    setIsAnimating(true);
    setTokens([]);
    const words = inputText.split(/(\s+)/);
    const newTokens = words.map((word, i) => ({
      id: i, text: word, isSpace: /^\s+$/.test(word), color: getTokenColor(i)
    }));
    newTokens.forEach((token, index) => {
      setTimeout(() => {
        setTokens(prev => [...prev, token]);
        if (index === newTokens.length - 1) setIsAnimating(false);
      }, index * 150);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Escribe un texto:</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="Escribe algo..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runTokenization}
            disabled={isAnimating}
            className="btn-primary px-6"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      <div className="glass rounded-xl p-6 min-h-[120px]">
        <div className="flex flex-wrap gap-2 items-center">
          <AnimatePresence>
            {tokens.map((token, index) => (
              <motion.span
                key={token.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg border ${token.color} ${token.isSpace ? 'bg-white/5 border-white/20' : ''}`}
              >
                {token.isSpace ? '␣' : token.text}
                <span className="ml-2 text-xs opacity-50">[{index}]</span>
              </motion.span>
            ))}
          </AnimatePresence>
          {tokens.length === 0 && !isAnimating && (
            <span className="text-gray-500 text-sm">Presiona Play para ver la tokenización</span>
          )}
        </div>
      </div>

      {tokens.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Total: <span className="text-primary font-bold">{tokens.filter(t => !t.isSpace).length}</span> tokens
            <span className="text-gray-500 ml-2">· Costo aprox: ${(tokens.filter(t => !t.isSpace).length * 0.00001).toFixed(5)}</span>
          </span>
          <button onClick={() => setTokens([])} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" /> Reiniciar
          </button>
        </motion.div>
      )}
    </div>
  );
}

// Attention visualization
function AttentionDemo() {
  const sentence = "El gato que vive en mi casa duerme";
  const words = sentence.split(' ');
  const [activeWord, setActiveWord] = useState(null);

  const attentionWeights = {
    'duerme': { 'El': 0.1, 'gato': 0.7, 'que': 0.05, 'vive': 0.3, 'en': 0.02, 'mi': 0.05, 'casa': 0.2, 'duerme': 1 },
    'casa': { 'El': 0.05, 'gato': 0.2, 'que': 0.05, 'vive': 0.4, 'en': 0.3, 'mi': 0.6, 'casa': 1, 'duerme': 0.1 },
    'gato': { 'El': 0.8, 'gato': 1, 'que': 0.2, 'vive': 0.3, 'en': 0.1, 'mi': 0.1, 'casa': 0.2, 'duerme': 0.4 },
    'vive': { 'El': 0.1, 'gato': 0.5, 'que': 0.3, 'vive': 1, 'en': 0.4, 'mi': 0.2, 'casa': 0.6, 'duerme': 0.1 },
    'El': { 'El': 1, 'gato': 0.7, 'que': 0.1, 'vive': 0.05, 'en': 0.02, 'mi': 0.02, 'casa': 0.05, 'duerme': 0.05 },
  };

  const getOpacity = (word) => {
    if (!activeWord || !attentionWeights[activeWord]) return 0.3;
    return attentionWeights[activeWord][word] || 0.1;
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">
        Haz clic en una palabra resaltada para ver cómo el modelo distribuye su "atención":
      </p>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {words.map((word, index) => {
            const isActive = activeWord === word;
            const opacity = getOpacity(word);
            const hasWeights = !!attentionWeights[word];

            return (
              <motion.button
                key={index}
                onClick={() => hasWeights && setActiveWord(isActive ? null : word)}
                whileHover={hasWeights ? { scale: 1.1 } : {}}
                whileTap={hasWeights ? { scale: 0.95 } : {}}
                className={`relative px-4 py-2 rounded-lg transition-all ${
                  isActive ? 'bg-primary text-black font-bold' : hasWeights ? 'bg-white/10 text-white border border-white/20 hover:border-primary/50' : 'bg-white/5 text-white'
                }`}
                style={{
                  opacity: activeWord ? Math.max(opacity, 0.15) : 1,
                  boxShadow: isActive ? '0 0 20px rgba(0, 180, 216, 0.5)' : 'none',
                  cursor: hasWeights ? 'pointer' : 'default'
                }}
              >
                {word}
                {activeWord && attentionWeights[activeWord]?.[word] && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-primary font-bold"
                  >
                    {(attentionWeights[activeWord][word] * 100).toFixed(0)}%
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {activeWord && attentionWeights[activeWord] && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 space-y-2">
            <p className="text-xs text-gray-500 mb-3">Distribución de atención desde "{activeWord}":</p>
            {Object.entries(attentionWeights[activeWord])
              .sort((a, b) => b[1] - a[1])
              .map(([word, weight]) => (
                <div key={word} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-gray-400 text-right">{word}</span>
                  <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${weight * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                    />
                  </div>
                  <span className="w-10 text-xs text-gray-500">{(weight * 100).toFixed(0)}%</span>
                </div>
              ))}
          </motion.div>
        )}

        {!activeWord && (
          <p className="text-center text-xs text-gray-500 mt-4">
            Palabras con borde = clickeables. Prueba: "gato", "duerme", "casa", "vive", "El"
          </p>
        )}
      </div>
    </div>
  );
}

// Generation demo
function GenerationDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [probabilities, setProbabilities] = useState([]);
  const [step, setStep] = useState(0);

  const prompt = "La inteligencia artificial en Panamá";
  const completions = [
    { text: " está", probs: [{ word: 'está', prob: 0.45 }, { word: 'tiene', prob: 0.25 }, { word: 'es', prob: 0.20 }] },
    { text: " transformando", probs: [{ word: 'transformando', prob: 0.52 }, { word: 'creciendo', prob: 0.28 }, { word: 'evolucionando', prob: 0.15 }] },
    { text: " múltiples", probs: [{ word: 'múltiples', prob: 0.40 }, { word: 'varios', prob: 0.35 }, { word: 'diferentes', prob: 0.18 }] },
    { text: " sectores", probs: [{ word: 'sectores', prob: 0.65 }, { word: 'industrias', prob: 0.25 }, { word: 'áreas', prob: 0.08 }] },
    { text: " económicos.", probs: [{ word: 'económicos.', prob: 0.48 }, { word: 'productivos.', prob: 0.32 }, { word: 'clave.', prob: 0.15 }] }
  ];

  const generate = async () => {
    setIsGenerating(true);
    setGeneratedText('');
    setProbabilities([]);
    setStep(0);

    for (let i = 0; i < completions.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setStep(i + 1);
      setProbabilities(completions[i].probs);
      await new Promise(resolve => setTimeout(resolve, 400));
      setGeneratedText(prev => prev + completions[i].text);
    }

    setIsGenerating(false);
    setProbabilities([]);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span>Paso {step}/{completions.length}</span>
          {isGenerating && <span className="text-primary">· Calculando probabilidades...</span>}
        </div>
        <span className="text-gray-400">Prompt: </span>
        <span className="text-white font-medium">{prompt}</span>
        <span className="text-primary font-medium">{generatedText}</span>
        {isGenerating && <span className="animate-pulse text-primary">|</span>}
      </div>

      <AnimatePresence mode="wait">
        {probabilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-xl p-4 space-y-2"
          >
            <p className="text-xs text-gray-500 mb-3">Próximo token — el modelo elige el más probable:</p>
            {probabilities.map((item, index) => (
              <div key={item.word} className="flex items-center gap-3">
                <span className="w-28 text-sm text-gray-400 truncate">{item.word}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.prob * 100}%` }}
                    className={`h-full rounded-full ${index === 0 ? 'bg-gradient-to-r from-primary to-primary-light' : 'bg-white/20'}`}
                  />
                </div>
                <span className={`w-12 text-sm text-right ${index === 0 ? 'text-primary font-bold' : 'text-gray-500'}`}>
                  {(item.prob * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generate}
        disabled={isGenerating}
        className="w-full btn-primary py-3 disabled:opacity-50"
      >
        {isGenerating ? 'Generando...' : 'Generar Texto'}
      </motion.button>
    </div>
  );
}

// RAG Demo - Interactive
function RAGDemo() {
  const [query, setQuery] = useState('');
  const [step, setStep] = useState(0); // 0=idle, 1=searching, 2=chunks, 3=generating, 4=done
  const [result, setResult] = useState(null);

  const examples = [
    { q: '¿Qué dice la Ley 81?', chunks: ['Art. 5: Consentimiento previo e informado...', 'Art. 12: Derecho a rectificación y cancelación...'], answer: 'La Ley 81 de 2019 exige consentimiento previo del titular, finalidad específica para el tratamiento, y otorga derechos de acceso, rectificación y cancelación de datos personales.' },
    { q: '¿Cuántos barcos cruzan el Canal?', chunks: ['Informe ACP 2024: 14,239 tránsitos...', 'Peaje promedio: USD $300,000 por buque Neopanamax...'], answer: 'Aproximadamente 14,239 buques transitaron el Canal en 2024, con un peaje promedio de $300,000 por buque Neopanamax, generando más de $4.6B en ingresos.' },
  ];

  const runRAG = (example) => {
    setQuery(example.q);
    setStep(1);
    setResult(null);
    setTimeout(() => { setStep(2); }, 1000);
    setTimeout(() => { setStep(3); setResult({ chunks: example.chunks }); }, 2000);
    setTimeout(() => { setStep(4); setResult({ chunks: example.chunks, answer: example.answer }); }, 3500);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">Haz clic en una pregunta para ver el pipeline RAG en acción:</p>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex, i) => (
          <button key={i} onClick={() => runRAG(ex)} disabled={step > 0 && step < 4}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50">
            {ex.q}
          </button>
        ))}
      </div>

      {step > 0 && (
        <div className="space-y-3">
          {/* Step 1: Search */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`flex items-center gap-3 p-3 rounded-lg ${step >= 1 ? 'bg-primary/10 border border-primary/30' : 'bg-white/5'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-primary text-black' : 'bg-primary/20 text-primary animate-pulse'}`}>1</div>
            <div>
              <p className="text-sm font-medium text-white">Buscar en documentos</p>
              <p className="text-xs text-gray-500">Embedding de query → búsqueda vectorial</p>
            </div>
            {step >= 2 && <span className="ml-auto text-xs text-primary">Completado</span>}
          </motion.div>

          {/* Step 2: Chunks */}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 p-3 rounded-lg ${step >= 2 ? 'bg-amber-500/10 border border-amber-500/30' : 'bg-white/5'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step >= 3 ? 'bg-amber-500 text-black' : 'bg-amber-500/20 text-amber-400 animate-pulse'}`}>2</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Fragmentos recuperados</p>
                {result?.chunks?.map((chunk, i) => (
                  <p key={i} className="text-xs text-gray-400 mt-1 pl-2 border-l-2 border-amber-500/30">"{chunk}"</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Generate */}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 p-3 rounded-lg ${step >= 4 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-white/5'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step >= 4 ? 'bg-emerald-500 text-black' : 'bg-emerald-500/20 text-emerald-400 animate-pulse'}`}>3</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Generar respuesta con contexto</p>
                {result?.answer && <p className="text-sm text-gray-300 mt-2">{result.answer}</p>}
                {step < 4 && <p className="text-xs text-gray-500 mt-1 animate-pulse">Generando...</p>}
              </div>
            </motion.div>
          )}

          {step >= 4 && (
            <button onClick={() => { setStep(0); setResult(null); setQuery(''); }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" /> Reiniciar
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Tools Demo - Interactive
function ToolsDemo() {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState(null);

  const actions = [
    {
      prompt: '"Agenda reunión con el equipo mañana a las 3 PM"',
      thinking: 'Detectó intención: agendar evento. Parámetros: título, fecha, hora.',
      tool: 'create_calendar_event({ title: "Reunión de equipo", date: "2026-03-24", time: "15:00" })',
      result: 'Reunión agendada para mañana 24 de marzo a las 3:00 PM. Se envió invitación al equipo.'
    },
    {
      prompt: '"Envía un resumen de ventas Q4 al director financiero"',
      thinking: 'Detectó 2 acciones: consultar datos de ventas + enviar email.',
      tool: 'get_sales_data({ quarter: "Q4" }) → send_email({ to: "cfo@empresa.com", subject: "Resumen Q4" })',
      result: 'Email enviado con resumen: Ventas Q4 $2.3M (+12% vs Q3). Adjunto: reporte detallado.'
    },
  ];

  const runAction = (action) => {
    setSelectedAction(action);
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2000);
    setTimeout(() => setStep(4), 3000);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">Selecciona un comando para ver cómo el modelo llama herramientas externas:</p>
      <div className="space-y-2">
        {actions.map((action, i) => (
          <button key={i} onClick={() => runAction(action)} disabled={step > 0 && step < 4}
            className="w-full text-left p-3 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors disabled:opacity-50">
            {action.prompt}
          </button>
        ))}
      </div>

      {selectedAction && step > 0 && (
        <div className="space-y-3">
          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
              <p className="text-xs text-violet-400 font-medium mb-1">Razonamiento del modelo:</p>
              <p className="text-sm text-gray-300">{selectedAction.thinking}</p>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-xs text-amber-400 font-medium mb-1">Tool call:</p>
              <code className="text-sm text-amber-300 font-mono">{selectedAction.tool}</code>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <p className="text-xs text-emerald-400 font-medium mb-1">Resultado:</p>
              <p className="text-sm text-gray-300">{selectedAction.result}</p>
            </motion.div>
          )}
          {step >= 4 && (
            <button onClick={() => { setStep(0); setSelectedAction(null); }}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" /> Probar otro
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Agents Demo - Interactive
function AgentsDemo() {
  const [running, setRunning] = useState(false);
  const [steps, setSteps] = useState([]);

  const agentSteps = [
    { icon: '🤔', label: 'Planificar', detail: 'Objetivo: Analizar competencia en IA para el sector logístico de Panamá', type: 'think' },
    { icon: '🔍', label: 'Buscar información', detail: 'search_web("IA logística Panamá Canal 2025") → 12 resultados', type: 'tool' },
    { icon: '📄', label: 'Leer documentos', detail: 'read_document("informe_ACP_2024.pdf") → 45 páginas procesadas', type: 'tool' },
    { icon: '📊', label: 'Analizar datos', detail: 'analyze_data(competitors=[Copa, Manzanillo, ZLC]) → tabla comparativa', type: 'tool' },
    { icon: '✍️', label: 'Generar reporte', detail: 'create_report(format="executive_summary", lang="es") → 3 páginas', type: 'tool' },
    { icon: '📧', label: 'Enviar resultado', detail: 'send_email(to="gerencia@empresa.com", attach="reporte_competencia.pdf")', type: 'tool' },
    { icon: '✅', label: 'Completado', detail: 'Reporte enviado. 6 acciones ejecutadas de forma autónoma en 45 segundos.', type: 'done' },
  ];

  const runAgent = () => {
    setRunning(true);
    setSteps([]);
    agentSteps.forEach((s, i) => {
      setTimeout(() => {
        setSteps(prev => [...prev, s]);
        if (i === agentSteps.length - 1) setRunning(false);
      }, (i + 1) * 1200);
    });
  };

  const bgColor = { think: 'bg-violet-500/10 border-violet-500/30', tool: 'bg-primary/10 border-primary/30', done: 'bg-emerald-500/10 border-emerald-500/30' };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">
        Un agente recibe un objetivo y decide autónomamente qué herramientas usar:
      </p>

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={runAgent} disabled={running}
        className="w-full btn-primary py-3 disabled:opacity-50">
        {running ? 'Agente ejecutando...' : 'Ejecutar Agente: "Analiza la competencia en logística IA"'}
      </motion.button>

      <div className="space-y-2 max-h-[350px] overflow-y-auto">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-3 p-3 rounded-lg border ${bgColor[s.type]}`}>
            <span className="text-lg">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{s.label}</p>
              <p className="text-xs text-gray-400 break-all">{s.detail}</p>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">Paso {i + 1}</span>
          </motion.div>
        ))}
      </div>

      {!running && steps.length > 0 && (
        <button onClick={() => setSteps([])} className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
          <RotateCcw className="w-4 h-4" /> Reiniciar
        </button>
      )}
    </div>
  );
}

// Concept card
function ConceptCard({ concept, isActive, onClick }) {
  const Icon = iconMap[concept.id] || Brain;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-4 rounded-xl text-left transition-all ${
        isActive ? 'glass-strong border-primary' : 'glass hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-primary/20' : 'bg-white/5'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
        </div>
        <div>
          <h4 className={`font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
            {concept.title}
          </h4>
          <p className="text-xs text-gray-500">{concept.analogy}</p>
        </div>
      </div>
    </motion.button>
  );
}

export default function LLMDemo() {
  const [activeConcept, setActiveConcept] = useState('tokenization');
  const currentConcept = llmConcepts.find(c => c.id === activeConcept);

  const renderDemo = () => {
    switch (activeConcept) {
      case 'tokenization': return <TokenizerDemo />;
      case 'attention': return <AttentionDemo />;
      case 'generation': return <GenerationDemo />;
      case 'rag': return <RAGDemo />;
      case 'tools': return <ToolsDemo />;
      case 'agents': return <AgentsDemo />;
      default: return null;
    }
  };

  return (
    <section id="fundamentals" className="py-24 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Fundamentos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ¿Cómo funciona un <span className="gradient-text">LLM</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            6 conceptos clave explicados de forma interactiva
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            {llmConcepts.map((concept) => (
              <ConceptCard
                key={concept.id}
                concept={concept}
                isActive={activeConcept === concept.id}
                onClick={() => setActiveConcept(concept.id)}
              />
            ))}
          </div>

          <div className="lg:col-span-2">
            <motion.div
              key={activeConcept}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {currentConcept?.title}
                </h3>
                <p className="text-gray-400">
                  {currentConcept?.description}
                </p>
              </div>
              {renderDemo()}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
