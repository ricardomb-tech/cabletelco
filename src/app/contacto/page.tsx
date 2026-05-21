'use client';

import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function Contacto() {
  const contactMethods = [
    {
      title: 'Ventas por WhatsApp',
      description: 'Escríbenos y contrata tu plan en minutos.',
      info: '+57 300 000 0000',
      icon: ChatBubbleLeftRightIcon,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Línea de Atención',
      description: 'Soporte técnico y servicio al cliente.',
      info: '01 8000 123 456',
      icon: PhoneIcon,
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      title: 'Correo Electrónico',
      description: 'Consultas corporativas y PQR.',
      info: 'contacto@cabletelco.com.co',
      icon: EnvelopeIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Oficina Principal',
      description: 'Atención presencial.',
      info: 'Calle Principal #123, Tu Ciudad',
      icon: MapPinIcon,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Estamos aquí para <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">conectarte</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-medium"
          >
            ¿Tienes alguna duda, necesitas soporte técnico o quieres contratar nuestros servicios? Contáctanos a través de cualquiera de nuestros canales.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Methods Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => (
              <motion.div 
                key={method.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex items-start gap-4"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", method.bg)}>
                  <method.icon className={cn("w-6 h-6", method.color)} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{method.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{method.description}</p>
                  <p className={cn("font-bold", method.color)}>{method.info}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-orange-500/5 relative overflow-hidden"
          >
            {/* Background Decor in Form */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[80px] -z-10 -translate-y-1/2 translate-x-1/4" />

            <h2 className="text-2xl font-bold text-slate-900 mb-8">Envíanos un mensaje</h2>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Teléfono / Celular</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400"
                    placeholder="300 000 0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Asunto</label>
                <select 
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900"
                >
                  <option>Contratar un plan</option>
                  <option>Soporte Técnico</option>
                  <option>Facturación y Pagos</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-slate-900 placeholder-slate-400 resize-none"
                  placeholder="¿En qué te podemos ayudar?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Enviar Mensaje
                <EnvelopeIcon className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
