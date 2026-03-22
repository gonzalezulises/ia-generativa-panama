import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Scale, Stethoscope, TrendingUp, ArrowRight, ExternalLink, Quote } from 'lucide-react';

const cases = [
  {
    id: 'jetour',
    title: 'Jetour / Petroautos',
    sector: 'Automotriz',
    icon: Car,
    color: '#00f5ff',
    metric: {
      before: '1%',
      after: '9.8%',
      label: 'Tasa de Conversión'
    },
    description: 'Implementación de chatbot con IA para atención al cliente y ventas por WhatsApp, logrando casi 10x en conversión.',
    details: [
      'Chatbot conversacional 24/7',
      'Integración con WhatsApp Business',
      'Calificación automática de leads',
      'Handoff a vendedores humanos'
    ],
    quote: 'La IA nos permitió atender más consultas con mayor calidad y convertir significativamente más leads.',
    status: 'Producción'
  },
  {
    id: 'isjup',
    title: 'ISJUP-IA',
    sector: 'Órgano Judicial',
    icon: Scale,
    color: '#bf00ff',
    metric: {
      value: '100%',
      label: 'Trazabilidad'
    },
    description: 'Asistente virtual para formación judicial basado exclusivamente en material oficial, con énfasis en seguridad y auditoría.',
    details: [
      'RAG sobre documentación oficial',
      'Fuentes verificables y citadas',
      'Sin alucinaciones: solo responde con material conocido',
      'Logs de auditoría completos'
    ],
    quote: 'Un modelo de GenAI gobernada que otros sectores públicos pueden replicar.',
    status: 'Producción'
  },
  {
    id: 'css',
    title: 'CSS Radiología',
    sector: 'Salud Pública',
    icon: Stethoscope,
    color: '#ff00a8',
    metric: {
      value: '~85',
      label: 'Estudios/día'
    },
    description: 'Tomógrafos con IA para mejora de calidad de imagen, aceleración de captura/análisis y priorización de casos críticos.',
    details: [
      'Reducción de tiempos de diagnóstico',
      'Priorización automática de urgencias',
      'Mejora en calidad de imagen',
      'Integración con expediente digital'
    ],
    quote: 'La IA en radiología nos permite atender más pacientes con mayor precisión diagnóstica.',
    status: 'Escalamiento'
  },
  {
    id: 'bac',
    title: 'Banca Digital',
    sector: 'Finanzas',
    icon: TrendingUp,
    color: '#00ff88',
    metric: {
      value: '$125M',
      label: 'Fraude Detectado'
    },
    description: 'Sistemas de detección de fraude y asistentes virtuales multicanal en los principales bancos de Panamá.',
    details: [
      'Biometría con anti-spoofing',
      'Detección de anomalías en tiempo real',
      'Chatbots para servicio al cliente',
      'Análisis de comportamiento'
    ],
    quote: 'La IA es nuestra primera línea de defensa contra el fraude electrónico.',
    status: 'Producción'
  }
];

function CaseCard({ caseData, isExpanded, onClick }) {
  const Icon = caseData.icon;

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer glass rounded-2xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      style={{
        borderColor: isExpanded ? caseData.color : 'transparent',
        borderWidth: '1px'
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: `${caseData.color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: caseData.color }} />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">
                {caseData.title}
              </h3>
              <span className="text-sm text-gray-500">{caseData.sector}</span>
            </div>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${caseData.color}20`,
              color: caseData.color
            }}
          >
            {caseData.status}
          </span>
        </div>

        {/* Metric */}
        <div
          className="p-4 rounded-xl mb-4"
          style={{ backgroundColor: `${caseData.color}10` }}
        >
          <div className="flex items-end gap-2">
            {caseData.metric.before && (
              <>
                <span className="text-2xl font-bold text-gray-500 line-through">
                  {caseData.metric.before}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-600 mb-1" />
              </>
            )}
            <span
              className="text-4xl font-display font-bold"
              style={{ color: caseData.color }}
            >
              {caseData.metric.after || caseData.metric.value}
            </span>
          </div>
          <span className="text-sm text-gray-400">{caseData.metric.label}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-4 flex-grow">
          {caseData.description}
        </p>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              {/* Details */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-300">Implementación:</h4>
                <ul className="space-y-1">
                  {caseData.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <span style={{ color: caseData.color }}>•</span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Quote */}
              <div
                className="p-4 rounded-xl flex gap-3"
                style={{ backgroundColor: `${caseData.color}05` }}
              >
                <Quote className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 italic">
                  "{caseData.quote}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {isExpanded ? 'Click para cerrar' : 'Click para ver más'}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"
          >
            <span className="text-gray-400">+</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Cases() {
  const [expandedCase, setExpandedCase] = useState(null);

  return (
    <section id="cases" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-orange-400 mb-4">
            Casos Reales
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            IA en <span className="gradient-text">Acción</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Casos de uso verificables de IA generativa en empresas panameñas
          </p>
        </motion.div>

        {/* Cases grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          {cases.map((caseData) => (
            <CaseCard
              key={caseData.id}
              caseData={caseData}
              isExpanded={expandedCase === caseData.id}
              onClick={() => setExpandedCase(expandedCase === caseData.id ? null : caseData.id)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-strong rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              ¿Quieres implementar IA en tu organización?
            </h3>
            <p className="text-gray-400 mb-6">
              Aprende de estos casos y descubre cómo empezar en 30 días con una estrategia clara
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-bold glow-cyan"
            >
              Reservar Consultoría
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
