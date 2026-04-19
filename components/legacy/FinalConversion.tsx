"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function FinalConversion() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="bg-[#B71C1C] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[clamp(1.875rem,5vw,3rem)] font-heading tracking-widest text-white uppercase mb-6"
        >
          READY TO DEPLOY?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-ui text-white/80 text-lg mb-10 tracking-wide"
        >
          Initialize your architecture today and eradicate frame latency from your production pipeline.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button size="lg" className="bg-white text-[#B71C1C] hover:bg-white/90 font-heading tracking-widest text-lg px-8 py-6 rounded-none shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            ACQUIRE LICENSE
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
