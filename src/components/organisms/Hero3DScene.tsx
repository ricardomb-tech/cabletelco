'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CuboidProps {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  isOrange?: boolean;
  hasGlow?: boolean;
}

function Cuboid({ x, y, z, w, h, d, isOrange = false, hasGlow = true }: CuboidProps) {
  // Center of the cuboid is positioned at translate3d
  // We offset it so that 'y' represents the bottom height of the box
  const style: React.CSSProperties = {
    position: 'absolute',
    transform: `translate3d(${x}px, ${-(y + h / 2)}px, ${z}px)`,
    transformStyle: 'preserve-3d',
  };

  const topColor = isOrange ? 'bg-[#ff9e3b]' : 'bg-[#ffffff]';
  
  // Side faces gradients to match the pink/red bottom glow in the image
  const frontClass = isOrange 
    ? 'bg-gradient-to-b from-[#ef633d] to-[#d64119] border-t border-orange-400/30'
    : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#fecdd3] border-t border-slate-100'; // Pink glow at bottom
  
  const rightClass = isOrange
    ? 'bg-gradient-to-b from-[#d64119] to-[#b32b0a] border-t border-orange-500/30'
    : 'bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#fecdd3] border-t border-slate-100';

  const leftClass = isOrange
    ? 'bg-gradient-to-b from-[#ef633d] to-[#d64119] border-t border-orange-400/30'
    : 'bg-gradient-to-b from-[#f1f5f9] via-[#e2e8f0] to-[#fecdd3] border-t border-slate-100';

  const backClass = isOrange
    ? 'bg-gradient-to-b from-[#d64119] to-[#b32b0a] border-t border-orange-500/30'
    : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#fecdd3] border-t border-slate-100';

  return (
    <div style={style} className="transition-transform duration-500 hover:scale-105 group cursor-pointer">
      {/* Top Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${w}px`,
          height: `${d}px`,
          left: `-${w/2}px`,
          top: `-${d/2}px`,
          transform: `translate3d(0, ${-h/2}px, 0) rotateX(90deg)`,
        }}
        className={cn("border border-white/20 shadow-inner transition-colors duration-300 group-hover:brightness-105", topColor)}
      />
      {/* Front Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${w}px`,
          height: `${h}px`,
          left: `-${w/2}px`,
          top: `-${h/2}px`,
          transform: `translate3d(0, 0, ${d/2}px)`,
        }}
        className={cn("border-x border-slate-200/20", frontClass)}
      />
      {/* Back Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${w}px`,
          height: `${h}px`,
          left: `-${w/2}px`,
          top: `-${h/2}px`,
          transform: `translate3d(0, 0, ${-d/2}px) rotateY(180deg)`,
        }}
        className={cn("border-x border-slate-200/20", backClass)}
      />
      {/* Left Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${d}px`,
          height: `${h}px`,
          left: `-${d/2}px`,
          top: `-${h/2}px`,
          transform: `translate3d(${-w/2}px, 0, 0) rotateY(-90deg)`,
        }}
        className={cn("border-x border-slate-200/20", leftClass)}
      />
      {/* Right Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${d}px`,
          height: `${h}px`,
          left: `-${d/2}px`,
          top: `-${h/2}px`,
          transform: `translate3d(${w/2}px, 0, 0) rotateY(90deg)`,
        }}
        className={cn("border-x border-slate-200/20", rightClass)}
      />
      
      {/* Glow shadow at the bottom (lies on y=0 plane, so we offset by -h/2 down to the floor) */}
      {hasGlow && (
        <div 
          style={{
            position: 'absolute',
            width: `${w + 50}px`,
            height: `${d + 50}px`,
            left: `-${(w + 50)/2}px`,
            top: `-${(d + 50)/2}px`,
            transform: `translate3d(0, ${h/2}px, 0) rotateX(90deg)`,
            filter: 'blur(16px)',
          }}
          className={cn("rounded-full opacity-50 -z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-75", isOrange ? "bg-orange-500/40" : "bg-pink-500/50")}
        />
      )}
    </div>
  );
}

interface CylinderProps {
  x: number;
  y: number;
  z: number;
  r: number;
  h: number;
  isOrange?: boolean;
  hasGlow?: boolean;
}

function Cylinder({ x, y, z, r, h, isOrange = false, hasGlow = true }: CylinderProps) {
  const d = r * 2;
  const style: React.CSSProperties = {
    position: 'absolute',
    transform: `translate3d(${x}px, ${-(y + h / 2)}px, ${z}px)`,
    transformStyle: 'preserve-3d',
  };

  const topColor = isOrange ? 'bg-[#ff9e3b]' : 'bg-[#ffffff]';
  const sideGradient = isOrange
    ? 'bg-gradient-to-b from-[#ef633d] to-[#d64119] border-t border-orange-400/30'
    : 'bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#fecdd3] border-t border-slate-100';

  // 8-sided prism approximation
  const sideWidth = r * 0.76536;
  const sides = Array.from({ length: 8 });

  return (
    <div style={style} className="transition-transform duration-500 hover:scale-105 group cursor-pointer">
      {/* Top Face */}
      <div 
        style={{
          position: 'absolute',
          width: `${d}px`,
          height: `${d}px`,
          left: `-${r}px`,
          top: `-${r}px`,
          transform: `translate3d(0, ${-h/2}px, 0) rotateX(90deg)`,
          borderRadius: '50%',
        }}
        className={cn("border border-white/20 shadow-inner", topColor)}
      />
      {/* Side Panels */}
      {sides.map((_, i) => {
        const angle = i * 45;
        const tz = r * 0.92388;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${sideWidth}px`,
              height: `${h}px`,
              left: `-${sideWidth / 2}px`,
              top: `-${h / 2}px`,
              transform: `rotateY(${angle}deg) translateZ(${tz}px)`,
              backfaceVisibility: 'hidden',
            }}
            className={cn("border-x border-slate-200/10", sideGradient)}
          />
        );
      })}
      
      {/* Glow shadow at the bottom */}
      {hasGlow && (
        <div 
          style={{
            position: 'absolute',
            width: `${d + 40}px`,
            height: `${d + 40}px`,
            left: `-${r + 20}px`,
            top: `-${r + 20}px`,
            transform: `translate3d(0, ${h/2}px, 0) rotateX(90deg)`,
            filter: 'blur(16px)',
            borderRadius: '50%',
          }}
          className={cn("opacity-50 -z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-75", isOrange ? "bg-orange-500/40" : "bg-pink-500/50")}
        />
      )}
    </div>
  );
}

export function Hero3DScene() {
  const [rotation, setRotation] = useState({ x: 55, z: -35 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smoothly tilt rotation based on mouse pointer
    const dx = (y / (rect.height / 2)) * 6; // max 6 degrees tilt
    const dz = -(x / (rect.width / 2)) * 6; // max 6 degrees tilt
    
    setRotation({
      x: 55 + dx,
      z: -35 + dz,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 55, z: -35 });
  };

  if (!isMounted) {
    return <div className="w-full h-full bg-slate-900/10 rounded-3xl" />;
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative overflow-visible flex items-center justify-center select-none"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 30%',
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateZ(${rotation.z}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        className="relative w-0 h-0 flex items-center justify-center"
      >
        {/* Grid Floor */}
        <div 
          style={{
            position: 'absolute',
            width: '2400px',
            height: '2400px',
            left: '-1200px',
            top: '-1200px',
            transform: 'rotateX(90deg) translateZ(0px)',
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Ambient Floor Glow under the elements */}
        <div 
          style={{
            position: 'absolute',
            width: '600px',
            height: '500px',
            left: '-300px',
            top: '-250px',
            transform: 'rotateX(90deg) translateZ(-1px)',
            filter: 'blur(80px)',
            borderRadius: '50%',
          }}
          className="bg-gradient-to-r from-pink-500/10 via-orange-500/5 to-pink-500/10 pointer-events-none"
        />

        {/* The 3D Composition (coordinates match user snapshot) */}
        
        {/* 1. White Box 6 (Foreground Extreme Left) */}
        <Cuboid x={-180} z={220} y={0} w={125} h={30} d={70} />

        {/* 2. White Box 1 (Foreground Left) */}
        <Cuboid x={-160} z={100} y={0} w={120} h={24} d={80} />

        {/* 3. Orange Box 1 (Foreground Left, overlapping White Box 1) */}
        <Cuboid x={-110} z={150} y={0} w={80} h={24} d={60} isOrange />

        {/* 4. White Box 2 (Behind Orange Box 1) */}
        <Cuboid x={-100} z={20} y={0} w={110} h={24} d={90} />

        {/* 5. Orange Cylinder (On top of White Box 2) */}
        <Cylinder x={-100} z={20} y={24} r={25} h={35} isOrange />

        {/* 6. Large White Box (Center Back) */}
        <Cuboid x={0} z={-80} y={0} w={140} h={75} d={120} />

        {/* 7. Orange Box 2 (Center Right) */}
        <Cuboid x={90} z={10} y={0} w={100} h={24} d={60} isOrange />

        {/* 8. White Cylinder (Behind Orange Box 2) */}
        <Cylinder x={90} z={-70} y={0} r={20} h={40} />

        {/* 9. White Box 3 (Right Back) */}
        <Cuboid x={190} z={-50} y={0} w={120} h={24} d={80} />

        {/* 10. White Box 4 (Foreground Right) */}
        <Cuboid x={160} z={50} y={0} w={130} h={24} d={90} />

        {/* 11. White Box 5 (Right side of White Box 4) */}
        <Cuboid x={230} z={80} y={0} w={80} h={24} d={50} />

      </div>
    </div>
  );
}
