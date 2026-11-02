import React, { useState } from 'react';
import { Download, FileCode, Check, Copy } from 'lucide-react';

interface StandaloneExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneExportModal: React.FC<StandaloneExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Triggers download of feria_ende_beni_standalone.html
    const link = document.createElement('a');
    link.href = '/feria_ende_beni_standalone.html';
    link.download = 'feria_ende_beni_standalone.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    const url = window.location.origin + '/feria_ende_beni_standalone.html';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003B71] flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-lg text-[#003B71]">
                Archivo Único Autónomo
              </h4>
              <p className="text-xs text-slate-500">
                HTML + CSS + JS en un solo archivo portátil
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm text-slate-600 leading-relaxed">
          <p>
            Este archivo contiene toda la aplicación completa de <strong>ENDE DEL BENI</strong> lista para:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Abrir directamente con doble clic en cualquier tablet, celular o PC sin servidor.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Publicar arrastrando a <strong>Netlify Drop</strong> o <strong>GitHub Pages</strong>.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Conexión directa configurada a Supabase con soporte offline y reintento.</span>
            </li>
          </ul>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 py-3.5 px-4 rounded-xl bg-[#003B71] hover:bg-[#002855] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Descargar feria_ende_beni.html</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar URL'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
