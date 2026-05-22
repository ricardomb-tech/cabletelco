'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PricingCard } from '@/components/molecules/PricingCard';
import { FeaturesSection } from '@/components/organisms/FeaturesSection';
import { EntertainmentSection } from '@/components/organisms/EntertainmentSection';
import { CoverageChecker } from '@/components/organisms/CoverageChecker';

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPlanes = () => {
    const element = document.getElementById('planes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const plans = [
    {
      id: 'plan-300',
      name: 'Plan Básico',
      speed: '300 Mbps',
      price: 65000,
      currency: '$',
      isPopular: false,
      features: [
        { name: 'Fibra Óptica Simétrica', included: true },
        { name: 'Instalación Gratis', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'TV HD Incluida', included: false },
      ],
    },
    {
      id: 'plan-500',
      name: 'Plan Familiar',
      speed: '500 Mbps',
      price: 85000,
      currency: '$',
      isPopular: true,
      features: [
        { name: 'Fibra Óptica Simétrica', included: true },
        { name: 'Instalación Gratis', included: true },
        { name: 'Soporte 24/7', included: true },
        { name: 'TV HD Incluida (80 Canales)', included: true },
      ],
    },
    {
      id: 'plan-1000',
      name: 'Plan Gamer',
      speed: '1000 Mbps',
      price: 120000,
      currency: '$',
      isPopular: false,
      features: [
        { name: 'Fibra Óptica Simétrica', included: true },
        { name: 'Instalación Gratis', included: true },
        { name: 'Soporte Premium Prioritario', included: true },
        { name: 'TV HD Incluida (120 Canales)', included: true },
        { name: 'Ping optimizado', included: true },
      ],
    },
  ];

  const handleSelectPlan = (id: string) => {
    console.log(`Plan seleccionado: ${id}`);
    // Aquí iría la redirección al checkout o WhatsApp
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 lg:pt-0 lg:pb-0 lg:h-[680px] xl:h-[780px] flex items-center overflow-hidden bg-gradient-to-r from-slate-50 via-slate-50 to-[#dad5e0] border-b border-slate-100">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none flex justify-end items-center">
          <img
            src="/herofond.jpg"
            alt="Conectividad Cabletelco"
            className="w-full h-full object-cover object-right sm:object-center lg:w-auto lg:h-[82%] lg:object-contain lg:object-right lg:pr-12 xl:pr-20"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 8%, black 72%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent), linear-gradient(to bottom, transparent, black 8%, black 72%, transparent 95%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
          />
          {/* Soft gradient to guarantee text readability on the left while keeping the illustration on the right fully visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-[#dad5e0]/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col lg:flex-row items-center h-full">
          {/* Left Side Content Overlay */}
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start py-8 lg:py-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Internet y televisión para toda tu
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"> familia</span>
            </h1>
            <p className="max-w-xl text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
              Disfruta internet de fibra óptica simétrica y televisión digital con la mejor calidad, sin cortes y con todo el entretenimiento para tu hogar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/cobertura"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
              >
                Consultar Cobertura
              </Link>
              <Link
                href="/planes"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
              >
                Ver Planes
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Mouse */}
        <div
          onClick={scrollToPlanes}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 ${showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2 bg-white/20 backdrop-blur-xs">
            <div className="w-1.5 h-3 bg-orange-500 rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase select-none">
            Deslizar
          </span>
        </div>
      </section>

      {/* Sección de Beneficios / Por qué elegirnos */}
      <FeaturesSection />

      {/* Secciones de Planes */}
      <section className="py-24 bg-slate-50" id="planes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Planes diseñados para ti
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Elige el plan que mejor se adapte a tus necesidades. Todos nuestros planes incluyen instalación gratuita y router WiFi de doble banda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                {...plan}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Módulo Interactivo de Cobertura */}
      <CoverageChecker />

      {/* Sección de Entretenimiento */}
      <EntertainmentSection />

      {/* ── LOCATION SECTION ── */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Mapa */}
            <div className="rounded-3xl overflow-hidden shadow-lg h-96 lg:h-full order-last lg:order-first">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.661118434435!2d-75.8875968852138!3d8.75773999379901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fe1e9ddb07b%3A0x0!2zOMKwNDUnMjcuOSJOIDc1wrA1MycxNS40Ilc!5e0!3m2!1ses!2sco!4v1684781433345!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Oficinas OsmasTV"
              ></iframe>
            </div>

            {/* Información de Ubicación */}
            <div className="text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-50 border border-orange-200 text-orange-600 font-bold tracking-widest text-sm uppercase mb-4 shadow-sm">
                Visítanos
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
                Encuéntranos en <span className="text-orange-500">Montería</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 mb-6">
                Nuestra oficina principal está ubicada en el corazón de Montería, siempre listos para atenderte.
              </p>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 inline-block shadow-sm">
                <p className="text-slate-800 font-bold text-lg">Dirección:</p>
                <p className="text-slate-600">Calle 27 #4-35, Centro, Montería, Córdoba</p>
              </div>
              <div className="mt-8">
                <Link href="/contacto" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg">
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
