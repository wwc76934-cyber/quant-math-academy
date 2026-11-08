// Lint every LaTeX formula in the manuscript with the KaTeX parser.
// Any formula KaTeX cannot parse would also break the PDF pipeline, so these are hard errors.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = [path.join(root, 'src', 'chapters'), path.join(root, 'src', 'solutions'),
              path.join(root, 'src', 'frontmatter'), path.join(root, 'src', 'appendices')];
const files = [];
for (const d of dirs) if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (f.endsWith('.md')) files.push(path.join(d, f));
files.sort();

const problems = [];
let checked = 0, filesChecked = 0;

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  filesChecked++;
  // Mask fenced code blocks so shell/LaTeX-ish samples are not treated as math.
  const lines = text.split('\n');
  let inFence = false;
  const spans = []; // {tex, display, line}
  let buf = null; // open display formula: {tex, line}
  lines.forEach((line, idx) => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    const n = idx + 1;
    if (buf) {
      const end = line.indexOf('$$');
      if (end >= 0) { buf.tex += '\n' + line.slice(0, end); spans.push({ tex: buf.tex, display: true, line: buf.line }); buf = null;
        // remainder of line may hold inline math
        scanInline(line.slice(end + 2), n);
      } else buf.tex += '\n' + line;
      return;
    }
    // display open on this line?
    let rest = line, offset = 0;
    while (true) {
      const dd = rest.indexOf('$$', offset);
      if (dd < 0) break;
      const close = rest.indexOf('$$', dd + 2);
      if (close >= 0) { spans.push({ tex: rest.slice(dd + 2, close), display: true, line: n }); rest = rest.slice(0, dd) + rest.slice(close + 2); break; }
      buf = { tex: rest.slice(dd + 2), line: n }; rest = rest.slice(0, dd); break;
    }
    scanInline(rest, n);
  });
  function scanInline(s, n) {
    if (buf) return;
    let i = 0;
    while (i < s.length) {
      if (s[i] === '\\' && i + 1 < s.length) { i += 2; continue; } // skip \$ escapes
      if (s[i] === '$') {
        const close = s.indexOf('$', i + 1);
        if (close < 0) break;
        spans.push({ tex: s.slice(i + 1, close), display: false, line: n });
        i = close + 1; continue;
      }
      i++;
    }
  }
  if (buf) problems.push({ file: rel, line: buf.line, tex: buf.tex.slice(0, 60), error: '未闭合的 $$ 独立公式' });
  for (const sp of spans) {
    checked++;
    try {
      katex.renderToString(sp.tex, { displayMode: sp.display, throwOnError: true, strict: false });
    } catch (e) {
      problems.push({ file: rel, line: sp.line, tex: sp.tex.trim().slice(0, 90), error: String(e.message).split('\n')[0] });
    }
  }
}

fs.writeFileSync(path.join(root, 'build', 'math-lint-report.json'), JSON.stringify({ filesChecked, formulasChecked: checked, problemCount: problems.length, problems }, null, 2));
console.log(JSON.stringify({ filesChecked, formulasChecked: checked, problemCount: problems.length, problems: problems.slice(0, 40) }, null, 2));
if (problems.length) process.exitCode = 1;
