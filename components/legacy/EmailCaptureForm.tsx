'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitEmail } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function EmailCaptureForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleAction(formData: FormData) {
    setIsPending(true);
    const res = await submitEmail(formData);
    setIsPending(false);
    if (res.success) {
      setSuccess(true);
    }
  }

  return (
    <form action={handleAction} className="flex flex-col gap-4 w-full">
      <Input
        id="email"
        name="email"
        type="email"
        required
        placeholder="operator@domain.com"
        className="w-full h-12 bg-black/40 backdrop-blur-xl border border-white/10 text-[#f5f5f5] normal-case placeholder:text-white/30 px-4 focus-visible:ring-[#B71C1C]"
      />
      
      <Button
        type="submit"
        disabled={isPending || success}
        className={`w-full h-12 font-heading tracking-[0.3em] uppercase transition-all duration-300 ${
          success 
            ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/50 shadow-[0_0_20px_rgba(0,255,136,0.3)]' 
            : 'bg-[#B71C1C] text-white hover:bg-[#B71C1C]/80'
        }`}
      >
        {isPending ? (
          <span className="animate-pulse">AUTHENTICATING...</span>
        ) : success ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" /> ACCESS GRANTED
          </span>
        ) : (
          'INITIALIZE DOWNLOAD'
        )}
      </Button>
    </form>
  );
}
