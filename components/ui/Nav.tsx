'use client'
import { useEffect, useState } from 'react'
import { enableAudio, disableAudio, getEnabled } from '@/lib/audio'
import { Analytics } from '@/lib/analytics'
import Button from './Button'
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [audio, setAudio] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const toggleAudio = () => {
    const next = !audio
    setAudio(next)
    next ? enableAudio() : disableAudio()
    Analytics.audioToggle(next ? 'on' : 'off')
  }
  const navStyle: React.CSSProperties = { position:'fixed', top:0, left:0, right:0, zIndex:'var(--z-nav)' as any, padding:'0 32px', height:'64px', display:'flex', alignItems:'center', justifyContent:'space-between', transition:'all 0.4s var(--ease-out-expo)', background: scrolled ? 'var(--glass-bg)' : 'transparent', backdropFilter: scrolled ? 'var(--glass-blur)' : 'none', borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent' }
  return (
    <nav style={navStyle}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', fontWeight:'bold', letterSpacing:'0.2em', color:'white' }}>
        // TRANSFORMER
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'40px' }}>
        {['SYSTEM','SPECS','ACQUIRE'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} data-cursor="hover" style={{ color:'var(--color-text-secondary)', fontSize:'0.65rem', fontFamily:'var(--font-mono)', letterSpacing:'0.15em', textDecoration:'none', transition:'color 0.3s' }} onMouseEnter={e => (e.target as HTMLElement).style.color='var(--color-text-primary)'} onMouseLeave={e => (e.target as HTMLElement).style.color='var(--color-text-secondary)'}>{link}</a>
        ))}
        <button onClick={toggleAudio} data-cursor="hover" style={{ background:'none', border:'none', color:'var(--color-text-tertiary)', fontSize:'0.6rem', fontFamily:'var(--font-mono)', letterSpacing:'0.1em', cursor:'pointer' }}>
          AUDIO {audio ? 'ON' : 'OFF'}
        </button>
        <Button variant="outline" onClick={() => { Analytics.ctaClick('nav_initialize'); document.getElementById('pricing')?.scrollIntoView({ behavior:'smooth' }) }}>INITIALIZE</Button>
      </div>
    </nav>
  )
}
