import fs from 'fs';
import { PNG } from 'pngjs';

function createIcon(width, height, isMaskable = false) {
  const png = new PNG({ width, height });
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background midnight gradient
      const normDist = dist / radius;
      let r = 7 + Math.floor(15 * (1 - Math.min(normDist, 1)));
      let g = 8 + Math.floor(18 * (1 - Math.min(normDist, 1)));
      let b = 12 + Math.floor(25 * (1 - Math.min(normDist, 1)));
      let a = 255;

      // Outer gold circle ring (if not maskable or within safe zone)
      const ringRadius = width * 0.45;
      if (Math.abs(dist - ringRadius) < Math.max(2, width * 0.012)) {
        r = 212; g = 175; b = 55; // Gold #D4AF37
      }

      // Golden crown shape approximation in center
      const crownTop = centerY - height * 0.2;
      const crownBottom = centerY + height * 0.15;
      const crownLeft = centerX - width * 0.25;
      const crownRight = centerX + width * 0.25;

      if (y >= crownTop && y <= crownBottom && x >= crownLeft && x <= crownRight) {
        const nx = (x - crownLeft) / (crownRight - crownLeft);
        const ny = (y - crownTop) / (crownBottom - crownTop);
        // Base band
        if (ny > 0.75) {
          r = 245; g = 200; b = 80;
        } else {
          // Crown peaks
          const peak = Math.abs(Math.sin(nx * Math.PI * 3));
          if (1 - ny < peak * 0.8 + 0.2) {
            r = 212; g = 175; b = 55;
          }
        }
      }

      // Gold star in center
      if (dist < width * 0.06) {
        r = 255; g = 235; b = 150;
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }
  return PNG.sync.write(png);
}

fs.writeFileSync('public/pwa-192x192.png', createIcon(192, 192, false));
fs.writeFileSync('public/pwa-512x512.png', createIcon(512, 512, false));
fs.writeFileSync('public/pwa-maskable-512x512.png', createIcon(512, 512, true));
fs.writeFileSync('public/apple-touch-icon.png', createIcon(180, 180, false));
fs.writeFileSync('public/favicon.ico', createIcon(64, 64, false));
console.log('Successfully generated all PWA icons!');
