import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '@/styles/globals.css';
import RootProvider from '@/components/RootProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://scratch-hazel-tau.vercel.app'),
  title: {
    default: 'Transformer Sequence · Canvas Engine',
    template: '%s · Transformer Sequence',
  },
  description: 'Zero-latency scroll-driven canvas engine for cinematic product experiences. 204 frames. No lag. Built for impact.',
  keywords: ['canvas animation', 'scroll-driven', 'cinematic web', 'frame sequence', 'WebGL alternative'],
  authors: [{ name: 'Transformer Sequence' }],
  openGraph: {
    type: 'website',
    url: 'https://scratch-hazel-tau.vercel.app',
    title: 'Transformer Sequence · 204 Frames. Zero Latency.',
    description: 'The scroll-driven canvas engine. Pre-buffered frames. Locked to your scroll.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Transformer Sequence' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transformer Sequence',
    description: '204 frames. Zero latency. Scroll-driven canvas engine.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="bg-[#080808]">
        <RootProvider>
          {children}
        </RootProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Transformer Sequence",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": [
                { "@type": "Offer", "name": "Personal", "price": "59", "priceCurrency": "USD", "billingIncrement": "P1M" },
                { "@type": "Offer", "name": "Pro", "price": "149", "priceCurrency": "USD", "billingIncrement": "P1M" }
              ],
              "description": "Scroll-driven canvas engine for cinematic web experiences."
            })
          }}
        />
      </body>
    </html>
  );
}
