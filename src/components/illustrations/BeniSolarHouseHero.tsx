import React from 'react';

export const BeniSolarHouseHero: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 1000 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[85vh] object-contain drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Tropical Sky Gradient */}
          <linearGradient id="beniSkyGrad" x1="500" y1="0" x2="500" y2="620" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#BAE6FD" />
            <stop offset="90%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>

          {/* Tropical Sun Radial */}
          <radialGradient id="sunRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FDE047" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#EA580C" stopOpacity="0.8" />
          </radialGradient>

          {/* Sun Halo */}
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>

          {/* Roof Tiles Gradient */}
          <linearGradient id="roofGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Solar Panel Cells Gradient */}
          <linearGradient id="solarCellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          {/* Solar Panel Sheen Sweep */}
          <linearGradient id="sheenLinear" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Grass Landscape Gradient */}
          <linearGradient id="landscapeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="40%" stopColor="#4D7C0F" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>

          {/* Filter glow for energy */}
          <filter id="solarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. SKY BACKGROUND */}
        <rect width="1000" height="620" rx="24" fill="url(#beniSkyGrad)" />

        {/* 2. BACKGROUND MOUNTAIN / PAMPAS BENIANAS HORIZON */}
        <path d="M0 450 Q 250 430 500 445 T 1000 440 L 1000 620 L 0 620 Z" fill="#4D7C0F" opacity="0.6" />
        <path d="M0 470 Q 300 455 650 470 T 1000 460 L 1000 620 L 0 620 Z" fill="url(#landscapeGrad)" />

        {/* 3. TROPICAL BENI SUN & ANIMATED ROTATING RAYS */}
        <g transform="translate(180, 130)">
          {/* Outer Sun Halo */}
          <circle cx="0" cy="0" r="140" fill="url(#sunHalo)" className="animate-pulse-glow" />

          {/* Rotating Solar Rays */}
          <g className="animate-spin-slow">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <polygon
                key={deg}
                points="-5,-110 5,-110 0,-135"
                fill="#FBBF24"
                opacity="0.85"
                transform={`rotate(${deg})`}
              />
            ))}
            {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="-95"
                x2="0"
                y2="-115"
                stroke="#FDE047"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.7"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Radiant Sun Core */}
          <circle cx="0" cy="0" r="72" fill="url(#sunRadial)" filter="url(#solarGlow)" />
          <circle cx="0" cy="0" r="54" fill="#FEF08A" opacity="0.9" />
          <circle cx="-16" cy="-16" r="18" fill="#FFFFFF" opacity="0.75" />
        </g>

        {/* 4. SOFT TROPICAL FLUFFY CLOUDS */}
        <g opacity="0.85">
          <path d="M380 90 Q 405 65 435 70 Q 470 55 500 80 Q 530 75 545 100 L 370 100 Z" fill="#FFFFFF" opacity="0.9" />
          <path d="M720 130 Q 750 100 785 110 Q 825 90 860 120 Q 890 115 910 140 L 710 140 Z" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* 5. TROPICAL PALM TREES (PALMERAS BENIANAS / MOTACÚ) */}
        {/* Palm on left */}
        <g transform="translate(60, 230)">
          {/* Slender curved trunk */}
          <path d="M40 310 Q 55 200 45 100 Q 40 40 70 0" stroke="#78350F" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M38 310 Q 53 200 43 100 Q 38 40 68 0" stroke="#92400E" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Trunk rings */}
          {[40, 80, 120, 160, 200, 240, 280].map((y, i) => (
            <line key={i} x1="38" y1={y} x2="52" y2={y - 2} stroke="#451A03" strokeWidth="2" opacity="0.5" />
          ))}
          {/* Palm Fronds / Leaves */}
          <g transform="translate(70, 0)">
            <path d="M0 0 Q -40 -30 -100 -20 Q -80 10 0 0" fill="#15803D" />
            <path d="M0 0 Q -30 -60 -80 -80 Q -50 -40 0 0" fill="#16A34A" />
            <path d="M0 0 Q 20 -70 50 -100 Q 50 -50 0 0" fill="#22C55E" />
            <path d="M0 0 Q 60 -50 110 -60 Q 80 -20 0 0" fill="#15803D" />
            <path d="M0 0 Q 70 -10 120 10 Q 80 25 0 0" fill="#16A34A" />
            <path d="M0 0 Q -10 30 -40 50 Q -30 20 0 0" fill="#14532D" />
          </g>
        </g>

        {/* Palm on right */}
        <g transform="translate(870, 210) scale(0.9, 0.9)">
          <path d="M50 340 Q 30 210 40 110 Q 45 40 20 0" stroke="#78350F" strokeWidth="14" strokeLinecap="round" fill="none" />
          <path d="M52 340 Q 32 210 42 110 Q 47 40 22 0" stroke="#92400E" strokeWidth="10" strokeLinecap="round" fill="none" />
          <g transform="translate(20, 0)">
            <path d="M0 0 Q -60 -40 -110 -30 Q -80 0 0 0" fill="#16A34A" />
            <path d="M0 0 Q -30 -70 -70 -100 Q -40 -50 0 0" fill="#22C55E" />
            <path d="M0 0 Q 30 -70 70 -90 Q 60 -40 0 0" fill="#15803D" />
            <path d="M0 0 Q 70 -30 110 -20 Q 80 10 0 0" fill="#16A34A" />
            <path d="M0 0 Q 40 25 70 45 Q 40 20 0 0" fill="#14532D" />
          </g>
        </g>

        {/* 6. TYPICAL BENI HOUSE WITH ROOFTOP SOLAR SYSTEM */}
        <g id="beni-house" transform="translate(270, 220)">
          {/* House Base / Ground shadow */}
          <ellipse cx="230" cy="330" rx="310" ry="25" fill="#1E293B" opacity="0.3" />

          {/* Front Yard Grass / Garden */}
          <rect x="-30" y="315" width="520" height="30" rx="15" fill="#4D7C0F" />
          <rect x="-10" y="322" width="480" height="12" rx="6" fill="#3F6212" />

          {/* House Walls (Traditional White Stucco / Adobe) */}
          <rect x="30" y="160" width="400" height="155" fill="#F8FAFC" rx="4" />
          {/* Wall texture shadow under roof */}
          <polygon points="30,160 430,160 430,175 30,175" fill="#E2E8F0" />

          {/* Wooden Front Gallery Posts (Estilo Beniano tradicional) */}
          <rect x="50" y="170" width="12" height="145" fill="#78350F" rx="2" />
          <rect x="150" y="170" width="12" height="145" fill="#78350F" rx="2" />
          <rect x="250" y="170" width="12" height="145" fill="#78350F" rx="2" />
          <rect x="350" y="170" width="12" height="145" fill="#78350F" rx="2" />

          {/* Front Door */}
          <rect x="190" y="210" width="55" height="105" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          <rect x="197" y="218" width="18" height="40" rx="2" fill="#B45309" />
          <rect x="220" y="218" width="18" height="40" rx="2" fill="#B45309" />
          <circle cx="238" cy="265" r="3.5" fill="#F59E0B" />

          {/* Large Windows with Wooden Shutters */}
          <rect x="80" y="215" width="50" height="60" rx="3" fill="#0284C7" stroke="#78350F" strokeWidth="4" />
          <line x1="105" y1="215" x2="105" y2="275" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="80" y1="245" x2="130" y2="245" stroke="#FFFFFF" strokeWidth="2" />

          <rect x="290" y="215" width="50" height="60" rx="3" fill="#0284C7" stroke="#78350F" strokeWidth="4" />
          <line x1="315" y1="215" x2="315" y2="275" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="290" y1="245" x2="340" y2="245" stroke="#FFFFFF" strokeWidth="2" />

          {/* Relaxing Beni Hammock in veranda */}
          <path d="M62 250 Q 100 285 148 250" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M62 252 Q 100 290 148 252" stroke="#EF4444" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Wall-mounted Solar Inverter */}
          <g transform="translate(375, 220)">
            <rect x="0" y="0" width="36" height="52" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <rect x="6" y="8" width="24" height="14" rx="2" fill="#0284C7" />
            <circle cx="12" cy="32" r="3" fill="#10B981" className="animate-pulse" />
            <circle cx="24" cy="32" r="3" fill="#FFB800" />
            <text x="18" y="46" textAnchor="middle" fontSize="6" fill="#94A3B8" fontWeight="bold">ENDE INV</text>
          </g>

          {/* Traditional Beni Roof (Terracotta / Red Clay Tiles) */}
          <polygon points="230,15 -10,165 470,165" fill="url(#roofGrad)" />
          {/* Overhang edge */}
          <rect x="-15" y="162" width="490" height="10" rx="4" fill="#7C2D12" />

          {/* Tile texture ribs */}
          {[-2, 35, 75, 115, 155, 195, 235, 275, 315, 355, 395, 435].map((x, idx) => (
            <line
              key={idx}
              x1={x}
              y1="162"
              x2={230 + (x - 230) * 0.12}
              y2="20"
              stroke="#B45309"
              strokeWidth="2.5"
              opacity="0.45"
            />
          ))}

          {/* PHOTOVOLTAIC SOLAR ARRAY (High Visual Impact on Rooftop) */}
          <g id="solar-array" transform="translate(70, 48)">
            {/* Array mounting frame shadow */}
            <rect x="-4" y="-4" width="328" height="102" rx="6" fill="#0F172A" opacity="0.6" />
            <rect x="-2" y="-2" width="324" height="98" rx="5" fill="#334155" />

            {/* Solar Modules (6-panel high efficiency array) */}
            {[
              { x: 2, y: 2, w: 98, h: 42 },
              { x: 106, y: 2, w: 106, h: 42 },
              { x: 218, y: 2, w: 100, h: 42 },
              { x: 2, y: 48, w: 98, h: 44 },
              { x: 106, y: 48, w: 106, h: 44 },
              { x: 218, y: 48, w: 100, h: 44 },
            ].map((p, idx) => (
              <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                {/* Silicon cell background */}
                <rect width={p.w} height={p.h} rx="3" fill="url(#solarCellGrad)" stroke="#0284C7" strokeWidth="1" />
                {/* Internal busbar grid */}
                <line x1={p.w * 0.33} y1="0" x2={p.w * 0.33} y2={p.h} stroke="#38BDF8" strokeWidth="1" opacity="0.85" />
                <line x1={p.w * 0.66} y1="0" x2={p.w * 0.66} y2={p.h} stroke="#38BDF8" strokeWidth="1" opacity="0.85" />
                <line x1="0" y1={p.h * 0.33} x2={p.w} y2={p.h * 0.33} stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
                <line x1="0" y1={p.h * 0.66} x2={p.w} y2={p.h * 0.66} stroke="#38BDF8" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}

            {/* Animated Sheen Reflection across the panels */}
            <rect
              x="-10"
              y="-5"
              width="340"
              height="104"
              rx="6"
              fill="url(#sheenLinear)"
              className="animate-sheen pointer-events-none"
            />
          </g>

          {/* Solar Energy Absorption Sparkles & Rays */}
          <g className="animate-float">
            <circle cx="150" cy="20" r="3" fill="#FDE047" filter="url(#solarGlow)" />
            <circle cx="230" cy="-5" r="4" fill="#FDE047" filter="url(#solarGlow)" />
            <circle cx="310" cy="15" r="3.5" fill="#38BDF8" filter="url(#solarGlow)" />
          </g>
        </g>

        {/* 7. ENDE DEL BENI GRID CONNECTION POLE & SMART METER */}
        <g id="electric-grid-connection" transform="translate(770, 280)">
          {/* Concrete Utility Pole */}
          <rect x="80" y="0" width="18" height="280" fill="#94A3B8" rx="2" />
          <rect x="83" y="0" width="6" height="280" fill="#CBD5E1" />
          {/* Crossarm */}
          <rect x="40" y="30" width="98" height="12" fill="#64748B" rx="2" />
          {/* Insulators */}
          <rect x="46" y="16" width="10" height="14" fill="#38BDF8" rx="2" />
          <rect x="84" y="16" width="10" height="14" fill="#38BDF8" rx="2" />
          <rect x="122" y="16" width="10" height="14" fill="#38BDF8" rx="2" />

          {/* Power lines connecting house to pole */}
          <path d="M-100 80 Q 0 110 50 40" stroke="#003B71" strokeWidth="3" fill="none" opacity="0.75" />
          <path d="M-100 90 Q 0 120 90 40" stroke="#003B71" strokeWidth="3" fill="none" opacity="0.75" />

          {/* Flowing Energy Line with animated dashes: Green energy in, cyan surplus to grid */}
          <path
            d="M-100 80 Q 0 110 50 40"
            stroke="#10B981"
            strokeWidth="3.5"
            fill="none"
            className="animate-dash-flow"
          />

          {/* Bidirectional Smart Meter on the post */}
          <g transform="translate(70, 160)">
            <rect x="0" y="0" width="38" height="50" rx="6" fill="#0F172A" stroke="#0099DA" strokeWidth="2.5" />
            {/* LCD Screen */}
            <rect x="5" y="8" width="28" height="16" rx="2" fill="#E2E8F0" />
            <text x="19" y="20" textAnchor="middle" fontSize="7" fill="#0F172A" fontWeight="900" fontFamily="monospace">
              0428.5
            </text>
            {/* Dual Direction LEDs */}
            <circle cx="12" cy="34" r="3.5" fill="#10B981" className="animate-pulse" />
            <circle cx="26" cy="34" r="3.5" fill="#0099DA" className="animate-pulse" />
            <text x="19" y="44" textAnchor="middle" fontSize="5.5" fill="#F8FAFC" fontWeight="bold">
              ENDE BENI
            </text>
          </g>
        </g>

        {/* 8. FLOATING ENERGY BADGE / ACCENT */}
        <g transform="translate(420, 530)">
          <rect x="0" y="0" width="280" height="52" rx="26" fill="#003B71" opacity="0.95" />
          <rect x="2" y="2" width="276" height="48" rx="24" stroke="#FFB800" strokeWidth="2" fill="none" />
          <circle cx="30" cy="26" r="14" fill="#10B981" />
          {/* Bolt in badge */}
          <path d="M28 17 L35 25 L30 25 L32 35 L25 27 L30 27 Z" fill="#FFFFFF" />
          <text x="56" y="24" fill="#FFFFFF" fontWeight="bold" fontSize="13" fontFamily="'Poppins', sans-serif">
            Generación Distribuida
          </text>
          <text x="56" y="40" fill="#FEF08A" fontWeight="medium" fontSize="11" fontFamily="'Poppins', sans-serif">
            Conectada a la Red de ENDE DEL BENI
          </text>
        </g>
      </svg>
    </div>
  );
};
