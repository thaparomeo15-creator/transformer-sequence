'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Button from '@/components/ui/Button'
import FrameSequence from '@/components/canvas/FrameSequence'
export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!contentRef.current) return
    const tl = gsap.timeline()
    tl.from(contentRef.current.querySelector('h1'), { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' })
      .from(contentRef.current.querySelector('p'), { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from(contentRef.current.querySelector('.cta-group'), { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
  }, [])
  return (
    <section id="system" style={{ position:'relative', minHeight:'100vh', width:'100%' }}>
      <div style={{ position:'absolute', top:0, left:0, width:'100%', zIndex:0 }}>
        <FrameSequence />
      </div>
      
      <div ref={contentRef} style={{ position:'relative', zIndex:10, height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 32px', pointerEvents:'none' }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', letterSpacing:'0.3em', color:'var(--accent-cyan)', marginBottom:'24px', textTransform:'uppercase' }}>// INITIALIZING SEQUENCE</div>
        <h1 className="text-hero" style={{ marginBottom:'32px', maxWidth:'1000px' }}>TRANSFORMER <br/> SEQUENCE</h1>
        <p className="text-body" style={{ maxWidth:'600px', marginBottom:'48px', color:'var(--color-text-secondary)' }}>
          The world's first zero-latency scroll-driven canvas engine.<br/>Built for high-precision cinematic storytelling.
        </p>
        <div className="cta-group" style={{ display:'flex', gap:'16px', pointerEvents:'auto' }}>
          <Button variant="outline" data-cursor="cta" onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior:'smooth' })}>EXPLORE ENGINE</Button>
          <Button variant="ghost" data-cursor="hover" onClick={() => document.getElementById('specs')?.scrollIntoView({ behavior:'smooth' })}>TECHNICAL SPECS</Button>
        </div>
      </div>
    </section>
  )
}
