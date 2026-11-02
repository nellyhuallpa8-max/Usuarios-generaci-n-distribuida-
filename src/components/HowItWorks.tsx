import React, { useState } from 'react';
import { Sun, ShieldCheck, Zap, ArrowLeftRight, Building2, CheckCircle2 } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  bgLight: string;
}

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: 'El Sol del Beni',
      subtitle: 'Radiación inagotable',
      description: 'El Beni goza de una radiación solar privilegiada todo el año. Los fotones solares inciden directamente sobre los paneles.',
      icon: <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />,
      accent: 'border-amber-400 text-amber-600',
      bgLight: 'bg-amber-50',
    },
    {
      id: 2,
      title: 'Paneles Solares',
      subtitle: 'Generación Fotovoltaica',
      description: 'Los módulos monocristalinos en tu techo transforman la luz del sol en energía eléctrica limpia en corriente continua (CC).',
      icon: <Zap className="w-8 h-8 text-sky-500" />,
      accent: 'border-sky-400 text-sky-600',
      bgLight: 'bg-sky-50',
    },
    {
      id: 3,
      title: 'Inversor Inteligente',
      subtitle: 'Conversión 220V CA',
      description: 'Convierte la corriente continua en corriente alterna idéntica a la de la red, lista para tus focos, aire acondicionado y refrigerador.',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      accent: 'border-emerald-400 text-emerald-600',
      bgLight: 'bg-emerald-50',
    },
    {
      id: 4,
      title: 'Medidor Bidireccional',
      subtitle: 'Registro Doble Sentido',
      description: 'Mide la energía que consumes y contabiliza exactamente cada kilovatio-hora excedente que inyectas a la red.',
      icon: <ArrowLeftRight className="w-8 h-8 text-indigo-500" />,
      accent: 'border-indigo-400 text-indigo-600',
      bgLight: 'bg-indigo-50',
    },
    {
      id: 5,
      title: 'Red ENDE DEL BENI',
      subtitle: 'Compensación en Factura',
      description: 'Tu excedente solar se inyecta a la red de distribución pública y ENDE DEL BENI lo descuenta directamente en tu aviso de cobranza.',
      icon: <Building2 className="w-8 h-8 text-[#003B71]" />,
      accent: 'border-[#003B71] text-[#003B71]',
      bgLight: 'bg-blue-50',
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Flujo de Energía en 5 Etapas
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B71] tracking-tight">
            ¿Cómo Funciona la Generación Distribuida?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Un ciclo continuo y seguro que te permite producir tu propia electricidad en el Beni y aprovechar el respaldo permanente de <strong className="text-[#003B71]">ENDE DELBENI S.A.M.</strong>
          </p>
        </div>

        {/* Animated Flow Connector for Desktop / Tablets */}
        <div className="hidden lg:block relative mb-12">
          {/* Energy Path SVG */}
          <div className="relative h-28 flex items-center justify-between px-12">
            <svg
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-12 overflow-visible pointer-events-none"
              preserveAspectRatio="none"
            >
              {/* Background trace line */}
              <line x1="8%" y1="24" x2="92%" y2="24" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
              {/* Animated energy flowing dash line */}
              <line
                x1="8%"
                y1="24"
                x2="92%"
                y2="24"
                stroke="#10B981"
                strokeWidth="5"
                strokeLinecap="round"
                className="animate-dash-flow"
              />
            </svg>

            {/* Stage Indicators */}
            {steps.map((st) => {
              const isSelected = activeStep === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setActiveStep(st.id)}
                  className={`relative z-10 flex flex-col items-center group transition-transform duration-300 ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={`Paso ${st.id}: ${st.title}`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                      isSelected
                        ? 'bg-[#003B71] text-white ring-4 ring-amber-400 ring-offset-2 scale-110'
                        : 'bg-white border-2 border-slate-200 text-slate-600 group-hover:border-[#003B71]'
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">{st.icon}</div>
                  </div>
                  <span className="mt-3 text-xs font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm">
                    Paso 0{st.id}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid (Interactive & Accessible on Mobile/Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {steps.map((step) => {
            const isSelected = activeStep === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border-2 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#003B71] bg-gradient-to-b from-blue-50/60 to-white shadow-xl ring-2 ring-sky-300/40 -translate-y-1'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-[#003B71] text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.id}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50">{step.icon}</div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#003B71] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-blue-100 flex items-center gap-1.5 text-xs font-medium text-[#003B71]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Conexión certificada</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-12 bg-gradient-to-r from-[#003B71] to-[#005596] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-amber-300">
              ¿Sabías que no pierdes energía de noche ni en días nublados?
            </h4>
            <p className="text-sm sm:text-base text-blue-100">
              El sistema de ENDE DEL BENI te abastece continuamente cuando no hay sol, equilibrando tu saldo de forma transparente.
            </p>
          </div>
          <a
            href="#formulario"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all whitespace-nowrap active:scale-95"
          >
            Consultar para mi inmueble
          </a>
        </div>
      </div>
    </section>
  );
};
