import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_ALIASES, expandQuery } from '../src/features/search/aliases';
import {
  createSearchIndex,
  executeSearch,
  getHighlightParts,
  tokenize,
} from '../src/features/search/searchEngine';
import { SearchDocument, SearchFilters } from '../src/features/search/types';

const indexPath = path.resolve(__dirname, '../../content/generated/site/search/index.json');
const realDocuments: SearchDocument[] = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
const searchIndex = createSearchIndex(realDocuments);

const defaultFilters: SearchFilters = {
  type: 'all',
  chapterId: 'all',
  priority: 'all',
  difficulty: 'all',
};

describe('searchEngine', () => {
  describe('tokenize', () => {
    it('handles Chinese segmenter + CJK 2-gram + English lowercase', () => {
      const tokens = tokenize('11.4 期望与方差 SVD Itô GARCH 夏普 鞅');
      expect(tokens).toContain('期望');
      expect(tokens).toContain('方差');
      expect(tokens).toContain('svd');
      expect(tokens).toContain('garch');
      expect(tokens).toContain('夏普');
      expect(tokens).toContain('鞅');
      // Accented letter normalization
      expect(tokens).toContain('itô');
      expect(tokens).toContain('ito');
    });

    it('handles single Chinese character fallback', () => {
      const tokens = tokenize('鞅');
      expect(tokens).toContain('鞅');
    });
  });

  describe('expandQuery', () => {
    it('expands known terms with aliases bidirectionally', () => {
      const exp1 = expandQuery('SVD');
      expect(exp1).toContain('svd');
      expect(exp1).toContain('奇异值');

      const exp2 = expandQuery('期望');
      expect(exp2).toContain('期望');
      expect(exp2).toContain('expectation');

      const exp3 = expandQuery('VaR');
      expect(exp3).toContain('var');
      expect(exp3).toContain('风险价值');

      const exp4 = expandQuery('Itô');
      expect(exp4).toContain('itô');
      expect(exp4).toContain('ito');
      expect(exp4).toContain('伊藤');
    });
  });

  describe('10 大代表性查询命中正确章节', () => {
    const testCases: Array<{ query: string; expectedChapters: string[] }> = [
      { query: '期望', expectedChapters: ['c11', 'c13'] },
      { query: '协方差', expectedChapters: ['c11', 'c12'] },
      { query: 'SVD', expectedChapters: ['c08'] },
      { query: 'Itô', expectedChapters: ['c26', 'c27', 'c19'] },
      { query: 'GARCH', expectedChapters: ['c29'] },
      { query: 'Black-Scholes', expectedChapters: ['c33', 'c26', 'c27'] },
      { query: '夏普', expectedChapters: ['c11', 'c34'] },
      { query: 'KKT', expectedChapters: ['c16'] },
      { query: '鞅', expectedChapters: ['c25', 'c18', 'c13', 'c11'] },
      { query: 'VaR', expectedChapters: ['c32', 'c26', 'c01'] },
    ];

    for (const { query, expectedChapters } of testCases) {
      it(`查询 "${query}" 至少命中预期的章节之一 (${expectedChapters.join(', ')})`, () => {
        const results = executeSearch(searchIndex, realDocuments, query, defaultFilters, DEFAULT_ALIASES);
        expect(results.length).toBeGreaterThan(0);

        const matchedChapters = new Set(results.slice(0, 15).map((r) => r.chapterId));
        const hasOverlap = expectedChapters.some((exp) => matchedChapters.has(exp));
        expect(
          hasOverlap,
          `查询 "${query}" 的前 15 条结果 (${Array.from(matchedChapters).join(',')}) 未包含预期章节 ${expectedChapters.join(',')}`
        ).toBe(true);
      });
    }
  });

  describe('过滤功能', () => {
    it('按类型过滤：只返回习题 (exercise)', () => {
      const results = executeSearch(
        searchIndex,
        realDocuments,
        '期望',
        { ...defaultFilters, type: 'exercise' },
        DEFAULT_ALIASES
      );
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => expect(r.type).toBe('exercise'));
    });

    it('按类型过滤：只返回定义定理 (theorem)', () => {
      const results = executeSearch(
        searchIndex,
        realDocuments,
        '方差',
        { ...defaultFilters, type: 'theorem' },
        DEFAULT_ALIASES
      );
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) =>
        expect(['definition', 'theorem', 'lemma', 'proposition', 'corollary', 'axiom', 'note']).toContain(r.type)
      );
    });

    it('按章节过滤：只返回 C11', () => {
      const results = executeSearch(
        searchIndex,
        realDocuments,
        '期望',
        { ...defaultFilters, chapterId: 'c11' },
        DEFAULT_ALIASES
      );
      expect(results.length).toBeGreaterThan(0);
      results.forEach((r) => expect(r.chapterId).toBe('c11'));
    });
  });

  describe('高亮与 XSS 安全', () => {
    it('安全拆分高亮片段，不拼接原始 HTML', () => {
      const parts = getHighlightParts('数学期望与方差性质', ['期望', '方差']);
      expect(parts).toEqual([
        { text: '数学', isMatch: false },
        { text: '期望', isMatch: true },
        { text: '与', isMatch: false },
        { text: '方差', isMatch: true },
        { text: '性质', isMatch: false },
      ]);
    });

    it('查询含 <script> 时被作为普通字符处理', () => {
      const xssQuery = '<script>alert("xss")</script>';
      const parts = getHighlightParts('这是一个包含<script>的测试', [xssQuery, '<script>']);
      expect(parts.some((p) => p.isMatch && p.text === '<script>')).toBe(true);
    });
  });
});
