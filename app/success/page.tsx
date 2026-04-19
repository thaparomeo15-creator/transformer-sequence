'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
export default function SuccessPage() {
  const textRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!textRef.current) return
    const chars = '// ACCESS GRANTED'.split('').map((c, i) => {
      const span = document.createElement('span')
      span.textContent = c
      span.style.opacity = '0'
      return span
    })
    textRef.current.innerHTML = ''
    chars.forEach(c => textRef.current!.appendChild(c))
    gsap.to(chars, { opacity: 1, stagger: 0.05, delay: 0.3, duration: 0.1 })
  }, [])
  return (
    <main style={{ height:'100vh', width:'100%', background:'var(--color-bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px', textAlign:'center' }}>
      <div ref={textRef} style={{ fontFamily:'var(--font-mono)', fontSize:'4rem', fontWeight:'bold', color:'var(--accent-cyan)', marginBottom:'24px', letterSpacing:'-0.05em' }}>
        // ACCESS GRANTED
      </div>
      <p style={{ color:'var(--color-text-secondary)', fontSize:'1rem', maxWidth:'400px', lineHeight:1.6, marginBottom:'48px' }}>
        Your clearance has been confirmed.<br/>Check your email for onboarding details.
      </p>
      <Link href="/" style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'white', textDecoration:'none', letterSpacing:'0.2em', opacity:0.5 }}>
        ← RETURN TO BASE
      </Link>
    </main>
  )
}
