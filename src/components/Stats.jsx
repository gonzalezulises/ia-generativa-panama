import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Shield, Server, DollarSign, Users, AlertTriangle } from 'lucide-react';
import { stats } from '../data/content';

const iconMap = {
  cyan: TrendingUp,
  pink: Shield,
  purple: Server,
  green: DollarSign,
  blue: Users,
  orange: AlertTriangle
};

const colorMap = {
  cyan: 'from-primary to-primary-light',
  pink: 'from-pink-500 to-pink-400',
  purple: 'from-primary-dark to-primary',
  green: 'from-emerald-500 to-emerald-400',
  blue: 'from-blue-500 to-blue-400',
  orange: 'from-orange-500 to-orange-400'
};

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, value, duration]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toLocaleString('es-PA', { maximumFractionDigits: 0 });
    }
    return num.toFixed(num % 1 === 0 ? 0 : 1);
  };

  return (
    <span ref={ref}>
      {prefix}{formatNumber(displayValue)}{suffix}
    </span>
  );
}

function StatCard({ stat, index }) {
  const Icon = iconMap[stat.color] || TrendingUp;
  const gradient = colorMap[stat.color] || colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
    >
      <div className="glass rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300">
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Value */}
        <div className="text-4xl font-display font-bold text-white mb-2">
          <AnimatedNumber
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix || (stat.max ? `/${stat.max}` : '')}
          />
        </div>

        {/* Label */}
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400">
          {stat.description}
        </p>

        {/* Progress bar for ratio values */}
        {stat.max && (
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(stat.value / stat.max) * 100}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${gradient}`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 relative bg-bg">
      {/* Background decoration */}
      <div className="blob-1 top-0 left-1/4" />
      <div className="blob-2 bottom-0 right-1/4" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Datos de Impacto
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Panamá en <span className="gradient-text">Números</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Datos que todo líder debe conocer para tomar decisiones informadas sobre IA
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>

        {/* Source attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 mt-12"
        >
          Fuentes: Estudio Elemente (n=230, Nov 2025), Stanford AI Index 2024, Check Point Security Report
        </motion.p>
      </div>
    </section>
  );
}
