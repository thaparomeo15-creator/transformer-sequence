'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { MotionValue, useTransform } from 'framer-motion';
import { SEQUENCE_CONFIG, AUDIO_CUE_FRAMES } from '@/data/transformerData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AudioEngineProps {
  scrollYProgress: MotionValue<number>;
}

// ─── Helper: map frame index from scroll ─────────────────────────────────────

function scrollToFrame(progress: number, total: number): number {
  return Math.round(Math.max(0, Math.min(total - 1, progress * (total - 1))));
}

// ─── Volume Icon ──────────────────────────────────────────────────────────────

function VolumeIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Speaker body */}
      <path
        d="M11 5L6 9H2v6h4l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {muted ? (
        /* X lines when muted */
        <>
          <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        /* Wave arcs when unmuted */
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ─── AudioEngine ──────────────────────────────────────────────────────────────

export default function AudioEngine({ scrollYProgress }: AudioEngineProps) {
  const [muted, setMuted] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const howlRef = useRef<import('howler').Howl | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const cueHowlsRef = useRef<Map<number, import('howler').Howl>>(new Map());

  // ─── Initialise Howler lazily (only when user unmutes) ───────────────────

  const initAudio = useCallback(async () => {
    if (howlRef.current || !SEQUENCE_CONFIG.audioPath) {
      setAudioReady(true);
      return;
    }

    try {
      const { Howl } = await import('howler');

      // Ambient loop
      howlRef.current = new Howl({
        src: [SEQUENCE_CONFIG.audioPath],
        loop: true,
        volume: 0.18,
        autoplay: false,
      });

      // Synthetic cue tones — low-frequency sine bursts
      // In production, replace with real bass hit SFX files
      AUDIO_CUE_FRAMES.forEach((frame) => {
        const cue = new Howl({
          src: [SEQUENCE_CONFIG.audioPath as string], // fallback to same file
          sprite: { hit: [0, 800] },
          volume: 0.45,
          rate: 0.5 + Math.random() * 0.2, // slight pitch variation
        });
        cueHowlsRef.current.set(frame, cue);
      });

      setAudioReady(true);
    } catch {
      // Audio not available — fail silently
    }
  }, []);

  // ─── Toggle mute ────────────────────────────────────────────────────────

  const handleToggle = useCallback(async () => {
    if (!audioReady) await initAudio();

    setMuted((prev) => {
      const next = !prev;
      if (howlRef.current) {
        if (next) {
          howlRef.current.fade(howlRef.current.volume(), 0, 400);
          setTimeout(() => howlRef.current?.pause(), 400);
        } else {
          howlRef.current.play();
          howlRef.current.fade(0, 0.18, 600);
        }
      }
      return next;
    });
  }, [audioReady, initAudio]);

  // ─── Monitor scroll → trigger cue hits ──────────────────────────────────

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const frame = scrollToFrame(v, SEQUENCE_CONFIG.totalFrames);

      if (!muted && frame !== lastFrameRef.current) {
        const cueHowl = cueHowlsRef.current.get(frame);
        if (cueHowl) {
          cueHowl.play('hit');
        }
        lastFrameRef.current = frame;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, muted]);

  // ─── Cleanup ─────────────────────────────────────────────────────────────

  useEffect(() => {
    return () => {
      howlRef.current?.unload();
      cueHowlsRef.current.forEach((h) => h.unload());
    };
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────

  // Only show button if audio path is configured
  if (!SEQUENCE_CONFIG.audioPath && process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      id="audio-toggle"
      onClick={handleToggle}
      aria-label={muted ? 'Enable audio' : 'Mute audio'}
      aria-pressed={!muted}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3 py-2 pointer-events-auto"
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '9px',
        letterSpacing: '0.25em',
        color: muted ? 'rgba(245,245,245,0.35)' : '#f5f5f5',
        background: 'rgba(11,11,11,0.6)',
        border: `1px solid ${muted ? 'rgba(245,245,245,0.08)' : 'rgba(183,28,28,0.4)'}`,
        backdropFilter: 'blur(12px)',
        transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)',
        cursor: 'pointer',
      }}
    >
      <VolumeIcon muted={muted} />
      <span>{muted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
    </button>
  );
}
