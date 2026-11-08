import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

import { renderChapter, diffCoverage } from './render.mjs';
import { validateSite } from './validate-content.mjs';

const ROOT = process.cwd();
const T01_DIR = path.join(ROOT, 'content', 'generated');

describe('T03 内容保真与覆盖率综合测试套件 (coverage.test.mjs)', () => {

  test('1. C01、C08、C11、C33 四章覆盖率 100%', () => {
    const pilotChapters = ['c01', 'c08', 'c11', 'c33'];

    for (const cid of pilotChapters) {
      const chRaw = JSON.parse(fs.readFileSync(path.join(T01_DIR, 'chapters', `${cid}.json`), 'utf8'));
      const { siteChapter } = renderChapter(chRaw);

      // Verify intro coverage
      if (chRaw.introMarkdown && chRaw.introMarkdown.trim()) {
        const diff = diffCoverage(chRaw.introMarkdown, siteChapter.introHtml, { chapterId: cid, type: 'intro' });
        assert.equal(diff, null, `${cid} 导言文本覆盖率必须 100%`);
      }

      // Verify summary coverage
      if (chRaw.summaryMarkdown && chRaw.summaryMarkdown.trim()) {
        const sourceSummary = '## 本章小结\n\n' + chRaw.summaryMarkdown;
        const diff = diffCoverage(sourceSummary, siteChapter.summaryHtml, { chapterId: cid, type: 'summary' });
        assert.equal(diff, null, `${cid} 本章小结文本覆盖率必须 100%`);
      }

      // Verify each section coverage
      for (const sec of siteChapter.sections) {
        const srcSec = chRaw.sections.find(s => s.id === sec.id);
        assert.ok(srcSec, `必须在 T01 中找到节 ${sec.id}`);
        const diff = diffCoverage(srcSec.markdown, sec.html, { chapterId: cid, sectionId: sec.id, type: 'section' });
        assert.equal(diff, null, `${cid} 节 ${sec.id} 文本覆盖率必须 100%`);
      }

      // Verify exercises & solutions coverage
      for (const ex of siteChapter.exercises) {
        const srcEx = chRaw.exercises.find(e => e.id === ex.id);
        assert.ok(srcEx, `必须在 T01 中找到习题 ${ex.id}`);
        const diffQ = diffCoverage(srcEx.markdown, ex.questionHtml, { chapterId: cid, sectionId: ex.id, type: 'exercise_question' }, true, ex.number);
        assert.equal(diffQ, null, `${cid} 习题 ${ex.id} 题干覆盖率必须 100%`);

        if (srcEx.solutionMarkdown) {
          const diffS = diffCoverage(srcEx.solutionMarkdown, ex.solutionHtml, { chapterId: cid, sectionId: ex.id, type: 'exercise_solution' });
          assert.equal(diffS, null, `${cid} 习题 ${ex.id} 解析覆盖率必须 100%`);
        }
      }
    }
  });

  test('2. 所有 34 章公式渲染 error = 0', () => {
    // Check all chapters render with 0 errors
    for (let chNum = 1; chNum <= 34; chNum++) {
      const cid = 'c' + String(chNum).padStart(2, '0');
      const chRaw = JSON.parse(fs.readFileSync(path.join(T01_DIR, 'chapters', `${cid}.json`), 'utf8'));
      const { errors } = renderChapter(chRaw);
      assert.equal(errors.length, 0, `${cid} 公式预渲染与解析不应产生任何错误`);
    }
  });

  test('3. 所有 34 章锚点唯一', () => {
    // Validate site artifacts to confirm 0 anchor / ID errors
    const result = validateSite();
    const anchorErrors = result.errors.filter(e =>
      e.code === 'DUPLICATE_GLOBAL_ID' ||
      e.code === 'EMPTY_ANCHOR_ID' ||
      e.code === 'ENVIRONMENT_ANCHOR_NOT_IN_HTML' ||
      e.code === 'EQUATION_ANCHOR_NOT_IN_HTML'
    );
    assert.equal(anchorErrors.length, 0, `全局锚点与 ID 必须全局唯一且 HTML 锚点存在，实际发现 ${anchorErrors.length} 处错误`);
  });

  test('4. 习题解析 1:1（与 T01 一致）', () => {
    let totalExercises = 0;
    let totalSolutions = 0;

    for (let chNum = 1; chNum <= 34; chNum++) {
      const cid = 'c' + String(chNum).padStart(2, '0');
      const chRaw = JSON.parse(fs.readFileSync(path.join(T01_DIR, 'chapters', `${cid}.json`), 'utf8'));
      const { siteChapter } = renderChapter(chRaw);

      assert.equal(siteChapter.exercises.length, chRaw.exercises.length, `${cid} 习题数量必须完全等于 T01`);
      siteChapter.exercises.forEach(ex => {
        totalExercises++;
        assert.ok(ex.questionHtml && ex.questionHtml.length > 0, `${cid} 题干必须有内容`);
        assert.ok(ex.solutionHtml && ex.solutionHtml.length > 0, `${cid} 解析必须有内容`);
        totalSolutions++;
      });
    }

    assert.equal(totalExercises, 698, '全书习题数应为 698');
    assert.equal(totalSolutions, 698, '全书解析数应为 698');
  });

  test('5. 从拆分产物读取的全书 34 章硬闸门与 0 error 验证', () => {
    const result = validateSite();
    assert.equal(result.errors.length, 0, `全书校验不应有任何 error，实际有 ${result.errors.length} 个`);
    assert.equal(result.summary.chapters, 34, '应校验 34 个章节');
    assert.equal(result.summary.sections, 219, '应校验 219 个节');
    assert.equal(result.summary.exercises, 698, '应校验 698 个习题');
    assert.equal(result.summary.environments, 889, '环境总数应为 889');
    assert.equal(result.summary.equations, 813, '编号公式总数应为 813');
  });

  test('6. 产物体积预算断言（拆分后）', () => {
    const siteDir = path.join(ROOT, 'content', 'generated', 'site');

    // 1. 34 个章节 JSON 必须 <= 300KB
    const chFiles = fs.readdirSync(path.join(siteDir, 'chapters')).filter(f => f.endsWith('.json'));
    assert.equal(chFiles.length, 34);
    let maxChBytes = 0;
    let maxChFile = '';
    for (const f of chFiles) {
      const bytes = fs.statSync(path.join(siteDir, 'chapters', f)).size;
      if (bytes > maxChBytes) {
        maxChBytes = bytes;
        maxChFile = f;
      }
      assert.ok(bytes <= 300 * 1024, `章节 JSON ${f} 体积 (${bytes}B) 必须 <= 300KB`);
    }

    // 2. 34 个习题 JSON 必须 <= 3MB
    const exFiles = fs.readdirSync(path.join(siteDir, 'exercises')).filter(f => f.endsWith('.json'));
    assert.equal(exFiles.length, 34);
    let maxExBytes = 0;
    let maxExFile = '';
    for (const f of exFiles) {
      const bytes = fs.statSync(path.join(siteDir, 'exercises', f)).size;
      if (bytes > maxExBytes) {
        maxExBytes = bytes;
        maxExFile = f;
      }
      assert.ok(bytes <= 3 * 1024 * 1024, `习题 JSON ${f} 体积 (${bytes}B) 必须 <= 3MB`);
    }

    // 3. 219 个单节 HTML 绝大多数 <= 1MB，超标的 4 节 <= 1.25MB
    const secFiles = fs.readdirSync(path.join(siteDir, 'sections')).filter(f => f.endsWith('.html'));
    assert.equal(secFiles.length, 219);
    let over1MBCount = 0;
    for (const f of secFiles) {
      const bytes = fs.statSync(path.join(siteDir, 'sections', f)).size;
      if (bytes > 1024 * 1024) {
        over1MBCount++;
        assert.ok(bytes <= 1.25 * 1024 * 1024, `超标节 HTML ${f} 体积 (${bytes}B) 不应超过 1.25MB`);
      }
    }
    assert.equal(over1MBCount, 4, '全书应仅有 4 个大推导/大矩阵节略微超过 1MB');

    // 4. 首屏加载预算（c01.json + c01-s1.html）
    const c01JsonBytes = fs.statSync(path.join(siteDir, 'chapters', 'c01.json')).size;
    const c01s1Bytes = fs.statSync(path.join(siteDir, 'sections', 'c01-s1.html')).size;
    const firstScreenRaw = c01JsonBytes + c01s1Bytes;

    const c01JsonGzip = zlib.gzipSync(fs.readFileSync(path.join(siteDir, 'chapters', 'c01.json'))).length;
    const c01s1Gzip = zlib.gzipSync(fs.readFileSync(path.join(siteDir, 'sections', 'c01-s1.html'))).length;
    const firstScreenGzip = c01JsonGzip + c01s1Gzip;

    assert.ok(firstScreenRaw < 100 * 1024, `首屏原始体积 (${firstScreenRaw}B) 必须 < 100KB`);
    assert.ok(firstScreenGzip < 15 * 1024, `首屏 gzip 体积 (${firstScreenGzip}B) 必须 < 15KB`);

    // 5. book.json 全局 TOC 契约与体积预算
    const bookPath = path.join(siteDir, 'book.json');
    const bookBytes = fs.statSync(bookPath).size;
    const bookGzipBytes = zlib.gzipSync(fs.readFileSync(bookPath)).length;
    assert.ok(bookBytes < 200 * 1024, `book.json 原始体积 (${bookBytes}B) 必须 < 200KB`);

    const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
    let bookSecCount = 0;
    for (const ch of bookData.chapters) {
      assert.ok(Array.isArray(ch.sections), `book.json ${ch.id} 必须包含 sections 数组`);
      bookSecCount += ch.sections.length;
    }
    assert.equal(bookSecCount, 219, 'book.json sections 总数必须为 219');
  });

});
