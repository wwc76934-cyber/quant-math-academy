import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DifficultyBadge } from '../components/metadata/DifficultyBadge';
import { PriorityBadge } from '../components/metadata/PriorityBadge';
import { ErrorState } from '../components/ui/ErrorState';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import {
  formatCurrentDate,
  formatNumber,
  formatPartNumber,
  formatPercentage,
} from '../lib/format';
import { learnPath, syllabusPath } from '../lib/paths';

export const HomePage: React.FC = () => {
  const { store } = useStore();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadBook();
      setBook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookData();
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

  const pilotSet = useMemo(() => {
    return new Set(book?.pilotChapterIds || ['c01', 'c08', 'c11', 'c33']);
  }, [book]);

  const pilotChapters = useMemo(() => {
    if (!book) return [];
    return book.chapters.filter((c) => pilotSet.has(c.id));
  }, [book, pilotSet]);

  const pilotExercisesCount = useMemo(() => {
    return pilotChapters.reduce((acc, c) => acc + (c.exerciseCount || 0), 0);
  }, [pilotChapters]);

  // Determine continue card data
  const continueData = useMemo(() => {
    if (!book || !store.lastLocation) return null;
    const { chapterId, sectionId } = store.lastLocation;
    if (!pilotSet.has(chapterId)) return null;

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
  }, [book, store.lastLocation, store.progress, pilotSet]);

  // Next section in pilot chapters for Today panel.
  // Prefer the chapter the learner last opened so “today” does not jump back
  // to chapter 1 while they are reading chapter 11.
  const nextSectionData = useMemo(() => {
    if (!book) return null;

    const ordered = [...pilotChapters];
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
          };
        }
      }
    }
    return null;
  }, [book, pilotChapters, store.progress, store.lastLocation]);

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
          onRetry={fetchBookData}
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
                已完成试点章
                <small>其余章节正在接入中</small>
              </span>
            )}
          </div>

          <div className="today__row">
            <span className="label">待复习</span>
            <span className="value">
              复习将在 Phase 3 开放
              <small>基于艾宾浩斯遗忘曲线的复习队列</small>
            </span>
            <span className="arrow muted" title="Phase 3 开放" aria-hidden="true">
              →
            </span>
          </div>

          <div className="today__row">
            <span className="label">练习</span>
            <span className="value">
              试点章共 {pilotExercisesCount} 题
              <small>练习系统与错题本即将在 Phase 3 开放</small>
            </span>
            <span className="arrow muted" title="Phase 3 开放" aria-hidden="true">
              →
            </span>
          </div>
        </aside>
      </div>

      {/* 4. Learning Paths */}
      <div className="section-head">
        <h2>学习路径</h2>
        <span className="small muted">Phase 3 开放交互式规划</span>
      </div>
      <div className="path-grid">
        <div className="path-card">
          <span className="path-card__mode">PATH A</span>
          <h3>量化实习冲刺</h3>
          <p>
            只覆盖 P0 与高相关 P1，优先可计算、可解释、高频的知识点；非必要长证明后置。
          </p>
          <div className="path-card__meta">
            <span>6 周</span>
            <span>每周 9h</span>
            <span>58 个知识点</span>
          </div>
        </div>

        <div className="path-card">
          <span className="path-card__mode">PATH B</span>
          <h3>系统数学进阶</h3>
          <p>
            按教材顺序完整学习，保留证明与理论深度，适合六个月以上的系统进阶。
          </p>
          <div className="path-card__meta">
            <span>22 周</span>
            <span>每周 7h</span>
            <span>全部 219 节</span>
          </div>
        </div>

        <div className="path-card">
          <span className="path-card__mode">PATH C</span>
          <h3>量化研究应用</h3>
          <p>
            从因子、组合、时序、风险与定价问题出发，按先修闭包补齐数学工具。
          </p>
          <div className="path-card__meta">
            <span>15 周</span>
            <span>每周 8h</span>
            <span>应用簇 + 先修</span>
          </div>
        </div>
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
