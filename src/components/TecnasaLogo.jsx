// Tecnasa U Logo Component - Using actual logo image with transparent background effect
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: { width: 120 },
    default: { width: 180 },
    large: { width: 280 }
  };

  const { width } = sizes[size] || sizes.default;

  return (
    <img
      src="/logo-tecnasa.jpg"
      alt="Tecnasa U Learning Centers"
      className={className}
      style={{
        width,
        height: 'auto',
        mixBlendMode: 'lighten'
      }}
    />
  );
}

// Compact version for navbar
export function TecnasaLogoCompact({ className = "" }) {
  return (
    <img
      src="/logo-tecnasa.jpg"
      alt="Tecnasa U Learning Centers"
      className={className}
      style={{
        width: 140,
        height: 'auto',
        mixBlendMode: 'lighten'
      }}
    />
  );
}
