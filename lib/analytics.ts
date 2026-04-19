import { track } from '@vercel/analytics'
export const Analytics = {
  scrollDepth: (pct: number) => { try { track('scroll_depth', { percentage: pct }) } catch {} },
  ctaClick: (button: string) => { try { track('cta_click', { button }) } catch {} },
  canvasComplete: (frames: number) => { try { track('canvas_complete', { frames }) } catch {} },
  waitlistOpen: (source: string) => { try { track('waitlist_open', { source }) } catch {} },
  waitlistSubmit: (tier: string) => { try { track('waitlist_submit', { tier }) } catch {} },
  audioToggle: (state: string) => { try { track('audio_toggle', { state }) } catch {} },
}
