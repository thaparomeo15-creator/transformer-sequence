'use client'
import { useEffect } from 'react'
import { initLenis, getLenis } from '@/lib/lenis'
export default function RootProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis()
    return () => { lenis?.destroy() }
  }, [])
  return <>{children}</>
}
