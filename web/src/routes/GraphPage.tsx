import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DifficultyBadge } from '../components/metadata/DifficultyBadge';
import { PriorityBadge } from '../components/metadata/PriorityBadge';
import { Button } from '../components/ui/Button';
import { Chip } from '../components/ui/Chip';
import { DifficultyLevel, PriorityLevel } from '../features/content/types';
import { loadGraph } from '../features/graph/loadGraph';
import { GraphData, GraphNode } from '../features/graph/types';
import { formatDisplayTitle } from '../lib/format';
import '../styles/graph.css';

type ScopeFilter = 'all' | 'annotated';

export const GraphPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const highlightedSectionId = searchParams.get('section');
  const chapterParam = searchParams.get('chapter') || 'all';
  const priorityParam = searchParams.get('priority') || 'all';
  const scopeParam = (searchParams.get('scope') as ScopeFilter) || 'all';

  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const highlightedRowRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadGraph();
      setGraphData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Scroll to highlighted section row when data loads or URL param changes
  useEffect(() => {
    if (highlightedSectionId && !loading && highlightedRowRef.current) {
      const timer = setTimeout(() => {
        highlightedRowRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [highlightedSectionId, loading]);

  const updateParam = useCallback(
    (key: string, value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value === 'all' || !value) {
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

  // Group nodes by chapter
  const chaptersWithSections = useMemo(() => {
    if (!graphData) return [];

    const map = new Map<
      string,
      {
        chapterId: string;
        chapterTitle: string;
        coverage?: { totalSections: number; annotatedSections: number; coveragePercent: number };
        sections: GraphNode[];
      }
    >();

    // Index coverage by chapterId
    const covMap = new Map();
    for (const cov of graphData.chapterCoverage || []) {
      covMap.set(cov.chapterId, cov);
    }

    for (const node of graphData.nodes) {
      // Filter scope
      if (scopeParam === 'annotated' && !node.annotated) {
        continue;
      }
      // Filter chapter
      if (chapterParam !== 'all' && node.chapterId !== chapterParam) {
        continue;
      }
      // Filter priority
      if (priorityParam !== 'all' && node.priority !== priorityParam) {
        continue;
      }

      if (!map.has(node.chapterId)) {
        map.set(node.chapterId, {
          chapterId: node.chapterId,
          chapterTitle: node.chapterTitle,
          coverage: covMap.get(node.chapterId),
          sections: [],
        });
      }
      map.get(node.chapterId)!.sections.push(node);
    }

    return Array.from(map.values());
  }, [graphData, scopeParam, chapterParam, priorityParam]);

  // Helper for looking up section info
  const nodeLookup = graphData?.nodeMap || {};

  return (
    <main className="graph-page shell" id="main-content">
      <header className="graph-head">
        <div className="kicker">全书知识架构</div>
        <h1>知识关系</h1>
        <p>
          先修是学习的必要前提，相关是横向思维关联；严格校验 0 环有向无环图（DAG）。未标注章保持诚实留白，不生成虚假关联边。
        </p>
      </header>

      {/* Stats Banner */}
      {graphData && (
        <section className="graph-stats-banner" aria-label="全书知识图谱核心统计">
          <div className="graph-stat-item">
            <span className="graph-stat-item__num">{graphData.stats.totalNodes}</span>
            <span className="graph-stat-item__label">全书知识点</span>
          </div>
          <div className="graph-stat-item">
            <span className="graph-stat-item__num">{graphData.stats.annotatedNodes}</span>
            <span className="graph-stat-item__label">已完成评审标注节</span>
          </div>
          <div className="graph-stat-item">
            <span className="graph-stat-item__num">{graphData.stats.prerequisiteEdges}</span>
            <span className="graph-stat-item__label">先修依赖关系</span>
          </div>
          <div className="graph-stat-item">
            <span className="graph-stat-item__num">{graphData.stats.relatedEdges}</span>
            <span className="graph-stat-item__label">横向关联边 (无向)</span>
          </div>
          <div className="graph-stat-item">
            <span className="graph-stat-item__num" style={{ color: 'var(--sage, #3b6e5e)' }}>
              0 环严格 DAG
            </span>
            <span className="graph-stat-item__label">最深先修 {graphData.stats.maxPrerequisiteDepth} 层</span>
          </div>
        </section>
      )}

      {/* Filter toolbar */}
      <section className="graph-filters-bar" aria-label="知识图谱过滤选项">
        <div className="graph-filter-group">
          <Chip
            active={scopeParam === 'all'}
            onClick={() => updateParam('scope', 'all')}
          >
            全部 219 节
          </Chip>
          <Chip
            active={scopeParam === 'annotated'}
            onClick={() => updateParam('scope', 'annotated')}
          >
            只看已标注 (25 节)
          </Chip>
        </div>

        <div className="graph-filter-group">
          <label htmlFor="graph-chapter-select" className="sr-only">
            按章节筛选
          </label>
          <select
            id="graph-chapter-select"
            className="graph-filter-select"
            value={chapterParam}
            onChange={(e) => updateParam('chapter', e.target.value)}
            aria-label="按章节筛选"
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

          <label htmlFor="graph-priority-select" className="sr-only">
            按优先级筛选
          </label>
          <select
            id="graph-priority-select"
            className="graph-filter-select"
            value={priorityParam}
            onChange={(e) => updateParam('priority', e.target.value)}
            aria-label="按优先级筛选"
          >
            <option value="all">全部优先级</option>
            <option value="P0">P0 核心必须</option>
            <option value="P1">P1 进阶推荐</option>
          </select>

          {(chapterParam !== 'all' || priorityParam !== 'all' || scopeParam !== 'all') && (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                setSearchParams({}, { replace: true });
              }}
            >
              重置筛选
            </button>
          )}
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="graph-loading" aria-busy="true">
          <p style={{ color: 'var(--ink-secondary)', margin: 0 }}>
            正在加载知识关联图数据...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="graph-error" role="alert">
          <p style={{ color: 'var(--accent)', marginBottom: '16px' }}>{error}</p>
          <Button variant="secondary" onClick={fetchData}>
            重试加载
          </Button>
        </div>
      )}

      {/* Content list */}
      {!loading && !error && (
        <div className="graph-content" role="region" aria-label="全书章节知识关联列表">
          {chaptersWithSections.length === 0 ? (
            <div className="graph-empty" style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '15px' }}>
                未找到符合当前筛选条件的知识点。
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSearchParams({}, { replace: true })}
              >
                清除所有筛选
              </Button>
            </div>
          ) : (
            chaptersWithSections.map((chap) => {
              const isChapterAnnotated = Boolean(
                chap.coverage && chap.coverage.annotatedSections > 0
              );

              return (
                <article
                  key={chap.chapterId}
                  id={`chapter-${chap.chapterId}`}
                  className="graph-chapter-card"
                >
                  <header className="graph-chapter-header">
                    <h2 className="graph-chapter-title">
                      <span className="graph-chapter-num">{chap.chapterId.toUpperCase()}</span>
                      <span>{formatDisplayTitle(chap.chapterTitle)}</span>
                    </h2>
                    <div>
                      {isChapterAnnotated ? (
                        <span className="graph-chapter-badge graph-chapter-badge--annotated">
                          已评审标注 ({chap.coverage?.annotatedSections} /{' '}
                          {chap.coverage?.totalSections} 节)
                        </span>
                      ) : (
                        <span className="graph-chapter-badge">标注完善中</span>
                      )}
                    </div>
                  </header>

                  {!isChapterAnnotated && (
                    <div className="graph-unannotated-notice">
                      <span>ℹ️ 本章标注完善中，暂未建立关联边，保持诚实留白。</span>
                    </div>
                  )}

                  <div className="graph-section-header" role="row" aria-hidden="true">
                    <span>本节</span>
                    <span>先修</span>
                    <span>横向相关</span>
                    <span style={{ textAlign: 'right' }}>引用</span>
                  </div>

                  <div className="graph-section-list" role="list">
                    {chap.sections.map((sec) => {
                      const isHighlighted = highlightedSectionId === sec.id;
                      const directPrereqs = (graphData?.prerequisiteEdges || []).filter(
                        (e) => e.to === sec.id
                      );
                      const directRelated = (graphData?.incoming?.[sec.id]?.related || []);
                      const incomingPrereqs = (graphData?.incoming?.[sec.id]?.prerequisites || []);
                      const citedCount =
                        (graphData?.incoming?.[sec.id]?.count) || 0;
                      const ancestors = graphData?.ancestors?.[sec.id] || [];
                      const indirectCount = ancestors.filter((a) => a.depth > 1).length;

                      return (
                        <div
                          key={sec.id}
                          id={sec.id}
                          ref={isHighlighted ? (el) => (highlightedRowRef.current = el) : undefined}
                          className={`graph-section-row ${isHighlighted ? 'is-highlighted' : ''}`}
                          role="listitem"
                        >
                          {/* Col 1: Section Meta */}
                          <div className="graph-sec-meta">
                            <div className="graph-sec-title-wrap">
                              <span className="graph-sec-num">{sec.number}</span>
                              <Link
                                to={`/learn/${sec.chapterId}#${sec.id}`}
                                className="graph-sec-title"
                                title={`阅读 ${sec.number} ${formatDisplayTitle(sec.title)}`}
                              >
                                {formatDisplayTitle(sec.title)}
                              </Link>
                            </div>
                            <div className="graph-sec-badges">
                              {sec.annotated && sec.difficulty && (
                                <DifficultyBadge level={sec.difficulty as DifficultyLevel} />
                              )}
                              {sec.annotated && sec.priority && (
                                <PriorityBadge priority={sec.priority as PriorityLevel} />
                              )}
                              {!sec.annotated && (
                                <span className="small muted">标注完善中</span>
                              )}
                            </div>
                          </div>

                          {/* Col 2: Prerequisites */}
                          <div>
                            <div className="graph-col-label">直接先修</div>
                            {directPrereqs.length > 0 ? (
                              <>
                                <div className="graph-chips-wrap">
                                  {directPrereqs.map((e, idx) => {
                                    const targetNode = nodeLookup[e.from];
                                    const label = targetNode
                                      ? `${targetNode.number} ${formatDisplayTitle(targetNode.title)}`
                                      : e.from;
                                    const isReq = e.strength === 'required';

                                    return (
                                      <Link
                                        key={idx}
                                        to={`/graph?section=${e.from}`}
                                        className={`graph-chip ${
                                          isReq ? 'graph-chip--required' : 'graph-chip--helpful'
                                        }`}
                                        title={`查看 ${label} 关系`}
                                      >
                                        <span>{label}</span>
                                        <span className="graph-chip-strength">
                                          ({isReq ? '必要' : '有益'})
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                                {indirectCount > 0 && (
                                  <div className="graph-transitive-note">
                                    + {indirectCount} 个间接传递先修（最多 3 层）
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="small muted">
                                {sec.annotated ? '无前置先修（独立/起首）' : '—'}
                              </span>
                            )}
                          </div>

                          {/* Col 3: Related */}
                          <div>
                            <div className="graph-col-label">横向相关</div>
                            {directRelated.length > 0 ? (
                              <div className="graph-chips-wrap">
                                {directRelated.map((relId, idx) => {
                                  const targetNode = nodeLookup[relId];
                                  const label = targetNode
                                    ? `${targetNode.number} ${formatDisplayTitle(targetNode.title)}`
                                    : relId;

                                  return (
                                    <Link
                                      key={idx}
                                      to={`/graph?section=${relId}`}
                                      className="graph-chip"
                                      title={`查看 ${label} 关系`}
                                    >
                                      {label}
                                    </Link>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="small muted">
                                {sec.annotated ? '暂无相关' : '—'}
                              </span>
                            )}
                          </div>

                          {/* Col 4: Citations & Action */}
                          <div className="graph-citations-col">
                            {citedCount > 0 ? (
                              <span
                                className="graph-cited-badge graph-cited-badge--has"
                                title={`被 ${incomingPrereqs.length} 个节作为先修，${
                                  directRelated.length
                                } 个节关联`}
                              >
                                被引 {citedCount} 次
                              </span>
                            ) : (
                              <span className="graph-cited-badge">被引 0 次</span>
                            )}

                            <Link
                              to={`/learn/${sec.chapterId}#${sec.id}`}
                              className="graph-read-link"
                            >
                              阅读本节 →
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })
          )}
        </div>
      )}
    </main>
  );
};
