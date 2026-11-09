/**
 * Quant Math Academy - Full Text Search Index Builder (T08)
 * Builds static search index and manifest from generated site content.
 * Covers 219 sections + 889 environments + 698 exercises + 698 solutions (~2,504 docs).
 */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, 'content', 'generated', 'site');
const META_DIR = path.join(ROOT, 'content', 'metadata', 'chapters');
const ALIASES_SRC = path.join(ROOT, 'content', 'search', 'aliases.json');
const SEARCH_DIR = path.join(SITE_DIR, 'search');
const WEB_TARGET_DIR = path.join(ROOT, 'web', 'public', 'content', 'search');

export const ENV_KIND_LABELS = {
  definition: '定义',
  theorem: '定理',
  lemma: '引理',
  proposition: '命题',
  corollary: '推论',
  axiom: '公理',
  example: '例题',
  note: '注记'
};

const LATEX_REPLACEMENTS = [
  [/\\operatorname\{([a-zA-Z]+)\}/g, '$1'],
  [/\\mathbb\{([A-Z])\}/g, '$1'],
  [/\\mathbb\s+([A-Z])/g, '$1'],
  [/\\mathrm\{([^}]+)\}/g, '$1'],
  [/\\mathrm(?![A-Za-z])/g, ' '],
  [/\\mathbf\{([^}]+)\}/g, '$1'],
  [/\\mathbf(?![A-Za-z])/g, ' '],
  [/\\mathcal\{([^}]+)\}/g, '$1'],
  [/\\text\{([^}]+)\}/g, '$1 '],
  [/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2) '],
  [/\\sqrt\{([^}]+)\}/g, 'sqrt($1) '],
  [/\\left/g, ' '],
  [/\\right/g, ' '],
  [/\\leq?/g, '<= '],
  [/\\geq?/g, '>= '],
  [/\\neq?/g, '!= '],
  [/\\approx/g, '≈ '],
  [/\\sim/g, '~ '],
  [/\\times/g, '* '],
  [/\\cdot/g, '* '],
  [/\\to/g, '-> '],
  [/\\infty/g, 'inf '],
  [/\\sum(?![A-Za-z])/g, 'sum '],
  [/\\int(?![A-Za-z])/g, 'int '],
  [/\\lim(?![A-Za-z])/g, 'lim '],
  [/\\sup(?![A-Za-z])/g, 'sup '],
  [/\\inf(?![A-Za-z])/g, 'inf '],
  [/\\max(?![A-Za-z])/g, 'max '],
  [/\\min(?![A-Za-z])/g, 'min '],
  [/\\log(?![A-Za-z])/g, 'log '],
  [/\\exp(?![A-Za-z])/g, 'exp '],
  [/\\det(?![A-Za-z])/g, 'det '],
  [/\\dim(?![A-Za-z])/g, 'dim '],
  [/\\Pr(?![A-Za-z])/g, 'Pr '],
  [/\\partial(?![A-Za-z])/g, 'd '],
  [/\\nabla(?![A-Za-z])/g, 'nabla '],
  [/\\alpha(?![A-Za-z])/g, 'alpha '],
  [/\\beta(?![A-Za-z])/g, 'beta '],
  [/\\gamma(?![A-Za-z])/g, 'gamma '],
  [/\\delta(?![A-Za-z])/g, 'delta '],
  [/\\epsilon(?![A-Za-z])|\\varepsilon(?![A-Za-z])/g, 'epsilon '],
  [/\\zeta(?![A-Za-z])/g, 'zeta '],
  [/\\eta(?![A-Za-z])/g, 'eta '],
  [/\\theta(?![A-Za-z])/g, 'theta '],
  [/\\lambda(?![A-Za-z])/g, 'lambda '],
  [/\\mu(?![A-Za-z])/g, 'mu '],
  [/\\nu(?![A-Za-z])/g, 'nu '],
  [/\\xi(?![A-Za-z])/g, 'xi '],
  [/\\pi(?![A-Za-z])/g, 'pi '],
  [/\\rho(?![A-Za-z])/g, 'rho '],
  [/\\sigma(?![A-Za-z])/g, 'sigma '],
  [/\\tau(?![A-Za-z])/g, 'tau '],
  [/\\phi(?![A-Za-z])|\\varphi(?![A-Za-z])/g, 'phi '],
  [/\\chi(?![A-Za-z])/g, 'chi '],
  [/\\psi(?![A-Za-z])/g, 'psi '],
  [/\\omega(?![A-Za-z])/g, 'omega '],
  [/\\Omega(?![A-Za-z])/g, 'Omega '],
  [/\\Sigma(?![A-Za-z])/g, 'Sigma '],
  [/\\Lambda(?![A-Za-z])/g, 'Lambda '],
  [/\\Theta(?![A-Za-z])/g, 'Theta '],
  [/\\Gamma(?![A-Za-z])/g, 'Gamma '],
  [/\\Delta(?![A-Za-z])/g, 'Delta '],
  [/\\Phi(?![A-Za-z])/g, 'Phi '],
  [/\\Psi(?![A-Za-z])/g, 'Psi '],
  [/\\Pi(?![A-Za-z])/g, 'Pi '],
  [/\\in(?![A-Za-z])/g, 'in '],
  [/\\notin(?![A-Za-z])/g, 'notin '],
  [/\\subset(?![A-Za-z])/g, 'subset '],
  [/\\subseteq(?![A-Za-z])/g, 'subseteq '],
  [/\\cap(?![A-Za-z])/g, 'cap '],
  [/\\cup(?![A-Za-z])/g, 'cup '],
  [/\\perp(?![A-Za-z])/g, 'perp '],
  [/\\prime(?![A-Za-z])/g, '\' '],
  [/\\circ(?![A-Za-z])/g, ' '],
  [/\\dots(?![A-Za-z])|\\cdots(?![A-Za-z])|\\ldots(?![A-Za-z])/g, '... '],
  [/\\quad(?![A-Za-z])|\\qquad(?![A-Za-z])|\\,(?![A-Za-z])|\\;(?![A-Za-z])|\\!(?![A-Za-z])/g, ' '],
  [/\\\\[a-zA-Z]+/g, ' '],
  [/[{}^_]/g, ' ']
];

const COMMON_TERMS_RE = /\b(Var|Cov|Corr|Bias|MSE|MLE|OLS|GMM|KKT|SVD|PCA|QR|ARMA|ARIMA|ARCH|GARCH|EGARCH|VaR|CVaR|ES|IC|RankIC|Sharpe|Sortino|Calmar|Treynor|Black-Scholes|Wiener|Brownian|Markov|Martingale|Chebyshev|Markov|Chernoff|Hoeffding|Bernstein|Jensen|Borel-Cantelli|Slutsky|Lyapunov|Lindeberg|Poisson|Gaussian|Dirichlet|Wishart|Cholesky|Laplace|Fourier|Hermite|Laguerre|Sobolev|Ito|Itô|Stratonovich|Feynman-Kac|Girsanov|Doob|Dynkin|Radon-Nikodym|Lebesgue|Riemann|Stieltjes)\b/gi;

function latexToPlain(latex) {
  let readable = latex;
  for (const [re, rep] of LATEX_REPLACEMENTS) {
    readable = readable.replace(re, rep);
  }
  // Drop any remaining command names/braces. Keep HTML entities encoded so
  // the later tag-stripping pass cannot treat a decoded "<" as an HTML tag.
  readable = readable
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[{}^_\\$]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return readable;
}

/**
 * Extracts key math and academic terms from latex and text.
 */
function extractTerms(text, rawLatexList = []) {
  const terms = new Set();
  const searchSources = [text, ...rawLatexList];

  for (const src of searchSources) {
    if (!src) continue;
    const matches = src.match(COMMON_TERMS_RE);
    if (matches) {
      for (const m of matches) {
        terms.add(m);
      }
    }
  }

  return Array.from(terms);
}

/**
 * Converts section/exercise HTML into readable search text and extracts formula terms.
 */
export function htmlToSearchText(rawHtml) {
  if (!rawHtml) return { text: '', terms: [] };

  const rawLatexList = [];

  // 1. Process KaTeX math tags and extract data-latex.
  // T03 wraps each math node with QMA_MATH_START/END comments; match through
  // the end marker so nested KaTeX MathML/HTML is removed exactly once.
  let text = rawHtml.replace(/<span[^>]*class="[^"]*\bmath\b[^"]*"[^>]*data-latex="([^"]+)"[^>]*>[\s\S]*?<!--QMA_MATH_END--><\/span>/gi, (match, latex) => {
    rawLatexList.push(latex);
    return ` ${latexToPlain(latex)} `;
  });

  // Fallback for older/partial math spans that do not carry the end marker.
  text = text.replace(/<span[^>]*class="[^"]*\bmath\b[^"]*"[^>]*data-latex="([^"]+)"[^>]*>[\s\S]*?<\/span>/gi, (match, latex) => {
    rawLatexList.push(latex);
    return ` ${latexToPlain(latex)} `;
  });

  text = text.replace(/<div[^>]*class="[^"]*(?:equation|math-display)[^"]*"[^>]*data-latex="([^"]+)"[^>]*>[\s\S]*?<\/div>/gi, (match, latex) => {
    rawLatexList.push(latex);
    return ` ${latexToPlain(latex)} `;
  });

  // 2. Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // 3. Decode HTML entities
  text = text
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');

  // 4. Normalize spaces and drop the env anchor glyph
  text = text.replace(/\s#\s/g, ' ').replace(/\s+/g, ' ').trim();

  // 5. Extract terms
  const terms = extractTerms(text, rawLatexList);

  return { text, terms };
}

/**
 * Extracts environment blocks from a section's HTML by element ID.
 */
export function extractEnvironmentHtml(sectionHtml, envId) {
  const startPattern = `<section class="env `;
  let searchIdx = 0;

  while (true) {
    const startPos = sectionHtml.indexOf(startPattern, searchIdx);
    if (startPos === -1) break;

    const tagClosePos = sectionHtml.indexOf('>', startPos);
    if (tagClosePos === -1) break;

    const openingTag = sectionHtml.slice(startPos, tagClosePos + 1);
    if (openingTag.includes(`id="${envId}"`)) {
      const endTagPos = sectionHtml.indexOf('</section>', tagClosePos);
      if (endTagPos !== -1) {
        return sectionHtml.slice(startPos, endTagPos + 10);
      }
    }

    searchIdx = tagClosePos + 1;
  }

  return null;
}

export function buildSearchIndex(options = {}) {
  const startTime = Date.now();
  const siteDir = options.siteDir || SITE_DIR;
  const searchDir = options.searchDir || SEARCH_DIR;
  const webTargetDir = options.webTargetDir || WEB_TARGET_DIR;

  fs.mkdirSync(searchDir, { recursive: true });

  const bookPath = path.join(siteDir, 'book.json');
  if (!fs.existsSync(bookPath)) {
    throw new Error(`book.json not found at ${bookPath}. Please run content:build first.`);
  }

  const bookData = JSON.parse(fs.readFileSync(bookPath, 'utf8'));
  const chapters = bookData.chapters || [];

  const documents = [];
  const seenIds = new Set();
  const chapterDocCounts = {};

  let countSections = 0;
  let countEnvironments = 0;
  let countExercises = 0;
  let countSolutions = 0;

  for (const ch of chapters) {
    const chPath = path.join(siteDir, 'chapters', `${ch.id}.json`);
    if (!fs.existsSync(chPath)) {
      throw new Error(`Chapter manifest not found: ${chPath}`);
    }

    const chapData = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    chapterDocCounts[ch.id] = { sections: 0, environments: 0, exercises: 0, solutions: 0 };

    const sectionHtmlCache = {};
    const sectionMap = {};

    // 1. Process Sections
    for (const sec of (chapData.sections || [])) {
      sectionMap[sec.id] = sec;

      const secHtmlPath = path.join(siteDir, 'sections', `${sec.id}.html`);
      let secHtml = '';
      if (fs.existsSync(secHtmlPath)) {
        secHtml = fs.readFileSync(secHtmlPath, 'utf8');
        sectionHtmlCache[sec.id] = secHtml;
      }

      const { text, terms } = htmlToSearchText(secHtml);
      const truncatedText = text.slice(0, 2000);

      const secDoc = {
        id: sec.id,
        type: 'section',
        chapterId: ch.id,
        sectionId: sec.id,
        title: `${sec.number} ${sec.title}`,
        text: truncatedText,
        tags: sec.meta?.tags || [],
        terms,
        difficulty: sec.meta?.difficulty || null,
        priority: sec.meta?.priority || null,
        anchor: sec.anchor || sec.id
      };

      if (seenIds.has(secDoc.id)) {
        throw new Error(`Duplicate document id: ${secDoc.id}`);
      }
      seenIds.add(secDoc.id);
      documents.push(secDoc);
      countSections++;
      chapterDocCounts[ch.id].sections++;
    }

    // 2. Process Environments (definition, theorem, lemma, proposition, corollary, axiom, example, note)
    for (const env of (chapData.environmentIndex || [])) {
      const secHtml = sectionHtmlCache[env.sectionId] || '';
      const envHtml = extractEnvironmentHtml(secHtml, env.id);

      const { text, terms } = htmlToSearchText(envHtml || '');
      const truncatedText = text.slice(0, 2000);

      const parentSec = sectionMap[env.sectionId];
      const kindLabel = ENV_KIND_LABELS[env.kind] || env.kind;
      const titleSuffix = env.title ? ` ${env.title}` : '';
      const envTitle = `${kindLabel} ${env.number}${titleSuffix}`;

      const envDoc = {
        id: env.id,
        type: env.kind,
        chapterId: ch.id,
        sectionId: env.sectionId,
        title: envTitle,
        text: truncatedText,
        tags: parentSec?.meta?.tags || [],
        terms,
        difficulty: parentSec?.meta?.difficulty || null,
        priority: parentSec?.meta?.priority || null,
        anchor: env.anchor || env.id
      };

      if (seenIds.has(envDoc.id)) {
        throw new Error(`Duplicate document id: ${envDoc.id}`);
      }
      seenIds.add(envDoc.id);
      documents.push(envDoc);
      countEnvironments++;
      chapterDocCounts[ch.id].environments++;
    }

    // 3. Process Exercises and Solutions
    const exPath = path.join(siteDir, 'exercises', `${ch.id}.json`);
    if (fs.existsSync(exPath)) {
      const exData = JSON.parse(fs.readFileSync(exPath, 'utf8'));

      for (const ex of (exData.exercises || [])) {
        // Exercise statement document
        const qParsed = htmlToSearchText(ex.questionHtml || '');
        const chLabel = chapData.label || `第${chapData.number}章`;
        const exTitle = `${chLabel} 习题 ${ex.number}`;

        const exDoc = {
          id: ex.id,
          type: 'exercise',
          chapterId: ch.id,
          sectionId: ex.sectionId || null,
          title: exTitle,
          text: qParsed.text.slice(0, 2000),
          tags: [],
          terms: qParsed.terms,
          difficulty: null,
          priority: null,
          anchor: ex.id
        };

        if (seenIds.has(exDoc.id)) {
          throw new Error(`Duplicate document id: ${exDoc.id}`);
        }
        seenIds.add(exDoc.id);
        documents.push(exDoc);
        countExercises++;
        chapterDocCounts[ch.id].exercises++;

        // Solution document
        const solParsed = htmlToSearchText(ex.solutionHtml || '');
        const solId = ex.id.replace('-ex-', '-sol-');
        const solTitle = `${chLabel} 习题 ${ex.number} 解析`;

        const solDoc = {
          id: solId,
          type: 'solution',
          chapterId: ch.id,
          sectionId: ex.sectionId || null,
          title: solTitle,
          text: solParsed.text.slice(0, 2000),
          tags: [],
          terms: solParsed.terms,
          difficulty: null,
          priority: null,
          anchor: ex.id
        };

        if (seenIds.has(solDoc.id)) {
          throw new Error(`Duplicate document id: ${solDoc.id}`);
        }
        seenIds.add(solDoc.id);
        documents.push(solDoc);
        countSolutions++;
        chapterDocCounts[ch.id].solutions++;
      }
    }
  }

  // Verification checks
  const totalDocs = documents.length;
  console.log(`[build-search-index] Total documents built: ${totalDocs}`);
  console.log(`[build-search-index] Breakdown: sections=${countSections}, environments=${countEnvironments}, exercises=${countExercises}, solutions=${countSolutions}`);

  if (countSections !== 219) {
    throw new Error(`Expected 219 sections, found ${countSections}`);
  }
  if (countEnvironments !== 889) {
    throw new Error(`Expected 889 environments, found ${countEnvironments}`);
  }
  if (countExercises !== 698) {
    throw new Error(`Expected 698 exercises, found ${countExercises}`);
  }
  if (countSolutions !== 698) {
    throw new Error(`Expected 698 solutions, found ${countSolutions}`);
  }
  if (totalDocs !== 2504) {
    throw new Error(`Expected 2,504 total documents, found ${totalDocs}`);
  }
  if (chapters.length !== 34) {
    throw new Error(`Expected 34 chapters, found ${chapters.length}`);
  }

  // Check all chapters have docs
  for (const ch of chapters) {
    const counts = chapterDocCounts[ch.id];
    if (!counts || counts.sections === 0) {
      throw new Error(`Chapter ${ch.id} has no documents in search index`);
    }
  }

  // Write index.json
  const indexJsonStr = JSON.stringify(documents);
  const indexPath = path.join(searchDir, 'index.json');
  fs.writeFileSync(indexPath, indexJsonStr, 'utf8');

  const byteSize = Buffer.byteLength(indexJsonStr, 'utf8');
  const gzipped = zlib.gzipSync(Buffer.from(indexJsonStr, 'utf8'));
  const gzipByteSize = gzipped.length;

  console.log(`[build-search-index] index.json size: ${(byteSize / 1024).toFixed(1)} KB (gzip: ${(gzipByteSize / 1024).toFixed(1)} KB)`);

  // Write manifest.json
  const manifest = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    totalDocuments: totalDocs,
    counts: {
      sections: countSections,
      environments: countEnvironments,
      exercises: countExercises,
      solutions: countSolutions
    },
    chaptersCount: chapters.length,
    indexFiles: ['index.json'],
    byteSize,
    gzipByteSize
  };

  const manifestPath = path.join(searchDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  // Copy aliases.json if exists
  if (fs.existsSync(ALIASES_SRC)) {
    fs.copyFileSync(ALIASES_SRC, path.join(searchDir, 'aliases.json'));
  }

  // Sync to web/public/content/search if web exists
  if (fs.existsSync(path.dirname(webTargetDir))) {
    fs.mkdirSync(webTargetDir, { recursive: true });
    fs.copyFileSync(indexPath, path.join(webTargetDir, 'index.json'));
    fs.copyFileSync(manifestPath, path.join(webTargetDir, 'manifest.json'));
    if (fs.existsSync(ALIASES_SRC)) {
      fs.copyFileSync(ALIASES_SRC, path.join(webTargetDir, 'aliases.json'));
    }
    console.log(`[build-search-index] Synced index files to ${webTargetDir}`);
  }

  const duration = Date.now() - startTime;
  console.log(`[build-search-index] Finished in ${duration}ms.`);

  return {
    totalDocuments: totalDocs,
    countSections,
    countEnvironments,
    countExercises,
    countSolutions,
    byteSize,
    gzipByteSize,
    duration
  };
}

// CLI execution
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  buildSearchIndex();
}
