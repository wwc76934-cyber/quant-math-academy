/**
 * Quant Math Academy - Content HTML Rendering Pipeline (T03)
 * Implements Markdown -> HTML with KaTeX pre-rendering and structural indexing.
 */
import katex from 'katex';
import { marked } from 'marked';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false
});

export const PILOT_CHAPTER_IDS = ['c01', 'c08', 'c11', 'c33'];

export const KIND_CLASS_MAP = {
  definition: 'definition',
  theorem: 'theorem',
  lemma: 'theorem',
  proposition: 'theorem',
  corollary: 'theorem',
  axiom: 'theorem',
  example: 'example',
  note: 'note'
};

export const KIND_CHINESE_MAP = {
  definition: '定义',
  theorem: '定理',
  lemma: '引理',
  proposition: '命题',
  corollary: '推论',
  axiom: '公理',
  example: '例',
  note: '注记'
};

const KATEX_OPTIONS_INLINE = {
  displayMode: false,
  throwOnError: true,
  strict: 'warn',
  trust: false,
  output: 'htmlAndMathml'
};

const KATEX_OPTIONS_DISPLAY = {
  displayMode: true,
  throwOnError: true,
  strict: 'warn',
  trust: false,
  output: 'htmlAndMathml'
};

export function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function escapeHtmlAttr(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Defend against raw HTML injection: escape `<` and `>` in text outside math formulas.
 */
export function sanitizeRawHtml(text, warnings = [], fileContext = '') {
  // If text contains HTML tags like <script> or <iframe, escape and warn
  if (/<(script|iframe|style|object|embed)[\s>]/i.test(text) || /<[a-z][\s\S]*>/i.test(text)) {
    warnings.push({
      code: 'RAW_HTML_DETECTED',
      message: `检测到原始 HTML 标签并已转义防护：${text.slice(0, 50)}...`,
      fileContext
    });
    return text.replace(/<(\/?[a-zA-Z][^>]*)>/g, '&lt;$1&gt;');
  }
  return text;
}

/**
 * Scan text to protect inline math `$...$` without breaking on `\$`.
 */
export function protectInlineMath(text) {
  const mathList = [];
  let result = '';
  let i = 0;
  const len = text.length;

  while (i < len) {
    if (text[i] === '\\' && text[i + 1] === '$') {
      result += '\\$';
      i += 2;
      continue;
    }
    if (text[i] === '$') {
      let j = i + 1;
      let closed = false;
      while (j < len) {
        if (text[j] === '\\' && text[j + 1] === '$') {
          j += 2;
          continue;
        }
        if (text[j] === '\n' && text[j - 1] === '\n') {
          // Inline math cannot cross empty lines
          break;
        }
        if (text[j] === '$') {
          closed = true;
          break;
        }
        j++;
      }
      if (closed && j > i + 1) {
        const latex = text.slice(i + 1, j);
        const token = `QMA_INLINE_MATH_${mathList.length}_TOKEN`;
        mathList.push(latex);
        result += token;
        i = j + 1;
        continue;
      }
    }
    result += text[i];
    i++;
  }

  return { text: result, mathList };
}

/**
 * Restore inline math tokens with pre-rendered KaTeX HTML.
 */
export function restoreInlineMath(html, mathList, chapterId, context = '') {
  for (let idx = 0; idx < mathList.length; idx++) {
    const latex = mathList[idx];
    let katexHtml = '';
    try {
      katexHtml = katex.renderToString(latex, KATEX_OPTIONS_INLINE);
    } catch (err) {
      throw new Error(`[KaTeX Inline Error] in chapter ${chapterId} (${context}): "${latex}" - ${err.message}`);
    }
    const escapedLatex = escapeHtmlAttr(latex);
    const wrapped = `<span class="math math-inline" data-latex="${escapedLatex}"><!--QMA_MATH_START-->${katexHtml}<!--QMA_MATH_END--></span>`;
    const token = `QMA_INLINE_MATH_${idx}_TOKEN`;
    html = html.split(token).join(wrapped);
  }
  return html;
}

/**
 * Wrap tables in `<div class="table-wrap">`.
 */
export function wrapTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, '<div class="table-wrap"><table>$1</table></div>');
}

/**
 * Render a chunk of Markdown that may contain inline math, display equations, tables, lists.
 */
export function renderMarkdownChunk(markdown, options = {}) {
  const { chapterId = '', sectionId = null, equationCollector = null, warnings = [] } = options;
  if (!markdown || !markdown.trim()) {
    return '';
  }

  let text = markdown;

  // 1. Extract display equations `$$ ... $$` FIRST (preserving line indent for nested lists)
  const displayEquations = [];
  text = text.replace(/([ \t]*)\$\$([\s\S]+?)\$\$/g, (match, indent, rawTex) => {
    const tagMatch = rawTex.match(/\\tag\{(\d+\.\d+)\}/) || rawTex.match(/\\tag\((\d+\.\d+)\)/);
    const tag = tagMatch ? tagMatch[1] : null;
    const eqId = tag ? `${chapterId}-eq-${tag}` : null;
    const cleanTex = rawTex.replace(/\\tag\{[\s\S]*?\}/g, '').replace(/\\tag\([\s\S]*?\)/g, '').trim();

    let katexHtml = '';
    try {
      katexHtml = katex.renderToString(cleanTex, KATEX_OPTIONS_DISPLAY);
    } catch (err) {
      throw new Error(`[KaTeX Display Error] in chapter ${chapterId} eq ${eqId || 'notag'}: "${cleanTex}" - ${err.message}`);
    }

    if (tag && equationCollector) {
      equationCollector.push({
        id: eqId,
        tag,
        sectionId,
        latex: cleanTex
      });
    }

    const idAttr = eqId ? ` id="${eqId}"` : '';
    const numSpan = tag ? `<span class="equation__number">(${tag})</span>` : '';
    const escapedLatex = escapeHtmlAttr(cleanTex);
    const renderedHtml = `<div class="equation"${idAttr} data-latex="${escapedLatex}"><div class="equation__body"><!--QMA_MATH_START-->${katexHtml}<!--QMA_MATH_END--></div>${numSpan}</div>`;

    const tokenName = `QMA_DISPLAY_MATH_${displayEquations.length}_TOKEN`;
    displayEquations.push({ html: renderedHtml, token: tokenName });
    return `${indent}${tokenName}`;
  });

  // 2. Protect inline math `$...$` SECOND (before any marked or HTML sanitization)
  const { text: protectedText, mathList } = protectInlineMath(text);

  // 3. Sanitize raw HTML tags outside math (anti-injection)
  const sanitizedText = sanitizeRawHtml(protectedText, warnings, `${chapterId}/${sectionId}`);

  // 4. Render through marked
  let html = marked.parse(sanitizedText);

  // 5. Wrap tables
  html = wrapTables(html);

  // 6. Restore inline math
  html = restoreInlineMath(html, mathList, chapterId, sectionId);

  // 7. Restore display equations
  for (let d = 0; d < displayEquations.length; d++) {
    const item = displayEquations[d];
    const token = item.token;
    // If marked wrapped the token in <p>...</p>, unwrap it
    const pTokenRegex = new RegExp(`<p>\\s*${token}\\s*<\\/p>`, 'g');
    if (pTokenRegex.test(html)) {
      html = html.replace(pTokenRegex, item.html);
    } else {
      html = html.split(token).join(item.html);
    }
  }

  return html.trim();
}

/**
 * Render section markdown into section html, identifying environments, proofs, solutions, and notes.
 */
export function renderSection(section, chapter, options = {}) {
  const { chapterId = chapter.id, equationCollector = [], warnings = [] } = options;
  const lines = section.markdown.replace(/\r\n/g, '\n').split('\n');

  // Subsection lookup
  const subLookup = new Map();
  (section.subsections || []).forEach(sub => {
    subLookup.set(sub.title, sub);
    if (sub.number) {
      subLookup.set(sub.number, sub);
    }
  });
  let subOrder = 0;

  // Environment lookup by section & line order
  const secEnvironments = (chapter.environments || []).filter(e => e.sectionId === section.id);
  let envCursor = 0;

  const outputParts = [];
  let i = 0;
  let lastEnvId = null;

  while (i < lines.length) {
    const l = lines[i];

    // Check 1: Subsection heading ###
    if (l.startsWith('### ')) {
      const subRaw = l.slice(4).trim();
      subOrder++;
      const subObj = section.subsections && section.subsections[subOrder - 1];
      const subId = subObj ? subObj.id : `${section.id}-${subOrder}`;

      // Render subsection title (may contain inline math)
      const renderedTitle = renderInlineOnly(subRaw, chapterId);
      outputParts.push(`<h3 id="${subId}">${renderedTitle}</h3>`);
      lastEnvId = null;
      i++;
      continue;
    }

    // Check 2: Horizontal rule ---
    if (/^\s*---+\s*$/.test(l)) {
      outputParts.push('<hr class="section-rule">');
      lastEnvId = null;
      i++;
      continue;
    }

    // Check 3: Formal environment header
    const envMatch = l.match(/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+(\d+\.\d+)(?:（([\s\S]*?)）|\(([\s\S]*?)\))?\s*\*\*(.*)$/);
    const noteMatch = !envMatch ? l.match(/^\*\*注记(?:[ ]+(\d+\.\d+))?(?:（([\s\S]*?)）|\(([\s\S]*?)\))?\s*\*\*(.*)$/) : null;

    if (envMatch || noteMatch) {
      const rawKind = envMatch ? envMatch[1] : '注记';
      const num = envMatch ? envMatch[2] : (noteMatch[1] || null);
      const title = (envMatch ? (envMatch[3] || envMatch[4]) : (noteMatch[2] || noteMatch[3])) || '';
      const restOfLine = (envMatch ? envMatch[5] : noteMatch[4]) || '';

      // Match T01 environment ID
      let matchedEnv = null;
      if (envCursor < secEnvironments.length) {
        matchedEnv = secEnvironments[envCursor];
        envCursor++;
      } else {
        warnings.push({
          code: 'EXTRA_ENVIRONMENT_FOUND',
          message: `未在 T01 索引中找到对应环境：${rawKind} ${num || ''} (${title})`,
          chapterId,
          sectionId: section.id
        });
      }

      const envId = matchedEnv ? matchedEnv.id : `${chapterId}-${rawKind}-${num || envCursor}`;
      const kind = matchedEnv ? matchedEnv.kind : (rawKind === '注记' ? 'note' : 'theorem');
      const kindClass = KIND_CLASS_MAP[kind] || 'theorem';
      const chineseKind = KIND_CHINESE_MAP[kind] || rawKind;

      lastEnvId = envId;

      // Collect body lines
      const bodyLines = [];
      const inlineBody = restOfLine.replace(/^[\s\u3000]/, '');
      if (inlineBody) {
        bodyLines.push(inlineBody);
      }

      i++;
      while (i < lines.length) {
        const curLine = lines[i];
        if (curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
          break;
        }
        if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
          break;
        }
        if (/^\*\*(证明|推导|证明思路|证明范围)/.test(curLine)) {
          break;
        }
        if (/^\*\*解/.test(curLine)) {
          break;
        }
        bodyLines.push(curLine);
        i++;
      }

      const bodyMd = bodyLines.join('\n').trim();
      const bodyHtml = renderMarkdownChunk(bodyMd, {
        chapterId,
        sectionId: section.id,
        equationCollector,
        warnings
      });

      // Construct env label
      const numSpan = num ? `<b class="env__number">${num}</b>` : '';
      const renderedTitle = title ? renderInlineOnly(title, chapterId) : '';
      const titleSpan = title ? `<span class="env__title">（${renderedTitle}）</span>` : '';
      const numberAttr = num ? ` data-env-number="${num}"` : '';

      const envHtml = `<section class="env env--${kindClass}" id="${envId}" data-env-kind="${kind}"${numberAttr}>
  <div class="env__label">
    <span class="env__kind">${chineseKind}</span>
    ${numSpan}
    ${titleSpan}
    <a class="env__anchor" href="#${envId}" aria-label="复制本节链接">#</a>
  </div>
  <div class="env__body">
    ${bodyHtml}
  </div>
</section>`;

      outputParts.push(envHtml);
      continue;
    }

    // Check 4: Formal Proof header: **证明** or **证明**（...） or **证明（...）**
    // Exclude informal notes like **证明思路**, **证明范围**
    const isInformalProof = /^\*\*(证明思路|证明范围|证明层级|证明要点|推导)/.test(l);
    const proofMatch = !isInformalProof ? l.match(/^\*\*证明(?:（([\s\S]*?)）|\(([\s\S]*?)\))?\*\*(?:（([\s\S]*?)）|\(([\s\S]*?)\))?(.*)$/) : null;

    if (proofMatch) {
      const note = proofMatch[1] || proofMatch[2] || proofMatch[3] || proofMatch[4] || '';
      const restOfLine = proofMatch[5] || '';
      const proofOf = lastEnvId;

      if (!proofOf) {
        warnings.push({
          code: 'PROOF_WITHOUT_TARGET',
          message: `证明块未挂载到前置环境：${l.slice(0, 40)}`,
          chapterId,
          sectionId: section.id
        });
      }
      lastEnvId = null; // proof consumed the target

      const bodyLines = [];
      const inlineBody = restOfLine.replace(/^[\s\u3000]/, '');
      if (inlineBody) {
        bodyLines.push(inlineBody);
      }

      i++;
      while (i < lines.length) {
        const curLine = lines[i];
        if (curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
          break;
        }
        if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
          break;
        }
        if (/^\*\*(证明|推导|证明思路|证明范围)/.test(curLine) || /^\*\*解/.test(curLine)) {
          break;
        }
        if (/^[□■\u25A0\u25A1]\s*$/.test(curLine.trim())) {
          i++; // skip QED marker line
          break;
        }
        bodyLines.push(curLine);
        i++;
      }

      const bodyMd = bodyLines.join('\n').trim();
      const bodyHtml = renderMarkdownChunk(bodyMd, {
        chapterId,
        sectionId: section.id,
        equationCollector,
        warnings
      });

      const proofOfAttr = proofOf ? ` data-proof-of="${proofOf}"` : '';
      const renderedNote = note ? renderInlineOnly(note, chapterId) : '';
      const noteSpan = note ? `<span class="proof__note">（${renderedNote}）</span>` : '';

      const proofHtml = `<details class="proof"${proofOfAttr} open>
  <summary class="proof__label">证明${noteSpan}</summary>
  <div class="proof__body">${bodyHtml}</div>
  <p class="proof__qed">□</p>
</details>`;

      outputParts.push(proofHtml);
      continue;
    }

    // Check 5: Solution header: **解**
    const solMatch = l.match(/^\*\*解\*\*(.*)$/);
    if (solMatch) {
      const restOfLine = solMatch[1] || '';
      lastEnvId = null;

      const bodyLines = [];
      const inlineBody = restOfLine.replace(/^[\s\u3000]/, '');
      if (inlineBody) {
        bodyLines.push(inlineBody);
      }

      i++;
      while (i < lines.length) {
        const curLine = lines[i];
        if (curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
          break;
        }
        if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
          break;
        }
        if (/^\*\*(证明|推导|证明思路|证明范围)/.test(curLine) || /^\*\*解/.test(curLine)) {
          break;
        }
        bodyLines.push(curLine);
        i++;
      }

      const bodyMd = bodyLines.join('\n').trim();
      const bodyHtml = renderMarkdownChunk(bodyMd, {
        chapterId,
        sectionId: section.id,
        equationCollector,
        warnings
      });

      const solHtml = `<div class="solution">
  <div class="solution__label">解</div>
  <div class="solution__body">${bodyHtml}</div>
</div>`;

      outputParts.push(solHtml);
      continue;
    }

    // Check 6: Informal Proof Note: **证明思路**, **推导**, **证明范围与思路**
    const noteProofMatch = l.match(/^\*\*(证明思路[^*]*|证明范围[^*]*|推导[^*]*|证明层级[^*]*|证明要点[^*]*)\*\*(.*)$/);
    if (noteProofMatch) {
      const label = noteProofMatch[1].trim();
      const restOfLine = noteProofMatch[2] || '';
      lastEnvId = null;

      const bodyLines = [];
      const inlineBody = restOfLine.replace(/^[\s\u3000]/, '');
      if (inlineBody) {
        bodyLines.push(inlineBody);
      }

      i++;
      while (i < lines.length) {
        const curLine = lines[i];
        if (curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
          break;
        }
        if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
          break;
        }
        if (/^\*\*(证明|推导|证明思路|证明范围)/.test(curLine) || /^\*\*解/.test(curLine)) {
          break;
        }
        bodyLines.push(curLine);
        i++;
      }

      const bodyMd = bodyLines.join('\n').trim();
      const bodyHtml = renderMarkdownChunk(bodyMd, {
        chapterId,
        sectionId: section.id,
        equationCollector,
        warnings
      });

      const noteHtml = `<div class="proof-note">
  <div class="proof-note__label">${label}</div>
  <div class="proof-note__body">${bodyHtml}</div>
</div>`;

      outputParts.push(noteHtml);
      continue;
    }

    // Check 7: Regular Markdown lines (paragraphs, equations, tables, lists)
    const regularLines = [];
    while (i < lines.length) {
      const curLine = lines[i];
      if (curLine.startsWith('### ') || /^\s*---+\s*$/.test(curLine)) {
        break;
      }
      if (/^\*\*(定义|定理|引理|命题|推论|例|公理)\s+\d+\.\d+/.test(curLine) || /^\*\*注记/.test(curLine)) {
        break;
      }
      if (/^\*\*(证明|推导|证明思路|证明范围)/.test(curLine) || /^\*\*解/.test(curLine)) {
        break;
      }
      regularLines.push(curLine);
      i++;
    }

    const regMd = regularLines.join('\n').trim();
    if (regMd) {
      const regHtml = renderMarkdownChunk(regMd, {
        chapterId,
        sectionId: section.id,
        equationCollector,
        warnings
      });
      if (regHtml) {
        outputParts.push(regHtml);
      }
    }
  }

  return outputParts.join('\n\n');
}

/**
 * Render inline string only (for subsection titles).
 */
export function renderInlineOnly(text, chapterId) {
  const { text: protectedText, mathList } = protectInlineMath(text);
  let html = escapeHtml(protectedText);
  html = restoreInlineMath(html, mathList, chapterId, 'heading');
  return html;
}

/**
 * Strip exercise number prefix like `1. ` or `12. `.
 */
export function stripExerciseNumberPrefix(markdown, expectedNumber) {
  if (!markdown) return '';
  const regex = new RegExp(`^\\s*${expectedNumber}\\.\\s*`);
  return markdown.replace(regex, '').trim();
}

/**
 * Render an entire chapter into the site representation.
 */
export function renderChapter(chapter, metadata = null, options = {}) {
  const chapterId = chapter.id;
  const isPilot = PILOT_CHAPTER_IDS.includes(chapterId);
  const warnings = [];
  const errors = [];

  const equationIndex = [];
  const environmentIndex = [];

  const number = chapter.number;
  const rawTitle = chapter.title || '';
  const titleMatch = rawTitle.match(/^第\d+章[\s\u3000]+(.*)$/);
  const cleanTitle = chapter.cleanTitle || (titleMatch ? titleMatch[1].trim() : rawTitle.replace(/^#\s+/, '').trim());
  const label = `第${number}章`;
  const displayTitle = `${label}　${cleanTitle}`;

  // 1. Intro HTML
  let introHtml = '';
  if (chapter.introMarkdown && chapter.introMarkdown.trim()) {
    introHtml = renderMarkdownChunk(chapter.introMarkdown, {
      chapterId,
      sectionId: null,
      equationCollector: equationIndex,
      warnings
    });
  }

  // 2. Summary HTML
  let summaryHtml = '';
  if (chapter.summaryMarkdown && chapter.summaryMarkdown.trim()) {
    const renderedSummary = renderMarkdownChunk(chapter.summaryMarkdown, {
      chapterId,
      sectionId: null,
      equationCollector: equationIndex,
      warnings
    });
    summaryHtml = `<h2 id="${chapterId}-summary">本章小结</h2>\n${renderedSummary}`;
  }

  // 3. Exercises (sectionId remains null from T01 as per spec, chapter-end exercises)
  const exercises = [];
  for (const ex of chapter.exercises || []) {
    const cleanQuestionMd = stripExerciseNumberPrefix(ex.markdown, ex.number);
    const questionHtml = renderMarkdownChunk(cleanQuestionMd, {
      chapterId,
      sectionId: ex.sectionId || null,
      equationCollector: equationIndex,
      warnings
    });

    let solutionHtml = '';
    if (ex.solutionMarkdown && ex.solutionMarkdown.trim()) {
      solutionHtml = renderMarkdownChunk(ex.solutionMarkdown, {
        chapterId,
        sectionId: ex.sectionId || null,
        equationCollector: equationIndex,
        warnings
      });
    } else {
      errors.push({
        code: 'MISSING_EXERCISE_SOLUTION',
        chapterId,
        message: `习题 ${ex.id} 缺失解析`
      });
    }

    exercises.push({
      id: ex.id,
      number: ex.number,
      sectionId: ex.sectionId || null,
      questionHtml,
      solutionHtml
    });
  }

  // 4. Sections
  const sections = [];
  for (const s of chapter.sections) {
    const secHtml = renderSection(s, chapter, {
      chapterId,
      equationCollector: equationIndex,
      warnings
    });

    const rawMetaSections = metadata && metadata.sections ? metadata.sections : null;
    const metaSec = rawMetaSections
      ? Array.isArray(rawMetaSections)
        ? rawMetaSections.find(ms => ms.id === s.id)
        : rawMetaSections[s.id]
      : null;
    const meta = metaSec || null;
    const exerciseIds = s.exerciseIds || [];

    sections.push({
      id: s.id,
      number: s.number,
      title: s.title,
      anchor: s.anchor,
      html: secHtml,
      htmlBytes: Buffer.byteLength(secHtml, 'utf8'),
      subsections: s.subsections.map(sub => ({
        id: sub.id,
        number: sub.number,
        title: sub.title,
        anchor: sub.anchor
      })),
      meta,
      exerciseIds
    });
  }

  // 5. Environment Index
  for (const env of chapter.environments) {
    environmentIndex.push({
      id: env.id,
      kind: env.kind,
      number: env.number || null,
      title: env.title || '',
      sectionId: env.sectionId,
      anchor: env.anchor
    });
  }

  // Calculate total HTML bytes
  let totalHtmlBytes = Buffer.byteLength(introHtml, 'utf8') + Buffer.byteLength(summaryHtml, 'utf8');
  for (const sec of sections) {
    totalHtmlBytes += sec.htmlBytes;
  }
  for (const ex of exercises) {
    totalHtmlBytes += Buffer.byteLength(ex.questionHtml, 'utf8') + Buffer.byteLength(ex.solutionHtml, 'utf8');
  }

  const metaStatus = metadata ? (metadata.metadataStatus || 'draft') : 'pending';

  const siteChapter = {
    schemaVersion: 1,
    chapterId,
    number,
    label,
    title: cleanTitle,
    displayTitle,
    partId: chapter.partId,
    pilot: isPilot,
    metaStatus,
    introHtml,
    summaryHtml,
    sections,
    exercises,
    exerciseCount: exercises.length,
    environmentIndex,
    equationIndex,
    stats: {
      sections: sections.length,
      environments: environmentIndex.length,
      displayEquations: (chapter.equations || []).length,
      taggedEquations: equationIndex.length,
      equations: equationIndex.length, // backward-compat alias for taggedEquations
      exercises: exercises.length,
      htmlBytes: totalHtmlBytes
    }
  };

  return {
    siteChapter,
    warnings,
    errors
  };
}

function extractTokensText(tokens) {
  let text = '';
  for (const token of tokens) {
    if (token.type === 'list') {
      for (const item of token.items) {
        if (item.tokens) {
          text += extractTokensText(item.tokens) + ' ';
        } else {
          text += (item.text || '') + ' ';
        }
      }
    } else if (token.type === 'table') {
      // Table headers and rows
      if (token.header) {
        for (const cell of token.header) {
          text += (cell.text || '') + ' ';
        }
      }
      if (token.rows) {
        for (const row of token.rows) {
          for (const cell of row) {
            text += (cell.text || '') + ' ';
          }
        }
      }
    } else if (token.tokens) {
      text += extractTokensText(token.tokens) + ' ';
    } else if (token.text) {
      text += token.text + ' ';
    }
  }
  return text;
}

/**
 * Text coverage normalization for verification.
 * Strips markup, tags, math, punctuation, whitespace, retaining ONLY CJK + letters + numbers.
 */
export function cleanTextForCoverage(text, isHtml = false, isExerciseQuestion = false, expectedNumber = 0) {
  if (!text) return '';
  let str = text;

  if (isHtml) {
    // 1. Strip QMA_MATH comments
    str = str.replace(/<!--QMA_MATH_START-->[\s\S]*?<!--QMA_MATH_END-->/g, '');
    // 2. Strip equation numbers like `(11.11)`
    str = str.replace(/<span class="equation__number">[\s\S]*?<\/span>/g, '');
    // 3. Strip HTML tags
    str = str.replace(/<[^>]+>/g, '');
    // 4. Decode common HTML entities
    str = str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  } else {
    // Markdown source
    if (isExerciseQuestion && expectedNumber) {
      str = stripExerciseNumberPrefix(str, expectedNumber);
    }
    // 1. Strip display equations while preserving list item / line structure
    str = str.replace(/([ \t]*)\$\$[\s\S]*?\$\$/g, '$1QMA_MATH_TOKEN');
    // 2. Strip inline math
    str = str.replace(/(?<!\\)\$((?:\\\$|[^$])+?)(?<!\\)\$/g, '');
    // 3. Strip QED markers
    str = str.replace(/^[□■\u25A0\u25A1]\s*$/gm, '');

    // 4. Use marked lexer to accurately extract text without list item ordinals
    try {
      const tokens = marked.lexer(str);
      str = extractTokensText(tokens);
    } catch {
      // Fallback
    }
    // Remove math placeholder token
    str = str.replace(/QMA_MATH_TOKEN/g, '');
  }

  // Retain ONLY CJK characters, Latin letters, and digits
  const cleaned = str.replace(/[^\p{Script=Han}a-zA-Z0-9]/gu, '');
  return cleaned;
}

/**
 * Compare source text and rendered text coverage.
 */
export function diffCoverage(sourceMd, renderedHtml, contextInfo = {}, isExerciseQuestion = false, expectedNumber = 0) {
  const sourceClean = cleanTextForCoverage(sourceMd, false, isExerciseQuestion, expectedNumber);
  const renderClean = cleanTextForCoverage(renderedHtml, true, isExerciseQuestion, expectedNumber);

  if (sourceClean === renderClean) {
    return null;
  }

  // Find first mismatch index
  let mismatchIdx = 0;
  const minLen = Math.min(sourceClean.length, renderClean.length);
  while (mismatchIdx < minLen && sourceClean[mismatchIdx] === renderClean[mismatchIdx]) {
    mismatchIdx++;
  }

  const startIdx = Math.max(0, mismatchIdx - 20);
  const sourceSample = sourceClean.slice(startIdx, mismatchIdx + 20);
  const renderSample = renderClean.slice(startIdx, mismatchIdx + 20);

  return {
    code: 'TEXT_COVERAGE_MISMATCH',
    chapterId: contextInfo.chapterId || '',
    sectionId: contextInfo.sectionId || '',
    type: contextInfo.type || 'section',
    message: `文本覆盖率不一致（首个差异字符位置 ${mismatchIdx}）：期望 '${sourceClean[mismatchIdx] || 'EOF'}'，实际 '${renderClean[mismatchIdx] || 'EOF'}'`,
    sourceLen: sourceClean.length,
    renderLen: renderClean.length,
    sample: `源文本片段: ...${sourceSample}... | 渲染文本片段: ...${renderSample}...`
  };
}
