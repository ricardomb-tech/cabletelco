'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon, RocketLaunchIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function QuienesSomos() {
  const values = [
    {
      title: 'Velocidad',
      description: 'Nuestra red de fibra óptica garantiza una conexión simétrica y sin interrupciones.',
      icon: RocketLaunchIcon,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      title: 'Confiabilidad',
      description: 'Infraestructura robusta con un uptime del 99.9% para que nunca te desconectes.',
      icon: ShieldCheckIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Servicio Humano',
      description: 'Soporte técnico local, rápido y empático porque entendemos tus necesidades.',
      icon: UserGroupIcon,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Innovación',
      description: 'Tecnología de punta y constante actualización para llevarte al futuro.',
      icon: GlobeAltIcon,
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* ── FULL SCREEN HERO (LIGHT MODE) ── */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        {/* Background Image that covers the entire screen */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" 
            alt="Oficina moderna Cabletelco"
            className="w-full h-full object-cover object-center opacity-80"
          />
          {/* Light Gradient Overlay to make dark text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent" />
        </div>

        {/* Content over the image */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold tracking-widest text-sm uppercase mb-6 shadow-sm">
              Nuestra Historia
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Conectando tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">mundo</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed mb-16">
              Somos OsmasTV SAS, una empresa dedicada al servicio de telecomunicaciones a través de redes HFC y GPON, comprometida con ofrecer la mejor conexión y servicio en la región.
            </p>

            {/* Bouncing scroll indicator (ahora debajo del texto) */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-slate-500 flex flex-col items-center"
            >
              <span className="text-sm font-bold tracking-widest uppercase mb-2">Descubre Más</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── MISION Y VISION SECTION ── */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Misión */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full blur-[60px] -z-0 -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 relative z-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </span>
                Misión
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg relative z-10 text-justify">
                Somos un grupo de empresarios líderes con profundo conocimiento del mercado de la televisión, las telecomunicaciones y el entretenimiento en Colombia. Nos dedicamos a proporcionar servicios de alta calidad, centrándonos en la personalización y la atención al usuario. Nos respaldamos en un talento humano excepcional y en tecnología de vanguardia para ofrecer soluciones innovadoras y confiables. Nuestra cultura organizacional está arraigada en principios éticos sólidos que garantizan nuestro crecimiento constante como una compañía sólida y rentable. Nos comprometemos a ser sostenibles a largo plazo, cumpliendo con nuestra responsabilidad social tanto ante el Estado como ante la sociedad colombiana. A través de nuestro compromiso con la excelencia, buscamos no solo satisfacer las necesidades de nuestros clientes, sino también contribuir positivamente al desarrollo y el bienestar de nuestra comunidad.
              </p>
            </motion.div>

            {/* Visión */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-100 rounded-full blur-[60px] -z-0 -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 relative z-10 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </span>
                Visión
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg relative z-10 text-justify">
                Nuestra visión es convertirnos en la principal empresa de telecomunicaciones de Colombia, destacándonos por ofrecer servicios de alta calidad tanto en internet como en televisión. Nos enfocamos en atender a diversos segmentos, desde la clase media alta hasta los estratos más sensibles de la sociedad, con el objetivo de proporcionar entretenimiento familiar, apoyo a la educación formal y aprovechamiento del tiempo libre mediante tecnología de vanguardia. Nos comprometemos a ofrecer una óptima calidad a un precio justo, respaldados por nuestro talento humano y un constante mejoramiento del servicio personalizado para nuestros usuarios. Buscamos generar reconocimiento en la sociedad, satisfacer a nuestros colaboradores y brindar valor a nuestros accionistas.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VALUES GRID ── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Nuestros Pilares</h2>
            <p className="text-lg text-slate-600">
              Los valores que sostienen nuestra red y dirigen el trabajo de todo nuestro equipo técnico y administrativo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", val.bg, val.color)}>
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HISTORIA Y GALERÍA SECTION ── */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6"
            >
              Nuestra Historia en <span className="text-orange-500">Imágenes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              Desde nuestros primeros tendidos de cable hasta la implementación de tecnología GPON de última generación, siempre hemos trabajado con la pasión de conectar a las personas.
            </motion.p>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Image 1 (Large) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative aspect-video md:aspect-auto"
            >
              <img 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop" 
                alt="Infraestructura de Red"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                <div>
                  <p className="text-orange-400 font-bold mb-1">Tecnología GPON</p>
                  <p className="text-white text-lg font-medium">Despliegue de red de fibra óptica</p>
                </div>
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative aspect-square"
            >
              <img 
                src="https://images.pexels.com/photos/15483315/pexels-photo-15483315.jpeg?cs=srgb&dl=pexels-esmihel-15483315.jpg&fm=jpg" 
                alt="Técnico de telecomunicaciones ajustando equipos en una azotea"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-orange-400 font-bold mb-1">Nuestro Equipo</p>
                  <p className="text-white font-medium">Soporte y Mantenimiento</p>
                </div>
              </div>
            </motion.div>

            {/* Image 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group relative aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
                alt="Seguridad y Servidores"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-orange-400 font-bold mb-1">Data Center</p>
                  <p className="text-white font-medium">Infraestructura 99.9% Uptime</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}
