'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Button from '@/components/ui/button';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial hidden state
    gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 40 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    // Frame 20 equivalent (progress ~0.1)
    tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    // Frame 80 equivalent (progress ~0.4)
    tl.to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
    // Frame 140 equivalent (progress ~0.7)
    tl.to(ctaRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.7)
    // Frame 190 equivalent (progress ~0.95)
    tl.to([headlineRef.current, subheadlineRef.current, ctaRef.current], { opacity: 0, duration: 0.5 }, 0.95);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-[var(--z-content)] pointer-events-none">
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 ref={headlineRef} className="text-hero text-white mb-6">
          TRANSFORMER <br /> SEQUENCE
        </h1>
        <p ref={subheadlineRef} className="text-body max-w-xl mb-10 opacity-60">
          The world's first zero-latency scroll-driven canvas engine. <br />
          Built for high-precision cinematic storytelling.
        </p>
        <div ref={ctaRef} className="pointer-events-auto">
          <Button variant="primary" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>
            INITIALIZE SYSTEM //
          </Button>
        </div>
      </div>
    </div>
  );
}
