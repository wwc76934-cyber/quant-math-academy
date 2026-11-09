import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DifficultyBadge } from '../components/metadata/DifficultyBadge';
import { PriorityBadge } from '../components/metadata/PriorityBadge';
import { Button } from '../components/ui/Button';
import { ErrorState } from '../components/ui/ErrorState';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { getPathSectionIds, loadPathsData, normalizePathId } from '../features/paths/loadPaths';
import { PathsFile } from '../features/paths/types';
import { useStore } from '../features/store/store';
import {
  formatCurrentDate,
  formatNumber,
  formatPartNumber,
  formatPercentage,
} from '../lib/format';
import { learnPath, pathsPath, practicePath, progressPath, syllabusPath } from '../lib/paths';

export const HomePage: React.FC = () => {
  const { store } = useStore();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [pathsData, setPathsData] = useState<PathsFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPageData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookData, pData] = await Promise.all([
        loadBook(),
        loadPathsData().catch(() => null),
      ]);
      setBook(bookData);
      setPathsData(pData);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  const totalSections = useMemo(() => {
    if (!book) return 0;
    return book.chapters.reduce(
      (acc, c) => acc + (c.sectionCount || c.sections.length),
      0
    );
  }, [book]);

  const totalEquations = useMemo(() => {
    if (!book) return 0;
    return book.chapters.reduce(
      (acc, c) => acc + (c.stats?.displayEquations || 0),
      0
    );
  }, [book]);

  const readableChapters = useMemo(() => {
    return book?.chapters || [];
  }, [book]);

  const totalExercisesCount = useMemo(() => {
    return readableChapters.reduce((acc, c) => acc + (c.exerciseCount || 0), 0);
  }, [readableChapters]);

  // Determine continue card data
  const continueData = useMemo(() => {
    if (!book || !store.lastLocation) return null;
    const { chapterId, sectionId } = store.lastLocation;

    const chapter = book.chapters.find((c) => c.id === chapterId);
    if (!chapter) return null;

    const section = chapter.sections.find((s) => s.id === sectionId);
    if (!section) return null;

    let completed = 0;
    chapter.sections.forEach((s) => {
      const status = store.progress[s.id]?.status;
      if (status === 'done' || status === 'master') completed++;
    });

    const pct = chapter.sections.length > 0
      ? Math.round((completed / chapter.sections.length) * 100)
      : 0;

    return {
      chapter,
      section,
      completed,
      total: chapter.sections.length,
      percentage: pct,
    };
  }, [book, store.lastLocation, store.progress]);

  const activePathId = normalizePathId(store.path.active);
  const activePath = useMemo(() => {
    if (!pathsData) return null;
    return pathsData.paths.find((p) => p.id === activePathId) || null;
  }, [pathsData, activePathId]);

  // Next section across the whole book for Today panel.
  // 1. Prefer the active path (if non-free and has incomplete sections)
  // 2. Otherwise prefer the chapter the learner last opened so “today” does not jump back
  const nextSectionData = useMemo(() => {
    if (!book) return null;

    // Helper map of all sections in the book
    const sectionMap = new Map<
      string,
      { chapter: Book['chapters'][0]; section: Book['chapters'][0]['sections'][0] }
    >();
    for (const chapter of readableChapters) {
      for (const section of chapter.sections) {
        sectionMap.set(section.id, { chapter, section });
      }
    }

    const activeSectionIds = getPathSectionIds(activePath);
    if (activePath && activePath.id !== 'free' && activeSectionIds.length > 0) {
      for (const sid of activeSectionIds) {
        const item = store.progress[sid];
        if (!item || (item.status !== 'done' && item.status !== 'master')) {
          const found = sectionMap.get(sid);
          if (found) {
            return {
              chapter: found.chapter,
              section: found.section,
              sourcePathTitle: activePath.title,
            };
          }
        }
      }
    }

    const ordered = [...readableChapters];
    const lastChapterId = store.lastLocation?.chapterId;
    if (lastChapterId) {
      const idx = ordered.findIndex((c) => c.id === lastChapterId);
      if (idx > 0) {
        const [current] = ordered.splice(idx, 1);
        ordered.unshift(current);
      }
    }

    for (const chapter of ordered) {
      for (const section of chapter.sections) {
        const item = store.progress[section.id];
        if (!item || (item.status !== 'done' && item.status !== 'master')) {
          return {
            chapter,
            section,
            sourcePathTitle: null,
          };
        }
      }
    }
    return null;
  }, [book, readableChapters, store.progress, store.lastLocation, activePath]);

  // Practice & review stats for Today panel
  const dueReviewsCount = useMemo(() => {
    const nowIso = new Date().toISOString();
    return Object.values(store.review).filter((r) => r.dueAt <= nowIso).length;
  }, [store.review]);

  const wrongCount = useMemo(() => {
    return Object.keys(store.review).length;
  }, [store.review]);

  const practicedExercisesCount = useMemo(() => {
    return Object.values(store.exercises).filter((e) => e.status !== 'unseen').length;
  }, [store.exercises]);

  // Part map progress calculation
  const partProgressList = useMemo(() => {
    if (!book) return [];

    return book.parts.map((part) => {
      let partSectionsTotal = 0;
      let partSectionsCompleted = 0;

      part.chapterIds.forEach((chapId) => {
        const ch = book.chapters.find((c) => c.id === chapId);
        if (ch) {
          partSectionsTotal += ch.sections.length;
          ch.sections.forEach((s) => {
            const status = store.progress[s.id]?.status;
            if (status === 'done' || status === 'master') {
              partSectionsCompleted++;
            }
          });
        }
      });

      const pct =
        partSectionsTotal > 0
          ? Math.round((partSectionsCompleted / partSectionsTotal) * 100)
          : 0;

      return {
        part,
        percentage: pct,
      };
    });
  }, [book, store.progress]);

  if (loading) {
    return (
      <main className="home shell" id="main-content">
        <header className="masthead">
          <div>
            <div className="kicker">Quant Math Academy · 2026</div>
            <h1>
              量化数学，
              <br />
              从知道学什么开始。
            </h1>
            <p>加载中...</p>
          </div>
        </header>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="home shell" id="main-content">
        <ErrorState
          message={error || '加载教材数据失败'}
          onRetry={fetchPageData}
          showReturnToSyllabus={false}
        />
      </main>
    );
  }

  return (
    <main className="home shell" id="main-content">
      {/* 1. Masthead */}
      <header className="masthead">
        <div>
          <div className="kicker">Quant Math Academy · 2026</div>
          <h1>
            量化数学，
            <br />
            从知道学什么开始。
          </h1>
          <p>
            以《量化数学进阶教材》为底本的结构化学习系统。8 篇 34 章，按难度与必要性重新组织，让一千多页的数学书变成每天可以推进的学习路径。
          </p>
          <form
            className="home-search-bar"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('homeSearch') as HTMLInputElement)?.value;
              navigate(input ? `/search?q=${encodeURIComponent(input.trim())}` : '/search');
            }}
            style={{
              display: 'flex',
              gap: '8px',
              maxWidth: '520px',
              marginTop: '16px',
            }}
          >
            <input
              name="homeSearch"
              type="search"
              placeholder="搜索公式、定理、习题（按 / 快速检索）..."
              aria-label="搜索教材内容"
              style={{
                flex: 1,
                height: '40px',
                padding: '0 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid var(--line)',
                background: 'var(--bg-elevated)',
                color: 'var(--ink)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <Button type="submit" variant="primary" size="md">
              搜索
            </Button>
          </form>
        </div>
        <div className="masthead__meta">
          <div>
            <strong>{book.chapters.length}</strong>
            <span>章 / {book.parts.length} 篇</span>
          </div>
          <div>
            <strong>{totalSections}</strong>
            <span>个知识点</span>
          </div>
          <div>
            <strong>{formatNumber(totalEquations)}</strong>
            <span>条公式</span>
          </div>
          <div>
            <strong>
              {continueData ? `${continueData.percentage}%` : '—'}
            </strong>
            <span>当前章进度</span>
          </div>
        </div>
      </header>

      {/* 2 & 3. Grid: Continue Learning + Today */}
      <div className="home-grid">
        {continueData ? (
          <section className="continue-card" aria-labelledby="continue-heading">
            <div>
              <div className="continue-card__label">
                <span className="kicker">继续学习</span>
                {continueData.section.priority && (
                  <PriorityBadge priority={continueData.section.priority} />
                )}
                {continueData.section.difficulty && (
                  <DifficultyBadge level={continueData.section.difficulty} />
                )}
              </div>
              <h2 id="continue-heading">
                {continueData.chapter.label}　{continueData.chapter.title}
              </h2>
              <div className="section">
                {continueData.section.number} {continueData.section.title} · 上次学习位置
              </div>
              <div className="bar">
                <i style={{ width: `${continueData.percentage}%` }} />
              </div>
              <div className="continue-card__foot">
                <span className="continue-card__pct">
                  本章 {continueData.percentage}% · 已完成 {continueData.completed} / {continueData.total} 节
                </span>
                <Link
                  to={learnPath(
                    continueData.chapter.id,
                    continueData.section.anchor || continueData.section.id
                  )}
                  className="btn btn--primary"
                >
                  继续阅读 →
                </Link>
              </div>
            </div>
            <div className="ring" aria-hidden="true">
              <span>{continueData.percentage}%</span>
            </div>
          </section>
        ) : (
          <section className="continue-card continue-card--empty" aria-labelledby="continue-empty-heading">
            <div>
              <div className="continue-card__label">
                <span className="kicker">开始学习</span>
              </div>
              <h2 id="continue-heading">从第一篇基础开始</h2>
              <div className="section">
                建议从第 1 章《数学语言、证明方法与实数完备性》开启学习，或直接查看完整教材目录。
              </div>
              <div className="continue-card__foot">
                <Link to={learnPath('c01')} className="btn btn--primary">
                  从第 1 章开始 →
                </Link>
                <Link to={syllabusPath()} className="btn btn--secondary">
                  查看完整目录
                </Link>
              </div>
            </div>
          </section>
        )}

        <aside className="today" aria-label="今日面板">
          <div className="today__head">
            <span className="kicker">今日</span>
            <span className="small muted">{formatCurrentDate()}</span>
          </div>

          <div className="today__row">
            <span className="label">下一节</span>
            {nextSectionData ? (
              <>
                <span className="value">
                  {nextSectionData.section.number} {nextSectionData.section.title}
                  <small>
                    {nextSectionData.sourcePathTitle
                      ? `${nextSectionData.sourcePathTitle} · `
                      : ''}
                    {nextSectionData.section.minutes
                      ? `预计 ${nextSectionData.section.minutes} 分钟`
                      : '标注完善中'}
                    {nextSectionData.section.priority
                      ? ` · ${nextSectionData.section.priority}`
                      : ''}
                  </small>
                </span>
                <Link
                  to={learnPath(
                    nextSectionData.chapter.id,
                    nextSectionData.section.anchor || nextSectionData.section.id
                  )}
                  className="arrow"
                  aria-label={`开始学习 ${nextSectionData.section.title}`}
                >
                  →
                </Link>
              </>
            ) : (
              <span className="value">
                全书已学完
                <small>可开始复习与错题回顾</small>
              </span>
            )}
          </div>

          <div className="today__row">
            <span className="label">待复习</span>
            <span className="value">
              {dueReviewsCount > 0 ? (
                <>
                  {dueReviewsCount} 道题目今日到期
                  <small>错题本共 {wrongCount} 道 · 基于间隔复习</small>
                </>
              ) : (
                <>
                  今日无待复习题目
                  <small>错题本共 {wrongCount} 道 · 保持复习节奏</small>
                </>
              )}
            </span>
            <Link to={progressPath()} className="arrow" aria-label="查看待复习列表">
              →
            </Link>
          </div>

          <div className="today__row">
            <span className="label">练习</span>
            <span className="value">
              {practicedExercisesCount > 0 ? (
                <>
                  已练习 {practicedExercisesCount} / {totalExercisesCount} 题
                  <small>覆盖全书 34 章节练习题库</small>
                </>
              ) : (
                <>
                  全书共 {totalExercisesCount} 题
                  <small>进入章节题库与演练模式</small>
                </>
              )}
            </span>
            <Link to={practicePath()} className="arrow" aria-label="前往练习页面">
              →
            </Link>
          </div>
        </aside>
      </div>

      {/* 4. Learning Paths */}
      <div className="section-head">
        <h2>学习路径</h2>
        <Link to={pathsPath()}>完整规划与周计划 →</Link>
      </div>
      <div className="path-grid">
        {(pathsData?.paths || []).map((path) => {
          const isCurrent = path.id === activePathId;
          const sectionIds = getPathSectionIds(path);
          const completedCount =
            path.id === 'free'
              ? Object.values(store.progress).filter(
                  (p) => p.status === 'done' || p.status === 'master'
                ).length
              : sectionIds.filter((sid) => {
                  const s = store.progress[sid];
                  return s && (s.status === 'done' || s.status === 'master');
                }).length;
          const totalSecs = path.id === 'free' ? 219 : path.totalSections;
          const pct =
            totalSecs > 0 ? Math.round((completedCount / totalSecs) * 100) : 0;
          const modeLabel = path.code === 'D' ? 'FREE' : `PATH ${path.code}`;
          const targetHoursPerWeek =
            path.weeks > 0
              ? Math.round(path.totalEstimatedMinutes / 60 / path.weeks)
              : 0;

          return (
            <Link
              key={path.id}
              to={`/paths/${path.id}`}
              className={`path-card ${isCurrent ? 'path-card--active' : ''}`}
              aria-label={`查看学习路径：${path.title}`}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '4px',
                }}
              >
                <span className="path-card__mode">{modeLabel}</span>
                {isCurrent && (
                  <span
                    className="badge badge--p0"
                    style={{ fontSize: '9px', height: '18px' }}
                  >
                    当前主路径
                  </span>
                )}
              </div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="path-card__meta">
                {path.id === 'free' ? (
                  <>
                    <span>自由节奏</span>
                    <span>全书 {totalSecs} 节</span>
                    <span>已学 {pct}%</span>
                  </>
                ) : (
                  <>
                    <span>{path.weeks} 周</span>
                    <span>约 {targetHoursPerWeek}h/周</span>
                    <span>
                      {path.totalSections} 节 ({pct}%)
                    </span>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 5. Full Book Map */}
      <div className="section-head">
        <h2>全书地图</h2>
        <Link to={syllabusPath()}>完整目录 →</Link>
      </div>
      <div className="part-map">
        {partProgressList.map(({ part, percentage }) => (
          <Link
            key={part.id}
            to={`${syllabusPath()}#${part.id}`}
            className="part-row"
          >
            <span className="part-row__num">
              {formatPartNumber(part.order)}
            </span>
            <span className="part-row__title">{part.title}</span>
            <span className="part-row__bar">
              <i style={{ width: `${percentage}%` }} />
            </span>
            <span className="part-row__pct">{formatPercentage(percentage)}</span>
          </Link>
        ))}
      </div>

      {/* 6. Data note */}
      <p className="small muted" style={{ marginTop: '32px' }}>
        学习记录仅保存在本机。你可以随时在“学习进度”中导出全部数据（Phase 3 开放导出功能）。
      </p>
    </main>
  );
};
