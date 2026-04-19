'use client'
import { useState } from 'react'
const FAQS = [
  { q: 'Is there a limit to the number of frames?', a: 'The Personal license supports up to 204 frames. The Professional license allows for unlimited frame sequences, restricted only by the user\'s hardware capabilities.' },
  { q: 'Can I use this with React and Next.js?', a: 'Yes, Transformer Sequence is built specifically for the Next.js ecosystem, though the core canvas engine can be ported to any modern JavaScript framework.' },
  { q: 'What asset formats are supported?', a: 'We recommend WebP for the best balance of quality and performance, but the engine supports any standard web-compatible image format (AVIF, PNG, JPG).' },
  { q: 'How does the pricing work?', a: 'Pricing is a one-time license fee per project. Agencies can contact us for multi-project enterprise licensing.' }
]
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="faq" style={{ padding:'var(--space-7) 32px', background:'var(--color-bg)' }}>
      <div style={{ maxWidth:'800px', margin:'0 auto' }}>
        <div className="text-label" style={{ marginBottom:'48px', textAlign:'center' }}>// COMMON INQUIRIES</div>
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ border:'1px solid var(--glass-border)', borderRadius:'var(--radius-md)', overflow:'hidden', transition:'border-color 0.3s' }}>
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-cursor="hover"
                style={{ width:'100%', padding:'24px 32px', background:'none', border:'none', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', textAlign:'left' }}
              >
                <span style={{ fontSize:'1rem', fontWeight:600, color:'white' }}>{faq.q}</span>
                <span style={{ color:'var(--accent-cyan)', fontSize:'1.2rem', transition:'transform 0.4s' }} style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
              </button>
              <div style={{ maxHeight: openIndex === i ? '200px' : '0', overflow:'hidden', transition:'max-height 0.4s var(--ease-out-expo)' }}>
                <div style={{ padding:'0 32px 32px 32px', color:'var(--color-text-secondary)', fontSize:'0.9rem', lineHeight:1.7 }}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
