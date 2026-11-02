import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, Database } from 'lucide-react';
import {
  getOfflineQueue,
  syncOfflineQueue,
  getTodayRegistrationCount,
} from '../services/supabase';

interface StatusIndicatorProps {
  onManualSyncComplete?: () => void;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ onManualSyncComplete }) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);
  const [lastSyncResult, setLastSyncResult] = useState<string | null>(null);

  const updateCounts = () => {
    setPendingCount(getOfflineQueue().length);
    setTodayCount(getTodayRegistrationCount());
  };

  const performSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setLastSyncResult(null);

    try {
      const res = await syncOfflineQueue();
      updateCounts();
      if (res.synced > 0) {
        setLastSyncResult(`¡Se sincronizaron exitosamente ${res.synced} registro(s)!`);
      } else if (res.remaining === 0) {
        setLastSyncResult('No hay registros pendientes por enviar.');
      }
      if (onManualSyncComplete) onManualSyncComplete();
    } catch (e) {
      console.warn('Sync failed:', e);
      setLastSyncResult('Error al conectar con la base de datos de ENDE DEL BENI.');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    updateCounts();

    const handleOnline = () => {
      setIsOnline(true);
      performSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic sync every 30 seconds
    const interval = setInterval(() => {
      updateCounts();
      if (navigator.onLine && getOfflineQueue().length > 0) {
        performSync();
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Floating Status Pill in Bottom-Right or Top-Right Corner */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 select-none">
        {/* Today's Counter Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-xs text-slate-700">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Hoy en este equipo:</span>
          <strong className="font-extrabold text-[#003B71] text-sm">{todayCount}</strong>
        </div>

        {/* Online / Offline Pill */}
        <button
          onClick={() => setShowSyncModal(true)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl backdrop-blur-md shadow-lg border transition-all duration-300 text-xs font-bold active:scale-95 ${
            isOnline
              ? pendingCount > 0
                ? 'bg-amber-500/90 hover:bg-amber-600 text-white border-amber-300 shadow-amber-500/20'
                : 'bg-emerald-600/95 hover:bg-emerald-700 text-white border-emerald-400 shadow-emerald-600/20'
              : 'bg-rose-600/95 hover:bg-rose-700 text-white border-rose-400 shadow-rose-600/20'
          }`}
          aria-label="Estado de conectividad y sincronización"
        >
          {isSyncing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : isOnline ? (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-200 animate-ping" />
          ) : (
            <WifiOff className="w-3.5 h-3.5" />
          )}

          <span>
            {isOnline
              ? pendingCount > 0
                ? `● En línea · ${pendingCount} pendiente(s)`
                : '● En línea'
              : `● Sin conexión · ${pendingCount} pendiente(s)`}
          </span>
        </button>
      </div>

      {/* Sync Management Modal */}
      {showSyncModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowSyncModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#003B71]" />
                <h4 className="font-extrabold text-base text-[#003B71]">
                  Estado del Sistema en Feria
                </h4>
              </div>
              <button
                onClick={() => setShowSyncModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Conectividad a Internet:</span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {isOnline ? 'Conectado a la Red' : 'Sin conexión (Offline)'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Registros pendientes en cola:</span>
                <span className="font-extrabold text-base text-amber-600">
                  {pendingCount}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                <span className="text-[#003B71] font-semibold">Total registrados hoy:</span>
                <span className="font-extrabold text-lg text-[#003B71]">
                  {todayCount}
                </span>
              </div>

              {lastSyncResult && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{lastSyncResult}</span>
                </div>
              )}

              <p className="text-xs text-slate-500 pt-1">
                La aplicación guarda automáticamente los datos localmente si la conexión en la feria fluctúa y reintenta cada 30 segundos.
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={performSync}
                disabled={isSyncing || !isOnline}
                className="flex-1 py-3 rounded-xl bg-[#003B71] hover:bg-[#002855] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 disabled:bg-slate-200 disabled:text-slate-400 shadow transition"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar ahora'}</span>
              </button>

              <button
                onClick={() => setShowSyncModal(false)}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
