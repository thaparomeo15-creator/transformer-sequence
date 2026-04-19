'use client'
import { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })
interface Props { sceneUrl?: string }
export default function SplineScene({ sceneUrl = '' }: Props) {
  const [useFallback, setUseFallback] = useState(false)
  useEffect(() => {
    const isLowEnd = navigator.hardwareConcurrency < 4
    const isMobile = window.innerWidth < 768
    if (isLowEnd || isMobile || !sceneUrl) setUseFallback(true)
  }, [sceneUrl])
  if (useFallback || !sceneUrl) return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border:'1px solid var(--glass-border)', background:'rgba(255,255,255,0.02)', borderRadius:'var(--radius-lg)' }}>
      <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', opacity:0.3, marginBottom:'12px' }}>// 3D ENGINE READY</div>
      <div style={{ color:'var(--color-text-tertiary)', fontSize:'0.75rem', textAlign:'center', maxWidth:'280px', lineHeight:1.6 }}>ADD YOUR SPLINE SCENE URL<br/>TO SplineScene COMPONENT PROPS</div>
    </div>
  )
  return (
    <div style={{ width:'100%', height:'100%', position:'relative' }}>
      <Suspense fallback={<div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.02)' }} />}>
        <Spline scene={sceneUrl} onError={() => setUseFallback(true)} />
      </Suspense>
    </div>
  )
}
