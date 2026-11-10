import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { EmptyState } from '../components/ui/EmptyState';
import { Book, BookSectionItem } from '../features/content/types';
import { loadBook } from '../features/content/loadBook';
import { loadPathsData, normalizePathId } from '../features/paths/loadPaths';
import { PathData, PathsFile, WeekPlanItem } from '../features/paths/types';
import { useStore } from '../features/store/store';
import { formatDisplayTitle } from '../lib/format';
import { learnPath, pathsPath, syllabusPath } from '../lib/paths';

interface EnhancedSection extends BookSectionItem {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
}

export const PathDetailPage: React.FC = () => {
  const { mode } = useParams<{ mode: string }>();
  const [pathsData, setPathsData] = useState<PathsFile | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  const { store, setActivePath } = useStore();

  const canonicalMode = normalizePathId(mode);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([loadPathsData(), loadBook()])
      .then(([pathsRes, bookRes]) => {
        if (!cancelled) {
          setPathsData(pathsRes);
          setBook(bookRes);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pathItem: PathData | undefined = useMemo(() => {
    if (!pathsData) return undefined;
    return pathsData.paths.find((p) => p.id === canonicalMode);
  }, [pathsData, canonicalMode]);

  // Section lookup map from book.json
  const sectionLookup = useMemo(() => {
    const map = new Map<string, EnhancedSection>();
    if (!book) return map;
    for (const ch of book.chapters) {
      for (const s of ch.sections) {
        map.set(s.id, {
          ...s,
          chapterId: ch.id,
          chapterNumber: ch.number,
          chapterTitle: ch.title,
        });
      }
    }
    return map;
  }, [book]);

  // Calculate Next Section Recommendation & Current Active Week
  const recommendation = useMemo(() => {
    if (!pathItem || pathItem.id === 'free' || pathItem.weeksPlan.length === 0) {
      return null;
    }

    for (const wp of pathItem.weeksPlan) {
      for (const sid of wp.sectionIds) {
        const item = store.progress[sid];
        const isDone = item && (item.status === 'done' || item.status === 'master');
        if (!isDone) {
          const sec = sectionLookup.get(sid);
          return {
            week: wp.week,
            weekTheme: wp.theme,
            sectionId: sid,
            section: sec,
          };
        }
      }
    }

    return { allCompleted: true };
  }, [pathItem, store.progress, sectionLookup]);

  // Overall path progress
  const progressStats = useMemo(() => {
    if (!pathItem) return { completed: 0, total: 0, percentage: 0 };
    if (pathItem.id === 'free') {
      const total = book ? book.chapters.reduce((a, c) => a + c.sections.length, 0) : 219;
      let completed = 0;
      for (const item of Object.values(store.progress)) {
        if (item.status === 'done' || item.status === 'master') completed++;
      }
      return {
        completed,
        total,
        percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
      };
    }

    const secSet = new Set<string>();
    for (const wp of pathItem.weeksPlan) {
      for (const sid of wp.sectionIds) {
        secSet.add(sid);
      }
    }
    const total = secSet.size;
    let completed = 0;
    for (const sid of secSet) {
      const item = store.progress[sid];
      if (item && (item.status === 'done' || item.status === 'master')) {
        completed++;
      }
    }

    return {
      completed,
      total,
      percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
    };
  }, [pathItem, book, store.progress]);

  // Default expand current week
  useEffect(() => {
    if (recommendation && 'week' in recommendation && recommendation.week) {
      setExpandedWeeks((prev) => ({
        ...prev,
        [recommendation.week]: true,
      }));
    }
  }, [recommendation]);

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

  const handleSetActive = () => {
    if (!pathItem) return;
    setActivePath(pathItem.id);
    setToastMessage(`已切换到「${pathItem.title}」，之前的进度都在。`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const isCurrentActive = normalizePathId(store.path?.active) === canonicalMode;

  if (loading) {
    return (
      <main className="page page--narrow paths-detail-page" id="main-content">
        <p className="page-loading" role="status">正在载入学习路径…</p>
      </main>
    );
  }

  if (error || !pathsData) {
    return (
      <main className="page page--narrow paths-detail-page" id="main-content">
        <div role="alert" className="notice notice--error">
          学习路径没有载入成功：{error || '缺少路径数据'}。
        </div>
        <Link to={pathsPath()} className="btn btn--secondary">
          返回学习路径
        </Link>
      </main>
    );
  }

  if (!pathItem) {
    return (
      <main className="page page--narrow paths-detail-page" id="main-content">
        <EmptyState
          title="没有找到这条学习路径"
          description={`链接里的路径“${mode}”不存在，可能已经改名。`}
          action={
            <Link to={pathsPath()} className="btn btn--primary">
              查看所有学习路径
            </Link>
          }
        />
      </main>
    );
  }

  const hours = Math.round(pathItem.totalEstimatedMinutes / 60);

  return (
    <main className="page page--narrow paths-detail-page" id="main-content">
      {toastMessage && (
        <div role="status" aria-live="polite" className="inline-toast">
          {toastMessage}
        </div>
      )}

      <Link to={pathsPath()} className="back-link">
        ← 学习路径
      </Link>

      <PageHeader
        title={pathItem.title}
        lede={pathItem.description}
        actions={
          isCurrentActive ? (
            <span className="path-detail__current">正在进行</span>
          ) : (
            <button type="button" className="btn btn--secondary" onClick={handleSetActive}>
              设为主路径
            </button>
          )
        }
      />

      <dl className="path-detail__facts">
        <div>
          <dt>路径</dt>
          <dd>{pathItem.id === 'free' ? '自由阅读' : pathItem.code}</dd>
        </div>
        <div>
          <dt>周期</dt>
          <dd>{pathItem.weeks > 0 ? `${pathItem.weeks} 周` : '不限时间'}</dd>
        </div>
        <div>
          <dt>总用时</dt>
          <dd>{hours > 0 ? `约 ${hours} 小时` : '按需阅读'}</dd>
        </div>
        <div>
          <dt>已完成</dt>
          <dd>
            {progressStats.completed} / {progressStats.total} 节
          </dd>
        </div>
        {pathItem.audience && (
          <div className="path-detail__audience">
            <dt>适合</dt>
            <dd>{pathItem.audience}</dd>
          </div>
        )}
      </dl>

      {pathItem.principles.length > 0 && (
        <section className="path-detail__principles" aria-labelledby="path-principles">
          <h2 id="path-principles">怎么用这条路径</h2>
          <ul>
            {pathItem.principles.map((pr, idx) => (
              <li key={idx}>{pr}</li>
            ))}
          </ul>
        </section>
      )}

      {pathItem.id !== 'free' && (
        <section className="path-next" aria-label="推荐下一节">
          <div className="path-next__label">
            <span>推荐下一节</span>
            {recommendation && 'week' in recommendation && <span>第 {recommendation.week} 周</span>}
          </div>

          {recommendation && 'section' in recommendation && recommendation.section ? (
            <div className="path-next__body">
              <div>
                <div className="path-next__theme">本周主题：{recommendation.weekTheme}</div>
                <h3>
                  {recommendation.section.number} {formatDisplayTitle(recommendation.section.title)}
                </h3>
                <div className="path-next__meta">
                  {[
                    `第 ${recommendation.section.chapterNumber} 章`,
                    recommendation.section.minutes ? `约 ${recommendation.section.minutes} 分钟` : null,
                    recommendation.section.difficulty
                      ? `${recommendation.section.difficulty} · ${recommendation.section.priority}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </div>
              </div>
              <Link
                to={learnPath(recommendation.section.chapterId, recommendation.section.anchor || recommendation.section.id)}
                className="btn btn--primary"
              >
                开始学习本节
              </Link>
            </div>
          ) : recommendation && 'allCompleted' in recommendation ? (
            <div className="path-next__body">
              <div>
                <h3>这条路径上的小节都已读完</h3>
                <div className="path-next__meta">接下来可以去错题本复习，或换一条更深入的路径。</div>
              </div>
              <Link to="/practice/wrong" className="btn btn--secondary">
                去错题本
              </Link>
            </div>
          ) : (
            <p className="path-next__meta">暂时没有可推荐的小节。</p>
          )}
        </section>
      )}

      {pathItem.id === 'free' && (
        <section className="path-next">
          <div className="path-next__body">
            <div>
              <h3>按自己的节奏读</h3>
              <div className="path-next__meta">
                不安排每周任务。首页“今天”会从你上次读到的章节接着推荐。
              </div>
            </div>
            <Link to={syllabusPath()} className="btn btn--primary">
              打开目录
            </Link>
          </div>
        </section>
      )}

      {pathItem.weeksPlan.length > 0 && (
        <section className="weeks" aria-label="周计划">
          <div className="progress-block__head">
            <div>
              <h2>周计划 · {pathItem.weeksPlan.length} 周</h2>
            </div>
            <div className="weeks__tools">
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => {
                  const all: Record<number, boolean> = {};
                  pathItem.weeksPlan.forEach((w) => {
                    all[w.week] = true;
                  });
                  setExpandedWeeks(all);
                }}
              >
                展开全部周
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setExpandedWeeks({})}>
                折叠全部
              </button>
            </div>
          </div>

          <ol className="weeks__list">
            {pathItem.weeksPlan.map((wp: WeekPlanItem) => {
              const isExpanded = !!expandedWeeks[wp.week];
              let weekCompleted = 0;
              for (const sid of wp.sectionIds) {
                const item = store.progress[sid];
                if (item && (item.status === 'done' || item.status === 'master')) weekCompleted++;
              }
              const weekTotal = wp.sectionIds.length;
              const isWeekFullyDone = weekTotal > 0 && weekCompleted === weekTotal;
              const bodyId = `week-${wp.week}-body`;

              return (
                <li key={wp.week} className={`week${isWeekFullyDone ? ' is-done' : ''}${isExpanded ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="week__head"
                    onClick={() => toggleWeek(wp.week)}
                    aria-expanded={isExpanded}
                    aria-controls={bodyId}
                  >
                    <span className="week__num">第 {wp.week} 周</span>
                    <span className="week__theme">{wp.theme}</span>
                    <span className="week__meta">
                      约 {Math.round(wp.estimatedMinutes / 60)} 小时 · {weekCompleted}/{weekTotal} 节
                    </span>
                    <span className="week__chevron" aria-hidden="true" />
                  </button>

                  {isExpanded && (
                    <div className="week__body" id={bodyId}>
                      {wp.outcome && <p className="week__outcome">本周目标：{wp.outcome}</p>}
                      <ul className="week__sections">
                        {wp.sectionIds.map((sid) => {
                          const sec = sectionLookup.get(sid);
                          const item = store.progress[sid];
                          const isDone = !!item && (item.status === 'done' || item.status === 'master');

                          if (!sec) {
                            return (
                              <li key={sid} className="week__section is-missing">
                                {sid}
                              </li>
                            );
                          }

                          return (
                            <li key={sid}>
                              <Link
                                to={learnPath(sec.chapterId, sec.anchor || sec.id)}
                                className={`week__section${isDone ? ' is-done' : ''}`}
                              >
                                <span className="week__check" aria-label={isDone ? '已完成' : '未完成'} />
                                <span className="week__sec-num">{sec.number}</span>
                                <span className="week__sec-title">{formatDisplayTitle(sec.title)}</span>
                                <span className="week__sec-meta">
                                  {[sec.difficulty && `${sec.difficulty} · ${sec.priority}`, sec.minutes && `${sec.minutes} 分钟`]
                                    .filter(Boolean)
                                    .join(' · ')}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {pathItem.checkpoints && pathItem.checkpoints.length > 0 && (
        <section className="progress-block" aria-labelledby="checkpoints-heading">
          <div className="progress-block__head">
            <div>
              <h2 id="checkpoints-heading">阶段自测</h2>
              <p>到这几个节点时，合上书检查下面的内容能否独立完成。</p>
            </div>
          </div>
          <ul className="list">
            {pathItem.checkpoints.map((cp, idx) => (
              <li key={idx} className="checkpoint">
                <span className="checkpoint__when">第 {cp.afterWeek} 周后</span>
                <div>
                  <h3>{cp.title}</h3>
                  <p>{cp.description}</p>
                  {cp.sectionIds.length > 0 && (
                    <div className="checkpoint__links">
                      {cp.sectionIds.map((sid) => {
                        const sec = sectionLookup.get(sid);
                        return sec ? (
                          <Link key={sid} to={learnPath(sec.chapterId, sec.anchor || sec.id)}>
                            {sec.number}
                          </Link>
                        ) : (
                          <span key={sid}>{sid}</span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};
