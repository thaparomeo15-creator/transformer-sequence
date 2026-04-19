'use client'
import { useEffect, useRef } from 'react'
import SplineScene from '@/components/ui/SplineScene'
export default function Showcase() {
  return (
    <section id="showcase" style={{ padding:'var(--space-7) 32px', background:'var(--color-bg)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'64px', alignItems:'center' }}>
          <div style={{ flex:'1 1 400px' }}>
            <div className="text-label" style={{ marginBottom:'32px' }}>// SYSTEM SHOWCASE</div>
            <h2 className="text-section" style={{ marginBottom:'40px' }}>Architecture built for the next decade of the web.</h2>
            <p className="text-body" style={{ marginBottom:'32px' }}>
              We've abstracted the complexity of frame management into a single, high-performance hook. Integrate cinematic sequences into your product with three lines of code.
            </p>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'20px' }}>
              {['Auto-optimized assets', 'Dynamic viewport scaling', 'Integrated audio spatialization'].map((item, i) => (
                <li key={i} style={{ display:'flex', alignItems:'center', gap:'16px', fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'white' }}>
                  <span style={{ color:'var(--accent-cyan)' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={{ flex:'1 1 500px', height:'600px', position:'relative' }}>
            <div style={{ position:'absolute', inset:0, border:'1px solid var(--glass-border)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
              <SplineScene />
            </div>
            {/* Decorative elements */}
            <div style={{ position:'absolute', top:'-20px', right:'-20px', width:'100px', height:'100px', borderRight:'1px solid var(--accent-cyan)', borderTop:'1px solid var(--accent-cyan)', opacity:0.3 }} />
            <div style={{ position:'absolute', bottom:'-20px', left:'-20px', width:'100px', height:'100px', borderLeft:'1px solid var(--accent-cyan)', borderBottom:'1px solid var(--accent-cyan)', opacity:0.3 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
