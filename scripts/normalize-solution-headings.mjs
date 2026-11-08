// Put solution exercise headings back on their own lines after incremental appends.
// A heading such as "……差异。## 6. " is always a formatting join, never prose.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src', 'solutions');
const changed = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
  const p = path.join(dir, f);
  const before = fs.readFileSync(p, 'utf8');
  const after = before.replace(/([^\n])(##\s+\d+\.[ \t]*)/g, '$1\n\n$2');
  if (after !== before) {
    fs.writeFileSync(p, after, 'utf8');
    const count = (before.match(/([^\n])(##\s+\d+\.[ \t]*)/g) || []).length;
    changed.push({ file: f, headingsSeparated: count });
  }
}
console.log(JSON.stringify({ changed }, null, 2));
