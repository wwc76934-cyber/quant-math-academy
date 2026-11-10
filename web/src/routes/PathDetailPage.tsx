import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    setToastMessage(`已将「${pathItem.title}」设为当前主路径！阅读进度与记录均完整保留。`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const isCurrentActive = normalizePathId(store.path?.active) === canonicalMode;

  if (loading) {
    return (
      <main className="content paths-detail-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载学习路径详情...</p>
      </main>
    );
  }

  if (error || !pathsData) {
    return (
      <main className="content paths-detail-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '16px', background: 'var(--accent-light, #fdf2f2)', border: '1px solid var(--accent, #e53e3e)', borderRadius: '4px' }}>
          <h3>加载失败</h3>
          <p>{error || '无法获取学习路径数据'}</p>
          <Link to={pathsPath()} className="btn btn--secondary" style={{ marginTop: '12px', display: 'inline-block' }}>
            返回学习路径列表
          </Link>
        </div>
      </main>
    );
  }

  if (!pathItem) {
    return (
      <main className="content paths-detail-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ padding: '24px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px' }}>
          <h2>未找到指定学习路径</h2>
          <p className="muted">未能识别路径标识 "{mode}"，请在全览页选择有效路径。</p>
          <Link to={pathsPath()} className="btn btn--primary" style={{ marginTop: '12px', display: 'inline-block' }}>
            查看所有学习路径 →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="content paths-detail-page"
      style={{
        padding: '32px 24px 64px',
        maxWidth: '960px',
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Toast Notice */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            background: 'var(--accent, #1a56db)',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '13px',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Back link */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          to={pathsPath()}
          style={{
            fontSize: '13px',
            color: 'var(--muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            textDecoration: 'none',
          }}
        >
          ← 返回学习路径总览
        </Link>
      </div>

      {/* Path Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border, #e5e5e0)',
          paddingBottom: '24px',
          marginBottom: '28px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.05em',
              background: 'var(--bg-hover, #f0f0eb)',
              color: 'var(--text-secondary, #444)',
              padding: '2px 8px',
              borderRadius: '3px',
            }}
          >
            PATH {pathItem.code}
          </span>

          {isCurrentActive ? (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#ffffff',
                background: 'var(--accent, #1a56db)',
                padding: '2px 8px',
                borderRadius: '10px',
              }}
            >
              当前主路径
            </span>
          ) : (
            <button
              type="button"
              className="btn btn--outline"
              onClick={handleSetActive}
              style={{
                fontSize: '12px',
                padding: '3px 10px',
                cursor: 'pointer',
              }}
            >
              设为当前主路径
            </button>
          )}
        </div>

        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 10px', fontWeight: 600, color: 'var(--text)' }}>
          {pathItem.title}
        </h1>

        <p style={{ margin: '0 0 16px', fontSize: '15px', lineHeight: 1.6, color: 'var(--text-secondary, #444)' }}>
          {pathItem.description}
        </p>

        {/* Path Meta Summary */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'var(--bg-card, #fbfbf9)',
            border: '1px solid var(--border, #e5e5e0)',
            borderRadius: '4px',
            padding: '14px 18px',
            fontSize: '13px',
          }}
        >
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '11px', marginBottom: '2px' }}>周期规划</span>
            <strong style={{ fontSize: '15px' }}>{pathItem.weeks > 0 ? `${pathItem.weeks} 周` : '自定节奏'}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '11px', marginBottom: '2px' }}>预计总学时</span>
            <strong style={{ fontSize: '15px' }}>
              {pathItem.totalEstimatedMinutes > 0 ? `约 ${Math.round(pathItem.totalEstimatedMinutes / 60)} 小时` : '自由查阅'}
            </strong>
          </div>
          <div>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '11px', marginBottom: '2px' }}>已完成进度</span>
            <strong style={{ fontSize: '15px', color: 'var(--accent, #1a56db)' }}>
              {progressStats.completed} / {progressStats.total} 节 ({progressStats.percentage}%)
            </strong>
          </div>
          <div style={{ flex: 1, minWidth: '180px' }}>
            <span style={{ color: 'var(--muted)', display: 'block', fontSize: '11px', marginBottom: '2px' }}>适合对象</span>
            <span style={{ color: 'var(--text-secondary, #444)' }}>{pathItem.audience}</span>
          </div>
        </div>
      </header>

      {/* Honest Principles & Reminder */}
      <section style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          学习原则与要求
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: 1.7, color: 'var(--text-secondary, #444)' }}>
          {pathItem.principles.map((pr, idx) => (
            <li key={idx}>{pr}</li>
          ))}
        </ul>
      </section>

      {/* Recommendation Block (Next Section / This Week) */}
      {pathItem.id !== 'free' && (
        <section
          style={{
            background: 'var(--bg-card, #ffffff)',
            border: '2px solid var(--accent, #1a56db)',
            borderRadius: '6px',
            padding: '18px 20px',
            marginBottom: '32px',
          }}
          aria-label="自适应推荐区块"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="kicker" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', color: 'var(--accent, #1a56db)' }}>
              RECOMMENDED NEXT · 推荐下一节
            </span>
            {recommendation && 'week' in recommendation && (
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                当前进度定位：第 {recommendation.week} 周
              </span>
            )}
          </div>

          {recommendation && 'section' in recommendation && recommendation.section ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '4px' }}>
                  本周主题：{recommendation.weekTheme}
                </div>
                <h3 style={{ fontSize: '17px', margin: '0 0 6px', fontFamily: 'var(--font-serif)', color: 'var(--text)' }}>
                  {recommendation.section.number} {formatDisplayTitle(recommendation.section.title)}
                </h3>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                  <span>第 {recommendation.section.chapterNumber} 章</span>
                  <span>·</span>
                  <span>{recommendation.section.minutes ? `预计 ${recommendation.section.minutes} 分钟` : '标注完善中'}</span>
                  {recommendation.section.difficulty ? (
                    <>
                      <span>·</span>
                      <span style={{ color: 'var(--text)' }}>{recommendation.section.difficulty} / {recommendation.section.priority}</span>
                    </>
                  ) : (
                    <>
                      <span>·</span>
                      <span style={{ color: 'var(--muted)' }}>标注完善中</span>
                    </>
                  )}
                </div>
              </div>

              <Link
                to={learnPath(recommendation.section.chapterId, recommendation.section.anchor || recommendation.section.id)}
                className="btn btn--primary"
                style={{
                  padding: '9px 18px',
                  fontSize: '14px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}
              >
                开始学习此节 →
              </Link>
            </div>
          ) : recommendation && 'allCompleted' in recommendation ? (
            <div style={{ padding: '8px 0' }}>
              <h4 style={{ margin: '0 0 4px', color: 'var(--text)', fontSize: '16px' }}>🎉 恭喜！本路径所有规划节均已完成</h4>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                你已完整学完全部规划内容。可随时回顾错题、复习重点定理，或切换至更深入的进阶路径。
              </p>
            </div>
          ) : (
            <p className="muted" style={{ margin: 0, fontSize: '13px' }}>暂无可推荐的后续节。</p>
          )}
        </section>
      )}

      {/* Free mode content */}
      {pathItem.id === 'free' && (
        <section
          style={{
            background: 'var(--bg-card, #fbfbf9)',
            border: '1px solid var(--border, #e5e5e0)',
            borderRadius: '6px',
            padding: '24px 20px',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontFamily: 'var(--font-serif)' }}>自由探索模式</h3>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary, #444)', margin: '0 0 16px' }}>
            在自由学习模式下，系统不会安排固定的周任务，你可以根据个人节奏随时查阅全书 34 章 219 节的任意知识点。首页的“今日”面板将智能关联你最近一次阅读的章节位置。
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to={syllabusPath()} className="btn btn--primary">
              前往全书完整目录 →
            </Link>
            <Link to={pathsPath()} className="btn btn--secondary">
              切换为结构化周计划路径
            </Link>
          </div>
        </section>
      )}

      {/* Weeks Timeline */}
      {pathItem.weeksPlan.length > 0 && (
        <section aria-label="周计划时间线">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0, fontWeight: 600 }}>
              周计划详情 ({pathItem.weeksPlan.length} 周)
            </h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn btn--outline"
                style={{ fontSize: '12px', padding: '4px 10px', cursor: 'pointer' }}
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
              <button
                type="button"
                className="btn btn--outline"
                style={{ fontSize: '12px', padding: '4px 10px', cursor: 'pointer' }}
                onClick={() => setExpandedWeeks({})}
              >
                折叠全部
              </button>
            </div>
          </div>

          <div className="weeks-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pathItem.weeksPlan.map((wp: WeekPlanItem) => {
              const isExpanded = !!expandedWeeks[wp.week];

              // Calculate week progress
              let weekCompleted = 0;
              for (const sid of wp.sectionIds) {
                const item = store.progress[sid];
                if (item && (item.status === 'done' || item.status === 'master')) {
                  weekCompleted++;
                }
              }
              const weekTotal = wp.sectionIds.length;
              const weekPct = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0;
              const isWeekFullyDone = weekCompleted === weekTotal;

              return (
                <div
                  key={wp.week}
                  className={`week-card ${isWeekFullyDone ? 'is-done' : ''}`}
                  style={{
                    background: 'var(--bg-card, #ffffff)',
                    border: isWeekFullyDone ? '1px solid var(--border-success, #c6e6cb)' : '1px solid var(--border, #e5e5e0)',
                    borderRadius: '6px',
                    overflow: 'hidden',
                  }}
                >
                  {/* Week Card Header */}
                  <div
                    onClick={() => toggleWeek(wp.week)}
                    style={{
                      padding: '14px 18px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      background: isWeekFullyDone ? 'var(--bg-success-subtle, #f6fcf7)' : 'var(--bg-card, #ffffff)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontWeight: 700,
                          fontSize: '12px',
                          color: isWeekFullyDone ? 'var(--success, #22863a)' : 'var(--text-secondary, #444)',
                          background: isWeekFullyDone ? '#e6f4ea' : 'var(--bg-hover, #f0f0eb)',
                          padding: '2px 8px',
                          borderRadius: '3px',
                        }}
                      >
                        WEEK {wp.week.toString().padStart(2, '0')}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>
                        {wp.theme}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px' }}>
                      <span style={{ color: 'var(--muted)' }}>
                        预计 {Math.round(wp.estimatedMinutes / 60)}h
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: isWeekFullyDone ? 'var(--success, #22863a)' : 'var(--text)',
                        }}
                      >
                        {weekCompleted} / {weekTotal} 节 ({weekPct}%)
                      </span>
                      <span style={{ color: 'var(--muted)', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* Week Card Body (Expanded) */}
                  {isExpanded && (
                    <div
                      style={{
                        padding: '14px 18px 18px',
                        borderTop: '1px solid var(--border, #e5e5e0)',
                        background: 'var(--bg-card, #ffffff)',
                      }}
                    >
                      <p style={{ margin: '0 0 12px', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
                        <strong>目标输出：</strong>{wp.outcome}
                      </p>

                      {/* Sections List */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {wp.sectionIds.map((sid) => {
                          const sec = sectionLookup.get(sid);
                          const item = store.progress[sid];
                          const isDone = item && (item.status === 'done' || item.status === 'master');

                          if (!sec) {
                            return (
                              <div key={sid} style={{ fontSize: '12px', color: 'var(--muted)' }}>
                                {sid} (信息加载中)
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={sid}
                              to={learnPath(sec.chapterId, sec.anchor || sec.id)}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 12px',
                                background: isDone ? 'var(--bg-hover, #fbfbf9)' : 'transparent',
                                border: '1px solid var(--border, #eee)',
                                borderRadius: '4px',
                                textDecoration: 'none',
                                color: 'inherit',
                                fontSize: '13px',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '16px',
                                    height: '16px',
                                    borderRadius: '50%',
                                    border: isDone ? 'none' : '1px solid var(--border)',
                                    background: isDone ? 'var(--success, #22863a)' : 'transparent',
                                    color: '#fff',
                                    fontSize: '10px',
                                    textAlign: 'center',
                                    lineHeight: '16px',
                                  }}
                                >
                                  {isDone ? '✓' : ''}
                                </span>

                                <span style={{ fontFamily: 'var(--font-mono, monospace)', color: 'var(--muted)', fontSize: '12px' }}>
                                  {sec.number}
                                </span>

                                <span style={{ fontWeight: 500, color: 'var(--text)' }}>
                                  {formatDisplayTitle(sec.title)}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                                {sec.difficulty ? (
                                  <span style={{ color: 'var(--muted)' }}>
                                    {sec.difficulty} · {sec.priority}
                                  </span>
                                ) : (
                                  <span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                                    标注完善中
                                  </span>
                                )}

                                <span style={{ color: 'var(--muted)' }}>
                                  {sec.minutes ? `${sec.minutes}m` : ''}
                                </span>

                                <span style={{ color: 'var(--accent, #1a56db)' }}>
                                  →
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Checkpoints Section (If present) */}
      {pathItem.checkpoints && pathItem.checkpoints.length > 0 && (
        <section style={{ marginTop: '36px' }}>
          <h2 style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', margin: '0 0 14px', fontWeight: 600 }}>
            阶段性复盘与里程碑检查点
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {pathItem.checkpoints.map((cp, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card, #fbfbf9)',
                  border: '1px solid var(--border, #e5e5e0)',
                  borderRadius: '6px',
                  padding: '16px',
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="kicker" style={{ fontSize: '11px', color: 'var(--accent, #1a56db)' }}>
                    CHECKPOINT · 第 {cp.afterWeek} 周后
                  </span>
                </div>
                <h4 style={{ margin: '0 0 6px', fontSize: '15px', color: 'var(--text)' }}>{cp.title}</h4>
                <p style={{ margin: '0 0 10px', color: 'var(--text-secondary, #444)', lineHeight: 1.5 }}>
                  {cp.description}
                </p>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  建议自测核心节：{cp.sectionIds.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
