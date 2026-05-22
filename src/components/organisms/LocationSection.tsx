import Link from 'next/link';

export function LocationSection() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
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
  );
}
