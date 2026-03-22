import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Zap, Sparkles, MessageCircle, Layers, Bot } from 'lucide-react';
import { timeline } from '../data/content';

const iconMap = {
  brain: Brain,
  zap: Zap,
  sparkles: Sparkles,
  'message-circle': MessageCircle,
  layers: Layers,
  bot: Bot
};

const colorMap = {
  cyan: { bg: 'bg-neon-cyan', glow: 'shadow-[0_0_30px_rgba(0,245,255,0.5)]', text: 'text-neon-cyan' },
  purple: { bg: 'bg-neon-purple', glow: 'shadow-[0_0_30px_rgba(191,0,255,0.5)]', text: 'text-neon-purple' },
  pink: { bg: 'bg-neon-pink', glow: 'shadow-[0_0_30px_rgba(255,0,168,0.5)]', text: 'text-neon-pink' },
  green: { bg: 'bg-neon-green', glow: 'shadow-[0_0_30px_rgba(0,255,136,0.5)]', text: 'text-neon-green' },
  blue: { bg: 'bg-neon-blue', glow: 'shadow-[0_0_30px_rgba(0,102,255,0.5)]', text: 'text-neon-blue' },
  orange: { bg: 'bg-orange-500', glow: 'shadow-[0_0_30px_rgba(249,115,22,0.5)]', text: 'text-orange-500' }
};

function TimelineItem({ item, index, isLast }) {
  const colors = colorMap[item.color] || colorMap.cyan;
  const Icon = iconMap[item.icon] || Brain;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content card */}
      <div className="flex-1 md:w-1/2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group"
        >
          {/* Year badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} bg-opacity-20 mb-4`}>
            <span className={`text-sm font-bold ${colors.text}`}>{item.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:gradient-text transition-all">
            {item.title}
          </h3>

          {/* Subtitle */}
          <p className={`text-sm font-medium ${colors.text} mb-3`}>
            {item.subtitle}
          </p>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>

      {/* Center icon */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className={`w-14 h-14 rounded-full ${colors.bg} ${colors.glow} flex items-center justify-center z-10`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        {!isLast && (
          <div className="w-0.5 h-24 bg-gradient-to-b from-white/20 to-transparent mt-4" />
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1 md:w-1/2" />
    </motion.div>
  );
}

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-neon-purple mb-4">
            Evolución
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            La <span className="gradient-text">Revolución</span> de la IA
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            De GANs a sistemas agénticos: el camino que transformó la tecnología
          </p>
        </motion.div>

        {/* Animated vertical line (center) */}
        <div className="hidden md:block absolute left-1/2 top-48 bottom-24 w-0.5 -translate-x-1/2">
          <div className="h-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink"
            />
          </div>
        </div>

        {/* Timeline items */}
        <div className="space-y-12 md:space-y-0">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              item={item}
              index={index}
              isLast={index === timeline.length - 1}
            />
          ))}
        </div>

        {/* Future indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass animate-pulse-glow">
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            <span className="text-gray-300">El futuro está siendo construido</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
