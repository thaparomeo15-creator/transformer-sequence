const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\927f4c17-1351-48c2-9363-51ed68c1a2ba';
const targetDir = 'C:\\Users\\dell\\.gemini\\antigravity\\scratch\\public\\images\\transformer-sequence';

const truckImage = path.join(sourceDir, 'mechanical_truck_1776532855215.png');
const robotImage = path.join(sourceDir, 'humanoid_robot_1776532872501.png');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Ensure the source images exist
if (fs.existsSync(truckImage) && fs.existsSync(robotImage)) {
  console.log('Found source images. Populating 204 frames...');
  
  for (let i = 1; i <= 204; i++) {
    const targetFile = path.join(targetDir, `${i}.jpg`);
    // Frames 1-100: Truck, Frames 101-204: Robot
    const sourceFile = i <= 100 ? truckImage : robotImage;
    
    // Copy the file
    fs.copyFileSync(sourceFile, targetFile);
    
    if (i % 20 === 0) {
      console.log(`Copied up to frame ${i}`);
    }
  }
  
  console.log('Successfully generated 204 frames for the sequence.');
} else {
  console.error('Source images not found. Please verify the paths.');
}
