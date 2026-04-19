'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { useState, useEffect, CSSProperties } from 'react';

interface LottiePlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function LottiePlayer({ src, autoplay = true, loop = true, style, className }: LottiePlayerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div style={style} className={className} />;

  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={style}
      className={className}
    />
  );
}
