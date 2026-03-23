import { motion } from 'framer-motion';
import { Clock, Brain, Sparkles, Play, Map, BarChart3, Briefcase, BookOpen, CheckCircle } from 'lucide-react';

const agendaItems = [
  {
    time: '0-3 min',
    title: '¿Por qué estamos aquí?',
    description: 'Contexto: shadow AI, brecha de talento, por qué capacitarse ahora',
    icon: BarChart3,
    color: '#00B4D8'
  },
  {
    time: '3-8 min',
    title: '¿Qué es IA Generativa?',
    description: 'Generativa vs predictiva, qué puede y qué no, mitos vs realidad',
    icon: Brain,
    color: '#8B5CF6'
  },
  {
    time: '8-13 min',
    title: '¿Cómo funciona un LLM?',
    description: 'Tokens, atención, generación, RAG, agentes — de forma interactiva',
    icon: Sparkles,
    color: '#10B981'
  },
  {
    time: '13-25 min',
    title: 'Demos en vivo con IA real',
    description: 'Contenido, código, visión y RAG — generación real con GPT-4o-mini',
    icon: Play,
    color: '#F43F5E'
  },
  {
    time: '25-32 min',
    title: 'Aplicaciones por sector',
    description: 'Casos de uso y casos reales con ROI en 6 industrias',
    icon: Map,
    color: '#F59E0B'
  },
  {
    time: '32-38 min',
    title: 'Ideas clave y takeaways',
    description: 'Las 6 ideas más importantes para llevar de esta sesión',
    icon: Briefcase,
    color: '#06B6D4'
  },
  {
    time: '38-45 min',
    title: 'Próximos pasos',
    description: 'Track IAG-101/102/103, recursos recomendados, Q&A',
    icon: BookOpen,
    color: '#10B981'
  },
];

export default function Agenda() {
  return (
    <section id="agenda" className="py-24 relative bg-bg">
      <div className="blob-1 top-0 right-1/4" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            45 Minutos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Agenda del <span className="gradient-text">Webinar</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Todo lo que cubriremos en esta sesión
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:-translate-x-px" />

          <div className="space-y-6">
            {agendaItems.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content card */}
                  <div className={`flex-1 ml-14 md:ml-0 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-xl p-5 inline-block w-full hover:border-white/20 transition-all"
                    >
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          {item.time}
                        </span>
                        <h3 className="text-lg font-display font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Center icon */}
                  <div className="absolute left-0 md:relative md:left-auto flex items-center justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center z-10 border-2"
                      style={{ backgroundColor: `${item.color}20`, borderColor: `${item.color}50` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
