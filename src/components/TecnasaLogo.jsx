// Tecnasa U Logo Component - Using actual brand image
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: 'h-16',
    default: 'h-24',
    large: 'h-36'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/tecnasaU.png"
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
        src="/tecnasaU.png"
        alt="Tecnasa U"
        className="h-9 w-auto object-contain"
      />
    </div>
  );
}
