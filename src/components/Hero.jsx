import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Users, Lightbulb, Target } from 'lucide-react';
import TecnasaLogo from './TecnasaLogo';

// Neural network animation component with mouse interaction
function NeuralNetwork() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const nodes = [];
    const nodeCount = 60;
    const mouseRadius = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const mouse = mouseRef.current;

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;

        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;

        // Distance from mouse
        const dxMouse = node.x - mouse.x;
        const dyMouse = node.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        const isNearMouse = distMouse < mouseRadius;
        const mouseInfluence = isNearMouse ? 1 - distMouse / mouseRadius : 0;

        // Draw connections
        const connectionRange = isNearMouse ? 120 + mouseInfluence * 80 : 120;

        nodes.slice(i + 1).forEach(other => {
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionRange) {
            // Check if BOTH nodes or at least one is near mouse
            const dxOther = other.x - mouse.x;
            const dyOther = other.y - mouse.y;
            const distOtherMouse = Math.sqrt(dxOther * dxOther + dyOther * dyOther);
            const otherNearMouse = distOtherMouse < mouseRadius;
            const pairNearMouse = isNearMouse || otherNearMouse;

            const baseOpacity = (1 - distance / connectionRange) * (pairNearMouse ? 0.7 : 0.3);
            const lineWidth = pairNearMouse ? 1 + mouseInfluence * 1.5 : 0.5;

            ctx.beginPath();
            ctx.strokeStyle = pairNearMouse
              ? `rgba(0, 200, 230, ${baseOpacity})`
              : `rgba(0, 180, 216, ${baseOpacity})`;
            ctx.lineWidth = lineWidth;
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw line from node to mouse cursor
        if (isNearMouse && mouseInfluence > 0.3) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 220, 240, ${mouseInfluence * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw node - bigger and brighter near mouse
        const pulseSize = Math.sin(node.pulse) * 0.3 + 1;
        const nodeRadius = isNearMouse
          ? node.radius * pulseSize * (1 + mouseInfluence * 2)
          : node.radius * pulseSize;
        const nodeOpacity = isNearMouse
          ? 0.7 + mouseInfluence * 0.3
          : 0.5 + Math.sin(node.pulse) * 0.3;

        // Glow effect near mouse
        if (isNearMouse && mouseInfluence > 0.2) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 230, ${mouseInfluence * 0.1})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse
          ? `rgba(0, 220, 240, ${nodeOpacity})`
          : `rgba(0, 180, 216, ${nodeOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ cursor: 'default' }}
    />
  );
}

const highlights = [
  { icon: Lightbulb, text: 'Conceptos clave de IA Generativa' },
  { icon: Target, text: 'Casos de uso reales en Panamá' },
  { icon: Users, text: 'Estrategias para tu organización' },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-dark">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <NeuralNetwork />

      {/* Decorative blobs */}
      <div className="blob-1 top-0 right-0 translate-x-1/2 -translate-y-1/2" />
      <div className="blob-2 bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Tecnasa Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10"
        >
          <TecnasaLogo size="large" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4 leading-tight">
            Introducción a la{' '}
            <span className="gradient-text">IA Generativa</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-display font-medium text-gray-300">
            Lo que todo líder necesita saber para tomar decisiones informadas
          </h2>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
        />

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10"
        >
          {highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-400">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Presenter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="inline-flex flex-col items-center"
        >
          <span className="text-sm text-gray-500 uppercase tracking-widest mb-2">Presentado por</span>
          <span className="text-xl md:text-2xl font-display font-semibold text-white">Ulises González</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs">Explorar contenido</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
