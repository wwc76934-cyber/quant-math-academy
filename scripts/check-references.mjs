// Cross-reference audit for the Chinese textbook. Checks equation, environment,
// example and chapter references against the numbers actually present in the sources.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chDir = path.join(root, 'src', 'chapters');
const soDir = path.join(root, 'src', 'solutions');
const chapterFiles = fs.readdirSync(chDir).filter(f => /^C\d{2}-.*\.md$/.test(f));
const chapters = new Map();
const code = n => `C${String(n).padStart(2, '0')}`;
const ensure = n => {
  if (!chapters.has(n)) chapters.set(n, { files: [], envs: new Map(), examples: new Set(), tags: new Set(), sections: new Set() });
  return chapters.get(n);
};

for (const f of chapterFiles) {
  const n = Number(f.slice(1, 3));
  const c = ensure(n);
  c.files.push(f);
  const t = fs.readFileSync(path.join(chDir, f), 'utf8');
  for (const m of t.matchAll(/\*\*(定义|定理|引理|命题|推论|公理)\s+(\d+)\.(\d+)/g)) {
    const key = Number(m[3]);
    if (!c.envs.has(key)) c.envs.set(key, m[1]);
  }
  for (const m of t.matchAll(/\*\*例\s+(\d+)\.(\d+)/g)) c.examples.add(Number(m[2]));
  for (const m of t.matchAll(/\\tag\{(\d+)\.(\d+)\}/g)) c.tags.add(Number(m[2]));
  for (const m of t.matchAll(/^##\s+(\d+)\.(\d+)\s+/gm)) c.sections.add(Number(m[2]));
}

const missingChapters = [];
const missingItems = [];
const kindMismatches = [];
let referenceCount = 0;
const scanFile = (file, dir, ownChapter) => {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  lines.forEach((line, i) => {
    const where = `${file}:${i + 1}`;
    for (const m of line.matchAll(/式\s*[（(]\s*(\d+)\.(\d+)\s*[）)]/g)) {
      const n = Number(m[1]), k = Number(m[2]);
      referenceCount++;
      const c = chapters.get(n);
      if (!c) missingChapters.push({ where, reference: m[0], chapter: code(n) });
      else if (!c.tags.has(k)) missingItems.push({ where, reference: m[0], expected: `式（${n}.${k}）` });
    }
    for (const m of line.matchAll(/(定义|定理|引理|命题|推论|例)\s+(\d+)\.(\d+)/g)) {
      // Declarations define numbering rather than reference it.
      if (new RegExp(`^\\*\\*${m[1]}\\s+${m[2]}\\.${m[3]}(?:\\*|（|\\s)`).test(line)) continue;
      const kind = m[1], n = Number(m[2]), k = Number(m[3]);
      referenceCount++;
      const c = chapters.get(n);
      if (!c) { missingChapters.push({ where, reference: m[0], chapter: code(n) }); continue; }
      if (kind === '例') {
        if (!c.examples.has(k)) missingItems.push({ where, reference: m[0], expected: `例 ${n}.${k}` });
      } else if (!c.envs.has(k)) {
        missingItems.push({ where, reference: m[0], expected: `${kind} ${n}.${k}` });
      } else if (c.envs.get(k) !== kind) {
        kindMismatches.push({ where, reference: m[0], actual: `${c.envs.get(k)} ${n}.${k}` });
      }
    }
    for (const m of line.matchAll(/第\s*(\d+)\s*章/g)) {
      const n = Number(m[1]);
      if (n === ownChapter && /^#\s+第/.test(line)) continue;
      referenceCount++;
      if (!chapters.has(n)) missingChapters.push({ where, reference: m[0], chapter: code(n) });
    }
  });
};

for (const f of chapterFiles.filter(f => !f.includes('.part'))) scanFile(f, chDir, Number(f.slice(1, 3)));
if (fs.existsSync(soDir)) {
  for (const f of fs.readdirSync(soDir).filter(f => /^C\d{2}-.*\.md$/.test(f))) scanFile(f, soDir, Number(f.slice(1, 3)));
}

const report = {
  chaptersPresent: [...chapters.keys()].sort((a, b) => a - b).map(code),
  referenceCount,
  missingChapterCount: missingChapters.length,
  missingItemCount: missingItems.length,
  kindMismatchCount: kindMismatches.length,
  missingChapters,
  missingItems,
  kindMismatches,
};
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build', 'reference-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, missingChapters: missingChapters.slice(0, 30), missingItems: missingItems.slice(0, 50), kindMismatches: kindMismatches.slice(0, 30) }, null, 2));
process.exitCode = missingItems.length || kindMismatches.length ? 1 : 0;
