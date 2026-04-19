'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('@/components/ui/LottiePlayer'), { ssr: false });

const FAQS = [
  {
    q: 'How does the zero-latency engine work?',
    a: 'We use an off-thread Web Worker to pre-decode image frames into Bitmaps. When you scroll, the engine simply draws the pre-decoded bitmaps to a Canvas element, bypassing the DOM entirely for maximum performance.'
  },
  {
    q: 'Is it compatible with all browsers?',
    a: 'Yes. The engine is built on standard HTML5 Canvas and Web Workers. For older browsers or low-end devices, we automatically fallback to a simplified sequence or static high-res assets.'
  },
  {
    q: 'Can I use custom frame sequences?',
    a: 'Absolutely. The license includes the full build pipeline. You can inject your own frames, adjust the buffering strategy, and customize the scroll-interpolation logic.'
  },
  {
    q: 'What is the "Commercial License"?',
    a: 'The Commercial License allows you to use the Transformer Sequence engine on one production project with unlimited traffic. It includes lifetime updates and technical support.'
  }
];

function FAQItem({ q, a, index }: { q: string, a: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-border)] last:border-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        data-cursor="hover"
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl font-display font-medium text-white/80 group-hover:text-white transition-colors">
          {q}
        </span>
        <div className={`w-6 h-6 transition-transform duration-600 ease-[var(--ease-out-expo)] ${isOpen ? 'rotate-180' : ''}`}>
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-[var(--accent-cyan)]">
             <path d="M6 9l6 6 6-6" />
           </svg>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-body max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-[var(--space-7)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          <div className="flex flex-col gap-6">
            <span className="text-label">SECTION 05 // INTEL</span>
            <h2 className="text-section text-white">
              COMMON <br />
              <span className="opacity-40">ENQUIRIES.</span>
            </h2>
            <p className="text-body max-w-sm">
              Detailed technical data on the deployment and integration of the Transformer Sequence system.
            </p>
          </div>

          <div className="flex flex-col">
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
