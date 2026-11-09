import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DifficultyBadge } from '../components/metadata/DifficultyBadge';
import { PriorityBadge } from '../components/metadata/PriorityBadge';
import { Button } from '../components/ui/Button';
import { DifficultyLevel, PriorityLevel } from '../features/content/types';
import { formatDisplayTitle } from '../lib/format';
import {
  executeSearch,
  getHighlightParts,
  loadSearchEngine,
} from '../features/search/searchEngine';
import {
  AliasMap,
  SearchDocument,
  SearchFilters,
  SearchResult,
  SearchTypeFilter,
} from '../features/search/types';
import '../styles/search.css';

const HISTORY_STORAGE_KEY = 'qma_search_history';
const MAX_HISTORY = 10;

const TYPE_FILTER_OPTIONS: Array<{ label: string; value: SearchTypeFilter }> = [
  { label: '全部', value: 'all' },
  { label: '知识点', value: 'section' },
  { label: '定义定理', value: 'theorem' },
  { label: '例题', value: 'example' },
  { label: '习题', value: 'exercise' },
  { label: '解析', value: 'solution' },
];

const SUGGESTED_QUERIES = [
  '期望',
  '方差',
  '协方差',
  'SVD',
  'Itô',
  'GARCH',
  '夏普',
  'KKT',
  '鞅',
  'VaR',
  '最小二乘',
  '特征值',
];

const KIND_NAMES: Record<string, string> = {
  section: '知识点',
  definition: '定义',
  theorem: '定理',
  lemma: '引理',
  proposition: '命题',
  corollary: '推论',
  axiom: '公理',
  example: '例题',
  note: '注记',
  exercise: '习题',
  solution: '解析',
};

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlQuery = searchParams.get('q') || '';
  const urlType = (searchParams.get('type') as SearchTypeFilter) || 'all';
  const urlChapter = searchParams.get('chapter') || 'all';
  const urlPriority = searchParams.get('priority') || 'all';
  const urlDifficulty = searchParams.get('difficulty') || 'all';

  const [inputVal, setInputVal] = useState(urlQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(urlQuery);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Engine state
  const [engine, setEngine] = useState<{
    miniSearch: any;
    documents: SearchDocument[];
    aliases: AliasMap;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Initialize search history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setHistory(parsed.slice(0, MAX_HISTORY));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const saveHistory = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((item) => item !== trimmed)].slice(
        0,
        MAX_HISTORY
      );
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Fetch / initialize search engine
  const initEngine = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadSearchEngine();
      setEngine(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initEngine();
  }, [initEngine]);

  // Focus input on initial mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync input value when URL param changes
  useEffect(() => {
    setInputVal(urlQuery);
    setDebouncedQuery(urlQuery);
  }, [urlQuery]);

  // 250ms debounce for typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputVal);
      if (inputVal.trim() && inputVal !== urlQuery) {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.set('q', inputVal.trim());
            return next;
          },
          { replace: true }
        );
      } else if (!inputVal.trim() && urlQuery) {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.delete('q');
            return next;
          },
          { replace: true }
        );
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [inputVal, urlQuery, setSearchParams]);

  const updateFilter = useCallback(
    (key: 'type' | 'chapter' | 'priority' | 'difficulty', value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === 'all') {
            next.delete(key);
          } else {
            next.set(key, value);
          }
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Filters object
  const currentFilters: SearchFilters = useMemo(
    () => ({
      type: urlType,
      chapterId: urlChapter,
      priority: urlPriority,
      difficulty: urlDifficulty,
    }),
    [urlType, urlChapter, urlPriority, urlDifficulty]
  );

  // Execute search
  const results: SearchResult[] = useMemo(() => {
    if (!engine || !debouncedQuery.trim()) return [];
    return executeSearch(
      engine.miniSearch,
      engine.documents,
      debouncedQuery,
      currentFilters,
      engine.aliases
    );
  }, [engine, debouncedQuery, currentFilters]);

  // Save history on non-empty results or submission
  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      saveHistory(debouncedQuery.trim());
    }
  }, [debouncedQuery, saveHistory]);

  // Reset selected index when query or results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery, currentFilters]);

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Esc
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev + 1;
        return next < results.length ? next : 0;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev - 1;
        return next >= 0 ? next : results.length - 1;
      });
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        const item = results[selectedIndex];
        navigate(`/learn/${item.chapterId}#${item.anchor}`);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (inputVal) {
        setInputVal('');
        setDebouncedQuery('');
      } else {
        inputRef.current?.blur();
      }
    }
  };

  // Safe Highlight Renderer using React Elements
  const renderHighlighted = (text: string, matchedTerms?: string[]) => {
    const terms = matchedTerms || [debouncedQuery];
    const parts = getHighlightParts(text, terms);
    return (
      <>
        {parts.map((p, idx) =>
          p.isMatch ? (
            <mark key={idx} className="search-highlight">
              {p.text}
            </mark>
          ) : (
            <React.Fragment key={idx}>{p.text}</React.Fragment>
          )
        )}
      </>
    );
  };

  return (
    <main className="search-page shell" id="main-content">
      {/* Header */}
      <header className="search-header">
        <h1>教材检索</h1>
        <p>支持公式术语、定义定理、例题习题与中英文概念深链定位。</p>

        {/* Input bar */}
        <div className="search-input-wrapper">
          <label htmlFor="site-search-input" className="sr-only">
            搜索教材内容
          </label>
          <span className="search-input-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>

          <input
            id="site-search-input"
            ref={inputRef}
            className="search-main-input"
            type="search"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入术语、公式名或概念（如 期望、SVD、Itô、GARCH、夏普、VaR）..."
            autoComplete="off"
            spellCheck="false"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={
              selectedIndex >= 0 ? `result-${results[selectedIndex]?.id}` : undefined
            }
          />

          {inputVal && (
            <button
              className="search-clear-btn"
              type="button"
              onClick={() => {
                setInputVal('');
                setDebouncedQuery('');
                inputRef.current?.focus();
              }}
              aria-label="清空输入"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search History */}
        {history.length > 0 && !debouncedQuery && (
          <div className="search-history" aria-label="最近搜索历史">
            <span className="search-history-label">最近搜索：</span>
            {history.map((term) => (
              <button
                key={term}
                type="button"
                className="search-history-tag"
                onClick={() => {
                  setInputVal(term);
                  setDebouncedQuery(term);
                }}
              >
                {term}
              </button>
            ))}
            <button
              type="button"
              className="search-history-clear"
              onClick={clearHistory}
            >
              清空历史
            </button>
          </div>
        )}
      </header>

      {/* Filter toolbar */}
      <section className="search-filters-bar" aria-label="搜索结果过滤">
        {/* Type pills */}
        <div className="search-type-filters" role="group" aria-label="内容类型过滤">
          {TYPE_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`search-type-pill ${urlType === opt.value ? 'is-active' : ''}`}
              onClick={() => updateFilter('type', opt.value)}
              aria-pressed={urlType === opt.value}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Chapter / Priority / Difficulty dropdowns */}
        <div className="search-select-filters">
          <label htmlFor="search-filter-chapter" className="sr-only">
            章节过滤
          </label>
          <select
            id="search-filter-chapter"
            value={urlChapter}
            onChange={(e) => updateFilter('chapter', e.target.value)}
            aria-label="按章节过滤"
          >
            <option value="all">全部 34 章</option>
            {Array.from({ length: 34 }, (_, i) => {
              const num = i + 1;
              const id = `c${num < 10 ? '0' + num : num}`;
              return (
                <option key={id} value={id}>
                  第 {num} 章 ({id.toUpperCase()})
                </option>
              );
            })}
          </select>

          <label htmlFor="search-filter-priority" className="sr-only">
            优先级过滤
          </label>
          <select
            id="search-filter-priority"
            value={urlPriority}
            onChange={(e) => updateFilter('priority', e.target.value)}
            aria-label="按优先级过滤"
          >
            <option value="all">全部优先级</option>
            <option value="P0">P0 核心必须</option>
            <option value="P1">P1 进阶推荐</option>
          </select>

          <label htmlFor="search-filter-difficulty" className="sr-only">
            难度过滤
          </label>
          <select
            id="search-filter-difficulty"
            value={urlDifficulty}
            onChange={(e) => updateFilter('difficulty', e.target.value)}
            aria-label="按难度过滤"
          >
            <option value="all">全部难度</option>
            <option value="D1">D1 初学入门</option>
            <option value="D2">D2 基础夯实</option>
            <option value="D3">D3 核心进阶</option>
            <option value="D4">D4 综合挑战</option>
            <option value="D5">D5 专家专题</option>
          </select>
        </div>
      </section>

      {/* Loading Skeleton */}
      {loading && (
        <div className="search-results-list" aria-busy="true" aria-label="正在载入检索数据">
          <div className="search-skeleton-card">
            <div className="skeleton-box" style={{ width: '120px', height: '20px' }} />
            <div className="skeleton-box" style={{ width: '60%', height: '24px' }} />
            <div className="skeleton-box" style={{ width: '90%', height: '16px' }} />
          </div>
          <div className="search-skeleton-card">
            <div className="skeleton-box" style={{ width: '100px', height: '20px' }} />
            <div className="skeleton-box" style={{ width: '45%', height: '24px' }} />
            <div className="skeleton-box" style={{ width: '80%', height: '16px' }} />
          </div>
        </div>
      )}

      {/* Error state with retry */}
      {error && !loading && (
        <div
          role="alert"
          style={{
            padding: '32px 24px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '20px auto',
          }}
        >
          <p style={{ color: 'var(--accent)', margin: '0 0 16px', fontSize: '15px' }}>
            {error}
          </p>
          <Button variant="secondary" onClick={initEngine}>
            重试加载检索索引
          </Button>
        </div>
      )}

      {/* Results content */}
      {!loading && !error && (
        <>
          {debouncedQuery.trim() ? (
            <>
              {/* Aria-live stats */}
              <div
                className="search-stats"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                找到 <strong>{results.length}</strong> 条与 &ldquo;{debouncedQuery}&rdquo; 相关的结果
              </div>

              {results.length > 0 ? (
                <div
                  id="search-results"
                  ref={resultsRef}
                  className="search-results-list"
                  role="list"
                >
                  {results.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const kindLabel = KIND_NAMES[item.type] || item.type;
                    const badgeClass = `search-badge search-badge--${item.type}`;

                    return (
                      <Link
                        key={item.id}
                        id={`result-${item.id}`}
                        to={`/learn/${item.chapterId}#${item.anchor}`}
                        className={`search-result-card ${isSelected ? 'is-active' : ''}`}
                        role="listitem"
                        tabIndex={0}
                      >
                        <div className="search-result-header">
                          <span className={badgeClass}>{kindLabel}</span>
                          <span className="search-result-chapter">
                            {item.chapterId.toUpperCase()}
                            {item.sectionId ? ` · ${item.sectionId}` : ''}
                          </span>
                          {item.difficulty && (
                            <DifficultyBadge level={item.difficulty as DifficultyLevel} />
                          )}
                          {item.priority && (
                            <PriorityBadge priority={item.priority as PriorityLevel} />
                          )}
                        </div>

                        <h2 className="search-result-title">
                          {renderHighlighted(formatDisplayTitle(item.title), item.matchedTerms)}
                        </h2>

                        {item.snippet && (
                          <p className="search-result-snippet">
                            {renderHighlighted(item.snippet, item.matchedTerms)}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* Empty results */
                <div className="search-empty" role="region" aria-label="未找到结果">
                  <h3>未找到与 &ldquo;{debouncedQuery}&rdquo; 匹配的内容</h3>
                  <p>
                    建议检查拼写、尝试更宽泛的中英文术语，或尝试以下常用主题：
                  </p>
                  <div className="search-suggestions">
                    {SUGGESTED_QUERIES.map((sq) => (
                      <button
                        key={sq}
                        type="button"
                        className="search-suggestion-btn"
                        onClick={() => {
                          setInputVal(sq);
                          setDebouncedQuery(sq);
                        }}
                      >
                        {sq}
                      </button>
                    ))}
                  </div>
                  <Link to="/syllabus">
                    <Button variant="secondary">浏览完整教材目录</Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            /* Prompt to search */
            <div className="search-empty" style={{ margin: '40px 0' }}>
              <h3>快速检索千页量化数学</h3>
              <p>
                在上方输入关键词开始检索，或直接点击下方热门术语：
              </p>
              <div className="search-suggestions">
                {SUGGESTED_QUERIES.map((sq) => (
                  <button
                    key={sq}
                    type="button"
                    className="search-suggestion-btn"
                    onClick={() => {
                      setInputVal(sq);
                      setDebouncedQuery(sq);
                    }}
                  >
                    {sq}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};
