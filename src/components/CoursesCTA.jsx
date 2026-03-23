import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Clock, Users, Wrench, Check } from 'lucide-react';

const courses = [
  {
    code: 'IAG-101',
    title: 'Fundamentos de IA Generativa',
    audience: 'Directivos, gerentes, profesionales de cualquier área',
    hours: '8 horas',
    color: '#00B4D8',
    outcomes: [
      'Diferenciar IA generativa vs predictiva con criterio',
      'Evaluar herramientas: ChatGPT, Gemini, Claude, Copilot',
      'Identificar limitaciones reales, sesgos y riesgos',
      'Tomar decisiones informadas sobre dónde aplicar IA'
    ],
    entregable: 'Evaluación de herramientas para tu contexto',
    tag: 'Para todos'
  },
  {
    code: 'IAG-102',
    title: 'Ingeniería de Prompting',
    audience: 'Analistas, marketers, abogados, financieros, RRHH',
    hours: '8 horas',
    color: '#8B5CF6',
    outcomes: [
      'Dominar técnicas: Zero-shot, Few-shot, Chain-of-Thought',
      'Diseñar prompts que producen resultados consistentes',
      'Manejar documentos largos y análisis multi-paso',
      'Construir biblioteca personal de prompts optimizados'
    ],
    entregable: 'Biblioteca de prompts evaluados y optimizados',
    tag: 'Para practicantes'
  },
  {
    code: 'IAG-103',
    title: 'Agentes y Asistentes Inteligentes',
    audience: 'Líderes de innovación, TI, analistas avanzados',
    hours: '8 horas',
    color: '#10B981',
    outcomes: [
      'Construir agentes autónomos y Custom GPTs',
      'Implementar RAG con documentos internos',
      'Integrar IA con Zapier, CRM y workflows',
      'Evaluar gobernanza y riesgo de agentes'
    ],
    entregable: 'Prototipo funcional de agente aplicado a tu trabajo',
    tag: 'Para constructores'
  },
];

export default function CoursesCTA() {
  return (
    <section id="courses" className="py-24 relative bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Próximos Pasos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            AI Business <span className="gradient-text">Academy</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            De usuario casual a profesional IA en 24 horas. Tres cursos progresivos con entregables concretos.
          </p>
        </motion.div>

        {/* Course cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glass rounded-2xl p-6 flex flex-col"
              style={{ borderTop: `3px solid ${course.color}` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${course.color}20`, color: course.color }}
                >
                  {course.code}
                </span>
                <span className="text-xs text-gray-500">{course.tag}</span>
              </div>

              <h3 className="text-xl font-display font-bold text-white mb-2">{course.title}</h3>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {course.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {course.audience.split(',')[0]}
                </span>
              </div>

              {/* Outcomes */}
              <div className="space-y-2 mb-4 flex-grow">
                {course.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: course.color }} />
                    <span className="text-sm text-gray-300">{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Entregable */}
              <div
                className="p-3 rounded-lg text-sm mt-auto"
                style={{ backgroundColor: `${course.color}10`, borderLeft: `3px solid ${course.color}` }}
              >
                <span className="text-gray-500 text-xs block mb-1">Entregable:</span>
                <span className="text-gray-300 font-medium">{course.entregable}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progression arrow */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-12">
          <span className="text-sm text-gray-500">Usuario casual</span>
          <div className="flex items-center gap-2">
            {courses.map((course, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${course.color}20`, color: course.color }}>
                  {course.code}
                </span>
                {i < courses.length - 1 && <ArrowRight className="w-4 h-4 text-gray-600" />}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-500">Profesional IA</span>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-primary" />
            <h3 className="text-2xl font-display font-bold text-white">
              Programa completo: 24 horas
            </h3>
          </div>
          <p className="text-gray-400 mb-2">
            Multi-herramienta. Facilitado por expertos. Con ejercicios aplicados a tu contexto real.
          </p>
          <p className="text-sm text-gray-500">
            Currículum alineado con Anthropic y OpenAI Academy, adaptado para Panamá y Centroamérica.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
