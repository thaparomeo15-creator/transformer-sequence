'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Social Link ──────────────────────────────────────────────────────────────

function SocialLink({ href, label, id }: { href: string; label: string; id: string }) {
  return (
    <a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '9px',
        letterSpacing: '0.3em',
        color: 'rgba(245,245,245,0.35)',
        textDecoration: 'none',
        transition: 'color 0.3s ease',
      }}
      className="hover:text-[#f5f5f5]"
    >
      {label}
    </a>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <footer
      id="contact"
      ref={ref}
      role="contentinfo"
      aria-label="Footer — Contact and credits"
      className="bg-[#0b0b0b] border-t border-[rgba(245,245,245,0.05)]"
    >
      {/* Top accent line */}
      <motion.div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(183,28,28,0.8), transparent)',
          transformOrigin: 'center',
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="px-6 md:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Column 1: Identity ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: '#f5f5f5',
                marginBottom: '8px',
              }}
            >
              TRANSFORMER
            </div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: 'rgba(245,245,245,0.3)',
                marginBottom: '16px',
              }}
            >
              CINEMATIC SEQUENCE ·· 204 FRAMES
            </div>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '13px',
                lineHeight: 1.7,
                color: 'rgba(245,245,245,0.3)',
                maxWidth: '28ch',
              }}
            >
              A scroll-driven canvas experience. Built for performance,
              designed for impact.
            </p>
          </motion.div>

          {/* ── Column 2: Contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '9px',
                letterSpacing: '0.35em',
                color: '#B71C1C',
                marginBottom: '16px',
              }}
            >
              CONTACT
            </div>
            <div className="flex flex-col gap-3">
              <a
                id="footer-email"
                href="mailto:hello@example.com"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '14px',
                  color: 'rgba(245,245,245,0.6)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                  transition: 'color 0.3s ease',
                }}
                className="hover:text-[#f5f5f5] normal-case"
                aria-label="Send an email"
              >
                hello@example.com
              </a>
              <a
                id="footer-location"
                href="#"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '13px',
                  color: 'rgba(245,245,245,0.3)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
              >
                Available Worldwide · Remote
              </a>
            </div>
          </motion.div>

          {/* ── Column 3: Socials ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '9px',
                letterSpacing: '0.35em',
                color: '#B71C1C',
                marginBottom: '16px',
              }}
            >
              FOLLOW
            </div>
            <div className="flex flex-col gap-3">
              <SocialLink id="footer-twitter" href="https://twitter.com" label="Twitter / X" />
              <SocialLink id="footer-instagram" href="https://instagram.com" label="Instagram" />
              <SocialLink id="footer-linkedin" href="https://linkedin.com" label="LinkedIn" />
              <SocialLink id="footer-github" href="https://github.com" label="GitHub" />
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="mt-16 pt-8 border-t border-[rgba(245,245,245,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(245,245,245,0.2)',
            }}
          >
            © {new Date().getFullYear()} CINEMATIC TRANSFORMER SEQUENCE
          </span>

          <div className="flex items-center gap-6">
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: 'rgba(245,245,245,0.15)',
              }}
            >
              NEXT.JS · CANVAS · FRAMER MOTION
            </span>
            {/* Red pulse mark */}
            <div
              className="w-1 h-1 rounded-full bg-[#B71C1C] animate-pulse-red"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
