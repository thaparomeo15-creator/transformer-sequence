"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "PERSONAL",
    price: "$59",
    description: "Standard architectural access for solo operators.",
    features: ["Standard Rendering Pipeline", "Basic Asset Delivery", "Community Support", "Single Project License"],
    cta: "INITIALIZE PERSONAL",
    highlight: false,
  },
  {
    name: "PRO",
    price: "$149",
    description: "Advanced velocity for high-output engineering.",
    features: ["Zero-Latency Canvas Engine", "Scroll-Velocity Interpolation", "Priority Sub-Routine Support", "Unlimited Project Licenses"],
    cta: "AUTHORIZE PRO",
    highlight: true,
  },
  {
    name: "ENTERPRISE",
    price: "CUSTOM",
    description: "Unrestricted infrastructure for elite squadrons.",
    features: ["Dedicated Infrastructure", "Custom Asset Pipelines", "Direct Engineer Access", "SLA Guarantee"],
    cta: "REQUEST CLEARANCE",
    highlight: false,
  },
]

export function PricingTier() {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <section className="py-24 bg-[#0b0b0b] relative border-t border-[rgba(245,245,245,0.05)]" ref={ref}>
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[clamp(1.875rem,5vw,3rem)] font-heading tracking-widest text-[#f5f5f5] uppercase"
          >
            PROCUREMENT <span className="text-[#B71C1C]">PROTOCOLS</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-[rgba(245,245,245,0.6)] font-ui"
          >
            Select the infrastructure tier that matches your required velocity. No compromises.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
              className={`relative flex flex-col p-8 border ${
                tier.highlight 
                  ? "border-[#B71C1C] bg-[rgba(183,28,28,0.05)] shadow-[0_0_30px_rgba(183,28,28,0.1)]" 
                  : "border-[rgba(245,245,245,0.1)] bg-[rgba(42,42,42,0.2)]"
              } backdrop-blur-sm transition-colors hover:border-[#f5f5f5]/30`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#B71C1C] text-white px-3 py-1 text-[10px] font-heading tracking-widest uppercase">
                  RECOMMENDED SPEC
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-lg font-heading tracking-widest text-[#f5f5f5]">{tier.name}</h3>
                <p className="mt-4 text-sm text-[rgba(245,245,245,0.5)] font-ui min-h-[40px]">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-4xl font-heading font-bold text-white tracking-wider">{tier.price}</span>
                  {tier.price !== "CUSTOM" && <span className="text-sm font-ui text-[rgba(245,245,245,0.5)]">/month</span>}
                </div>
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3 items-center">
                    <Check className={`h-4 w-4 ${tier.highlight ? "text-[#B71C1C]" : "text-[rgba(245,245,245,0.4)]"}`} />
                    <span className="text-sm font-ui text-[rgba(245,245,245,0.8)] tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={tier.highlight ? "default" : "outline"} className="w-full">
                {tier.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
