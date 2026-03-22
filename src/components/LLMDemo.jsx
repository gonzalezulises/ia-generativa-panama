import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Lightbulb, Puzzle, Zap, Brain, AlertCircle, Database } from 'lucide-react';
import { llmConcepts } from '../data/content';

const iconMap = {
  tokenization: Puzzle,
  attention: Lightbulb,
  generation: Zap,
  context: Brain,
  hallucination: AlertCircle,
  rag: Database
};

// Tokenizer demo component
function TokenizerDemo() {
  const [inputText, setInputText] = useState('La IA generativa transforma Panamá');
  const [tokens, setTokens] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simple tokenization (word-based for demo)
  const tokenize = (text) => {
    const words = text.split(/(\s+)/);
    return words.map((word, i) => ({
      id: i,
      text: word,
      isSpace: /^\s+$/.test(word),
      color: getTokenColor(i)
    }));
  };

  const getTokenColor = (index) => {
    const colors = [
      'bg-neon-cyan/20 border-neon-cyan text-neon-cyan',
      'bg-neon-purple/20 border-neon-purple text-neon-purple',
      'bg-neon-pink/20 border-neon-pink text-neon-pink',
      'bg-neon-green/20 border-neon-green text-neon-green',
      'bg-neon-blue/20 border-neon-blue text-neon-blue',
      'bg-orange-500/20 border-orange-500 text-orange-400'
    ];
    return colors[index % colors.length];
  };

  const runTokenization = () => {
    setIsAnimating(true);
    setTokens([]);

    const newTokens = tokenize(inputText);
    newTokens.forEach((token, index) => {
      setTimeout(() => {
        setTokens(prev => [...prev, token]);
        if (index === newTokens.length - 1) {
          setIsAnimating(false);
        }
      }, index * 150);
    });
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Escribe un texto:</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
            placeholder="Escribe algo..."
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={runTokenization}
            disabled={isAnimating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold disabled:opacity-50"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Tokens visualization */}
      <div className="glass rounded-xl p-6 min-h-[120px]">
        <div className="flex flex-wrap gap-2 items-center">
          <AnimatePresence>
            {tokens.map((token, index) => (
              <motion.span
                key={token.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg border ${token.color} ${
                  token.isSpace ? 'bg-white/5 border-white/20' : ''
                }`}
              >
                {token.isSpace ? '␣' : token.text}
                <span className="ml-2 text-xs opacity-50">[{index}]</span>
              </motion.span>
            ))}
          </AnimatePresence>
          {tokens.length === 0 && !isAnimating && (
            <span className="text-gray-500 text-sm">
              Presiona Play para ver la tokenización
            </span>
          )}
        </div>
      </div>

      {/* Token count */}
      {tokens.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-gray-400">
            Total: <span className="text-neon-cyan font-bold">{tokens.filter(t => !t.isSpace).length}</span> tokens
          </span>
          <button
            onClick={() => setTokens([])}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
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

  // Simulated attention weights
  const attentionWeights = {
    'duerme': { 'El': 0.1, 'gato': 0.7, 'que': 0.05, 'vive': 0.3, 'en': 0.02, 'mi': 0.05, 'casa': 0.2, 'duerme': 1 },
    'casa': { 'El': 0.05, 'gato': 0.2, 'que': 0.05, 'vive': 0.4, 'en': 0.3, 'mi': 0.6, 'casa': 1, 'duerme': 0.1 },
    'gato': { 'El': 0.8, 'gato': 1, 'que': 0.2, 'vive': 0.3, 'en': 0.1, 'mi': 0.1, 'casa': 0.2, 'duerme': 0.4 }
  };

  const getOpacity = (word) => {
    if (!activeWord || !attentionWeights[activeWord]) return 0.3;
    return attentionWeights[activeWord][word] || 0.1;
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">
        Haz clic en una palabra para ver cómo el modelo "presta atención" a otras palabras:
      </p>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {words.map((word, index) => {
            const isActive = activeWord === word;
            const opacity = getOpacity(word);

            return (
              <motion.button
                key={index}
                onClick={() => setActiveWord(isActive ? null : word)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-neon-cyan text-black font-bold'
                    : 'bg-white/5 text-white'
                }`}
                style={{
                  opacity: activeWord ? opacity : 1,
                  boxShadow: isActive ? '0 0 20px rgba(0, 245, 255, 0.5)' : 'none'
                }}
              >
                {word}
                {activeWord && attentionWeights[activeWord]?.[word] && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-neon-cyan">
                    {(attentionWeights[activeWord][word] * 100).toFixed(0)}%
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Connection lines visualization */}
        {activeWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 rounded-lg bg-white/5"
          >
            <p className="text-sm text-gray-400 text-center">
              <span className="text-neon-cyan font-bold">"{activeWord}"</span> presta más atención a{' '}
              <span className="text-neon-purple font-bold">
                "{Object.entries(attentionWeights[activeWord] || {})
                  .filter(([w]) => w !== activeWord)
                  .sort((a, b) => b[1] - a[1])[0]?.[0]}"
              </span>
            </p>
          </motion.div>
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

    for (let i = 0; i < completions.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProbabilities(completions[i].probs);
      await new Promise(resolve => setTimeout(resolve, 400));
      setGeneratedText(prev => prev + completions[i].text);
    }

    setIsGenerating(false);
    setProbabilities([]);
  };

  return (
    <div className="space-y-6">
      {/* Prompt display */}
      <div className="glass rounded-xl p-4">
        <span className="text-gray-400">Prompt: </span>
        <span className="text-white font-medium">{prompt}</span>
        <span className="text-neon-cyan">{generatedText}</span>
        {isGenerating && <span className="animate-pulse text-neon-cyan">|</span>}
      </div>

      {/* Probability bars */}
      <AnimatePresence mode="wait">
        {probabilities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-xl p-4 space-y-2"
          >
            <p className="text-xs text-gray-500 mb-3">Próximo token (probabilidades):</p>
            {probabilities.map((item, index) => (
              <div key={item.word} className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-400 truncate">{item.word}</span>
                <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.prob * 100}%` }}
                    className={`h-full ${
                      index === 0 ? 'bg-gradient-to-r from-neon-cyan to-neon-purple' : 'bg-white/20'
                    }`}
                  />
                </div>
                <span className={`w-12 text-sm text-right ${index === 0 ? 'text-neon-cyan font-bold' : 'text-gray-500'}`}>
                  {(item.prob * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={generate}
        disabled={isGenerating}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink text-white font-semibold disabled:opacity-50"
      >
        {isGenerating ? 'Generando...' : 'Generar Texto'}
      </motion.button>
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
        isActive
          ? 'glass-strong border-neon-cyan'
          : 'glass hover:border-white/20'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-neon-cyan/20' : 'bg-white/5'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-neon-cyan' : 'text-gray-400'}`} />
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
      case 'tokenization':
        return <TokenizerDemo />;
      case 'attention':
        return <AttentionDemo />;
      case 'generation':
        return <GenerationDemo />;
      default:
        return (
          <div className="glass rounded-xl p-6">
            <p className="text-gray-400 mb-4">{currentConcept?.description}</p>
            <div className="p-4 rounded-lg bg-white/5 font-mono text-sm text-neon-cyan">
              {currentConcept?.example}
            </div>
          </div>
        );
    }
  };

  return (
    <section id="fundamentals" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-neon-pink mb-4">
            Fundamentos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ¿Cómo funciona un <span className="gradient-text">LLM</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora los conceptos clave de los modelos de lenguaje de forma interactiva
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Concept selector */}
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

          {/* Demo area */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeConcept}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-8"
            >
              {/* Concept header */}
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {currentConcept?.title}
                </h3>
                <p className="text-gray-400">
                  <span className="text-neon-cyan">Analogía:</span> {currentConcept?.analogy}
                </p>
              </div>

              {/* Interactive demo */}
              {renderDemo()}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
