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
  formatChinesePartLabel,
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
        <p className="page-loading" role="status">正在载入目录…</p>
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
      {/* 1. Masthead: what this is, plus search. Kept short so returning learners reach their work fast. */}
      <header className={`masthead${continueData ? ' masthead--compact' : ''}`}>
        <div>
          <h1>量化数学进阶教材</h1>
          <p>
            从数学语言、线性代数、概率统计，到随机分析、时间序列与量化研究。
            每节标注难度与优先级，习题附完整解析。
          </p>
          <form
            className="home-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const input = (e.currentTarget.elements.namedItem('homeSearch') as HTMLInputElement)?.value;
              navigate(input ? `/search?q=${encodeURIComponent(input.trim())}` : '/search');
            }}
          >
            <input
              name="homeSearch"
              type="search"
              placeholder="搜索定理、公式或概念，如 Cholesky、鞅、夏普比率"
              aria-label="搜索教材内容"
            />
            <Button type="submit" variant="primary" size="md">
              搜索
            </Button>
          </form>
        </div>
        <dl className="masthead__meta">
          <div>
            <dt>篇 / 章</dt>
            <dd>
              {book.parts.length} / {book.chapters.length}
            </dd>
          </div>
          <div>
            <dt>小节</dt>
            <dd>{totalSections}</dd>
          </div>
          <div>
            <dt>习题</dt>
            <dd>{formatNumber(totalExercisesCount)}</dd>
          </div>
          <div>
            <dt>独立公式</dt>
            <dd>{formatNumber(totalEquations)}</dd>
          </div>
        </dl>
      </header>

      {/* 2 & 3. Grid: Continue Learning + Today */}
      <div className="home-grid">
        {continueData ? (
          <section className="continue-card" aria-labelledby="continue-heading">
            <div>
              <div className="continue-card__label">
                <span className="kicker">上次读到</span>
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
                {continueData.section.number} {continueData.section.title}
              </div>
              <div className="bar">
                <i style={{ width: `${continueData.percentage}%` }} />
              </div>
              <div className="continue-card__foot">
                <Link
                  to={learnPath(
                    continueData.chapter.id,
                    continueData.section.anchor || continueData.section.id
                  )}
                  className="btn btn--primary"
                >
                  继续阅读
                </Link>
                <span className="continue-card__pct">
                  本章已完成 {continueData.completed} / {continueData.total} 节
                </span>
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
                <span className="kicker">第一次来</span>
              </div>
              <h2 id="continue-empty-heading">从第 1 章读起，或先选一条路径</h2>
              <div className="section">
                第 1 章讲数学语言、证明方法与实数完备性，是全书的公共基础。
                如果目标明确（比如准备量化实习面试），学习路径会给出按周排好的章节。
              </div>
              <div className="continue-card__foot">
                <Link to={learnPath('c01')} className="btn btn--primary">
                  从第 1 章开始
                </Link>
                <Link to={pathsPath()} className="btn btn--secondary">
                  选择学习路径
                </Link>
                <Link to={syllabusPath()} className="btn btn--ghost">
                  查看完整目录
                </Link>
              </div>
            </div>
          </section>
        )}

        <aside className="today" aria-label="今天">
          <div className="today__head">
            <span className="kicker">今天</span>
            <span className="small muted">{formatCurrentDate()}</span>
          </div>

          <div className="today__row">
            <span className="label">下一节</span>
            {nextSectionData ? (
              <>
                <span className="value">
                  {nextSectionData.section.number} {nextSectionData.section.title}
                  <small>
                    {[
                      nextSectionData.sourcePathTitle,
                      nextSectionData.section.minutes
                        ? `约 ${nextSectionData.section.minutes} 分钟`
                        : null,
                      nextSectionData.section.priority,
                    ]
                      .filter(Boolean)
                      .join(' · ') || nextSectionData.chapter.title}
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
                全部小节已读完
                <small>剩下的是复习和错题</small>
              </span>
            )}
          </div>

          <div className="today__row">
            <span className="label">复习</span>
            <span className="value">
              {dueReviewsCount > 0 ? (
                <>
                  {dueReviewsCount} 道错题今天到期
                  <small>错题本共 {wrongCount} 道</small>
                </>
              ) : wrongCount > 0 ? (
                <>
                  今天没有到期的错题
                  <small>错题本共 {wrongCount} 道</small>
                </>
              ) : (
                <>
                  还没有错题
                  <small>练习中做错的题会自动收进错题本</small>
                </>
              )}
            </span>
            <Link to="/practice/wrong" className="arrow" aria-label="打开错题本">
              →
            </Link>
          </div>

          <div className="today__row">
            <span className="label">练习</span>
            <span className="value">
              {practicedExercisesCount > 0 ? (
                <>
                  已做 {practicedExercisesCount} / {totalExercisesCount} 题
                  <small>按章节继续练习</small>
                </>
              ) : (
                <>
                  共 {totalExercisesCount} 道习题
                  <small>按章节练习，答完可看解析</small>
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
        <Link to={pathsPath()}>查看周计划</Link>
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
          const modeLabel = path.code === 'D' ? '自由阅读' : `路径 ${path.code}`;
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
              <div className="path-card__top">
                <span className="path-card__mode">{modeLabel}</span>
                {isCurrent && <span className="path-card__current">正在进行</span>}
              </div>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className="path-card__meta">
                {path.id === 'free' ? (
                  <>
                    <span>不限进度</span>
                    <span>全书 {totalSecs} 节</span>
                    {pct > 0 && <span>已完成 {pct}%</span>}
                  </>
                ) : (
                  <>
                    <span>{path.weeks} 周</span>
                    <span>每周约 {targetHoursPerWeek} 小时</span>
                    <span>{path.totalSections} 节</span>
                    {pct > 0 && <span>已完成 {pct}%</span>}
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 5. Full Book Map */}
      <div className="section-head">
        <h2>全书八篇</h2>
        <Link to={syllabusPath()}>完整目录</Link>
      </div>
      <div className="part-map">
        {partProgressList.map(({ part, percentage }) => (
          <Link
            key={part.id}
            to={`${syllabusPath()}#${part.id}`}
            className="part-row"
          >
            <span className="part-row__num">
              {formatChinesePartLabel(part.order)}
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
      <p className="home-note">
        不需要注册。进度、笔记和错题只存在这台设备的浏览器里，可在
        <Link to={progressPath()}>学习进度</Link>
        页导出备份，换设备时再导入。
      </p>
    </main>
  );
};
