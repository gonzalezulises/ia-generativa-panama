import { motion } from 'framer-motion';
import { Lightbulb, Shield, Zap, Users, Brain, Target } from 'lucide-react';

const takeaways = [
  {
    icon: Brain,
    title: 'La IA generativa no piensa — predice',
    description: 'Los LLMs generan el siguiente token más probable. Entender esto evita sobreestimar y subestimar la tecnología.',
    color: '#00B4D8'
  },
  {
    icon: Zap,
    title: 'La ventaja no es la herramienta — es saber usarla',
    description: 'El 78% ya usa IA sin capacitación. La diferencia entre experimentación caótica y capacidad organizacional es formación.',
    color: '#10B981'
  },
  {
    icon: Shield,
    title: 'Sin gobernanza, la IA es un riesgo',
    description: 'Alucinaciones, datos confidenciales en prompts, shadow AI. Las organizaciones necesitan estándares, no solo entusiasmo.',
    color: '#F43F5E'
  },
  {
    icon: Target,
    title: 'Empezar pequeño, medir rápido',
    description: 'Un chatbot de ventas, un asistente RAG, un automatizador de reportes. Un caso de uso con ROI medible en 90 días.',
    color: '#8B5CF6'
  },
  {
    icon: Users,
    title: 'La IA potencia equipos, no los reemplaza',
    description: 'Los profesionales que usan IA reemplazan a los que no. La formación es la inversión con mayor retorno.',
    color: '#F59E0B'
  },
  {
    icon: Lightbulb,
    title: 'Las competencias se transfieren entre herramientas',
    description: 'Prompting, pensamiento crítico y diseño de agentes funcionan en cualquier plataforma. Las herramientas cambian; las habilidades permanecen.',
    color: '#06B6D4'
  },
];

export default function Takeaways() {
  return (
    <section id="takeaways" className="py-24 relative bg-bg">
      <div className="blob-2 top-0 right-1/4" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Para Recordar
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            6 Ideas <span className="gradient-text">Clave</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Lo más importante que deberías llevar de esta sesión
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {takeaways.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
