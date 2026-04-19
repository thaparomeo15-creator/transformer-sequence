'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
interface Props { frameCount?: number; basePath?: string }
export default function FrameSequence({ frameCount = 204, basePath = '/frames/' }: Props) {
  const canvasRef = useRef(null)
  const frameMap = useRef<Map<number, ImageBitmap>>(new Map())
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hasFrames, setHasFrames] = useState(false)
  const [currentFrame, setCurrentFrame] = useState(1)
  useEffect(() => {
    const checkFrames = async () => {
      try {
        const res = await fetch(`${basePath}001.webp`, { method: 'HEAD' })
        if (res.ok) { setHasFrames(true); loadFrames() }
        else { setLoading(false) }
      } catch { setLoading(false) }
    }
    const loadFrames = () => {
      const isMobile = window.innerWidth < 768
      const step = isMobile ? 3 : 1
      const urls = Array.from({ length: Math.ceil(frameCount / step) }, (_,i) => `${basePath}${String(i*step+1).padStart(3,'0')}.webp`)
      const worker = new Worker(new URL('./frameWorker.ts', import.meta.url))
      worker.postMessage({ urls })
      worker.onmessage = (e) => {
        if (e.data.type === 'PROGRESS') { setProgress(Math.round((e.data.loaded/e.data.total)*100)) }
        if (e.data.type === 'COMPLETE') {
          e.data.bitmaps.forEach((b: ImageBitmap, i: number) => { if (b) frameMap.current.set(i*step+1, b) })
          setLoading(false)
          setupScrollTrigger()
          worker.terminate()
        }
      }
    }
    const drawFrame = (index: number) => {
      const canvas = canvasRef.current as HTMLCanvasElement | null
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const dpr = window.devicePixelRatio || 1
      const vw = window.innerWidth
      const vh = window.innerHeight
      canvas.width = vw * dpr
      canvas.height = vh * dpr
      ctx.scale(dpr, dpr)
      const bitmap = frameMap.current.get(index)
      if (bitmap) {
        const sw = bitmap.width
        const sh = bitmap.height
        const sRatio = sw / sh
        const vRatio = vw / vh
        let dx, dy, dw, dh
        if (sRatio > vRatio) { dh = vh; dw = vh * sRatio; dx = (vw - dw) / 2; dy = 0 }
        else { dw = vw; dh = vw / sRatio; dx = 0; dy = (vh - dh) / 2 }
        ctx.clearRect(0, 0, vw, vh)
        ctx.drawImage(bitmap, dx, dy, dw, dh)
      }
    }
    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: '#frame-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0,
        onUpdate: (self) => {
          const index = Math.min(frameCount, Math.max(1, Math.round(self.progress * (frameCount-1)) + 1))
          setCurrentFrame(index)
          drawFrame(index)
          if (index >= frameCount) window.dispatchEvent(new CustomEvent('sequenceComplete', { detail: { frames: frameCount } }))
        }
      })
    }
    checkFrames()
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [frameCount, basePath])
  return (
    <div id="frame-container" style={{ height:'600vh', position:'relative', background:'var(--color-bg)' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', width:'100%', overflow:'hidden' }}>

        {!hasFrames && !loading && (
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'white', textAlign:'center', padding:'20px' }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.75rem', letterSpacing:'0.2em', opacity:0.4, marginBottom:'12px' }}>// FRAME SEQUENCE READY</div>
            <div style={{ fontSize:'1.5rem', fontWeight:600, maxWidth:'400px', lineHeight:1.4 }}>ADD 204 WEBP FRAMES TO<br/>/public/frames/001.webp → 204.webp</div>
          </div>
        )}
        
        {loading && hasFrames && (
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:10 }}>
            <div style={{ fontFamily:'var(--font-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', color:'var(--accent-cyan)', marginBottom:'24px' }}>// BUFFERING SEQUENCE</div>
            <div style={{ width:'200px', height:'1px', background:'rgba(255,255,255,0.1)', position:'relative' }}>
              <div style={{ position:'absolute', top:0, left:0, height:'100%', width:`${progress}%`, background:'var(--accent-cyan)', transition:'width 0.3s' }} />
            </div>
            <div style={{ marginTop:'12px', fontFamily:'var(--font-mono)', fontSize:'0.65rem', color:'white', opacity:0.4 }}>{progress}%</div>
          </div>
        )}
        
        <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />
      </div>
    </div>
  )
}
