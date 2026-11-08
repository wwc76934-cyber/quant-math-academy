import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  renderMarkdownChunk,
  renderSection,
  renderChapter,
  cleanTextForCoverage,
  diffCoverage
} from './render.mjs';

const ROOT = process.cwd();

describe('T03 HTML 渲染管线单元测试 (render.test.mjs)', () => {

  test('1. C01 一段普通文本 + 行内公式 → 含 .math-inline 且文本完整', () => {
    const rawText = '设 $P,Q$ 为命题。否定、合取、析取、蕴含与等价分别记为 $\\neg P$。';
    const html = renderMarkdownChunk(rawText, { chapterId: 'c01' });

    assert.ok(html.includes('class="math math-inline"'), '应生成 math-inline 容器');
    assert.ok(html.includes('data-latex="P,Q"'), '应包含正确转义的 data-latex 属性');
    assert.ok(html.includes('data-latex="\\neg P"'), '应包含否定命题 data-latex');
    assert.ok(html.includes('<!--QMA_MATH_START-->'), '应包含 QMA_MATH 注释包裹');
    assert.ok(html.includes('为命题。否定、合取、析取、蕴含与等价分别记为'), '中文文本应完整保留');
  });

  test('2. C01 定理 1.2 + 证明 → 环境 ID、证明块、QED', () => {
    const c01Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c01.json'), 'utf8'));
    const { siteChapter } = renderChapter(c01Raw);
    const s1 = siteChapter.sections.find(s => s.id === 'c01-s1');

    assert.ok(s1, '应找到 c01-s1 节');
    assert.ok(s1.html.includes('id="c01-thm-1.2"'), '应包含定理 1.2 的环境 ID');
    assert.ok(s1.html.includes('data-env-kind="theorem"'), '定理环境类型应为 theorem');
    assert.ok(s1.html.includes('<span class="env__kind">定理</span>'), '环境标签应显示定理');
    assert.ok(s1.html.includes('<b class="env__number">1.2</b>'), '环境编号应为 1.2');

    // Check proof block
    assert.ok(s1.html.includes('<details class="proof" data-proof-of="c01-thm-1.2" open>'), '证明应使用 details 且 data-proof-of 指向 c01-thm-1.2');
    assert.ok(s1.html.includes('<summary class="proof__label">证明</summary>'), '证明应有 summary 标签');
    assert.ok(s1.html.includes('<p class="proof__qed">□</p>'), '证明应包含 QED 结束符');
  });

  test('3. C08 同行环境定义 8.1 → id="c08-def-8.1"，正文“设 ...”在环境内', () => {
    const c08Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c08.json'), 'utf8'));
    const { siteChapter } = renderChapter(c08Raw);
    const s1 = siteChapter.sections.find(s => s.id === 'c08-s1');

    assert.ok(s1, '应找到 c08-s1');
    assert.ok(s1.html.includes('id="c08-def-8.1"'), '必须包含 c08-def-8.1 环境 ID');
    assert.ok(s1.html.includes('data-env-kind="definition"'), '环境类型应为 definition');
    assert.ok(s1.html.includes('class="env env--definition"'), '类名应为 env--definition');

    // Verify "设 ..." inline text is inside env__body
    const defStart = s1.html.indexOf('id="c08-def-8.1"');
    const defEnd = s1.html.indexOf('</section>', defStart);
    const defHtml = s1.html.slice(defStart, defEnd);

    assert.ok(defHtml.includes('env__body'), '定义必须包含 env__body 容器');
    assert.ok(defHtml.includes('设') && defHtml.includes('则称') && defHtml.includes('为正交矩阵'), '同行首段文字必须正确包含在 env__body 内部');
  });

  test('4. C01 公理 1.6 → 环境存在，类型 axiom', () => {
    const c01Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c01.json'), 'utf8'));
    const { siteChapter } = renderChapter(c01Raw);
    const s4 = siteChapter.sections.find(s => s.id === 'c01-s4');

    assert.ok(s4, '应找到 c01-s4');
    assert.ok(s4.html.includes('data-env-kind="axiom"'), '类型必须为 axiom');
    assert.ok(s4.html.includes('class="env env--theorem"'), '公理应使用 env--theorem 样式族');
    assert.ok(s4.html.includes('<span class="env__kind">公理</span>'), '标签中文名应为公理');
    assert.ok(s4.html.includes('<b class="env__number">1.6</b>'), '编号应为 1.6');
    // ID adheres to T01 slice parity (c01-ax-1.6)
    assert.ok(s4.html.includes('id="c01-ax-1.6"'), '应匹配 T01 生成的公理环境 ID c01-ax-1.6');
  });

  test('5. C06 无编号注记 → number=null，ID 存在', () => {
    const c06Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c06.json'), 'utf8'));
    const { siteChapter } = renderChapter(c06Raw);

    const noteEnv = siteChapter.environmentIndex.find(e => e.kind === 'note' && (e.number === null || e.number === ''));
    assert.ok(noteEnv, '应在 c06 中找到无编号注记');
    assert.equal(noteEnv.number, null, '注记 number 应为 null');
    assert.ok(noteEnv.id && noteEnv.id.startsWith('c06-note-'), '无编号注记 ID 应形如 c06-note-N');

    const allHtml = siteChapter.sections.map(s => s.html).join('\n');
    assert.ok(allHtml.includes(`id="${noteEnv.id}"`), '无编号注记 ID 必须存在于节 HTML 中');
    assert.ok(allHtml.includes('class="env env--note"'), '注记类名应为 env--note');
  });

  test('6. 含 \\begin{bmatrix} 的公式 → 渲染成功，无 KaTeX error', () => {
    const matrixTex = '$$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$$';
    const html = renderMarkdownChunk(matrixTex, { chapterId: 'c08' });

    assert.ok(html.includes('class="equation"'), '应生成 equation 容器');
    assert.ok(html.includes('class="katex"'), 'KaTeX 应该成功渲染出 katex 结构');
    assert.ok(!html.includes('KaTeX parse error'), '不应产生任何解析错误');
    assert.ok(html.includes('<!--QMA_MATH_START-->'), '应包含数学包裹注释');
  });

  test('7. 含 \\tag{11.11} 的公式 → 编号 (11.11)，tag 不在 KaTeX 文本中重复', () => {
    const taggedTex = '$$\\mathbb P(X \\ge a) \\le \\frac{\\mathbb E[X]}{a} \\tag{11.11}$$';
    const collector = [];
    const html = renderMarkdownChunk(taggedTex, { chapterId: 'c11', equationCollector: collector });

    assert.ok(html.includes('id="c11-eq-11.11"'), '应生成带有 tag 的公式 id c11-eq-11.11');
    assert.ok(html.includes('<span class="equation__number">(11.11)</span>'), '应有外置编号 (11.11)');
    assert.equal(collector.length, 1);
    assert.equal(collector[0].tag, '11.11');
    assert.equal(collector[0].id, 'c11-eq-11.11');

    // Verify tag is stripped from latex
    assert.ok(!collector[0].latex.includes('\\tag'), 'latex 源码中不得残留 \\tag');
  });

  test('8. 真实表格 → <table>、单元格文本完整且包裹 table-wrap', () => {
    const tableMd = `
| 准则 | 适用场景 | 功效比较 |
| :--- | :--- | :--- |
| FWER | 监管合规 | 严格保守 |
| FDR | 探索筛选 | 宽松高功效 |
`;
    const html = renderMarkdownChunk(tableMd, { chapterId: 'c20' });

    assert.ok(html.includes('<div class="table-wrap">'), '表格必须被 table-wrap 包裹');
    assert.ok(html.includes('<table>'), '应包含 table 元素');
    assert.ok(html.includes('FWER') && html.includes('监管合规') && html.includes('严格保守'), '单元格文本应完整保留');
    assert.ok(html.includes('FDR') && html.includes('探索筛选') && html.includes('宽松高功效'), '第二行单元格文本应完整保留');
  });

  test('9. 习题 + 解析 → 题号、题干、解析分离，sectionId 为 null', () => {
    const c11Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c11.json'), 'utf8'));
    const { siteChapter } = renderChapter(c11Raw);

    const ex1 = siteChapter.exercises.find(e => e.number === 1);
    assert.ok(ex1, '应找到第 1 题');
    assert.equal(ex1.number, 1);
    assert.equal(ex1.sectionId, null, '习题 sectionId 必须为 null（保持 T01 原样，不进行伪造推断）');
    assert.ok(ex1.questionHtml, '题干 HTML 不应为空');
    assert.ok(ex1.solutionHtml, '解析 HTML 不应为空');

    // Verify questionHtml does not contain leading "1." prefix
    assert.ok(!ex1.questionHtml.startsWith('<p>1.'), '题干不应包含 1. 编号前缀');
    // Verify solutionHtml does not contain ## 1.
    assert.ok(!ex1.solutionHtml.includes('<h2>1.</h2>') && !ex1.solutionHtml.includes('## 1.'), '解析不应包含题号标题');
  });

  test('10. 原始 HTML 注入 → 被转义，不产生 <script>', () => {
    const maliciousMd = '正常数学讨论 <script>alert("xss")</script> 紧随其后。';
    const warnings = [];
    const html = renderMarkdownChunk(maliciousMd, { chapterId: 'c01', warnings });

    assert.ok(!html.includes('<script>'), '不得产生任何未经转义的 script 标签');
    assert.ok(html.includes('&lt;script&gt;'), 'script 标签必须被安全转义为实体');
    assert.ok(warnings.some(w => w.code === 'RAW_HTML_DETECTED'), '应记录 RAW_HTML_DETECTED 警告');
  });

  test('11. 章节标题净化与统计字段规范', () => {
    const c11Raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/chapters/c11.json'), 'utf8'));
    const { siteChapter } = renderChapter(c11Raw);

    assert.equal(siteChapter.title, '期望、方差、矩与概率不等式', 'title 应是干净章名，无“第11章　”前缀');
    assert.equal(siteChapter.label, '第11章', 'label 应为“第11章”');
    assert.equal(siteChapter.displayTitle, '第11章　期望、方差、矩与概率不等式', 'displayTitle 应为完整展示名');
    assert.equal(typeof siteChapter.stats.displayEquations, 'number', '应包含 displayEquations 统计');
    assert.equal(typeof siteChapter.stats.taggedEquations, 'number', '应包含 taggedEquations 统计');
    assert.equal(siteChapter.stats.equations, siteChapter.stats.taggedEquations, 'equations 必须是 taggedEquations 的别名');
  });

  test('12. 拆分文件存在性与章节 JSON 瘦身结构断言', () => {
    const siteDir = path.join(ROOT, 'content', 'generated', 'site');
    const ch11JsonPath = path.join(siteDir, 'chapters', 'c11.json');
    const ch11 = JSON.parse(fs.readFileSync(ch11JsonPath, 'utf8'));

    // Chapter JSON must NOT have big inline html or exercises array
    assert.equal(ch11.exercises, undefined, '章节 JSON 不得包含 exercises 大数组');
    assert.equal(typeof ch11.exerciseCount, 'number', '章节 JSON 应包含 exerciseCount');
    assert.equal(ch11.exercisesPath, 'exercises/c11.json', '章节 JSON 应包含 exercisesPath');
    assert.equal(ch11.sections[0].html, undefined, 'sections 数组元素不得包含 html 大字符串');
    assert.equal(ch11.sections[0].htmlPath, 'sections/c11-s1.html', 'sections 数组元素应包含 htmlPath');
    assert.equal(typeof ch11.sections[0].htmlBytes, 'number', 'sections 数组元素应包含 htmlBytes');

    // Split section html file must exist on disk and have content
    const sec1HtmlPath = path.join(siteDir, 'sections', 'c11-s1.html');
    assert.ok(fs.existsSync(sec1HtmlPath), '拆分节文件 c11-s1.html 必须存在');
    const sec1Content = fs.readFileSync(sec1HtmlPath, 'utf8');
    assert.ok(sec1Content.length > 0, '拆分节文件内容不应为空');
    assert.ok(!sec1Content.startsWith('<h2>'), '拆分节文件不应包含 h2 节标题');

    // Split exercises json file must exist on disk
    const exJsonPath = path.join(siteDir, 'exercises', 'c11.json');
    assert.ok(fs.existsSync(exJsonPath), '拆分习题文件 c11.json 必须存在');
    const exData = JSON.parse(fs.readFileSync(exJsonPath, 'utf8'));
    assert.equal(exData.chapterId, 'c11');
    assert.equal(exData.exercises.length, ch11.exerciseCount);
    // All exercise sectionIds must be null
    for (const ex of exData.exercises) {
      assert.equal(ex.sectionId, null, `习题 ${ex.id} 的 sectionId 必须为 null`);
    }
  });

  test('13. book.json 全局 TOC 契约：包含 sections 且 c11-s4 字段正确', () => {
    const siteDir = path.join(ROOT, 'content', 'generated', 'site');
    const bookJsonPath = path.join(siteDir, 'book.json');
    assert.ok(fs.existsSync(bookJsonPath), 'book.json 必须存在');

    const book = JSON.parse(fs.readFileSync(bookJsonPath, 'utf8'));
    const c11 = book.chapters.find(c => c.id === 'c11');
    assert.ok(c11, 'book.json 中必须包含 c11');
    assert.ok(Array.isArray(c11.sections), 'c11 必须包含 sections 数组');
    assert.equal(c11.sections.length, 6, 'C11 必须包含 6 个节');

    const s4 = c11.sections.find(s => s.id === 'c11-s4');
    assert.ok(s4, '必须找到 c11-s4');
    assert.equal(s4.number, '11.4');
    assert.equal(s4.title, '概率不等式');
    assert.equal(s4.anchor, 'c11-s4');
    assert.ok('difficulty' in s4, '应包含 difficulty 字段');
    assert.ok('priority' in s4, '应包含 priority 字段');
    assert.ok('minutes' in s4, '应包含 minutes 字段');
    assert.equal(s4.htmlPath, undefined, 'book.json 节条目不应包含 htmlPath');
    assert.equal(s4.htmlBytes, undefined, 'book.json 节条目不应包含 htmlBytes');
  });

});
