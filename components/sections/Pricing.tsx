'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import WaitlistModal from '@/components/ui/WaitlistModal'
const TIERS = [
  { id: 'personal', name: 'Personal', price: '$49', desc: 'Perfect for individual creators and high-end portfolios.', features: ['204 Frame Engine', 'Lenis & GSAP Core', 'Web Worker Architecture', 'Standard Support'] },
  { id: 'pro', name: 'Professional', price: '$149', desc: 'Built for agencies and production-grade applications.', features: ['Unlimited Frames', 'Spline 3D Integration', 'Advanced Audio Engine', 'Priority Clearance', '24/7 Tech Support'] }
]
export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState('personal')
  const openModal = (tier: string) => {
    setSelectedTier(tier)
    setModalOpen(true)
  }
  return (
    <section id="pricing" style={{ padding:'var(--space-7) 32px', background:'var(--color-bg-secondary)', position:'relative' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', textAlign:'center' }}>
        <div className="text-label" style={{ marginBottom:'32px' }}>// SYSTEM ACQUISITION</div>
        <h2 className="text-section" style={{ marginBottom:'64px' }}>Secure your license.</h2>
        
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'32px' }}>
          {TIERS.map((tier) => (
            <div key={tier.id} style={{ flex:'1 1 360px', maxWidth:'420px', background:'var(--color-bg)', border:'1px solid var(--glass-border)', borderRadius:'var(--radius-lg)', padding:'56px', textAlign:'left', display:'flex', flexDirection:'column', gap:'32px', transition:'border-color 0.3s' }} onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,0.3)')} onMouseLeave={e => (e.currentTarget.style.borderColor='var(--glass-border)')}>
              <div>
                <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', color:'var(--accent-cyan)', marginBottom:'16px' }}>{tier.name}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'8px', marginBottom:'16px' }}>
                  <span style={{ fontSize:'3rem', fontWeight:700, color:'white' }}>{tier.price}</span>
                  <span style={{ fontSize:'0.85rem', color:'var(--color-text-tertiary)' }}>/ LICENSE</span>
                </div>
                <p style={{ fontSize:'0.9rem', color:'var(--color-text-secondary)', lineHeight:1.6 }}>{tier.desc}</p>
              </div>
              
              <div style={{ height:'1px', background:'var(--color-border)' }} />
              
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'16px', flexGrow:1 }}>
                {tier.features.map((f, i) => (
                  <li key={i} style={{ display:'flex', alignItems:'center', gap:'12px', fontSize:'0.85rem', color:'var(--color-text-secondary)' }}>
                    <span style={{ color:'var(--accent-cyan)', fontSize:'0.6rem' }}>●</span> {f}
                  </li>
                ))}
              </ul>
              
              <Button variant={tier.id === 'pro' ? 'solid' : 'outline'} onClick={() => openModal(tier.id)} data-cursor="cta" style={{ width:'100%', justifyContent:'center' }}>
                REQUEST ACCESS //
              </Button>
            </div>
          ))}
        </div>
        
        <p style={{ marginTop:'64px', fontSize:'0.75rem', color:'var(--color-text-tertiary)', fontFamily:'var(--font-mono)' }}>
          * ALL LICENSES INCLUDE LIFETIME UPDATES AND CORE DOCUMENTATION.
        </p>
      </div>
      
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} tier={selectedTier} />
    </section>
  )
}
