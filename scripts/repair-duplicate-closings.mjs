// Repair chapters where a split part was merged on top of an already-complete chapter,
// producing duplicate 本章小结 / 习题 sections. Keep the first closing block, drop the rest.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'chapters');
const report = [];

for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.md') && !x.includes('.part'))) {
  const p = path.join(dir, f);
  const text = fs.readFileSync(p, 'utf8');
  const marks = [...text.matchAll(/^## 本章小结\s*$/gm)];
  const exMarks = [...text.matchAll(/^## 习题\s*$/gm)];
  if (marks.length <= 1 && exMarks.length <= 1) continue;
  // Truncate at the earliest duplicated closing heading.
  const cutCandidates = [];
  if (marks.length > 1) cutCandidates.push(marks[1].index);
  if (exMarks.length > 1) cutCandidates.push(exMarks[1].index);
  const cut = Math.min(...cutCandidates);
  const kept = text.slice(0, cut).replace(/\s+$/, '') + '\n';
  fs.writeFileSync(p, kept);
  report.push({ file: f, summaryHeadings: marks.length, exerciseHeadings: exMarks.length,
                removedChars: text.length - kept.length, charsAfter: kept.length });
}
console.log(JSON.stringify({ repaired: report.length, report }, null, 2));
