import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, GraduationCap, FileText, Video, Lightbulb, Layers } from 'lucide-react';

const resources = [
  {
    title: 'Prompt Engineering Guide',
    source: 'DAIR.AI',
    description: 'La guía más completa y actualizada de técnicas de prompting. Desde zero-shot hasta chain-of-thought y más.',
    url: 'https://www.promptingguide.ai/es',
    icon: BookOpen,
    color: '#00B4D8',
    tag: 'Guía gratuita'
  },
  {
    title: 'Anthropic Courses',
    source: 'Anthropic',
    description: 'Cursos oficiales de Anthropic sobre prompting, RAG y uso avanzado de Claude. Notebooks interactivos.',
    url: 'https://github.com/anthropics/courses',
    icon: GraduationCap,
    color: '#8B5CF6',
    tag: 'Curso gratuito'
  },
  {
    title: 'OpenAI Cookbook',
    source: 'OpenAI',
    description: 'Recetas prácticas y ejemplos de código para usar la API de OpenAI. GPTs, function calling, embeddings.',
    url: 'https://cookbook.openai.com',
    icon: FileText,
    color: '#10B981',
    tag: 'Ejemplos de código'
  },
  {
    title: 'AI for Everyone',
    source: 'Andrew Ng · DeepLearning.AI',
    description: 'El curso más popular para entender IA sin ser técnico. Ideal para líderes y gerentes que necesitan el panorama completo.',
    url: 'https://www.deeplearning.ai/courses/ai-for-everyone/',
    icon: Video,
    color: '#F43F5E',
    tag: 'Curso ejecutivo'
  },
  {
    title: 'State of AI Report',
    source: 'Nathan Benaich & Air Street Capital',
    description: 'Reporte anual con el estado del arte en IA: investigación, industria, política y predicciones. Referencia obligada.',
    url: 'https://www.stateof.ai',
    icon: Layers,
    color: '#F59E0B',
    tag: 'Reporte anual'
  },
  {
    title: 'Google AI Essentials',
    source: 'Google · Coursera',
    description: 'Fundamentos de IA generativa por Google. Cubre conceptos clave, herramientas y uso responsable en el trabajo.',
    url: 'https://www.coursera.org/learn/google-ai-essentials',
    icon: Lightbulb,
    color: '#06B6D4',
    tag: 'Certificado'
  }
];

export default function Resources() {
  return (
    <section id="resources" className="py-24 relative bg-bg">
      <div className="blob-1 top-0 right-1/4" />
      <div className="blob-2 bottom-0 left-1/4" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Para Seguir Aprendiendo
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Recursos <span className="gradient-text">Recomendados</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Las mejores referencias para profundizar en IA generativa por tu cuenta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass rounded-2xl p-6 flex flex-col hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: `${resource.color}20` }}>
                    <Icon className="w-6 h-6" style={{ color: resource.color }} />
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: `${resource.color}15`, color: resource.color }}
                  >
                    {resource.tag}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{resource.source}</p>
                <p className="text-sm text-gray-400 flex-grow">{resource.description}</p>

                {/* Link indicator */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5 text-sm text-gray-500 group-hover:text-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Abrir recurso</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
