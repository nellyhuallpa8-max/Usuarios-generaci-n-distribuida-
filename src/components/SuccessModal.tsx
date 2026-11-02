import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, RotateCcw, WifiOff, PhoneCall, Calendar } from 'lucide-react';
import { RegistrationSubmission } from '../types';
import { EndeLogo } from './EndeLogo';

interface SuccessModalProps {
  submission: RegistrationSubmission;
  isOfflineSaved: boolean;
  onReset: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  submission,
  isOfflineSaved,
  onReset,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(8);

  // Trigger confetti burst on mount
  useEffect(() => {
    try {
      // Primary burst
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#003B71', '#0099DA', '#FFB800', '#10B981', '#FFFFFF'],
      });

      // Secondary festive burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFB800', '#10B981', '#38BDF8'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#003B71', '#FFB800', '#10B981'],
        });
      }, 350);
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  // 8-second Kiosk Auto-Reset Timer
  useEffect(() => {
    if (secondsRemaining <= 0) {
      onReset();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsRemaining, onReset]);

  // Extract first name for friendly greeting
  const firstName = submission.nombre.split(' ')[0] || submission.nombre;

  const progressPercentage = ((8 - secondsRemaining) / 8) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-[#001A36]/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Background Animated Sunburst Halo */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] bg-gradient-to-tr from-amber-400/20 via-sky-400/10 to-emerald-400/20 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-10 shadow-2xl border-2 border-amber-300 relative z-10 text-center animate-slide-up">
        {/* Header Logo */}
        <div className="flex justify-center mb-6">
          <EndeLogo size="lg" showSubtitle={true} />
        </div>

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-500/30 text-emerald-600 mx-auto flex items-center justify-center mb-5 shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        {/* Main Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-[#003B71] tracking-tight">
          ¡Gracias, {firstName}!
        </h3>
        <p className="mt-2 text-base sm:text-lg text-slate-700 font-medium">
          Un asesor de <strong className="text-[#003B71]">ENDE DELBENI SAM · LA ENERGÍA DEL BENI</strong> se comunicará contigo.
        </p>

        {/* Offline Note if saved locally */}
        {isOfflineSaved ? (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Guardado en el equipo, se enviará al volver la conexión.</span>
          </div>
        ) : (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Registro recibido exitosamente en el sistema de ENDE DEL BENI.</span>
          </div>
        )}

        {/* Summary Card */}
        <div className="mt-6 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Titular registrado:</span>
            <span className="font-bold text-slate-800">{submission.nombre}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">C.I.:</span>
            <span className="font-mono font-bold text-[#003B71]">{submission.ci}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200">
            <span className="text-slate-500">Nº de Usuario / Medidor:</span>
            <span className="font-mono font-bold text-slate-800">
              {submission.numero_usuario} / {submission.numero_medidor}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" /> Celular de contacto:
            </span>
            <span className="font-bold text-emerald-700">{submission.celular}</span>
          </div>
        </div>

        {/* Action Button: Nuevo Registro */}
        <div className="mt-8">
          <button
            onClick={onReset}
            className="w-full py-4 rounded-2xl bg-[#003B71] hover:bg-[#002855] text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition active:scale-[0.98]"
          >
            <RotateCcw className="w-5 h-5 text-amber-400" />
            <span>Nuevo registro</span>
          </button>
        </div>

        {/* Kiosk Auto-Reset Countdown Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#003B71]" />
              Modo Kiosco Feria
            </span>
            <span>Regresando al inicio en <strong>{secondsRemaining}s</strong></span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-[#003B71] transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${100 - progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
