import { RegistrationFormData, RegistrationSubmission, OfflineQueueItem } from '../types';

const SUPABASE_URL = 'https://dqqfaxaqrfpmlpkxxavv.supabase.co';
const SUPABASE_ENDPOINT = `${SUPABASE_URL}/rest/v1/registro_generacion_distribuida`;
const SUPABASE_KEY = 'sb_publishable_YZ9g1IMronKpG9mZ44GBdg_ZSOfm36c';

const QUEUE_STORAGE_KEY = 'ende_beni_offline_queue_v1';
const TODAY_COUNTER_KEY_PREFIX = 'ende_beni_count_';

export function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${TODAY_COUNTER_KEY_PREFIX}${year}-${month}-${day}`;
}

export function getTodayRegistrationCount(): number {
  try {
    const key = getTodayKey();
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementTodayRegistrationCount(): number {
  try {
    const key = getTodayKey();
    const current = getTodayRegistrationCount();
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return next;
  } catch {
    return 1;
  }
}

export function getOfflineQueue(): OfflineQueueItem[] {
  try {
    const data = localStorage.getItem(QUEUE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading offline queue:', e);
    return [];
  }
}

export function saveOfflineQueue(queue: OfflineQueueItem[]): void {
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (e) {
    console.error('Error saving offline queue:', e);
  }
}

export function addToOfflineQueue(payload: RegistrationSubmission): OfflineQueueItem {
  const item: OfflineQueueItem = {
    id: `queue_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    payload,
    timestamp: Date.now(),
    attempts: 0,
  };
  const queue = getOfflineQueue();
  queue.push(item);
  saveOfflineQueue(queue);
  return item;
}

export function formatSubmissionPayload(form: RegistrationFormData): RegistrationSubmission {
  const trimmedEmail = form.correo.trim().toLowerCase();
  return {
    nombre: form.nombre.trim(),
    ci: form.ci.trim().toUpperCase(),
    numero_usuario: form.numero_usuario.trim(),
    numero_medidor: form.numero_medidor.trim().toUpperCase(),
    celular: form.celular.trim(),
    correo: trimmedEmail.length > 0 ? trimmedEmail : null,
    origen: 'feria',
  };
}

export interface SubmitResult {
  success: boolean;
  isOfflineSaved?: boolean;
  isDuplicate?: boolean;
  message?: string;
}

/**
 * Envia el registro directamente a Supabase sin cabecera Authorization
 */
export async function submitRegistration(payload: RegistrationSubmission): Promise<SubmitResult> {
  // If explicitly offline before trying
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    addToOfflineQueue(payload);
    incrementTodayRegistrationCount();
    return {
      success: true,
      isOfflineSaved: true,
      message: 'Guardado en el equipo, se enviará al volver la conexión.',
    };
  }

  try {
    const response = await fetch(SUPABASE_ENDPOINT, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      incrementTodayRegistrationCount();
      return { success: true };
    }

    const responseText = await response.text();

    // Check for PostgreSQL unique violation code 23505 (ux_rgd_ci_medidor)
    if (responseText.includes('23505') || responseText.includes('ux_rgd_ci_medidor')) {
      return {
        success: false,
        isDuplicate: true,
        message: 'Este C.I. y número de medidor ya están registrados en el sistema de ENDE DEL BENI.',
      };
    }

    // Server-side check constraint error or other status
    return {
      success: false,
      message: `Error al procesar el registro (${response.status}). Verifique los datos ingresados.`,
    };
  } catch (error) {
    console.warn('Network error during Supabase post, queueing offline:', error);
    // Network error or fetch failed -> Save offline
    addToOfflineQueue(payload);
    incrementTodayRegistrationCount();
    return {
      success: true,
      isOfflineSaved: true,
      message: 'Guardado en el equipo, se enviará al volver la conexión.',
    };
  }
}

/**
 * Reintenta enviar los registros pendientes acumulados en offline
 */
export async function syncOfflineQueue(): Promise<{ synced: number; remaining: number }> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { synced: 0, remaining: getOfflineQueue().length };
  }

  const queue = getOfflineQueue();
  if (queue.length === 0) return { synced: 0, remaining: 0 };

  const remainingQueue: OfflineQueueItem[] = [];
  let syncedCount = 0;

  for (const item of queue) {
    try {
      const response = await fetch(SUPABASE_ENDPOINT, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(item.payload),
      });

      if (response.ok) {
        syncedCount++;
      } else {
        const text = await response.text();
        if (text.includes('23505') || text.includes('ux_rgd_ci_medidor')) {
          // Already registered, can safely discard from queue
          syncedCount++;
        } else {
          item.attempts += 1;
          item.lastError = text;
          remainingQueue.push(item);
        }
      }
    } catch {
      item.attempts += 1;
      remainingQueue.push(item);
      // Network still broken, break out early
      break;
    }
  }

  saveOfflineQueue(remainingQueue);
  return { synced: syncedCount, remaining: remainingQueue.length };
}
