import React from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Building,
  MapPin,
  PhoneCall,
  Zap,
  ExternalLink,
  Wrench,
  ClipboardList,
} from 'lucide-react';

export const PDF_DOWNLOAD_URL = '/assets/aistudio/Requisitos-Generacio-Distribuidav3__1__febfcf3a.pdf';
export const PDF_FILENAME = 'Requisitos-Generacion-Distribuida-ENDE-DEL-BENI.pdf';

export const RequirementsSection: React.FC = () => {
  return (
    <section id="requisitos" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title and Download PDF Button */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-14 bg-gradient-to-r from-[#002855] via-[#003B71] to-[#004B8D] p-8 sm:p-10 rounded-3xl text-white shadow-xl">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/20">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Regulado por la AETN Bolivia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Requisitos para Registrar Usuarios de Generación Distribuida
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Consulte la documentación general y técnica requerida por <strong>ENDE DEL BENI S.A.M.</strong> para la habilitación de su sistema solar conectado a red.
            </p>
          </div>

          {/* Primary PDF Download Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <a
              href={PDF_DOWNLOAD_URL}
              download={PDF_FILENAME}
              className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all transform active:scale-95 group"
            >
              <Download className="w-5 h-5 text-slate-950 group-hover:-translate-y-0.5 transition-transform" />
              <span>DESCARGAR REQUISITOS (PDF)</span>
            </a>

            <a
              href={PDF_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/20 transition backdrop-blur-md"
            >
              <ExternalLink className="w-4 h-4 text-sky-300" />
              <span>Abrir documento</span>
            </a>
          </div>
        </div>

        {/* Requirements 2-Column Grid based directly on the official PDF document */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Requisitos Generales */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#003B71] flex items-center justify-center font-bold">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#003B71]">
                      Fase 1
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Requisitos Generales
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-[#003B71] text-xs font-bold">
                  6 Puntos
                </span>
              </div>

              <ol className="space-y-4 text-slate-700 text-sm">
                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#003B71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Persona Natural:</strong>
                    <span>Fotocopia de Cédula de Identidad Vigente.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#003B71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Persona Jurídica (adicional al punto 1):</strong>
                    <ul className="mt-1 space-y-1 text-xs text-slate-600 pl-1">
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-500 font-bold">►</span> Poder de representación.
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-amber-500 font-bold">►</span> Copia de acta de posesión.
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#003B71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Ubicación del Medidor:</strong>
                    <span>Señalar ubicación para el medidor de generación distribuida (mediante croquis u otro medio).</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#003B71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Datos de Contacto:</strong>
                    <span>Del solicitante o de la persona que estará presente en las inspecciones: teléfono y/o correo electrónico.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-[#003B71] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Cuenta de Suministro:</strong>
                    <span>Indicar cuenta de suministro que esté a nombre del solicitante o de la representación acreditada.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-900">Firma de Contrato:</strong>
                    <span>Una vez cumplidos los requisitos técnicos, firmar contrato como generador distribuido.</span>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Column 2: Requisitos Técnicos */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Fase 2
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      Requisitos Técnicos
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  5 Puntos
                </span>
              </div>

              <ol className="space-y-4 text-slate-700 text-sm">
                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Generación Máxima:</strong>
                    <span>Establecer generación máxima de generación en función a consumo histórico o estimación anual.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Formulario Web Oficial:</strong>
                    <span>Llenar formulario de solicitud en la página web de ENDE DELBENI S.A.M. (<strong>www.endedelbeni.bo</strong>).</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Documento Descriptivo del Proyecto:</strong>
                    <span>Firmado por representante de una empresa instaladora registrada. Se destaca que el proyecto debe incluir la instalación de un <strong>medidor de generación contiguo al medidor bidireccional</strong>.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold">Inspección Coordinada:</strong>
                    <span>Realizar inspección técnica coordinada a la instalación de generación distribuida, entre el solicitante y ENDE DELBENI S.A.M.</span>
                  </div>
                </li>

                <li className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold text-emerald-900">Subsanación de Observaciones:</strong>
                    <span>Subsanar observaciones que presente ENDE DELBENI S.A.M. a partir de la inspección técnica realizada.</span>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Bottom Banner with Fast Download Action */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">
                Documento Oficial de Requisitos (PDF)
              </p>
              <p className="text-xs text-slate-500">
                Formato PDF de alta resolución listo para imprimir o enviar por WhatsApp
              </p>
            </div>
          </div>

          <a
            href={PDF_DOWNLOAD_URL}
            download={PDF_FILENAME}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#003B71] hover:bg-[#002855] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Descargar Documento Completo</span>
          </a>
        </div>
      </div>
    </section>
  );
};
