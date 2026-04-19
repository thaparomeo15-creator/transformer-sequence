'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

const SPECS = [
  {
    label: 'ENGINE // 01',
    title: 'FRAME-BUFFER PIPELINE',
    description: 'Off-thread Web Worker pre-decoding ensures that every pixel is ready before you even scroll. Zero flickering, zero delay.',
    data: '204 FRAMES'
  },
  {
    label: 'PERFORMANCE // 02',
    title: 'BIT-MAPPED PRECISION',
    description: 'Using hardware-accelerated Canvas rendering to bypass DOM paint cycles. 60FPS equivalent experience on any hardware.',
    data: '0.0ms LAG'
  },
  {
    label: 'AUTHORITY // 03',
    title: 'VISUAL SOVEREIGNTY',
    description: 'A dedicated design system built on Geist Mono and high-contrast glassmorphism. Absolute clarity in every interaction.',
    data: '100% IMPACT'
  }
];

export default function Specs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(cardsRef.current, 
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="specs" ref={containerRef} className="py-[var(--space-7)] bg-[var(--color-bg)] relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col gap-4 mb-20">
          <span className="text-label">SECTION 02 // SPECIFICATIONS</span>
          <h2 className="text-section text-white max-w-2xl">
            RUTHLESS ENGINEERING. <br />
            <span className="opacity-40">CINEMATIC AUTHORITY.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SPECS.map((spec, i) => (
            <div 
              key={spec.title}
              ref={el => { cardsRef.current[i] = el; }}
              data-cursor="hover"
              className="group relative bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] p-10 rounded-sm hover:border-[var(--accent-cyan)] transition-colors duration-400 overflow-hidden"
            >
              <div className="relative z-10 flex flex-col h-full">
                <span className="text-label mb-8 group-hover:text-[var(--accent-cyan)] transition-colors">{spec.label}</span>
                <h3 className="text-2xl font-display font-bold text-white mb-6 tracking-tight">{spec.title}</h3>
                <p className="text-body text-white/40 mb-12 flex-grow">
                  {spec.description}
                </p>
                <div className="font-mono text-xl text-white tracking-widest border-t border-white/5 pt-6 flex justify-between items-center">
                  <span className="text-xs opacity-20">DATA</span>
                  <span>{spec.data}</span>
                </div>
              </div>

              {/* Scanline Animation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-0 group-hover:animate-scanline pointer-events-none" />
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-[var(--accent-cyan)] opacity-0 group-hover:opacity-[0.03] blur-3xl transition-opacity duration-600 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { top: -10%; opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { top: 110%; opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 1.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
