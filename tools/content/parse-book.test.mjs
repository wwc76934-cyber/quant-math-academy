import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parseBook, PARTS_METADATA } from './parse-book.mjs';

const parsed = parseBook();

function normalizeWs(str) {
  return str.replace(/\s+/g, ' ').trim();
}

describe('T01 教材资产解析器测试套件', () => {

  test('1. 34 章、34 解析文件全部被读取；篇归属正确', () => {
    assert.equal(parsed.chapters.length, 34, '应成功解析 34 章正文');
    assert.equal(parsed.inventory.totals.solutions, 34, '应成功读取 34 个解析文件');
    assert.equal(parsed.book.parts.length, 8, '应包含 8 篇');

    const expectedChapterCounts = [3, 5, 6, 4, 5, 4, 3, 4];
    PARTS_METADATA.forEach((part, idx) => {
      assert.equal(part.chapterIds.length, expectedChapterCounts[idx], `${part.title} 应包含 ${expectedChapterCounts[idx]} 章`);
      part.chapterIds.forEach(chId => {
        const ch = parsed.chapters.find(c => c.id === chId);
        assert.ok(ch, `篇归属章 ${chId} 必须存在于 chapters 列表`);
        assert.equal(ch.partId, part.id, `章 ${chId} 的 partId 必须匹配 ${part.id}`);
      });
    });
  });

  test('2. 节编号检查：全书 34 章一级节严格连续（含 C32 经 BOM 归一化后 7 节全满），全书 219 节无 SECTION_NUMBER_GAP', () => {
    assert.equal(parsed.errors.length, 0, '全书校验不应存在任何硬错误');
    assert.equal(parsed.inventory.totals.sections, 219, '全书一级节总数应为 219');

    // 检查第 8 篇总节数应为 28（C31:5, C32:7, C33:8, C34:8）
    const part8Chapters = parsed.chapters.filter(c => ['c31', 'c32', 'c33', 'c34'].includes(c.id));
    const part8Sections = part8Chapters.reduce((acc, c) => acc + c.sections.length, 0);
    assert.equal(part8Sections, 28, 'Part 8 应包含 28 个一级节');

    // 验证 C32 包含 7 节，且 32.4 存在、32.4.1-32.4.5 归属 32.4
    const c32 = parsed.chapters.find(c => c.id === 'c32');
    assert.equal(c32.sections.length, 7, 'C32 应有 7 个一级节');
    const s32_4 = c32.sections.find(s => s.number === '32.4');
    assert.ok(s32_4, 'C32 中 32.4 节必须存在');
    assert.equal(s32_4.title, '极值参数的估计');
    assert.equal(s32_4.subsections.length, 5, '32.4 应包含 5 个二级节 (32.4.1 - 32.4.5)');
    assert.equal(s32_4.subsections[0].number, '32.4.1');
    assert.equal(s32_4.subsections[4].number, '32.4.5');

    // 检查 BOM 警告已被记录
    const bomWarning = parsed.warnings.find(w => w.code === 'BOM_BEFORE_HEADING' && w.chapterId === 'c32');
    assert.ok(bomWarning, 'C32 第 313 行行首 BOM 必须记录为 BOM_BEFORE_HEADING 警告');
    assert.equal(bomWarning.line, 313);

    // 全书 34 章所有一级节严格连续
    parsed.chapters.forEach(ch => {
      ch.sections.forEach((sec, idx) => {
        assert.equal(sec.number, `${ch.number}.${idx + 1}`, `${ch.id} 第 ${idx + 1} 节编号应为 ${ch.number}.${idx + 1}`);
      });

      // 所有二级节编号与所属一级节完全一致
      ch.sections.forEach(sec => {
        sec.subsections.forEach(sub => {
          if (sub.number) {
            assert.ok(sub.number.startsWith(`${sec.number}.`), `二级节 ${sub.number} 必须属于一级节 ${sec.number}`);
          }
        });
      });
    });
  });

  test('3. 环境 ID 全局唯一；章内环境序号无重复', () => {
    const allEnvIds = new Set();
    let totalEnvs = 0;

    parsed.chapters.forEach(ch => {
      const chEnvIds = new Set();
      ch.environments.forEach(env => {
        totalEnvs++;
        assert.ok(!allEnvIds.has(env.id), `环境 ID 全局唯一性冲突：${env.id}`);
        assert.ok(!chEnvIds.has(env.id), `章内环境 ID 重复：${ch.id} 中的 ${env.id}`);
        allEnvIds.add(env.id);
        chEnvIds.add(env.id);
        assert.equal(env.chapterId, ch.id, `环境 ${env.id} 的 chapterId 应为 ${ch.id}`);
      });
    });

    assert.equal(totalEnvs, 889, '全书环境总数应为 889（修复证明边界后完整捕获全部 889 个环境）');
  });

  test('4. 公式 tag 章内连续且与章号匹配；独立公式全部被捕获', () => {
    let totalTagged = 0;
    let totalDisplay = 0;

    parsed.chapters.forEach(ch => {
      let expectedEqOrder = 1;
      ch.equations.forEach(eq => {
        totalDisplay++;
        if (eq.tag) {
          totalTagged++;
          assert.equal(eq.tag, `${ch.number}.${expectedEqOrder}`, `${ch.id} 公式 tag 连续性断裂：第 ${expectedEqOrder} 个 tag 应为 ${ch.number}.${expectedEqOrder}`);
          assert.equal(eq.id, `${ch.id}-eq-${eq.tag}`, `公式 ID 规范应为 ${ch.id}-eq-${eq.tag}`);
          expectedEqOrder++;
        }
      });
    });

    assert.equal(totalTagged, 813, '全书 tagged 公式应为 813 个');
    assert.equal(totalDisplay, 3276, '全书独立公式应为 3276 个');
  });

  test('5. 习题题号连续，解析题号与习题一一对应', () => {
    let totalExercises = 0;
    let totalSolutionsMatched = 0;

    parsed.chapters.forEach(ch => {
      assert.ok(ch.exercises.length >= 16, `${ch.id} 习题量至少 16 题（实际 ${ch.exercises.length}）`);
      ch.exercises.forEach((ex, idx) => {
        totalExercises++;
        assert.equal(ex.number, idx + 1, `${ch.id} 习题序号应连续`);
        assert.ok(ex.solutionMarkdown, `${ch.id} 习题 ${ex.number} 必须有一对一解析`);
        assert.ok(ex.markdown.length > 0, `${ch.id} 习题 ${ex.number} 题干不为空`);
        if (ex.solutionMarkdown && ex.solutionMarkdown.trim().length > 0) {
          totalSolutionsMatched++;
        }
      });
    });

    assert.equal(totalExercises, 698, '全书习题总数应为 698 道');
    assert.equal(totalSolutionsMatched, 698, '实际匹配解析数应为 698');
    assert.equal(parsed.validation.summary.solutionsMatched, 698);
    assert.equal(parsed.validation.summary.mismatches, 0);
  });

  test('6. 代表章节（C01/C11/C33）环境数量与源文件人工统计严格一致', () => {
    const c01 = parsed.chapters.find(c => c.id === 'c01');
    const c11 = parsed.chapters.find(c => c.id === 'c11');
    const c33 = parsed.chapters.find(c => c.id === 'c33');

    // C01 人工统计：5定义 + 12定理 + 9例 + 1公理 = 27
    assert.equal(c01.environments.length, 27, 'C01 应有 27 个环境');
    const c01Kinds = c01.environments.map(e => e.kind);
    assert.equal(c01Kinds.filter(k => k === 'definition').length, 5);
    assert.equal(c01Kinds.filter(k => k === 'theorem').length, 12);
    assert.equal(c01Kinds.filter(k => k === 'example').length, 9);
    assert.equal(c01Kinds.filter(k => k === 'axiom').length, 1);

    // C11 人工统计：5定义 + 4命题 + 8定理 + 8例 + 1推论 = 26
    assert.equal(c11.environments.length, 26, 'C11 应有 26 个环境');
    const c11Kinds = c11.environments.map(e => e.kind);
    assert.equal(c11Kinds.filter(k => k === 'definition').length, 5);
    assert.equal(c11Kinds.filter(k => k === 'proposition').length, 4);
    assert.equal(c11Kinds.filter(k => k === 'theorem').length, 8);
    assert.equal(c11Kinds.filter(k => k === 'example').length, 8);
    assert.equal(c11Kinds.filter(k => k === 'corollary').length, 1);

    // C33 人工统计：6定义 + 10定理 + 8例 + 4命题 + 7注记 = 35
    assert.equal(c33.environments.length, 35, 'C33 应有 35 个环境');
    const c33Kinds = c33.environments.map(e => e.kind);
    assert.equal(c33Kinds.filter(k => k === 'definition').length, 6);
    assert.equal(c33Kinds.filter(k => k === 'theorem').length, 10);
    assert.equal(c33Kinds.filter(k => k === 'example').length, 8);
    assert.equal(c33Kinds.filter(k => k === 'proposition').length, 4);
    assert.equal(c33Kinds.filter(k => k === 'note').length, 7);
  });

  test('7. 原文切片保真：任取 20 个环境，其 markdown 必须能在源文件中按空白归一化后逐字找到', () => {
    const sampleEnvIds = [
      'c01-def-1.1', 'c01-thm-1.2', 'c01-ax-1.6', 'c02-thm-2.6',
      'c05-def-5.1', 'c08-def-8.1', 'c08-thm-8.3', 'c11-def-11.1',
      'c11-thm-11.3', 'c12-def-12.8', 'c14-def-14.2', 'c16-thm-16.1',
      'c19-def-19.1', 'c21-thm-21.2', 'c24-def-24.1', 'c25-thm-25.4',
      'c26-def-26.1', 'c29-def-29.4', 'c32-def-32.1', 'c33-thm-33.3'
    ];

    sampleEnvIds.forEach(id => {
      const chId = id.slice(0, 3);
      const ch = parsed.chapters.find(c => c.id === chId);
      assert.ok(ch, `应找到章节 ${chId}`);
      const env = ch.environments.find(e => e.id === id);
      assert.ok(env, `应找到环境 ${id}`);

      const rawFile = fs.readFileSync(path.join(process.cwd(), ch.sourcePath), 'utf8');
      const normSource = normalizeWs(rawFile);
      const normSlice = normalizeWs(env.markdown);

      assert.ok(
        normSource.includes(normSlice),
        `环境 ${id} 的原文切片必须逐字存在于原章节文件中（空白归一化后）`
      );

      if (env.proofMarkdown) {
        const normProof = normalizeWs(env.proofMarkdown);
        assert.ok(
          normSource.includes(normProof),
          `环境 ${id} 的证明切片必须逐字存在于原章节文件中（空白归一化后）`
        );
      }
    });
  });

  test('8. 已知边界样例：含表格章节、含 aligned 公式、含 | 绝对值公式，不得误判为表格', () => {
    const c01Raw = fs.readFileSync('src/chapters/C01-mathematical-language.md', 'utf8');
    assert.ok(c01Raw.includes('|a-b|\\le|a-a_n|+|a_n-b|'), 'C01 应包含绝对值公式');
    
    const c01Lines = c01Raw.split('\n');
    const c01TableDelims = c01Lines.filter(l => /^\s*\|?\s*:?-+:?\s*\|(?:\s*:?-+:?\s*\|)+\s*$/.test(l));
    assert.equal(c01TableDelims.length, 0, 'C01 不应包含任何 Markdown 表格');

    const c12Raw = fs.readFileSync('src/chapters/C12-joint-distributions-covariance.md', 'utf8');
    const c12TableDelims = c12Raw.split('\n').filter(l => /^\s*\|?\s*:?-+:?\s*\|(?:\s*:?-+:?\s*\|)+\s*$/.test(l));
    assert.equal(c12TableDelims.length, 2, 'C12 应包含 2 处 Markdown 表格');

    const c01SolRaw = fs.readFileSync('src/solutions/C01-solutions.md', 'utf8');
    assert.ok(c01SolRaw.includes('\\begin{aligned}'), 'C01 解析应包含 aligned 块');
  });

  test('9. 证明边界不侵吞后继标题：证明后紧跟二级节或新环境时，标题仍在节 markdown 中且不渗入 proofMarkdown', () => {
    // 样例一：C01 中例 1.3 的证明紧跟着 ### 1.2.2 反证法
    const c01 = parsed.chapters.find(c => c.id === 'c01');
    const ex1_3 = c01.environments.find(e => e.id === 'c01-ex-1.3');
    assert.ok(ex1_3, '应包含 c01-ex-1.3');
    assert.ok(ex1_3.proofMarkdown, '例 1.3 具有证明');
    assert.ok(!ex1_3.proofMarkdown.includes('### 1.2.2'), '例 1.3 的证明绝不包含后继标题 ### 1.2.2');
    
    // 节 markdown 中必须包含 ### 1.2.2 反证法
    const s1_2 = c01.sections.find(s => s.id === 'c01-s2');
    assert.ok(s1_2.markdown.includes('### 1.2.2 反证法'), '一级节 1.2 的 markdown 必须完好保留 ### 1.2.2 反证法');

    // 样例二：C20 中定理 20.12 的 **证明思路** 不带 □，紧接着 **定义 20.13（p 值）**
    const c20 = parsed.chapters.find(c => c.id === 'c20');
    const thm20_12 = c20.environments.find(e => e.id === 'c20-thm-20.12');
    assert.ok(thm20_12, '应包含 c20-thm-20.12');
    assert.ok(!thm20_12.proofMarkdown.includes('**定义 20.13'), '定理 20.12 证明思路不侵吞 **定义 20.13**');
    const def20_13 = c20.environments.find(e => e.id === 'c20-def-20.13');
    assert.ok(def20_13, '后继环境 c20-def-20.13 必须被正确独立提取为定义环境');
  });

});
