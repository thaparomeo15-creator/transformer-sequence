const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/frames_raw'); // Assuming raw images are here
const outputDir = path.join(__dirname, '../public/frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimize() {
  const files = fs.readdirSync(inputDir).filter((f: string) => f.endsWith('.jpg') || f.endsWith('.png'));
  
  console.log(`Optimizing ${files.length} frames...`);
  
  for (const file of files) {
    const name = path.parse(file).name;
    await sharp(path.join(inputDir, file))
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(outputDir, `${name}.webp`));
    
    process.stdout.write('.');
  }
  
  console.log('\nOptimization complete.');
}

// Check if input dir exists before running
if (fs.existsSync(inputDir)) {
  optimize();
} else {
  console.log('No raw frames found. Skipping optimization script.');
}
