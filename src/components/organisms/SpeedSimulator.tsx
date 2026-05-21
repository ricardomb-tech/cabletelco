'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpeedConfig {
  value: number;
  label: string;
  desc: string;
  color: string;
  glowColor: string;
  textColor: string;
  traditionalUploadTime: string;
  osmasUploadTime: string;
  download100GB: string;
  streamingScreens: string;
  gamingPing: string;
  smartHomeDevices: string;
  osmasUploadPercent: number;
  traditionalUploadPercent: number;
}

const SPEED_DATA: Record<number, SpeedConfig> = {
  300: {
    value: 300,
    label: '300 Mbps',
    desc: 'Plan Básico - Ideal para streaming y teletrabajo',
    color: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(6, 182, 212, 0.05)',
    textColor: 'text-cyan-600',
    traditionalUploadTime: '45 minutos (a 15 Mbps)',
    osmasUploadTime: '2 min 15 seg',
    download100GB: '45 minutos',
    streamingScreens: 'Hasta 12 pantallas 4K',
    gamingPing: '15 - 20 ms (Estable)',
    smartHomeDevices: 'Hasta 25 dispositivos',
    osmasUploadPercent: 8, // fast progress bar representation
    traditionalUploadPercent: 96,
  },
  500: {
    value: 500,
    label: '500 Mbps',
    desc: 'Plan Familiar - Conectividad total sin límites',
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(168, 85, 247, 0.05)',
    textColor: 'text-purple-650',
    traditionalUploadTime: '45 minutos (a 15 Mbps)',
    osmasUploadTime: '1 min 20 seg',
    download100GB: '27 minutos',
    streamingScreens: 'Hasta 20 pantallas 4K',
    gamingPing: '8 - 12 ms (Optimizado)',
    smartHomeDevices: 'Hasta 45 dispositivos',
    osmasUploadPercent: 4.5,
    traditionalUploadPercent: 96,
  },
  1000: {
    value: 1000,
    label: '1000 Mbps',
    desc: 'Plan Gamer - Rendimiento extremo para pro-users',
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.06)',
    textColor: 'text-orange-600',
    traditionalUploadTime: '45 minutos (a 15 Mbps)',
    osmasUploadTime: '40 segundos',
    download100GB: '13 minutos',
    streamingScreens: 'Pantallas ilimitadas / 8K',
    gamingPing: '< 2 ms (Latencia Cero)',
    smartHomeDevices: '100+ dispositivos',
    osmasUploadPercent: 2,
    traditionalUploadPercent: 96,
  },
};

export function SpeedSimulator() {
  const [selectedSpeed, setSelectedSpeed] = useState<number>(500);
  const [activeTab, setActiveTab] = useState<'simetria' | 'experiencia'>('simetria');
  const [uploadTrigger, setUploadTrigger] = useState(0);

  const currentData = SPEED_DATA[selectedSpeed];

  // Auto trigger upload simulation on speed change
  useEffect(() => {
    setUploadTrigger(prev => prev + 1);
  }, [selectedSpeed, activeTab]);

  return (
    <section className="relative py-24 overflow-hidden bg-[#F8FAFC] border-t border-b border-slate-200/60 selection:bg-orange-500 selection:text-white">
      {/* Abstract Glowing Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 60%), 
                              linear-gradient(rgba(15, 23, 42, 0.02) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(15, 23, 42, 0.02) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
          }}
        />
        {/* Glow behind the active content */}
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: currentData.glowColor }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 animate-pulse">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.845.813a.75.75 0 0 1 0 1.442l-2.845.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.845-.813a.75.75 0 0 1 0-1.442l2.845-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258a2.75 2.75 0 0 0-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.75 2.75 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.75 2.75 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.424l-1.183.394a1.75 1.75 0 0 0-.948.948l-.395 1.183a.75.75 0 0 1-1.424 0l-.394-1.183a1.75 1.75 0 0 0-.948-.948l-1.183-.394a.75.75 0 0 1 0-1.424l1.183-.395a1.75 1.75 0 0 0 .948-.948l.394-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
            </svg>
            Experiencia Innovadora
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Siente la Velocidad <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">100% Simétrica</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg sm:text-xl font-medium"
          >
            Compara cómo la fibra simétrica transforma tu día a día frente al internet tradicional. Elige una velocidad y compruébalo.
          </motion.p>
        </div>

        {/* Interactive Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-slate-800">
          {/* Left Controls & Simulator Panels - 7 Cols */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* Speed Selector Tabs */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 shadow-lg shadow-slate-200/30">
              <h3 className="text-slate-700 text-sm font-extrabold uppercase tracking-wider mb-4">
                1. Selecciona una velocidad:
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[300, 500, 1000].map((speed) => {
                  const isSelected = selectedSpeed === speed;
                  const data = SPEED_DATA[speed];
                  return (
                    <button
                      key={speed}
                      onClick={() => setSelectedSpeed(speed)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                        isSelected 
                          ? `border-orange-500/50 bg-gradient-to-b from-slate-50 to-slate-100/50 shadow-md shadow-orange-550/5` 
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/50'
                      }`}
                    >
                      {isSelected && (
                        <motion.div 
                          layoutId="activeGlowBorder"
                          className="absolute inset-0 rounded-2xl border border-orange-500 pointer-events-none"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`text-2xl sm:text-3xl font-black ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                        {speed === 1000 ? '1' : speed}
                        <span className="text-xs font-bold uppercase ml-0.5">
                          {speed === 1000 ? 'Gbps' : 'Megas'}
                        </span>
                      </span>
                      <span className={`text-[10px] font-bold tracking-wide uppercase mt-1.5 ${isSelected ? data.textColor : 'text-slate-500'}`}>
                        {speed === 300 ? 'Básico' : speed === 500 ? 'Familiar' : 'Pro Gamer'}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-slate-500 text-xs mt-3 text-center italic font-medium">
                {currentData.desc}
              </p>
            </div>

            {/* Simulated Tool Panel */}
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-6 flex-1 flex flex-col justify-between shadow-lg shadow-slate-200/30">
              <div>
                {/* Tabs to switch simulation mode */}
                <div className="flex border-b border-slate-200 mb-6 pb-1 gap-4">
                  <button 
                    onClick={() => setActiveTab('simetria')}
                    className={`relative pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'simetria' ? 'text-slate-900' : 'text-slate-450 hover:text-slate-700'
                    }`}
                  >
                    {activeTab === 'simetria' && (
                      <motion.div 
                        layoutId="activeUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" 
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    ⚡ Test de Simetría (Upload)
                  </button>
                  <button 
                    onClick={() => setActiveTab('experiencia')}
                    className={`relative pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                      activeTab === 'experiencia' ? 'text-slate-900' : 'text-slate-450 hover:text-slate-700'
                    }`}
                  >
                    {activeTab === 'experiencia' && (
                      <motion.div 
                        layoutId="activeUnderline" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" 
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    🎮 Actividad Digital
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {activeTab === 'simetria' ? (
                    <motion.div
                      key={`simetria-${uploadTrigger}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-slate-800 text-base font-extrabold mb-1">
                          Simulación: Subir Video 4K (5 Gigabytes)
                        </h4>
                        <p className="text-slate-500 text-xs font-medium">
                          La simetría significa velocidad igual de descarga y de subida. Observa la diferencia crítica al subir archivos, enviar directos o guardar copias de seguridad.
                        </p>
                      </div>

                      {/* OsmasTV Fiber Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-emerald-600 font-extrabold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            OsmasTV Fibra Simétrica ({selectedSpeed} Mbps)
                          </span>
                          <span className="text-slate-900 font-black">{currentData.osmasUploadTime}</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 relative">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ 
                              duration: currentData.osmasUploadPercent,
                              ease: 'easeOut'
                            }}
                            className={`h-full bg-gradient-to-r ${currentData.color} shadow-md shadow-emerald-555/10`}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium text-right">
                          Envío ultrarrápido sin colapsar el internet del hogar.
                        </p>
                      </div>

                      {/* Traditional Internet Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-rose-500 font-bold">
                            Internet Tradicional Asimétrico (15 Mbps de subida)
                          </span>
                          <span className="text-slate-500 font-bold">{currentData.traditionalUploadTime}</span>
                        </div>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 relative">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '6%' }}
                            transition={{ 
                              duration: currentData.osmasUploadPercent,
                              ease: 'linear'
                            }}
                            className="h-full bg-rose-500/80"
                          />
                        </div>
                        <p className="text-[10px] text-rose-500/80 font-semibold italic">
                          * Ralentiza toda la red, causa cortes y bloquea llamadas en progreso.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`experiencia-${selectedSpeed}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {/* Metric Cards */}
                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/65 hover:border-slate-300 transition-colors">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                          Descarga Juego (100GB)
                        </span>
                        <span className="text-slate-800 text-lg font-black block">
                          {currentData.download100GB}
                        </span>
                        <span className="text-slate-455 text-[10px] font-medium">
                          Tiempo estimado de espera
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/65 hover:border-slate-300 transition-colors">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                          Streaming Simultáneo
                        </span>
                        <span className="text-slate-800 text-lg font-black block">
                          {currentData.streamingScreens}
                        </span>
                        <span className="text-slate-450 text-[10px] font-medium">
                          Viendo contenido 4K/8K
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/65 hover:border-slate-300 transition-colors">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                          Ping Online (Juegos)
                        </span>
                        <span className="text-slate-800 text-lg font-black block">
                          {currentData.gamingPing}
                        </span>
                        <span className="text-slate-455 text-[10px] font-medium">
                          Ideal para eSports y shooters
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/65 hover:border-slate-300 transition-colors">
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-1">
                          Capacidad Smart Home
                        </span>
                        <span className="text-slate-800 text-lg font-black block">
                          {currentData.smartHomeDevices}
                        </span>
                        <span className="text-slate-450 text-[10px] font-medium">
                          Dispositivos al mismo tiempo
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-all font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer">
                  Quiero {selectedSpeed === 1000 ? '1 Gbps' : `${selectedSpeed} Megas`}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Speedometer Gauge Panel - 5 Cols */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-3xl p-8 text-center relative overflow-hidden shadow-lg shadow-slate-200/30">
            <h3 className="text-slate-700 text-sm font-extrabold uppercase tracking-wider absolute top-6 left-8">
              2. Velocímetro Digital
            </h3>

            {/* Gauge Graphic */}
            <div className="relative w-64 h-64 flex items-center justify-center mt-6">
              {/* Outer gauge border */}
              <svg className="w-full h-full transform -rotate-225" viewBox="0 0 200 200">
                {/* Background track */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="8"
                  strokeDasharray="400 133"
                  strokeLinecap="round"
                />
                {/* Animated active fill */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke={`url(#gauge-grad-${selectedSpeed})`}
                  strokeWidth="10"
                  strokeDasharray="400 133"
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 400 }}
                  animate={{ 
                    strokeDashoffset: 400 - (400 * (selectedSpeed === 300 ? 0.3 : selectedSpeed === 500 ? 0.55 : 0.95))
                  }}
                  transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                />

                <defs>
                  <linearGradient id="gauge-grad-300" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="gauge-grad-500" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="gauge-grad-1000" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Digital Readout */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                  key={selectedSpeed}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl font-black tracking-tight text-slate-900">
                    {selectedSpeed === 1000 ? '1.0' : selectedSpeed}
                  </span>
                  <span className="text-slate-500 text-xs font-extrabold uppercase tracking-widest mt-1">
                    {selectedSpeed === 1000 ? 'Gigabit / s' : 'Megas / s'}
                  </span>
                  <span className="inline-block mt-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 border border-orange-500/10">
                    Fibra Simétrica
                  </span>
                </motion.div>
              </div>

              {/* Speed Needle Indicator */}
              <motion.div 
                className="absolute w-1 h-28 bg-gradient-to-t from-transparent via-orange-500 to-slate-800 origin-bottom rounded-full"
                style={{ bottom: '50%' }}
                animate={{ 
                  rotate: selectedSpeed === 300 ? -80 : selectedSpeed === 500 ? 10 : 100
                }}
                transition={{ type: 'spring', stiffness: 50, damping: 12 }}
              />
            </div>

            {/* Bottom mini-summary */}
            <div className="mt-6 max-w-xs">
              <span className="text-slate-500 text-xs leading-relaxed font-semibold">
                Conectividad simétrica: misma velocidad de bajada que de subida, garantizando una estabilidad inigualable.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
