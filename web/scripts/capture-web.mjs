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

// Wait for preview server to be ready
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
const userDataDir = path.join(ROOT, '.cache', 'chrome-t04');
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

async function capture(url, width, height, outFile) {
  console.log(`Capturing ${url} at ${width}x${height} -> ${outFile}`);
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
  // Wait for rendering
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Check horizontal scrolling
  const evalResult = await send('Runtime.evaluate', {
    expression: 'JSON.stringify({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, innerWidth: window.innerWidth })',
  });
  console.log('evalResult:', evalResult);
  const scrollInfo = evalResult.result && evalResult.result.value ? JSON.parse(evalResult.result.value) : {};
  console.log(`Scroll metrics for ${width}x${height}:`, scrollInfo);
  const hasHorizontalScroll = scrollInfo.scrollWidth > scrollInfo.clientWidth;
  console.log(`Has horizontal scroll? ${hasHorizontalScroll}`);

  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  });

  fs.writeFileSync(outFile, Buffer.from(shot.result.data, 'base64'));
  console.log(`Saved screenshot: ${outFile} (${fs.statSync(outFile).size} bytes)`);

  ws.close();
  await fetch('http://127.0.0.1:9222/json/close/' + target.id);

  return { hasHorizontalScroll, scrollInfo };
}

try {
  const results = [];
  results.push(await capture('http://localhost:4173/', 1440, 900, path.join(SCREENSHOTS_DIR, 'home-1440.png')));
  results.push(await capture('http://localhost:4173/', 390, 844, path.join(SCREENSHOTS_DIR, 'home-390.png')));
  results.push(await capture('http://localhost:4173/syllabus', 1440, 900, path.join(SCREENSHOTS_DIR, 'syllabus-1440.png')));
  results.push(await capture('http://localhost:4173/syllabus', 390, 844, path.join(SCREENSHOTS_DIR, 'syllabus-390.png')));

  const allNoScroll = results.every((r) => !r.hasHorizontalScroll);
  console.log('All viewports have NO horizontal scroll:', allNoScroll);
} finally {
  console.log('Cleaning up processes...');
  chromeProcess.kill();
  previewProcess.kill();
  // On windows, force kill chrome if still running
  try {
    spawn('taskkill', ['/F', '/IM', 'chrome.exe', '/T']);
  } catch {}
}
