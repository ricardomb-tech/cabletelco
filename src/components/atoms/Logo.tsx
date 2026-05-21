import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
  textColor?: string;
}

export function Logo({
  className,
  showText = true,
  variant = 'horizontal',
  textColor = 'text-[#e2532a]'
}: LogoProps) {
  const containerClasses = cn(
    "flex items-center group",
    variant === 'vertical' ? 'flex-col justify-center' : 'flex-row gap-2.5',
    className
  );

  // Image dimensions for vertical/horizontal variant
  const imageDimensions = variant === 'vertical' ? 'w-[100px] h-[100px]' : 'w-10 h-10';

  const textClasses = cn(
    "font-sans uppercase tracking-[0.18em] leading-none",
    variant === 'vertical' ? 'mt-6 text-[21px]' : 'text-xl',
    textColor
  );

  return (
    <div className={containerClasses}>
      <div className={cn("relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105", imageDimensions)}>
        <Image
          src="/logo.png"
          alt="Cabletelco"
          fill
          priority
          sizes="(max-width: 768px) 40px, 100px"
          className="object-contain"
        />
      </div>

      {showText && (
        <span className={textClasses}>
          <span className="font-extrabold">CABLE</span>
          <span className="font-light">TELCO</span>
        </span>
      )}
    </div>
  );
}