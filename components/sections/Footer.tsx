'use client'
export default function Footer() {
  return (
    <footer style={{ padding:'var(--space-6) 32px var(--space-4)', background:'var(--color-bg)', borderTop:'1px solid var(--color-border)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:'64px', marginBottom:'80px' }}>
          <div style={{ flex:'1 1 300px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'1rem', fontWeight:'bold', letterSpacing:'0.2em', color:'white', marginBottom:'24px' }}>
              // TRANSFORMER
            </div>
            <p style={{ fontSize:'0.85rem', color:'var(--color-text-tertiary)', maxWidth:'280px', lineHeight:1.6 }}>
              The high-performance scroll engine for the modern web. Built by creative engineers for digital visionaries.
            </p>
          </div>
          
          <div style={{ display:'flex', gap:'80px', flexWrap:'wrap' }}>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent-cyan)', marginBottom:'24px', letterSpacing:'0.2em' }}>ENGINE</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Documentation', 'Showcase', 'Benchmarks', 'Release Notes'].map(l => (
                  <li key={l}><a href="#" data-cursor="hover" style={{ color:'var(--color-text-secondary)', fontSize:'0.75rem', textDecoration:'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--accent-cyan)', marginBottom:'24px', letterSpacing:'0.2em' }}>CONNECT</div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'12px' }}>
                {['GitHub', 'Twitter / X', 'Discord', 'Email'].map(l => (
                  <li key={l}><a href="#" data-cursor="hover" style={{ color:'var(--color-text-secondary)', fontSize:'0.75rem', textDecoration:'none' }}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:'24px', paddingTop:'32px', borderTop:'1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--color-text-tertiary)' }}>
            © 2026 TRANSFORMER SEQUENCE. ALL RIGHTS RESERVED.
          </div>
          <div style={{ display:'flex', gap:'32px' }}>
            {['PRIVACY', 'TERMS', 'SECURITY'].map(l => (
              <a key={l} href="#" style={{ fontFamily:'var(--font-mono)', fontSize:'0.6rem', color:'var(--color-text-tertiary)', textDecoration:'none', letterSpacing:'0.1em' }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
