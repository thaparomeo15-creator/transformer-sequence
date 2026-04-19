'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavbarProps {
  /** Signals whether the page has scrolled past the threshold */
  scrolled?: boolean;
}

// ─── Logo Mark ────────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <div className="flex items-center gap-3 group" aria-label="Cinematic Transformer — Home">
      {/* Geometric icon mark */}
      <div className="relative w-8 h-8 shrink-0">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* Outer frame */}
          <rect x="1" y="1" width="30" height="30" stroke="rgba(245,245,245,0.2)" strokeWidth="1" />
          {/* Red accent bracket TL */}
          <path d="M1 9 L1 1 L9 1" stroke="#B71C1C" strokeWidth="1.5" />
          {/* Red accent bracket BR */}
          <path d="M31 23 L31 31 L23 31" stroke="#B71C1C" strokeWidth="1.5" />
          {/* Center X */}
          <path d="M10 10 L22 22 M22 10 L10 22" stroke="rgba(245,245,245,0.7)" strokeWidth="1.2" />
          {/* Center dot */}
          <circle cx="16" cy="16" r="1.5" fill="#B71C1C" />
        </svg>
      </div>

      <div>
        <div
          className="font-heading text-[10px] tracking-[0.3em] text-[#f5f5f5] leading-none"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          TRANSFORMER
        </div>
        <div
          className="text-[8px] tracking-[0.25em] text-[rgba(245,245,245,0.4)] leading-none mt-1"
          style={{ fontFamily: 'var(--font-ui)', letterSpacing: '0.25em' }}
        >
          SEQUENCE ·· 204
        </div>
      </div>
    </div>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────

function NavLink({
  children,
  href = '#',
  id,
}: {
  children: React.ReactNode;
  href?: string;
  id: string;
}) {
  return (
    <a
      id={id}
      href={href}
      className="relative group"
      style={{ fontFamily: 'var(--font-heading)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,245,245,0.6)', textDecoration: 'none', transition: 'color 0.3s ease' }}
    >
      <span className="relative">
        {children}
        {/* Underline accent */}
        <span
          className="absolute -bottom-1 left-0 w-0 h-px bg-[#B71C1C] group-hover:w-full transition-all duration-300"
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
      </span>
    </a>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      {/* Glass layer — appears after scroll */}
      <motion.div
        className="absolute inset-0 nav-glass"
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      <div className="relative flex items-center justify-between px-6 md:px-10 lg:px-16 h-16">
        {/* Left: Logo */}
        <LogoMark />

        {/* Right: Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink id="nav-portfolio" href="#post-sequence">PORTFOLIO</NavLink>
          <NavLink id="nav-specs" href="#specs">SPECS</NavLink>
          <a
            id="nav-inquire"
            href="#contact"
            className="cta-btn"
            style={{ padding: '10px 20px', fontSize: '10px' }}
            aria-label="Inquire about the project"
          >
            <span>INQUIRE</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          id="nav-menu-toggle"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            className="block w-5 h-px bg-[#f5f5f5]"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-5 h-px bg-[#f5f5f5]"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-px bg-[#f5f5f5]"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden nav-glass border-t border-[rgba(245,245,245,0.05)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              <NavLink id="nav-mobile-portfolio" href="#post-sequence">PORTFOLIO</NavLink>
              <NavLink id="nav-mobile-specs" href="#specs">SPECS</NavLink>
              <NavLink id="nav-mobile-inquire" href="#contact">INQUIRE</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(183,28,28,0.4), transparent)' }}
      />
    </motion.nav>
  );
}
