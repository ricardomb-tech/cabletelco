'use client';

import { motion } from 'framer-motion';
import { PricingCard } from '@/components/molecules/PricingCard';
import { CheckCircleIcon, DocumentTextIcon, MapPinIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function PlanesPage() {
  const requisitos = [
    {
      title: 'Documento de Identidad',
      description: 'Fotocopia de la cédula de ciudadanía o extranjería ampliada al 150%.',
      icon: IdentificationIcon,
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
    {
      title: 'Recibo Público',
      description: 'Copia del último recibo de luz o agua (no mayor a 60 días) para validar la dirección.',
      icon: DocumentTextIcon,
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      title: 'Formulario de Afiliación',
      description: 'Completar y firmar el contrato de prestación de servicios y política de datos.',
      icon: CheckCircleIcon,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-20">
      
      {/* ── HEADER PLANES ── */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold tracking-widest text-sm uppercase mb-6 shadow-sm"
        >
          Nuestros Servicios
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
        >
          Elige el plan de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">internet y TV</span> que necesitas
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 font-medium"
        >
          Todos nuestros planes incluyen internet de fibra óptica simétrica, televisión digital, instalación profesional y router Wi-Fi de alta potencia.
        </motion.p>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <PricingCard 
              id="plan-basico"
              name="Básico Hogar" 
              speed="300 Mbps" 
              price={65000}
              currency="$"
              features={[
                { name: 'Fibra óptica simétrica', included: true },
                { name: 'Router Wi-Fi Dual Band', included: true },
                { name: 'Soporte técnico local', included: true },
                { name: 'Ideal para 3-5 dispositivos', included: true },
                { name: 'TV Digital', included: false }
              ]}
              isPopular={false}
              onSelectPlan={(id) => console.log('Seleccionado:', id)}
            />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <PricingCard 
              id="plan-avanzado"
              name="Avanzado Familiar" 
              speed="600 Mbps" 
              price={85000}
              currency="$"
              features={[
                { name: 'Fibra óptica simétrica', included: true },
                { name: 'Router Wi-Fi 6 Avanzado', included: true },
                { name: 'Soporte técnico local', included: true },
                { name: 'Streaming sin interrupciones', included: true },
                  { name: 'TV Digital', included: true }
              ]}
              isPopular={true}
              onSelectPlan={(id) => console.log('Seleccionado:', id)}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <PricingCard 
              id="plan-gamer"
              name="Pro Gamer" 
              speed="900 Mbps" 
              price={110000}
              currency="$"
              features={[
                { name: 'Fibra óptica simétrica', included: true },
                { name: 'Ping ultra bajo para juegos', included: true },
                { name: 'Soporte 24/7', included: true },
                { name: 'Router Mesh Incluido', included: true },
                  { name: 'TV HD + Canales Premium', included: true }
              ]}
              isPopular={false}
              onSelectPlan={(id) => console.log('Seleccionado:', id)}
            />
          </motion.div>
        </div>
      </section>

      {/* ── CONECTIVIDAD EN MONTERÍA ── */}
      <section className="bg-white py-24 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Usamos una imagen que sugiera una ciudad o conectividad local */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Puente_Segundo_Centenario.jpg" 
                alt="Montería y conectividad local"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/15 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
                  <MapPinIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white shadow-sm">Montería, Córdoba</h3>
                  <p className="text-slate-200 font-medium text-sm">Cobertura local al 100%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Líderes en internet y TV <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">en Montería</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Como empresa local, entendemos las necesidades de nuestra ciudad. Hemos desplegado una red de infraestructura de fibra óptica GPON que cubre la gran mayoría de barrios y zonas residenciales de Montería, garantizando internet y televisión de clase mundial.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Al elegir a Cabletelco, no solo obtienes internet rápido y televisión digital; apoyas a una empresa de la región, que invierte en el desarrollo tecnológico de Córdoba y te brinda soporte técnico directamente en tu ciudad, sin largas esperas telefónicas.
              </p>
              
              <div className="flex gap-8 border-t border-slate-100 pt-8">
                <div>
                  <p className="text-4xl font-extrabold text-orange-500 mb-1">+50</p>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Barrios con Cobertura</p>
                </div>
                <div>
                  <p className="text-4xl font-extrabold text-orange-500 mb-1">99%</p>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Estabilidad de Internet y TV</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── REQUISITOS DE INSCRIPCIÓN ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
            >
              Requisitos de Inscripción
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600"
            >
              Contratar tu plan es muy sencillo y rápido. Asegúrate de tener listos estos documentos para agendar tu instalación en tiempo récord.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requisitos.map((req, idx) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decoration */}
                <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[40px] opacity-20 transition-opacity duration-300 group-hover:opacity-40", req.bg)} />
                
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10", req.bg, req.color)}>
                  <req.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{req.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">{req.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
              Solicitar Instalación
            </button>
            <p className="mt-4 text-sm text-slate-500">¿Tienes dudas? <a href="/contacto" className="text-orange-500 hover:underline font-semibold">Contáctanos</a></p>
          </div>

        </div>
      </section>

    </div>
  );
}
