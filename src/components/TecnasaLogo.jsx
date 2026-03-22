// Tecnasa U Logo Component - SVG with transparent background
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: { scale: 0.7 },
    default: { scale: 1 },
    large: { scale: 1.5 }
  };

  const { scale } = sizes[size] || sizes.default;

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
    >
      {/* U Icon - Pixel perfect matching the original */}
      <svg viewBox="0 0 50 55" width="50" height="55" className="mb-3" aria-hidden="true">
        {/* Left vertical bar - 6 blocks */}
        <rect x="0" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="10" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="20" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="30" width="10" height="10" fill="#00B4D8" />

        {/* Bottom curve */}
        <rect x="0" y="40" width="10" height="10" fill="#00B4D8" />
        <rect x="10" y="45" width="10" height="10" fill="#00B4D8" />
        <rect x="20" y="40" width="10" height="10" fill="#00B4D8" />

        {/* Top right staircase - 3 blocks */}
        <rect x="20" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="30" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="40" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="40" y="10" width="10" height="10" fill="#00B4D8" />
      </svg>

      {/* tecnasa u text */}
      <div className="flex items-baseline gap-1">
        <span
          className="font-light tracking-wide text-white"
          style={{ fontSize: '28px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          tecnasa
        </span>
        <span
          className="font-bold text-[#00B4D8]"
          style={{ fontSize: '28px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          u
        </span>
      </div>

      {/* LEARNING CENTERS */}
      <span
        className="text-white/70 tracking-[0.3em] mt-1"
        style={{ fontSize: '10px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        LEARNING CENTERS
      </span>
    </div>
  );
}

// Compact version for navbar
export function TecnasaLogoCompact({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* U Icon small */}
      <svg viewBox="0 0 50 55" width="30" height="33" aria-hidden="true">
        <rect x="0" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="10" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="20" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="30" width="10" height="10" fill="#00B4D8" />
        <rect x="0" y="40" width="10" height="10" fill="#00B4D8" />
        <rect x="10" y="45" width="10" height="10" fill="#00B4D8" />
        <rect x="20" y="40" width="10" height="10" fill="#00B4D8" />
        <rect x="20" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="30" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="40" y="0" width="10" height="10" fill="#00B4D8" />
        <rect x="40" y="10" width="10" height="10" fill="#00B4D8" />
      </svg>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-0.5">
          <span className="text-base font-light text-white tracking-wide leading-none">tecnasa</span>
          <span className="text-base font-bold text-[#00B4D8] leading-none">u</span>
        </div>
        <span className="text-[7px] text-white/60 tracking-[0.2em]">LEARNING CENTERS</span>
      </div>
    </div>
  );
}
