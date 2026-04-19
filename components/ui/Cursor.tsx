'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'drag' | 'click'>('default');
  const [label, setLabel] = useState('');

  const mousePos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });
  const innerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setVariant('click');
    const handleMouseUp = () => setVariant('default');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorData = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const cursorLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (cursorData === 'hover') {
        setVariant('hover');
        if (cursorLabel) setLabel(cursorLabel);
      } else if (cursorData === 'drag') {
        setVariant('drag');
        setLabel('DRAG');
      } else {
        setVariant('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    const update = () => {
      // Lerp for outer ring
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12;

      // Lerp for inner dot
      innerPos.current.x += (mousePos.current.x - innerPos.current.x) * 0.18;
      innerPos.current.y += (mousePos.current.y - innerPos.current.y) * 0.18;

      if (outerRef.current) {
        gsap.set(outerRef.current, { x: outerPos.current.x, y: outerPos.current.y });
      }
      if (innerRef.current) {
        gsap.set(innerRef.current, { x: innerPos.current.x, y: innerPos.current.y });
      }

      requestAnimationFrame(update);
    };

    const rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!outerRef.current) return;

    if (variant === 'hover') {
      gsap.to(outerRef.current, { scale: 1.8, duration: 0.3, ease: 'power2.out' });
    } else if (variant === 'drag') {
      gsap.to(outerRef.current, { scale: 2.2, duration: 0.3, ease: 'power2.out' });
    } else if (variant === 'click') {
      gsap.to(outerRef.current, { scale: 0.8, duration: 0.15, ease: 'power2.out' });
    } else {
      gsap.to(outerRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
    }
  }, [variant]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={outerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[var(--z-cursor)] -translate-x-1/2 -translate-y-1/2 mix-blend-difference flex items-center justify-center overflow-hidden"
      >
        {label && (
          <span className="text-[0.5rem] font-mono text-white tracking-widest uppercase">
            {label}
          </span>
        )}
      </div>
      <div 
        ref={innerRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[var(--z-cursor)] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}
