import { useState } from 'react';
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

// Simplified Panama map as SVG paths
const PanamaSVG = ({ activeSector, onSectorHover }) => {
  return (
    <svg viewBox="0 0 800 300" className="w-full h-auto">
      <defs>
        <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 245, 255, 0.3)" />
          <stop offset="100%" stopColor="rgba(191, 0, 255, 0.3)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Panama shape (simplified) */}
      <path
        d="M50,150 Q100,100 200,120 Q300,80 400,100 Q500,60 600,100 Q700,80 750,120 Q780,150 750,180 Q700,220 600,200 Q500,240 400,200 Q300,220 200,180 Q100,200 50,150"
        fill="url(#mapGradient)"
        stroke="rgba(0, 245, 255, 0.5)"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {/* Sector hotspots */}
      {sectors.map((sector, index) => {
        const positions = [
          { x: 150, y: 150 }, // Logistics - Colón
          { x: 400, y: 140 }, // Finance - Ciudad de Panamá
          { x: 550, y: 130 }, // Health - Darién
          { x: 300, y: 160 }, // Government - Centro
          { x: 450, y: 180 }, // Retail - Tocumen
          { x: 250, y: 130 }  // Education
        ];
        const pos = positions[index];
        const isActive = activeSector === sector.id;

        return (
          <g key={sector.id}>
            {/* Pulse rings */}
            {isActive && (
              <>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="30"
                  fill="none"
                  stroke={sector.color}
                  strokeWidth="1"
                  opacity="0.5"
                >
                  <animate attributeName="r" from="15" to="40" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="20"
                  fill="none"
                  stroke={sector.color}
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate attributeName="r" from="15" to="35" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
              </>
            )}

            {/* Hotspot circle */}
            <circle
              cx={pos.x}
              cy={pos.y}
              r={isActive ? 18 : 12}
              fill={sector.color}
              opacity={isActive ? 1 : 0.6}
              style={{ cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={() => onSectorHover(sector.id)}
              onMouseLeave={() => onSectorHover(null)}
            />

            {/* Sector label */}
            <text
              x={pos.x}
              y={pos.y + 35}
              textAnchor="middle"
              fill="white"
              fontSize="12"
              fontWeight={isActive ? 'bold' : 'normal'}
              opacity={isActive ? 1 : 0.5}
            >
              {sector.name}
            </text>
          </g>
        );
      })}
    </svg>
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
    <section id="panama-map" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-neon-green mb-4">
            Ecosistema Local
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            IA en <span className="gradient-text">Panamá</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explora los sectores que están adoptando IA generativa en el país
          </p>
        </motion.div>

        {/* Map and details */}
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

          {/* Map */}
          <div className="lg:col-span-3 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8"
            >
              <PanamaSVG activeSector={activeSector} onSectorHover={setActiveSector} />

              {/* Instructions */}
              <p className="text-center text-sm text-gray-500 mt-4">
                {activeSector ? 'Haz clic en otro punto para explorar' : 'Pasa el cursor sobre los puntos para explorar sectores'}
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
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                    <Ship className="w-8 h-8 text-neon-cyan animate-pulse" />
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
                      <div className="text-2xl font-bold text-neon-cyan">122</div>
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
