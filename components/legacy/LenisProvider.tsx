'use client';

import { useEffect, useRef, ReactNode } from 'react';

// ─── LenisProvider ────────────────────────────────────────────────────────────
// Wraps children with Lenis smooth scroll.
// Lenis is imported dynamically to avoid SSR issues.
// ─────────────────────────────────────────────────────────────────────────────

interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<import('lenis').default | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip on server or if reduced motion is preferred
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lenis: import('lenis').default;

    async function initLenis() {
      try {
        const LenisModule = await import('lenis');
        const Lenis = LenisModule.default ?? LenisModule;

        lenis = new (Lenis as typeof import('lenis').default)({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.8,
          infinite: false,
        });

        lenisRef.current = lenis;

        function raf(time: number) {
          lenis.raf(time);
          rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);
      } catch {
        // Lenis not available — fall back to native scroll
      }
    }

    initLenis();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
