'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, MotionValue, useTransform, useSpring } from 'framer-motion';
import { PricingTier } from '@/components/PricingTier';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

// ─── Constants & Types ────────────────────────────────────────────────────────

const TOTAL_FRAMES = 204;
const IMAGE_FOLDER_PATH = '/images/transformer-sequence';

interface CanvasScrollerProps {
  scrollYProgress: MotionValue<number>;
}

// ─── Helper: get frame src (WebP optimization via &fm=webp) ─────────────
function getFrameSrc(index: number, dpr: number): string {
  const size = dpr > 1 ? '&w=3840' : '&w=1920';
  if (index < 68) {
    return `https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80${size}&fm=webp&auto=format&fit=crop`;
  } else if (index < 136) {
    return `https://images.unsplash.com/photo-1610492850943-4e4e9766ee5c?q=80${size}&fm=webp&auto=format&fit=crop`;
  } else {
    return `https://images.unsplash.com/photo-1601132348500-111c1d0ed412?q=80${size}&fm=webp&auto=format&fit=crop`;
  }
}

// ─── Helper: draw image with object-fit cover math ───────────────────────────
function drawResponsive(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
  isMobile: boolean
): void {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let drawW: number, drawH: number, drawX: number, drawY: number;

  if (isMobile) {
    // CONTAIN on Mobile so the car isn't cropped
    if (imgRatio > canvasRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      drawX = 0;
      drawY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    }
  } else {
    // COVER on Desktop
    if (imgRatio > canvasRatio) {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      drawX = (canvasW - drawW) / 2;
      drawY = 0;
    } else {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      drawX = 0;
      drawY = (canvasH - drawH) / 2;
    }
  }

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

// ─── CanvasScroller Component ────────────────────────────────────────────────
export function CanvasScroller({ scrollYProgress }: CanvasScrollerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Implement Linear Interpolation (Lerp ~ 0.07) via Framer Motion useSpring
  // Stiffness and damping create a weighted, premium feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.8 });
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Handle Resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    
    // Read bounds from the parent wrapper
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    setIsMobile(window.innerWidth < 768);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      const ctx = canvas.getContext('2d');
      if (ctx && imagesRef.current[currentFrameRef.current]) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);
        drawResponsive(ctx, imagesRef.current[currentFrameRef.current], w, h, window.innerWidth < 768);
      }
    }
  }, []);

  // Frame preloading buffer
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    const urlCache = new Map<string, HTMLImageElement>();
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        imagesRef.current = images;
        setIsReady(true);
        scheduleFrameDraw(0);
      }
    };

    const BATCH = 20;
    let batchStart = 0;

    function loadBatch() {
      const end = Math.min(batchStart + BATCH, TOTAL_FRAMES);
      const dpr = window.devicePixelRatio || 1;
      for (let i = batchStart; i < end; i++) {
        const src = getFrameSrc(i, dpr);
        if (urlCache.has(src)) {
          images[i] = urlCache.get(src)!;
          setTimeout(onLoad, 0);
        } else {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = onLoad;
          img.onerror = onLoad;
          img.src = src;
          urlCache.set(src, img);
          images[i] = img;
        }
      }
      batchStart = end;
      if (batchStart < TOTAL_FRAMES) {
        setTimeout(loadBatch, 16);
      }
    }

    loadBatch();
    return () => { imagesRef.current = []; };
  }, []);

  // Resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Render loop
  const scheduleFrameDraw = useCallback((idx: number) => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const canvas = canvasRef.current;
      const img = imagesRef.current[idx];
      if (!canvas || !img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawResponsive(ctx, img, w, h, isMobile);
      ctx.restore();
    });
  }, [isMobile]);

  // Scroll Subscription
  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest: number) => {
      const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, latest)));
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        scheduleFrameDraw(idx);
      }
    });

    return () => {
      unsubscribe();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [frameIndex, scheduleFrameDraw]);

  // Phase Opacities
  const phase1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const phase2 = useTransform(smoothProgress, [0.2, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const phase3 = useTransform(smoothProgress, [0.55, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const phase4 = useTransform(smoothProgress, [0.8, 0.95], [0, 1]);

  // Phase Y Transforms
  const y1 = useTransform(smoothProgress, [0, 0.25], [0, -50]);
  const y2 = useTransform(smoothProgress, [0.2, 0.35], [50, 0]);
  const y3 = useTransform(smoothProgress, [0.55, 0.7], [50, 0]);
  const y4 = useTransform(smoothProgress, [0.8, 0.95], [50, 0]);

  return (
    <div className="absolute inset-0 z-0 bg-[#0b0b0b] flex flex-col md:flex-row overflow-hidden">
      
      {/* 
        Mobile Master-Fix: Canvas takes top 45vh. 
        On Desktop: Canvas covers full screen.
      */}
      <div className="w-full h-[45vh] md:h-screen md:w-full md:absolute md:inset-0">
        <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full object-cover" />
      </div>

      {/* Cinematic Overlays (Global) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

      {/* Content Layers Container: Bottom 55vh on mobile, Full screen on desktop */}
      <div className="w-full h-[55vh] md:h-screen md:absolute md:inset-0 relative flex items-center justify-center pointer-events-none">
        
        {/* PHASE 1: The Hook */}
        <motion.div 
          style={{ opacity: phase1, y: y1 }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <h1 className="text-[clamp(2rem,6vw,5rem)] font-heading tracking-[0.3em] uppercase bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-bold drop-shadow-2xl">
            ENGINEERED <br className="md:hidden" /> FOR THE EDGE.
          </h1>
        </motion.div>

        {/* PHASE 2: The Specs */}
        <motion.div 
          style={{ opacity: phase2, y: y2 }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-24 items-start"
        >
          <div className="flex flex-col gap-6 backdrop-blur-xl bg-black/40 border border-white/10 p-8 md:p-12 shadow-2xl">
            <h2 className="text-xl md:text-3xl font-heading tracking-[0.3em] uppercase text-[#B71C1C]">
              TECHNICAL DOMINANCE
            </h2>
            <ul className="space-y-4 font-ui text-[rgba(245,245,245,0.8)] text-lg md:text-2xl tracking-widest">
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-[#B71C1C]" /> 0-100 IN 2.1s
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-[#B71C1C]" /> V12 HYBRID ENGINE
              </li>
              <li className="flex items-center gap-4">
                <span className="w-2 h-2 bg-[#B71C1C]" /> HARDWARE ACCELERATED
              </li>
            </ul>
          </div>
        </motion.div>

        {/* PHASE 3: The Social Proof */}
        <motion.div 
          style={{ opacity: phase3, y: y3 }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center"
        >
          <div className="max-w-4xl backdrop-blur-xl bg-black/40 border border-white/10 p-10 md:p-16 shadow-2xl">
            <blockquote className="text-[clamp(1.5rem,4vw,3rem)] font-serif italic text-white/90 leading-snug mb-6">
              "Performance isn't a metric, it's a feeling."
            </blockquote>
            <cite className="font-heading tracking-[0.3em] uppercase text-[#B71C1C] text-sm md:text-lg">
              — Global Tech Review
            </cite>
          </div>
        </motion.div>

        {/* PHASE 4: The Conversion */}
        <motion.div 
          style={{ opacity: phase4, y: y4 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 px-6 md:px-12 pointer-events-auto overflow-y-auto pt-10 pb-20 md:py-0"
        >
          {/* Pricing Configurator */}
          <div className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 w-full max-w-md">
            <h2 className="text-2xl font-heading tracking-[0.3em] uppercase text-white mb-6">
              RESERVE CHASSIS
            </h2>
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-6">
              <span className="font-ui text-white/60 tracking-widest">BASE SPEC</span>
              <span className="font-heading text-3xl text-white tracking-widest">$59<span className="text-sm">/mo</span></span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
              <span className="font-ui text-white/60 tracking-widest text-sm">EST. DELIVERY</span>
              <span className="font-ui text-white tracking-widest text-sm">Q3 2026</span>
            </div>

            <EmailCaptureForm />
          </div>
        </motion.div>

      </div>

      {/* Loading State */}
      {!isReady && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0b0b0b] z-[100]">
          <div className="text-[#B71C1C] text-sm font-heading tracking-[0.5em] animate-pulse">
            BUFFERING ENGINE...
          </div>
        </div>
      )}
    </div>
  );
}
