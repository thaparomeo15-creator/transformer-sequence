'use client';

import { ReactNode, useEffect } from 'react';
import { initLenis } from '@/lib/lenis';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'next-themes';

export default function RootProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = initLenis();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
