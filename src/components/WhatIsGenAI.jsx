import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, TrendingUp, Sparkles, AlertTriangle, Check, X, HelpCircle } from 'lucide-react';

const comparisons = [
  {
    category: 'Entrada',
    predictive: 'Datos estructurados (tablas, números)',
    generative: 'Texto, imágenes, audio, video, código',
  },
  {
    category: 'Salida',
    predictive: 'Clasificación, número, probabilidad',
    generative: 'Contenido nuevo: texto, imagen, código, audio',
  },
  {
    category: 'Ejemplo',
    predictive: '"Este cliente tiene 73% de probabilidad de churn"',
    generative: '"Redacta un email de retención personalizado para este cliente"',
  },
  {
    category: 'Entrenamiento',
    predictive: 'Necesita TUS datos etiquetados',
    generative: 'Ya viene pre-entrenado, funciona de inmediato',
  },
  {
    category: 'Implementación',
    predictive: 'Proyecto de meses con equipo de ML',
    generative: 'API lista para usar hoy',
  },
];

const canDo = [
  { text: 'Redactar, resumir, traducir y analizar texto', can: true },
  { text: 'Generar y analizar código', can: true },
  { text: 'Responder preguntas sobre documentos (RAG)', can: true },
  { text: 'Automatizar tareas repetitivas con agentes', can: true },
  { text: 'Generar imágenes, audio y video', can: true },
  { text: 'Reemplazar el criterio humano', can: false },
  { text: 'Garantizar que sus respuestas sean correctas', can: false },
  { text: 'Acceder a datos en tiempo real (sin herramientas)', can: false },
  { text: 'Razonar como un humano', can: false },
  { text: 'Mantener información confidencial segura por defecto', can: false },
];

const myths = [
  {
    myth: '"La IA va a reemplazar a todos"',
    reality: 'La IA reemplaza tareas, no personas. Los profesionales que usan IA reemplazan a los que no.',
  },
  {
    myth: '"Necesitas ser programador para usar IA"',
    reality: 'Las interfaces de chat democratizaron el acceso. Saber hacer buenas preguntas es la habilidad clave.',
  },
  {
    myth: '"La IA siempre dice la verdad"',
    reality: 'Los LLMs alucinan. Generan texto plausible, no verificado. El pensamiento crítico es esencial.',
  },
];

export default function WhatIsGenAI() {
  const [activeTab, setActiveTab] = useState('compare');

  const tabs = [
    { id: 'compare', label: 'Generativa vs Predictiva', icon: TrendingUp },
    { id: 'can', label: 'Qué puede y qué no', icon: HelpCircle },
    { id: 'myths', label: 'Mitos vs Realidad', icon: AlertTriangle },
  ];

  return (
    <section id="what-is-genai" className="py-24 relative bg-bg-dark">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Conceptos Clave
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            ¿Qué es la <span className="gradient-text">IA Generativa</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Entender qué es, qué puede hacer y qué no — antes de usarla
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 border-2 border-primary'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="grid grid-cols-3 gap-0 border-b border-white/10">
                <div className="p-4 text-sm font-medium text-gray-500" />
                <div className="p-4 text-center border-x border-white/10">
                  <div className="flex items-center justify-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-400">IA Predictiva</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Clasifica y predice</p>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-primary">IA Generativa</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Crea y transforma</p>
                </div>
              </div>

              {/* Rows */}
              {comparisons.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`grid grid-cols-3 gap-0 ${i < comparisons.length - 1 ? 'border-b border-white/5' : ''}`}
                >
                  <div className="p-4 flex items-center">
                    <span className="text-sm font-semibold text-gray-300">{row.category}</span>
                  </div>
                  <div className="p-4 border-x border-white/5">
                    <p className="text-sm text-gray-400">{row.predictive}</p>
                  </div>
                  <div className="p-4 bg-primary/5">
                    <p className="text-sm text-gray-200">{row.generative}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'can' && (
            <motion.div
              key="can"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Can do */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-lg bg-emerald-500/20">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">Lo que SÍ puede hacer</h3>
                </div>
                <div className="space-y-3">
                  {canDo.filter(c => c.can).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Cannot do */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-lg bg-red-500/20">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">Lo que NO puede hacer</h3>
                </div>
                <div className="space-y-3">
                  {canDo.filter(c => !c.can).map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'myths' && (
            <motion.div
              key="myths"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {myths.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                      <X className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-display font-bold text-white mb-1">{item.myth}</h4>
                      <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{item.reality}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
