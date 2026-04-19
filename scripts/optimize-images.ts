import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
const inputDir = './public/raw-frames'
const outputDir = './public/frames'
async function optimize() {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
  if (!fs.existsSync(inputDir)) {
    console.warn(`Input directory ${inputDir} not found. Skipping optimization.`)
    return
  }
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'))
  console.log(`Optimizing ${files.length} images...`)
  for (const file of files) {
    const name = path.parse(file).name
    await sharp(path.join(inputDir, file))
      .resize(1920)
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(outputDir, `${name}.webp`))
    console.log(`✓ ${file} → ${name}.webp`)
  }
  console.log('Optimization complete.')
}
optimize()
