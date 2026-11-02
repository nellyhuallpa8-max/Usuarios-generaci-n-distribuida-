import React from 'react';

export const StoreSolarIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-lg"
      >
        <defs>
          <linearGradient id="storeSky" x1="400" y1="0" x2="400" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="storeSolarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" rx="20" fill="url(#storeSky)" />

        {/* Tropical sun in corner */}
        <circle cx="110" cy="90" r="50" fill="#FBBF24" opacity="0.9" />
        <circle cx="110" cy="90" r="70" fill="#FDE68A" opacity="0.4" />

        {/* Ground */}
        <rect x="0" y="410" width="800" height="90" fill="#E2E8F0" />
        <line x1="0" y1="410" x2="800" y2="410" stroke="#CBD5E1" strokeWidth="4" />

        {/* Commercial Building */}
        <g transform="translate(180, 140)">
          {/* Main structure */}
          <rect x="0" y="90" width="440" height="180" fill="#FFFFFF" stroke="#003B71" strokeWidth="4" rx="6" />

          {/* Upper Signboard */}
          <rect x="20" y="45" width="400" height="46" rx="6" fill="#003B71" />
          <text x="220" y="74" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="18" fontFamily="'Poppins', sans-serif">
            COMERCIAL EL PAITITÍ · SUPERMERCADO
          </text>
          <text x="220" y="86" textAnchor="middle" fill="#38BDF8" fontWeight="600" fontSize="10">
            100% ENERGÍA LIMPIA CON GENERACIÓN DISTRIBUIDA
          </text>

          {/* Striped Canopy / Toldo */}
          <g transform="translate(15, 90)">
            {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400].map((x, i) => (
              <rect
                key={i}
                x={x}
                y="0"
                width="40"
                height="26"
                fill={i % 2 === 0 ? '#FFB800' : '#FFFFFF'}
                stroke="#D97706"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Store Windows & Glass Doors */}
          <rect x="40" y="140" width="130" height="110" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          {/* Products inside window */}
          <rect x="55" y="210" width="30" height="35" rx="3" fill="#10B981" />
          <rect x="95" y="195" width="25" height="50" rx="3" fill="#F59E0B" />
          <rect x="125" y="220" width="25" height="25" rx="3" fill="#EF4444" />

          {/* Central Entrance */}
          <rect x="195" y="140" width="90" height="130" rx="4" fill="#0284C7" opacity="0.85" />
          <line x1="240" y1="140" x2="240" y2="270" stroke="#FFFFFF" strokeWidth="3" />
          <rect x="233" y="195" width="4" height="20" rx="2" fill="#FFFFFF" />
          <rect x="243" y="195" width="4" height="20" rx="2" fill="#FFFFFF" />

          {/* Right Window with Energy Savings Badge */}
          <rect x="310" y="140" width="90" height="110" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <circle cx="355" cy="180" r="28" fill="#10B981" />
          <text x="355" y="178" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12">AHORRO</text>
          <text x="355" y="192" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="14">-70%</text>

          {/* ROOFTOP COMMERCIAL SOLAR ARRAY */}
          <g transform="translate(10, -55)">
            <rect x="0" y="0" width="420" height="50" rx="4" fill="#334155" />
            {/* 7 Commercial Panels */}
            {[0, 60, 120, 180, 240, 300, 360].map((px, idx) => (
              <g key={idx} transform={`translate(${px + 5}, 4)`}>
                <rect width="52" height="42" rx="2" fill="url(#storeSolarGrad)" stroke="#38BDF8" strokeWidth="1" />
                <line x1="26" y1="0" x2="26" y2="42" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
                <line x1="0" y1="21" x2="52" y2="21" stroke="#38BDF8" strokeWidth="0.8" opacity="0.7" />
              </g>
            ))}
          </g>
        </g>

        {/* Motacú Palm on corner */}
        <g transform="translate(680, 210) scale(0.7)">
          <path d="M40 280 Q 20 150 45 30" stroke="#78350F" strokeWidth="14" fill="none" strokeLinecap="round" />
          <g transform="translate(45, 30)">
            <path d="M0 0 Q -70 -50 -120 -20 Q -80 15 0 0" fill="#16A34A" />
            <path d="M0 0 Q -30 -90 -80 -110 Q -40 -40 0 0" fill="#22C55E" />
            <path d="M0 0 Q 30 -90 90 -90 Q 60 -30 0 0" fill="#15803D" />
            <path d="M0 0 Q 70 -40 120 -10 Q 70 20 0 0" fill="#16A34A" />
          </g>
        </g>

        {/* Flowing Energy Badges */}
        <g transform="translate(30, 340)">
          <rect width="130" height="50" rx="8" fill="#003B71" />
          <text x="65" y="24" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="11">COMERCIO</text>
          <text x="65" y="40" textAnchor="middle" fill="#34D399" fontWeight="medium" fontSize="10">Autoconsumo día</text>
        </g>
      </svg>
    </div>
  );
};
