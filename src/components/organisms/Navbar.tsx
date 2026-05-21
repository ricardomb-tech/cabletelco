'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Inicio', href: '/' },
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Planes', href: '/planes' },
  { name: 'Cobertura', href: '/cobertura' },
  { name: 'Test de Velocidad', href: '/test-velocidad' },
  { name: 'Pagos', href: '/pagos' },
  { name: 'PQR', href: '/pqr' },
];

// ── Botón CTA compartido ──────────────────────────────────────────────────────
function ContactButton({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/contacto"
      className={cn(
        'inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold text-white',
        'bg-gradient-to-r from-orange-500 to-orange-600',
        'shadow-lg shadow-orange-500/35 hover:shadow-orange-500/55',
        'hover:scale-105 active:scale-95 transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-orange-500/50 select-none',
        className
      )}
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      Contáctanos
    </Link>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links de escritorio con hover + dot activo
  function DesktopLinks({ layoutSuffix }: { layoutSuffix: string }) {
    return (
      <div
        className="hidden md:flex items-center space-x-0.5 relative"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_LINKS.map((link, index) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/' && pathname?.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredIndex(index)}
              className={cn(
                'relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300',
                'focus:outline-none focus:ring-2 focus:ring-orange-500/40 select-none',
                isActive ? 'text-orange-600' : 'text-slate-700 hover:text-slate-900'
              )}
            >
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.span
                    layoutId={`nav-hover-pill-${layoutSuffix}`}
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 border border-orange-500/10 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId={`active-dot-${layoutSuffix}`}
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{link.name}</span>
            </Link>
          );
        })}
      </div>
    );
  }



  // Botón hamburguesa móvil
  function MobileToggle() {
    return (
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all active:scale-95"
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú principal'}</span>
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">

        {/* ════ BARRA TRANSPARENTE (sin scroll) ════ */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="transparent-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto w-full h-14 md:h-16 flex items-center"
            >
              <div className="max-w-7xl mx-auto h-full w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="outline-none rounded-xl p-1 transition-transform duration-300 active:scale-95 flex-shrink-0">
                  <Logo className="h-8 md:h-10" />
                </Link>



                {/* Links */}
                <DesktopLinks layoutSuffix="top" />

                {/* CTA */}
                <ContactButton className="hidden md:inline-flex" />

                {/* Mobile toggle */}
                <MobileToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ════ BARRA FLOTANTE REDONDEADA (con scroll) ════ */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              key="floating-bar"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="pointer-events-auto mx-auto mt-3 px-4 sm:px-6"
              style={{ maxWidth: '1200px' }}
            >
              <div
                className="w-full h-13 md:h-14 flex items-center justify-between gap-4 px-4 md:px-6 rounded-2xl border border-white/30 shadow-xl shadow-black/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.55)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Logo */}
                <Link href="/" className="outline-none rounded-xl p-1 flex-shrink-0 transition-transform duration-300 active:scale-95">
                  <Logo className="h-7 md:h-9" />
                </Link>

                {/* Links */}
                <DesktopLinks layoutSuffix="float" />

                {/* CTA */}
                <ContactButton className="hidden md:inline-flex flex-shrink-0" />



                {/* Mobile toggle */}
                <MobileToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* ════ MENÚ MÓVIL ════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              style={{ top: '70px' }}
              className="fixed inset-x-4 max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-2xl p-6 z-40 flex flex-col justify-between md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {NAV_LINKS.map((link, index) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== '/' && pathname?.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'block py-3 px-4 rounded-2xl text-base font-bold transition-all',
                          isActive
                            ? 'bg-gradient-to-r from-orange-500/10 to-transparent text-orange-600 border-l-4 border-orange-500 pl-3'
                            : 'text-slate-800 hover:bg-slate-50 hover:text-orange-500'
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* CTA móvil */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                >
                  <Link
                    href="/contacto"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full mt-2 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg shadow-orange-500/30 transition-all active:scale-[0.98]"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    Contáctanos
                  </Link>
                </motion.div>
              </div>



            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
