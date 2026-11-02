import React from 'react';
import { ChevronDown, Sparkles, Sun, Zap, Download, FileText, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { EndeLogo } from './EndeLogo';
import { BeniSolarHouseHero } from './illustrations/BeniSolarHouseHero';
import { PDF_DOWNLOAD_URL, PDF_FILENAME } from './RequirementsSection';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between bg-gradient-to-b from-[#001D3D] via-[#002D59] to-[#003B71] text-white overflow-hidden">
      {/* Institutional Top Bar: Estado Plurinacional de Bolivia & AETN */}
      <div className="w-full bg-[#00142A] border-b border-white/10 px-4 sm:px-8 py-1.5 text-[10px] sm:text-xs text-slate-300 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-slate-200">
            ESTADO PLURINACIONAL DE BOLIVIA · ENDE CORPORACIÓN
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-400">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>Supervisada y regulada por la Autoridad de Fiscalización de Electricidad (AETN)</span>
        </div>
      </div>

      {/* Corporate Header Bar: Logo on upper-left, actions on right */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-[#001D3D]/50">
        {/* UPPER LEFT LOGO */}
        <div className="flex items-center">
          <EndeLogo variant="light" size="md" showSubtitle={true} />
        </div>

        {/* HEADER ACTIONS: Requisitos PDF + Empresas Instaladoras + Quiero Registrarme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pestaña / Link Empresas Instaladoras */}
          <a
            href="#empresas-instaladoras"
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 shadow-sm transition active:scale-95"
            title="Ver empresas instaladoras aprobadas por ENDE DEL BENI"
          >
            <Building2 className="w-4 h-4 text-sky-300 shrink-0" />
            <span>Empresas Instaladoras</span>
          </a>

          {/* Botón Descargar Requisitos PDF */}
          <a
            href={PDF_DOWNLOAD_URL}
            download={PDF_FILENAME}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/25 backdrop-blur-md shadow-md transition-all active:scale-95 flex items-center gap-1.5 sm:gap-2 group"
            title="Descargar documento oficial de requisitos en formato PDF"
          >
            <Download className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            <span className="hidden xs:inline">Descargar</span>
            <span>Requisitos PDF</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#formulario"
            className="px-4 sm:px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-amber-400/20 transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>Registrarme</span>
            <Zap className="w-4 h-4 fill-current shrink-0" />
          </a>
        </div>
      </header>

      {/* Hero Core Content: Corporate 2-Column */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left Column: Typography & Corporate CTAs */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Programa Institucional de Generación Distribuida</span>
          </div>

          {/* Main Corporate Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white">
            Genera tu propia energía <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-emerald-300">
              solar y conéctate a la red
            </span>
          </h1>

          {/* Corporate Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            Conviértete en usuario generador de <strong className="text-amber-300 font-bold">ENDE DEL BENI S.A.M.</strong> Produce electricidad limpia para tu consumo y benefíciate de la compensación de excedentes conforme a la normativa boliviana.
          </p>

          {/* Corporate Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <a
              href="#formulario"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>QUIERO REGISTRARME</span>
            </a>

            <a
              href="#empresas-instaladoras"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>Empresas Habilitadas</span>
            </a>

            <a
              href={PDF_DOWNLOAD_URL}
              download={PDF_FILENAME}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-300" />
              <span>Requisitos (PDF)</span>
            </a>
          </div>

          {/* Corporate Key Indicators Grid */}
          <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto lg:mx-0 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-lg sm:text-xl font-black text-amber-300">Hasta 80%</span>
              <span className="text-[10px] sm:text-[11px] text-blue-200 uppercase font-medium">Ahorro en factura</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-lg sm:text-xl font-black text-emerald-300">220V CA</span>
              <span className="text-[10px] sm:text-[11px] text-blue-200 uppercase font-medium">Red continua</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="block text-lg sm:text-xl font-black text-sky-300">D.S. 4477</span>
              <span className="text-[10px] sm:text-[11px] text-blue-200 uppercase font-medium">Marco AETN</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual in Executive Frame */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-lg lg:max-w-none rounded-3xl p-2 bg-gradient-to-b from-white/15 to-transparent border border-white/20 shadow-2xl backdrop-blur-sm">
            <BeniSolarHouseHero />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 w-full py-3 flex items-center justify-center border-t border-white/5 text-[11px] text-blue-200/80">
        <a
          href="#empresas-instaladoras"
          className="flex items-center gap-2 hover:text-white transition group"
        >
          <span>Conoce los requisitos técnicos, empresas habilitadas y funcionamiento</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};
