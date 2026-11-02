import React from 'react';
import { PiggyBank, Leaf, TrendingUp, Home } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      title: 'Ahorra en tu factura',
      tagline: 'Hasta un 80% menos cada mes',
      description:
        'Aprovecha la abundante radiación solar de nuestro departamento para abastecer tus electrodomésticos durante el día y ver reducir drásticamente el monto de tu aviso de cobranza.',
      icon: <PiggyBank className="w-8 h-8 text-emerald-600" />,
      accentColor: 'from-emerald-500/20 to-emerald-500/5',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      stat: '-80%',
      statLabel: 'Ahorro potencial',
    },
    {
      title: 'Energía limpia y renovable',
      tagline: 'Cero emisiones de CO₂',
      description:
        'Produce electricidad 100% ecológica sin generar ruido ni contaminantes. Proteges la maravillosa biodiversidad de los ríos y bosques de la Amazonía beniana.',
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      accentColor: 'from-green-500/20 to-green-500/5',
      badgeColor: 'bg-green-100 text-green-800',
      stat: '100%',
      statLabel: 'Energía renovable',
    },
    {
      title: 'Vende tu excedente a la red',
      tagline: 'Compensación reglamentada en factura',
      description:
        'Toda la energía que generes y no consumas en el momento es inyectada a la red de ENDE DEL BENI a través del medidor bidireccional, acumulando créditos a tu favor en la factura.',
      icon: <TrendingUp className="w-8 h-8 text-sky-600" />,
      accentColor: 'from-sky-500/20 to-sky-500/5',
      badgeColor: 'bg-sky-100 text-sky-800',
      stat: '24/7',
      statLabel: 'Respaldo garantizado',
    },
    {
      title: 'Aumenta el valor de tu inmueble',
      tagline: 'Plusvalía inmediata',
      description:
        'Las viviendas, tiendas, fincas o galpones equipados con un sistema solar conectado a red aumentan de valor de tasación y son más atractivos para arriendo o venta en el Beni.',
      icon: <Home className="w-8 h-8 text-amber-600" />,
      accentColor: 'from-amber-500/20 to-amber-500/5',
      badgeColor: 'bg-amber-100 text-amber-800',
      stat: '+25%',
      statLabel: 'Mayor plusvalía',
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-100 text-[#003B71] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3">
            Ventajas Exclusivas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003B71] tracking-tight">
            Beneficios de la Generación Distribuida
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Un modelo sostenible avalado por el Estado Plurinacional de Bolivia y operado técnicamente por ENDE DEL BENI.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div>
                {/* Top Stat & Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {b.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-[#003B71] tracking-tight">
                      {b.stat}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">
                      {b.statLabel}
                    </span>
                  </div>
                </div>

                <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold mb-2 ${b.badgeColor}`}>
                  {b.tagline}
                </span>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#003B71] transition-colors mb-3">
                  {b.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#003B71]">
                <span>ENDE DEL BENI</span>
                <span className="text-emerald-600 font-bold">100% Confiable</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
