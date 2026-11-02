export interface RegistrationFormData {
  nombre: string;
  ci: string;
  numero_usuario: string;
  numero_medidor: string;
  celular: string;
  correo: string;
  autorizo: boolean;
}

export interface RegistrationSubmission {
  nombre: string;
  ci: string;
  numero_usuario: string;
  numero_medidor: string;
  celular: string;
  correo: string | null;
  origen?: string;
}

export interface OfflineQueueItem {
  id: string;
  payload: RegistrationSubmission;
  timestamp: number;
  attempts: number;
  lastError?: string;
}

export interface FormErrors {
  nombre?: string;
  ci?: string;
  numero_usuario?: string;
  numero_medidor?: string;
  celular?: string;
  correo?: string;
  autorizo?: string;
  general?: string;
}
