import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import katex from 'katex';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'build');
const allowPartial = process.argv.includes('--allow-partial');
const skipSolutions = process.argv.includes('--skip-solutions');
// Paged.js paginates in JS and is far too slow for a 15 MB KaTeX document; the default
// path lets Chrome paginate natively and supplies page numbers through CDP templates.
const usePaged = process.argv.includes('--paged');
// Two-pass TOC: pass 1 measures page numbers, pass 2 injects them as static text
// because Chrome does not implement target-counter().
const tocMapArg = process.argv.indexOf('--toc-map');
const tocMapPath = tocMapArg >= 0 ? process.argv[tocMapArg + 1] : null;
const tocMap = tocMapPath && fs.existsSync(tocMapPath) ? JSON.parse(fs.readFileSync(tocMapPath, 'utf8')) : {};
fs.mkdirSync(out, { recursive: true });

const parts = [
  { n: 1, title: '数学语言与分析基础', range: [1, 3], desc: '以严格的逻辑语言和实数理论重建微积分基础，为后续概率、矩阵与优化理论建立统一的推理框架。' },
  { n: 2, title: '线性代数与矩阵分析', range: [4, 8], desc: '从线性映射与正交投影出发，建立谱理论、矩阵分解及其在统计建模和风险管理中的数学基础。' },
  { n: 3, title: '组合、概率论与随机变量', range: [9, 14], desc: '由计数与概率空间进入随机变量、条件期望和极限定理，形成概率推理与统计渐近分析的完整链条。' },
  { n: 4, title: '凸优化与数值计算', range: [15, 18], desc: '研究凸性、最优性条件、对偶理论、迭代算法与数值误差，并建立随机模拟的误差控制方法。' },
  { n: 5, title: '数理统计、回归与统计学习', range: [19, 23], desc: '以抽样分布为中心连接估计、检验、回归、Bayesian 决策和统计学习，强调推断结论的成立条件。' },
  { n: 6, title: '随机过程与随机分析', range: [24, 27], desc: '由离散时间随机过程进入鞅、Brown 运动和 Itô 随机分析，进而讨论随机微分方程与测度变换。' },
  { n: 7, title: '时间序列分析', range: [28, 30], desc: '围绕动态相关结构研究 ARMA、单位根、协整、状态空间、波动率模型与相关数据推断。' },
  { n: 8, title: '量化研究数学综合', range: [31, 34], desc: '将概率、统计、矩阵、优化和随机过程综合应用于因子研究、投资组合、衍生品定价与研究答辩。' }
];

const chapterTitles = {
  1:'数学语言、证明方法与实数完备性',2:'一元微积分、Taylor 公式与级数',3:'多元微积分、多重积分与常微分方程',
  4:'向量空间、线性映射与线性方程组',5:'内积、正交投影与最小二乘',6:'特征值、对角化与谱定理',7:'二次型、正定矩阵与矩阵微分',8:'QR、Cholesky、SVD、PCA 与条件数',
  9:'组合计数、概率空间与 Bayes 推断',10:'随机变量、常见分布与变量变换',11:'期望、方差、矩与概率不等式',12:'联合分布、协方差与次序统计量',13:'条件期望、条件方差与最优预测',14:'随机变量收敛、大数定律与中心极限定理',
  15:'凸集、凸函数与共轭工具',16:'Lagrange、KKT、对偶与敏感性',17:'迭代优化算法',18:'数值方法与 Monte Carlo',
  19:'抽样分布、点估计与极大似然',20:'置信区间、假设检验与多重检验',21:'线性回归、投影与统计推断',22:'Bayesian 推断与统计决策',23:'正则化、统计学习与重采样',
  24:'随机游走、Markov 链与 Poisson 过程',25:'鞅、停时与最优停止',26:'Brown 运动、二次变差与 Itô 积分',27:'随机微分方程、测度变换与 Feynman–Kac',
  28:'平稳时间序列与 ARMA',29:'单位根、协整、VAR 与状态空间',30:'波动率模型与相关数据推断',
  31:'因子模型、IC/RankIC 与研究有效性',32:'投资组合优化与风险度量',33:'无套利、风险中性定价与 Greeks',34:'数学建模、综合项目与量化考核'
};

const codeOf = n => `C${String(n).padStart(2, '0')}`;
const findChapterFile = (dir, n, solution = false) => {
  const code = codeOf(n);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  // Skip split fragments (…partB.md): merge-parts.mjs folds them into the base file first.
  return files.find(f => f.startsWith(code) && f.endsWith('.md') && !f.includes('.part') && (solution ? f.includes('solution') : true));
};

function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function plainText(s) { return s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); }

function renderMarkdown(source, idPrefix) {
  const maths = [];
  const storeMath = (tex, displayMode) => {
    const idx = maths.length;
    let html;
    try { html = katex.renderToString(tex.trim(), { displayMode, throwOnError: true, strict: 'warn', output: 'html' }); }
    catch (e) { throw new Error(`${idPrefix} 公式渲染失败：${e.message}\n${tex}`); }
    maths.push(displayMode ? `<span class="math-display">${html}</span>` : html);
    return `<!--MATH${idx}-->`;
  };
  let text = source.replace(/\r\n/g, '\n');
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => storeMath(tex, true));
  text = text.replace(/(?<!\$)\$([^$\n]+?)\$(?!\$)/g, (_, tex) => storeMath(tex, false));
  const headings = [];
  let h2 = 0, h3 = 0;
  const renderer = {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      let id;
      if (depth === 1) { id = idPrefix; h2 = 0; h3 = 0; }
      else if (depth === 2) { h2 += 1; h3 = 0; id = `${idPrefix}-s${h2}`; }
      else { h3 += 1; id = `${idPrefix}-s${h2}-${h3}`; }
      headings.push({ depth, id, text: plainText(inner) });
      return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
    }
  };
  marked.use({ gfm: true, breaks: false, renderer });
  let html = marked.parse(text);
  const classes = ['定义','定理','引理','命题','推论','例','注记','证明','解'];
  html = html.replace(/<p><strong>(定义|定理|引理|命题|推论|例|注记|证明|解)([\s\S]*?)<\/strong><\/p>/g,
    (_, kind, rest) => `<p class="env-heading env-heading--${kind}"><strong>${kind}${rest}</strong></p>`);
  html = html.replace(/<!--MATH(\d+)-->/g, (_, i) => maths[Number(i)]);
  return { html, headings };
}

function readFront(name, fallbackTitle) {
  const p = path.join(root, 'src', 'frontmatter', name);
  if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  return `# ${fallbackTitle}\n\n本部分将在全书编辑阶段定稿。\n`;
}

const tocItems = [];
const bodyChunks = [];
const solutionChunks = [];
const missing = [];

const preface = renderMarkdown(readFront('preface.md', '前言'), 'preface');
const usage = renderMarkdown(readFront('usage.md', '本书使用说明'), 'usage');
bodyChunks.push(`<section class="frontmatter">${preface.html}</section>`, `<section class="frontmatter">${usage.html}</section>`);

for (const part of parts) {
  bodyChunks.push(`<section class="part" id="part-${part.n}"><div class="part-kicker">第${['一','二','三','四','五','六','七','八'][part.n-1]}篇</div><h1>${part.title}</h1><p class="part-desc">${part.desc}</p></section>`);
  tocItems.push({ type: 'part', id: `part-${part.n}`, text: `第${['一','二','三','四','五','六','七','八'][part.n-1]}篇　${part.title}` });
  for (let n = part.range[0]; n <= part.range[1]; n++) {
    const file = findChapterFile(path.join(root, 'src', 'chapters'), n);
    if (!file) { missing.push(codeOf(n)); if (!allowPartial) throw new Error(`缺少第 ${n} 章正文`); continue; }
    const source = fs.readFileSync(path.join(root, 'src', 'chapters', file), 'utf8');
    const rendered = renderMarkdown(source, codeOf(n));
    bodyChunks.push(`<section class="chapter" data-chapter="${codeOf(n)}">${rendered.html}</section>`);
    const h1 = rendered.headings.find(h => h.depth === 1);
    tocItems.push({ type: 'chapter', id: codeOf(n), text: h1?.text || `第${n}章　${chapterTitles[n]}` });
    for (const h of rendered.headings.filter(h => h.depth === 2 && !['本章小结','习题'].includes(h.text))) {
      tocItems.push({ type: 'section', id: h.id, text: h.text });
    }
    if (!skipSolutions) {
      const sf = findChapterFile(path.join(root, 'src', 'solutions'), n, true);
      if (!sf) { missing.push(`${codeOf(n)}-solutions`); if (!allowPartial) throw new Error(`缺少第 ${n} 章解析`); }
      else {
        const solSource = fs.readFileSync(path.join(root, 'src', 'solutions', sf), 'utf8');
        const sol = renderMarkdown(solSource, `sol-${codeOf(n)}`);
        solutionChunks.push(`<section class="solution-chapter">${sol.html}</section>`);
      }
    }
  }
}

const appendixPath = path.join(root, 'src', 'appendices', 'appendices.md');
const referencesPath = path.join(root, 'src', 'appendices', 'references.md');
const appendix = renderMarkdown(fs.existsSync(appendixPath) ? fs.readFileSync(appendixPath, 'utf8') : '# 附录\n', 'appendix');
const references = renderMarkdown(fs.existsSync(referencesPath) ? fs.readFileSync(referencesPath, 'utf8') : '# 参考文献\n', 'references');

const tocHtml = tocItems.map(item => {
  const num = tocMap[item.id];
  const numHtml = num ? `<span class="toc-num">${num}</span>` : '';
  return `<div class="toc-${item.type}"><a href="#${item.id}"><span class="toc-label">${escapeHtml(item.text)}</span>${numHtml}</a></div>`;
}).join('\n');
const cover = `<section class="cover"><div class="series">量化研究数学基础丛书</div><h1>量化数学<br>进阶教材</h1><div class="subtitle">从数学证明到量化研究</div><div class="meta">研究生进阶数学与量化金融应用<br>完整教材版 · 2026</div></section>`;
const titlePage = `<section class="title-page"><h1>量化数学进阶教材</h1><div class="en">Advanced Mathematics for Quantitative Research</div><p style="margin-top:25mm">数学理论 · 推导证明 · 典型例题 · 量化应用</p><p class="colophon">依据既定八篇三十四章课程体系编写</p></section>`;
const solutionsHtml = solutionChunks.length ? `<section class="part" id="solutions"><div class="part-kicker">书后部分</div><h1>习题参考答案与解析</h1><p class="part-desc">各章解析按正文习题顺序编排。建议先独立完成习题，再查阅相应解答。</p></section>${solutionChunks.join('\n')}` : '';

const pagedScript = usePaged
  ? `<script>window.PagedConfig={auto:true,after:()=>{document.body.setAttribute('data-paged-ready','true');}};</script><script src="paged.polyfill.js"></script>`
  : '';
const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>量化数学进阶教材</title><link rel="stylesheet" href="katex/katex.min.css"><link rel="stylesheet" href="book.css">${pagedScript}</head><body>${cover}${titlePage}${bodyChunks[0]}${bodyChunks[1]}<section class="toc"><h1 id="contents">目录</h1>${tocHtml}</section>${bodyChunks.slice(2).join('\n')}${solutionsHtml}<section class="backmatter">${appendix.html}</section><section class="backmatter">${references.html}</section></body></html>`;
fs.writeFileSync(path.join(out, '量化数学进阶教材.html'), html);

fs.mkdirSync(path.join(out, 'katex'), { recursive: true });
fs.copyFileSync(path.join(root, 'node_modules', 'katex', 'dist', 'katex.min.css'), path.join(out, 'katex', 'katex.min.css'));
fs.cpSync(path.join(root, 'node_modules', 'katex', 'dist', 'fonts'), path.join(out, 'katex', 'fonts'), { recursive: true });
fs.copyFileSync(path.join(root, 'node_modules', 'pagedjs', 'dist', 'paged.polyfill.js'), path.join(out, 'paged.polyfill.js'));
fs.copyFileSync(path.join(root, 'assets', 'book.css'), path.join(out, 'book.css'));
for (const f of ['NotoSerifSC-VF.ttf','NotoSansSC-VF.ttf']) fs.copyFileSync(path.join('C:\\Windows\\Fonts', f), path.join(out, f));
fs.writeFileSync(path.join(out, 'build-manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), chapters: 34 - missing.filter(x => !x.includes('solutions')).length, solutions: solutionChunks.length, missing, partial: allowPartial }, null, 2));
// Exported so resolve-toc.mjs can locate each entry's real page in the printed PDF.
fs.writeFileSync(path.join(out, 'toc-items.json'), JSON.stringify(tocItems.map(t => ({ id: t.id, text: t.text, type: t.type })), null, 1));
console.log(JSON.stringify({ output: path.join(out, '量化数学进阶教材.html'), chapters: 34 - missing.filter(x => !x.includes('solutions')).length, solutions: solutionChunks.length, missing }, null, 2));
