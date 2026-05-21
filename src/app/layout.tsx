import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { VirtualAssistant } from '@/components/organisms/VirtualAssistant';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#f97316',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Cabletelco | Internet de Fibra Óptica Ultrarrápida",
  description: "La mejor conexión de internet por fibra óptica simétrica y televisión digital para tu hogar. Sin cortes, instalaciones rápidas y router incluido.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-grow flex flex-col w-full relative">
          {children}
        </main>
        <Footer />
        <VirtualAssistant />
      </body>
    </html>
  );
}
