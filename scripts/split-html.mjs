// Split the assembled book HTML into page-break-aligned parts for memory-bounded printing.
// Splits only at boundaries between top-level sections where CSS forces a page break
// (.part / .solution-chapter), so concatenating the printed parts reproduces the continuous layout.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const build = path.join(root, 'build');
const input = process.argv.includes('--input')
  ? path.resolve(process.argv[process.argv.indexOf('--input') + 1])
  : path.join(build, '量化数学进阶教材.html');

const html = fs.readFileSync(input, 'utf8');
const headEnd = html.indexOf('<body>');
if (headEnd < 0) throw new Error('no <body> tag');
const head = html.slice(0, headEnd + '<body>'.length);
const body = html.slice(headEnd + '<body>'.length);
const tail = '</body></html>';

// Candidate split points: boundary between a closing </section> and an opening top-level
// section that forces a page break. The rendered HTML may or may not contain whitespace
// between adjacent sections, so match tolerantly.
const markers = [
  /<\/section>\s*<section class="part" id="part-6">/,
  /<\/section>\s*<section class="part" id="solutions">/,
];

let chunks = [body];
for (const marker of markers) {
  const next = [];
  for (const chunk of chunks) {
    const m = chunk.match(marker);
    if (!m) { next.push(chunk); continue; }
    // keep "</section>" with the left chunk and the next opening section with the right chunk
    next.push(chunk.slice(0, m.index + '</section>'.length));
    next.push(chunk.slice(m.index + '</section>'.length));
  }
  chunks = next;
}

const parts = [];
chunks.forEach((chunk, i) => {
  const file = path.join(build, `_part${i + 1}.html`);
  fs.writeFileSync(file, head + chunk + tail);
  parts.push({ file, bytes: fs.statSync(file).size });
});
const manifest = path.join(build, '_parts.json');
fs.writeFileSync(manifest, JSON.stringify({ input, parts }, null, 2));
console.log(JSON.stringify({ manifest, parts: parts.map(p => ({ file: path.basename(p.file), bytes: p.bytes })) }, null, 2));
