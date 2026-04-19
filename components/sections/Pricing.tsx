'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/ui/button';

const TIERS = [
  {
    name: 'PERSONAL',
    price: '$59',
    period: '/mo',
    features: ['204 Frame Sequence', 'Standard License', 'Email Support', '1-Domain Activation'],
    isPro: false
  },
  {
    name: 'PRO',
    price: '$149',
    period: '/mo',
    features: ['Unlimited Frames', 'Commercial License', 'Priority Support', 'Multi-Domain Activation', 'Custom Web Worker Support'],
    isPro: true
  },
  {
    name: 'ENTERPRISE',
    price: 'CUSTOM',
    period: '',
    features: ['Full Source Access', 'Dedicated Engineer', 'Custom Engine Optimization', 'Global Deployment Support'],
    isPro: false
  }
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      
      gsap.fromTo(card,
        { scale: 0.94, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: i * 0.1,
          ease: 'elastic.out(1, 0.8)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="pricing" ref={containerRef} className="py-[var(--space-7)] bg-[var(--color-bg)] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center text-center gap-6 mb-20">
          <span className="text-label">SECTION 04 // ACCESS CONTROL</span>
          <h2 className="text-section text-white max-w-2xl">
            SECURE YOUR <br />
            <span className="opacity-40">COMMERCIAL LICENSE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, i) => (
            <div 
              key={tier.name}
              ref={el => { cardsRef.current[i] = el; }}
              data-cursor="hover"
              className={`relative bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border border-[var(--glass-border)] rounded-lg p-10 flex flex-col transition-all duration-400 ${
                tier.isPro ? 'border-[var(--accent-cyan)] shadow-[0_0_60px_var(--accent-glow)] scale-105 z-10' : ''
              }`}
            >
              {tier.isPro && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent-cyan)] text-black font-mono text-[0.6rem] tracking-[0.2em] px-4 py-1 rounded-full font-bold">
                  RECOMMENDED
                </div>
              )}

              <div className="mb-10">
                <span className="text-label">{tier.name}</span>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
                  <span className="text-sm font-mono text-white/40 uppercase">{tier.period}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-4 mb-12 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-white/60 font-display">
                    <span className="w-1 h-1 bg-[var(--accent-cyan)] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.isPro ? 'primary' : 'outline'} 
                className="w-full"
                onClick={() => {}} // Will trigger WaitlistModal
              >
                {tier.name === 'ENTERPRISE' ? 'CONTACT SALES' : 'AUTHORIZE ACCESS'}
              </Button>

              {tier.isPro && (
                <div className="absolute inset-0 border border-[var(--accent-cyan)] rounded-lg pointer-events-none animate-pulse-border" />
              )}
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse-border {
          0% { border-color: var(--glass-border); }
          50% { border-color: var(--accent-cyan); }
          100% { border-color: var(--glass-border); }
        }
        .animate-pulse-border {
          animation: pulse-border 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
