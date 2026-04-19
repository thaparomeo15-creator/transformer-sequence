import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
let lenis: Lenis | null = null
export function initLenis() {
  lenis = new Lenis({ duration: 1.4, easing: (t:number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: 'vertical', smoothWheel: true, wheelMultiplier: 0.8, touchMultiplier: 2 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time:number) => { lenis?.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)
  return lenis
}
export function getLenis() { return lenis }
