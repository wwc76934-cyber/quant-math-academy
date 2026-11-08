// Print the book in memory-bounded parts and recombine into one numbered PDF.
// Chrome's single-shot printToPDF exhausts a 15 GB machine on this ~700-page KaTeX document,
// so we split at page-break-aligned section boundaries, print each part, merge with pypdf and
// stamp page numbers + running head as an overlay (the CDP header/footer templates cannot
// offset page numbers across separate prints).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const PY = 'D:\\deepseek-harness\\data\\dsh-runtimes\\dsh-primary-runtime\\dependencies\\python\\python.exe';

const args = process.argv.slice(2);
let htmlPath = null, outPath = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--input') htmlPath = args[++i];
  else if (args[i] === '--output') outPath = args[++i];
  else if (!htmlPath) htmlPath = args[i];
}
if (!htmlPath) htmlPath = path.join(build, '量化数学进阶教材.html');
if (!outPath) outPath = path.join(build, '量化数学进阶教材.pdf');
htmlPath = path.resolve(htmlPath); outPath = path.resolve(outPath);

const run = (cmd, argv, env) => execFileSync(cmd, argv, { cwd: root, stdio: 'inherit', env: { ...process.env, ...(env || {}) } });

// 1) split at page-break-aligned boundaries
execFileSync(process.execPath, [path.join(root, 'scripts', 'split-html.mjs'), '--input', htmlPath], { cwd: root, stdio: 'ignore' });
const parts = JSON.parse(fs.readFileSync(path.join(build, '_parts.json'), 'utf8')).parts;
console.error(`parts: ${parts.map(p => `${path.basename(p.file)}=${(p.bytes / 1e6).toFixed(1)}MB`).join(', ')}`);

// 2) print each part without CDP header/footer (the overlay supplies both)
const partPdfs = [];
parts.forEach((p, i) => {
  const pdf = path.join(build, `_print${i + 1}.pdf`);
  console.error(`print part ${i + 1}/${parts.length} ...`);
  run(process.execPath, [path.join(root, 'scripts', 'print-pdf.mjs'), '--input', p.file, '--output', pdf, '--no-header', '--no-footer']);
  if (!fs.existsSync(pdf)) throw new Error(`print produced no PDF for part ${i + 1}`);
  partPdfs.push(pdf);
});

// 3) merge
const merged = path.join(build, '_merged.pdf');
const mergeRes = JSON.parse(execFileSync(PY, [path.join(root, 'scripts', 'pdf_merge.py'), 'merge', merged, ...partPdfs], { cwd: root, encoding: 'utf8' }));
const total = mergeRes.pages;
console.error(`merged: ${total} pages`);

// 4) build and print the page-number overlay (skip cover + title page)
const skip = Number(process.env.OVERLAY_SKIP || 2);
run(process.execPath, [path.join(root, 'scripts', 'make-numbers.mjs'), String(total - skip)], { OVERLAY_SKIP: String(skip) });
const numbersHtml = path.join(build, '_numbers.html');
const numbersPdf = path.join(build, '_numbers.pdf');
console.error('print page-number overlay ...');
run(process.execPath, [path.join(root, 'scripts', 'print-pdf.mjs'), '--input', numbersHtml, '--output', numbersPdf, '--zero-margins', '--no-header', '--no-footer']);

// 5) stamp numbers and write the deliverable
run(PY, [path.join(root, 'scripts', 'pdf_merge.py'), 'overlay', merged, numbersPdf, outPath, String(skip)]);
console.log(JSON.stringify({ output: outPath, pages: total, parts: parts.length, bytes: fs.statSync(outPath).size }));
