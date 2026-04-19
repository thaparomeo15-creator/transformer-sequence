'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeistMono } from 'geist/font/mono';
import Button from './button';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

export default function WaitlistModal({ isOpen, onClose, selectedTier = 'personal' }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [referralCode, setReferralCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: selectedTier }),
      });

      const data = await res.json();

      if (res.ok) {
        setReferralCode(data.referralCode);
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border-strong)] rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="p-10">
              {status !== 'success' ? (
                <>
                  <div className="flex justify-between items-start mb-10">
                    <div className="flex flex-col gap-2">
                      <span className="text-label text-[var(--accent-cyan)]">ACCESS REQUEST // 01</span>
                      <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">
                        AUTHORIZE <br /> 
                        <span className="opacity-40">{selectedTier} LICENSE</span>
                      </h2>
                    </div>
                    <button onClick={onClose} className="text-white/20 hover:text-white transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                      <label className="text-[0.6rem] font-mono text-white/40 uppercase tracking-[0.2em]">IDENTIFICATION (EMAIL)</label>
                      <input 
                        required
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="USER@DOMAIN.COM"
                        className={`${GeistMono.className} w-full bg-black/40 border border-white/10 px-6 py-4 text-sm text-white focus:border-[var(--accent-cyan)] outline-none transition-colors uppercase tracking-widest`}
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs font-mono text-red-500 uppercase tracking-widest">
                        ERROR: {errorMessage}
                      </p>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'PROCESSING...' : 'INITIALIZE UPLINK //'}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 flex flex-col items-center gap-8">
                  <div className="w-16 h-16 bg-[var(--accent-cyan)] rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">UPLINK ESTABLISHED.</h2>
                    <p className="text-body text-white/40">Identification verified. You have been added to the secure waitlist for the {selectedTier} tier.</p>
                  </div>
                  <div className="w-full bg-black/40 border border-white/5 p-6 rounded-sm">
                    <span className="text-[0.6rem] font-mono text-white/20 uppercase tracking-[0.2em] mb-4 block">YOUR REFERRAL TOKEN</span>
                    <span className="text-2xl font-mono text-[var(--accent-cyan)] tracking-[0.3em] font-bold">{referralCode}</span>
                  </div>
                  <Button variant="outline" className="w-full" onClick={onClose}>DISMISS //</Button>
                </div>
              )}
            </div>

            {/* Bottom Progress Bar */}
            <div className="h-1 w-full bg-white/5">
              <motion.div 
                className="h-full bg-[var(--accent-cyan)]"
                initial={{ width: 0 }}
                animate={{ width: status === 'loading' ? '60%' : status === 'success' ? '100%' : 0 }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
