import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import RootProvider from '@/components/ui/RootProvider'
import '@/styles/globals.css'
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://scratch-hazel-tau.vercel.app'),
  title: { default: 'Transformer Sequence · Canvas Engine', template: '%s · Transformer Sequence' },
  description: 'Zero-latency scroll-driven canvas engine for cinematic product experiences. 204 frames. No lag.',
  openGraph: { type:'website', title:'Transformer Sequence · 204 Frames. Zero Latency.', description:'The scroll-driven canvas engine.', images:[{ url:'/og-image.jpg', width:1200, height:630 }] },
  twitter: { card:'summary_large_image', title:'Transformer Sequence', description:'204 frames. Zero latency.' },
  robots: { index:true, follow:true },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ overscrollBehavior:'none' }}>
        <RootProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </RootProvider>
      </body>
    </html>
  )
}
