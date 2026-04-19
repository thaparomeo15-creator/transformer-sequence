'use client'
import { useEffect, useRef, useState } from 'react'
export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [isMobile, setIsMobile] = useState(true)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsMobile(false)
    let mx = 0, my = 0, ox = 0, oy = 0, ix = 0, iy = 0
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY })
    const raf = () => {
      ox += (mx - ox) * 0.10; oy += (my - oy) * 0.10
      ix += (mx - ix) * 0.18; iy += (my - iy) * 0.18
      if (outerRef.current) outerRef.current.style.transform = `translate(${ox}px,${oy}px) translate(-50%,-50%)`
      if (innerRef.current) innerRef.current.style.transform = `translate(${ix}px,${iy}px) translate(-50%,-50%)`
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const handleEnter = (e: Event) => {
      const el = e.target as HTMLElement
      const type = el.closest('[data-cursor]')?.getAttribute('data-cursor')
      const lbl = el.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || ''
      setLabel(lbl)
      if (outerRef.current) {
        outerRef.current.style.width = type === 'drag' ? '64px' : type === 'cta' ? '56px' : type === 'hover' ? '48px' : '40px'
        outerRef.current.style.height = outerRef.current.style.width
        if (type === 'cta') outerRef.current.style.background = 'rgba(0,229,255,0.15)'
        else outerRef.current.style.background = 'transparent'
      }
    }
    const handleLeave = () => {
      setLabel('')
      if (outerRef.current) { outerRef.current.style.width = '40px'; outerRef.current.style.height = '40px'; outerRef.current.style.background = 'transparent' }
    }
    document.querySelectorAll('[data-cursor]').forEach(el => { el.addEventListener('mouseenter', handleEnter); el.addEventListener('mouseleave', handleLeave) })
    const observer = new MutationObserver(() => {
      document.querySelectorAll('[data-cursor]').forEach(el => { el.addEventListener('mouseenter', handleEnter); el.addEventListener('mouseleave', handleLeave) })
    })
    observer.observe(document.body, { childList: true, subtree: true })
  }, [])
  if (isMobile) return null
  return (
    <>
      <div ref={outerRef} style={{ position:'fixed', top:0, left:0, width:'40px', height:'40px', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'50%', pointerEvents:'none', zIndex:9999, mixBlendMode:'difference', display:'flex', alignItems:'center', justifyContent:'center', transition:'width 0.3s, height 0.3s, background 0.3s' }}>
        {label && <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.1em', color:'white' }}>{label}</span>}
      </div>
      <div ref={innerRef} style={{ position:'fixed', top:0, left:0, width:'6px', height:'6px', background:'white', borderRadius:'50%', pointerEvents:'none', zIndex:9999, mixBlendMode:'difference' }} />
    </>
  )
}
