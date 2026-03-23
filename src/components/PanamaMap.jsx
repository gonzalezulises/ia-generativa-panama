import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Landmark, HeartPulse, Building2, ShoppingCart, GraduationCap, X } from 'lucide-react';
import { sectors } from '../data/content';

const iconMap = {
  ship: Ship,
  landmark: Landmark,
  'heart-pulse': HeartPulse,
  'building-2': Building2,
  'shopping-cart': ShoppingCart,
  'graduation-cap': GraduationCap
};

// Network Graph Visualization — all interaction handled on canvas
const NetworkGraph = ({ activeSector, onSectorHover }) => {
  const canvasRef = useRef(null);
  const hoveredRef = useRef(null);
  const activeSectorRef = useRef(activeSector);

  // Keep ref in sync with prop
  useEffect(() => { activeSectorRef.current = activeSector; }, [activeSector]);

  // Sector node positions as ratios (0-1) so they scale to any canvas size
  const sectorNodesDef = [
    { id: 'logistics', rx: 0.19, ry: 0.48, label: 'Logística', color: '#00B4D8' },
    { id: 'finance', rx: 0.31, ry: 0.29, label: 'Finanzas', color: '#10B981' },
    { id: 'health', rx: 0.48, ry: 0.24, label: 'Salud', color: '#F43F5E' },
    { id: 'government', rx: 0.63, ry: 0.33, label: 'Gobierno', color: '#8B5CF6' },
    { id: 'retail', rx: 0.69, ry: 0.62, label: 'Retail', color: '#F59E0B' },
    { id: 'education', rx: 0.44, ry: 0.67, label: 'Educación', color: '#06B6D4' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 80;
    let w, h;

    const getNodes = () => sectorNodesDef.map(n => ({ ...n, x: n.rx * w, y: n.ry * h }));

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * 2;
      canvas.height = h * 2;
      ctx.setTransform(2, 0, 0, 2, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Mouse handling
    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const hitTest = (mx, my, nodes) => {
      for (const node of nodes) {
        const dx = mx - node.x;
        const dy = my - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < 40) return node.id;
      }
      return null;
    };

    const handleMouseMove = (e) => {
      const { x, y } = getMousePos(e);
      const nodes = getNodes();
      const hit = hitTest(x, y, nodes);
      hoveredRef.current = hit;
      canvas.style.cursor = hit ? 'pointer' : 'default';
      if (hit && hit !== activeSectorRef.current) {
        onSectorHover(hit);
      }
    };

    const handleClick = (e) => {
      const { x, y } = getMousePos(e);
      const nodes = getNodes();
      const hit = hitTest(x, y, nodes);
      if (hit) {
        onSectorHover(hit === activeSectorRef.current ? null : hit);
      }
    };

    const handleMouseLeave = () => {
      hoveredRef.current = null;
      canvas.style.cursor = 'default';
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, w, h);
      const sectorNodes = getNodes();
      const active = activeSectorRef.current;
      const hovered = hoveredRef.current;

      // Floating particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > w) particle.vx *= -1;
        if (particle.y < 0 || particle.y > h) particle.vy *= -1;

        sectorNodes.forEach(node => {
          const dx = node.x - particle.x;
          const dy = node.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 180, 216, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${particle.opacity})`;
        ctx.fill();
      });

      // Sector nodes
      sectorNodes.forEach((node, index) => {
        const isActive = active === node.id;
        const isHovered = hovered === node.id;
        const highlight = isActive || isHovered;

        // Outer glow
        if (highlight) {
          const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 60);
          glowGradient.addColorStop(0, `${node.color}40`);
          glowGradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(node.x, node.y, 60, 0, Math.PI * 2);
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }

        // Pulsing ring
        const pulseRadius = 30 + Math.sin(time * 3 + index) * 5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = highlight ? `${node.color}80` : `${node.color}30`;
        ctx.lineWidth = highlight ? 2.5 : 2;
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        const innerGradient = ctx.createRadialGradient(node.x - 5, node.y - 5, 0, node.x, node.y, 20);
        innerGradient.addColorStop(0, highlight ? node.color : `${node.color}80`);
        innerGradient.addColorStop(1, highlight ? `${node.color}CC` : `${node.color}40`);
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Label
        ctx.font = highlight ? 'bold 14px Inter, system-ui, sans-serif' : '14px Inter, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = highlight ? node.color : '#9CA3AF';
        ctx.fillText(node.label, node.x, node.y + 50);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full h-[420px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};

function SectorCard({ sector, onClose }) {
  const Icon = iconMap[sector.icon] || Ship;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="absolute bottom-0 left-0 right-0 md:relative md:bottom-auto glass-strong rounded-2xl p-6 z-20"
      style={{ borderColor: sector.color, borderWidth: '1px' }}
    >
      {/* Close button (mobile) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
      >
        <X className="w-5 h-5 text-gray-400" />
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${sector.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: sector.color }} />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-white">{sector.name}</h3>
        </div>
      </div>

      {/* Cases */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-gray-400">Casos de uso de IA generativa:</h4>
        {sector.cases.map((caseItem, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-2 text-sm text-gray-300"
          >
            <span style={{ color: sector.color }}>•</span>
            {caseItem}
          </motion.div>
        ))}
      </div>

      {/* Highlight */}
      {sector.highlight && (
        <div
          className="p-3 rounded-lg text-sm"
          style={{ backgroundColor: `${sector.color}10`, borderLeft: `3px solid ${sector.color}` }}
        >
          <span style={{ color: sector.color }}>★</span>
          <span className="text-gray-300 ml-2">{sector.highlight}</span>
        </div>
      )}

    </motion.div>
  );
}

export default function PanamaMap() {
  const [activeSector, setActiveSector] = useState(null);
  const selectedSector = sectors.find(s => s.id === activeSector);

  return (
    <section id="panama-map" className="py-24 relative overflow-hidden bg-bg-dark">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-sm text-primary font-medium mb-4">
            Aplicaciones por Sector
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            IA en tu <span className="gradient-text">Industria</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Casos de uso concretos de IA generativa para cada sector
          </p>
        </motion.div>

        {/* Network and details */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Sector buttons (mobile) */}
          <div className="lg:hidden flex flex-wrap gap-2 justify-center">
            {sectors.map((sector) => {
              const Icon = iconMap[sector.icon] || Ship;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveSector(activeSector === sector.id ? null : sector.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    activeSector === sector.id ? 'bg-white/10' : 'glass'
                  }`}
                  style={{
                    borderColor: activeSector === sector.id ? sector.color : 'transparent',
                    borderWidth: '1px'
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: sector.color }} />
                  <span className="text-sm text-gray-300">{sector.name}</span>
                </button>
              );
            })}
          </div>

          {/* Network Graph */}
          <div className="lg:col-span-3 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-4 overflow-hidden"
            >
              <NetworkGraph activeSector={activeSector} onSectorHover={setActiveSector} />

              {/* Instructions */}
              <p className="text-center text-sm text-gray-500 mt-2">
                {activeSector ? 'Haz clic en otro nodo para explorar' : 'Interactúa con los nodos para explorar sectores'}
              </p>
            </motion.div>
          </div>

          {/* Sector details */}
          <div className="lg:col-span-2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {selectedSector ? (
                <SectorCard
                  key={selectedSector.id}
                  sector={selectedSector}
                  onClose={() => setActiveSector(null)}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Ship className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Selecciona un sector
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Explora los casos de uso de IA generativa aplicables a cada industria
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold gradient-text">6</div>
                      <div className="text-xs text-gray-500">Sectores</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">18</div>
                      <div className="text-xs text-gray-500">Casos de uso</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
