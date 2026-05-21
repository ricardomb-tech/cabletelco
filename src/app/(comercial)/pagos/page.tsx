'use client';

import { motion } from 'framer-motion';
import { BuildingOfficeIcon, ReceiptRefundIcon, CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export default function PagosPage() {
  const metodosPago = [
    {
      title: 'Pago En Oficina',
      description: 'Visita cualquiera de nuestras oficinas en Montería, Cereté, Lorica, Sahagún, Tierralta, San Bernardo.',
      icon: BuildingOfficeIcon,
      buttonText: 'Ver oficinas',
      link: '/contacto',
    },
    {
      title: 'Pago Por Record',
      description: 'Realiza tu pago en puntos autorizados de recaudo Record o aliados comerciales.',
      icon: ReceiptRefundIcon,
      buttonText: 'Más información',
      link: '#',
    },
    {
      title: 'Pago Por PSE',
      description: 'Paga en línea de forma segura desde tu banco con PSE. Transacción inmediata y confirmación automática.',
      icon: CreditCardIcon,
      buttonText: 'Ir a PSE',
      link: '#',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ── HEADER MEDIOS DE PAGO ── */}
        <div className="flex items-start gap-4 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30"
          >
            <CurrencyDollarIcon className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2"
            >
              Medios De Pago
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600"
            >
              Elige la forma más cómoda para realizar tus pagos con CableTelco.
            </motion.p>
          </div>
        </div>

        {/* ── TARJETAS DE PAGO ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metodosPago.map((metodo, idx) => (
            <motion.div
              key={metodo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <metodo.icon className="w-7 h-7 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{metodo.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{metodo.description}</p>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-slate-100">
                <a 
                  href={metodo.link}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-bold text-orange-600 bg-white border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 transition-colors w-max"
                >
                  {metodo.buttonText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
