/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { ApprovedInstallers } from './components/ApprovedInstallers';
import { RequirementsSection } from './components/RequirementsSection';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Carousel } from './components/Carousel';
import { RegistrationForm } from './components/RegistrationForm';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import { StatusIndicator } from './components/StatusIndicator';
import { StandaloneExportModal } from './components/StandaloneExportModal';
import { RegistrationSubmission } from './types';
import { Building2, FileText, Send, Zap, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [submittedRecord, setSubmittedRecord] = useState<RegistrationSubmission | null>(null);
  const [isOfflineSaved, setIsOfflineSaved] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [counterVersion, setCounterVersion] = useState<number>(0);

  const handleRegistrationSuccess = useCallback(
    (submission: RegistrationSubmission, offlineSaved: boolean) => {
      setSubmittedRecord(submission);
      setIsOfflineSaved(offlineSaved);
      setShowSuccess(true);
      setCounterVersion((v) => v + 1);
    },
    []
  );

  const handleResetForm = useCallback(() => {
    setShowSuccess(false);
    setSubmittedRecord(null);
    setIsOfflineSaved(false);

    // Scroll back to form smoothly
    const formElement = document.getElementById('formulario');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Poppins',sans-serif] selection:bg-amber-400 selection:text-slate-900">
      {/* 1. Hero Corporate Full Screen with upper-left logo and Download Requirements PDF */}
      <Hero />

      {/* 2. Pestañas de Navegación Corporativa para Feria (Sticky Navigation Bar) */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Pestaña: Formulario de Registro */}
            <button
              onClick={() => scrollToSection('formulario')}
              className="px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-[#003B71] hover:bg-[#002855] text-white shadow-sm transition active:scale-95 shrink-0"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>Registro de Solicitud</span>
            </button>

            {/* Pestaña: Empresas Instaladoras Aprobadas */}
            <button
              onClick={() => scrollToSection('empresas-instaladoras')}
              className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-sky-50 text-sky-900 hover:bg-sky-100 border border-sky-200 transition active:scale-95 shrink-0"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Empresas Habilitadas (12)</span>
            </button>

            {/* Pestaña: Requisitos Oficiales PDF */}
            <button
              onClick={() => scrollToSection('requisitos')}
              className="px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition active:scale-95 shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Requisitos AETN (PDF)</span>
            </button>

            {/* Pestaña: ¿Cómo Funciona? */}
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="hidden md:flex px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold items-center gap-1.5 text-slate-600 hover:bg-slate-100 transition shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Funcionamiento</span>
            </button>

            {/* Pestaña: Beneficios */}
            <button
              onClick={() => scrollToSection('beneficios')}
              className="hidden lg:flex px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold items-center gap-1.5 text-slate-600 hover:bg-slate-100 transition shrink-0"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Beneficios</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-black text-[#003B71]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ENDE DELBENI SAM · LA ENERGÍA DEL BENI</span>
          </div>
        </div>
      </nav>

      {/* 3. Padrón Oficial de Empresas Instaladoras Aprobadas (Compacto) */}
      <ApprovedInstallers />

      {/* 4. Requisitos Generales y Técnicos (Regulado por AETN con descarga PDF) */}
      <RequirementsSection />

      {/* 5. ¿Cómo Funciona? (Diagrama de 5 pasos enlazados) */}
      <HowItWorks />

      {/* 6. Beneficios Corporativos e Impacto Económico */}
      <Benefits />

      {/* 7. Galería de Aplicaciones (Residencial, Comercial, Agro e Industria) */}
      <Carousel />

      {/* 8. Formulario de Registro Oficial */}
      <RegistrationForm
        key={`form-${counterVersion}`}
        onSuccess={handleRegistrationSuccess}
        onCountUpdate={() => setCounterVersion((v) => v + 1)}
      />

      {/* 9. Pie de Página Institucional */}
      <Footer onOpenExport={() => setShowExportModal(true)} />

      {/* Real-time Online / Offline & Pending Sync Floating Indicator */}
      <StatusIndicator key={counterVersion} onManualSyncComplete={() => setCounterVersion((v) => v + 1)} />

      {/* Success Modal (with Confetti, 8-second auto-reset kiosk mode) */}
      {showSuccess && submittedRecord && (
        <SuccessModal
          submission={submittedRecord}
          isOfflineSaved={isOfflineSaved}
          onReset={handleResetForm}
        />
      )}

      {/* Standalone Export Modal */}
      <StandaloneExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
