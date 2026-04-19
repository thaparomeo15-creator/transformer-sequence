'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playLock } from '@/lib/audio';
import { GeistMono } from 'geist/font/mono';
import Button from '@/components/ui/button';

export default function SuccessPage() {
  const [revealed, setRevealed] = useState('');
  const message = 'ACCESS GRANTED';

  useEffect(() => {
    playLock();
    
    let i = 0;
    const interval = setInterval(() => {
      setRevealed(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="fixed inset-0 bg-[#080808] flex flex-col items-center justify-center p-6 text-center">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      
      <div className="flex flex-col gap-8 relative z-10">
        <span className="text-label text-[var(--accent-cyan)]">AUTHENTICATION // SUCCESS</span>
        
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter">
          {revealed}
          <span className="animate-pulse">_</span>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col gap-6 items-center"
        >
          <p className="text-body max-w-md opacity-40">
            Your license credentials have been initialized. You now have full clearance to the Transformer Sequence engine.
          </p>
          <Button variant="primary" onClick={() => window.location.href = '/'}>
            RETURN TO PORTAL //
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className={`${GeistMono.className} text-[0.6rem] text-white/20 tracking-widest uppercase text-left`}>
          LATENCY: 0.0ms <br />
          STABILITY: 100%
        </div>
        <div className={`${GeistMono.className} text-[0.6rem] text-white/20 tracking-widest uppercase text-right`}>
          SESSION: {Math.random().toString(36).substring(7).toUpperCase()} <br />
          CLEARANCE: TIER-1
        </div>
      </div>
    </main>
  );
}
