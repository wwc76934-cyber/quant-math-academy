import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const partial = process.argv.includes('--allow-partial');
const parts = [
  ['第一篇　数学语言与分析基础',1,3,'以严格的逻辑语言和实数理论重建微积分基础。'],
  ['第二篇　线性代数与矩阵分析',4,8,'从线性映射与正交投影建立谱理论和矩阵分析方法。'],
  ['第三篇　组合、概率论与随机变量',9,14,'由计数与概率空间进入条件期望和极限定理。'],
  ['第四篇　凸优化与数值计算',15,18,'研究最优性条件、对偶、迭代算法与数值误差。'],
  ['第五篇　数理统计、回归与统计学习',19,23,'连接估计、检验、回归、Bayesian 决策和统计学习。'],
  ['第六篇　随机过程与随机分析',24,27,'由离散随机过程进入鞅、Brown 运动与随机微分方程。'],
  ['第七篇　时间序列分析',28,30,'研究动态相关结构、状态空间模型与相关数据推断。'],
  ['第八篇　量化研究数学综合',31,34,'将数学理论综合运用于因子、组合、定价和研究考核。']
];
const code = n => `C${String(n).padStart(2,'0')}`;
const find = (dir,n,sol=false) => (fs.existsSync(dir)?fs.readdirSync(dir):[]).find(f=>f.startsWith(code(n))&&f.endsWith('.md')&&(!sol||f.includes('solution')));
const demote = text => text.replace(/^(#{1,3})(?=\s)/gm, '#$1');
const chunks = [`---
title: 量化数学进阶教材
subtitle: 从数学证明到量化研究
date: 2026
lang: zh-CN
toc-title: 目录
---
`];
for (const f of ['preface.md','usage.md']) {
  const p = path.join(root,'src','frontmatter',f);
  if (fs.existsSync(p)) chunks.push(fs.readFileSync(p,'utf8'));
}
const missing=[];
const solutions=[];
for (const [title,start,end,desc] of parts) {
  chunks.push(`# ${title}\n\n${desc}`);
  for(let n=start;n<=end;n++){
    const cf=find(path.join(root,'src','chapters'),n);
    if(!cf){missing.push(code(n));continue;}
    chunks.push(demote(fs.readFileSync(path.join(root,'src','chapters',cf),'utf8')));
    const sf=find(path.join(root,'src','solutions'),n,true);
    if(sf) solutions.push(demote(fs.readFileSync(path.join(root,'src','solutions',sf),'utf8')));
    else missing.push(`${code(n)}-solutions`);
  }
}
if(solutions.length){
  chunks.push('# 习题参考答案与解析\n\n本部分按正文顺序汇集各章习题解答。应先独立完成习题，再查阅相应解析。');
  chunks.push(...solutions);
}
for(const f of ['appendices.md','references.md']){
  const p=path.join(root,'src','appendices',f);
  if(fs.existsSync(p)) chunks.push(fs.readFileSync(p,'utf8'));
}
// Always emit the manuscript; validate.mjs is the strictness gate for missing chapters.
const output=path.join(root,'build','量化数学进阶教材.md');
const combined=chunks.join('\n\n');
fs.writeFileSync(output,combined);

// Pandoc's texmath accepts \tag only when the formula ends with certain tokens
// (punctuation, superscript, accent); it rejects it after a letter, subscript or \frac,
// degrading the whole formula to literal TeX. KaTeX handles \tag fine, so the faithful
// source keeps \tag and the Pandoc feed rewrites it as a visible number.
const pandocFeed=combined.replace(/\\tag\{([^}]*)\}/g,'\\qquad ($1)');
const pandocPath=path.join(root,'build','量化数学进阶教材.pandoc.md');
fs.writeFileSync(pandocPath,pandocFeed);
const tagCount=(combined.match(/\\tag\{/g)||[]).length;
console.log(JSON.stringify({output,pandocFeed:pandocPath,equationTagsRewritten:tagCount,missing,chapters:34-missing.filter(x=>!x.includes('solutions')).length,solutions:solutions.length},null,2));
