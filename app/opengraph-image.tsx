import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ height:'100%', width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#080808', color:'white', fontFamily:'sans-serif' }}>
        <div style={{ position:'absolute', top:0, left:0, width:'100%', height:'100%', backgroundImage:'radial-gradient(circle at center, rgba(0,229,255,0.15) 0%, transparent 70%)', opacity:0.5 }} />
        <div style={{ fontSize:'12px', letterSpacing:'0.4em', color:'rgba(255,255,255,0.4)', marginBottom:'40px' }}>TRANSFORMER SEQUENCE</div>
        <div style={{ fontSize:'80px', fontWeight:'bold', letterSpacing:'-0.05em', marginBottom:'20px' }}>204 FRAMES · ZERO LATENCY</div>
        <div style={{ fontSize:'24px', letterSpacing:'0.2em', color:'rgba(255,255,255,0.6)' }}>CANVAS ENGINE · WORLD CLASS</div>
      </div>
    ),
    { ...size }
  )
}
