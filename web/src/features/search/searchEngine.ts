import MiniSearch from 'minisearch';
import { DEFAULT_ALIASES, expandQuery } from './aliases';
import {
  AliasMap,
  SearchDocument,
  SearchFilters,
  SearchResult,
} from './types';

export const THEOREM_ENV_TYPES = new Set([
  'definition',
  'theorem',
  'lemma',
  'proposition',
  'corollary',
  'axiom',
  'note',
]);

/**
 * Custom tokenizer combining Intl.Segmenter, CJK 2-gram, and lowercase words.
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const tokens = new Set<string>();
  const normalized = text.toLowerCase();

  // 1. Intl.Segmenter
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
    for (const seg of segmenter.segment(text)) {
      if (seg.isWordLike) {
        const w = seg.segment.trim().toLowerCase();
        if (w) {
          tokens.add(w);
          const unaccented = w.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          if (unaccented !== w) tokens.add(unaccented);
        }
      }
    }
  }

  // 2. CJK 2-grams and single characters
  const cjkRuns = text.match(/[\u4e00-\u9fa5]+/g) || [];
  for (const run of cjkRuns) {
    if (run.length === 1) {
      tokens.add(run);
    }
    for (let i = 0; i < run.length - 1; i++) {
      tokens.add(run.slice(i, i + 2));
    }
  }

  // 3. Alphanumeric / English words & abbreviations
  const alphaWords = normalized.match(/[a-z0-9_#+.-]+/g) || [];
  for (const w of alphaWords) {
    tokens.add(w);
    const unaccented = w.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (unaccented !== w) tokens.add(unaccented);
  }

  return Array.from(tokens);
}

export function createSearchIndex(documents: SearchDocument[]): MiniSearch<SearchDocument> {
  const miniSearch = new MiniSearch<SearchDocument>({
    fields: ['title', 'text', 'tags', 'terms'],
    storeFields: [
      'id',
      'type',
      'chapterId',
      'sectionId',
      'title',
      'anchor',
      'difficulty',
      'priority',
      'text',
    ],
    tokenize,
    searchOptions: {
      boost: { title: 3, terms: 2, tags: 2, text: 1 },
      combineWith: 'AND',
    },
  });

  miniSearch.addAll(documents);
  return miniSearch;
}

let cachedEnginePromise: Promise<{
  miniSearch: MiniSearch<SearchDocument>;
  documents: SearchDocument[];
  aliases: AliasMap;
}> | null = null;

export function clearSearchCache() {
  cachedEnginePromise = null;
}

/**
 * Lazy loads search index and aliases from /content/search/
 */
export async function loadSearchEngine(): Promise<{
  miniSearch: MiniSearch<SearchDocument>;
  documents: SearchDocument[];
  aliases: AliasMap;
}> {
  if (cachedEnginePromise) {
    return cachedEnginePromise;
  }

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  const indexUrl = `${baseUrl}content/search/index.json`;
  const aliasesUrl = `${baseUrl}content/search/aliases.json`;

  cachedEnginePromise = (async () => {
    const [indexRes, aliasesRes] = await Promise.all([
      fetch(indexUrl),
      fetch(aliasesUrl).catch(() => null),
    ]);

    if (!indexRes.ok) {
      throw new Error(`加载搜索索引失败 (HTTP ${indexRes.status}): ${indexUrl}`);
    }

    const documents = (await indexRes.json()) as SearchDocument[];
    if (!Array.isArray(documents)) {
      throw new Error('搜索索引格式异常，未返回文档数组');
    }

    let aliases: AliasMap = DEFAULT_ALIASES;
    if (aliasesRes && aliasesRes.ok) {
      try {
        aliases = (await aliasesRes.json()) as AliasMap;
      } catch {
        aliases = DEFAULT_ALIASES;
      }
    }

    const miniSearch = createSearchIndex(documents);

    return {
      miniSearch,
      documents,
      aliases,
    };
  })();

  return cachedEnginePromise;
}

/**
 * Extracts a representative text snippet around matched query words.
 */
export function extractSnippet(
  fullText: string,
  matchedTerms: string[],
  maxLength = 160
): string {
  if (!fullText) return '';
  if (fullText.length <= maxLength) return fullText;

  let bestIdx = -1;
  const lowerText = fullText.toLowerCase();

  for (const term of matchedTerms) {
    if (!term || term.length < 1) continue;
    const idx = lowerText.indexOf(term.toLowerCase());
    if (idx !== -1) {
      bestIdx = idx;
      break;
    }
  }

  if (bestIdx === -1) {
    return fullText.slice(0, maxLength) + '...';
  }

  const start = Math.max(0, bestIdx - 40);
  const end = Math.min(fullText.length, start + maxLength);
  let snippet = fullText.slice(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < fullText.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Splits text into highlighted matches and regular fragments for safe rendering.
 */
export function getHighlightParts(
  text: string,
  terms: string[]
): Array<{ text: string; isMatch: boolean }> {
  if (!text || !terms || terms.length === 0) {
    return [{ text: text || '', isMatch: false }];
  }

  // Filter valid terms, sort longest first to prevent greedy prefix shadows
  const validTerms = Array.from(
    new Set(
      terms
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
    )
  ).sort((a, b) => b.length - a.length);

  if (validTerms.length === 0) {
    return [{ text, isMatch: false }];
  }

  // Escape regex special characters
  const pattern = validTerms
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = text.split(regex);

  const result: Array<{ text: string; isMatch: boolean }> = [];
  for (const part of parts) {
    if (!part) continue;
    const isMatch = validTerms.some(
      (vt) => vt.toLowerCase() === part.toLowerCase()
    );
    result.push({ text: part, isMatch });
  }

  return result;
}

/**
 * Executes a search query with aliases, filtering, snippet extraction, and fallback.
 */
export function executeSearch(
  miniSearch: MiniSearch<SearchDocument>,
  documents: SearchDocument[],
  query: string,
  filters: SearchFilters,
  aliasMap: AliasMap = DEFAULT_ALIASES
): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const expandedTerms = expandQuery(trimmed, aliasMap);
  const hitMap = new Map<string, { doc: SearchDocument; score: number }>();
  const docLookup = new Map<string, SearchDocument>();
  for (const d of documents) {
    docLookup.set(d.id, d);
  }

  // 1. Primary query search
  try {
    const primaryHits = miniSearch.search(trimmed, {
      boost: { title: 4, terms: 3, tags: 2, text: 1 },
      combineWith: 'AND',
    });

    for (const h of primaryHits) {
      const fullDoc = docLookup.get(h.id);
      if (fullDoc) {
        hitMap.set(h.id, { doc: fullDoc, score: (h.score || 1) * 2 });
      }
    }
  } catch {
    // Ignore query syntax errors from MiniSearch
  }

  // 2. Expanded terms search (unaccented / aliases)
  for (const term of expandedTerms) {
    if (term.toLowerCase() === trimmed.toLowerCase()) continue;
    try {
      const termHits = miniSearch.search(term, {
        boost: { title: 2, terms: 1.5, tags: 1, text: 0.8 },
      });

      for (const h of termHits) {
        const fullDoc = docLookup.get(h.id);
        if (!fullDoc) continue;
        const prev = hitMap.get(h.id);
        const score = (h.score || 0.5);
        if (!prev) {
          hitMap.set(h.id, { doc: fullDoc, score });
        } else {
          hitMap.set(h.id, { doc: fullDoc, score: prev.score + score * 0.5 });
        }
      }
    } catch {
      // Continue
    }
  }

  // 3. Fallback for short query (single Chinese character, e.g. 鞅)
  if (hitMap.size === 0 && trimmed.length === 1) {
    const qChar = trimmed;
    for (const d of documents) {
      let matched = false;
      let score = 0;
      if (d.title && d.title.includes(qChar)) {
        matched = true;
        score += 5;
      }
      if (d.text && d.text.includes(qChar)) {
        matched = true;
        score += 1;
      }
      if (matched) {
        hitMap.set(d.id, { doc: d, score });
      }
    }
  }

  // 4. Convert to array and filter
  let results: SearchResult[] = [];
  for (const { doc, score } of hitMap.values()) {
    // Filter: type
    if (filters.type !== 'all') {
      if (filters.type === 'section') {
        if (doc.type !== 'section') continue;
      } else if (filters.type === 'theorem') {
        if (!THEOREM_ENV_TYPES.has(doc.type)) continue;
      } else if (filters.type === 'example') {
        if (doc.type !== 'example') continue;
      } else if (filters.type === 'exercise') {
        if (doc.type !== 'exercise') continue;
      } else if (filters.type === 'solution') {
        if (doc.type !== 'solution') continue;
      }
    }

    // Filter: chapter
    if (filters.chapterId !== 'all' && doc.chapterId !== filters.chapterId) {
      continue;
    }

    // Filter: priority
    if (filters.priority !== 'all' && doc.priority !== filters.priority) {
      continue;
    }

    // Filter: difficulty
    if (filters.difficulty !== 'all' && doc.difficulty !== filters.difficulty) {
      continue;
    }

    const matchedTerms = [trimmed, ...expandedTerms];
    const snippet = extractSnippet(doc.text, matchedTerms);

    results.push({
      ...doc,
      score,
      snippet,
      matchedTerms,
    });
  }

  // 5. Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}
