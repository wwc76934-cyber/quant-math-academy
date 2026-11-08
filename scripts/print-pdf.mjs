// Print the assembled book HTML to PDF through Chrome DevTools Protocol.
// Native Chrome pagination is fast enough for a 15 MB KaTeX document, and CDP gives us
// headerTemplate/footerTemplate (running head + page numbers), which the CLI cannot express.
// Chrome is spawned with stdio 'ignore' because the sandbox forbids opening named pipes.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.DSH_CHROME || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = Number(process.env.DSH_CDP_PORT || 9333);

const args = process.argv.slice(2);
let htmlPath = null, outPath = null, showRunningHead = true, headerOff = false, footerOff = false, zeroMargins = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--input') htmlPath = args[++i];
  else if (args[i] === '--output') outPath = args[++i];
  else if (args[i] === '--no-running-head') showRunningHead = false;
  else if (args[i] === '--no-header') headerOff = true;
  else if (args[i] === '--no-footer') footerOff = true;
  else if (args[i] === '--zero-margins') zeroMargins = true;
  else if (!htmlPath) htmlPath = args[i];
}
if (!htmlPath) htmlPath = path.join(root, 'build', '量化数学进阶教材.html');
if (!outPath) outPath = path.join(root, 'build', '量化数学进阶教材.pdf');
htmlPath = path.resolve(htmlPath); outPath = path.resolve(outPath);
if (!fs.existsSync(htmlPath)) { console.error(`HTML not found: ${htmlPath}`); process.exit(2); }
const url = 'file:///' + htmlPath.replace(/\\/g, '/');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchJson(u) {
  const res = await fetch(u);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${u}`);
  return res.json();
}

// Launch Chrome with a remote debugging port; never capture its stdio.
const profile = path.join(root, 'build', `cdp-profile-${PORT}`);
fs.rmSync(profile, { recursive: true, force: true });
fs.mkdirSync(profile, { recursive: true });
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
  '--allow-file-access-from-files', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore', detached: false });

let ws = null;
try {
  // Wait for the DevTools endpoint.
  let version = null;
  for (let i = 0; i < 60 && !version; i++) {
    await sleep(500);
    try { version = await fetchJson(`http://127.0.0.1:${PORT}/json/version`); } catch { version = null; }
  }
  if (!version) throw new Error('Chrome DevTools endpoint did not come up');

  ws = new WebSocket(version.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = e => rej(new Error('WS connect failed')); });

  let msgId = 0;
  const pending = new Map();
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(`${m.error.message}`)) : resolve(m.result);
    }
  };
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++msgId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify(sessionId ? { id, method, params, sessionId } : { id, method, params }));
  });
  const events = [];
  ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.method) events.push(m); });

  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);

  await S('Page.enable');
  await S('Runtime.enable');
  // Match the SCREEN layout width to the PRINTED content width, otherwise text wraps
  // differently and every measured page number is wrong. B5 176mm minus 19+19mm margins
  // = 138mm = 521.6 CSS px at 96dpi.
  const CONTENT_WIDTH_PX = Math.round((176 - 19 - 19) / 25.4 * 96);
  await S('Emulation.setDeviceMetricsOverride', { width: CONTENT_WIDTH_PX, height: 1200, deviceScaleFactor: 2, mobile: false });
  await S('Page.navigate', { url });

  // Wait for load, then for fonts and any pagination script to settle.
  const deadline = Date.now() + Number(process.env.DSH_PRINT_TIMEOUT_MS || 900000);
  let loaded = false;
  while (Date.now() < deadline) {
    await sleep(700);
    try {
      const r = await S('Runtime.evaluate', {
        expression: 'document.readyState', returnByValue: true,
      });
      if (r.result && r.result.value === 'complete') { loaded = true; break; }
    } catch { /* navigation still in flight */ }
  }
  if (!loaded) throw new Error('page never reached readyState=complete');

  // Give KaTeX/Paged.js time, and honour an explicit readiness flag when present.
  const readyExpr = `(function(){
    if (document.body && document.body.dataset && document.body.dataset.pagedReady) return true;
    if (window.PagedPolyfill) return true;
    return document.fonts && document.fonts.status === 'loaded';
  })()`;
  for (let i = 0; i < 240 && Date.now() < deadline; i++) {
    const r = await S('Runtime.evaluate', { expression: readyExpr, returnByValue: true });
    if (r.result && r.result.value === true) break;
    await sleep(1000);
  }
  await sleep(2500);

  // Newer Chromium renders CSS @page margin boxes; when the page-number/running-head overlay
  // supplies them instead (split printing), suppress the stylesheet versions to avoid doubling.
  if (headerOff && footerOff && !zeroMargins) {
    await S('Runtime.evaluate', {
      expression: `(function(){var s=document.createElement('style');s.textContent='@page{@top-center{content:none}@bottom-center{content:none}}@page front{@top-center{content:none}@bottom-center{content:none}}';document.head.appendChild(s);return true;})()`,
      returnByValue: true,
    });
    await sleep(300);
  }

  // Report layout stats so we can detect a blank or truncated render.
  const stats = await S('Runtime.evaluate', {
    expression: `(function(){
      var b = document.body;
      return JSON.stringify({
        bodyChildren: b ? b.children.length : -1,
        textChars: b ? (b.innerText || '').length : -1,
        katex: document.querySelectorAll('.katex').length,
        scrollHeight: document.documentElement.scrollHeight
      });
    })()`, returnByValue: true,
  });

  // Optional pass 1: measure where every TOC target lands so pass 2 can print real
  // page numbers. Chrome screen layout ignores page breaks, so we simulate pagination:
  // each element that forces a break starts a new page, and content inside a section
  // advances by floor(offset / printableHeight).
  const tocMapOut = (() => { const i = args.indexOf('--emit-toc-map'); return i >= 0 ? path.resolve(args[i + 1]) : null; })();
  if (tocMapOut) {
    const measure = await S('Runtime.evaluate', {
      expression: `(function(){
        var H = ${((250 - 20 - 20) / 25.4 * 96).toFixed(3)}; // printable height in CSS px
        var ids = Array.prototype.map.call(document.querySelectorAll('.toc a[href^="#"]'), function(a){
          return a.getAttribute('href').slice(1);
        });
        var absTop = function(el){ var y = 0; while (el) { y += el.offsetTop || 0; el = el.offsetParent; } return y; };
        // Sections that force a page break, in document order.
        var breakers = Array.prototype.slice.call(document.querySelectorAll(
          '.cover, .title-page, .toc, .part, .chapter, .solution-chapter, .backmatter, .frontmatter'));
        breakers.sort(function(a,b){ return absTop(a) - absTop(b); });
        var spans = [];
        for (var i = 0; i < breakers.length; i++) {
          var el = breakers[i];
          spans.push({ top: absTop(el), height: el.offsetHeight || 0, startPage: 0 });
        }
        // Assign start pages: first span starts at page 1, each next starts after the previous ends.
        var page = 1;
        for (var j = 0; j < spans.length; j++) {
          spans[j].startPage = page;
          var pages = Math.max(1, Math.ceil(spans[j].height / H));
          page += pages;
        }
        var locate = function(y){
          for (var k = spans.length - 1; k >= 0; k--) {
            if (y >= spans[k].top - 1) {
              var off = y - spans[k].top;
              return spans[k].startPage + Math.floor(off / H);
            }
          }
          return 1;
        };
        var map = {};
        ids.forEach(function(id){
          var t = document.getElementById(id);
          if (!t) return;
          map[id] = locate(absTop(t));
        });
        return JSON.stringify({ pageCountEstimate: page - 1, entries: Object.keys(map).length, map: map });
      })()`,
      returnByValue: true,
    });
    const parsed = JSON.parse(measure.result.value);
    fs.mkdirSync(path.dirname(tocMapOut), { recursive: true });
    fs.writeFileSync(tocMapOut, JSON.stringify(parsed.map, null, 1));
    console.log(JSON.stringify({ tocMap: tocMapOut, entries: parsed.entries, pageCountEstimate: parsed.pageCountEstimate }));
  }

  const measureOnly = args.includes('--measure-only');
  const pdf = measureOnly ? null : await S('Page.printToPDF', {
    landscape: false,
    displayHeaderFooter: true,
    printBackground: true,
    preferCSSPageSize: false,
    paperWidth: 176 / 25.4,
    paperHeight: 250 / 25.4,
    marginTop: zeroMargins ? 0 : 20 / 25.4,
    marginBottom: zeroMargins ? 0 : 20 / 25.4,
    marginLeft: zeroMargins ? 0 : 19 / 25.4,
    marginRight: zeroMargins ? 0 : 19 / 25.4,
    scale: 1,
    headerTemplate: (headerOff || !showRunningHead)
      ? '<div></div>'
      : '<div style="width:100%;font-size:7.5pt;color:#6b7280;text-align:center;font-family:\'Noto Serif SC\',serif;">量化数学进阶教材</div>',
    footerTemplate: footerOff
      ? '<div></div>'
      : '<div style="width:100%;font-size:8pt;color:#4b5563;text-align:center;font-family:Cambria,serif;"><span class="pageNumber"></span></div>',
  });
  if (measureOnly) {
    console.log(JSON.stringify({ measuredOnly: true, layout: JSON.parse(stats.result.value) }));
  } else {
    if (!pdf || !pdf.data) throw new Error('printToPDF returned no data');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(pdf.data, 'base64'));
    console.log(JSON.stringify({ output: outPath, bytes: fs.statSync(outPath).size, layout: JSON.parse(stats.result.value) }, null, 2));
  }
} catch (e) {
  console.error('print-pdf failed:', e.message);
  process.exitCode = 1;
} finally {
  try { if (ws && ws.readyState === 1) ws.close(); } catch {}
  try { chrome.kill(); } catch {}
  await sleep(500);
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch {}
}
