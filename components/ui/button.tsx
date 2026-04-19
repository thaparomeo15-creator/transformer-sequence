'use client'
import { useState } from 'react'
import { playTick } from '@/lib/audio'
interface ButtonProps { children: React.ReactNode; onClick?: () => void; variant?: 'outline'|'solid'|'ghost'; loading?: boolean; className?: string; 'data-cursor-label'?: string }
export default function Button({ children, onClick, variant='outline', loading=false, className='', ...props }: ButtonProps) {
  const [active, setActive] = useState(false)
  const base: React.CSSProperties = { fontFamily:'var(--font-mono)', fontSize:'0.7rem', letterSpacing:'0.15em', textTransform:'uppercase', padding:'14px 32px', borderRadius:'var(--radius-sm)', position:'relative', overflow:'hidden', cursor:'pointer', transition:'all 0.3s var(--ease-out-expo)', border:'1px solid var(--glass-border)', background:'transparent', color:'var(--color-text-primary)', display:'inline-flex', alignItems:'center', gap:'8px' }
  return (
    <button 
      {...props}
      style={{ ...base, opacity: loading ? 0.6 : 1, transform: active ? 'scale(0.97)' : 'scale(1)' }}
      onMouseEnter={() => playTick()}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onClick={loading ? undefined : onClick}
      disabled={loading}
      className={`shimmer-btn ${className}`}
    >
      {loading ? <span className="animate-spin">◌</span> : null}
      {children}
      <style jsx>{`
        .shimmer-btn::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transition: all 0.6s var(--ease-out-expo);
        }
        .shimmer-btn:hover::after { left: 150%; }
      `}</style>
    </button>
  )
}
