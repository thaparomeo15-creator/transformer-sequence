'use client';

import { GeistMono } from 'geist/font/mono';
import Button from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-bg)] pt-[var(--space-7)] pb-12 overflow-hidden border-t border-[var(--color-border)]">
      
      {/* Background Animated Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(0,229,255,0.03)_0%,transparent_70%)] animate-pulse-slow pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* CTA Section */}
        <div className="flex flex-col items-center text-center gap-10 mb-32">
          <span className="text-label">SECTION 06 // TERMINATION</span>
          <h2 className="text-hero text-white max-w-4xl">
            INITIALIZE YOUR <br /> 
            <span className="opacity-30">NEXT SEQUENCE.</span>
          </h2>
          <Button variant="primary" className="scale-110" onClick={() => {}}>
            ACQUIRE LICENSE //
          </Button>
        </div>

        {/* Links & Bottom Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/5 pt-12 mb-20">
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/40">SYSTEM</span>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Architecture</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Integration</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Benchmarks</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/40">LEGAL</span>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Terms</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">EULA</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/40">NETWORK</span>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Twitter / X</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Discord</a>
            <a href="#" className="text-sm font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">GitHub</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label text-white/40">STATUS</span>
            <div className="flex items-center gap-2 text-sm font-mono text-[var(--accent-cyan)] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
              All Systems Nominal
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
          <p className={`${GeistMono.className} text-[0.6rem] text-white/20 tracking-[0.2em] uppercase`}>
            © 2026 TRANSFORMER SEQUENCE · ALL RIGHTS RESERVED
          </p>
          <p className={`${GeistMono.className} text-[0.6rem] text-white/20 tracking-[0.2em] uppercase`}>
            BUILT FOR IMPACT · POWERED BY NEXT.JS
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
