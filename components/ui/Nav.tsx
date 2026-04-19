'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeistMono } from 'geist/font/mono';
import { disableAudio, enableAudio } from '@/lib/audio';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    
    const stored = localStorage.getItem('audio-enabled') === 'true';
    setAudioEnabled(stored);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const newState = !audioEnabled;
    setAudioEnabled(newState);
    localStorage.setItem('audio-enabled', newState.toString());
    if (newState) enableAudio();
    else disableAudio();
  };

  const navLinks = [
    { name: 'Architecture', href: '#problem' },
    { name: 'Specifications', href: '#specs' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Licensing', href: '#pricing' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[var(--z-nav)] transition-all duration-400 ease-[var(--ease-out-expo)] ${
        scrolled ? 'bg-[var(--glass-bg)] backdrop-blur-[var(--glass-blur)] border-b border-[var(--glass-border)] py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={`${GeistMono.className} text-[0.75rem] tracking-[0.2em] font-bold text-white uppercase`}>
          TRANSFORMER <span className="text-[var(--accent-cyan)] opacity-50">·</span> SEQUENCE
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              data-cursor="hover"
              className="relative text-[0.7rem] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-1/2 w-full h-[1px] bg-[var(--accent-cyan)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleAudio}
            data-cursor="hover"
            className="text-[0.65rem] tracking-[0.15em] uppercase font-mono text-white/40 hover:text-[var(--accent-cyan)] transition-colors"
          >
            AUDIO {audioEnabled ? 'ON' : 'OFF'}
          </button>
          
          <a 
            href="#pricing" 
            data-cursor="hover"
            className="hidden md:block bg-white text-black px-6 py-2 rounded-sm text-[0.65rem] tracking-[0.15em] uppercase font-mono font-bold hover:bg-[var(--accent-cyan)] transition-all active:scale-95"
          >
            INITIALIZE
          </a>

          {/* Hamburger */}
          <button 
            className="md:hidden flex flex-col gap-1.5" 
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="w-6 h-[1px] bg-white" />
            <span className="w-6 h-[1px] bg-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center p-12"
          >
            <button 
              className="absolute top-8 right-8 text-white/40 uppercase tracking-widest font-mono text-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              CLOSE //
            </button>
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading tracking-[0.2em] uppercase text-white hover:text-[var(--accent-cyan)] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 bg-white text-black px-12 py-4 rounded-sm tracking-[0.2em] font-mono text-sm font-bold"
              >
                INITIALIZE
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
