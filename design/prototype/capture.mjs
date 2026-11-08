// Prototype screenshot helper. Requires Chrome started with:
//   chrome --headless=new --remote-debugging-port=9222 --user-data-dir=...
// Usage: node capture.mjs <url> <width> <height> <out.png> [full]
import fs from 'node:fs';

const [url, widthArg, heightArg, out, full] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: node capture.mjs <url> <width> <height> <out.png> [full]');
  process.exit(2);
}
const width = Number(widthArg) || 390;
const height = Number(heightArg) || 900;

const res = await fetch('http://127.0.0.1:9222/json/new?' + encodeURIComponent(url), { method: 'PUT' });
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
const send = (method, params = {}) => new Promise((resolve) => {
  const id = ++seq;
  pending.set(id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});
await new Promise((resolve) => { ws.onopen = resolve; });
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
await new Promise((resolve) => setTimeout(resolve, 2800));
const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: Boolean(full),
  fromSurface: true,
});
fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
console.log(JSON.stringify({ out, width, height, full: Boolean(full), bytes: fs.statSync(out).size }));
ws.close();
await fetch('http://127.0.0.1:9222/json/close/' + target.id);
