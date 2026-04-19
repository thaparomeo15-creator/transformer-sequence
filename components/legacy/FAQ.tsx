"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "HOW DOES IT ACHIEVE ZERO LATENCY?",
    answer: "Unlike standard video rendering or CSS animations, the Transformer Engine pre-buffers all image assets into memory as raw Canvas 2D data before the sequence starts. Scroll position is mapped directly to a frame array index using a highly optimized requestAnimationFrame loop.",
  },
  {
    question: "IS IT RESPONSIVE ON MOBILE DEVICES?",
    answer: "Yes. The canvas utilizes an intelligent 'object-fit: contain' logic for screens under 768px, ensuring the full subject is visible. For desktop, it seamlessly scales to 'cover' to provide an immersive, cinematic experience.",
  },
  {
    question: "DO I NEED EXTERNAL PLUGINS?",
    answer: "No. The entire system is built utilizing raw HTML5 Canvas API paired with Framer Motion for scroll interpolation. No bulky WebGL libraries or third-party physics engines are required.",
  },
  {
    question: "CAN I SWAP OUT THE ASSETS?",
    answer: "Absolutely. The architecture is decoupled. Simply point the asset pipeline to a new directory of sequential frames (e.g., .jpg or .png) and update the config file. The engine will handle pre-caching and scaling automatically.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section ref={ref} className="bg-[#0b0b0b] py-24 sm:py-32 border-t border-[rgba(245,245,245,0.05)]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-heading tracking-widest text-[#f5f5f5] uppercase">
            OPERATIONAL <span className="text-[#B71C1C]">QUERIES</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
