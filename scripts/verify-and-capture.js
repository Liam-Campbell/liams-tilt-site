import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const artifactDir = 'C:\\Users\\LCampbel\\.gemini\\antigravity\\brain\\231ff9b4-7757-43d7-a822-c670e8e85841';
const baseUrl = 'http://localhost:4321';

async function run() {
  const browser = await chromium.launch();
  
  // 1. Test Desktop 1440px
  console.log('Testing Desktop 1440px...');
  const pageDesktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pageDesktop.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  
  // Save Desktop Homepage Screenshot
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-desktop-1440-home.png'), fullPage: false });
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-desktop-1440-full.png'), fullPage: true });

  // Test Pause Motion button
  const motionBtn = pageDesktop.locator('#motion-toggle-btn');
  if (await motionBtn.count() > 0) {
    await motionBtn.click();
    const ariaLabel = await motionBtn.getAttribute('aria-label');
    console.log('Motion button clicked. New aria-label:', ariaLabel);
  }

  // 2. Test Tilts Page on Desktop
  await pageDesktop.goto(`${baseUrl}/tilts`, { waitUntil: 'networkidle' });
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-desktop-tilts.png'), fullPage: false });

  // 3. Test Quote Page on Desktop with query parameter
  await pageDesktop.goto(`${baseUrl}/quote?product=Hydraulic%20Twin%20Ram%20Tilt%20Hitch`, { waitUntil: 'networkidle' });
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-desktop-quote.png'), fullPage: false });

  // 4. Test Tablet 1024px
  console.log('Testing Tablet 1024px...');
  const page1024 = await browser.newPage({ viewport: { width: 1024, height: 768 } });
  await page1024.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page1024.screenshot({ path: path.join(artifactDir, 'screenshot-tablet-1024-home.png'), fullPage: false });

  // 5. Test Tablet 768px
  console.log('Testing Tablet 768px...');
  const page768 = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await page768.goto(`${baseUrl}/buckets`, { waitUntil: 'networkidle' });
  await page768.screenshot({ path: path.join(artifactDir, 'screenshot-tablet-768-buckets.png'), fullPage: false });

  // 6. Test Mobile 390px (iPhone / modern mobile)
  console.log('Testing Mobile 390px...');
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148' });
  await pageMobile.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: path.join(artifactDir, 'screenshot-mobile-390-home.png'), fullPage: false });

  // Test Mobile Navigation Drawer
  const mobileToggle = pageMobile.locator('#mobile-toggle-btn');
  if (await mobileToggle.count() > 0) {
    await mobileToggle.click();
    await pageMobile.waitForTimeout(300);
    await pageMobile.screenshot({ path: path.join(artifactDir, 'screenshot-mobile-390-menu.png'), fullPage: false });
  }

  // Test Mobile Quote Form
  await pageMobile.goto(`${baseUrl}/quote`, { waitUntil: 'networkidle' });
  await pageMobile.screenshot({ path: path.join(artifactDir, 'screenshot-mobile-390-quote.png'), fullPage: false });

  // 7. Test 404 Page
  console.log('Testing 404 Page...');
  await pageDesktop.goto(`${baseUrl}/404`, { waitUntil: 'networkidle' });
  await pageDesktop.screenshot({ path: path.join(artifactDir, 'screenshot-desktop-404.png'), fullPage: false });

  await browser.close();
  console.log('All responsive viewport verifications and screenshots completed successfully!');
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
