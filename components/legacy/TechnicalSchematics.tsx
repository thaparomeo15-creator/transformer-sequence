"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Zap, Layers } from "lucide-react"

const features = [
  {
    title: "LOW LATENCY",
    description: "Frames are pre-buffered into a synchronized Map. No network requests are made during the scroll, eliminating lag spikes entirely.",
    icon: Zap,
  },
  {
    title: "ASSET OPTIMIZATION",
    description: "High-resolution sequences are mathematically scaled and compressed. Object-fit algorithms guarantee pixel-perfect fidelity across any viewport.",
    icon: Layers,
  },
  {
    title: "CANVAS RENDERING",
    description: "By bypassing the standard DOM tree and utilizing the raw HTML5 Canvas context, we achieve a locked 60fps equivalent frame rate.",
    icon: Cpu,
  },
]

export function TechnicalSchematics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="bg-[#0b0b0b] py-24 border-t border-[rgba(245,245,245,0.05)] relative">
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="mb-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.5rem,5vw,2.25rem)] font-heading tracking-widest text-[#f5f5f5] uppercase"
          >
            TECHNICAL <span className="text-[#B71C1C]">SCHEMATICS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 border border-[rgba(245,245,245,0.1)] bg-[rgba(11,11,11,0.5)] backdrop-blur-sm group hover:border-[rgba(245,245,245,0.3)] transition-colors"
            >
              <div className="w-12 h-12 bg-[rgba(183,28,28,0.1)] flex items-center justify-center mb-6 group-hover:bg-[#B71C1C] transition-colors">
                <feat.icon className="w-6 h-6 text-[#B71C1C] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading text-lg tracking-widest text-[#f5f5f5] mb-4 uppercase">{feat.title}</h3>
              <p className="font-ui text-[rgba(245,245,245,0.6)] text-sm leading-relaxed tracking-wide">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
