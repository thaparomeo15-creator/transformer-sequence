import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Next.js 16 uses Turbopack by default — empty config silences the warning
  turbopack: {},
};

export default nextConfig;
