import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Scale, Stethoscope, TrendingUp, ArrowRight, Quote, DollarSign } from 'lucide-react';

const cases = [
  {
    id: 'jetour',
    title: 'Jetour / Petroautos',
    sector: 'Automotriz',
    icon: Car,
    color: '#00B4D8',
    metric: {
      before: '1%',
      after: '9.8%',
      label: 'Tasa de Conversión'
    },
    roi: { investment: '~$15K', timeToROI: '3 meses', returnMultiple: '9.8x' },
    description: 'Chatbot con IA en WhatsApp para atención y ventas. Casi 10x en conversión sin aumentar equipo comercial.',
    details: [
      'Chatbot conversacional 24/7 en WhatsApp',
      'Calificación automática de leads por intención de compra',
      'Handoff inteligente a vendedores humanos',
      'Reducción de 60% en tiempo de primera respuesta'
    ],
    quote: 'La IA nos permitió atender más consultas con mayor calidad y convertir significativamente más leads.',
    status: 'Producción'
  },
  {
    id: 'isjup',
    title: 'ISJUP-IA',
    sector: 'Órgano Judicial',
    icon: Scale,
    color: '#8B5CF6',
    metric: {
      value: '100%',
      label: 'Trazabilidad'
    },
    roi: { investment: '~$40K', timeToROI: '6 meses', returnMultiple: '5x ahorro operativo' },
    description: 'Asistente RAG para formación judicial. Solo responde con material oficial verificable. Cero alucinaciones por diseño.',
    details: [
      'RAG sobre documentación oficial del Órgano Judicial',
      'Cada respuesta incluye cita y fuente verificable',
      'Arquitectura que elimina alucinaciones por diseño',
      'Auditoría completa de cada consulta y respuesta'
    ],
    quote: 'Un modelo de GenAI gobernada que otros sectores públicos pueden replicar.',
    status: 'Producción'
  },
  {
    id: 'css',
    title: 'CSS Radiología',
    sector: 'Salud Pública',
    icon: Stethoscope,
    color: '#F43F5E',
    metric: {
      value: '~85',
      label: 'Estudios/día'
    },
    roi: { investment: 'Incluido en equipos', timeToROI: 'Inmediato', returnMultiple: '3x capacidad' },
    description: 'Tomógrafos con IA que mejoran imagen, aceleran análisis y priorizan urgencias automáticamente.',
    details: [
      'Reducción de 40% en tiempos de diagnóstico',
      'Priorización automática de casos críticos',
      'Mejora de calidad de imagen sin radiación adicional',
      'Integración con expediente clínico digital'
    ],
    quote: 'La IA en radiología nos permite atender más pacientes con mayor precisión diagnóstica.',
    status: 'Escalamiento'
  },
  {
    id: 'bac',
    title: 'Banca Digital',
    sector: 'Finanzas',
    icon: TrendingUp,
    color: '#10B981',
    metric: {
      value: '$125M',
      label: 'Fraude Detectado'
    },
    roi: { investment: '$500K+', timeToROI: '12 meses', returnMultiple: '250x en fraude evitado' },
    description: 'Detección de fraude en tiempo real y biometría anti-spoofing en los principales bancos de Panamá.',
    details: [
      'Biometría facial con anti-spoofing (detecta fotos/videos)',
      'Detección de anomalías transaccionales en tiempo real',
      'Chatbots que resuelven 70% de consultas sin humano',
      'Modelos de scoring de riesgo crediticio con ML'
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

              {/* ROI */}
              {caseData.roi && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: `${caseData.color}10` }}>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: caseData.color }} />
                    ROI del proyecto
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-lg font-bold text-white">{caseData.roi.investment}</div>
                      <div className="text-xs text-gray-500">Inversión</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold" style={{ color: caseData.color }}>{caseData.roi.timeToROI}</div>
                      <div className="text-xs text-gray-500">Tiempo a ROI</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{caseData.roi.returnMultiple}</div>
                      <div className="text-xs text-gray-500">Retorno</div>
                    </div>
                  </div>
                </div>
              )}

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
            Casos verificables de IA generativa en empresas panameñas con resultados medibles
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

        {/* Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-strong rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-white mb-4">
              Lecciones clave de estos casos
            </h3>
            <p className="text-gray-400">
              Empezar pequeño con un caso de uso específico, medir resultados desde el día uno, y escalar solo lo que funciona. La IA no reemplaza equipos — los potencia.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
