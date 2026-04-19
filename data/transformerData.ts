// ─────────────────────────────────────────────────────────────────────────────
// Transformer Sequence — Core Data & Configuration
// ─────────────────────────────────────────────────────────────────────────────

export const SEQUENCE_CONFIG = {
  totalFrames: 204,
  imageFolderPath: '/images/transformer-sequence',
  containerHeight: '500vh',
  audioPath: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e79122fb2.mp3?filename=cinematic-deep-bass-rumble-115042.mp3', // Realistic cinematic ambient drone
} as const;

export const DESIGN_TOKENS = {
  colors: {
    baseDark: '#0b0b0b',
    accentRed: '#B71C1C',
    carbon: '#2a2a2a',
    softWhite: '#f5f5f5',
    dimWhite: 'rgba(245,245,245,0.6)',
    redGlow: 'rgba(183, 28, 28, 0.15)',
  },
  fonts: {
    heading: 'Orbitron',
    ui: 'Rajdhani',
  },
} as const;

// ─── Scroll Phase Definitions ─────────────────────────────────────────────────

export interface ScrollPhase {
  id: string;
  start: number; // 0-1 normalized
  end: number;   // 0-1 normalized
  label: string;
  mood: 'anticipation' | 'chaos' | 'dominance';
}

export const SCROLL_PHASES: ScrollPhase[] = [
  { id: 'presence', start: 0,    end: 0.30, label: 'PHASE I — PRESENCE',   mood: 'anticipation' },
  { id: 'shift',    start: 0.30, end: 0.75, label: 'PHASE II — SHIFT',     mood: 'chaos'        },
  { id: 'arrival',  start: 0.75, end: 1.00, label: 'PHASE III — ARRIVAL',  mood: 'dominance'    },
];

// ─── HUD Copy Lines ───────────────────────────────────────────────────────────

export interface HudLine {
  id: string;
  text: string;
  phase: 'presence' | 'shift' | 'arrival';
  position: 'left' | 'right' | 'bottom-left' | 'bottom-right';
  /** normalised scroll progress at which this line peaks opacity */
  peak: number;
  /** half-width of visible window around peak (in scroll progress units) */
  window: number;
  className?: string;
}

export const HUD_LINES: HudLine[] = [
  // Phase 1 – Presence
  {
    id: 'unit-detected',
    text: 'UNIT DETECTED',
    phase: 'presence',
    position: 'left',
    peak: 0.04,
    window: 0.06,
  },
  {
    id: 'standby',
    text: 'STANDBY',
    phase: 'presence',
    position: 'right',
    peak: 0.08,
    window: 0.05,
  },
  {
    id: 'transformation-seq',
    text: 'TRANSFORMATION SEQUENCE',
    phase: 'presence',
    position: 'left',
    peak: 0.16,
    window: 0.08,
  },
  {
    id: 'initiating',
    text: 'INITIATING ···',
    phase: 'presence',
    position: 'right',
    peak: 0.25,
    window: 0.05,
  },

  // Phase 2 – Shift
  {
    id: 'core-engaged',
    text: 'CORE ENGAGED',
    phase: 'shift',
    position: 'left',
    peak: 0.35,
    window: 0.04,
  },
  {
    id: 'system-shifting',
    text: 'SYSTEM SHIFTING',
    phase: 'shift',
    position: 'right',
    peak: 0.44,
    window: 0.04,
  },
  {
    id: 'armature-lock',
    text: 'ARMATURE LOCK',
    phase: 'shift',
    position: 'left',
    peak: 0.52,
    window: 0.04,
  },
  {
    id: 'reconfigure',
    text: 'RECONFIGURING MASS',
    phase: 'shift',
    position: 'right',
    peak: 0.60,
    window: 0.04,
  },
  {
    id: 'kinetic-transfer',
    text: 'KINETIC TRANSFER ACTIVE',
    phase: 'shift',
    position: 'left',
    peak: 0.68,
    window: 0.04,
  },

  // Phase 3 – Arrival
  {
    id: 'sequence-complete',
    text: 'SEQUENCE COMPLETE',
    phase: 'arrival',
    position: 'right',
    peak: 0.80,
    window: 0.05,
  },
  {
    id: 'arrival-complete',
    text: 'ARRIVAL COMPLETE',
    phase: 'arrival',
    position: 'left',
    peak: 0.88,
    window: 0.06,
  },
  {
    id: 'cinematic',
    text: 'CINEMATIC TRANSFORMATION',
    phase: 'arrival',
    position: 'right',
    peak: 0.95,
    window: 0.05,
  },
];

// ─── Specs Grid Data ──────────────────────────────────────────────────────────

export interface SpecItem {
  id: string;
  value: string;
  label: string;
  description: string;
}

export const SPECS_DATA: SpecItem[] = [
  {
    id: 'frames',
    value: '204',
    label: 'FRAMES',
    description: 'Hand-crafted frame sequence rendered natively on HTML5 Canvas',
  },
  {
    id: 'renderer',
    value: 'CANVAS',
    label: 'RENDERER',
    description: 'High-DPI aware canvas with ctx.drawImage and retina scaling',
  },
  {
    id: 'sync',
    value: 'SCROLL',
    label: 'SYNC',
    description: 'Single source of truth — scrollYProgress from Framer Motion',
  },
  {
    id: 'target-fps',
    value: '60',
    label: 'FPS TARGET',
    description: 'requestAnimationFrame scheduling with dirty-frame optimisation',
  },
  {
    id: 'responsive',
    value: '∞',
    label: 'RESPONSIVE',
    description: 'Object-fit contain logic from mobile to 4K ultrawide',
  },
  {
    id: 'preload',
    value: '100%',
    label: 'PRELOADED',
    description: 'All 204 frames preloaded before sequence begins',
  },
];

// ─── Audio Cue Points ─────────────────────────────────────────────────────────

export const AUDIO_CUE_FRAMES = [60, 110, 170] as const;

// ─── Feature Sections ─────────────────────────────────────────────────────────

export interface FeatureSection {
  id: string;
  tag: string;
  title: string;
  body: string;
}

export const FEATURE_SECTIONS: FeatureSection[] = [
  {
    id: 'creative-direction',
    tag: '01 / CREATIVE DIRECTION',
    title: 'Controlled Chaos, Precise Intent',
    body: 'The sequence was designed to evoke the visceral shock of a military reveal. Dark luxury aesthetics pulled from automotive concept campaigns — every frame selected for maximum cinematic impact.',
  },
  {
    id: 'frame-pipeline',
    tag: '02 / FRAME PIPELINE',
    title: 'Zero-Lag Frame Delivery',
    body: 'All 204 frames are preloaded into memory as HTMLImageElement objects. The canvas redraws only on frame index change — minimising GPU thrash and eliminating flicker across scroll speeds.',
  },
  {
    id: 'motion-system',
    tag: '03 / MOTION SYSTEM',
    title: 'Single Scroll Source of Truth',
    body: `scrollYProgress from Framer Motion's useScroll() is threaded through every layer as a shared MotionValue. No nested hooks. No independent listeners. Perfect synchronisation at all times.`,
  },
  {
    id: 'optimisation',
    tag: '04 / OPTIMISATION',
    title: 'Retina. Responsive. Ruthless.',
    body: 'Canvas scales by devicePixelRatio for sub-pixel clarity on HiDPI displays. Object-fit contain logic keeps the subject centred and unclipped from 375px to 3840px viewport widths.',
  },
];
