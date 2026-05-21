'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid'; 

export interface PlanFeature {
  name: string;
  included: boolean;
}

export interface PricingCardProps {
  id: string;
  name: string;
  speed: string;
  price: number;
  currency: string;
  features: PlanFeature[];
  isPopular?: boolean;
  onSelectPlan: (id: string) => void;
}

export function PricingCard({
  id,
  name,
  speed,
  price,
  currency,
  features,
  isPopular = false,
  onSelectPlan,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col p-6 sm:p-8 bg-white rounded-3xl shadow-lg border transition-all ${
        isPopular 
          ? 'border-orange-500 shadow-orange-100/50 ring-1 ring-orange-500' 
          : 'border-slate-200'
      }`}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">
            Más Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-slate-800">{name}</h3>
        <div className="mt-4 flex items-baseline justify-center text-5xl font-extrabold text-slate-900">
          <span className="text-2xl font-medium text-slate-500 mr-1">{currency}</span>
          {price}
          <span className="text-lg font-medium text-slate-500 ml-1">/mes</span>
        </div>
        <p className="mt-4 text-sm text-orange-600 font-bold bg-orange-50 inline-block px-4 py-1.5 rounded-full">
          Velocidad: {speed}
        </p>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircleIcon
              className={`h-6 w-6 flex-shrink-0 ${
                feature.included ? 'text-orange-500' : 'text-slate-300'
              }`}
              aria-hidden="true"
            />
            <span className={`ml-3 text-sm font-medium ${feature.included ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelectPlan(id)}
        className={`w-full py-3.5 px-6 rounded-xl font-bold text-white transition-all focus:outline-none focus:ring-4 focus:ring-offset-2 ${
          isPopular
            ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-500/30 shadow-lg shadow-orange-500/20'
            : 'bg-slate-900 hover:bg-slate-800 focus:ring-slate-900/30'
        }`}
        aria-label={`Contratar el plan ${name}`}
      >
        Contratar Ahora
      </button>
    </motion.div>
  );
}
