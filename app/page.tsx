import Nav from '@/components/ui/Nav';
import Cursor from '@/components/ui/Cursor';
import FrameSequence from '@/components/canvas/FrameSequence';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Specs from '@/components/sections/Specs';
import Showcase from '@/components/sections/Showcase';
import Pricing from '@/components/sections/Pricing';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Interaction Layer */}
      <Cursor />
      <Nav />

      {/* Hero SCENE (Sticky Canvas) */}
      <section id="hero-container" className="relative">
        <FrameSequence />
        <Hero />
      </section>

      {/* Sequential Scrollytelling Scenes */}
      <div className="relative z-[var(--z-content)] bg-[var(--color-bg)]">
        <Problem />
        <Specs />
        <Showcase />
        <Pricing />
        <FAQ />
        <Footer />
      </div>

      {/* Accessibility labels */}
      <div className="sr-only">
        <h1>Transformer Sequence - Cinematic Canvas Engine</h1>
        <p>A high-performance scroll-driven experience demonstrating zero-latency frame sequencing.</p>
      </div>
    </main>
  );
}
