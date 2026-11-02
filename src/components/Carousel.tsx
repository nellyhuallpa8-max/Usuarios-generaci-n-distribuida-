import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { BeniSolarHouseHero } from './illustrations/BeniSolarHouseHero';
import { StoreSolarIllustration } from './illustrations/StoreSolarIllustration';
import { FarmSolarIllustration } from './illustrations/FarmSolarIllustration';
import { SolarPanelCloseup } from './illustrations/SolarPanelCloseup';
import { BidirectionalMeterIllustration } from './illustrations/BidirectionalMeterIllustration';
import { HappyFamilyIllustration } from './illustrations/HappyFamilyIllustration';

export const Carousel: React.FC = () => {
  const slides = [
    {
      id: 'hogar',
      title: 'Hogar y Residencias en el Beni',
      category: 'Sector Residencial',
      badge: 'Trinidad · Riberalta · Guayaramerín',
      description:
        'Paneles solares integrados armónicamente al techo de tu casa con protección contra el calor tropical. Abastece aires acondicionados, refrigeradores y luminarias sin temor a la factura.',
      component: <BeniSolarHouseHero className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Potencia recomendada', value: '1.5 - 5.0 kW' },
        { label: 'Reducción de factura', value: 'Hasta 80%' },
        { label: 'Retorno estimado', value: '3 a 5 años' },
      ],
    },
    {
      id: 'comercio',
      title: 'Comercios, Tiendas y Supermercados',
      category: 'Sector Comercial',
      badge: 'Consumo diurno ideal',
      description:
        'Tu mayor consumo de energía ocurre durante el día (heladeras, vitrinas, climatización), justo cuando el sol beniano genera la mayor cantidad de electricidad.',
      component: <StoreSolarIllustration className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Potencia recomendada', value: '5.0 - 25 kW' },
        { label: 'Ahorro en horario pico', value: 'Hasta 85%' },
        { label: 'Amortización rápida', value: '2 a 4 años' },
      ],
    },
    {
      id: 'granja',
      title: 'Estancias Ganaderas y Agroindustria',
      category: 'Sector Agropecuario',
      badge: 'Campo Beniano',
      description:
        'Asegura el bombeo de agua para ganado, enfriamiento de leche, molienda e iluminación de galpones con energía solar inagotable conectada a la red de ENDE DEL BENI.',
      component: <FarmSolarIllustration className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Potencia instalada', value: '10 - 50 kW' },
        { label: 'Autonomía productiva', value: 'Máxima' },
        { label: 'Respaldo de red', value: '24/7 continuo' },
      ],
    },
    {
      id: 'paneles',
      title: 'Tecnología Fotovoltaica Monocristalina',
      category: 'Ingeniería y Calidad',
      badge: 'Alta Eficiencia > 21%',
      description:
        'Módulos de alta durabilidad diseñados para soportar las altas temperaturas, lluvias intensas y humedad del oriente boliviano sin perder rendimiento.',
      component: <SolarPanelCloseup className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Garantía de potencia', value: '25 Años' },
        { label: 'Tolerancia térmica', value: '-40°C a +85°C' },
        { label: 'Certificación', value: 'IEC / TUV / ISO' },
      ],
    },
    {
      id: 'medidor',
      title: 'Medición Inteligente Bidireccional',
      category: 'Equipamiento ENDE',
      badge: 'Instalado por ENDE DEL BENI',
      description:
        'El equipo inteligente que sustituye tu medidor antiguo. Lee con precisión milimétrica la energía que consumes y la energía limpia que inyectas a la red.',
      component: <BidirectionalMeterIllustration className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Registro horario', value: 'Doble canal' },
        { label: 'Homologación', value: 'AETN Bolivia' },
        { label: 'Monitoreo', value: 'Digital' },
      ],
    },
    {
      id: 'familia',
      title: 'Familias Benianas Tranquilas y Felices',
      category: 'Impacto en tu Bolsillo',
      badge: 'Bienestar Familiar',
      description:
        'Disfruta de la comodidad del aire acondicionado en los meses más calurosos del año sin preocuparte por el monto a pagar a fin de mes.',
      component: <HappyFamilyIllustration className="w-full h-full max-h-[360px]" />,
      stats: [
        { label: 'Satisfacción', value: '100% Garantizada' },
        { label: 'Ahorro mensual', value: 'Notorio' },
        { label: 'Futuro sostenible', value: 'Para tus hijos' },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto advance every 5.5s
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers for tablets / mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // min swipe distance px
    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section id="galeria" className="py-20 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#003B71] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Galería de Aplicaciones
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003B71] tracking-tight">
              Generación Distribuida en el Beni
            </h2>
          </div>

          {/* Controls: Prev / Pause / Next */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition active:scale-95"
              aria-label="Anterior diapositiva"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition active:scale-95"
              aria-label={isPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-600" />}
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition active:scale-95"
              aria-label="Siguiente diapositiva"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Main Container (Swipe Enabled) */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Column: Visual Illustration */}
            <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-[#002244] p-6 sm:p-8 flex items-center justify-center relative overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                {currentSlide.component}
              </div>
              {/* Category pill on illustration */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-400/30">
                {currentSlide.category}
              </div>
            </div>

            {/* Right Column: Information & Specs */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide mb-3">
                  {currentSlide.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#003B71] mb-4">
                  {currentSlide.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {currentSlide.description}
                </p>

                {/* Specs Box */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {currentSlide.stats.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">{s.label}:</span>
                      <span className="font-bold text-[#003B71]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button & Swipe Helper */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="#formulario"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003B71] hover:bg-[#002855] text-white text-sm font-bold shadow-md hover:shadow-lg transition active:scale-95"
                >
                  Registrar mi inmueble
                  <ChevronRight className="w-4 h-4" />
                </a>

                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Desliza con el dedo ↔
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx ? 'w-8 h-2.5 bg-[#003B71]' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Ir a la diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
