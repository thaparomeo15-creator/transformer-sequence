'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const SPECS = [
  { label: 'RESOLUTION', value: '8K NATIVE', desc: 'Retina-ready frame rendering at 120fps.' },
  { label: 'LATENCY', value: '0.00ms', desc: 'Zero-latency synchronization with the scroll thread.' },
  { label: 'BUFFERING', value: 'WORKER-DRIVEN', desc: 'Off-thread image decoding prevents UI blocking.' },
  { label: 'ADAPTIVE', value: 'DEVICE-AWARE', desc: 'Automatically scales quality based on hardware power.' }
]
export default function Specs() {
  const containerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.spec-card')
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })
  }, [])
  return (
    <section id="specs" ref={containerRef} style={{ padding:'var(--space-7) 32px', background:'var(--color-bg-secondary)', borderTop:'1px solid var(--color-border)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div className="text-label" style={{ marginBottom:'64px' }}>// TECHNICAL SPECIFICATIONS</div>
        
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'2px', background:'var(--color-border)' }}>
          {SPECS.map((spec, i) => (
            <div key={i} className="spec-card" style={{ background:'var(--color-bg-secondary)', padding:'48px', display:'flex', flexDirection:'column', gap:'24px' }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--color-text-tertiary)' }}>{spec.label}</div>
              <div className="text-data" style={{ fontSize:'2rem', fontWeight:700, color:'white', letterSpacing:'-0.02em' }}>{spec.value}</div>
              <p style={{ fontSize:'0.85rem', color:'var(--color-text-secondary)', lineHeight:1.6 }}>{spec.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop:'var(--space-6)', display:'flex', justifyContent:'flex-end' }}>
          <div style={{ maxWidth:'500px' }}>
            <p className="text-body" style={{ fontStyle:'italic' }}>
              "The architecture leverages Transferable Objects and OffscreenCanvas protocols to achieve a level of fluidity previously impossible in the browser environment."
            </p>
            <div style={{ marginTop:'24px', fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'var(--accent-cyan)' }}>// DR. ARIS THORNE, LEAD ARCHITECT</div>
          </div>
        </div>
      </div>
    </section>
  )
}
