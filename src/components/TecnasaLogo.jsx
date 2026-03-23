// Tecnasa U Logo Component - SVG vector logo
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: 'h-12',
    default: 'h-16',
    large: 'h-20'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/tecnasaU.svg"
        alt="Tecnasa U Learning Centers"
        className={`${sizes[size] || sizes.default} w-auto object-contain`}
      />
    </div>
  );
}

// Compact version for navbar
export function TecnasaLogoCompact({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/tecnasaU.svg"
        alt="Tecnasa U"
        className="h-8 w-auto object-contain"
      />
    </div>
  );
}
