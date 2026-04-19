'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(m => ({ default: m.Player })), { ssr: false })
interface Props { src: string; autoplay?: boolean; loop?: boolean; style?: React.CSSProperties; onComplete?: () => void }
export default function LottiePlayer({ src, autoplay=true, loop=false, style, onComplete }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return <Player src={src} autoplay={autoplay} loop={loop} style={style} onEvent={(e) => { if (e === 'complete' && onComplete) onComplete() }} />
}
