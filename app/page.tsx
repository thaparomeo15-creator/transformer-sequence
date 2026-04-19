import Nav from '@/components/ui/Nav'
import Cursor from '@/components/ui/Cursor'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import Specs from '@/components/sections/Specs'
import Showcase from '@/components/sections/Showcase'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
export default function Home() {
  return (
    <main>
      <Nav />
      <Cursor />
      
      <Hero />
      <Problem />
      <Specs />
      <Showcase />
      <Pricing />
      
      <FAQ />
      <Footer />
    </main>
  )
}
