const Jimp = require('jimp');
const path = require('path');

async function processImages() {
  const brainDir = 'C:\\Users\\Admin\\.gemini\antigravity\\brain\\b727be59-5419-4a45-9412-7a620673d1d2';
  const bestSellerSrc = path.join(brainDir, 'media__1780371058324.png');
  const superSaleSrc = path.join(brainDir, 'media__1780371110422.png');
  
  const destBestSeller = 'c:\\Users\\Admin\\Desktop\\Chí\\AI\\Gối ôm\\assets\\badge-best-seller.png';
  const destSuperSale = 'c:\\Users\\Admin\\Desktop\\Chí\\AI\\Gối ôm\\assets\\badge-super-sale.png';

  console.log('Processing Best Seller Badge...');
  const bestSeller = await Jimp.read(bestSellerSrc);
  const bsW = bestSeller.bitmap.width;
  const bsH = bestSeller.bitmap.height;

  // Make white background transparent
  bestSeller.scan(0, 0, bsW, bsH, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If pixel is white or very close to white
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // alpha = 0
    }
  });
  await bestSeller.write(destBestSeller);
  console.log('Saved transparent Best Seller to:', destBestSeller);

  console.log('Processing Super Sale Badge...');
  const superSale = await Jimp.read(superSaleSrc);
  const ssW = superSale.bitmap.width;
  const ssH = superSale.bitmap.height;

  superSale.scan(0, 0, ssW, ssH, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    // 1. Remove background (light gray or white)
    // The background color of pngtree image is around (240, 240, 240) to (255, 255, 255)
    // The logo contains a shadow at the bottom, we can also clean up the very bottom shadow or keep it.
    // Let's clear the outer background.
    if (r > 235 && g > 235 && b > 235) {
      // Don't clear the white circle in the middle!
      // The white circle is roughly in the center: x from 20% to 80%, y from 10% to 75%
      const isInsideWhiteCircle = (x > ssW * 0.22 && x < ssW * 0.78 && y > ssH * 0.12 && y < ssH * 0.75);
      if (!isInsideWhiteCircle) {
        this.bitmap.data[idx + 3] = 0; // Set background to transparent
      }
    }

    // Also clear the bottom text logo 'pngtree.com'
    if (y > ssH * 0.90) {
      this.bitmap.data[idx + 3] = 0;
    }
    // Clear shadow area at the bottom completely to make it super clean
    if (y > ssH * 0.80 && r > 180 && g > 180 && b > 180) {
      this.bitmap.data[idx + 3] = 0;
    }

    // 2. Remove the red "50%" text in the upper white circle
    // The "50%" text is in the upper part of the white circle: y between 15% and 42%, x between 30% and 70%
    if (y > ssH * 0.15 && y < ssH * 0.42 && x > ssW * 0.30 && x < ssW * 0.70) {
      // If it is red (red component high, green/blue low)
      if (r > 130 && g < 80 && b < 80) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
        this.bitmap.data[idx + 3] = 255;
      }
    }
  });

  await superSale.write(destSuperSale);
  console.log('Saved cleaned Super Sale to:', destSuperSale);
}

processImages().catch(err => {
  console.error(err);
  process.exit(1);
});
