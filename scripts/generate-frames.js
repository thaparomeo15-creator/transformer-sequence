const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFrames() {
  const frameDir = path.join(__dirname, '../public/frames');
  
  if (!fs.existsSync(frameDir)) {
    fs.mkdirSync(frameDir, { recursive: true });
  }

  console.log('🎬 GENERATING 204 CINEMATIC FRAMES...');

  for (let i = 1; i <= 204; i++) {
    const progress = (i / 204) * 100;
    const angle = (i / 204) * 360;
    const scale = 1 + (progress / 100);
    
    const svg = `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#00E5FF;stop-opacity:${0.15 + (progress / 500)}" />
            <stop offset="50%" style="stop-color:#7B61FF;stop-opacity:${0.1 + (progress / 1000)}" />
            <stop offset="100%" style="stop-color:#080808;stop-opacity:1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="1920" height="1080" fill="#080808"/>
        
        <g opacity="${0.05 + (progress / 500)}">
          <line x1="0" y1="540" x2="1920" y2="540" stroke="#00E5FF" stroke-width="1"/>
          <line x1="960" y1="0" x2="960" y2="1080" stroke="#00E5FF" stroke-width="1"/>
          <circle cx="960" cy="540" r="${200 + (progress * 2)}" fill="none" stroke="#00E5FF" stroke-width="1" opacity="0.3"/>
        </g>
        
        <rect width="1920" height="1080" fill="url(#grad)"/>
        
        <circle cx="960" cy="540" r="${100 + (progress * 2.5)}" fill="none" stroke="#00E5FF" stroke-width="2" filter="url(#glow)" opacity="${0.4 + (progress / 500)}"/>
        <circle cx="960" cy="540" r="${80 + (progress * 1.5)}" fill="none" stroke="#7B61FF" stroke-width="1.5" opacity="${0.3 + (progress / 1000)}"/>
        
        <rect x="100" y="1040" width="${1720 * (progress / 100)}" height="8" fill="#00E5FF" opacity="0.8" rx="4"/>
        <rect x="100" y="1040" width="1720" height="8" fill="none" stroke="#00E5FF" opacity="0.2" stroke-width="1" rx="4"/>
        
        <text x="100" y="1050" font-family="monospace" font-size="14" fill="#00E5FF" opacity="0.6">
          FRAME ${String(i).padStart(3, '0')} / 204
        </text>
        
        <text x="1820" y="1050" font-family="monospace" font-size="14" fill="#00E5FF" opacity="0.6" text-anchor="end">
          ${Math.round(progress)}%
        </text>
      </svg>
    `;

    const filename = `${String(i).padStart(3, '0')}.webp`;
    const filepath = path.join(frameDir, filename);

    try {
      await sharp(Buffer.from(svg))
        .resize(1920, 1080, { fit: 'fill' })
        .webp({ quality: 85 })
        .toFile(filepath);

      if (i % 20 === 0 || i === 204) {
        console.log(`✓ Frame ${i}/204 (${Math.round(progress)}%)`);
      }
    } catch (error) {
      console.error(`✗ Frame ${i} failed:`, error.message);
    }
  }

  console.log('✅ ALL 204 FRAMES GENERATED');
}

generateFrames().catch(console.error);
