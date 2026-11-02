import React from 'react';

export const BidirectionalMeterIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 700 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xl"
      >
        <defs>
          <linearGradient id="meterBodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>

          <linearGradient id="lcdGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>

          <filter id="neonGreen" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>

          <filter id="neonBlue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Outer Background Card */}
        <rect width="700" height="520" rx="20" fill="#0F172A" />

        {/* Energy Flow Tracks: LEFT (HOGAR) <---> RIGHT (RED ENDE BENI) */}
        <g transform="translate(40, 20)">
          {/* Label Hogar */}
          <rect x="0" y="20" width="130" height="40" rx="8" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
          <text x="65" y="45" textAnchor="middle" fill="#34D399" fontWeight="bold" fontSize="13">
            TU HOGAR
          </text>

          {/* Label Red ENDE */}
          <rect x="490" y="20" width="130" height="40" rx="8" fill="#1E293B" stroke="#0099DA" strokeWidth="2" />
          <text x="555" y="45" textAnchor="middle" fill="#38BDF8" fontWeight="bold" fontSize="13">
            RED ENDE BENI
          </text>
        </g>

        {/* FLOW 1: ENERGÍA QUE ENTRA AL HOGAR (Solar/Consumo - VERDE) */}
        <g transform="translate(60, 95)">
          <path
            d="M 450 0 L 130 0"
            stroke="#10B981"
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-dash-flow"
          />
          {/* Arrowhead pointing Left to Home */}
          <polygon points="120,0 135,-8 135,8" fill="#10B981" filter="url(#neonGreen)" />
          <rect x="200" y="-18" width="180" height="24" rx="12" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
          <text x="290" y="-2" textAnchor="middle" fill="#A7F3D0" fontSize="11" fontWeight="bold">
            ← ENERGÍA AUTOCONSUMO
          </text>
        </g>

        {/* FLOW 2: EXCEDENTE QUE SALE A LA RED (Inyección - AZUL/CYAN) */}
        <g transform="translate(60, 445)">
          <path
            d="M 130 0 L 450 0"
            stroke="#0099DA"
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-dash-flow"
          />
          {/* Arrowhead pointing Right to Grid */}
          <polygon points="460,0 445,-8 445,8" fill="#0099DA" filter="url(#neonBlue)" />
          <rect x="200" y="-6" width="180" height="24" rx="12" fill="#0C4A6E" stroke="#0099DA" strokeWidth="1" />
          <text x="290" y="10" textAnchor="middle" fill="#7DD3FC" fontSize="11" fontWeight="bold">
            EXCEDENTE A LA RED →
          </text>
        </g>

        {/* THE BIDIRECTIONAL SMART METER (CENTRAL UNIT) */}
        <g transform="translate(200, 130)">
          {/* Base Plate Shadow */}
          <rect x="-6" y="-6" width="312" height="292" rx="28" fill="#000000" opacity="0.4" />
          {/* Meter Enclosure Polycarbonate Case */}
          <rect x="0" y="0" width="300" height="280" rx="24" fill="url(#meterBodyGrad)" stroke="#94A3B8" strokeWidth="4" />

          {/* Top Header: Brand Name */}
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="80" height="18" rx="4" fill="#003B71" />
            <text x="40" y="13" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="10" fontFamily="'Poppins', sans-serif">
              ENDE BENI
            </text>
            <text x="95" y="14" fill="#334155" fontWeight="bold" fontSize="11">
              MEDIDOR BIDIRECCIONAL
            </text>
            <text x="215" y="14" fill="#64748B" fontSize="9" fontWeight="bold">
              CLASE 1.0
            </text>
          </g>

          {/* Large Backlit Digital LCD Screen */}
          <g transform="translate(25, 52)">
            <rect x="0" y="0" width="250" height="85" rx="8" fill="url(#lcdGrad)" stroke="#059669" strokeWidth="3" />
            {/* Screen inner details */}
            <text x="15" y="20" fill="#064E3B" fontSize="10" fontWeight="bold">
              1.8.0 (IMPORTACIÓN): 02,410.8 kWh
            </text>
            <text x="15" y="36" fill="#064E3B" fontSize="10" fontWeight="bold">
              2.8.0 (EXPORTACIÓN): 01,985.2 kWh
            </text>
            {/* Current Real-time Net Balance */}
            <text x="15" y="70" fill="#064E3B" fontSize="30" fontWeight="900" fontFamily="monospace">
              +0425.6
            </text>
            <text x="180" y="70" fill="#064E3B" fontSize="18" fontWeight="bold" fontFamily="monospace">
              kWh
            </text>
          </g>

          {/* Bi-directional Flow Status Icons */}
          <g transform="translate(25, 148)">
            {/* Left Box: Imp */}
            <rect x="0" y="0" width="118" height="38" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="16" cy="19" r="6" fill="#10B981" className="animate-pulse" />
            <text x="30" y="16" fill="#0F172A" fontSize="9" fontWeight="bold">ENTREGA (IMP)</text>
            <text x="30" y="28" fill="#16A34A" fontSize="8" fontWeight="medium">Hacia electrodomésticos</text>

            {/* Right Box: Exp */}
            <rect x="132" y="0" width="118" height="38" rx="6" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
            <circle cx="148" cy="19" r="6" fill="#0099DA" className="animate-pulse" />
            <text x="162" y="16" fill="#0F172A" fontSize="9" fontWeight="bold">INYECCIÓN (EXP)</text>
            <text x="162" y="28" fill="#0284C7" fontSize="8" fontWeight="medium">Excedente a ENDE</text>
          </g>

          {/* Barcode & Terminal Block */}
          <g transform="translate(25, 198)">
            {/* Barcode simulation */}
            <rect x="0" y="0" width="100" height="20" fill="#E2E8F0" />
            {[4, 10, 16, 20, 26, 32, 40, 48, 55, 62, 70, 78, 86, 92].map((bx, bi) => (
              <line key={bi} x1={bx} y1="3" x2={bx} y2="17" stroke="#1E293B" strokeWidth={bi % 2 === 0 ? '2' : '1'} />
            ))}
            <text x="110" y="14" fill="#475569" fontSize="9" fontWeight="bold">
              SERIE: ED-BN-2026-X
            </text>
            {/* Holographic Security Seal */}
            <rect x="210" y="0" width="40" height="20" rx="3" fill="#F59E0B" />
            <text x="230" y="14" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">
              SELLO
            </text>
          </g>

          {/* Bottom Terminal Cover with Screws */}
          <rect x="15" y="230" width="270" height="36" rx="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="50" cy="248" r="5" fill="#64748B" />
          <line x1="47" y1="248" x2="53" y2="248" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="250" cy="248" r="5" fill="#64748B" />
          <line x1="247" y1="248" x2="253" y2="248" stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="150" y="252" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="bold">
            CONEXIÓN RED TRIFÁSICA / MONOFÁSICA
          </text>
        </g>
      </svg>
    </div>
  );
};
