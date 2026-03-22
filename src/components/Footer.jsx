import { motion } from 'framer-motion';
import { Brain, Sparkles, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const links = {
  producto: [
    { label: 'Fundamentos', href: '#fundamentals' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Mapa Panamá', href: '#panama-map' },
    { label: 'Casos de Uso', href: '#cases' }
  ],
  recursos: [
    { label: 'Estadísticas', href: '#stats' },
    { label: 'Documentación', href: '#' },
    { label: 'API', href: '#' },
    { label: 'Blog', href: '#' }
  ],
  legal: [
    { label: 'Privacidad', href: '#' },
    { label: 'Términos', href: '#' },
    { label: 'Cookies', href: '#' }
  ]
};

const social = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />

      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <Brain className="w-10 h-10 text-neon-cyan group-hover:text-neon-purple transition-colors" />
                <Sparkles className="w-4 h-4 text-neon-pink absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="font-display font-bold text-2xl gradient-text">
                IA Panamá
              </span>
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Fundamentos de la IA Generativa: Impacto y oportunidades para Panamá.
              Un webinar ejecutivo para transformar tu organización.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {social.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white hover:border-neon-cyan transition-all"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Producto</h4>
            <ul className="space-y-3">
              {links.producto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              {links.recursos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="glass rounded-2xl p-8 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Recibe el toolkit ejecutivo
              </h3>
              <p className="text-gray-400">
                "Mapa de decisiones para implementar IA generativa en 30 días"
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-black font-semibold whitespace-nowrap"
              >
                Suscribir
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-gray-500">
            © 2026 IA Generativa Panamá. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Datos: Stanford AI Index, Elemente, Check Point
            </span>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-colors"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
