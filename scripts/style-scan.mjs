// Advisory scan for conversational/avoidance wording and notation banned by the writing spec.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['src/chapters', 'src/solutions'];
const patterns = [
  ['显然', /显然/g],
  ['回避性略写', /(?:证明略|此处略|从略|略去|留给读者|读者自证|同理可证|同前)/g],
  ['a.s./a.e.', /\ba\.s\.|\ba\.e\./g],
  ['几乎处处', /几乎处处/g],
  ['LaTeX square', /\$\\square\$/g],
  ['占位', /\bTODO\b|待补充|待完善|占位符|placeholder/gi],
];
const hits = [];
for (const d of dirs) {
  const dir = path.join(root, d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.includes('.part'))) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const [kind, re] of patterns) {
        re.lastIndex = 0;
        if (re.test(line)) hits.push({ file: `${d}/${f}`, line: i + 1, kind, text: line.trim().slice(0, 180) });
      }
    });
  }
}
const report = { count: hits.length, hits };
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build', 'style-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ count: hits.length, hits: hits.slice(0, 100) }, null, 2));
