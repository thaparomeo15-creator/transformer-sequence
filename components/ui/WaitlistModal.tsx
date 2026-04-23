'use client'
import { useState, useEffect } from 'react'
import Button from './Button'
import { Analytics } from '@/lib/analytics'
interface Props { isOpen: boolean; onClose: () => void; tier: string }
export default function WaitlistModal({ isOpen, onClose, tier }: Props) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [message, setMessage] = useState('')
  const [referralCode, setReferralCode] = useState('')
  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler) }, [onClose])
  if (!isOpen) return null
  const submit = async () => {
    if (!email || !email.includes('@')) { setState('error'); setMessage('// INVALID SIGNAL — ENTER A VALID EMAIL'); return }
    setState('loading')
    Analytics.waitlistSubmit(tier)
    try {
      const res = await fetch('/api/waitlist', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, tier }) })
      const data = await res.json()
      if (data.code === 'DUPLICATE' || data.error === 'Already registered') { 
        setState('error')
        setMessage('You are already on the list! We have your transmission saved.') 
      }
      else if (data.success) { setState('success'); setReferralCode(data.referralCode) }
      else { 
        setState('error'); 
        setMessage(data.details ? `// FAILED: ${data.details.toUpperCase()}` : (data.error || '// TRANSMISSION FAILED — TRY AGAIN'));
      }
    } catch { setState('error'); setMessage('// CONNECTION ERROR — TRY AGAIN') }
  }
  return (
    <div style={{ position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px' }}>
      <div onClick={onClose} style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(8px)' }} />
      <div onClick={e => e.stopPropagation()} style={{ background:'var(--color-bg-secondary)', border:'1px solid var(--glass-border)', backdropFilter:'var(--glass-blur)', borderRadius:'var(--radius-lg)', padding:'48px', maxWidth:'480px', width:'100%', position:'relative', zIndex:10 }}>
        <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', color:'var(--accent-cyan)', marginBottom:'12px' }}>// REQUESTING ACCESS</div>
        <h2 style={{ fontSize:'2rem', fontWeight:600, color:'white', marginBottom:'32px', letterSpacing:'-0.03em' }}>{tier.toUpperCase()} CLEARANCE</h2>
        
        {state === 'success' ? (
          <div style={{ textAlign:'center' }}>
            <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid var(--glass-border)', padding:'32px', borderRadius:'var(--radius-sm)', marginBottom:'32px' }}>
              <div style={{ fontSize:'0.6rem', fontFamily:'var(--font-mono)', color:'var(--color-text-tertiary)', marginBottom:'12px' }}>YOUR REFERRAL CODE</div>
              <div style={{ fontSize:'2rem', fontFamily:'var(--font-mono)', fontWeight:'bold', color:'white', letterSpacing:'0.2em' }}>{referralCode}</div>
            </div>
            <p style={{ color:'var(--color-text-secondary)', fontSize:'0.9rem', lineHeight:1.6, marginBottom:'32px' }}>Confirmation sent to {email}</p>
            <Button variant="solid" style={{ width:'100%', background:'#10b981', borderColor:'#10b981', color:'white' }} data-cursor="hover">
              SUCCESS! ✓
            </Button>
          </div>
        ) : (
          <>
            <input value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} placeholder="your@email.com" style={{ width:'100%', background:'rgba(255,255,255,0.04)', border:'1px solid var(--glass-border)', borderRadius:'var(--radius-sm)', padding:'14px 16px', color:'var(--color-text-primary)', fontFamily:'var(--font-mono)', fontSize:'0.85rem', marginBottom:'16px', outline:'none' }} />
            {state === 'error' && <div style={{ color: message.includes('already') ? 'var(--accent-cyan)' : '#ff4444', fontSize:'0.65rem', fontFamily:'var(--font-mono)', marginBottom:'16px', lineHeight:1.4 }}>{message}</div>}
            <Button variant="solid" loading={state === 'loading'} onClick={submit} className="w-full" style={{ width:'100%' }}>TRANSMIT REQUEST</Button>
          </>
        )}
        <button onClick={onClose} style={{ position:'absolute', top:'24px', right:'24px', background:'none', border:'none', color:'var(--color-text-tertiary)', cursor:'pointer', fontSize:'1.2rem' }}>×</button>
      </div>
    </div>
  )
}
