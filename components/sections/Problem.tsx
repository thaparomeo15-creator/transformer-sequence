'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!sectionRef.current) return
    const lines = sectionRef.current.querySelectorAll('.reveal-line')
    lines.forEach((line) => {
      gsap.from(line, {
        opacity: 0.1,
        y: 20,
        duration: 1,
        scrollTrigger: {
          trigger: line,
          start: 'top 85%',
          end: 'top 50%',
          scrub: true,
        }
      })
    })
  }, [])
  return (
    <section id="problem" ref={sectionRef} style={{ padding:'var(--space-7) 32px', background:'var(--color-bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
      <div style={{ maxWidth:'1200px', width:'100%' }}>
        <div className="text-label" style={{ marginBottom:'48px' }}>// THE FRICTION</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          <h2 className="text-section reveal-line" style={{ maxWidth:'900px' }}>Standard web video is static.</h2>
          <h2 className="text-section reveal-line" style={{ maxWidth:'900px', color:'var(--color-text-tertiary)' }}>Lottie animations are expensive.</h2>
          <h2 className="text-section reveal-line" style={{ maxWidth:'900px' }}>Traditional canvas engines are heavy.</h2>
        </div>
        
        <div style={{ marginTop:'var(--space-6)', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'48px' }}>
          <div className="reveal-line">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent-cyan)', marginBottom:'16px' }}>01 / THE LAG</div>
            <p className="text-body">Frames drop when the main thread is blocked. User experience suffers when the connection between scroll and visual is severed.</p>
          </div>
          <div className="reveal-line">
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent-cyan)', marginBottom:'16px' }}>02 / THE WEIGHT</div>
            <p className="text-body">High-resolution assets shouldn't mean high-latency loads. Traditional engines force users to wait for the entire sequence.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
