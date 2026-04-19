import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Transformer Sequence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Grid Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div 
            style={{ 
              fontSize: '80px', 
              color: 'white', 
              fontWeight: 'bold', 
              letterSpacing: '0.1em', 
              fontFamily: 'monospace',
              marginBottom: '20px',
            }}
          >
            TRANSFORMER SEQUENCE
          </div>
          <div 
            style={{ 
              fontSize: '32px', 
              color: '#00E5FF', 
              letterSpacing: '0.3em', 
              fontFamily: 'monospace',
            }}
          >
            204 FRAMES · ZERO LATENCY
          </div>
        </div>

        <div 
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            right: '40px',
            height: '2px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
          }}
        >
          <div style={{ width: '60%', height: '100%', background: '#00E5FF' }} />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
