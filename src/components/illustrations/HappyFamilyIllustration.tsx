import React from 'react';

export const HappyFamilyIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 700 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          <linearGradient id="familyBg" x1="350" y1="0" x2="350" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="50%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <linearGradient id="billGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
        </defs>

        <rect width="700" height="500" rx="20" fill="url(#familyBg)" />

        {/* Tropical Sun Rays behind */}
        <g transform="translate(350, 150)" opacity="0.35">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2="0"
              y2="180"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeDasharray="8 8"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Family Figures */}
        {/* Father (Left) */}
        <g transform="translate(190, 130)">
          {/* Head & Hair */}
          <circle cx="50" cy="50" r="32" fill="#FBBF24" />
          <path d="M22 36 Q 50 14 78 36 Q 74 18 50 18 Q 26 18 22 36 Z" fill="#451A03" />
          {/* Face details */}
          <circle cx="42" cy="48" r="3" fill="#1E293B" />
          <circle cx="58" cy="48" r="3" fill="#1E293B" />
          <path d="M42 60 Q 50 68 58 60" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Body / Shirt (Cyan/Blue) */}
          <path d="M10 82 Q 50 75 90 82 L 105 210 L -5 210 Z" fill="#0284C7" />
          <polygon points="40,82 50,110 60,82" fill="#E0F2FE" />
          {/* Arm holding bill */}
          <path d="M85 110 Q 120 120 145 150" stroke="#0284C7" strokeWidth="20" strokeLinecap="round" />
        </g>

        {/* Mother (Right) */}
        <g transform="translate(360, 140)">
          {/* Long Hair */}
          <path d="M10 50 Q 50 10 90 50 Q 100 120 85 160 L 15 160 Q 0 120 10 50 Z" fill="#451A03" />
          {/* Face */}
          <circle cx="50" cy="50" r="30" fill="#FBBF24" />
          <circle cx="42" cy="48" r="3" fill="#1E293B" />
          <circle cx="58" cy="48" r="3" fill="#1E293B" />
          <path d="M42 60 Q 50 69 58 60" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Blouse (Emerald Green) */}
          <path d="M15 80 Q 50 72 85 80 L 100 200 L 0 200 Z" fill="#10B981" />
          {/* Arm holding child & bill */}
          <path d="M15 110 Q -15 130 -35 150" stroke="#10B981" strokeWidth="18" strokeLinecap="round" />
        </g>

        {/* Happy Child (Center Front) */}
        <g transform="translate(295, 230)">
          {/* Head & smile */}
          <circle cx="40" cy="35" r="24" fill="#FDE047" />
          <circle cx="33" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="47" cy="33" r="2.5" fill="#1E293B" />
          <path d="M33 43 Q 40 50 47 43" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Yellow T-shirt with Solar Spark */}
          <path d="M10 60 Q 40 55 70 60 L 80 140 L 0 140 Z" fill="#F59E0B" />
          <circle cx="40" cy="85" r="10" fill="#FFFBEB" />
          <path d="M40 78 L42 84 L48 85 L43 89 L45 95 L40 91 L35 95 L37 89 L32 85 L38 84 Z" fill="#F59E0B" />
        </g>

        {/* PROMINENT ELECTRIC BILL WITH LOWER CONSUMPTION (CENTRAL STAGE) */}
        <g id="electric-bill" transform="translate(240, 290)">
          {/* Paper shadow */}
          <rect x="-4" y="-4" width="228" height="178" rx="14" fill="#0F172A" opacity="0.35" />
          {/* White invoice sheet */}
          <rect x="0" y="0" width="220" height="170" rx="12" fill="url(#billGrad)" stroke="#CBD5E1" strokeWidth="2" />

          {/* Header invoice with ENDE DEL BENI */}
          <rect x="0" y="0" width="220" height="38" rx="10" fill="#003B71" />
          <text x="110" y="18" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="10" fontFamily="'Poppins', sans-serif">
            ENDE DEL BENI S.A.M.
          </text>
          <text x="110" y="30" textAnchor="middle" fill="#38BDF8" fontWeight="medium" fontSize="8">
            AVISO DE COBRANZA Y FACTURACIÓN
          </text>

          {/* Consumption line items */}
          <g transform="translate(14, 52)">
            <text x="0" y="10" fill="#64748B" fontSize="9">Consumo Red:</text>
            <text x="190" y="10" textAnchor="end" fill="#64748B" fontSize="9">480 kWh</text>

            <text x="0" y="24" fill="#059669" fontWeight="bold" fontSize="9">Inyección Solar:</text>
            <text x="190" y="24" textAnchor="end" fill="#059669" fontWeight="bold" fontSize="9">- 390 kWh</text>

            <line x1="0" y1="32" x2="190" y2="32" stroke="#E2E8F0" strokeWidth="1.5" />

            <text x="0" y="46" fill="#0F172A" fontWeight="bold" fontSize="10">Consumo Neto:</text>
            <text x="190" y="46" textAnchor="end" fill="#0F172A" fontWeight="900" fontSize="11">90 kWh</text>

            {/* Total Paid Badge */}
            <rect x="0" y="55" width="192" height="26" rx="6" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
            <text x="10" y="72" fill="#065F46" fontWeight="bold" fontSize="9">TOTAL A PAGAR:</text>
            <text x="180" y="73" textAnchor="end" fill="#047857" fontWeight="900" fontSize="14">Bs. 68.00</text>
          </g>

          {/* Large Savings Stamp / Sello de Ahorro */}
          <g transform="translate(130, 110) rotate(-12)">
            <rect x="-8" y="-12" width="94" height="34" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2" />
            <text x="39" y="4" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="11">
              ¡AHORRO!
            </text>
            <text x="39" y="15" textAnchor="middle" fill="#FEF08A" fontWeight="bold" fontSize="9">
              - 78% MENSUAL
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
