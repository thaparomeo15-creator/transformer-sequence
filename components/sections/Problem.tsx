'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Parallax logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    });

    tl.to(leftRef.current, { y: -100, ease: 'none' }, 0);
    tl.to(rightRef.current, { y: 100, ease: 'none' }, 0);

    // Count up animation
    const stats = [
      { ref: stat1Ref, end: 145, suffix: 'ms' },
      { ref: stat2Ref, end: 0, suffix: 'ms' },
    ];

    stats.forEach((stat) => {
      gsap.to({ val: 0 }, {
        val: stat.end,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat.ref.current,
          start: 'top 85%',
        },
        onUpdate: function() {
          if (stat.ref.current) {
            stat.ref.current.textContent = Math.round(this.targets()[0].val).toString();
          }
        }
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="relative min-h-screen bg-[var(--color-bg-secondary)] py-[var(--space-7)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        
        {/* Left Panel: The Friction */}
        <div ref={leftRef} className="flex flex-col gap-8">
          <span className="text-label">SECTION 01 // ARCHITECTURE</span>
          <h2 className="text-section text-white">
            THE FRICTION <br /> 
            <span className="opacity-40">OF STANDARD WEB.</span>
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-4">
              <span ref={stat1Ref} className="text-[clamp(4rem,10vw,8rem)] font-display font-bold leading-none text-white">0</span>
              <span className="text-2xl font-mono text-white/20 mb-4">ms</span>
            </div>
            <p className="text-body max-w-md">
              Average CSS-driven animation latency. High CPU usage, frame drops, and fragmented storytelling. 
              The standard web is a compromise.
            </p>
          </div>
        </div>

        {/* Right Panel: The Solution */}
        <div ref={rightRef} className="flex flex-col gap-8 md:pt-40">
          <h2 className="text-section text-[var(--accent-cyan)]">
            ZERO LATENCY. <br /> 
            <span className="text-white">PURE PERFORMANCE.</span>
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-4">
              <span ref={stat2Ref} className="text-[clamp(4rem,10vw,8rem)] font-display font-bold leading-none text-[var(--accent-cyan)]">0</span>
              <span className="text-2xl font-mono text-[var(--accent-cyan)] opacity-20 mb-4">ms</span>
            </div>
            <p className="text-body max-w-md">
              Transformer Sequence bypasses the DOM layer entirely. 
              Frame-by-frame precision, locked to the user's scroll. Zero lag. Infinite impact.
            </p>
          </div>
        </div>

      </div>
      
      {/* Background HUD elements */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full pointer-events-none" />
    </section>
  );
}
