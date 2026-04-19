'use client';

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { MotionValue, useTransform } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TransformerScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

// ─── Preload State ────────────────────────────────────────────────────────────

type LoadState = 'idle' | 'loading' | 'ready' | 'error';

// ─── Helper: get frame src ────────────────────────────────────────────────────

function getFrameSrc(folderPath: string, index: number): string {
  // Use realistic Unsplash placeholders to simulate the sequence since local assets are missing
  if (index < 68) {
    return 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop'; // Ferrari / Car
  } else if (index < 136) {
    return 'https://images.unsplash.com/photo-1610492850943-4e4e9766ee5c?q=80&w=2070&auto=format&fit=crop'; // Engine / Transition
  } else {
    return 'https://images.unsplash.com/photo-1601132348500-111c1d0ed412?q=80&w=2070&auto=format&fit=crop'; // Robot / Mech
  }
}

// ─── Helper: object-contain draw ─────────────────────────────────────────────

function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
): void {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasW / canvasH;

  let drawW: number, drawH: number, drawX: number, drawY: number;

  if (imgRatio > canvasRatio) {
    // Image is wider than canvas — letterbox top/bottom
    drawW = canvasW;
    drawH = canvasW / imgRatio;
    drawX = 0;
    drawY = (canvasH - drawH) / 2;
  } else {
    // Image is taller than canvas — pillarbox left/right
    drawH = canvasH;
    drawW = canvasH * imgRatio;
    drawX = (canvasW - drawW) / 2;
    drawY = 0;
  }

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TransformerScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: TransformerScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const [loadedCount, setLoadedCount] = useState(0);

  // Map scroll progress [0,1] → frame index [0, totalFrames - 1]
  const frameIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1],
  );

  // ─── Canvas resize + DPR ──────────────────────────────────────────────────

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Only resize if dimensions actually changed
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      // Re-draw current frame after resize
      const ctx = canvas.getContext('2d');
      if (ctx && imagesRef.current[currentFrameRef.current]) {
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, w, h);
        drawContain(ctx, imagesRef.current[currentFrameRef.current], w, h);
      }
    }
  }, []);

  // ─── Preload frames ───────────────────────────────────────────────────────

  useEffect(() => {
    setLoadState('loading');
    const images: HTMLImageElement[] = new Array(totalFrames);
    let loaded = 0;
    let errored = false;

    // Cache to reuse identical URLs
    const urlCache = new Map<string, HTMLImageElement>();

    const onLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === totalFrames && !errored) {
        imagesRef.current = images;
        setLoadState('ready');
        // Force draw the first frame once ready
        scheduleFrameDraw(0);
      }
    };

    const onError = () => {
      errored = true;
      setLoadState('error');
    };

    const BATCH = 20;
    let batchStart = 0;

    function loadBatch() {
      const end = Math.min(batchStart + BATCH, totalFrames);
      for (let i = batchStart; i < end; i++) {
        const src = getFrameSrc(imageFolderPath, i);

        if (urlCache.has(src)) {
          // Reuse cached image
          images[i] = urlCache.get(src)!;
          // Defer onLoad to next tick to avoid blocking
          setTimeout(onLoad, 0);
        } else {
          // Load new image
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            onLoad();
          };
          img.onerror = onError;
          img.src = src;
          urlCache.set(src, img);
          images[i] = img;
        }
      }
      batchStart = end;
      if (batchStart < totalFrames && !errored) {
        setTimeout(loadBatch, 16);
      }
    }

    loadBatch();

    return () => {
      imagesRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalFrames, imageFolderPath]);

  // ─── Resize listener ─────────────────────────────────────────────────────

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // ─── Render loop on scroll ────────────────────────────────────────────────

  const scheduleFrameDraw = useCallback((idx: number) => {
    if (rafRef.current !== null) return; // already scheduled

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const canvas = canvasRef.current;
      const img = imagesRef.current[idx];
      if (!canvas || !img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      drawContain(ctx, img, w, h);
      ctx.restore();
    });
  }, []);

  // ─── Subscribe to scrollYProgress ────────────────────────────────────────

  useEffect(() => {
    const unsubscribe = frameIndex.on('change', (latest: number) => {
      const idx = Math.round(
        Math.max(0, Math.min(totalFrames - 1, latest)),
      );

      // Only redraw when frame actually changed
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
  }, [frameIndex, totalFrames, scheduleFrameDraw]);

  // ─── Reduced Motion fallback ──────────────────────────────────────────────

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b0b]">
        {/* Static poster placeholder — user supplies the actual poster */}
        <div className="text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${imageFolderPath}/1.jpg`}
            alt="Transformer — Frame 1"
            className="max-w-full max-h-screen object-contain"
          />
          <p className="sr-only">
            Static frame displayed — reduced motion preference detected.
          </p>
        </div>
      </div>
    );
  }

  // ─── Loading overlay ──────────────────────────────────────────────────────

  const loadPercent = Math.round((loadedCount / totalFrames) * 100);

  return (
    <div className="absolute inset-0" role="presentation">
      {/* Screen-reader description */}
      <p className="sr-only" aria-live="polite">
        {loadState === 'loading'
          ? `Loading transformation sequence: ${loadPercent}%`
          : loadState === 'ready'
          ? 'Transformation sequence ready. Scroll to experience the animation.'
          : loadState === 'error'
          ? 'Failed to load transformation sequence.'
          : ''}
      </p>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 block"
        style={{ imageRendering: 'auto' }}
      />

      {/* Loading screen */}
      {loadState !== 'ready' && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#0b0b0b]"
          aria-hidden="true"
        >
          {/* Logo / mark */}
          <div className="mb-12">
            <svg viewBox="0 0 64 64" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="60" height="60" stroke="rgba(245,245,245,0.1)" strokeWidth="1" />
              <path d="M2 18 L2 2 L18 2" stroke="#B71C1C" strokeWidth="1.5" />
              <path d="M62 46 L62 62 L46 62" stroke="#B71C1C" strokeWidth="1.5" />
              <path d="M20 20 L44 44 M44 20 L20 44" stroke="rgba(245,245,245,0.4)" strokeWidth="1" />
              <circle cx="32" cy="32" r="3" fill="#B71C1C" />
            </svg>
          </div>

          {/* Labels */}
          <div
            className="text-[10px] tracking-[0.4em] text-[rgba(245,245,245,0.4)] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            INITIALISING SEQUENCE
          </div>

          {/* Progress bar */}
          <div className="w-48 progress-track">
            <div
              className="progress-fill transition-all duration-75"
              style={{ width: `${loadState === 'error' ? 100 : loadPercent}%` }}
            />
          </div>

          {/* Percentage */}
          <div
            className="text-[9px] tracking-[0.3em] mt-3"
            style={{
              fontFamily: 'var(--font-heading)',
              color: loadState === 'error' ? '#B71C1C' : 'rgba(245,245,245,0.3)',
            }}
          >
            {loadState === 'error'
              ? 'SEQUENCE NOT FOUND — ADD FRAMES TO public/images/transformer-sequence/'
              : `${loadPercent}% / ${totalFrames} FRAMES`}
          </div>
        </div>
      )}
    </div>
  );
}
