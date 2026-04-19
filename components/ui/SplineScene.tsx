'use client';

import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

interface SplineSceneProps {
  sceneUrl: string;
}

export default function SplineScene({ sceneUrl }: SplineSceneProps) {
  const [useImage, setUseImage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isLowEnd = typeof navigator !== 'undefined' && navigator.hardwareConcurrency < 4;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isLowEnd || isMobile) setUseImage(true);
  }, []);

  if (useImage) {
    return (
      <img 
        src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&fm=webp&auto=format&fit=crop" 
        alt="Interactive 3D product model fallback" 
        className="w-full h-full object-cover rounded-lg opacity-40 grayscale"
        role="img"
        aria-label="Interactive 3D product model static fallback"
      />
    );
  }

  return (
    <div className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Spline 
        scene={sceneUrl} 
        onLoad={() => setIsLoaded(true)}
        aria-label="Interactive 3D product model"
        role="img"
      />
    </div>
  );
}
