// Shift numbered-environment labels in one chapter fragment so it continues after the
// previous fragment. Descending order prevents a shifted label from being shifted again.
// Only 定义/定理/引理/命题/推论 labels and their cross-references move; equation \tag
// numbers and 例 numbers are separate counters and are left untouched.
import fs from 'node:fs';

const [file, fromStr, toStr, deltaStr] = process.argv.slice(2);
const from = Number(fromStr), to = Number(toStr), delta = Number(deltaStr);
if (!file || !Number.isFinite(from) || !Number.isFinite(to) || !Number.isFinite(delta)) {
  console.error('usage: node shift-env-numbers.mjs <file> <from> <to> <delta>');
  process.exit(2);
}

const text = fs.readFileSync(file, 'utf8');
const kinds = '定义|定理|引理|命题|推论';
const changes = [];
let out = text;

const order = [];
if (delta > 0) for (let n = to; n >= from; n--) order.push(n);
else for (let n = from; n <= to; n++) order.push(n);

for (const n of order) {
  const target = n + delta;
  const re2 = new RegExp(`(${kinds})([ \\u3000]*)(\\d+)\\.${n}(?!\\d)`, 'g');
  let count = 0;
  out = out.replace(re2, (m, kind, sp, ch) => { count++; return `${kind}${sp}${ch}.${target}`; });
  if (count) changes.push({ from: `.${n}`, to: `.${target}`, occurrences: count });
}

fs.writeFileSync(file, out);
const remaining = [...out.matchAll(new RegExp(`\\*\\*(${kinds})\\s+(\\d+\\.\\d+)`, 'g'))].map(m => m[2]);
console.log(JSON.stringify({ file, changes, environmentLabels: remaining }, null, 2));
