import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  lightText?: boolean;
}

export function MinTicLogo({ className, lightText = false }: LogoProps) {
  return (
    <div className={cn("flex items-center select-none flex-shrink-0", className)}>
      <img
        src="/logo_mintic_24_dark.svg"
        alt="Ministerio TIC Colombia"
        className={cn(
          "h-7 w-auto object-contain transition-all",
          lightText ? "brightness-0 invert opacity-75 hover:opacity-100" : "opacity-90 hover:opacity-100"
        )}
      />
    </div>
  );
}

export function CrcLogo({ className, lightText = false }: LogoProps) {
  return (
    <div className={cn("flex items-center select-none flex-shrink-0", className)}>
      <img
        src="/logo-comision-regulacion-comunicaciones-colombia.svg"
        alt="CRC Comisión de Regulación de Comunicaciones"
        className={cn(
          "h-7 w-auto object-contain transition-all",
          lightText ? "brightness-0 invert opacity-75 hover:opacity-100" : "brightness-0 opacity-80 hover:opacity-100"
        )}
      />
    </div>
  );
}

export function SicLogo({ className, lightText = false }: LogoProps) {
  return (
    <div className={cn("flex items-center select-none flex-shrink-0", className)}>
      <img
        src="/LogoSICv1.png"
        alt="SIC Superintendencia de Industria y Comercio"
        className={cn(
          "h-5 w-auto object-contain transition-all",
          lightText ? "brightness-0 invert opacity-75 hover:opacity-100" : "opacity-90 hover:opacity-100"
        )}
      />
    </div>
  );
}
