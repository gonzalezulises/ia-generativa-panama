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

// Network Graph Visualization
const NetworkGraph = ({ activeSector, onSectorHover }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);

  // Node positions for sectors (Sagittarius constellation - "The Teapot")
  // Based on actual star positions of Sagittarius
  const sectorNodes = [
    { id: 'logistics', x: 150, y: 200, label: 'Logística', color: '#00B4D8' },      // Kaus Australis (ε) - spout bottom
    { id: 'finance', x: 250, y: 120, label: 'Finanzas', color: '#10B981' },         // Kaus Media (δ) - spout top
    { id: 'health', x: 380, y: 100, label: 'Salud', color: '#F43F5E' },             // Kaus Borealis (λ) - lid
    { id: 'government', x: 500, y: 140, label: 'Gobierno', color: '#8B5CF6' },      // Nunki (σ) - handle top
    { id: 'retail', x: 550, y: 260, label: 'Retail', color: '#F59E0B' },            // Tau Sgr - handle bottom
    { id: 'education', x: 350, y: 280, label: 'Educación', color: '#06B6D4' },      // Ascella (ζ) - base
  ];

  // Connections forming the Sagittarius teapot asterism
  const connections = [
    [0, 1], // Spout line
    [1, 2], // Spout to lid
    [2, 3], // Lid to handle top
    [3, 4], // Handle curve
    [4, 5], // Handle to base
    [5, 0], // Base to spout (bottom of teapot)
    [1, 5], // Internal: spout top to base
    [2, 5], // Internal: lid to base
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 80;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create floating particles
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

    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections between sector nodes
      connections.forEach(([i, j]) => {
        const from = sectorNodes[i];
        const to = sectorNodes[j];
        const isActive = activeSector === from.id || activeSector === to.id;

        // Animated pulse along the line
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
        const pulsePos = (Math.sin(time * 2 + i) + 1) / 2;

        if (isActive) {
          gradient.addColorStop(0, 'rgba(0, 180, 216, 0.8)');
          gradient.addColorStop(pulsePos, 'rgba(0, 180, 216, 1)');
          gradient.addColorStop(1, 'rgba(0, 180, 216, 0.8)');
        } else {
          gradient.addColorStop(0, 'rgba(0, 180, 216, 0.15)');
          gradient.addColorStop(1, 'rgba(0, 180, 216, 0.15)');
        }

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();

        // Draw moving data packets on active connections
        if (isActive) {
          const packetPos = (time * 0.5 + i * 0.3) % 1;
          const px = from.x + (to.x - from.x) * packetPos;
          const py = from.y + (to.y - from.y) * packetPos;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00B4D8';
          ctx.fill();
        }
      });

      // Draw floating particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Connect particles to nearby sector nodes
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

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw sector nodes
      sectorNodes.forEach((node, index) => {
        const isActive = activeSector === node.id;
        const sector = sectors[index];

        // Outer glow
        if (isActive) {
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
        ctx.strokeStyle = isActive ? `${node.color}80` : `${node.color}30`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Inner circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        const innerGradient = ctx.createRadialGradient(node.x - 5, node.y - 5, 0, node.x, node.y, 20);
        innerGradient.addColorStop(0, isActive ? node.color : `${node.color}80`);
        innerGradient.addColorStop(1, isActive ? `${node.color}CC` : `${node.color}40`);
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeSector]);

  return (
    <div className="relative w-full h-[420px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      {/* Clickable overlay for sector nodes */}
      <svg viewBox="0 0 800 420" className="absolute inset-0 w-full h-full" style={{ zIndex: 10 }}>
        {sectorNodes.map((node, index) => (
          <g key={node.id}>
            {/* Invisible larger hit area */}
            <circle
              cx={node.x}
              cy={node.y}
              r="35"
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => onSectorHover(sectors[index]?.id)}
              onMouseLeave={() => onSectorHover(null)}
              onClick={() => onSectorHover(sectors[index]?.id)}
            />
            {/* Label */}
            <text
              x={node.x}
              y={node.y + 50}
              textAnchor="middle"
              fill={activeSector === sectors[index]?.id ? node.color : '#9CA3AF'}
              fontSize="14"
              fontWeight={activeSector === sectors[index]?.id ? 'bold' : 'normal'}
              style={{ transition: 'all 0.3s' }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
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
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Madurez:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: n <= Math.round(sector.maturity) ? sector.color : 'rgba(255,255,255,0.1)'
                  }}
                />
              ))}
              <span className="text-sm font-medium ml-1" style={{ color: sector.color }}>
                {sector.maturity}/5.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cases */}
      <div className="space-y-2 mb-4">
        <h4 className="text-sm font-medium text-gray-400">Casos de uso activos:</h4>
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

      {/* Stats */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
        <div>
          <div className="text-2xl font-bold" style={{ color: sector.color }}>
            {sector.stats.projects}
          </div>
          <div className="text-xs text-gray-500">Proyectos</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-white">
            {sector.stats.companies}
          </div>
          <div className="text-xs text-gray-500">Empresas</div>
        </div>
      </div>
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
            Ecosistema Local
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            IA en <span className="gradient-text">Panamá</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora los sectores que están adoptando IA generativa en el país
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
                    Explora los casos de uso de IA en diferentes industrias de Panamá
                  </p>

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold gradient-text">74</div>
                      <div className="text-xs text-gray-500">Proyectos activos</div>
                    </div>
                    <div className="glass rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary">122</div>
                      <div className="text-xs text-gray-500">Empresas</div>
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
