'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { SPECS_DATA, FEATURE_SECTIONS } from '@/data/transformerData';

// ─── Animation Variants ───────────────────────────────────────────────────────
// ease arrays must be `as const` so TS narrows to BezierDefinition tuple

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const LINE_VARIANTS: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

// ─── Spec Card ────────────────────────────────────────────────────────────────

function SpecCard({ item }: { item: typeof SPECS_DATA[0] }) {
  return (
    <motion.article
      variants={ITEM_VARIANTS}
      className="spec-card"
      aria-labelledby={`spec-label-${item.id}`}
    >
      <div
        className="text-[clamp(28px,4vw,48px)] mb-2 leading-none"
        style={{ fontFamily: 'var(--font-heading)', color: '#f5f5f5', letterSpacing: '0.05em' }}
        aria-hidden="true"
      >
        {item.value}
      </div>
      <div
        id={`spec-label-${item.id}`}
        className="text-[10px] tracking-[0.3em] text-[#B71C1C] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {item.label}
      </div>
      <p
        className="text-[13px] leading-relaxed text-[rgba(245,245,245,0.4)]"
        style={{ fontFamily: 'var(--font-ui)', letterSpacing: '0.03em' }}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

// ─── Feature Row ──────────────────────────────────────────────────────────────

function FeatureRow({ section }: { section: typeof FEATURE_SECTIONS[0] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.article
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 py-12 border-b border-[rgba(245,245,245,0.06)]"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={CONTAINER_VARIANTS}
      aria-labelledby={`feature-title-${section.id}`}
    >
      {/* Tag column */}
      <motion.div variants={ITEM_VARIANTS} className="pt-1">
        <span className="feature-tag">{section.tag}</span>
      </motion.div>

      {/* Content column */}
      <div>
        <motion.h3
          id={`feature-title-${section.id}`}
          variants={ITEM_VARIANTS}
          className="mb-4"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            letterSpacing: '0.08em',
            color: '#f5f5f5',
          }}
        >
          {section.title}
        </motion.h3>
        <motion.p
          variants={ITEM_VARIANTS}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            lineHeight: 1.7,
            color: 'rgba(245,245,245,0.5)',
            letterSpacing: '0.03em',
            maxWidth: '60ch',
          }}
        >
          {section.body}
        </motion.p>
      </div>
    </motion.article>
  );
}

// ─── SpecsGrid (Exported) ─────────────────────────────────────────────────────

export default function SpecsGrid() {
  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: '-5%' });

  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-5%' });

  return (
    <section
      id="post-sequence"
      className="bg-[#0b0b0b]"
      aria-label="Technical specifications and case study"
    >
      {/* ── Section divider ── */}
      <div className="section-divider" aria-hidden="true" />

      {/* ── Specs Section ── */}
      <div
        id="specs"
        ref={specsRef}
        className="px-6 md:px-10 lg:px-16 xl:px-24 py-24 md:py-32"
      >
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={specsInView ? 'visible' : 'hidden'}
          variants={CONTAINER_VARIANTS}
        >
          <motion.div
            variants={ITEM_VARIANTS}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: '#B71C1C',
              marginBottom: '12px',
            }}
          >
            TECHNICAL SPECIFICATIONS
          </motion.div>
          <motion.div className="overflow-hidden">
            <motion.h2
              variants={ITEM_VARIANTS}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(24px, 4vw, 48px)',
                letterSpacing: '0.1em',
                color: '#f5f5f5',
                lineHeight: 1,
              }}
            >
              PERFORMANCE
              <br />
              <span style={{ color: 'rgba(245,245,245,0.25)' }}>BY THE NUMBERS</span>
            </motion.h2>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            className="mt-8 h-px bg-[rgba(245,245,245,0.08)] w-full overflow-hidden"
            variants={{ hidden: {}, visible: {} }}
          >
            <motion.div
              className="h-full bg-[rgba(183,28,28,0.5)]"
              variants={LINE_VARIANTS}
            />
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[rgba(245,245,245,0.05)]"
          initial="hidden"
          animate={specsInView ? 'visible' : 'hidden'}
          variants={CONTAINER_VARIANTS}
        >
          {SPECS_DATA.map((item) => (
            <SpecCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

      {/* ── Section divider ── */}
      <div className="section-divider" aria-hidden="true" />

      {/* ── Features / Case Study ── */}
      <div
        ref={featuresRef}
        className="px-6 md:px-10 lg:px-16 xl:px-24 py-24 md:py-32"
      >
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate={featuresInView ? 'visible' : 'hidden'}
          variants={CONTAINER_VARIANTS}
        >
          <motion.div
            variants={ITEM_VARIANTS}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: '#B71C1C',
              marginBottom: '12px',
            }}
          >
            CREATIVE DIRECTION
          </motion.div>
          <motion.h2
            variants={ITEM_VARIANTS}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(24px, 4vw, 48px)',
              letterSpacing: '0.1em',
              color: '#f5f5f5',
              lineHeight: 1,
            }}
          >
            HOW IT
            <br />
            <span style={{ color: 'rgba(245,245,245,0.25)' }}>WAS BUILT</span>
          </motion.h2>
        </motion.div>

        {/* Feature rows */}
        <div>
          {FEATURE_SECTIONS.map((section) => (
            <FeatureRow key={section.id} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
