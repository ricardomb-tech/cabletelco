'use client';

import { motion } from 'framer-motion';
import { 
  BoltIcon, 
  WrenchScrewdriverIcon, 
  ChatBubbleBottomCenterTextIcon, 
  WifiIcon 
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const features = [
  {
    name: 'Internet de Fibra Óptica Simétrica',
    description: 'La misma velocidad de subida y bajada para navegar, jugar y trabajar sin interrupciones, con una base ideal para tu TV en casa.',
    icon: BoltIcon,
    color: 'from-orange-500 to-amber-500',
    bgLight: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    name: 'Instalación de Internet y TV',
    description: 'Sabemos que tu tiempo es valioso. Nuestros técnicos dejan listos tu internet y tu televisión en tiempo récord.',
    icon: WrenchScrewdriverIcon,
    color: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    name: 'Soporte Técnico Local 24/7',
    description: 'Atención personalizada por expertos locales para resolver fallas de internet, televisión o equipos cuando nos necesites.',
    icon: ChatBubbleBottomCenterTextIcon,
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    name: 'TV HD y WiFi en Casa',
    description: 'Equipos de última generación para garantizar la mejor cobertura WiFi y una experiencia de televisión clara y estable en todo tu hogar.',
    icon: WifiIcon,
    color: 'from-purple-500 to-pink-500',
    bgLight: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-orange-50/50 blur-[100px]" />
        <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight"
          >
            ¿Por qué elegir <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Cabletelco</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-slate-600 leading-relaxed"
          >
            No somos solo un proveedor de internet. También llevamos televisión digital a tu hogar con una experiencia clara, estable y pensada para toda la familia.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110", feature.bgLight)}>
                <feature.icon className={cn("w-7 h-7", feature.iconColor)} aria-hidden="true" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                {feature.name}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover bottom line indicator */}
              <div className={cn("absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl", feature.color)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
