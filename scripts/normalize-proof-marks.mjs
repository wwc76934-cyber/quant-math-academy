// Normalise proof-end markers. STYLE_GUIDE requires 证明 to open on its own line and □ to
// close on a line containing nothing else. Several chapters write "……　□" at the end of the
// last proof paragraph instead, which the DOCX postprocessor cannot style as a proof end.
// This rewrites every trailing □ onto its own line, preceded by a blank line.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dirs = ['src/chapters', 'src/solutions'];
const report = [];

for (const d of dirs) {
  const dir = path.join(root, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md'))) {
    const p = path.join(dir, f);
    const text = fs.readFileSync(p, 'utf8');
    let moved = 0;
    // Several chapters close a proof with "$\square$" inside the last sentence rather than the
    // literal □. Convert that form first so the trailing-marker rule below can move it.
    const latexEnds = (text.match(/\$\\square\$/g) || []).length;
    const base = text.replace(/\$\\square\$/g, '□');
    const out = base.split('\n').map(line => {
      // A line whose only content is □ (allowing surrounding whitespace) is already correct.
      if (/^\s*□\s*$/.test(line)) return '□';
      const m = line.match(/^(.*\S)[ \t\u3000]*(□+)\s*$/);
      if (m && m[1].length && !/□$/.test(m[1])) { moved += m[2].length; return m[1] + '\n\n' + m[2]; }
      return line;
    }).join('\n');
    if (moved || latexEnds) {
      fs.writeFileSync(p, out);
      report.push({ file: d + '/' + f, latexSquares: latexEnds, markersMoved: moved });
    }
  }
}

// Summarise the resulting state so imbalance shows up immediately.
const summary = [];
for (const d of dirs) {
  const dir = path.join(root, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md') && !x.includes('.part'))) {
    const t = fs.readFileSync(path.join(dir, f), 'utf8');
    const proofs = (t.match(/^\*\*证明\*\*\s*$/gm) || []).length;
    const ends = (t.match(/^□\s*$/gm) || []).length;
    const inline = (t.match(/□/g) || []).length - ends;
    if (proofs || ends) summary.push({ file: d + '/' + f, proofs, ends, unbalanced: proofs !== ends, strayInline: inline });
  }
}
console.log(JSON.stringify({ moved: report, balance: summary.filter(s => s.unbalanced || s.strayInline) }, null, 2));
