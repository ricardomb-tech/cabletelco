'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  ScaleIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InboxArrowDownIcon,
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

type TabKey = 'radicar' | 'consultar';

// ── Datos simulados para la línea de tiempo de rastreo ──
const TIMELINE_DEMO = [
  { step: 'Radicado Recibido', date: '15 May 2026 - 10:30 AM', status: 'done' as const, icon: InboxArrowDownIcon },
  { step: 'En Revisión por el Área Técnica', date: '16 May 2026 - 09:15 AM', status: 'done' as const, icon: MagnifyingGlassIcon },
  { step: 'Diagnóstico en Proceso', date: '17 May 2026 - 02:00 PM', status: 'current' as const, icon: ClockIcon },
  { step: 'Resolución y Respuesta al Usuario', date: 'Pendiente', status: 'pending' as const, icon: CheckCircleIcon },
];

export default function PqrPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('radicar');
  const [radicadoInput, setRadicadoInput] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form state
  const [tipoSolicitud, setTipoSolicitud] = useState('');
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleRadicarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleConsultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!radicadoInput.trim()) return;
    setIsSearching(true);
    setShowTimeline(false);
    setTimeout(() => {
      setIsSearching(false);
      setShowTimeline(true);
    }, 1500);
  };

  const tabs: { key: TabKey; label: string; icon: typeof DocumentTextIcon }[] = [
    { key: 'radicar', label: 'Radicar Nueva PQR', icon: DocumentTextIcon },
    { key: 'consultar', label: 'Consultar Estado', icon: MagnifyingGlassIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-screen border-b border-slate-100 overflow-hidden text-center flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=2000&auto=format&fit=crop"
            alt="Atención al usuario"
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-white/65 backdrop-blur-[2px]" />
        </div>
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-orange-100 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-35" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-20 md:pt-24">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-orange-100 border border-orange-200 text-orange-600 font-bold tracking-widest text-sm uppercase mb-6 shadow-sm backdrop-blur-sm"
          >
            Atención al Usuario
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Peticiones, Quejas y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Reclamos
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Tu satisfacción es nuestra prioridad. Radica tu solicitud o consulta el estado de tu
            trámite de forma rápida y segura.
          </motion.p>
        </div>
      </section>

      {/* ── TABS + CONTENIDO ── */}
      <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Buttons */}
        <div className="flex gap-2 mb-10 bg-slate-100 p-1.5 rounded-2xl max-w-lg mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setFormSubmitted(false); setShowTimeline(false); }}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300',
                activeTab === tab.key
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ═══ TAB 1: RADICAR ═══ */}
          {activeTab === 'radicar' && (
            <motion.div
              key="radicar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="text-lg md:text-xl text-slate-100/90 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              {!formSubmitted ? (
                <form
                  onSubmit={handleRadicarSubmit}
                  className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">
                    Formulario de Solicitud
                  </h2>

                  {/* Tipo de Solicitud */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Tipo de Solicitud *
                    </label>
                    <select
                      value={tipoSolicitud}
                      onChange={(e) => setTipoSolicitud(e.target.value)}
                      required
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="peticion">Petición</option>
                      <option value="queja">Queja</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="recurso">Recurso de Reposición</option>
                      <option value="felicitacion">Felicitación</option>
                    </select>
                  </div>

                  {/* Datos Personales */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <UserCircleIcon className="w-4 h-4 inline mr-1" /> Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej: Juan Pérez López"
                        required
                        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Cédula de Ciudadanía *
                      </label>
                      <input
                        type="text"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        placeholder="Ej: 1.065.000.000"
                        required
                        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <PhoneIcon className="w-4 h-4 inline mr-1" /> Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="Ej: 300 123 4567"
                        required
                        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        <EnvelopeIcon className="w-4 h-4 inline mr-1" /> Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej: correo@ejemplo.com"
                        required
                        className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Descripción Detallada *
                    </label>
                    <textarea
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      placeholder="Describe con el mayor detalle posible tu solicitud, incluyendo fechas, dirección del servicio y cualquier referencia que nos ayude a resolverla rápidamente."
                      required
                      rows={5}
                      className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all resize-none"
                    />
                  </div>

                  {/* Adjuntos */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      <PaperClipIcon className="w-4 h-4 inline mr-1" /> Adjuntar Archivos (Opcional)
                    </label>
                    <div className="flex items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer">
                      <div className="text-center text-slate-400 text-sm">
                        <PaperClipIcon className="w-8 h-8 mx-auto mb-2" />
                        Arrastra archivos aquí o haz clic para seleccionar
                      </div>
                    </div>
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    className="w-full md:w-auto flex items-center justify-center gap-2 py-4 px-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Enviar Solicitud
                  </button>
                </form>
              ) : (
                /* ── CONFIRMACIÓN DE ENVÍO ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-emerald-200 rounded-3xl p-8 md:p-12 shadow-lg text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                    ¡Solicitud Radicada con Éxito!
                  </h2>
                  <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                    Tu PQR ha sido registrada en nuestro sistema. Recibirás un correo de confirmación
                    con tu número de radicado para hacer seguimiento.
                  </p>
                  <div className="inline-block bg-slate-100 border border-slate-200 rounded-2xl p-4 mb-8">
                    <span className="text-sm text-slate-500">Número de Radicado</span>
                    <p className="text-2xl font-mono font-extrabold text-orange-600 tracking-widest mt-1">
                      PQR-2026-00347
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setActiveTab('consultar');
                        setRadicadoInput('PQR-2026-00347');
                        setFormSubmitted(false);
                      }}
                      className="text-orange-600 font-bold hover:underline"
                    >
                      Consultar estado de mi radicado &rarr;
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ═══ TAB 2: CONSULTAR ═══ */}
          {activeTab === 'consultar' && (
            <motion.div
              key="consultar"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Consulta tu Radicado</h2>
                <p className="text-slate-500 mb-8">
                  Ingresa el número de radicado que recibiste en tu correo para ver el estado actual de tu solicitud.
                </p>

                <form onSubmit={handleConsultar} className="flex flex-col sm:flex-row gap-3 mb-10">
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={radicadoInput}
                      onChange={(e) => setRadicadoInput(e.target.value)}
                      placeholder="Ej: PQR-2026-00347"
                      required
                      className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching}
                    className={cn(
                      'flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all',
                      isSearching
                        ? 'bg-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50'
                    )}
                  >
                    {isSearching ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      'Consultar'
                    )}
                  </button>
                </form>

                {/* Línea de Tiempo */}
                <AnimatePresence>
                  {showTimeline && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-orange-50 border border-orange-100">
                        <p className="text-sm text-orange-800">
                          <span className="font-bold">Radicado:</span>{' '}
                          <span className="font-mono">{radicadoInput}</span> &mdash; Tipo:{' '}
                          <span className="font-bold">Queja</span> &mdash; Fecha:{' '}
                          <span className="font-bold">15 de Mayo, 2026</span>
                        </p>
                      </div>

                      <div className="relative pl-8 space-y-8">
                        {/* Línea vertical */}
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-200" />

                        {TIMELINE_DEMO.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.15 }}
                            className="relative flex items-start gap-4"
                          >
                            {/* Dot */}
                            <div
                              className={cn(
                                'absolute -left-8 top-0.5 w-8 h-8 rounded-full flex items-center justify-center border-2',
                                item.status === 'done'
                                  ? 'bg-emerald-500 border-emerald-500 text-white'
                                  : item.status === 'current'
                                  ? 'bg-orange-500 border-orange-500 text-white animate-pulse'
                                  : 'bg-white border-slate-300 text-slate-300'
                              )}
                            >
                              <item.icon className="w-4 h-4" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 ml-4">
                              <h4
                                className={cn(
                                  'font-bold text-sm md:text-base',
                                  item.status === 'pending' ? 'text-slate-400' : 'text-slate-800'
                                )}
                              >
                                {item.step}
                              </h4>
                              <p
                                className={cn(
                                  'text-xs md:text-sm mt-0.5',
                                  item.status === 'pending' ? 'text-slate-300' : 'text-slate-500'
                                )}
                              >
                                {item.date}
                              </p>
                              {item.status === 'current' && (
                                <span className="inline-block mt-2 text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                                  En progreso
                                </span>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── SECCIÓN REGULATORIA ── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4"
            >
              Respaldados por los Entes Reguladores
            </motion.h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Como empresa de telecomunicaciones regulada, cumplimos con toda la normatividad
              colombiana y velamos por tus derechos como usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CRC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">CRC</h3>
                  <p className="text-sm text-slate-500">Comisión de Regulación de Comunicaciones</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Entidad encargada de promover la competencia, evitar el abuso de posición dominante y
                regular los mercados de las redes y los servicios de comunicaciones en Colombia. Los
                usuarios tienen derecho a presentar sus PQR ante el operador y, si no obtienen
                respuesta satisfactoria, pueden acudir a la CRC.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                <span className="text-slate-500">
                  Plazo de respuesta:{' '}
                  <span className="font-bold text-slate-700">15 días hábiles</span> según la Ley
                </span>
              </div>
            </motion.div>

            {/* SIC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <ScaleIcon className="w-8 h-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">SIC</h3>
                  <p className="text-sm text-slate-500">
                    Superintendencia de Industria y Comercio
                  </p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Autoridad de protección al consumidor en Colombia. Vigila que los operadores de
                telecomunicaciones cumplan con las normas de calidad, facturación transparente y
                atención al usuario. Puedes acudir a la SIC cuando consideres que tus derechos como
                consumidor han sido vulnerados.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                <span className="text-slate-500">
                  Recurso de apelación:{' '}
                  <span className="font-bold text-slate-700">Ante la SIC directamente</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Derechos del usuario */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4">Tus Derechos como Usuario</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Recibir información clara sobre planes, tarifas y condiciones.',
                'Presentar PQR sin costo ante el operador.',
                'Recibir respuesta en un máximo de 15 días hábiles.',
                'Acudir a la CRC si la respuesta no es satisfactoria.',
                'Solicitar la portabilidad de tu número.',
                'Conocer el motivo de cualquier suspensión del servicio.',
              ].map((derecho, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{derecho}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
