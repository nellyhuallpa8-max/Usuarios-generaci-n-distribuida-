import React from 'react';
import { EndeLogo } from './EndeLogo';
import { ShieldCheck, MapPin, Phone, Globe, Download } from 'lucide-react';

interface FooterProps {
  onOpenExport?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenExport }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001D3D] text-slate-300 border-t border-slate-800 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Identity */}
          <div className="space-y-4">
            <EndeLogo variant="light" size="md" showSubtitle={true} />
            <p className="text-xs text-slate-400 leading-relaxed pt-2">
              Empresa Nacional de Electricidad – ENDE DEL BENI S.A.M. Distribuidora departamental de energía eléctrica comprometida con la transición energética sostenible en el oriente boliviano.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Programa de Generación Distribuida</span>
            </div>
          </div>

          {/* Col 2: ENDE DELBENI SAM & Atención */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">
              ENDE DELBENI SAM · LA ENERGÍA DEL BENI
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0099DA] shrink-0" />
                <span>Trinidad, Beni – Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0099DA] shrink-0" />
                <span>Línea Gratuita de Atención al Usuario</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0099DA] shrink-0" />
                <span>Atención en Agencias: Trinidad, Riberalta, Guayaramerín</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Marco Normativo en Bolivia */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">
              Marco Normativo
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              La Generación Distribuida en Bolivia permite a cualquier usuario residencial, comercial o industrial instalar sistemas solares conectados a red, garantizando la compensación de excedentes según regulación de la AETN.
            </p>
          </div>

          {/* Col 4: Modo Feria & Stand */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-white">
              Punto de Registro Feria
            </h5>
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 space-y-2">
              <p className="text-xs font-bold text-white">Tablet / Kiosco Comercial</p>
              <p className="text-[11px] text-slate-400">
                Sistema preparado para funcionamiento continuo y captura de interesados con o sin internet.
              </p>
              {onOpenExport && (
                <button
                  onClick={onOpenExport}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar versión archivo único</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="font-bold text-white">
            ENDE DELBENI SAM – LA ENERGÍA DEL BENI © {currentYear}
          </p>
          <p className="text-center sm:text-right">
            Generación Distribuida · Todos los derechos reservados · Estado Plurinacional de Bolivia
          </p>
        </div>
      </div>
    </footer>
  );
};
