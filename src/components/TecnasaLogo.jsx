// Tecnasa U Logo Component - Exact replica
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: { scale: 0.6 },
    default: { scale: 0.8 },
    large: { scale: 1.2 }
  };

  const { scale } = sizes[size] || sizes.default;

  return (
    <div className={`flex flex-col items-center ${className}`} style={{ transform: `scale(${scale})` }}>
      {/* U Icon - Pixel perfect */}
      <svg viewBox="0 0 40 44" width="40" height="44" className="mb-2" aria-hidden="true">
        {/* Left vertical bar */}
        <rect x="0" y="0" width="8" height="36" fill="#00B4D8" />
        {/* Bottom horizontal */}
        <rect x="0" y="36" width="24" height="8" fill="#00B4D8" />
        {/* Right vertical connector */}
        <rect x="16" y="28" width="8" height="8" fill="#00B4D8" />
        {/* Top right pixel blocks - stair pattern */}
        <rect x="24" y="0" width="8" height="8" fill="#00B4D8" />
        <rect x="32" y="0" width="8" height="8" fill="#00B4D8" />
        <rect x="32" y="8" width="8" height="8" fill="#00B4D8" />
      </svg>

      {/* tecnasa u text */}
      <div className="flex items-baseline">
        <span className="text-2xl font-normal text-white tracking-wide">tecnasa</span>
        <span className="text-2xl font-bold text-[#00B4D8] ml-1">u</span>
      </div>

      {/* LEARNING CENTERS */}
      <span className="text-[10px] text-white/80 tracking-[0.25em] mt-1">LEARNING CENTERS</span>
    </div>
  );
}

// Compact version for navbar - exact same style
export function TecnasaLogoCompact({ className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* U Icon - Pixel perfect small */}
      <svg viewBox="0 0 40 44" width="28" height="32" aria-hidden="true">
        {/* Left vertical bar */}
        <rect x="0" y="0" width="8" height="36" fill="#00B4D8" />
        {/* Bottom horizontal */}
        <rect x="0" y="36" width="24" height="8" fill="#00B4D8" />
        {/* Right vertical connector */}
        <rect x="16" y="28" width="8" height="8" fill="#00B4D8" />
        {/* Top right pixel blocks - stair pattern */}
        <rect x="24" y="0" width="8" height="8" fill="#00B4D8" />
        <rect x="32" y="0" width="8" height="8" fill="#00B4D8" />
        <rect x="32" y="8" width="8" height="8" fill="#00B4D8" />
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline">
          <span className="text-lg font-normal text-white tracking-wide leading-none">tecnasa</span>
          <span className="text-lg font-bold text-[#00B4D8] ml-0.5 leading-none">u</span>
        </div>
        <span className="text-[8px] text-white/60 tracking-[0.2em]">LEARNING CENTERS</span>
      </div>
    </div>
  );
}
