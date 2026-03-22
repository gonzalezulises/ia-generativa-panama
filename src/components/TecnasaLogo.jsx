// Tecnasa U Logo Component
export default function TecnasaLogo({ className = "", size = "default" }) {
  const sizes = {
    small: { width: 120, height: 40 },
    default: { width: 160, height: 50 },
    large: { width: 200, height: 65 }
  };

  const { width, height } = sizes[size] || sizes.default;

  return (
    <svg
      viewBox="0 0 200 65"
      width={width}
      height={height}
      className={className}
      aria-label="Tecnasa U Learning Centers"
    >
      {/* U Icon */}
      <g>
        {/* Main U shape */}
        <path
          d="M10 5 L10 35 Q10 50 25 50 L40 50 L40 45 L25 45 Q15 45 15 35 L15 5 L10 5"
          fill="#00B4D8"
        />
        {/* Top right pixel blocks */}
        <rect x="25" y="5" width="8" height="8" fill="#00B4D8" />
        <rect x="35" y="5" width="8" height="8" fill="#00B4D8" />
        <rect x="35" y="15" width="8" height="8" fill="#00B4D8" />
      </g>

      {/* tecnasa text */}
      <text
        x="55"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="400"
        fill="#FFFFFF"
        letterSpacing="0.5"
      >
        tecnasa
      </text>

      {/* U text */}
      <text
        x="158"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="#00B4D8"
      >
        u
      </text>

      {/* LEARNING CENTERS text */}
      <text
        x="55"
        y="55"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill="#666666"
        letterSpacing="2"
      >
        LEARNING CENTERS
      </text>
    </svg>
  );
}

// Simplified version for navbar
export function TecnasaLogoCompact({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* U Icon */}
      <svg viewBox="0 0 45 50" width="32" height="36" aria-hidden="true">
        <path
          d="M5 0 L5 30 Q5 45 20 45 L35 45 L35 40 L20 40 Q10 40 10 30 L10 0 L5 0"
          fill="#00B4D8"
        />
        <rect x="20" y="0" width="7" height="7" fill="#00B4D8" />
        <rect x="29" y="0" width="7" height="7" fill="#00B4D8" />
        <rect x="29" y="9" width="7" height="7" fill="#00B4D8" />
      </svg>
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-lg font-normal text-white leading-none">
          tecnasa<span className="font-bold text-primary">u</span>
        </span>
        <span className="text-[8px] text-gray-500 tracking-widest">LEARNING CENTERS</span>
      </div>
    </div>
  );
}
