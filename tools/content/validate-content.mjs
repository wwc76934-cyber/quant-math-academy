/**
 * Quant Math Academy - Site Content Validator (T03b)
 * Enforces text coverage, equation fidelity, anchor integrity, and structural parity directly from SPLIT files on disk.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { diffCoverage } from './render.mjs';

function zlibGzipSize(buf) {
  try {
    return zlib.gzipSync(buf).length;
  } catch {
    return buf.length;
  }
}

const ROOT = process.cwd();
const T01_DIR = path.join(ROOT, 'content', 'generated');
const SITE_DIR = path.join(ROOT, 'content', 'generated', 'site');

function normalizeWs(str) {
  if (!str) return '';
  return str.replace(/\s+/g, ' ').trim();
}

/**
 * Perform comprehensive validation on generated site artifacts against T01 source slices.
 * Directly reads from split section HTML files and split exercises JSON files on disk.
 */
export function validateSite(options = {}) {
  const t01Dir = options.t01Dir || T01_DIR;
  const siteDir = options.siteDir || SITE_DIR;

  const errors = [];
  const warnings = [];

  const t01BookPath = path.join(t01Dir, 'book.json');
  const siteBookPath = path.join(siteDir, 'book.json');

  if (!fs.existsSync(siteBookPath)) {
    errors.push({
      code: 'MISSING_SITE_BOOK',
      message: `缺少站点目录文件：${siteBookPath}`
    });
    return { errors, warnings, summary: { errors: 1, warnings: 0 } };
  }

  const t01Book = JSON.parse(fs.readFileSync(t01BookPath, 'utf8'));
  const siteBook = JSON.parse(fs.readFileSync(siteBookPath, 'utf8'));

  // 1. Structure check: 34 chapters, 8 parts
  if (siteBook.parts.length !== 8) {
    errors.push({
      code: 'PARTS_COUNT_MISMATCH',
      message: `篇总数不匹配：期望 8，实际 ${siteBook.parts.length}`
    });
  }
  if (siteBook.chapters.length !== 34) {
    errors.push({
      code: 'CHAPTERS_COUNT_MISMATCH',
      message: `章总数不匹配：期望 34，实际 ${siteBook.chapters.length}`
    });
  }

  // 1.1 TOC sections check in book.json
  let bookTotalSections = 0;
  for (const bc of siteBook.chapters) {
    if (!Array.isArray(bc.sections)) {
      errors.push({
        code: 'BOOK_SECTIONS_MISSING',
        chapterId: bc.id,
        message: `book.json 章节 ${bc.id} 缺少 sections 数组`
      });
      continue;
    }
    bookTotalSections += bc.sections.length;
  }
  if (bookTotalSections !== 219) {
    errors.push({
      code: 'BOOK_TOTAL_SECTIONS_MISMATCH',
      message: `book.json sections 总数不匹配：期望 219，实际 ${bookTotalSections}`
    });
  }

  const globalIds = new Map(); // id -> location
  function registerGlobalId(id, location) {
    if (!id) {
      errors.push({
        code: 'EMPTY_ANCHOR_ID',
        message: `出现空 ID / 锚点：位于 ${location}`
      });
      return;
    }
    if (globalIds.has(id)) {
      errors.push({
        code: 'DUPLICATE_GLOBAL_ID',
        id,
        message: `全局 ID 重复：${id}，已存在于 ${globalIds.get(id)}，再次出现在 ${location}`
      });
    } else {
      globalIds.set(id, location);
    }
  }

  let totalSections = 0;
  let totalEnvironments = 0;
  let totalEquations = 0;
  let totalExercises = 0;

  // Process each chapter
  for (let chNum = 1; chNum <= 34; chNum++) {
    const chapterId = 'c' + String(chNum).padStart(2, '0');
    const t01ChPath = path.join(t01Dir, 'chapters', `${chapterId}.json`);
    const siteChPath = path.join(siteDir, 'chapters', `${chapterId}.json`);
    const exercisesPath = path.join(siteDir, 'exercises', `${chapterId}.json`);

    if (!fs.existsSync(siteChPath)) {
      errors.push({
        code: 'MISSING_SITE_CHAPTER',
        chapterId,
        message: `缺少章节站点 JSON：${siteChPath}`
      });
      continue;
    }

    if (!fs.existsSync(exercisesPath)) {
      errors.push({
        code: 'MISSING_EXERCISES_FILE',
        chapterId,
        message: `缺少拆分习题 JSON：${exercisesPath}`
      });
      continue;
    }

    const t01Ch = JSON.parse(fs.readFileSync(t01ChPath, 'utf8'));
    const siteCh = JSON.parse(fs.readFileSync(siteChPath, 'utf8'));
    const siteExData = JSON.parse(fs.readFileSync(exercisesPath, 'utf8'));

    // Check payload size budgets
    const chapterJsonSize = fs.statSync(siteChPath).size;
    if (chapterJsonSize > 300 * 1024) {
      errors.push({
        code: 'CHAPTER_JSON_OVERSIZED',
        chapterId,
        message: `章节 JSON 体积超标：${chapterJsonSize} bytes > 300KB`
      });
    }

    const exercisesJsonSize = fs.statSync(exercisesPath).size;
    if (exercisesJsonSize > 3 * 1024 * 1024) {
      errors.push({
        code: 'EXERCISES_JSON_OVERSIZED',
        chapterId,
        message: `习题 JSON 体积超标：${exercisesJsonSize} bytes > 3MB`
      });
    }

    // Check title, label, displayTitle clean format
    if (/^第\d+章/.test(siteCh.title)) {
      errors.push({
        code: 'TITLE_NOT_CLEAN',
        chapterId,
        message: `章节 title 包含未剥离的前缀：${siteCh.title}`
      });
    }
    if (siteCh.label !== `第${siteCh.number}章`) {
      errors.push({
        code: 'LABEL_MISMATCH',
        chapterId,
        message: `章节 label 错误：期望 第${siteCh.number}章，实际 ${siteCh.label}`
      });
    }
    if (siteCh.displayTitle !== `第${siteCh.number}章　${siteCh.title}`) {
      errors.push({
        code: 'DISPLAY_TITLE_MISMATCH',
        chapterId,
        message: `章节 displayTitle 格式错误：${siteCh.displayTitle}`
      });
    }

    // Confirm that siteCh does NOT contain heavy inline html or exercises array
    if (siteCh.exercises !== undefined) {
      errors.push({
        code: 'UNEXPECTED_INLINE_EXERCISES',
        chapterId,
        message: `章节 JSON 不应内联 exercises 数组，应改为 exerciseCount 和 exercisesPath`
      });
    }

    // Structural parity checks
    if (siteCh.sections.length !== t01Ch.sections.length) {
      errors.push({
        code: 'SECTION_COUNT_MISMATCH',
        chapterId,
        message: `节数量不匹配：T01 为 ${t01Ch.sections.length}，站点为 ${siteCh.sections.length}`
      });
    }
    if (siteCh.environmentIndex.length !== t01Ch.environments.length) {
      errors.push({
        code: 'ENVIRONMENT_COUNT_MISMATCH',
        chapterId,
        message: `环境数量不匹配：T01 为 ${t01Ch.environments.length}，站点为 ${siteCh.environmentIndex.length}`
      });
    }
    if (siteExData.exercises.length !== t01Ch.exercises.length) {
      errors.push({
        code: 'EXERCISE_COUNT_MISMATCH',
        chapterId,
        message: `习题数量不匹配：T01 为 ${t01Ch.exercises.length}，拆分习题为 ${siteExData.exercises.length}`
      });
    }

    // Verify book.json chapter sections parity with chapter manifest
    const bookCh = siteBook.chapters.find(bc => bc.id === chapterId);
    if (!bookCh || !Array.isArray(bookCh.sections)) {
      errors.push({
        code: 'BOOK_CHAPTER_SECTIONS_MISSING',
        chapterId,
        message: `book.json 未找到章节 ${chapterId} 或缺少 sections 数组`
      });
    } else {
      if (bookCh.sections.length !== siteCh.sections.length) {
        errors.push({
          code: 'BOOK_SECTION_COUNT_MISMATCH',
          chapterId,
          message: `book.json 章节 ${chapterId} 节数 (${bookCh.sections.length}) 与章 manifest (${siteCh.sections.length}) 不一致`
        });
      } else {
        for (let i = 0; i < siteCh.sections.length; i++) {
          const bs = bookCh.sections[i];
          const cs = siteCh.sections[i];
          if (bs.id !== cs.id || bs.number !== cs.number || bs.anchor !== cs.anchor || bs.title !== cs.title) {
            errors.push({
              code: 'BOOK_SECTION_PARITY_MISMATCH',
              chapterId,
              sectionId: cs.id,
              message: `book.json 节元信息与章 manifest 不一致：[${bs.id}, ${bs.number}, ${bs.anchor}, ${bs.title}] vs [${cs.id}, ${cs.number}, ${cs.anchor}, ${cs.title}]`
            });
          }
          if (!('difficulty' in bs) || !('priority' in bs) || !('minutes' in bs)) {
            errors.push({
              code: 'BOOK_SECTION_META_KEYS_MISSING',
              chapterId,
              sectionId: cs.id,
              message: `book.json 节 ${cs.id} 必须包含 difficulty/priority/minutes 字段（允许为 null）`
            });
          }
          if (bs.htmlPath !== undefined || bs.htmlBytes !== undefined) {
            errors.push({
              code: 'BOOK_SECTION_UNEXPECTED_HEAVY_KEYS',
              chapterId,
              sectionId: cs.id,
              message: `book.json 节 ${cs.id} 不应包含 htmlPath/htmlBytes`
            });
          }
        }
      }
    }

    totalSections += siteCh.sections.length;
    totalEnvironments += siteCh.environmentIndex.length;
    totalEquations += (siteCh.equationIndex || []).length;
    totalExercises += siteExData.exercises.length;

    // Register section IDs & subsection IDs
    for (const sec of siteCh.sections) {
      // Must not contain inline html string
      if (sec.html !== undefined) {
        errors.push({
          code: 'UNEXPECTED_INLINE_SECTION_HTML',
          chapterId,
          sectionId: sec.id,
          message: `节对象不应内联 html 字段，应拆到 htmlPath`
        });
      }

      // Check section HTML file exists on disk
      const secHtmlPath = path.join(siteDir, 'sections', `${sec.id}.html`);
      if (!fs.existsSync(secHtmlPath)) {
        errors.push({
          code: 'MISSING_SPLIT_SECTION_HTML',
          chapterId,
          sectionId: sec.id,
          message: `未找到拆分的节 HTML 文件：${secHtmlPath}`
        });
        continue;
      }

      // Check section HTML size budget (warn if > 1MB, as per spec for reporting)
      const secHtmlSize = fs.statSync(secHtmlPath).size;
      if (secHtmlSize > 1024 * 1024) {
        warnings.push({
          code: 'SECTION_HTML_OVER_1MB',
          chapterId,
          sectionId: sec.id,
          message: `单节 HTML 文件体积 > 1MB：${(secHtmlSize / 1024).toFixed(1)} KB (gzip: ${(zlibGzipSize(fs.readFileSync(secHtmlPath)) / 1024).toFixed(1)} KB)`
        });
      }

      registerGlobalId(sec.id, `${chapterId} 节 ${sec.id}`);
      if (sec.anchor && sec.anchor !== sec.id) {
        registerGlobalId(sec.anchor, `${chapterId} 节锚点 ${sec.anchor}`);
      }
      for (const sub of sec.subsections || []) {
        registerGlobalId(sub.id, `${chapterId} 子节 ${sub.id}`);
        if (sub.anchor && sub.anchor !== sub.id) {
          registerGlobalId(sub.anchor, `${chapterId} 子节锚点 ${sub.anchor}`);
        }
      }
    }

    // Register exercises & verify sectionId is null as per T01 specification
    for (const ex of siteExData.exercises) {
      registerGlobalId(ex.id, `${chapterId} 习题 ${ex.id}`);
      if (ex.sectionId !== null && t01Ch.exercises.find(e => e.id === ex.id)?.sectionId === null) {
        errors.push({
          code: 'FABRICATED_EXERCISE_SECTION_ID',
          chapterId,
          exerciseId: ex.id,
          message: `习题 sectionId 不得虚构（T01 规定章末习题 sectionId 为 null）：当前值为 ${ex.sectionId}`
        });
      }
    }

    // 6.1 Text Coverage Verification FROM SPLIT FILES ON DISK
    // Intro coverage
    if (t01Ch.introMarkdown && t01Ch.introMarkdown.trim()) {
      const diff = diffCoverage(t01Ch.introMarkdown, siteCh.introHtml, { chapterId, type: 'intro' });
      if (diff) {
        errors.push(diff);
      }
    }

    // Summary coverage
    if (t01Ch.summaryMarkdown && t01Ch.summaryMarkdown.trim()) {
      const sourceSummary = '## 本章小结\n\n' + t01Ch.summaryMarkdown;
      const diff = diffCoverage(sourceSummary, siteCh.summaryHtml, { chapterId, type: 'summary' });
      if (diff) {
        errors.push(diff);
      }
    }

    // Section coverage READ DIRECTLY FROM DISK
    for (const sec of siteCh.sections) {
      const t01Sec = t01Ch.sections.find(s => s.id === sec.id);
      if (!t01Sec) {
        errors.push({
          code: 'SECTION_NOT_FOUND_IN_T01',
          chapterId,
          sectionId: sec.id,
          message: `节 ${sec.id} 在 T01 中未找到`
        });
        continue;
      }
      const secHtmlPath = path.join(siteDir, 'sections', `${sec.id}.html`);
      const diskHtml = fs.readFileSync(secHtmlPath, 'utf8');

      const diff = diffCoverage(t01Sec.markdown, diskHtml, { chapterId, sectionId: sec.id, type: 'section' });
      if (diff) {
        errors.push(diff);
      }
    }

    // Exercise & Solution coverage READ FROM SPLIT EXERCISES FILE
    for (const ex of siteExData.exercises) {
      const t01Ex = t01Ch.exercises.find(e => e.id === ex.id);
      if (!t01Ex) {
        errors.push({
          code: 'EXERCISE_NOT_FOUND_IN_T01',
          chapterId,
          exerciseId: ex.id,
          message: `习题 ${ex.id} 在 T01 中未找到`
        });
        continue;
      }
      const diffQ = diffCoverage(t01Ex.markdown, ex.questionHtml, { chapterId, sectionId: ex.id, type: 'exercise_question' }, true, ex.number);
      if (diffQ) {
        errors.push(diffQ);
      }
      if (t01Ex.solutionMarkdown && t01Ex.solutionMarkdown.trim()) {
        const diffS = diffCoverage(t01Ex.solutionMarkdown, ex.solutionHtml, { chapterId, sectionId: ex.id, type: 'exercise_solution' });
        if (diffS) {
          errors.push(diffS);
        }
      } else {
        errors.push({
          code: 'MISSING_EXERCISE_SOLUTION',
          chapterId,
          exerciseId: ex.id,
          message: `习题 ${ex.id} 缺少解析文本`
        });
      }
    }

    // 6.2 Equation Verification
    const t01TaggedEqs = t01Ch.equations.filter(e => e.tag);
    if (siteCh.equationIndex.length !== t01TaggedEqs.length) {
      errors.push({
        code: 'EQUATION_INDEX_COUNT_MISMATCH',
        chapterId,
        message: `带 tag 公式索引数不匹配：T01 为 ${t01TaggedEqs.length}，站点为 ${siteCh.equationIndex.length}`
      });
    }

    for (let eqIdx = 0; eqIdx < t01TaggedEqs.length; eqIdx++) {
      const t01Eq = t01TaggedEqs[eqIdx];
      const siteEq = siteCh.equationIndex[eqIdx];
      if (!siteEq) {
        errors.push({
          code: 'MISSING_EQUATION_INDEX_ENTRY',
          chapterId,
          equationId: t01Eq.id,
          message: `公式索引缺少条目 ${t01Eq.id}`
        });
        continue;
      }
      if (siteEq.id !== t01Eq.id) {
        errors.push({
          code: 'EQUATION_ID_MISMATCH',
          chapterId,
          message: `公式 ID 不匹配：期望 ${t01Eq.id}，实际 ${siteEq.id}`
        });
      }
      if (normalizeWs(siteEq.latex) !== normalizeWs(t01Eq.latex)) {
        errors.push({
          code: 'EQUATION_LATEX_MISMATCH',
          chapterId,
          equationId: siteEq.id,
          message: `公式 LaTeX 与原文不一致：期望 "${t01Eq.latex}"，实际 "${siteEq.latex}"`
        });
      }
      registerGlobalId(siteEq.id, `${chapterId} 公式 ${siteEq.id}`);
    }

    // 6.3 Anchor Existence in HTML (aggregated across split files)
    const splitSectionHtmls = siteCh.sections.map(s => {
      const p = path.join(siteDir, 'sections', `${s.id}.html`);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    });
    const splitExercisesHtmls = siteExData.exercises.map(e => (e.questionHtml || '') + (e.solutionHtml || ''));

    const allHtml = [
      siteCh.introHtml || '',
      siteCh.summaryHtml || '',
      ...splitSectionHtmls,
      ...splitExercisesHtmls
    ].join('\n');

    // Check environments exist in HTML
    for (const env of siteCh.environmentIndex) {
      registerGlobalId(env.id, `${chapterId} 环境 ${env.id}`);
      if (env.anchor && env.anchor !== env.id) {
        registerGlobalId(env.anchor, `${chapterId} 环境锚点 ${env.anchor}`);
      }
      const pattern = new RegExp(`id="${env.id}"`);
      if (!pattern.test(allHtml)) {
        errors.push({
          code: 'ENVIRONMENT_ANCHOR_NOT_IN_HTML',
          chapterId,
          envId: env.id,
          message: `环境锚点在 HTML 中未找到：id="${env.id}"`
        });
      }
    }

    // Check tagged equations exist in HTML
    for (const eq of siteCh.equationIndex) {
      const pattern = new RegExp(`id="${eq.id}"`);
      if (!pattern.test(allHtml)) {
        errors.push({
          code: 'EQUATION_ANCHOR_NOT_IN_HTML',
          chapterId,
          eqId: eq.id,
          message: `公式锚点在 HTML 中未找到：id="${eq.id}"`
        });
      }
    }
  }

  // Summary counts
  const summary = {
    chapters: siteBook.chapters.length,
    sections: totalSections,
    environments: totalEnvironments,
    equations: totalEquations,
    exercises: totalExercises,
    errors: errors.length,
    warnings: warnings.length
  };

  const validationResult = {
    errors,
    warnings,
    summary
  };

  // Write validation.json into siteDir
  const outPath = path.join(siteDir, 'validation.json');
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(validationResult, null, 2) + '\n');

  return validationResult;
}

// CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log('[validate-content] 开始从拆分磁盘文件全量校验站点内容保真与结构...');
  const result = validateSite();

  console.log(`[validate-content] 校验完成：`);
  console.log(`  - 章节总数：${result.summary.chapters}`);
  console.log(`  - 一级节数：${result.summary.sections}`);
  console.log(`  - 环境总数：${result.summary.environments}`);
  console.log(`  - tagged 公式数：${result.summary.equations}`);
  console.log(`  - 习题/解析数：${result.summary.exercises}`);
  console.log(`  - 错误数：${result.summary.errors}`);
  console.log(`  - 警告数：${result.summary.warnings}`);

  if (result.errors.length > 0) {
    console.error(`[validate-content] 校验失败（发现 ${result.errors.length} 处错误）：`);
    result.errors.slice(0, 10).forEach(e => {
      console.error(`  - [${e.code}] ${e.chapterId || ''} ${e.sectionId || ''}: ${e.message}`);
      if (e.sample) console.error(`    ${e.sample}`);
    });
    if (result.errors.length > 10) {
      console.error(`  ... 另有 ${result.errors.length - 10} 处错误已写入 validation.json`);
    }
    process.exit(1);
  } else {
    console.log('[validate-content] 全部校验通过，0 错误！');
    process.exit(0);
  }
}
