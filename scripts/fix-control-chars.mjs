// Repair invisible control-character corruption in manuscript math and stray English words.
// The form feed (0x0C) silently replaced the backslash of "\frac", leaving "rac12".
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['src/chapters', 'src/solutions', 'src/frontmatter', 'src/appendices'].map(d => path.join(root, d));
const report = [];

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const p = path.join(dir, f);
    const before = fs.readFileSync(p, 'utf8');
    let after = before;
    const fixes = [];

    // "\f" + "rac" -> "\frac": a form feed ate the backslash of the macro.
    const ffRac = after.match(/\x0Crac/g);
    if (ffRac) { after = after.replace(/\x0Crac/g, '\\frac'); fixes.push(`\\frac 修复 x${ffRac.length}`); }

    // Any remaining C0 control chars except \n and \t are corruption in prose/math source.
    const stray = after.match(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g);
    if (stray) {
      const counts = {};
      for (const c of stray) counts['0x' + c.charCodeAt(0).toString(16).padStart(2, '0')] = (counts['0x' + c.charCodeAt(0).toString(16).padStart(2, '0')] || 0) + 1;
      after = after.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
      fixes.push('移除残留控制符 ' + JSON.stringify(counts));
    }

    if (after !== before) {
      fs.writeFileSync(p, after);
      report.push({ file: path.relative(root, p).replace(/\\/g, '/'), fixes });
    }
  }
}
console.log(JSON.stringify({ repaired: report.length, report }, null, 2));
