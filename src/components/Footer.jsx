import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowUp } from 'lucide-react';
import { TecnasaLogoCompact } from './TecnasaLogo';

const links = {
  contenido: [
    { label: 'Demos en Vivo', href: '#demos' },
    { label: 'Fundamentos', href: '#fundamentals' },
    { label: 'Timeline IA', href: '#timeline' },
    { label: 'Casos Reales', href: '#cases' }
  ],
  recursos: [
    { label: 'Mapa IA Panamá', href: '#panama-map' },
    { label: 'Estadísticas', href: '#stats' },
  ]
};

const social = [
  { icon: Linkedin, href: 'https://www.linkedin.com/company/tecnaboratorio/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:info@tecnasa.com', label: 'Email' }
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-24 pb-8 bg-bg-dark overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      {/* Background decoration */}
      <div className="blob-1 bottom-0 left-1/4" />
      <div className="blob-2 bottom-0 right-1/4" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="inline-block mb-6">
              <TecnasaLogoCompact />
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Introducción a la IA Generativa. Presentación interactiva de Tecnasa U Learning Centers.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {social.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
                  aria-label={item.label}
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contenido</h4>
            <ul className="space-y-3">
              {links.contenido.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
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
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-sm text-gray-500">
            Tecnasa U Learning Centers. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
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
