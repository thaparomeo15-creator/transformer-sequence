'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SplineScene = dynamic(() => import('@/components/ui/SplineScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/20 border border-white/5 rounded-lg animate-pulse">
      <span className="font-mono text-[0.65rem] text-white/20 tracking-widest">INITIALIZING 3D ASSETS...</span>
    </div>
  ),
});

export default function Showcase() {
  return (
    <section id="showcase" className="py-[var(--space-7)] bg-[var(--color-bg-secondary)] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <span className="text-label">SECTION 03 // 3D SHOWCASE</span>
            <h2 className="text-section text-white">
              TACTILE <br />
              <span className="opacity-40">INTERACTION.</span>
            </h2>
            <p className="text-body max-w-md">
              Beyond the scroll. Interact with the core chassis in real-time. 
              Built with hardware-accelerated WebGL to ensure responsiveness across all devices.
            </p>
            
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                <span className="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
                LIVE RENDER ENGINE ACTIVE
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                MULTI-THREADED PHYSICS
              </div>
            </div>
          </div>

          <div className="relative aspect-square w-full order-1 lg:order-2" data-cursor="drag">
            <Suspense fallback={null}>
              <SplineScene sceneUrl="https://prod.spline.design/6Wq1Q7YRyS7S06iV/scene.splinecode" />
            </Suspense>

            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10" />
          </div>

        </div>

      </div>
    </section>
  );
}
