'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 204;
const FRAME_PATH = '/frames';

export default function FrameSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bitmapsRef = useRef<ImageBitmap[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Resize logic
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      renderFrame(currentFrame);
    }
  }, [currentFrame]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const bitmaps = bitmapsRef.current;
    if (!canvas || !bitmaps[index]) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    
    const bitmap = bitmaps[index];
    const imgRatio = bitmap.width / bitmap.height;
    const canvasRatio = width / height;

    let drawW, drawH, drawX, drawY;

    if (imgRatio > canvasRatio) {
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    }

    ctx.drawImage(bitmap, drawX, drawY, drawW, drawH);
  };

  useEffect(() => {
    const worker = new Worker(new URL('./frameWorker.ts', import.meta.url));
    
    const urls = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const frameNum = (i + 1).toString().padStart(3, '0');
      // Fallback to placeholder if local frames don't exist yet
      return `${FRAME_PATH}/${frameNum}.webp`;
    });

    worker.postMessage({ urls });

    worker.onmessage = (e) => {
      const data = e.data;
      if (data.type === 'PROGRESS') {
        setProgress((data.loaded / data.total) * 100);
      } else if (data.type === 'COMPLETE') {
        bitmapsRef.current = data.bitmaps;
        setIsLoaded(true);
        renderFrame(0);
      }
    };

    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const frameIdx = Math.floor(self.progress * (TOTAL_FRAMES - 1));
        setCurrentFrame(frameIdx);
        renderFrame(frameIdx);
      },
    });

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      trigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, handleResize]);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* LCP Fallback Placeholder */}
        {!isLoaded && (
          <img 
            src="/frames/001.webp" 
            alt="Sequence Loading" 
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if the frame doesn't exist yet
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1920&fm=webp&auto=format&fit=crop';
            }}
          />
        )}
        
        <canvas 
          ref={canvasRef} 
          className="relative w-full h-full block z-[var(--z-canvas)]"
          style={{ display: isLoaded ? 'block' : 'none' }}
          role="img"
          aria-label="Cinematic product animation showing 204 frames of the Transformer Sequence engine"
        />

        {/* Loading Bar */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[50]">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent-cyan)] transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="mt-4 font-mono text-[0.65rem] text-white/40 tracking-[0.2em] uppercase">
              Initializing Engine · {Math.round(progress)}%
            </div>
          </div>
        )}

        {/* HUD: Frame Counter */}
        {isLoaded && (
          <div className="absolute bottom-10 right-10 z-[20] font-mono text-[0.65rem] text-white/40 tracking-[0.2em] uppercase backdrop-blur-md bg-black/20 border border-white/10 px-4 py-2 rounded-sm">
            FRAME · {currentFrame.toString().padStart(3, '0')} / 204
          </div>
        )}
      </div>
    </div>
  );
}
