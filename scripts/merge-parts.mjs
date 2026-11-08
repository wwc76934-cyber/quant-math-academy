// Concatenate split chapter parts (Cxx-name.md + Cxx-name.partB.md ...) into a single chapter file.
// Parts are merged in lexical order of their suffix: base, .partB, .partC, ...
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'chapters');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

// group by base chapter file
const groups = new Map();
for (const f of files) {
  const m = f.match(/^(C\d+-[^.]+?)(?:\.(part[A-Z]))?\.md$/);
  if (!m) continue;
  const base = m[1];
  if (!groups.has(base)) groups.set(base, []);
  groups.get(base).push({ file: f, part: m[2] || '' });
}

const report = [];
const skipped = [];
for (const [base, parts] of groups) {
  if (parts.length < 2) continue;
  parts.sort((a, b) => a.part.localeCompare(b.part)); // '' < '.partB' < '.partC'
  // Guard: a chapter agent may have completed the base file after the split was planned.
  // Merging a part that repeats 本章小结/习题 would duplicate the closing sections.
  // The base file may be absent when the front half was written as `.partA.md`.
  const basePath = path.join(dir, `${base}.md`);
  const baseText = fs.existsSync(basePath) ? fs.readFileSync(basePath, 'utf8') : '';
  if (/^## 本章小结\s*$/m.test(baseText) || /^## 习题\s*$/m.test(baseText)) {
    skipped.push({ chapter: base, reason: 'base already contains 本章小结/习题', parts: parts.map(p => p.file) });
    continue;
  }
  // Guard 2: the tail fragment must already carry the closing sections. Merging while its
  // author is still appending splices a half-written tail into the chapter and then deletes
  // the very file that author is writing to — this destroyed C20 once.
  const tail = parts[parts.length - 1];
  const tailText = fs.readFileSync(path.join(dir, tail.file), 'utf8');
  if (tail.part && !/^## 本章小结\s*$/m.test(tailText) && !/^## 习题\s*$/m.test(tailText)) {
    skipped.push({ chapter: base, reason: 'tail fragment incomplete (no 本章小结/习题 yet)', parts: parts.map(p => p.file) });
    continue;
  }
  const merged = parts.map(p => fs.readFileSync(path.join(dir, p.file), 'utf8').trimEnd()).join('\n\n');
  const target = path.join(dir, `${base}.md`);
  fs.writeFileSync(target, merged + '\n');
  for (const p of parts) if (p.part) fs.unlinkSync(path.join(dir, p.file));
  report.push({ chapter: base, mergedFrom: parts.map(p => p.file), chars: merged.length });
}
console.log(JSON.stringify({ merged: report.length, report, skipped }, null, 2));
