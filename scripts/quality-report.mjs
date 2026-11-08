// Whole-book quality report. Emits one row per chapter covering structure, numbering,
// proof hygiene, exercise coverage and solution coverage, so the final gate is a single run
// instead of many ad-hoc greps. Exit code 1 only for defects that would corrupt the book:
// duplicate environment numbers, duplicate or gapped equation tags, duplicated closing
// sections, or an exercise/solution count mismatch.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const chDir = path.join(root, 'src', 'chapters');
const soDir = path.join(root, 'src', 'solutions');

const list = (d) => (fs.existsSync(d) ? fs.readdirSync(d).filter(f => f.endsWith('.md') && !f.includes('.part')) : []);
const read = (p) => fs.readFileSync(p, 'utf8');

const ENV = /\*\*(定义|定理|引理|命题|推论|公理)\s+(\d+)\.(\d+)/g;
const EX = /\*\*例\s+(\d+)\.(\d+)/g;
const TAG = /\\tag\{(\d+)\.(\d+)\}/g;

const rows = [];
const problems = [];

for (const f of list(chDir).sort()) {
  const n = Number(f.slice(1, 3));
  const t = read(path.join(chDir, f));
  const lines = t.split('\n');

  const envs = [...t.matchAll(ENV)].map(m => Number(m[3]));
  const exs = [...t.matchAll(EX)].map(m => Number(m[2]));
  const tags = [...t.matchAll(TAG)].map(m => Number(m[2]));

  const dup = (a) => { const s = new Set(), d = new Set(); a.forEach(x => (s.has(x) ? d.add(x) : s.add(x))); return [...d]; };
  const gaps = (a) => { if (!a.length) return []; const out = []; for (let i = 1; i <= Math.max(...a); i++) if (!a.includes(i)) out.push(i); return out; };

  const h1 = lines.filter(l => /^#\s/.test(l)).length;
  const summary = /^## 本章小结\s*$/m.test(t);
  const exSec = /^## 习题\s*$/m.test(t);
  const exSecCount = (t.match(/^## 习题\s*$/gm) || []).length;
  const sumCount = (t.match(/^## 本章小结\s*$/gm) || []).length;
  const sections = (t.match(/^## \d+\.\d+/gm) || []).length;

  // Exercise items live under `## 习题` only; count from that heading to EOF.
  const exIdx = t.search(/^## 习题\s*$/m);
  const exercises = exIdx < 0 ? 0 : (t.slice(exIdx).match(/^\d+\.\s/gm) || []).length;

  const proofs = (t.match(/^\*\*证明\*\*\s*$/gm) || []).length;
  const ends = (t.match(/^□\s*$/gm) || []).length;
  const straySquare = (t.match(/□/g) || []).length - ends;
  const solutionsFile = list(soDir).find(x => x.startsWith(`C${String(n).padStart(2, '0')}`));
  let solCount = null;
  if (solutionsFile) {
    const s = read(path.join(soDir, solutionsFile));
    solCount = (s.match(/^## \d+\.\s/gm) || []).length;
  }

  const bad = [];
  if (h1 !== 1) bad.push(`一级标题=${h1}`);
  if (sumCount > 1) bad.push(`本章小结重复×${sumCount}`);
  if (exSecCount > 1) bad.push(`习题节重复×${exSecCount}`);
  if (!summary) bad.push('缺本章小结');
  if (!exSec) bad.push('缺习题节');
  if (dup(envs).length) bad.push(`环境号重复:${dup(envs).join(',')}`);
  if (dup(exs).length) bad.push(`例题号重复:${dup(exs).join(',')}`);
  if (dup(tags).length) bad.push(`公式号重复:${dup(tags).join(',')}`);
  if (gaps(envs).length) bad.push(`环境号跳号:${gaps(envs).join(',')}`);
  if (gaps(exs).length) bad.push(`例题号跳号:${gaps(exs).join(',')}`);
  if (gaps(tags).length) bad.push(`公式号跳号:${gaps(tags).join(',')}`);
  // Derivations and proof sketches may legitimately close with □ without an exact
  // `**证明**` heading. Only a shortage of closing markers is a structural defect.
  if (ends < proofs) bad.push(`证明${proofs}/□${ends}缺少收尾`);
  if (straySquare) bad.push(`游离□×${straySquare}`);
  if (solCount === null) bad.push('解析缺失');
  else if (solCount !== exercises) bad.push(`题数${exercises}≠解析数${solCount}`);
  if (/\bTODO\b|待补充|待完善|占位符|placeholder/i.test(t)) bad.push('含占位标记');
  if (/\ba\.s\.|\ba\.e\./.test(t)) bad.push('含 a.s./a.e. 缩写');

  problems.push(...bad.map(b => `C${String(n).padStart(2, '0')} ${b}`));
  rows.push({
    ch: `C${String(n).padStart(2, '0')}`, chars: t.length, sections,
    envs: envs.length ? `${Math.min(...envs)}–${Math.max(...envs)}` : '-',
    exs: exs.length ? `${Math.min(...exs)}–${Math.max(...exs)}` : '-',
    tags: tags.length ? `${Math.min(...tags)}–${Math.max(...tags)}` : '-',
    proofs, exercises, solutions: solCount, ok: bad.length === 0, issues: bad,
  });
}

const present = rows.map(r => Number(r.ch.slice(1)));
const missingChapters = [];
for (let i = 1; i <= 34; i++) if (!present.includes(i)) missingChapters.push(`C${String(i).padStart(2, '0')}`);

console.log(JSON.stringify({
  chapters: rows.length, missingChapters,
  totals: {
    characters: rows.reduce((a, r) => a + r.chars, 0),
    exercises: rows.reduce((a, r) => a + r.exercises, 0),
    proofs: rows.reduce((a, r) => a + r.proofs, 0),
    solvedChapters: rows.filter(r => r.solutions !== null).length,
  },
  cleanChapters: rows.filter(r => r.ok).map(r => r.ch),
  problemCount: problems.length,
  problems,
  rows,
}, null, 1));
process.exitCode = problems.length ? 1 : 0;
