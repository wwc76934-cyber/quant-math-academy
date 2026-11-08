import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const partial = process.argv.includes('--allow-partial');
const report = { chapters: [], errors: [], warnings: [], totals: { chapters: 0, solutions: 0, exercises: 0, characters: 0, equations: 0 } };
const code = n => `C${String(n).padStart(2, '0')}`;
const find = (dir, n, sol = false) => (fs.existsSync(dir) ? fs.readdirSync(dir) : []).find(f => f.startsWith(code(n)) && f.endsWith('.md') && (!sol || f.includes('solution')));
const forbidden = [/TODO/i, /待补充/, /此处略去/, /占位内容/, /恭喜你学/, /接下来我们来看看/, /你只需要记住/];
for (let n = 1; n <= 34; n++) {
  const cf = find(path.join(root, 'src', 'chapters'), n);
  const sf = find(path.join(root, 'src', 'solutions'), n, true);
  if (!cf) { report.errors.push(`${code(n)} 正文缺失`); continue; }
  const text = fs.readFileSync(path.join(root, 'src', 'chapters', cf), 'utf8');
  const solution = sf ? fs.readFileSync(path.join(root, 'src', 'solutions', sf), 'utf8') : '';
  if (!sf) report.errors.push(`${code(n)} 解析缺失`);
  report.totals.chapters++;
  if (sf) report.totals.solutions++;
  report.totals.characters += [...text].length;
  const c = { chapter: n, file: cf, characters: [...text].length, exercises: 0, solutions: 0, equations: 0 };
  if (!new RegExp(`^# 第${n}章`, 'm').test(text)) report.errors.push(`${code(n)} 一级标题章号不匹配`);
  if (!/^## 习题\s*$/m.test(text)) report.errors.push(`${code(n)} 缺少习题节`);
  if (!/^## 本章小结\s*$/m.test(text)) report.warnings.push(`${code(n)} 缺少本章小结`);
  for (const re of forbidden) if (re.test(text) || re.test(solution)) report.errors.push(`${code(n)} 含禁用或占位表达：${re}`);
  const dollars = (text.match(/\$\$/g) || []).length + (solution.match(/\$\$/g) || []).length;
  if (dollars % 2) report.errors.push(`${code(n)} 独立公式定界符不配对`);
  const tags = [...text.matchAll(/\\tag\{(\d+)\.(\d+)\}/g)].map(m => ({ chapter: Number(m[1]), eq: Number(m[2]) }));
  c.equations = tags.length;
  report.totals.equations += tags.length;
  tags.forEach((t, i) => {
    if (t.chapter !== n) report.errors.push(`${code(n)} 公式编号章号错误：${t.chapter}.${t.eq}`);
    if (t.eq !== i + 1) report.errors.push(`${code(n)} 公式编号不连续：第 ${i + 1} 个 tag 为 ${t.eq}`);
  });
  const exSection = text.split(/^## 习题\s*$/m)[1] || '';
  const exNums = [...exSection.matchAll(/^(\d+)\.\s+/gm)].map(m => Number(m[1]));
  c.exercises = exNums.length;
  // Solutions may legitimately use either "## n." headings or an "n. " numbered list;
  // accept whichever the file consistently uses, preferring explicit headings.
  const headingStyle = [...solution.matchAll(/^## (\d+)\.\s*$/gm)].map(m => Number(m[1]));
  const listStyle = [...solution.matchAll(/^(\d+)\.\s+/gm)].map(m => Number(m[1]));
  const solNums = headingStyle.length >= listStyle.length ? headingStyle : listStyle;
  c.solutionStyle = headingStyle.length >= listStyle.length ? 'heading' : 'list';
  c.solutions = solNums.length;
  report.totals.exercises += exNums.length;
  if (exNums.length < 16) report.errors.push(`${code(n)} 习题仅 ${exNums.length} 道`);
  if (JSON.stringify(exNums) !== JSON.stringify(Array.from({ length: exNums.length }, (_, i) => i + 1))) report.errors.push(`${code(n)} 习题题号不连续`);
  if (JSON.stringify(exNums) !== JSON.stringify(solNums)) report.errors.push(`${code(n)} 习题与解析题号不对应：${exNums.join(',')} / ${solNums.join(',')}`);
  if ([...text].length < 10000) report.warnings.push(`${code(n)} 正文仅 ${[...text].length} 字符，需人工核查是否达到完整教材深度`);
  const defs = [...text.matchAll(/\*\*(定义|定理|引理|命题|推论)\s+(\d+)\.(\d+)/g)];
  for (const m of defs) if (Number(m[2]) !== n) report.errors.push(`${code(n)} 数学环境章号错误：${m[0]}`);
  report.chapters.push(c);
}
fs.mkdirSync(path.join(root, 'build'), { recursive: true });
fs.writeFileSync(path.join(root, 'build', 'validation-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ totals: report.totals, errors: report.errors, warnings: report.warnings }, null, 2));
if (report.errors.length && !partial) process.exit(1);
