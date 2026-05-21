'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export function CoverageChecker() {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    // Simular una búsqueda de cobertura
    setTimeout(() => {
      setIsSearching(false);
      alert(`Buscando cobertura para: ${searchValue}... ¡Pronto nos contactaremos!`);
    }, 1500);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden border-t border-b border-slate-100">
      {/* Abstract Map Background (Light Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {/* Patrón SVG suave para simular mapa */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgODAwIDgwMCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWE1NjMzIiBzdHJva2Utb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik03NjkgMjI5bDk0IDQ3TTE3OSA0NjFsMTc3IDgxTTU3MSAzMjJsMjIzIDc0Ii8+PHBhdGggZD0iTTM1NyAyNzJsMTkxIDc4bDEzMCAyMTJNMzgxIDUyNmw1NiAxMjhMMTU5IDYxNyIgLz48cGF0aCBkPSJNMjQ1IDEyOGwxMTMgMTc2TDE1MCA0MjEiIC8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-50" />
        
        {/* Pulsing coverage zones claras */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 5, delay: 1 }}
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-100 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-sm mb-6 shadow-sm">
            <MapPinIcon className="w-4 h-4" />
            Verifica tu zona
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            ¿Llegamos a tu barrio? <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Consulta tu cobertura aquí</span>
          </h2>
          
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto font-medium">
            Ingresa tu dirección, barrio o municipio para saber si ya contamos con nuestra red de fibra óptica ultrarrápida en tu hogar.
          </p>

          {/* Search Input Box (Light Theme) */}
          <form 
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-3xl sm:rounded-full border border-slate-200 shadow-xl shadow-orange-500/5"
          >
            <div className="relative flex-grow flex items-center">
              <MapPinIcon className="absolute left-5 w-6 h-6 text-slate-400" />
              <input
                type="text"
                placeholder="Ej: Barrio El Centro, Calle 45..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-transparent border-none text-slate-900 placeholder-slate-400 pl-14 pr-4 py-4 text-lg focus:outline-none focus:ring-0"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSearching}
              className={cn(
                "flex items-center justify-center gap-2 px-8 py-4 rounded-2xl sm:rounded-full font-bold text-white transition-all duration-300",
                isSearching 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95"
              )}
            >
              {isSearching ? (
                <span className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Consultar
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
