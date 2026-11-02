import React, { useState, useRef } from 'react';
import {
  User,
  CreditCard,
  Hash,
  Gauge,
  Phone,
  Mail,
  CheckSquare,
  Square,
  AlertCircle,
  HelpCircle,
  Send,
  Loader2,
  Sparkles,
  Info,
  CheckCircle2,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { RegistrationFormData, FormErrors, RegistrationSubmission } from '../types';
import { formatSubmissionPayload, submitRegistration, SubmitResult } from '../services/supabase';
import { SolarPanelCloseup } from './illustrations/SolarPanelCloseup';

interface RegistrationFormProps {
  onSuccess: (submission: RegistrationSubmission, isOfflineSaved: boolean) => void;
  onCountUpdate?: () => void;
}

const CI_REGEX = /^[0-9]{4,10}(-?[0-9A-Za-z]{1,3})?( ?[A-Za-z]{2})?$/;
const CELULAR_REGEX = /^[67][0-9]{7}$/;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onCountUpdate }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    nombre: '',
    ci: '',
    numero_usuario: '',
    numero_medidor: '',
    celular: '',
    correo: '',
    autorizo: true, // checked by default for swift feria entry
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFacturaHelp, setShowFacturaHelp] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Input refs for Enter key navigation
  const nombreRef = useRef<HTMLInputElement>(null);
  const ciRef = useRef<HTMLInputElement>(null);
  const usuarioRef = useRef<HTMLInputElement>(null);
  const medidorRef = useRef<HTMLInputElement>(null);
  const celularRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const validateField = (name: keyof RegistrationFormData, value: any): string | undefined => {
    switch (name) {
      case 'nombre': {
        const trimmed = (value as string).trim();
        if (!trimmed) return 'El nombre completo es obligatorio.';
        if (trimmed.length < 3) return 'Mínimo 3 caracteres.';
        if (trimmed.length > 150) return 'Máximo 150 caracteres.';
        return undefined;
      }
      case 'ci': {
        const trimmed = (value as string).trim();
        if (!trimmed) return 'El Carnet de Identidad es obligatorio.';
        if (!CI_REGEX.test(trimmed)) {
          return 'Formato inválido. Ej: 1234567, 1234567-1A o 1234567 BN';
        }
        return undefined;
      }
      case 'numero_usuario': {
        const trimmed = (value as string).trim();
        if (!trimmed) return 'El número de usuario es obligatorio (ver factura).';
        if (trimmed.length > 30) return 'Máximo 30 caracteres.';
        return undefined;
      }
      case 'numero_medidor': {
        const trimmed = (value as string).trim();
        if (!trimmed) return 'El número de medidor es obligatorio.';
        if (trimmed.length > 30) return 'Máximo 30 caracteres.';
        return undefined;
      }
      case 'celular': {
        const trimmed = (value as string).trim();
        if (!trimmed) return 'El número de celular es obligatorio.';
        if (!CELULAR_REGEX.test(trimmed)) {
          return 'Debe tener 8 dígitos y empezar con 6 o 7 (ej: 71234567).';
        }
        return undefined;
      }
      case 'correo': {
        const trimmed = (value as string).trim();
        if (trimmed.length > 0 && !EMAIL_REGEX.test(trimmed)) {
          return 'Formato de correo no válido (ej: usuario@correo.com).';
        }
        return undefined;
      }
      case 'autorizo': {
        if (!value) {
          return 'Debe autorizar el contacto comercial para continuar.';
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setGeneralError(null);

    // Validate in real time
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  // Keyboard Enter navigation between fields
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement | null>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof RegistrationFormData>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateAll()) {
      // Focus first error field
      if (errors.nombre && nombreRef.current) nombreRef.current.focus();
      else if (errors.ci && ciRef.current) ciRef.current.focus();
      else if (errors.numero_usuario && usuarioRef.current) usuarioRef.current.focus();
      else if (errors.numero_medidor && medidorRef.current) medidorRef.current.focus();
      else if (errors.celular && celularRef.current) celularRef.current.focus();
      return;
    }

    setIsSubmitting(true);
    const payload = formatSubmissionPayload(formData);

    try {
      const result: SubmitResult = await submitRegistration(payload);

      if (result.success) {
        if (onCountUpdate) onCountUpdate();
        onSuccess(payload, !!result.isOfflineSaved);
      } else {
        if (result.isDuplicate) {
          setGeneralError(result.message || 'Este C.I. y medidor ya están registrados en el sistema de ENDE DEL BENI.');
        } else {
          setGeneralError(result.message || 'Error al procesar el registro. Intente nuevamente.');
        }
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setGeneralError('Ocurrió un error inesperado. El registro se guardó localmente en el equipo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="py-16 sm:py-24 bg-gradient-to-b from-slate-100 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Corporate Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-[#003B71] text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3 shadow-xs border border-blue-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Solicitud Oficial de Adhesión · ENDE DELBENI SAM
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#003B71] tracking-tight">
            Registro de Usuarios para Generación Distribuida
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            Complete sus datos de suministro para recibir la evaluación técnica preliminar, cálculo de capacidad admisible y acompañamiento en el marco regulatorio de la AETN.
          </p>
        </div>

        {/* Form Card Layout */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Side Visual & Quick Info on Large Screens */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#003B71] via-[#002D59] to-[#001D3D] p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
                  Energía Limpia en tu Techo
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                  Transforma el calor del Beni en tu mayor ahorro
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Al registrarte en este stand comercial, accedes al levantamiento de carga preliminar y asesoría sobre requisitos técnicos para tu instalación solar.
                </p>

                {/* Technical Panel Closeup preview */}
                <div className="rounded-2xl overflow-hidden border border-sky-400/20 shadow-xl mb-6 bg-slate-900/50">
                  <SolarPanelCloseup className="w-full h-48" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Conexión avalada por ENDE DEL BENI</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Compensación de excedentes en tu factura</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Soporte técnico y normativo especializado</span>
                  </div>
                </div>

                {/* PDF Requisitos Download Shortcut */}
                <div className="mt-6 pt-4 border-t border-blue-900/40">
                  <a
                    href="/assets/aistudio/Requisitos-Generacio-Distribuidav3__1__febfcf3a.pdf"
                    download="Requisitos-Generacion-Distribuida-ENDE-DEL-BENI.pdf"
                    className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Requisitos Oficiales (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Assistance Box */}
              <div className="mt-8 pt-6 border-t border-blue-900/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Stand Feria ENDE DEL BENI</p>
                  <p className="text-[11px] text-blue-200">ENDE DELBENI SAM · LA ENERGÍA DEL BENI</p>
                </div>
              </div>
            </div>

            {/* Right Column: Actual Form with Touch Inputs */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* General Notification / Error Alert */}
                {generalError && (
                  <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 text-amber-900 flex items-start gap-3 animate-shake">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <strong className="block font-bold">Aviso del Sistema</strong>
                      <span>{generalError}</span>
                    </div>
                  </div>
                )}

                {/* 1. Nombre Completo */}
                <div>
                  <label
                    htmlFor="field-nombre"
                    className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-[#003B71]" />
                      Nombre Completo <span className="text-red-500">*</span>
                    </span>
                    <span className="text-xs font-normal text-slate-400">Min. 3 caracteres</span>
                  </label>
                  <input
                    ref={nombreRef}
                    id="field-nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleChange('nombre', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, ciRef)}
                    placeholder="Ej. Juan Carlos Rodríguez Vaca"
                    autoComplete="name"
                    className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 bg-slate-50 border-2 transition-all outline-none ${
                      errors.nombre
                        ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                    }`}
                  />
                  {errors.nombre && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.nombre}
                    </p>
                  )}
                </div>

                {/* 2-Column Grid: C.I. & Celular */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Carnet de Identidad */}
                  <div>
                    <label
                      htmlFor="field-ci"
                      className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#003B71]" />
                        C.I. <span className="text-red-500">*</span>
                      </span>
                      <span className="text-xs font-normal text-slate-400">Ej: 1234567 BN</span>
                    </label>
                    <input
                      ref={ciRef}
                      id="field-ci"
                      type="text"
                      value={formData.ci}
                      onChange={(e) => handleChange('ci', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, usuarioRef)}
                      placeholder="1234567 o 1234567 BN"
                      className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 uppercase bg-slate-50 border-2 transition-all outline-none ${
                        errors.ci
                          ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                      }`}
                    />
                    {errors.ci && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.ci}
                      </p>
                    )}
                  </div>

                  {/* Celular */}
                  <div>
                    <label
                      htmlFor="field-celular"
                      className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#003B71]" />
                        Celular <span className="text-red-500">*</span>
                      </span>
                      <span className="text-xs font-normal text-slate-400">8 dígitos (6 o 7)</span>
                    </label>
                    <input
                      ref={celularRef}
                      id="field-celular"
                      type="tel"
                      inputMode="numeric"
                      maxLength={8}
                      value={formData.celular}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        handleChange('celular', val);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, correoRef)}
                      placeholder="Ej. 71234567"
                      className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 bg-slate-50 border-2 transition-all outline-none ${
                        errors.celular
                          ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                      }`}
                    />
                    {errors.celular && (
                      <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.celular}
                      </p>
                    )}
                  </div>
                </div>

                {/* 2-Column Grid: Número de Usuario & Número de Medidor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Número de Usuario */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="field-usuario"
                        className="text-sm font-bold text-slate-700 flex items-center gap-2"
                      >
                        <Hash className="w-4 h-4 text-[#003B71]" />
                        Nº de Usuario <span className="text-red-500">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowFacturaHelp(true)}
                        className="text-xs text-[#003B71] hover:underline flex items-center gap-1 font-medium"
                      >
                        <HelpCircle className="w-3 h-3 text-amber-500" />
                        ¿Dónde está?
                      </button>
                    </div>
                    <input
                      ref={usuarioRef}
                      id="field-usuario"
                      type="text"
                      value={formData.numero_usuario}
                      onChange={(e) => handleChange('numero_usuario', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, medidorRef)}
                      placeholder="Figura en tu factura"
                      className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 bg-slate-50 border-2 transition-all outline-none ${
                        errors.numero_usuario
                          ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      Figura en la parte superior de tu factura de luz.
                    </p>
                    {errors.numero_usuario && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.numero_usuario}
                      </p>
                    )}
                  </div>

                  {/* Número de Medidor */}
                  <div>
                    <label
                      htmlFor="field-medidor"
                      className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#003B71]" />
                        Nº de Medidor <span className="text-red-500">*</span>
                      </span>
                      <span className="text-xs font-normal text-slate-400">Grabado en el equipo</span>
                    </label>
                    <input
                      ref={medidorRef}
                      id="field-medidor"
                      type="text"
                      value={formData.numero_medidor}
                      onChange={(e) => handleChange('numero_medidor', e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, celularRef)}
                      placeholder="Ej. M-45892 o 849201"
                      className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 uppercase bg-slate-50 border-2 transition-all outline-none ${
                        errors.numero_medidor
                          ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                          : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                      }`}
                    />
                    <p className="mt-1 text-[11px] text-slate-500">
                      También visible en el detalle de tu factura.
                    </p>
                    {errors.numero_medidor && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.numero_medidor}
                      </p>
                    )}
                  </div>
                </div>

                {/* Correo Electrónico (Opcional) */}
                <div>
                  <label
                    htmlFor="field-correo"
                    className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#003B71]" />
                      Correo Electrónico
                    </span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Opcional
                    </span>
                  </label>
                  <input
                    ref={correoRef}
                    id="field-correo"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => handleChange('correo', e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, submitBtnRef)}
                    placeholder="Para enviarte la propuesta técnica digital"
                    className={`w-full h-14 px-4 rounded-xl text-base text-slate-800 bg-slate-50 border-2 transition-all outline-none ${
                      errors.correo
                        ? 'border-red-400 bg-red-50/40 focus:border-red-500'
                        : 'border-slate-200 focus:border-[#003B71] focus:bg-white'
                    }`}
                  />
                  {errors.correo && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.correo}
                    </p>
                  )}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <div
                    onClick={() => handleChange('autorizo', !formData.autorizo)}
                    className="flex items-start gap-3.5 cursor-pointer select-none p-3.5 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition border border-blue-100"
                  >
                    <div className="mt-0.5 text-[#003B71] shrink-0">
                      {formData.autorizo ? (
                        <CheckSquare className="w-6 h-6 text-[#003B71]" />
                      ) : (
                        <Square className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-snug">
                      <strong className="text-[#003B71]">Autorizo a ENDE DEL BENI</strong> a contactarme sobre el programa de Generación Distribuida y realizar la evaluación de mi suministro eléctrico.
                    </p>
                  </div>
                  {errors.autorizo && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.autorizo}
                    </p>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-4">
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full h-16 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                      isSubmitting
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#003B71] via-[#004B8D] to-[#003B71] hover:from-[#002D59] hover:to-[#002D59] text-white hover:shadow-2xl active:scale-[0.98]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                        <span>Enviando registro a ENDE DEL BENI...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 text-amber-400" />
                        <span>QUIERO REGISTRARME AHORA</span>
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Tus datos se transmiten directamente al sistema comercial de ENDE DEL BENI de forma segura y confidencial.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Factura Helper Modal */}
      {showFacturaHelp && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowFacturaHelp(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[#003B71]" />
                <h4 className="font-extrabold text-lg text-[#003B71]">
                  Dónde encontrar tus datos
                </h4>
              </div>
              <button
                onClick={() => setShowFacturaHelp(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <p className="text-sm text-slate-600">
                En cualquier factura física o digital de <strong>ENDE DEL BENI</strong> encontrarás:
              </p>

              {/* Bill Simulation Graphic */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="p-2.5 rounded-xl bg-white border-2 border-amber-400 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">En el recuadro superior:</span>
                    <p className="text-sm font-bold text-[#003B71]">Nº USUARIO: 1048291</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                    Requerido
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border-2 border-emerald-400 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">En datos de medición:</span>
                    <p className="text-sm font-bold text-[#003B71]">Nº MEDIDOR: M-93041</p>
                  </div>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    Requerido
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Si no cuentas con tu factura a mano en la feria, puedes acercarte al asesor de nuestro stand y te ayudaremos a consultarlo de inmediato con tu carnet de identidad.
              </p>
            </div>

            <button
              onClick={() => setShowFacturaHelp(false)}
              className="mt-6 w-full py-3 rounded-xl bg-[#003B71] hover:bg-[#002855] text-white font-bold text-sm shadow transition"
            >
              Entendido, volver al formulario
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
