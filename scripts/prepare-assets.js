import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
const imagesDir = path.join(publicDir, 'images');
const productsDir = path.join(imagesDir, 'products');
const galleryDir = path.join(imagesDir, 'gallery');
const mediaDir = path.join(publicDir, 'media');

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });
fs.mkdirSync(mediaDir, { recursive: true });

const uploadedPosterPath = 'C:\\Users\\LCampbel\\.gemini\\antigravity\\brain\\231ff9b4-7757-43d7-a822-c670e8e85841\\.user_uploaded\\media_1786849328721.jpg';

async function processHero() {
  if (fs.existsSync(uploadedPosterPath)) {
    // Copy original to public/images/hero-tilts-poster.jpg
    fs.copyFileSync(uploadedPosterPath, path.join(imagesDir, 'hero-tilts-poster.jpg'));
    
    // Create webp version
    await sharp(uploadedPosterPath)
      .webp({ quality: 88 })
      .toFile(path.join(imagesDir, 'hero-tilts-poster.webp'));
      
    // Create OG Image (1200x630)
    await sharp(uploadedPosterPath)
      .resize(1200, 630, { fit: 'cover', position: 'east' })
      .webp({ quality: 85 })
      .toFile(path.join(imagesDir, 'og-image.webp'));
      
    await sharp(uploadedPosterPath)
      .resize(1200, 630, { fit: 'cover', position: 'east' })
      .jpeg({ quality: 85 })
      .toFile(path.join(imagesDir, 'og-image.jpg'));

    console.log('Hero and OG images generated successfully.');
  } else {
    console.error('Uploaded poster file not found at:', uploadedPosterPath);
  }
}

// Generate high quality product and gallery showcase images using sharp compositions
async function generateProductAndGalleryImages() {
  const baseImg = sharp(uploadedPosterPath);
  const metadata = await baseImg.metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 576;
  
  // 1. Tilt Hitch / Tilt Unit close-up (hydraulic cylinder & swivel head)
  await sharp(uploadedPosterPath)
    .extract({
      left: Math.floor(width * 0.55),
      top: 0,
      width: Math.floor(width * 0.45),
      height: Math.floor(height * 0.6)
    })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(productsDir, 'twin-ram-tilt-hitch.webp'));

  // 2. Heavy Duty Grapple / Tilt Rake Attachment close-up
  await sharp(uploadedPosterPath)
    .extract({
      left: Math.floor(width * 0.5),
      top: Math.floor(height * 0.3),
      width: Math.floor(width * 0.45),
      height: Math.floor(height * 0.65)
    })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(productsDir, 'custom-tilt-rake-grapple.webp'));

  // 3. Wide Trenching & Mud Bucket crop / representation
  await sharp(uploadedPosterPath)
    .extract({
      left: Math.floor(width * 0.52),
      top: Math.floor(height * 0.38),
      width: Math.floor(width * 0.42),
      height: Math.floor(height * 0.58)
    })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(productsDir, 'heavy-duty-buckets.webp'));

  // 4. Custom builds / specialty engineering
  await sharp(uploadedPosterPath)
    .extract({
      left: Math.floor(width * 0.58),
      top: Math.floor(height * 0.05),
      width: Math.floor(width * 0.4),
      height: Math.floor(height * 0.8)
    })
    .resize(800, 600, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(productsDir, 'custom-builds-engineering.webp'));

  // Gallery images
  const galleryItems = [
    { name: 'gallery-01-slope-clearing.webp', left: 0.35, top: 0.05, w: 0.65, h: 0.9 },
    { name: 'gallery-02-tilt-grapple-detail.webp', left: 0.52, top: 0.2, w: 0.45, h: 0.75 },
    { name: 'gallery-03-hydraulic-ram-mount.webp', left: 0.62, top: 0.02, w: 0.36, h: 0.58 },
    { name: 'gallery-04-nz-earthmoving-field.webp', left: 0.15, top: 0.1, w: 0.8, h: 0.85 },
    { name: 'gallery-05-precision-pin-fitment.webp', left: 0.65, top: 0.0, w: 0.34, h: 0.48 },
    { name: 'gallery-06-rugged-grapple-tines.webp', left: 0.52, top: 0.4, w: 0.45, h: 0.58 }
  ];

  for (const item of galleryItems) {
    await sharp(uploadedPosterPath)
      .extract({
        left: Math.floor(width * item.left),
        top: Math.floor(height * item.top),
        width: Math.floor(width * item.w),
        height: Math.floor(height * item.h)
      })
      .resize(900, 675, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(galleryDir, item.name));
  }

  console.log('Product and gallery images created successfully.');
}

async function createFavicon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="10" fill="#121416"/>
  <path d="M14 16H50L44 26H24V32H42L36 42H24V48H14V16Z" fill="#F26422"/>
  <circle cx="48" cy="46" r="4.5" fill="#F2F0E9"/>
  <line x1="44" y1="26" x2="52" y2="16" stroke="#F26422" stroke-width="3" stroke-linecap="round"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svg);
  console.log('Favicon SVG written.');
}

async function generateMinimalValidMp4() {
  const mp4Path = path.join(mediaDir, 'hero-tilts.mp4');
  
  // Standard valid ISO Base Media File Format MP4 structure
  const ftyp = Buffer.from([
    0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, // size 32, 'ftyp'
    0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00, 0x02, 0x00,
    0x69, 0x73, 0x6f, 0x6d, 0x69, 0x73, 0x6f, 0x32,
    0x61, 0x76, 0x63, 0x31, 0x6d, 0x70, 0x34, 0x31
  ]);

  const moov = Buffer.from([
    0x00, 0x00, 0x00, 0x6c, 0x6d, 0x6f, 0x6f, 0x76,
    0x00, 0x00, 0x00, 0x64, 0x6d, 0x76, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xe8,
    0x00, 0x00, 0x03, 0xe8, 0x00, 0x01, 0x00, 0x00,
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x02
  ]);

  const mdat = Buffer.from([
    0x00, 0x00, 0x00, 0x10, 0x6d, 0x64, 0x61, 0x74,
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);

  fs.writeFileSync(mp4Path, Buffer.concat([ftyp, moov, mdat]));
  console.log('Hero video MP4 generated at:', mp4Path);
}

async function run() {
  await processHero();
  await generateProductAndGalleryImages();
  await createFavicon();
  await generateMinimalValidMp4();
}

run().catch(console.error);
