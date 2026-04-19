'use client';

import { ReactNode } from 'react';
import { GeistMono } from 'geist/font/mono';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({ children, onClick, className = '', variant = 'outline', type = 'button', disabled = false }: ButtonProps) {
  const baseStyles = `relative overflow-hidden px-8 py-3.5 rounded-sm font-mono text-[0.7rem] tracking-[0.15em] uppercase font-bold transition-all duration-400 active:scale-[0.97] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  
  const variants = {
    primary: 'bg-white text-black hover:bg-[var(--accent-cyan)] border-white hover:border-[var(--accent-cyan)]',
    outline: 'bg-transparent text-white border border-[var(--glass-border)] hover:border-[var(--accent-cyan)]',
    ghost: 'bg-transparent text-white/60 hover:text-white border-none',
  };

  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-cursor={disabled ? 'default' : 'hover'}
      className={`${GeistMono.className} ${baseStyles} ${variants[variant]} ${className} group`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Shimmer Effect */}
      <span className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-600 ease-[var(--ease-out-expo)] group-hover:left-[150%]" />
      
      {/* Glow Effect */}
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-[var(--accent-cyan)] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-400" />
      )}
    </button>
  );
}
