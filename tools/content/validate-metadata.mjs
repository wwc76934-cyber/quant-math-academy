/**
 * Quant Math Academy - Metadata Validator (T02)
 * Validates chapter and section metadata against book schema and CONTENT_MODEL.md specifications.
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const PILOT_CHAPTER_IDS = ['c01', 'c08', 'c11', 'c33'];
const VALID_DIFFICULTY = new Set(['D1', 'D2', 'D3', 'D4', 'D5']);
const VALID_PRIORITY = new Set(['P0', 'P1', 'P2', 'P3']);
const VALID_EXAM_FREQ = new Set(['high', 'medium', 'low', 'none']);
const VALID_STRENGTH = new Set(['required', 'helpful']);
const VALID_METADATA_STATUS = new Set(['pending', 'draft', 'reviewed', 'revised']);
const FORBIDDEN_WORDS = ['重要', '难点', '必考'];

/**
 * Validates metadata for the pilot chapters.
 * @param {Object} options Configuration options
 * @returns {Object} Validation result { errors, warnings, summary, distribution }
 */
export function validateMetadata(options = {}) {
  const rootDir = options.rootDir || process.cwd();
  const bookPath = options.bookPath || path.join(rootDir, 'content', 'generated', 'book.json');
  const metadataDir = options.metadataDir || path.join(rootDir, 'content', 'metadata');
  const generatedChaptersDir = options.generatedChaptersDir || path.join(rootDir, 'content', 'generated', 'chapters');
  let pilotChapterIds = options.pilotChapterIds;
  if (!pilotChapterIds) {
    const chaptersDir = path.join(metadataDir, 'chapters');
    if (fs.existsSync(chaptersDir)) {
      pilotChapterIds = fs.readdirSync(chaptersDir)
        .filter(f => f.endsWith('.json'))
        .map(f => path.basename(f, '.json'))
        .sort();
    } else {
      pilotChapterIds = PILOT_CHAPTER_IDS;
    }
  }
  const outputPath = options.outputPath || path.join(rootDir, 'content', 'generated', 'metadata-validation.json');
  const writeOutput = options.writeOutput !== false;

  const errors = [];
  const warnings = [];

  // 1. Read book.json
  if (!fs.existsSync(bookPath)) {
    errors.push({
      code: 'MISSING_BOOK_JSON',
      message: `缺少 book.json：${bookPath}`
    });
    return { errors, warnings, summary: { errors: errors.length, warnings: warnings.length } };
  }

  const book = JSON.parse(fs.readFileSync(bookPath, 'utf8'));

  // Build section order index and chapter lookup
  const allSectionIds = new Set();
  const sectionOrderMap = new Map();
  const sectionChapterMap = new Map();
  const chapterById = new Map();

  let globalOrder = 0;
  for (const ch of book.chapters) {
    chapterById.set(ch.id, ch);
    for (const s of ch.sections) {
      allSectionIds.add(s.id);
      sectionOrderMap.set(s.id, globalOrder++);
      sectionChapterMap.set(s.id, ch.id);
    }
  }

  // 2. Read tags dictionary if present
  const tagsPath = path.join(metadataDir, 'tags.json');
  let registeredTags = new Set();
  if (fs.existsSync(tagsPath)) {
    try {
      const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));
      const combined = [
        ...(tagsData.branches || []),
        ...(tagsData.types || []),
        ...(tagsData.quant || []),
        ...(tagsData.methods || [])
      ];
      registeredTags = new Set(combined);
    } catch (e) {
      warnings.push({
        code: 'INVALID_TAGS_JSON',
        message: `无法解析 tags.json：${e.message}`
      });
    }
  } else {
    warnings.push({
      code: 'MISSING_TAGS_JSON',
      message: `缺少 tags.json：${tagsPath}`
    });
  }

  // Distribution counters
  const distribution = {
    difficulty: { D1: 0, D2: 0, D3: 0, D4: 0, D5: 0 },
    priority: { P0: 0, P1: 0, P2: 0, P3: 0 },
    examFrequency: { high: 0, medium: 0, low: 0, none: 0 }
  };

  const prereqGraph = new Map(); // id -> array of prereq ids
  let totalPilotSections = 0;
  let coveredSections = 0;

  // 3. Iterate through pilot chapters
  for (const cid of pilotChapterIds) {
    const bookChapter = chapterById.get(cid);
    if (!bookChapter) {
      errors.push({
        code: 'CHAPTER_NOT_IN_BOOK',
        chapterId: cid,
        message: `章节 ${cid} 未在 book.json 中定义`
      });
      continue;
    }

    const expectedSectionIds = (bookChapter.sections || []).map(s => s.id);
    totalPilotSections += expectedSectionIds.length;

    const metaChapterPath = path.join(metadataDir, 'chapters', `${cid}.json`);
    if (!fs.existsSync(metaChapterPath)) {
      errors.push({
        code: 'MISSING_CHAPTER_METADATA',
        chapterId: cid,
        message: `缺少章节元数据文件：${metaChapterPath}`
      });
      continue;
    }

    let metaChapter;
    try {
      metaChapter = JSON.parse(fs.readFileSync(metaChapterPath, 'utf8'));
    } catch (e) {
      errors.push({
        code: 'MALFORMED_CHAPTER_METADATA',
        chapterId: cid,
        message: `章节元数据 JSON 解析错误：${e.message}`
      });
      continue;
    }

    // Validate chapter level fields
    if (metaChapter.schemaVersion !== 1) {
      errors.push({
        code: 'INVALID_SCHEMA_VERSION',
        chapterId: cid,
        message: `schemaVersion 应为 1，实际为 ${metaChapter.schemaVersion}`
      });
    }

    if (metaChapter.chapterId !== cid) {
      errors.push({
        code: 'CHAPTER_ID_MISMATCH',
        chapterId: cid,
        message: `chapterId 不匹配：期望 ${cid}，实际 ${metaChapter.chapterId}`
      });
    }

    if (metaChapter.partId !== bookChapter.partId) {
      errors.push({
        code: 'PART_ID_MISMATCH',
        chapterId: cid,
        message: `partId 不匹配：期望 ${bookChapter.partId}，实际 ${metaChapter.partId}`
      });
    }

    if (!VALID_METADATA_STATUS.has(metaChapter.metadataStatus)) {
      errors.push({
        code: 'INVALID_METADATA_STATUS',
        chapterId: cid,
        message: `metadataStatus 非法：${metaChapter.metadataStatus}`
      });
    }

    // Chapter prerequisites
    if (!Array.isArray(metaChapter.prerequisites)) {
      errors.push({
        code: 'INVALID_CHAPTER_PREREQUISITES',
        chapterId: cid,
        message: `章级 prerequisites 必须是数组`
      });
    } else {
      for (const prereqId of metaChapter.prerequisites) {
        if (!allSectionIds.has(prereqId) && !chapterById.has(prereqId)) {
          errors.push({
            code: 'CHAPTER_PREREQUISITE_NOT_FOUND',
            chapterId: cid,
            message: `章级先修 ID 不存在：${prereqId}`
          });
        }
      }
    }

    // Load generated equations for keyFormulas verification
    const genChapterPath = path.join(generatedChaptersDir, `${cid}.json`);
    let validFormulaIds = new Set();
    if (fs.existsSync(genChapterPath)) {
      try {
        const genChapter = JSON.parse(fs.readFileSync(genChapterPath, 'utf8'));
        validFormulaIds = new Set((genChapter.equations || []).map(e => e.id).filter(Boolean));
      } catch {
        // ignore fallback
      }
    }

    const sectionsMeta = metaChapter.sections || {};

    // Validate each expected section
    for (const sid of expectedSectionIds) {
      const sec = sectionsMeta[sid];
      if (!sec) {
        errors.push({
          code: 'MISSING_SECTION',
          chapterId: cid,
          sectionId: sid,
          message: `缺少节元数据：${sid}`
        });
        continue;
      }

      coveredSections++;

      // Check difficulty
      if (!VALID_DIFFICULTY.has(sec.difficulty)) {
        errors.push({
          code: 'INVALID_DIFFICULTY',
          chapterId: cid,
          sectionId: sid,
          message: `难度枚举非法：${sec.difficulty}`
        });
      } else {
        distribution.difficulty[sec.difficulty] = (distribution.difficulty[sec.difficulty] || 0) + 1;
      }

      // Check priority
      if (!VALID_PRIORITY.has(sec.priority)) {
        errors.push({
          code: 'INVALID_PRIORITY',
          chapterId: cid,
          sectionId: sid,
          message: `必要性枚举非法：${sec.priority}`
        });
      } else {
        distribution.priority[sec.priority] = (distribution.priority[sec.priority] || 0) + 1;
      }

      // Check examFrequency
      if (!VALID_EXAM_FREQ.has(sec.examFrequency)) {
        errors.push({
          code: 'INVALID_EXAM_FREQUENCY',
          chapterId: cid,
          sectionId: sid,
          message: `考核频率枚举非法：${sec.examFrequency}`
        });
      } else {
        distribution.examFrequency[sec.examFrequency] = (distribution.examFrequency[sec.examFrequency] || 0) + 1;
      }

      // Check minutes: multiple of 5 and 20..180
      if (typeof sec.minutes !== 'number' || sec.minutes % 5 !== 0 || sec.minutes < 20 || sec.minutes > 180) {
        errors.push({
          code: 'INVALID_MINUTES',
          chapterId: cid,
          sectionId: sid,
          message: `学习时间必须为 5 的倍数且在 20–180 之间，实际为 ${sec.minutes}`
        });
      }

      // Check tags
      if (!Array.isArray(sec.tags) || sec.tags.length < 2 || sec.tags.length > 6) {
        errors.push({
          code: 'INVALID_TAGS_COUNT',
          chapterId: cid,
          sectionId: sid,
          message: `标签数量必须在 2–6 之间，实际为 ${sec.tags?.length}`
        });
      } else {
        for (const tag of sec.tags) {
          if (typeof tag !== 'string' || tag.length > 12) {
            errors.push({
              code: 'INVALID_TAG_LENGTH',
              chapterId: cid,
              sectionId: sid,
              message: `标签长度不得超过 12 字：'${tag}'`
            });
          }
          for (const forbidden of FORBIDDEN_WORDS) {
            if (typeof tag === 'string' && tag.includes(forbidden)) {
              warnings.push({
                code: 'FORBIDDEN_TAG_WORD',
                chapterId: cid,
                sectionId: sid,
                message: `标签包含禁止词 '${forbidden}'：'${tag}'`
              });
            }
          }
          if (registeredTags.size > 0 && !registeredTags.has(tag)) {
            warnings.push({
              code: 'UNREGISTERED_TAG',
              chapterId: cid,
              sectionId: sid,
              message: `标签未在 tags.json 登记：'${tag}'`
            });
          }
        }
      }

      // Check applications
      if (!Array.isArray(sec.applications) || sec.applications.length < 1 || sec.applications.length > 4) {
        warnings.push({
          code: 'INVALID_APPLICATIONS_COUNT',
          chapterId: cid,
          sectionId: sid,
          message: `量化应用建议 1–4 个，实际为 ${sec.applications?.length}`
        });
      }

      // Check learningObjective
      if (!sec.learningObjective || typeof sec.learningObjective !== 'string' || sec.learningObjective.trim().length === 0) {
        errors.push({
          code: 'MISSING_LEARNING_OBJECTIVE',
          chapterId: cid,
          sectionId: sid,
          message: `学习目标 learningObjective 必填`
        });
      }

      // Check rationale
      if (!sec.rationale || typeof sec.rationale !== 'string') {
        errors.push({
          code: 'MISSING_RATIONALE',
          chapterId: cid,
          sectionId: sid,
          message: `判定理由 rationale 必填`
        });
      } else {
        const rLen = sec.rationale.length;
        if (rLen < 60 || rLen > 180) {
          errors.push({
            code: 'INVALID_RATIONALE_LENGTH',
            chapterId: cid,
            sectionId: sid,
            message: `判定理由长度需在 60–180 字之间，实际为 ${rLen} 字`
          });
        }
      }

      // Check reviewed consistency
      if (sec.reviewed === true) {
        if (!sec.reviewedBy || !sec.reviewedAt) {
          errors.push({
            code: 'REVIEWED_WITHOUT_AUDITOR',
            chapterId: cid,
            sectionId: sid,
            message: `reviewed:true 时必须填写 reviewedBy 与 reviewedAt`
          });
        }
      }

      // Check prerequisites
      const currentOrder = sectionOrderMap.get(sid);
      const prereqList = [];
      if (!Array.isArray(sec.prerequisites)) {
        errors.push({
          code: 'INVALID_PREREQUISITES',
          chapterId: cid,
          sectionId: sid,
          message: `prerequisites 必须为数组`
        });
      } else {
        for (const p of sec.prerequisites) {
          if (!p || typeof p !== 'object' || !p.id) {
            errors.push({
              code: 'MALFORMED_PREREQUISITE',
              chapterId: cid,
              sectionId: sid,
              message: `先修项格式非法：${JSON.stringify(p)}`
            });
            continue;
          }

          if (!VALID_STRENGTH.has(p.strength)) {
            errors.push({
              code: 'INVALID_PREREQUISITE_STRENGTH',
              chapterId: cid,
              sectionId: sid,
              message: `先修强度必须为 required 或 helpful，实际为 ${p.strength}`
            });
          }

          if (p.id === sid) {
            errors.push({
              code: 'PREREQUISITE_SELF_LOOP',
              chapterId: cid,
              sectionId: sid,
              message: `先修不可指向自身：${p.id}`
            });
            continue;
          }

          if (!allSectionIds.has(p.id)) {
            errors.push({
              code: 'PREREQUISITE_NOT_FOUND',
              chapterId: cid,
              sectionId: sid,
              message: `先修节 ID 不存在于全书：${p.id}`
            });
            continue;
          }

          const targetOrder = sectionOrderMap.get(p.id);
          if (targetOrder >= currentOrder) {
            errors.push({
              code: 'PREREQUISITE_FUTURE_SECTION',
              chapterId: cid,
              sectionId: sid,
              message: `先修节 ${p.id} 必须早于本节 ${sid}`
            });
          }

          prereqList.push(p.id);
        }
      }
      prereqGraph.set(sid, prereqList);

      // Check related
      if (!Array.isArray(sec.related) || sec.related.length > 6) {
        errors.push({
          code: 'INVALID_RELATED_COUNT',
          chapterId: cid,
          sectionId: sid,
          message: `相关知识点数量在 0–6 之间，实际为 ${sec.related?.length}`
        });
      } else {
        for (const rId of sec.related) {
          if (rId === sid) {
            errors.push({
              code: 'RELATED_SELF_LOOP',
              chapterId: cid,
              sectionId: sid,
              message: `相关节不可指向自身：${rId}`
            });
          } else if (!allSectionIds.has(rId)) {
            errors.push({
              code: 'RELATED_NOT_FOUND',
              chapterId: cid,
              sectionId: sid,
              message: `相关节 ID 不存在于全书：${rId}`
            });
          }
        }
      }

      // Check keyFormulas
      if (!Array.isArray(sec.keyFormulas) || sec.keyFormulas.length > 4) {
        errors.push({
          code: 'INVALID_KEY_FORMULAS_COUNT',
          chapterId: cid,
          sectionId: sid,
          message: `核心公式数量在 0–4 之间，实际为 ${sec.keyFormulas?.length}`
        });
      } else {
        for (const fId of sec.keyFormulas) {
          if (validFormulaIds.size > 0 && !validFormulaIds.has(fId)) {
            errors.push({
              code: 'FORMULA_NOT_FOUND',
              chapterId: cid,
              sectionId: sid,
              message: `公式 ID 不存在于本章 T01 资产：${fId}`
            });
          }
        }
      }
    }
  }

  // 4. Graph Cycle Check (Topological cycle check)
  const visited = new Map(); // 0 = unvisited, 1 = visiting, 2 = visited
  function hasCycle(node, pathStack = []) {
    visited.set(node, 1);
    pathStack.push(node);
    const neighbors = prereqGraph.get(node) || [];
    for (const neighbor of neighbors) {
      if (visited.get(neighbor) === 1) {
        errors.push({
          code: 'PREREQUISITE_CYCLE',
          message: `先修图存在环：${pathStack.join(' -> ')} -> ${neighbor}`
        });
        return true;
      }
      if (!visited.get(neighbor)) {
        if (hasCycle(neighbor, pathStack)) return true;
      }
    }
    pathStack.pop();
    visited.set(node, 2);
    return false;
  }

  for (const node of prereqGraph.keys()) {
    if (!visited.get(node)) {
      hasCycle(node);
    }
  }

  // Summary
  const summary = {
    pilotChapters: pilotChapterIds.length,
    totalPilotSections,
    coveredSections,
    errors: errors.length,
    warnings: warnings.length
  };

  const result = {
    timestamp: new Date().toISOString(),
    summary,
    distribution,
    errors,
    warnings
  };

  // Write metadata-validation.json
  if (writeOutput) {
    try {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(result, null, 2) + '\n');
    } catch (e) {
      warnings.push({
        code: 'FAILED_TO_WRITE_OUTPUT',
        message: `未能写入校验结果文件：${e.message}`
      });
    }
  }

  return result;
}

// CLI runner
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  console.log('[validate-metadata] 开始校验已标注章节元数据...');
  const result = validateMetadata();

  console.log('[validate-metadata] 校验结果：');
  console.log(`  - 章节数：${result.summary.pilotChapters}`);
  console.log(`  - 试点节总数：${result.summary.totalPilotSections}`);
  console.log(`  - 已覆盖节数：${result.summary.coveredSections}`);
  console.log(`  - 错误数：${result.summary.errors}`);
  console.log(`  - 警告数：${result.summary.warnings}`);

  console.log('\n[难度分布]:', JSON.stringify(result.distribution.difficulty));
  console.log('[必要性分布]:', JSON.stringify(result.distribution.priority));
  console.log('[考核频率分布]:', JSON.stringify(result.distribution.examFrequency));

  if (result.warnings.length > 0) {
    console.warn(`\n[validate-metadata] 发现 ${result.warnings.length} 处警告：`);
    result.warnings.forEach(w => {
      console.warn(`  - [${w.code}] ${w.sectionId || w.chapterId || ''}: ${w.message}`);
    });
  }

  if (result.errors.length > 0) {
    console.error(`\n[validate-metadata] 校验失败（发现 ${result.errors.length} 处错误）：`);
    result.errors.forEach(e => {
      console.error(`  - [${e.code}] ${e.sectionId || e.chapterId || ''}: ${e.message}`);
    });
    process.exit(1);
  } else {
    console.log('\n[validate-metadata] 校验全部通过！');
    process.exit(0);
  }
}
