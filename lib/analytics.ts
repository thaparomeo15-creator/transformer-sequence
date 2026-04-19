import { track } from '@vercel/analytics';

export const Analytics = {
  scrollDepth: (pct: 25 | 50 | 75 | 100) => track('scroll_depth', { percentage: pct }),
  ctaClick: (button: string) => track('cta_click', { button }),
  canvasComplete: (framesViewed: number) => track('canvas_complete', { framesViewed }),
  waitlistOpen: (source: string) => track('waitlist_open', { source }),
  waitlistSubmit: (tier: string) => track('waitlist_submit', { tier }),
  audioToggle: (state: 'on' | 'off') => track('audio_toggle', { state }),
};
