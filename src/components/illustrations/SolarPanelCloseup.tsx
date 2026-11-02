import React from 'react';

export const SolarPanelCloseup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 700 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          {/* Anodized Aluminum Frame */}
          <linearGradient id="frameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Monocrystalline Silicon Cell Deep Blue Gradient */}
          <linearGradient id="monoCellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="25%" stopColor="#172554" />
            <stop offset="70%" stopColor="#0B132B" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          {/* Sweeping Light Sheen */}
          <linearGradient id="lightSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="42%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="58%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Glass Specular Flare */}
          <radialGradient id="sunFlare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#FEF08A" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Panel Backdrop */}
        <rect width="700" height="500" rx="16" fill="#0F172A" />

        {/* High-tech Grid Background */}
        <g opacity="0.15">
          {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((y) => (
            <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#38BDF8" strokeWidth="1" />
          ))}
          {[50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#38BDF8" strokeWidth="1" />
          ))}
        </g>

        {/* Main Solar Panel Frame */}
        <g transform="translate(60, 40)">
          {/* Aluminum outer frame with 3D bevel */}
          <rect x="-16" y="-16" width="612" height="432" rx="12" fill="url(#frameGrad)" stroke="#475569" strokeWidth="3" />
          {/* Corner mounting brackets with bolts */}
          <circle cx="-6" cy="-6" r="4" fill="#334155" />
          <circle cx="586" cy="-6" r="4" fill="#334155" />
          <circle cx="-6" cy="406" r="4" fill="#334155" />
          <circle cx="586" cy="406" r="4" fill="#334155" />

          {/* Inner Seal & Anti-reflective Glass Bed */}
          <rect x="0" y="0" width="580" height="400" rx="6" fill="#030712" />

          {/* 4x3 Monocrystalline Solar Cells Grid */}
          {[
            { row: 0, y: 10 },
            { row: 1, y: 140 },
            { row: 2, y: 270 },
          ].map((r) =>
            [
              { col: 0, x: 10 },
              { col: 1, x: 152 },
              { col: 2, x: 295 },
              { col: 3, x: 438 },
            ].map((c) => {
              const cellW = 132;
              const cellH = 120;
              return (
                <g key={`${r.row}-${c.col}`} transform={`translate(${c.x}, ${r.y})`}>
                  {/* Monocrystalline cell with cropped diamond corners */}
                  <rect
                    width={cellW}
                    height={cellH}
                    rx="8"
                    fill="url(#monoCellGrad)"
                    stroke="#1E40AF"
                    strokeWidth="1.5"
                  />
                  {/* Micro textured wafer lines */}
                  {[20, 40, 60, 80, 100].map((ly) => (
                    <line key={ly} x1="4" y1={ly} x2={cellW - 4} y2={ly} stroke="#1E3A8A" strokeWidth="0.7" opacity="0.6" />
                  ))}
                  {/* Silver Busbars (Vertical multi-busbar technology) */}
                  <line x1={cellW * 0.25} y1="2" x2={cellW * 0.25} y2={cellH - 2} stroke="#E2E8F0" strokeWidth="2.5" />
                  <line x1={cellW * 0.5} y1="2" x2={cellW * 0.5} y2={cellH - 2} stroke="#E2E8F0" strokeWidth="2.5" />
                  <line x1={cellW * 0.75} y1="2" x2={cellW * 0.75} y2={cellH - 2} stroke="#E2E8F0" strokeWidth="2.5" />
                  {/* Micro fingering */}
                  {[15, 30, 45, 60, 75, 90, 105].map((fy) => (
                    <line key={fy} x1="6" y1={fy} x2={cellW - 6} y2={fy} stroke="#94A3B8" strokeWidth="0.6" opacity="0.8" />
                  ))}
                </g>
              );
            })
          )}

          {/* ANIMATED LIGHT REFLECTION (Dynamic Light Sweep) */}
          <rect
            x="-50"
            y="-20"
            width="680"
            height="440"
            rx="10"
            fill="url(#lightSheen)"
            className="animate-sheen pointer-events-none"
          />

          {/* Radiant Sun Specular Starburst in Top-Right Corner */}
          <g transform="translate(490, 30)">
            <circle cx="0" cy="0" r="60" fill="url(#sunFlare)" className="animate-pulse-glow" />
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="0" y1="-30" x2="0" y2="30" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        </g>

        {/* Technical Label Tag */}
        <g transform="translate(40, 448)">
          <rect width="320" height="34" rx="17" fill="#003B71" stroke="#0099DA" strokeWidth="1.5" />
          <circle cx="18" cy="17" r="5" fill="#10B981" />
          <text x="32" y="22" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="'Poppins', sans-serif">
            Módulo Fotovoltaico Monocristalino Tier-1
          </text>
        </g>
      </svg>
    </div>
  );
};
