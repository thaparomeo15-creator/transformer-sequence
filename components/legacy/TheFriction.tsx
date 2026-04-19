"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export function TheFriction() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="bg-[#0b0b0b] py-24 sm:py-32 relative overflow-hidden border-t border-[rgba(245,245,245,0.05)]">
      {/* Background elements */}
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B71C1C]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-sm font-heading tracking-[0.4em] text-[#B71C1C] mb-4">THE FRICTION</h2>
            <p className="text-[clamp(1.875rem,5vw,3rem)] font-heading tracking-widest text-[#f5f5f5] uppercase leading-[1.1] mb-6">
              STANDARD ANIMATIONS <br/>
              <span className="text-[rgba(245,245,245,0.3)]">FAIL AT SCALE.</span>
            </p>
            <div className="space-y-6 font-ui text-[rgba(245,245,245,0.6)] text-lg tracking-wide leading-relaxed">
              <p>
                Video files cause unacceptable load times. CSS animations drop frames when the main thread clogs. WebGL is often overkill, draining battery and alienating mobile users.
              </p>
              <p>
                When you are selling high-end products, <span className="text-[#f5f5f5]">jank is not an option.</span> Your users demand flawless execution. Any stutter breaks the illusion of quality.
              </p>
            </div>
          </motion.div>

          {/* Glitch / Metric Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative border border-[rgba(245,245,245,0.1)] bg-[rgba(11,11,11,0.5)] p-8 backdrop-blur-md overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B71C1C] to-transparent opacity-50" />
            
            <div className="flex flex-col gap-8">
              <div>
                <div className="text-[10px] font-heading tracking-[0.3em] text-[rgba(245,245,245,0.4)] mb-2">CSS / VIDEO RENDER LATENCY</div>
                <div className="text-4xl font-heading text-[#B71C1C] tracking-wider flex items-baseline gap-2">
                  145<span className="text-lg">ms</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#B71C1C]/60 ml-2">(CRITICAL FRAME DROP)</span>
                </div>
              </div>
              
              <div className="h-px w-full bg-[rgba(245,245,245,0.1)] relative">
                <div className="absolute top-0 left-0 h-full w-[80%] bg-[#B71C1C]/20" />
              </div>

              <div>
                <div className="text-[10px] font-heading tracking-[0.3em] text-[#00ff88] mb-2">CANVAS FRAME-SEQUENCING</div>
                <div className="text-4xl font-heading text-[#f5f5f5] tracking-wider flex items-baseline gap-2">
                  0<span className="text-lg">ms</span>
                  <span className="text-[10px] tracking-[0.2em] text-[#00ff88]/60 ml-2">(LOCKED TO SCROLL)</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
