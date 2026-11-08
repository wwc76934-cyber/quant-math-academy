/**
 * Quant Math Academy - Textbook Parser (Phase 0)
 * Only uses Node.js built-in modules.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const CH_DIR = path.join(ROOT, 'src', 'chapters');
const SO_DIR = path.join(ROOT, 'src', 'solutions');
const OUT_DIR = path.join(ROOT, 'content', 'generated');
const OUT_CH_DIR = path.join(OUT_DIR, 'chapters');

// 8 Parts defined in STYLE_GUIDE.md
export const PARTS_METADATA = [
  { id: 'part-1', order: 1, title: '数学语言与分析基础', chapterIds: ['c01', 'c02', 'c03'] },
  { id: 'part-2', order: 2, title: '线性代数与矩阵分析', chapterIds: ['c04', 'c05', 'c06', 'c07', 'c08'] },
  { id: 'part-3', order: 3, title: '组合、概率论与随机变量', chapterIds: ['c09', 'c10', 'c11', 'c12', 'c13', 'c14'] },
  { id: 'part-4', order: 4, title: '凸优化与数值计算', chapterIds: ['c15', 'c16', 'c17', 'c18'] },
  { id: 'part-5', order: 5, title: '数理统计、回归与统计学习', chapterIds: ['c19', 'c20', 'c21', 'c22', 'c23'] },
  { id: 'part-6', order: 6, title: '随机过程与随机分析', chapterIds: ['c24', 'c25', 'c26', 'c27'] },
  { id: 'part-7', order: 7, title: '时间序列分析', chapterIds: ['c28', 'c29', 'c30'] },
  { id: 'part-8', order: 8, title: '量化研究数学综合', chapterIds: ['c31', 'c32', 'c33', 'c34'] }
];

export const KIND_MAPPING = {
  '定义': { kind: 'definition', prefix: 'def' },
  '定理': { kind: 'theorem', prefix: 'thm' },
  '引理': { kind: 'lemma', prefix: 'lem' },
  '命题': { kind: 'proposition', prefix: 'prop' },
  '推论': { kind: 'corollary', prefix: 'cor' },
  '例': { kind: 'example', prefix: 'ex' },
  '注记': { kind: 'note', prefix: 'note' },
  '公理': { kind: 'axiom', prefix: 'ax' }
};

export function formatChapterId(n) {
  return 'c' + String(n).padStart(2, '0');
}

/**
 * Parse the full textbook manuscript and return structured objects and validation reports.
 */
export function parseBook(options = {}) {
  const chDir = options.chaptersDir || CH_DIR;
  const soDir = options.solutionsDir || SO_DIR;

  const errors = [];
  const warnings = [];
  const chapters = [];
  const fileManifest = [];

  const kindCounts = {
    definition: 0,
    theorem: 0,
    lemma: 0,
    proposition: 0,
    corollary: 0,
    example: 0,
    note: 0,
    axiom: 0
  };

  for (let chNum = 1; chNum <= 34; chNum++) {
    const code = 'C' + String(chNum).padStart(2, '0');
    const chapterId = formatChapterId(chNum);

    const chFiles = fs.existsSync(chDir) ? fs.readdirSync(chDir) : [];
    const chFileName = chFiles.find(f => f.startsWith(code) && f.endsWith('.md') && !f.includes('.part'));
    if (!chFileName) {
      errors.push({
        code: 'MISSING_CHAPTER',
        file: `src/chapters/${code}.md`,
        line: 1,
        message: `缺失第 ${chNum} 章正文文件`,
        chapterId
      });
      continue;
    }

    const soFiles = fs.existsSync(soDir) ? fs.readdirSync(soDir) : [];
    const soFileName = soFiles.find(f => f.startsWith(code) && f.endsWith('.md') && (f.includes('solution') || f.includes('solutions')));
    if (!soFileName) {
      errors.push({
        code: 'MISSING_SOLUTION',
        file: `src/solutions/${code}-solutions.md`,
        line: 1,
        message: `缺失第 ${chNum} 章解析文件`,
        chapterId
      });
    }

    const chRelPath = `src/chapters/${chFileName}`;
    const soRelPath = soFileName ? `src/solutions/${soFileName}` : null;
    const fullChPath = path.join(chDir, chFileName);
    const chRawBuffer = fs.readFileSync(fullChPath);
    const chRaw = chRawBuffer.toString('utf8');

    // SHA-256 and manifest for chapter
    const chSha = crypto.createHash('sha256').update(chRawBuffer).digest('hex');
    fileManifest.push({
      path: chRelPath,
      type: 'chapter',
      chapterId,
      sizeBytes: chRawBuffer.length,
      charCount: [...chRaw].length,
      sha256: chSha
    });

    let soRaw = '';
    if (soFileName) {
      const fullSoPath = path.join(soDir, soFileName);
      const soRawBuffer = fs.readFileSync(fullSoPath);
      soRaw = soRawBuffer.toString('utf8');
      const soSha = crypto.createHash('sha256').update(soRawBuffer).digest('hex');
      fileManifest.push({
        path: soRelPath,
        type: 'solution',
        chapterId,
        sizeBytes: soRawBuffer.length,
        charCount: [...soRaw].length,
        sha256: soSha
      });
    }

    // Normalize newlines and strip BOM from line starts if present, recording BOM_BEFORE_HEADING warning
    const rawLines = chRaw.replace(/\r\n/g, '\n').split('\n');
    const lines = [];
    rawLines.forEach((rawLine, idx) => {
      if (rawLine.startsWith('\uFEFF')) {
        warnings.push({
          code: 'BOM_BEFORE_HEADING',
          file: chRelPath,
          line: idx + 1,
          message: `行首包含 U+FEFF (BOM) 字符，已归一化剥离：${rawLine.replace(/^\uFEFF/, '').trim()}`,
          chapterId
        });
        lines.push(rawLine.replace(/^\uFEFF/, ''));
      } else {
        lines.push(rawLine);
      }
    });

    // Chapter title from line 1
    const line1 = lines[0] || '';
    const titleMatch = line1.match(/^#\s+第\d+章[\s\u3000]+(.*)$/);
    const chTitle = line1.replace(/^#\s+/, '').trim();
    const cleanTitle = titleMatch ? titleMatch[1].trim() : chTitle;

    const slugMatch = chFileName.match(/^C\d+-(.*?)\.md$/);
    const slug = slugMatch ? slugMatch[1] : '';

    let partId = null;
    for (const p of PARTS_METADATA) {
      if (p.chapterIds.includes(chapterId)) {
        partId = p.id;
        break;
      }
    }

    // Identify H2 headings
    const h2List = [];
    lines.forEach((l, idx) => {
      if (l.startsWith('## ')) {
        h2List.push({ lineIndex: idx, text: l.slice(3).trim() });
      }
    });

    const firstH2Line = h2List.length > 0 ? h2List[0].lineIndex : lines.length;
    const introMarkdown = lines.slice(1, firstH2Line).join('\n').trim();

    const sections = [];
    let summaryMarkdown = '';
    let exercisesMarkdown = '';

    for (let h = 0; h < h2List.length; h++) {
      const currentH2 = h2List[h];
      const nextH2Line = h + 1 < h2List.length ? h2List[h + 1].lineIndex : lines.length;
      const content = lines.slice(currentH2.lineIndex + 1, nextH2Line).join('\n').trim();

      if (currentH2.text === '本章小结') {
        summaryMarkdown = content;
      } else if (currentH2.text === '习题') {
        exercisesMarkdown = content;
      } else {
        const secMatch = currentH2.text.match(/^(\d+)\.(\d+)\s+(.+)$/);
        const secNum = secMatch ? `${secMatch[1]}.${secMatch[2]}` : '';
        const secTitle = secMatch ? secMatch[3].trim() : currentH2.text;
        const secOrder = sections.length + 1;
        const secId = `${chapterId}-s${secOrder}`;

        // Subsections
        const subsections = [];
        const secLines = lines.slice(currentH2.lineIndex + 1, nextH2Line);
        secLines.forEach((sl, slIdx) => {
          if (sl.startsWith('### ')) {
            const subText = sl.slice(4).trim();
            const subMatch = subText.match(/^(\d+\.\d+\.\d+)\s+(.+)$/);
            const subOrder = subsections.length + 1;
            const subId = `${secId}-${subOrder}`;
            if (subMatch) {
              const subNum = subMatch[1];
              const subTitle = subMatch[2].trim();
              if (secNum && !subNum.startsWith(`${secNum}.`)) {
                warnings.push({
                  code: 'SUBSECTION_PARENT_MISMATCH',
                  file: chRelPath,
                  line: currentH2.lineIndex + 1 + slIdx + 1,
                  message: `二级节编号 ${subNum} 与所属一级节 ${secNum} 不一致`,
                  chapterId
                });
              }
              subsections.push({
                id: subId,
                number: subNum,
                title: subTitle,
                anchor: subId
              });
            } else {
              subsections.push({
                id: subId,
                number: '',
                title: subText,
                anchor: subId
              });
              warnings.push({
                code: 'UNNUMBERED_SUBSECTION',
                file: chRelPath,
                line: currentH2.lineIndex + 1 + slIdx + 1,
                message: `未编号二级节：### ${subText}`,
                chapterId
              });
            }
          }
        });

        sections.push({
          id: secId,
          number: secNum,
          title: secTitle,
          anchor: secId,
          markdown: content,
          environmentIds: [],
          exerciseIds: [],
          subsections,
          _startIndex: currentH2.lineIndex,
          _endIndex: nextH2Line
        });
      }
    }

    // Check section number continuity
    let prevSecNum = 0;
    sections.forEach((sec) => {
      const parts = sec.number.split('.');
      const currentSecNum = parts.length === 2 ? Number(parts[1]) : 0;
      const expected = prevSecNum + 1;
      if (currentSecNum !== expected) {
        errors.push({
          code: 'SECTION_NUMBER_GAP',
          file: chRelPath,
          line: sec._startIndex + 1,
          message: `节号不连续：期望 ${chNum}.${expected}，实际为 ${sec.number}`,
          chapterId
        });
      }
      prevSecNum = currentSecNum;
    });

    function getSectionForLine(lineIdx) {
      for (const s of sections) {
        if (lineIdx > s._startIndex && lineIdx < s._endIndex) {
          return s;
        }
      }
      return null;
    }

    // Parse environments
    const environments = [];
    let noteOrdinal = 0;
    let i = firstH2Line;

    while (i < lines.length) {
      const l = lines[i];
      const currentSec = getSectionForLine(i);
      if (!currentSec) {
        i++;
        continue;
      }

      const envMatch = l.match(/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+(\d+\.\d+)(?:（([\s\S]*?)）|\(([\s\S]*?)\))?\s*\*\*(.*)$/);
      const noteMatch = !envMatch ? l.match(/^\*\*注记(?:[ ]+(\d+\.\d+))?(?:（([\s\S]*?)）|\(([\s\S]*?)\))?\s*\*\*(.*)$/) : null;

      if (envMatch || noteMatch) {
        const rawKind = envMatch ? envMatch[1] : '注记';
        const num = envMatch ? envMatch[2] : (noteMatch[1] || '');
        const title = (envMatch ? (envMatch[3] || envMatch[4]) : (noteMatch[2] || noteMatch[3])) || '';
        const kindInfo = KIND_MAPPING[rawKind];
        kindCounts[kindInfo.kind] = (kindCounts[kindInfo.kind] || 0) + 1;

        let envId;
        if (num) {
          envId = `${chapterId}-${kindInfo.prefix}-${num}`;
        } else {
          noteOrdinal++;
          envId = `${chapterId}-${kindInfo.prefix}-${noteOrdinal}`;
        }

        const envStartLineNumber = i + 1;
        i++;

        const stmtLines = [l];
        let hasProofOrSol = false;
        let isProof = false;
        let isSolution = false;

        while (i < lines.length) {
          const curLine = lines[i];
          if (curLine.startsWith('## ') || curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
            break;
          }
          if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
            break;
          }
          if (/^\*\*(证明|证明思路|证明思路及依赖说明|证明思路与所依赖的定理|推导|证明范围与思路|证明范围及依赖)/.test(curLine)) {
            hasProofOrSol = true;
            isProof = true;
            break;
          }
          if (/^\*\*解/.test(curLine)) {
            hasProofOrSol = true;
            isSolution = true;
            break;
          }
          stmtLines.push(curLine);
          i++;
        }

        const markdown = stmtLines.join('\n').trim();
        let proofMarkdown = null;
        let solutionMarkdown = null;

        if (hasProofOrSol) {
          const subLines = [];
          if (isProof) {
            while (i < lines.length) {
              const curLine = lines[i];
              if (subLines.length > 0) {
                if (curLine.startsWith('## ') || curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
                  break;
                }
                if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
                  break;
                }
              }
              subLines.push(curLine);
              i++;
              if (/^[□■\u25A0\u25A1]\s*$/.test(curLine.trim())) {
                break;
              }
            }
            proofMarkdown = subLines.join('\n').trim();
          } else if (isSolution) {
            while (i < lines.length) {
              const curLine = lines[i];
              if (subLines.length > 0) {
                if (curLine.startsWith('## ') || curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
                  break;
                }
                if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
                  break;
                }
              }
              subLines.push(curLine);
              i++;
            }
            solutionMarkdown = subLines.join('\n').trim();
          }
        }

        const envObj = {
          id: envId,
          kind: kindInfo.kind,
          number: num,
          title: title.trim(),
          chapterId,
          sectionId: currentSec.id,
          anchor: envId,
          markdown,
          proofMarkdown,
          solutionMarkdown,
          _line: envStartLineNumber
        };

        environments.push(envObj);
        currentSec.environmentIds.push(envId);
        continue;
      }

      if (/^\*\*(证明|证明思路|证明思路及依赖说明|证明思路与所依赖的定理|推导|证明范围与思路|证明范围及依赖)/.test(l)) {
        warnings.push({
          code: 'PROOF_WITHOUT_TARGET',
          file: chRelPath,
          line: i + 1,
          message: `未直接挂载到前置环境的证明/推导块：${l.slice(0, 30)}`,
          chapterId
        });
      }

      i++;
    }

    // Check environment duplicates
    const seenEnvIds = new Set();
    environments.forEach(e => {
      if (seenEnvIds.has(e.id)) {
        errors.push({
          code: 'ENV_NUMBER_DUPLICATE',
          file: chRelPath,
          line: e._line,
          message: `环境 ID 重复：${e.id}`,
          chapterId
        });
      }
      seenEnvIds.add(e.id);
    });

    // Parse display equations
    const equations = [];
    const displayRegex = /\$\$([\s\S]+?)\$\$/g;
    let dispMatch;

    while ((dispMatch = displayRegex.exec(chRaw)) !== null) {
      const tex = dispMatch[1];
      const matchIndex = dispMatch.index;
      const lineNum = chRaw.slice(0, matchIndex).split('\n').length;
      const sec = getSectionForLine(lineNum - 1);
      const secId = sec ? sec.id : null;

      const tagMatch = tex.match(/\\tag\{(\d+\.\d+)\}/) || tex.match(/\\tag\((\d+\.\d+)\)/);
      const tag = tagMatch ? tagMatch[1] : null;
      const eqId = tag ? `${chapterId}-eq-${tag}` : null;
      const cleanTex = tex.replace(/\\tag\{[\s\S]*?\}/g, '').replace(/\\tag\([\s\S]*?\)/g, '').trim();

      equations.push({
        id: eqId,
        tag,
        chapterId,
        sectionId: secId,
        latex: cleanTex,
        display: true,
        _line: lineNum
      });
    }

    // Check equation tags continuity
    const taggedEquations = equations.filter(e => e.tag);
    const seenTags = new Set();
    taggedEquations.forEach((eq, idx) => {
      const expectedTag = `${chNum}.${idx + 1}`;
      if (seenTags.has(eq.tag)) {
        errors.push({
          code: 'EQUATION_TAG_DUPLICATE',
          file: chRelPath,
          line: eq._line,
          message: `公式 tag 重复：${eq.tag}`,
          chapterId
        });
      }
      seenTags.add(eq.tag);
      if (eq.tag !== expectedTag) {
        errors.push({
          code: 'EQUATION_TAG_GAP',
          file: chRelPath,
          line: eq._line,
          message: `公式 tag 不连续：期望 ${expectedTag}，实际为 ${eq.tag}`,
          chapterId
        });
      }
    });

    // Check unclosed dollars
    const dollarsCount = (chRaw.match(/\$\$/g) || []).length;
    if (dollarsCount % 2 !== 0) {
      errors.push({
        code: 'UNCLOSED_MATH',
        file: chRelPath,
        line: 1,
        message: '独立公式 $$ 未闭合',
        chapterId
      });
    }

    // Parse exercises
    const exercises = [];
    if (exercisesMarkdown) {
      const exLines = exercisesMarkdown.split('\n');
      let currentEx = null;
      let expectedExNum = 1;

      for (let el = 0; el < exLines.length; el++) {
        const lineText = exLines[el];
        const m = lineText.match(/^(\d+)\.\s+(.*)$/);
        if (m && Number(m[1]) === expectedExNum) {
          if (currentEx) {
            exercises.push({
              id: `${chapterId}-ex-${currentEx.number}`,
              number: currentEx.number,
              chapterId,
              sectionId: null,
              markdown: currentEx.lines.join('\n').trim(),
              solutionMarkdown: null
            });
          }
          currentEx = {
            number: Number(m[1]),
            lines: [lineText]
          };
          expectedExNum++;
        } else {
          if (currentEx) {
            currentEx.lines.push(lineText);
          }
        }
      }
      if (currentEx) {
        exercises.push({
          id: `${chapterId}-ex-${currentEx.number}`,
          number: currentEx.number,
          chapterId,
          sectionId: null,
          markdown: currentEx.lines.join('\n').trim(),
          solutionMarkdown: null
        });
      }
    }

    exercises.forEach((ex, idx) => {
      if (ex.number !== idx + 1) {
        errors.push({
          code: 'EXERCISE_NUMBER_GAP',
          file: chRelPath,
          line: 1,
          message: `习题题号不连续：期望 ${idx + 1}，实际为 ${ex.number}`,
          chapterId
        });
      }
    });

    // Parse solutions
    const solutionsMap = new Map();
    if (soRaw) {
      const soLines = soRaw.replace(/\r\n/g, '\n').split('\n');
      const solH2s = [];
      soLines.forEach((sl, idx) => {
        const m = sl.match(/^##\s+(\d+)\.\s*$/);
        if (m) {
          solH2s.push({ lineIndex: idx, number: Number(m[1]) });
        }
      });

      for (let sh = 0; sh < solH2s.length; sh++) {
        const curSol = solH2s[sh];
        const nextSolLine = sh + 1 < solH2s.length ? solH2s[sh + 1].lineIndex : soLines.length;
        const solContent = soLines.slice(curSol.lineIndex + 1, nextSolLine).join('\n').trim();
        solutionsMap.set(curSol.number, solContent);
        if (!solContent) {
          warnings.push({
            code: 'EMPTY_SOLUTION',
            file: soRelPath,
            line: curSol.lineIndex + 1,
            message: `解析内容为空：## ${curSol.number}.`,
            chapterId
          });
        }
      }

      exercises.forEach(ex => {
        if (solutionsMap.has(ex.number)) {
          ex.solutionMarkdown = solutionsMap.get(ex.number);
        } else {
          errors.push({
            code: 'EXERCISE_SOLUTION_MISMATCH',
            file: soRelPath || chRelPath,
            line: 1,
            message: `习题 ${ex.number} 缺失对应解析`,
            chapterId
          });
        }
      });

      const exNumSet = new Set(exercises.map(e => e.number));
      for (const [solNum, _] of solutionsMap.entries()) {
        if (!exNumSet.has(solNum)) {
          errors.push({
            code: 'EXERCISE_SOLUTION_MISMATCH',
            file: soRelPath,
            line: 1,
            message: `解析文件含多余题号：${solNum}`,
            chapterId
          });
        }
      }
    }

    // Inline math count
    const noDisplayChRaw = chRaw.replace(/\$\$[\s\S]*?\$\$/g, '');
    const inlineMathMatches = [...noDisplayChRaw.matchAll(/(?<!\$)\$(?!\$)([^\n]+?)(?<!\$)\$(?!\$)/g)];

    // Cleanup internal keys
    sections.forEach(s => {
      delete s._startIndex;
      delete s._endIndex;
    });
    environments.forEach(e => {
      delete e._line;
    });
    equations.forEach(eq => {
      delete eq._line;
    });

    const chapterData = {
      schemaVersion: 1,
      id: chapterId,
      number: chNum,
      title: chTitle,
      cleanTitle,
      slug,
      partId,
      introMarkdown,
      sourcePath: chRelPath,
      solutionPath: soRelPath,
      sections,
      summaryMarkdown,
      exercisesMarkdown,
      environments,
      equations,
      exercises,
      stats: {
        chars: [...chRaw].length,
        sections: sections.length,
        subsections: sections.reduce((acc, s) => acc + s.subsections.length, 0),
        environments: environments.length,
        equations: equations.length,
        taggedEquations: taggedEquations.length,
        inlineEquations: inlineMathMatches.length,
        exercises: exercises.length
      }
    };

    chapters.push(chapterData);
  }

  // Build book.json
  const book = {
    schemaVersion: 1,
    title: '量化数学进阶教材',
    subtitle: 'Quant Math Academy',
    parts: PARTS_METADATA.map(p => ({
      id: p.id,
      order: p.order,
      title: p.title,
      chapterIds: p.chapterIds
    })),
    chapters: chapters.map(c => ({
      id: c.id,
      order: c.number,
      number: c.number,
      partId: c.partId,
      title: c.cleanTitle,
      slug: c.slug,
      sourcePath: c.sourcePath,
      solutionPath: c.solutionPath,
      stats: {
        chars: c.stats.chars,
        sections: c.stats.sections,
        subsections: c.stats.subsections,
        environments: c.stats.environments,
        equations: c.stats.equations,
        exercises: c.stats.exercises
      },
      sections: c.sections.map(s => ({
        id: s.id,
        number: s.number,
        title: s.title,
        anchor: s.anchor,
        subsections: s.subsections.map(sub => ({
          id: sub.id,
          number: sub.number,
          title: sub.title,
          anchor: sub.anchor
        }))
      }))
    }))
  };

  // Build inventory.json
  const totalChars = chapters.reduce((a, c) => a + c.stats.chars, 0);
  const totalSections = chapters.reduce((a, c) => a + c.stats.sections, 0);
  const totalSubsections = chapters.reduce((a, c) => a + c.stats.subsections, 0);
  const totalEnvironments = chapters.reduce((a, c) => a + c.stats.environments, 0);
  const totalEquations = chapters.reduce((a, c) => a + c.stats.equations, 0);
  const totalTaggedEquations = chapters.reduce((a, c) => a + c.stats.taggedEquations, 0);
  const totalInlineEquations = chapters.reduce((a, c) => a + c.stats.inlineEquations, 0);
  const totalExercises = chapters.reduce((a, c) => a + c.stats.exercises, 0);
  const totalBytes = fileManifest.reduce((a, f) => a + f.sizeBytes, 0);

  let totalSolutionsMatched = 0;
  chapters.forEach(c => {
    c.exercises.forEach(ex => {
      if (ex.solutionMarkdown && ex.solutionMarkdown.trim().length > 0) {
        totalSolutionsMatched++;
      }
    });
  });
  const totalMismatches = errors.filter(e => e.code === 'EXERCISE_SOLUTION_MISMATCH').length;

  const inventory = {
    schemaVersion: 1,
    totals: {
      chapters: chapters.length,
      solutions: fileManifest.filter(f => f.type === 'solution').length,
      files: fileManifest.length,
      bytes: totalBytes,
      characters: totalChars,
      sections: totalSections,
      subsections: totalSubsections,
      environments: totalEnvironments,
      displayEquations: totalEquations,
      taggedEquations: totalTaggedEquations,
      inlineEquations: totalInlineEquations,
      exercises: totalExercises,
      solutionsCount: totalSolutionsMatched
    },
    environmentsByKind: kindCounts,
    chapterStats: chapters.map(c => ({
      id: c.id,
      number: c.number,
      title: c.cleanTitle,
      stats: c.stats
    })),
    files: fileManifest,
    validationSummary: {
      errors: errors.length,
      warnings: warnings.length,
      mismatches: totalMismatches,
      solutionsMatched: totalSolutionsMatched
    }
  };

  // Build validation.json
  const validation = {
    errors,
    warnings,
    summary: {
      errors: errors.length,
      warnings: warnings.length,
      chapters: chapters.length,
      sections: totalSections,
      subsections: totalSubsections,
      environments: totalEnvironments,
      displayEquations: totalEquations,
      taggedEquations: totalTaggedEquations,
      exercises: totalExercises,
      solutionsMatched: totalSolutionsMatched,
      mismatches: totalMismatches
    }
  };

  return {
    book,
    inventory,
    validation,
    chapters,
    errors,
    warnings
  };
}

/**
 * Write generated content files to disk deterministically.
 */
export function writeGeneratedFiles(parsed, outDir = OUT_DIR) {
  const chDir = path.join(outDir, 'chapters');
  fs.mkdirSync(chDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'book.json'), JSON.stringify(parsed.book, null, 2) + '\n');
  fs.writeFileSync(path.join(outDir, 'inventory.json'), JSON.stringify(parsed.inventory, null, 2) + '\n');
  fs.writeFileSync(path.join(outDir, 'validation.json'), JSON.stringify(parsed.validation, null, 2) + '\n');

  for (const ch of parsed.chapters) {
    const singleCh = {
      schemaVersion: ch.schemaVersion,
      id: ch.id,
      number: ch.number,
      title: ch.title,
      introMarkdown: ch.introMarkdown,
      sourcePath: ch.sourcePath,
      solutionPath: ch.solutionPath,
      sections: ch.sections,
      summaryMarkdown: ch.summaryMarkdown,
      exercisesMarkdown: ch.exercisesMarkdown,
      environments: ch.environments,
      equations: ch.equations,
      exercises: ch.exercises
    };
    fs.writeFileSync(path.join(chDir, `${ch.id}.json`), JSON.stringify(singleCh, null, 2) + '\n');
  }
}

// CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const startTime = Date.now();
  console.log('[parse-book] 开始解析教材资产...');
  const result = parseBook();

  writeGeneratedFiles(result, OUT_DIR);
  const elapsed = Date.now() - startTime;

  console.log(`[parse-book] 解析完成，耗时 ${elapsed}ms`);
  console.log(`[parse-book] 产出：`);
  console.log(`  - content/generated/book.json`);
  console.log(`  - content/generated/inventory.json`);
  console.log(`  - content/generated/validation.json`);
  console.log(`  - content/generated/chapters/c01.json ... c34.json (共 34 章)`);
  console.log(`[parse-book] 全书统计：`);
  console.log(`  - 字符数：${result.inventory.totals.characters}`);
  console.log(`  - 篇/章/节/二级节：8 篇 / ${result.inventory.totals.chapters} 章 / ${result.inventory.totals.sections} 节 / ${result.inventory.totals.subsections} 子节`);
  console.log(`  - 环境总数：${result.inventory.totals.environments}`);
  console.log(`  - 公式总数：独立公式 ${result.inventory.totals.displayEquations}（含 tag ${result.inventory.totals.taggedEquations}），行内公式 ${result.inventory.totals.inlineEquations}`);
  console.log(`  - 习题/解析：${result.inventory.totals.exercises} 题 / ${result.inventory.totals.solutionsCount} 解析全部一一对应`);
  console.log(`[parse-book] 校验结果：${result.errors.length} 错误，${result.warnings.length} 警告`);

  if (result.errors.length > 0) {
    console.error(`[parse-book] 校验发现硬错误（按规范以非零码退出）：`);
    result.errors.forEach(e => {
      console.error(`  - [${e.code}] ${e.file}:${e.line} ${e.message}`);
    });
    process.exit(1);
  } else {
    process.exit(0);
  }
}
