// Generate a page-number + running-head overlay HTML for memory-bounded split printing.
// Each .pg is exactly one B5 page (176x250mm); printed with --zero-margins it yields one
// overlay PDF page per book page. Pages are numbered by physical position (1-based), so the
// numbers match the TOC resolver, which also uses physical page indices.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');

const args = process.argv.slice(2);
const pages = Number(args[0] || 0);
const skip = Number(process.env.OVERLAY_SKIP || 2);          // cover + title page carry no number
const title = process.env.OVERLAY_TITLE || '量化数学进阶教材';

if (!pages || pages < 1) { console.error('usage: make-numbers.mjs <pages>'); process.exit(2); }

const divs = [];
for (let i = 0; i < pages; i++) {
  const k = i + skip + 1;                                    // physical page number (1-based)
  divs.push(`<div class="pg"><div class="head">${title}</div><div class="num">${k}</div></div>`);
}
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
body{margin:0;padding:0}
.pg{width:176mm;height:250mm;position:relative;overflow:hidden;break-after:page}
.pg:last-child{break-after:auto}
.head{position:absolute;top:9mm;left:0;right:0;text-align:center;font-family:'Noto Serif SC','Noto Serif CJK SC',serif;font-size:7.5pt;color:#6b7280}
.num{position:absolute;bottom:10mm;left:0;right:0;text-align:center;font-family:Cambria,serif;font-size:8pt;color:#4b5563}
</style></head><body>${divs.join('')}</body></html>`;
const out = path.join(build, '_numbers.html');
fs.writeFileSync(out, html);
console.log(JSON.stringify({ output: out, pages, skip }));
