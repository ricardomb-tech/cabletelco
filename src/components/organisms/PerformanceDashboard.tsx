'use client';

import React from 'react';
import { motion } from 'framer-motion';

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface RatingDotsProps {
  score: number;
}

function RatingDots({ score }: RatingDotsProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((dot) => {
        const isFilled = dot <= score;
        return (
          <span
            key={dot}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isFilled
                ? 'bg-orange-500 shadow-xs shadow-orange-500/50'
                : 'bg-slate-200'
            }`}
          />
        );
      })}
    </div>
  );
}

// ─── Coordenadas SVG (viewBox 0 0 1000 700) ──────────────────────────────────
// Hub/Router = encima del texto, ligeramente a la derecha del centro
const HUB_X = 590;
const HUB_Y = 185;
// Paths curvos desde el hub hacia cada dispositivo
const PATH_LAPTOP = `M ${HUB_X} ${HUB_Y} Q 375 170 155 155`;
const PATH_PHONE  = `M ${HUB_X} ${HUB_Y} Q 705 248 820 310`;
const PATH_TV     = `M ${HUB_X} ${HUB_Y} Q 460 358 330 530`;

// ─── Componente Principal ─────────────────────────────────────────────────────
export function PerformanceDashboard() {
  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-10 overflow-hidden border-t border-b border-orange-500/20 selection:bg-white selection:text-orange-600">

      {/* ── Brillos de fondo ── */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-yellow-300/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.03] blur-[160px] pointer-events-none" />

      {/* ════════════════════════════════════════════════════════════════════════
          CAPA SVG: LÍNEAS DE CONEXIÓN Y PAQUETES ANIMADOS (solo desktop)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-[5] hidden lg:block">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glow para líneas */}
            <filter id="lineGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Glow para paquetes de datos */}
            <filter id="packetGlow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Gradiente radial para el anillo del hub */}
            <radialGradient id="hubGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ── Anillos WiFi del Hub ── */}
          <circle cx={HUB_X} cy={HUB_Y} r={80}  fill="none" stroke="white" strokeWidth="1" opacity="0.07" />
          <circle cx={HUB_X} cy={HUB_Y} r={58}  fill="none" stroke="white" strokeWidth="1" opacity="0.11" />
          <circle cx={HUB_X} cy={HUB_Y} r={38}  fill="none" stroke="white" strokeWidth="1.5" opacity="0.16" />
          <circle cx={HUB_X} cy={HUB_Y} r={20}  fill="url(#hubGrad)" />
          <circle cx={HUB_X} cy={HUB_Y} r={7}   fill="white" opacity="0.22" />

          {/* ── Línea → Laptop ── */}
          <path
            d={PATH_LAPTOP}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="10 7"
            opacity="0.38"
            filter="url(#lineGlow)"
          />
          {/* Indicador de dispositivo en el extremo laptop */}
          <circle cx={155} cy={155} r={6} fill="white" opacity="0.18" />
          <circle cx={155} cy={155} r={10} fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
          {/* Paquete de datos viajando hacia la laptop */}
          <circle r="4.5" fill="white" opacity="0.9" filter="url(#packetGlow)">
            <animateMotion dur="3s" repeatCount="indefinite" path={PATH_LAPTOP} />
          </circle>
          {/* Segundo paquete desfasado */}
          <circle r="3" fill="white" opacity="0.5" filter="url(#packetGlow)">
            <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite" path={PATH_LAPTOP} />
          </circle>

          {/* ── Línea → Celular ── */}
          <path
            d={PATH_PHONE}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="10 7"
            opacity="0.38"
            filter="url(#lineGlow)"
          />
          <circle cx={820} cy={310} r={6}  fill="white" opacity="0.18" />
          <circle cx={820} cy={310} r={10} fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
          <circle r="4.5" fill="white" opacity="0.9" filter="url(#packetGlow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_PHONE} />
          </circle>
          <circle r="3" fill="white" opacity="0.5" filter="url(#packetGlow)">
            <animateMotion dur="2.5s" begin="1.2s" repeatCount="indefinite" path={PATH_PHONE} />
          </circle>

          {/* ── Línea → Televisor ── */}
          <path
            d={PATH_TV}
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="10 7"
            opacity="0.38"
            filter="url(#lineGlow)"
          />
          <circle cx={330} cy={530} r={6}  fill="white" opacity="0.18" />
          <circle cx={330} cy={530} r={10} fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
          <circle r="4.5" fill="white" opacity="0.9" filter="url(#packetGlow)">
            <animateMotion dur="3.5s" repeatCount="indefinite" path={PATH_TV} />
          </circle>
          <circle r="3" fill="white" opacity="0.5" filter="url(#packetGlow)">
            <animateMotion dur="3.5s" begin="1.75s" repeatCount="indefinite" path={PATH_TV} />
          </circle>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          ROUTER / MODEM CENTRAL (semi-transparente, solo desktop)
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="absolute top-[27%] left-[58%] -translate-x-1/2 -translate-y-1/2 z-[6] pointer-events-none hidden lg:flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-col items-center gap-1.5 opacity-50"
        >
          {/* Arcos WiFi */}
          <div className="flex flex-col items-center">
            {[{ w: 36, h: 18, d: 0.6 }, { w: 24, h: 12, d: 0.35 }, { w: 13, h: 6.5, d: 0.1 }].map(({ w, h, d }) => (
              <motion.div
                key={w}
                animate={{ opacity: [0.25, 0.9, 0.25] }}
                transition={{ duration: 2.2, delay: d, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width:  `${w}px`,
                  height: `${h}px`,
                  border: '2.5px solid white',
                  borderBottom: 'none',
                  borderRadius: `${w}px ${w}px 0 0`,
                  marginBottom: '-3px',
                }}
              />
            ))}
            {/* Punto central */}
            <div className="w-2.5 h-2.5 rounded-full bg-white mt-1 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Caja del router */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex flex-col items-center shadow-2xl min-w-[90px]">
            {/* LEDs parpadeantes */}
            <div className="flex gap-1.5 mb-2">
              {[0, 0.45, 0.9].map((delay, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.3, delay, repeat: Infinity }}
                  className="w-1 h-3 rounded-full bg-orange-300"
                />
              ))}
            </div>
            {/* Cuerpo del dispositivo */}
            <div className="w-full h-px bg-white/25 mb-1.5" />
            <div className="w-8 h-1 bg-white/20 rounded-full mb-0.5" />
            <div className="w-6 h-0.5 bg-white/15 rounded-full mb-2" />
            <span className="text-[8px] font-bold text-white/85 tracking-widest uppercase leading-none">Router</span>
            <span className="text-[6px] text-white/55 tracking-wide mt-0.5">Fibra Óptica</span>
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          CONTENIDO PRINCIPAL
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">

        {/* ── PARTE SUPERIOR: LAPTOP (YOUTUBE) ── */}
        <div className="w-full flex justify-center lg:justify-start lg:pl-[5%] mt-12 mb-[-20px] lg:mb-[-45px]">
          <motion.div
            initial={{ opacity: 0, x: -30, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full max-w-[280px] flex flex-col items-center group relative z-10"
          >
            <motion.div
              animate={{ y: [-4, 4] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="w-full flex flex-col items-center"
            >
              {/* Screen */}
              <div className="w-full aspect-[16/10] bg-slate-900 border-[4px] border-slate-800 rounded-t-xl overflow-hidden shadow-2xl relative flex flex-col">
                {/* YouTube Header */}
                <div className="bg-[#0f0f0f] border-b border-[#272727] px-2 py-1 flex items-center justify-between flex-shrink-0 text-white select-none">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-600 flex items-center justify-center text-white text-[7px] font-black">▶</span>
                    <span className="text-[8px] font-black font-sans tracking-tighter">YouTube</span>
                  </div>
                  <div className="bg-[#222222] border border-[#303030] rounded-full px-2 py-0.5 text-[6px] text-slate-400 w-20 text-center">
                    Buscar
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500" />
                </div>

                {/* YouTube Body */}
                <div className="bg-[#0f0f0f] p-1.5 flex-1 flex gap-1.5 overflow-hidden">
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="w-full aspect-video bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-md overflow-hidden relative border border-white/5 flex items-center justify-center group-hover:border-red-500/20 transition-all duration-300">
                      <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-[9px] shadow-lg shadow-red-600/30 cursor-pointer hover:scale-110 transition-transform duration-300">
                        ▶
                      </span>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(249,87,0,0.1)_100%)] animate-pulse" />
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[5px] text-white">
                          <span>■</span>
                          <span>04:12</span>
                        </div>
                        <div className="w-12 bg-white/20 h-0.5 rounded-full overflow-hidden">
                          <div className="bg-red-600 h-full w-[42%]" />
                        </div>
                        <span className="text-[5px] text-white">4K ⚙</span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <h4 className="text-[7px] font-bold text-white leading-tight truncate">CABLETELCO 1000 Mbps | Streaming 4K en Vivo</h4>
                      <p className="text-[6px] text-slate-400 mt-0.5">Cabletelco Oficial • 1.2M vistas</p>
                    </div>
                  </div>

                  <div className="w-14 space-y-1 flex-shrink-0 hidden sm:flex flex-col">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-1 items-start">
                        <div className="w-6 h-4 bg-slate-800 rounded-sm flex-shrink-0" />
                        <div className="flex-1 min-w-0 space-y-0.5">
                          <div className="h-0.5 bg-slate-700 rounded-sm w-full" />
                          <div className="h-0.5 bg-slate-800 rounded-sm w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keyboard base */}
              <div className="w-[104%] h-2 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl relative shadow-md flex justify-center">
                <div className="w-8 h-0.5 bg-slate-900 rounded-b-sm absolute top-0" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── PARTE CENTRAL: TEXTO + CELULAR ── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative mt-0 mb-4">

          {/* Espaciador izquierdo */}
          <div className="hidden lg:block lg:col-span-3 order-3 lg:order-1" />

          {/* Texto centrado */}
          <div className="col-span-1 lg:col-span-6 text-center z-10 px-4 order-1 lg:order-2 flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-tight text-white"
            >
              La velocidad que quieres, la estabilidad que tu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                hogar necesita
              </span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-lg text-orange-50/90 mt-4 max-w-2xl mx-auto font-medium"
            >
              Conecta todos tus dispositivos favoritos a la fibra óptica de Cabletelco. Navega, trabaja y disfruta al mismo tiempo, sin límites ni interrupciones.
            </motion.p>
          </div>

          {/* Celular flotante (derecha) */}
          <div className="col-span-1 lg:col-span-3 flex justify-center lg:justify-end z-20 order-2 lg:order-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[170px] flex-shrink-0"
            >
              <motion.div
                animate={{ y: [4, -4] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="w-full"
              >
                <div className="w-full h-[340px] border-[5px] border-slate-900 rounded-[24px] bg-slate-950 overflow-hidden relative shadow-2xl flex flex-col justify-between">
                  {/* Dynamic Island */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-800 mr-1.5" />
                    <span className="w-2 h-0.5 bg-slate-800 rounded-full" />
                  </div>

                  {/* Instagram */}
                  <div className="bg-white w-full h-full pt-4 p-2 flex flex-col justify-between select-none relative z-20 overflow-y-auto scrollbar-none">
                    <div className="flex justify-between items-center px-1 mb-1 text-slate-800">
                      <span className="text-[8px] font-black italic tracking-tighter text-slate-900">Instagram</span>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="text-[7.5px] cursor-pointer">❤️</span>
                        <span className="text-[7.5px] cursor-pointer">⚡</span>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-1.5">
                      {/* Stories */}
                      <div className="flex gap-1.5 pb-1 border-b border-slate-100 overflow-x-auto scrollbar-none">
                        {[
                          { avatar: '/user_avatar_profile.png', active: true },
                          { avatar: '', active: true },
                          { avatar: '', active: false },
                          { avatar: '', active: false },
                        ].map((story, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-full p-0.5 flex-shrink-0 ${
                              story.active ? 'bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600' : 'bg-slate-200'
                            }`}
                          >
                            <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden border border-white flex items-center justify-center">
                              {story.avatar ? (
                                <img src={story.avatar} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-[5px] text-slate-400 font-bold">U{i}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Post */}
                      <div className="bg-slate-50 rounded-lg border border-slate-200/40 p-1 shadow-xs">
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5">
                            <div className="w-full h-full rounded-full bg-slate-100 overflow-hidden flex items-center justify-center">
                              <img src="/user_avatar_profile.png" alt="" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div>
                            <p className="text-[6px] font-bold text-slate-800 leading-none">@cabletelco_oficial</p>
                            <p className="text-[4.5px] text-slate-400 leading-none">Conectado a Fibra Óptica</p>
                          </div>
                        </div>
                        <div className="aspect-[4/3] bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 rounded-md overflow-hidden relative flex items-center justify-center">
                          <span className="text-white text-[8px] font-black drop-shadow-md tracking-wider">¡ESTABILIDAD TOTAL!</span>
                          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                        </div>
                        <div className="flex gap-1.5 mt-1.5 mb-0.5 px-0.5 text-[6.5px]">
                          <span className="cursor-pointer text-red-500 font-black">❤️</span>
                          <span className="cursor-pointer text-slate-600">💬</span>
                          <span className="cursor-pointer text-slate-600">✈️</span>
                        </div>
                        <p className="text-[5.5px] text-slate-700 leading-tight">
                          <span className="font-bold text-slate-900 mr-1">cabletelco_oficial</span>
                          La fibra que llega hasta tu hogar para que nunca pares de compartir lo mejor. 🚀📶
                        </p>
                      </div>
                    </div>

                    <div className="w-10 h-0.5 bg-slate-300 rounded-full mx-auto mt-1" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── PARTE INFERIOR: TELEVISOR (OSMAS TV) ── */}
        <div className="w-full flex justify-center lg:justify-start lg:pl-[24%] mt-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-[300px] flex flex-col items-center group relative z-10"
          >
            <motion.div
              animate={{ y: [-4, 4] }}
              transition={{ duration: 4.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full aspect-[16/9] bg-black border-[4px] border-slate-900 rounded-lg overflow-hidden shadow-2xl relative flex flex-col justify-end p-1.5 group-hover:border-slate-800 transition-all duration-300">
                {/* Watermark */}
                <div className="absolute top-1.5 left-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-sm px-1 py-0.5 text-[5.5px] font-black tracking-wide text-white uppercase select-none z-20">
                  Osmas TV | Deportes HD
                </div>
                {/* Live badge */}
                <div className="absolute top-1.5 right-1.5 bg-red-600 px-1 py-0.5 rounded-sm text-[5px] font-black tracking-widest text-white uppercase flex items-center gap-1 select-none z-20 shadow-lg shadow-red-600/30">
                  <span className="w-1 h-1 rounded-full bg-white animate-ping" />
                  EN VIVO
                </div>
                {/* Soccer field */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#40916c] overflow-hidden flex flex-col justify-center items-center">
                  <div className="absolute inset-y-0 left-1/2 w-px border-l border-white/20" />
                  <div className="absolute w-14 h-14 border border-white/20 rounded-full" />
                  <motion.div
                    animate={{ x: [-40, 40, -20, 30, -40], y: [-15, 8, -20, 15, -15], scale: [1, 1.2, 1, 1.3, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff] border border-slate-300 z-10"
                  />
                  <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-red-500" />
                  <div className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full bg-white" />
                </div>
                {/* HUD */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-md p-1 flex items-center justify-between text-white w-full z-10 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[7px] cursor-pointer">⏸</span>
                    <div className="flex flex-col">
                      <span className="text-[6px] font-bold">Fútbol Profesional</span>
                      <span className="text-[4.5px] text-slate-400">1080p Smooth</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 bg-white/20 h-0.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-[80%]" />
                    </div>
                    <span className="text-[5px]">01:42</span>
                    <span className="text-[5.5px]">🔊</span>
                  </div>
                </div>
              </div>
              {/* TV Stand */}
              <div className="w-10 h-2 bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-sm shadow-md" />
              <div className="w-14 h-1 bg-slate-900 rounded-full" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
