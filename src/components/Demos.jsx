import { motion } from 'framer-motion';
import { PenTool, Code, Eye, FileSearch, Sparkles } from 'lucide-react';
import { demos } from '../data/content';

const iconMap = {
  'pen-tool': PenTool,
  'code': Code,
  'eye': Eye,
  'file-search': FileSearch
};

function DemoCard({ demo, index }) {
  const Icon = iconMap[demo.icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div
        className="glass rounded-2xl p-6 h-full border transition-all duration-300 hover:border-opacity-50"
        style={{ borderColor: `${demo.color}30` }}
      >
        {/* Icon & Wow badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${demo.color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: demo.color }} />
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${demo.color}20`, color: demo.color }}
          >
            {demo.wow}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-white mb-1">
          {demo.title}
        </h3>
        <p className="text-sm font-medium mb-3" style={{ color: demo.color }}>
          {demo.subtitle}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">
          {demo.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {demo.features.map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-white/5 text-xs text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Demos() {
  return (
    <section id="demos" className="py-24 relative bg-bg-dark">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Demos en Vivo
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            4 <span className="gradient-text">Demos</span> para tu Portafolio
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Aplicaciones web que demuestran las capacidades de la IA Generativa
          </p>
        </motion.div>

        {/* Demos grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {demos.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
