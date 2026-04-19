"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const projects = [
  { id: "01", title: "PROJECT OMEGA", type: "AUTOMOTIVE" },
  { id: "02", title: "NEBULA DRIVE", type: "CONSUMER ELECTRONICS" },
  { id: "03", title: "AEROSPACE X", type: "INDUSTRIAL" },
  { id: "04", title: "QUANTUM CORE", type: "WEARABLES" },
]

export function ProjectShowcase() {
  const targetRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: "-10%" })

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // Horizontal scroll mapping
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#0b0b0b]">
      <div className="sticky top-0 h-screen flex flex-col items-start overflow-hidden pt-24 pb-12">
        <div ref={headerRef} className="px-6 lg:px-8 max-w-7xl w-full mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.5rem,5vw,2.25rem)] font-heading tracking-widest text-[#f5f5f5] uppercase"
          >
            PROJECT <span className="text-[#B71C1C]">SHOWCASE</span>
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 lg:px-8 mt-10 h-[60vh]">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="w-[80vw] md:w-[40vw] h-full flex-shrink-0 relative border border-[rgba(245,245,245,0.1)] bg-[rgba(11,11,11,0.8)] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#111] bg-opacity-50 transition-opacity group-hover:bg-opacity-20" />
              <div className="absolute top-6 left-6 flex items-center gap-4">
                <span className="font-heading text-[#B71C1C] text-sm tracking-widest">{project.id}</span>
                <span className="font-ui text-[rgba(245,245,245,0.4)] text-[10px] tracking-[0.2em] uppercase">{project.type}</span>
              </div>
              <div className="absolute bottom-6 left-6">
                <h3 className="font-heading text-2xl text-white tracking-widest uppercase">{project.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
                <span className="font-heading text-[10vw] text-[#f5f5f5] select-none tracking-tighter">PREVIEW</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
