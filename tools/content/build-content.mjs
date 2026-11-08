/**
 * Quant Math Academy - Site Content Build Pipeline (T03b)
 * Reads T01 chapter JSONs & optional metadata, renders Markdown & KaTeX, generates site JSONs and validation reports.
 * Implements section HTML splitting and dedicated exercises JSON to maintain light chapter payloads.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

import { renderChapter, PILOT_CHAPTER_IDS } from './render.mjs';
import { validateSite } from './validate-content.mjs';

const ROOT = process.cwd();
const T01_DIR = path.join(ROOT, 'content', 'generated');
const META_DIR = path.join(ROOT, 'content', 'metadata', 'chapters');
const SITE_DIR = path.join(ROOT, 'content', 'generated', 'site');
const SITE_CH_DIR = path.join(SITE_DIR, 'chapters');
const SITE_SEC_DIR = path.join(SITE_DIR, 'sections');
const SITE_EX_DIR = path.join(SITE_DIR, 'exercises');

export function buildContent(options = {}) {
  const startTime = Date.now();
  const t01Dir = options.t01Dir || T01_DIR;
  const siteDir = options.siteDir || SITE_DIR;
  const metaDir = options.metaDir || META_DIR;

  const siteChDir = path.join(siteDir, 'chapters');
  const siteSecDir = path.join(siteDir, 'sections');
  const siteExDir = path.join(siteDir, 'exercises');

  fs.mkdirSync(siteChDir, { recursive: true });
  fs.mkdirSync(siteSecDir, { recursive: true });
  fs.mkdirSync(siteExDir, { recursive: true });

  const t01Book = JSON.parse(fs.readFileSync(path.join(t01Dir, 'book.json'), 'utf8'));

  const siteChapters = [];
  const chapterManifestList = [];

  let totalSections = 0;
  let totalEnvironments = 0;
  let totalDisplayEquations = 0;
  let totalTaggedEquations = 0;
  let totalExercises = 0;
  let totalHtmlBytes = 0;

  let maxChapterBytes = 0;
  let maxChapterId = '';
  let maxChapterGzipBytes = 0;

  let maxSectionBytes = 0;
  let maxSectionId = '';
  let maxSectionGzipBytes = 0;

  let maxExercisesBytes = 0;
  let maxExercisesChapterId = '';
  let maxExercisesGzipBytes = 0;

  const allWarnings = [];
  const allErrors = [];

  for (let chNum = 1; chNum <= 34; chNum++) {
    const chapterId = 'c' + String(chNum).padStart(2, '0');
    const t01ChPath = path.join(t01Dir, 'chapters', `${chapterId}.json`);
    const t01Ch = JSON.parse(fs.readFileSync(t01ChPath, 'utf8'));

    // Check optional metadata from T02
    let metadata = null;
    const metaPath = path.join(metaDir, `${chapterId}.json`);
    if (fs.existsSync(metaPath)) {
      try {
        metadata = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      } catch (e) {
        allWarnings.push({
          code: 'METADATA_PARSE_ERROR',
          chapterId,
          message: `元数据解析失败：${e.message}`
        });
      }
    }

    const { siteChapter, warnings, errors } = renderChapter(t01Ch, metadata, {
      chapterId
    });

    if (warnings.length > 0) allWarnings.push(...warnings);
    if (errors.length > 0) allErrors.push(...errors);

    totalSections += siteChapter.sections.length;
    totalEnvironments += siteChapter.environmentIndex.length;
    totalTaggedEquations += siteChapter.equationIndex.length;
    totalDisplayEquations += (t01Ch.equations || []).length;
    totalExercises += siteChapter.exercises.length;
    totalHtmlBytes += siteChapter.stats.htmlBytes;

    // 1. Write each section's HTML to content/generated/site/sections/{sec.id}.html
    const lightSections = [];
    for (const sec of siteChapter.sections) {
      const secFileName = `${sec.id}.html`;
      const secFilePath = path.join(siteSecDir, secFileName);
      const secHtmlBuffer = Buffer.from(sec.html, 'utf8');
      const secBytes = secHtmlBuffer.length;
      const secGzipBytes = zlib.gzipSync(secHtmlBuffer).length;

      fs.writeFileSync(secFilePath, sec.html);

      if (secBytes > maxSectionBytes) {
        maxSectionBytes = secBytes;
        maxSectionId = sec.id;
        maxSectionGzipBytes = secGzipBytes;
      }

      lightSections.push({
        id: sec.id,
        number: sec.number,
        title: sec.title,
        anchor: sec.anchor,
        htmlPath: `sections/${secFileName}`,
        htmlBytes: secBytes,
        subsections: sec.subsections,
        meta: sec.meta,
        exerciseIds: sec.exerciseIds || []
      });
    }

    // 2. Write exercises to content/generated/site/exercises/{chapterId}.json
    const exercisesFileName = `${chapterId}.json`;
    const exercisesFilePath = path.join(siteExDir, exercisesFileName);
    const exercisesData = {
      schemaVersion: 1,
      chapterId,
      exerciseCount: siteChapter.exercises.length,
      exercises: siteChapter.exercises
    };
    const exercisesJsonStr = JSON.stringify(exercisesData, null, 2) + '\n';
    const exercisesBuffer = Buffer.from(exercisesJsonStr, 'utf8');
    const exercisesBytes = exercisesBuffer.length;
    const exercisesGzipBytes = zlib.gzipSync(exercisesBuffer).length;

    fs.writeFileSync(exercisesFilePath, exercisesJsonStr);

    if (exercisesBytes > maxExercisesBytes) {
      maxExercisesBytes = exercisesBytes;
      maxExercisesChapterId = chapterId;
      maxExercisesGzipBytes = exercisesGzipBytes;
    }

    // 3. Construct lightweight chapter JSON (no heavy html or exercises arrays)
    const lightChapter = {
      schemaVersion: 1,
      chapterId: siteChapter.chapterId,
      number: siteChapter.number,
      label: siteChapter.label,
      title: siteChapter.title,
      displayTitle: siteChapter.displayTitle,
      partId: siteChapter.partId,
      pilot: siteChapter.pilot,
      metaStatus: siteChapter.metaStatus,
      introHtml: siteChapter.introHtml,
      summaryHtml: siteChapter.summaryHtml,
      sections: lightSections,
      exerciseCount: siteChapter.exercises.length,
      exercisesPath: `exercises/${exercisesFileName}`,
      environmentIndex: siteChapter.environmentIndex,
      equationIndex: siteChapter.equationIndex,
      stats: {
        sections: lightSections.length,
        environments: siteChapter.environmentIndex.length,
        displayEquations: (t01Ch.equations || []).length,
        taggedEquations: siteChapter.equationIndex.length,
        equations: siteChapter.equationIndex.length,
        exercises: siteChapter.exercises.length,
        htmlBytes: siteChapter.stats.htmlBytes
      }
    };

    const chapterJsonStr = JSON.stringify(lightChapter, null, 2) + '\n';
    const chapterBuffer = Buffer.from(chapterJsonStr, 'utf8');
    const chapterBytes = chapterBuffer.length;
    const chapterGzipBytes = zlib.gzipSync(chapterBuffer).length;

    if (chapterBytes > maxChapterBytes) {
      maxChapterBytes = chapterBytes;
      maxChapterId = chapterId;
      maxChapterGzipBytes = chapterGzipBytes;
    }

    fs.writeFileSync(path.join(siteChDir, `${chapterId}.json`), chapterJsonStr);

    chapterManifestList.push({
      id: chapterId,
      number: siteChapter.number,
      label: siteChapter.label,
      title: siteChapter.title,
      displayTitle: siteChapter.displayTitle,
      jsonSizeBytes: chapterBytes,
      jsonGzipBytes: chapterGzipBytes,
      exercisesSizeBytes: exercisesBytes,
      exercisesGzipBytes,
      htmlBytes: siteChapter.stats.htmlBytes,
      stats: lightChapter.stats
    });

    siteChapters.push(lightChapter);
  }

  // 4. Build site book.json
  const siteBook = {
    schemaVersion: 1,
    title: t01Book.title || '量化数学进阶教材',
    subtitle: t01Book.subtitle || 'Quant Math Academy',
    parts: t01Book.parts.map(p => ({
      id: p.id,
      order: p.order,
      title: p.title,
      chapterIds: p.chapterIds
    })),
    chapters: siteChapters.map(c => {
      const orig = t01Book.chapters.find(origC => origC.id === c.chapterId) || {};
      return {
        id: c.chapterId,
        number: c.number,
        label: c.label,
        title: c.title,
        displayTitle: c.displayTitle,
        slug: orig.slug || '',
        partId: c.partId,
        pilot: c.pilot,
        metaStatus: c.metaStatus,
        sectionCount: c.sections.length,
        exerciseCount: c.exerciseCount,
        stats: c.stats,
        sections: c.sections.map(s => ({
          id: s.id,
          number: s.number,
          title: s.title,
          anchor: s.anchor,
          difficulty: s.meta?.difficulty ?? null,
          priority: s.meta?.priority ?? null,
          minutes: s.meta?.minutes ?? null
        }))
      };
    }),
    pilotChapterIds: PILOT_CHAPTER_IDS
  };

  fs.writeFileSync(path.join(siteDir, 'book.json'), JSON.stringify(siteBook, null, 2) + '\n');

  const elapsedMs = Date.now() - startTime;

  // First screen payload estimate: c01 chapter JSON + c01-s1 section HTML
  const firstChapterJsonPath = path.join(siteChDir, 'c01.json');
  const firstSectionHtmlPath = path.join(siteSecDir, 'c01-s1.html');
  const firstChapterBytes = fs.existsSync(firstChapterJsonPath) ? fs.statSync(firstChapterJsonPath).size : 0;
  const firstSectionBytes = fs.existsSync(firstSectionHtmlPath) ? fs.statSync(firstSectionHtmlPath).size : 0;
  const firstScreenRawBytes = firstChapterBytes + firstSectionBytes;
  const firstScreenGzipBytes = zlib.gzipSync(Buffer.concat([
    fs.readFileSync(firstChapterJsonPath),
    fs.readFileSync(firstSectionHtmlPath)
  ])).length;

  // 5. Build manifest.json
  const manifest = {
    schemaVersion: 1,
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    elapsedMs,
    summary: {
      chapters: siteChapters.length,
      sections: totalSections,
      environments: totalEnvironments,
      displayEquations: totalDisplayEquations,
      taggedEquations: totalTaggedEquations,
      exercises: totalExercises,
      totalHtmlBytes
    },
    sectionSplitting: {
      applied: true,
      sectionsCount: totalSections,
      exercisesFilesCount: siteChapters.length,
      maxSectionHtml: {
        sectionId: maxSectionId,
        sizeBytes: maxSectionBytes,
        sizeKB: (maxSectionBytes / 1024).toFixed(1),
        estimatedGzipBytes: maxSectionGzipBytes,
        estimatedGzipKB: (maxSectionGzipBytes / 1024).toFixed(1)
      },
      maxChapterJson: {
        chapterId: maxChapterId,
        sizeBytes: maxChapterBytes,
        sizeKB: (maxChapterBytes / 1024).toFixed(1),
        estimatedGzipBytes: maxChapterGzipBytes,
        estimatedGzipKB: (maxChapterGzipBytes / 1024).toFixed(1)
      },
      maxExercisesJson: {
        chapterId: maxExercisesChapterId,
        sizeBytes: maxExercisesBytes,
        sizeMB: (maxExercisesBytes / 1024 / 1024).toFixed(2),
        estimatedGzipBytes: maxExercisesGzipBytes,
        estimatedGzipMB: (maxExercisesGzipBytes / 1024 / 1024).toFixed(2)
      },
      firstScreenEstimate: {
        chapterId: 'c01',
        sectionId: 'c01-s1',
        rawBytes: firstScreenRawBytes,
        rawKB: (firstScreenRawBytes / 1024).toFixed(1),
        gzipBytes: firstScreenGzipBytes,
        gzipKB: (firstScreenGzipBytes / 1024).toFixed(1)
      }
    },
    chapters: chapterManifestList
  };

  fs.writeFileSync(path.join(siteDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

  // Run hard-gate validation from split files
  const validationResult = validateSite({
    t01Dir,
    siteDir
  });

  return {
    manifest,
    validationResult,
    siteBook,
    elapsedMs,
    splitting: manifest.sectionSplitting
  };
}

// CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log('=== [content:build] 开始全量 HTML 渲染与分节拆分管线构建 ===');
  const result = buildContent();

  console.log('\n=== [content:build] 构建与拆分完成 ===');
  console.log(`  - 章节总数：${result.manifest.summary.chapters}`);
  console.log(`  - 一级节 HTML 拆分：${result.splitting.sectionsCount} 个文件（最大节 ${result.splitting.maxSectionHtml.sectionId}：${result.splitting.maxSectionHtml.sizeKB} KB，gzip: ${result.splitting.maxSectionHtml.estimatedGzipKB} KB）`);
  console.log(`  - 习题 JSON 拆分：${result.splitting.exercisesFilesCount} 个文件（最大习题 ${result.splitting.maxExercisesJson.chapterId}：${result.splitting.maxExercisesJson.sizeMB} MB，gzip: ${result.splitting.maxExercisesJson.estimatedGzipMB} MB）`);
  console.log(`  - 瘦身章节 JSON：最大章 ${result.splitting.maxChapterJson.chapterId}（${result.splitting.maxChapterJson.sizeKB} KB，gzip: ${result.splitting.maxChapterJson.estimatedGzipKB} KB）`);
  console.log(`  - 首屏首节预算（c01 JSON + c01-s1 HTML）：原始 ${result.splitting.firstScreenEstimate.rawKB} KB / gzip 压缩仅 ${result.splitting.firstScreenEstimate.gzipKB} KB`);
  console.log(`  - 总构建耗时：${result.elapsedMs} ms`);
  console.log(`  - 校验结果：${result.validationResult.summary.errors} 错误，${result.validationResult.summary.warnings} 警告`);

  if (result.validationResult.errors.length > 0) {
    console.error('\n[content:build] 硬闸门校验未通过，退出码 1：');
    result.validationResult.errors.slice(0, 5).forEach(e => {
      console.error(`  - [${e.code}] ${e.message}`);
    });
    process.exit(1);
  } else {
    console.log('[content:build] 构建、拆分与硬闸门校验完全成功！');
    process.exit(0);
  }
}
