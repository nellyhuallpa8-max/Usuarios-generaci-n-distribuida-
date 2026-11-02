import React from 'react';

export const FarmSolarIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-lg"
      >
        <defs>
          <linearGradient id="farmSky" x1="400" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#7DD3FC" />
            <stop offset="85%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="farmGrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" rx="20" fill="url(#farmSky)" />

        {/* Sun */}
        <circle cx="680" cy="90" r="50" fill="#FBBF24" />
        <circle cx="680" cy="90" r="75" fill="#FEF08A" opacity="0.35" />

        {/* Rolling Green Pampas of Beni */}
        <path d="M0 320 Q 200 290 450 310 T 800 300 L 800 500 L 0 500 Z" fill="#4D7C0F" opacity="0.7" />
        <path d="M0 350 Q 300 330 600 350 T 800 340 L 800 500 L 0 500 Z" fill="url(#farmGrass)" />

        {/* Agroindustrial Shed / Tinglado Ganadero con Techo Solar */}
        <g transform="translate(140, 160)">
          {/* Main steel structure */}
          <rect x="50" y="100" width="460" height="130" fill="#E2E8F0" stroke="#003B71" strokeWidth="3" rx="4" />
          {/* Barn doors */}
          <rect x="220" y="130" width="120" height="100" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <line x1="280" y1="130" x2="280" y2="230" stroke="#334155" strokeWidth="2" />
          <line x1="220" y1="130" x2="340" y2="230" stroke="#64748B" strokeWidth="1.5" />
          <line x1="340" y1="130" x2="220" y2="230" stroke="#64748B" strokeWidth="1.5" />

          {/* Roof Structure */}
          <polygon points="280,20 20,100 540,100" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />

          {/* Large Agro Solar Array on roof */}
          <g transform="translate(45, 38)">
            {[
              { x: 0, y: 15 },
              { x: 55, y: 15 },
              { x: 110, y: 15 },
              { x: 165, y: 15 },
              { x: 220, y: 15 },
              { x: 275, y: 15 },
              { x: 330, y: 15 },
              { x: 385, y: 15 },
            ].map((p, i) => (
              <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                <rect width="50" height="42" rx="2" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.2" />
                <line x1="25" y1="0" x2="25" y2="42" stroke="#38BDF8" strokeWidth="0.8" />
                <line x1="0" y1="21" x2="50" y2="21" stroke="#38BDF8" strokeWidth="0.8" />
              </g>
            ))}
          </g>

          {/* Agro Sign */}
          <rect x="180" y="105" width="200" height="22" rx="4" fill="#003B71" />
          <text x="280" y="120" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            ESTANCIA & AGROINDUSTRIA BENI
          </text>
        </g>

        {/* Solar Water Pump & Silo */}
        <g transform="translate(640, 240)">
          {/* Metal Grain Silo */}
          <rect x="0" y="30" width="70" height="120" fill="#CBD5E1" stroke="#475569" strokeWidth="2" rx="4" />
          <path d="M-5 30 Q 35 0 75 30 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <line x1="0" y1="60" x2="70" y2="60" stroke="#94A3B8" strokeWidth="2" />
          <line x1="0" y1="90" x2="70" y2="90" stroke="#94A3B8" strokeWidth="2" />
          <line x1="0" y1="120" x2="70" y2="120" stroke="#94A3B8" strokeWidth="2" />
          {/* Silo Solar badge */}
          <circle cx="35" cy="75" r="14" fill="#10B981" />
          <path d="M34 68 L40 75 L36 75 L37 82 L31 76 L35 76 Z" fill="#FFFFFF" />
        </g>

        {/* Wooden Ranch Fence */}
        <g transform="translate(0, 390)">
          <line x1="0" y1="20" x2="800" y2="20" stroke="#78350F" strokeWidth="6" />
          <line x1="0" y1="45" x2="800" y2="45" stroke="#78350F" strokeWidth="6" />
          {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
            <rect key={i} x={x} y="0" width="12" height="65" fill="#92400E" rx="2" />
          ))}
        </g>

        {/* Cattle Silhouette on background pasture */}
        <g transform="translate(60, 315) scale(0.6)">
          <ellipse cx="60" cy="50" rx="35" ry="20" fill="#451A03" opacity="0.8" />
          <circle cx="30" cy="40" r="14" fill="#451A03" opacity="0.8" />
          <rect x="35" y="65" width="6" height="25" fill="#451A03" opacity="0.8" />
          <rect x="50" y="65" width="6" height="25" fill="#451A03" opacity="0.8" />
          <rect x="70" y="65" width="6" height="25" fill="#451A03" opacity="0.8" />
          <rect x="85" y="65" width="6" height="25" fill="#451A03" opacity="0.8" />
        </g>

        {/* Feature label */}
        <g transform="translate(24, 24)">
          <rect width="180" height="42" rx="21" fill="#003B71" />
          <text x="90" y="26" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">
            AGRO & CAMPO BENIANO
          </text>
        </g>
      </svg>
    </div>
  );
};
