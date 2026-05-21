'use client';

import { motion } from 'framer-motion';
import { TvIcon, PlayIcon, FilmIcon, SignalIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'Televisión en HD y 4K',
    description: 'Disfruta de tus canales favoritos con la mayor nitidez y calidad de imagen posible.',
    icon: TvIcon,
    bgLight: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    name: 'Más de 120 Canales',
    description: 'Deportes en vivo, noticias, documentales, canales infantiles y cine premium.',
    icon: SignalIcon,
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    name: 'Apps de Streaming',
    description: 'Conexión perfecta para Netflix, Prime Video, Disney+ y HBO Max sin buffering.',
    icon: PlayIcon,
    bgLight: 'bg-rose-50',
    iconColor: 'text-rose-500',
  },
  {
    name: 'Cine en Casa',
    description: 'Convierte tu sala en un cine con audio inmersivo y transmisión sin interrupciones.',
    icon: FilmIcon,
    bgLight: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

const channelLogos = [
  "HBO", "ESPN", "Fox Sports", "Disney+", "Netflix", 
  "Prime Video", "National Geographic", "Cartoon Network", 
  "TNT", "Discovery", "AMC", "Warner"
];

export function EntertainmentSection() {
  return (
    <section className="relative py-24 bg-white overflow-hidden border-t border-b border-slate-100">
      {/* Background Decor (Light Theme) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-orange-100/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[100px]" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlNTRkMjgiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-bold text-sm mb-6 shadow-sm">
                <TvIcon className="w-4 h-4" />
                Entretenimiento Ilimitado
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl tracking-tight mb-6 leading-tight">
                El mejor contenido para <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">toda tu familia</span>
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                Nuestros planes no solo te dan velocidad, te dan acceso a un mundo de diversión. Combina tu internet con los mejores paquetes de televisión digital.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col group"
                >
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110", feature.bgLight, feature.iconColor)}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual Content (Video Hero) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Video container */}
            <div className="relative w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/15 border border-slate-200 bg-slate-100 z-10 group">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/herofond.jpg"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-white/10 to-transparent" />
              <div className="absolute inset-0 bg-white/8 backdrop-blur-[1px]" />

              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-4">
                <div className="rounded-2xl bg-white/80 backdrop-blur-md border border-white/50 px-4 py-3 shadow-lg max-w-[75%]">
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-1">
                    Entretenimiento para toda la familia
                  </p>
                  <p className="text-sm font-medium text-slate-700 leading-snug">
                    Canales, series y contenido premium en una experiencia visual clara y moderna.
                  </p>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                  className="hidden sm:flex w-14 h-14 rounded-full bg-white shadow-xl items-center justify-center border border-orange-100"
                >
                  <PlayIcon className="w-7 h-7 text-orange-500 ml-0.5" />
                </motion.div>
              </div>
            </div>

            {/* Elementos flotantes alrededor */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 md:right-10 w-32 h-32 bg-gradient-to-br from-orange-300 to-amber-300 rounded-2xl rotate-12 opacity-40 blur-sm -z-10"
            />
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-4 md:left-10 w-40 h-40 bg-gradient-to-tr from-amber-400 to-orange-400 rounded-full opacity-30 blur-md -z-10"
            />
          </motion.div>
          
        </div>

        {/* ── Infinite Channel Carousel ── */}
        <div className="mt-24 pt-12 border-t border-slate-100">
          <div className="text-center mb-8">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Todo tu contenido favorito en un solo lugar
            </p>
          </div>
          
          {/* Contenedor con overflow hidden e fade a los lados */}
          <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            
            {/* Cinta animada */}
            <motion.div
              className="flex whitespace-nowrap gap-8 py-4 items-center"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            >
              {/* Duplicamos el array para que el scroll sea infinito sin cortes */}
              {[...channelLogos, ...channelLogos, ...channelLogos].map((channel, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-center px-8 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-extrabold text-xl tracking-tight grayscale hover:grayscale-0 hover:bg-white hover:shadow-lg hover:text-orange-500 transition-all duration-300 min-w-[200px]"
                >
                  {channel}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
