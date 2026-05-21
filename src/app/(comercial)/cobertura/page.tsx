'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, MagnifyingGlassIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function CoberturaPage() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    setResult('idle');
    
    // Simular búsqueda de cobertura
    setTimeout(() => {
      setIsSearching(false);
      // Para simular, si escriben algo corto falla, si escriben más largo tiene éxito
      if (searchValue.length > 5) {
        setResult('success');
      } else {
        setResult('error');
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ── HERO DE COBERTURA ── */}
      <section className="relative w-full min-h-screen py-20 md:py-28 border-b border-slate-100 overflow-hidden text-center flex flex-col items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Puente_Segundo_Centenario.jpg"
            alt="Montería sobre el río Sinú"
            className="h-full w-full object-cover object-center opacity-45"
          />
          <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />
        </div>

        {/* Decoración de fondo */}
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-orange-100 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-35" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-16 md:pt-20">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-orange-100 border border-orange-200 text-orange-600 font-bold tracking-widest text-sm uppercase mb-6 shadow-sm"
          >
            Internet, TV y Fibra Óptica
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Internet y televisión de clase mundial en <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Montería</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed"
          >
            Consulta nuestro mapa interactivo y descubre si tu hogar o empresa ya cuenta con internet, televisión y todo nuestro portafolio de servicios.
          </motion.p>
        </div>
      </section>

      {/* ── ZONA INTERACTIVA (Buscador y Mapa) ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="flex flex-col lg:flex-row w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* ── LADO IZQUIERDO: BUSCADOR E INFORMACIÓN ── */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-12 z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-xs uppercase tracking-widest mb-6">
            <MapPinIcon className="w-4 h-4" />
            Cobertura de Internet y TV
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Valida tu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">cobertura exacta</span>
          </h2>
          
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Ingresa el nombre de tu barrio o dirección. Nuestro sistema verificará de inmediato si puedes disfrutar de internet, televisión y nuestros servicios para el hogar.
          </p>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative flex items-center mb-4">
              <MapPinIcon className="absolute left-5 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Ej: Barrio La Castellana, Calle 50..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 pl-14 pr-4 py-4 rounded-2xl text-lg focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all duration-300",
                isSearching 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              {isSearching ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Validar Internet y TV
                </>
              )}
            </button>
          </form>

          {/* Resultados Simulados */}
          {result === 'success' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-4">
              <CheckCircleIcon className="w-8 h-8 text-emerald-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-900 mb-1">¡Excelentes noticias!</h4>
                <p className="text-emerald-700 text-sm">Tu zona cuenta con cobertura de internet, televisión y servicios Cabletelco. Estás listo para contratar.</p>
                <a href="/planes" className="inline-block mt-3 text-sm font-bold text-emerald-600 hover:text-emerald-800 underline">Ver planes disponibles &rarr;</a>
              </div>
            </motion.div>
          )}

          {result === 'error' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-4">
              <MapPinIcon className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Estamos cerca de ti</h4>
                <p className="text-amber-700 text-sm">Parece que aún no cubrimos esa zona exacta para internet o televisión, o necesitamos validar la dirección. Déjanos tus datos y lo revisamos.</p>
                <a href="/contacto" className="inline-block mt-3 text-sm font-bold text-amber-600 hover:text-amber-800 underline">Contactar a un asesor &rarr;</a>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>

      {/* ── LADO DERECHO: MAPA VISUAL ── */}
      <div className="w-full lg:w-1/2 min-h-[400px] relative bg-slate-100 border-t lg:border-t-0 lg:border-l border-slate-200">
        
        {/* Imagen base del mapa (Mapa real de Montería) */}
        <div className="absolute inset-0 pointer-events-none">
          <iframe 
            src="https://www.openstreetmap.org/export/embed.html?bbox=-75.9600%2C8.6800%2C-75.8000%2C8.8200&layer=mapnik" 
            className="w-full h-full object-cover opacity-60 grayscale contrast-125"
            style={{ border: 0 }}
            title="Mapa de Montería"
          />
        </div>

        {/* Capa de cobertura naranja (SVG Polygon para simular el área iluminada) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-70">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-orange-500 fill-current mix-blend-multiply">
              {/* Polígono irregular simulando una mancha de cobertura en la ciudad */}
              <path d="M 20,30 C 40,10 70,20 80,40 C 90,60 70,90 50,85 C 30,80 10,70 15,50 Z" />
           </svg>
        </div>

        {/* Borde sutil del área de cobertura */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-80">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-[101%] h-[101%] text-orange-500 fill-transparent stroke-current" strokeWidth="0.5" strokeDasharray="2, 1">
              <path d="M 20,30 C 40,10 70,20 80,40 C 90,60 70,90 50,85 C 30,80 10,70 15,50 Z" />
           </svg>
        </div>

        {/* Pines pulsantes en áreas específicas */}
        <div className="absolute inset-0 z-30">
          <div className="absolute top-[35%] left-[30%]">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-orange-600 border-2 border-white shadow-lg"></span>
            </span>
          </div>
          <div className="absolute top-[60%] left-[55%]">
            <span className="relative flex h-8 w-8">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-600 border-2 border-white shadow-lg flex items-center justify-center">
                <MapPinIcon className="w-4 h-4 text-white" />
              </span>
            </span>
          </div>
          <div className="absolute top-[45%] left-[75%]">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-600 border-2 border-white shadow-lg"></span>
            </span>
          </div>
        </div>

        {/* Leyenda flotante del mapa */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 right-8 z-40 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-orange-500/80 border border-orange-500"></div>
            <span className="text-sm font-bold text-slate-700">Zona de cobertura activa para internet y TV</span>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-6 h-6 rounded-md bg-slate-200 border border-slate-300"></div>
            <span className="text-sm font-medium text-slate-500">Próximas ampliaciones de red y televisión</span>
          </div>
        </motion.div>

        </div>
      </div>
    </div>
    </div>
  );
}
