const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePlaceholders() {
  const frameDir = path.join(__dirname, '../public/frames');
  
  if (!fs.existsSync(frameDir)) {
    fs.mkdirSync(frameDir, { recursive: true });
  }

  console.log('🖼️ GENERATING 204 PLACEHOLDER FRAMES...');

  for (let i = 1; i <= 204; i++) {
    const filename = `${String(i).padStart(3, '0')}.webp`;
    const filepath = path.join(frameDir, filename);

    // Create a simple blank WebP with text
    const svg = `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#111"/>
        <text x="50%" y="50%" font-family="monospace" font-size="60" fill="#333" text-anchor="middle">
          PLACEHOLDER FRAME ${String(i).padStart(3, '0')}
        </text>
      </svg>
    `;

    try {
      await sharp(Buffer.from(svg))
        .webp({ quality: 20 }) // Very low quality for placeholders
        .toFile(filepath);

      if (i % 50 === 0 || i === 204) {
        console.log(`✓ Placeholder ${i}/204`);
      }
    } catch (error) {
      console.error(`✗ Placeholder ${i} failed:`, error.message);
    }
  }

  console.log('✅ ALL 204 PLACEHOLDERS GENERATED');
}

generatePlaceholders().catch(console.error);
