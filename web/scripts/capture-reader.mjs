import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = path.resolve('.');
const WEB_DIR = path.join(ROOT, 'web');
const SCREENSHOTS_DIR = path.join(WEB_DIR, 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// 1. Start Vite preview server
console.log('Starting Vite preview server on port 4173...');
const previewProcess = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
  cwd: WEB_DIR,
  shell: true,
  stdio: 'pipe',
});

await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Preview server start timeout')), 10000);
  previewProcess.stdout.on('data', (data) => {
    const text = data.toString();
    if (text.includes('4173') || text.includes('Local:')) {
      clearTimeout(timeout);
      resolve(true);
    }
  });
  previewProcess.stderr.on('data', (data) => {
    console.error('preview stderr:', data.toString());
  });
});

console.log('Preview server ready.');

// 2. Start Chrome headless
console.log('Launching headless Chrome...');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = path.join(ROOT, '.cache', 'chrome-reader');
if (!fs.existsSync(userDataDir)) {
  fs.mkdirSync(userDataDir, { recursive: true });
}

const chromeProcess = spawn(
  chromePath,
  [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${userDataDir}`,
    '--no-first-run',
    '--no-default-browser-check',
  ],
  { stdio: 'ignore' }
);

// Wait for CDP port
let cdpReady = false;
for (let i = 0; i < 20; i++) {
  try {
    const res = await fetch('http://127.0.0.1:9222/json/version');
    if (res.ok) {
      cdpReady = true;
      break;
    }
  } catch {}
  await new Promise((r) => setTimeout(r, 400));
}

if (!cdpReady) {
  throw new Error('Chrome CDP failed to start on 9222');
}
console.log('Chrome CDP ready.');

async function captureReader(url, width, height, outFile) {
  console.log(`\n--- Capturing ${url} at ${width}x${height} ---`);
  const res = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(url), {
    method: 'PUT',
  });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  let seq = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = ++seq;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700,
    screenWidth: width,
    screenHeight: height,
  });

  await send('Page.navigate', { url });

  // Wait for rendering and dynamic section loading
  await new Promise((resolve) => setTimeout(resolve, 3500));

  // Evaluate DOM metrics
  const evalResult = await send('Runtime.evaluate', {
    expression: `(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const firstSection = document.querySelector('#c11-s1 .article-content');
      const firstSectionRendered = !!firstSection && firstSection.children.length > 0;
      const rightRail = document.querySelector('aside.rail');
      const rightRailDisplay = rightRail ? window.getComputedStyle(rightRail).display : 'none';
      const leftSidebar = document.querySelector('aside.sidebar');
      const leftSidebarDisplay = leftSidebar ? window.getComputedStyle(leftSidebar).display : 'none';
      const badges = Array.from(document.querySelectorAll('.section-meta__badges .badge')).map(b => b.textContent.trim());
      const hasDPBadges = badges.some(b => b.startsWith('D')) && badges.some(b => b.startsWith('P'));
      const activeSectionTitle = document.querySelector('.section-meta__grid') ? true : false;
      
      return JSON.stringify({
        viewport: '${width}x${height}',
        scrollWidth,
        clientWidth,
        hasHorizontalScroll: scrollWidth > clientWidth,
        firstSectionRendered,
        leftSidebarDisplay,
        rightRailDisplay,
        rightRailBadges: badges,
        hasDPBadges,
        activeSectionTitle
      });
    })()`,
  });

  const rawVal = evalResult.result?.result?.value ?? evalResult.result?.value;
  console.log('rawVal:', rawVal);
  const metrics = rawVal ? JSON.parse(rawVal) : {};
  console.log('Metrics:', metrics);

  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  });

  fs.writeFileSync(outFile, Buffer.from(shot.result.data, 'base64'));
  console.log(`Saved screenshot: ${outFile} (${fs.statSync(outFile).size} bytes)`);

  ws.close();
  await fetch('http://127.0.0.1:9222/json/close/' + target.id);

  return metrics;
}

try {
  const results = [];
  // 1440x900 desktop (3 columns)
  results.push(await captureReader('http://localhost:4173/learn/c11', 1440, 900, path.join(SCREENSHOTS_DIR, 'reader-1440.png')));
  
  // 1440x900 desktop deep linked to #c11-s4
  results.push(await captureReader('http://localhost:4173/learn/c11#c11-s4', 1440, 900, path.join(SCREENSHOTS_DIR, 'reader-1440-s4.png')));

  // 1024x768 tablet (2 columns, right rail hidden)
  results.push(await captureReader('http://localhost:4173/learn/c11', 1024, 768, path.join(SCREENSHOTS_DIR, 'reader-1024.png')));

  // 390x844 mobile (1 column, mobile bottom bar)
  results.push(await captureReader('http://localhost:4173/learn/c11', 390, 844, path.join(SCREENSHOTS_DIR, 'reader-390.png')));

  console.log('\n=== FINAL SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));

  const allZeroScroll = results.every(r => !r.hasHorizontalScroll);
  console.log(`\nAll viewports zero horizontal scroll (scrollWidth <= clientWidth): ${allZeroScroll}`);
} finally {
  console.log('\nCleaning up processes...');
  try {
    chromeProcess.kill();
    previewProcess.kill();
  } catch {}
  try {
    spawn('taskkill', ['/F', '/IM', 'chrome.exe', '/T']);
  } catch {}
}
