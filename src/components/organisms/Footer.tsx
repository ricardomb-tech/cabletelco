import Link from 'next/link';
import { Logo } from '@/components/atoms/Logo';
import { MinTicLogo, CrcLogo, SicLogo } from '@/components/atoms/RegulatoryLogos';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-650 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Columna 1: Marca y Contacto */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo textColor="text-[#e2532a]" />
            </Link>
            <p className="text-sm text-slate-500 mb-4">
              Conectando hogares y empresas con la red de fibra óptica más estable y veloz de la región.
            </p>
            <div className="text-xs text-slate-500 space-y-1 border-t border-slate-200 pt-3">
              <p className="font-bold text-slate-800">Osmas TV S.A.S.</p>
              <p>NIT: 900.XXX.XXX-X</p>
              <p>Tel: 01 8000 000 000</p>
              <p>contacto@cabletelco.com.co</p>
            </div>
          </div>

          {/* Columna 2: Servicios */}
          <div>
            <h3 className="text-slate-800 font-bold mb-4 uppercase tracking-wider text-sm">Servicios</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/planes" className="hover:text-orange-600 transition-colors">Planes Hogar</Link>
              </li>
              <li>
                <Link href="/cobertura" className="hover:text-orange-600 transition-colors">Zonas de Cobertura</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-600 transition-colors">Planes Corporativos</Link>
              </li>
              <li>
                <Link href="/quienes-somos" className="hover:text-orange-600 transition-colors">Quiénes Somos</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Atención al Cliente */}
          <div>
            <h3 className="text-slate-800 font-bold mb-4 uppercase tracking-wider text-sm">Atención</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/pago-en-linea" className="hover:text-orange-600 transition-colors">Pago en Línea</Link>
              </li>
              <li>
                <Link href="/pqr" className="hover:text-orange-600 transition-colors">Radicar PQR</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-orange-600 transition-colors">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Regulación y Leyes */}
          <div>
            <h3 className="text-slate-800 font-bold mb-4 uppercase tracking-wider text-sm">Regulación y Leyes</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>
                <Link href="/regulacion#terminos-promociones" className="hover:text-orange-600 transition-colors">
                  Términos y condiciones de las promociones
                </Link>
              </li>
              <li>
                <Link href="/regulacion#equipos-desuso" className="hover:text-orange-600 transition-colors">
                  Política de equipos en desuso
                </Link>
              </li>
              <li>
                <Link href="/regulacion#compensacion-automatica" className="hover:text-orange-600 transition-colors">
                  Compensación automática
                </Link>
              </li>
              <li>
                <Link href="/regulacion#seguridad-red" className="hover:text-orange-600 transition-colors">
                  Recomendaciones sobre seguridad de la red
                </Link>
              </li>
              <li>
                <Link href="/regulacion#contrato-servicios" className="hover:text-orange-600 transition-colors">
                  Contrato de prestación de servicios
                </Link>
              </li>
              <li>
                <Link href="/regulacion#resolucion-5111" className="hover:text-orange-600 transition-colors">
                  Resolución 5111 de 2017
                </Link>
              </li>
              <li>
                <Link href="/regulacion#denuncia-pornografia" className="hover:text-orange-600 transition-colors">
                  Denuncia pornografía infantil
                </Link>
              </li>
              <li>
                <Link href="/regulacion#cero-tolerancia" className="hover:text-orange-600 transition-colors">
                  Cero Tolerancia
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm gap-6 text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            <p>&copy; {currentYear} Osmas TV S.A.S. Todos los derechos reservados.</p>
            <div className="flex space-x-4 text-xs">
              <Link href="#" className="hover:text-slate-800 transition-colors">Términos y Condiciones</Link>
              <span className="text-slate-300">|</span>
              <Link href="#" className="hover:text-slate-800 transition-colors">Política de Privacidad</Link>
            </div>
          </div>
          
          {/* Entidades de Regulación y Vigilancia */}
          <div className="flex items-center gap-3.5 bg-slate-200/40 border border-slate-200/80 px-4 py-2 rounded-xl flex-shrink-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-sans select-none">Vigilado por:</span>
            <MinTicLogo lightText={false} className="scale-90 origin-left" />
            <div className="w-[1px] h-4 bg-slate-300" />
            <CrcLogo lightText={false} className="scale-90 origin-left" />
            <div className="w-[1px] h-4 bg-slate-300" />
            <SicLogo lightText={false} className="scale-90 origin-left" />
          </div>
        </div>
      </div>
    </footer>
  );
}
