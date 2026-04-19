'use client';

import { useMemo } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
} from 'framer-motion';
import { HUD_LINES, SCROLL_PHASES, SEQUENCE_CONFIG } from '@/data/transformerData';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TransformerExperienceProps {
  scrollYProgress: MotionValue<number>;
}

// ─── Cinematic Overlays ───────────────────────────────────────────────────────

function CinematicOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const vignetteOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.85, 0.3, 0.3, 0.75],
  );

  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: vignetteOpacity,
          background:
            'radial-gradient(ellipse at center, transparent 25%, rgba(11,11,11,0.95) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 scanlines pointer-events-none"
        style={{ opacity: 0.25 }}
        aria-hidden="true"
      />
    </>
  );
}

// ─── Corner Reticle ───────────────────────────────────────────────────────────

function CornerReticle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.05], [0.85, 1]);

  return (
    <motion.div
      className="absolute inset-6 md:inset-10 pointer-events-none"
      style={{ opacity, scale }}
      aria-hidden="true"
    >
      <div className="hud-corner hud-corner--tl" />
      <div className="hud-corner hud-corner--tr" />
      <div className="hud-corner hud-corner--bl" />
      <div className="hud-corner hud-corner--br" />
    </motion.div>
  );
}

// ─── Frame Counter ────────────────────────────────────────────────────────────

function FrameCounter({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const displayFrame = useTransform(scrollYProgress, [0, 1], [1, SEQUENCE_CONFIG.totalFrames]);
  const roundedFrame = useTransform(displayFrame, (v) =>
    String(Math.round(v)).padStart(3, '0'),
  );

  return (
    <div className="flex flex-col gap-1.5" aria-hidden="true">
      <div className="hud-label">FRAME</div>
      <div className="flex items-baseline gap-1.5">
        <motion.span
          className="hud-value tabular-nums"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#f5f5f5',
          }}
        >
          {roundedFrame as unknown as string}
        </motion.span>
        <span className="hud-label">
          / {String(SEQUENCE_CONFIG.totalFrames).padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}

// ─── Progress Rail (Vertical) ─────────────────────────────────────────────────

function ProgressRailVertical({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="relative h-28 w-px" aria-hidden="true">
      <div className="absolute inset-0 bg-[rgba(245,245,245,0.07)]" />
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[#B71C1C]"
        style={{ scaleY, transformOrigin: 'top', height: '100%' }}
      />
    </div>
  );
}

// ─── Progress Rail (Horizontal) ──────────────────────────────────────────────

function ProgressRailHorizontal({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div className="relative h-px w-20" aria-hidden="true">
      <div className="absolute inset-0 bg-[rgba(245,245,245,0.07)]" />
      <motion.div
        className="absolute inset-0 bg-[#B71C1C]"
        style={{ scaleX, transformOrigin: 'left' }}
      />
    </div>
  );
}

// ─── Phase Dot (individual — hooks at top level) ──────────────────────────────

function PhaseDot({
  scrollYProgress,
  start,
  end,
  index,
}: {
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  index: number;
}) {
  const dotOpacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.25, 1, 0.25],
  );
  const dotColor = useTransform(
    scrollYProgress,
    [start, end],
    ['rgba(245,245,245,0.25)', '#B71C1C'],
  );

  return (
    <motion.div className="flex items-center gap-2" style={{ opacity: dotOpacity }}>
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ background: dotColor }}
      />
      <span className="hud-label" style={{ fontSize: '9px' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

// ─── Phase Indicator ──────────────────────────────────────────────────────────

function PhaseIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {SCROLL_PHASES.map((phase, i) => (
        <PhaseDot
          key={phase.id}
          scrollYProgress={scrollYProgress}
          start={phase.start}
          end={phase.end}
          index={i}
        />
      ))}
    </div>
  );
}

// ─── Status Pulse ─────────────────────────────────────────────────────────────

function StatusPulse({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.72, 0.80], [1, 0]);

  return (
    <motion.div className="flex items-center gap-2" style={{ opacity }} aria-hidden="true">
      <div
        className="w-1.5 h-1.5 rounded-full bg-[#B71C1C] animate-pulse-red"
        style={{ boxShadow: '0 0 6px rgba(183,28,28,0.8)' }}
      />
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: '#B71C1C',
        }}
      >
        LIVE
      </span>
    </motion.div>
  );
}

// ─── Classified Tag ───────────────────────────────────────────────────────────

function ClassifiedTag({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  return (
    <motion.div style={{ opacity }} aria-hidden="true">
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '9px',
          letterSpacing: '0.3em',
          color: 'rgba(245,245,245,0.2)',
        }}
      >
        CLASSIFIED ·· TYPE-IV
      </span>
    </motion.div>
  );
}

// ─── Tech Badges ─────────────────────────────────────────────────────────────

function TechBadges({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  return (
    <motion.div
      className="flex flex-col items-end gap-1.5"
      style={{ opacity }}
      aria-hidden="true"
    >
      {['CANVAS API', 'FRAMER MOTION', 'NEXT.JS 14'].map((tag) => (
        <span
          key={tag}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '8px',
            letterSpacing: '0.3em',
            color: 'rgba(245,245,245,0.18)',
          }}
        >
          {tag}
        </span>
      ))}
    </motion.div>
  );
}

// ─── HUD Text Line (individual — hook-safe) ───────────────────────────────────

function HudTextLine({
  text,
  peak,
  window: w,
  position,
  scrollYProgress,
}: {
  text: string;
  peak: number;
  window: number;
  position: 'left' | 'right';
  scrollYProgress: MotionValue<number>;
}) {
  const inStart = Math.max(0, peak - w);
  const outEnd = Math.min(1, peak + w);

  const opacity = useTransform(
    scrollYProgress,
    [inStart, peak, peak, outEnd],
    [0, 1, 1, 0],
  );
  const x = useTransform(
    scrollYProgress,
    [inStart, peak],
    [position === 'right' ? 20 : -20, 0],
  );

  return (
    <motion.div style={{ opacity, x }} aria-hidden="true">
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(9px, 1.1vw, 12px)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#f5f5f5',
          display: 'block',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    </motion.div>
  );
}

// ─── Phase Announcement (individual — hook-safe) ──────────────────────────────

function PhaseAnnouncement({
  phase,
  scrollYProgress,
}: {
  phase: { id: string; label: string; start: number };
  scrollYProgress: MotionValue<number>;
}) {
  const announceOpacity = useTransform(
    scrollYProgress,
    [
      phase.start,
      phase.start + 0.015,
      phase.start + 0.035,
      phase.start + 0.055,
    ],
    [0, 1, 1, 0],
  );
  const announceY = useTransform(
    scrollYProgress,
    [phase.start, phase.start + 0.035],
    [8, 0],
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
      style={{ opacity: announceOpacity, y: announceY }}
      aria-hidden="true"
    >
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(8px, 0.9vw, 10px)',
          letterSpacing: '0.55em',
          color: 'rgba(245,245,245,0.18)',
        }}
      >
        {phase.label}
      </div>
    </motion.div>
  );
}

// ─── Arrival CTA ──────────────────────────────────────────────────────────────

function ArrivalCTA({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);
  const y = useTransform(scrollYProgress, [0.88, 0.95], [20, 0]);

  return (
    <motion.div
      className="flex flex-col items-start gap-4"
      style={{ opacity, y }}
    >
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(8px, 0.85vw, 10px)',
          letterSpacing: '0.35em',
          color: 'rgba(245,245,245,0.3)',
        }}
      >
        SEQUENCE END
      </div>
      <a
        id="cta-portfolio"
        href="#post-sequence"
        className="cta-btn"
        aria-label="Enter portfolio — scroll to case study"
      >
        <span>ENTER PORTFOLIO</span>
        <span aria-hidden="true">→</span>
      </a>
      <a
        id="cta-inquire"
        href="#contact"
        className="cta-btn"
        style={{ borderColor: 'rgba(245,245,245,0.1)' }}
        aria-label="Inquire about this project"
      >
        <span>INQUIRE</span>
      </a>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TransformerExperience({
  scrollYProgress,
}: TransformerExperienceProps) {
  const leftLines = useMemo(
    () => HUD_LINES.filter((l) => l.position === 'left'),
    [],
  );
  const rightLines = useMemo(
    () => HUD_LINES.filter((l) => l.position === 'right'),
    [],
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      role="presentation"
    >
      {/* Screen-reader summary */}
      <div className="sr-only" role="status" aria-live="polite">
        Scroll to animate through 204 frames of a truck transforming into a humanoid robot.
      </div>

      {/* Cinematic vignette + scanlines */}
      <CinematicOverlay scrollYProgress={scrollYProgress} />

      {/* Corner reticle */}
      <CornerReticle scrollYProgress={scrollYProgress} />

      {/* TOP LEFT: frame counter + vertical rail + phase dots */}
      <div className="absolute top-20 left-6 md:left-10 lg:left-16 flex flex-col gap-5">
        <FrameCounter scrollYProgress={scrollYProgress} />
        <ProgressRailVertical scrollYProgress={scrollYProgress} />
        <PhaseIndicator scrollYProgress={scrollYProgress} />
      </div>

      {/* TOP RIGHT: live pulse + horizontal rail + classified tag */}
      <div className="absolute top-20 right-6 md:right-10 lg:right-16 flex flex-col items-end gap-3">
        <StatusPulse scrollYProgress={scrollYProgress} />
        <ProgressRailHorizontal scrollYProgress={scrollYProgress} />
        <ClassifiedTag scrollYProgress={scrollYProgress} />
      </div>

      {/* LEFT RAIL: HUD copy lines */}
      <div className="absolute left-6 md:left-10 lg:left-16 top-1/2 -translate-y-1/2 flex flex-col gap-5 max-w-[220px]">
        {leftLines.map((line) => (
          <HudTextLine
            key={line.id}
            text={line.text}
            peak={line.peak}
            window={line.window}
            position="left"
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* RIGHT RAIL: HUD copy lines */}
      <div className="absolute right-6 md:right-10 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-end gap-5 max-w-[220px]">
        {rightLines.map((line) => (
          <HudTextLine
            key={line.id}
            text={line.text}
            peak={line.peak}
            window={line.window}
            position="right"
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* CENTRE: phase flash announcements */}
      {SCROLL_PHASES.map((phase) => (
        <PhaseAnnouncement
          key={`announce-${phase.id}`}
          phase={phase}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* BOTTOM LEFT: arrival CTA (pointer-events re-enabled) */}
      <div className="absolute bottom-10 left-6 md:left-10 lg:left-16 pointer-events-auto">
        <ArrivalCTA scrollYProgress={scrollYProgress} />
      </div>

      {/* BOTTOM RIGHT: tech stack badges */}
      <div className="absolute bottom-10 right-6 md:right-10 lg:right-16">
        <TechBadges scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
