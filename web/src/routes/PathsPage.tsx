import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../features/content/types';
import { loadBook } from '../features/content/loadBook';
import { loadPathsData, normalizePathId } from '../features/paths/loadPaths';
import { PathData, PathsFile } from '../features/paths/types';
import { useStore } from '../features/store/store';
import { pathsPath, syllabusPath } from '../lib/paths';

export const PathsPage: React.FC = () => {
  const [pathsData, setPathsData] = useState<PathsFile | null>(null);
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { store, setActivePath } = useStore();

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

  const currentActiveId = normalizePathId(store.path?.active);

  // Calculate progress for each path
  const pathStats = useMemo(() => {
    if (!pathsData) return {};
    const res: Record<string, { completed: number; total: number; percentage: number }> = {};

    for (const p of pathsData.paths) {
      if (p.id === 'free') {
        // Free mode reflects total book progress
        let total = 219;
        let completed = 0;
        if (book) {
          total = book.chapters.reduce((acc, c) => acc + c.sections.length, 0);
        }
        for (const item of Object.values(store.progress)) {
          if (item.status === 'done' || item.status === 'master') {
            completed++;
          }
        }
        res[p.id] = {
          completed,
          total,
          percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
        };
        continue;
      }

      // Collect all unique sectionIds in this path
      const secSet = new Set<string>();
      for (const wp of p.weeksPlan) {
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
      res[p.id] = {
        completed,
        total,
        percentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
      };
    }

    return res;
  }, [pathsData, book, store.progress]);

  const handleSelectPath = (pathId: string) => {
    setActivePath(pathId);
  };

  if (loading) {
    return (
      <main className="content paths-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载学习路径规划...</p>
      </main>
    );
  }

  if (error || !pathsData) {
    return (
      <main className="content paths-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '16px', background: 'var(--accent-light, #fdf2f2)', border: '1px solid var(--accent, #e53e3e)', borderRadius: '4px' }}>
          <h3>加载失败</h3>
          <p>{error || '无法获取学习路径数据'}</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="content paths-page"
      id="main-content"
      style={{
        padding: '36px 24px 64px',
        maxWidth: '1040px',
        margin: '0 auto',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--muted)' }}>
            CURRICULUM PATHS
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 12px', fontWeight: 600, color: 'var(--text)' }}>
          量化数学学习路径
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--muted)', maxWidth: '780px' }}>
          根据量化实习冲刺、系统理论精读、工程应用或自由探索等不同目标，提供结构化的周次安排与自适应下一步推荐。
        </p>
      </header>

      {/* Honest Principle Banner */}
      <div
        role="note"
        aria-label="学习路径原则说明"
        style={{
          background: 'var(--bg-card, #fbfbf9)',
          border: '1px solid var(--border, #e5e5e0)',
          borderRadius: '4px',
          padding: '14px 18px',
          marginBottom: '32px',
          fontSize: '13px',
          lineHeight: 1.6,
          color: 'var(--text-secondary, #555550)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '14px', lineHeight: '20px', color: 'var(--accent, #1a56db)' }}>ℹ</span>
        <div>
          <strong style={{ color: 'var(--text, #111)' }}>核心原则：</strong>
          学习路径仅决定推荐顺序与自适应学习节奏，<strong>绝不做内容门禁或章节锁定</strong>。全书 34 章 219 节始终可从
          <Link to={syllabusPath()} style={{ color: 'var(--accent, #1a56db)', margin: '0 4px', textDecoration: 'underline' }}>
            完整目录
          </Link>
          随时自由阅读。未标注章节保持诚实留白，不伪造难度或优先级，切换路径不丢失任何已有学习记录。
        </div>
      </div>

      {/* 4 Paths Cards Grid */}
      <div
        className="paths-list"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
        }}
      >
        {pathsData.paths.map((p: PathData) => {
          const isCurrentActive = currentActiveId === p.id;
          const stats = pathStats[p.id] || { completed: 0, total: p.totalSections, percentage: 0 };

          return (
            <article
              key={p.id}
              className={`path-overview-card ${isCurrentActive ? 'is-active' : ''}`}
              data-path-id={p.id}
              style={{
                background: 'var(--bg-card, #ffffff)',
                border: isCurrentActive ? '2px solid var(--accent, #1a56db)' : '1px solid var(--border, #e5e5e0)',
                borderRadius: '6px',
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: isCurrentActive ? '0 2px 8px rgba(26, 86, 219, 0.08)' : 'none',
              }}
            >
              <div>
                {/* Top row: Code + Active Badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
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
                    PATH {p.code}
                  </span>

                  {isCurrentActive && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#ffffff',
                        background: 'var(--accent, #1a56db)',
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      当前进行中
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 style={{ fontSize: '19px', fontFamily: 'var(--font-serif)', fontWeight: 600, margin: '0 0 8px', color: 'var(--text)' }}>
                  {p.title}
                </h2>

                {/* Meta stats bar */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    fontSize: '12px',
                    color: 'var(--muted)',
                    marginBottom: '12px',
                  }}
                >
                  <span>
                    <strong>{p.weeks > 0 ? `${p.weeks} 周` : '自定节奏'}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    {p.id === 'free' ? '全书自由查阅' : `精选 ${stats.total} 节`}
                  </span>
                  {p.totalEstimatedMinutes > 0 && (
                    <>
                      <span>·</span>
                      <span>预计 {Math.round(p.totalEstimatedMinutes / 60)} 小时</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--text-secondary, #444)', margin: '0 0 16px' }}>
                  {p.description}
                </p>

                {/* Audience */}
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--muted)',
                    background: 'var(--bg-hover, #fafaf7)',
                    padding: '8px 10px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                  }}
                >
                  <strong style={{ color: 'var(--text-secondary, #444)' }}>适合：</strong>
                  {p.audience}
                </div>
              </div>

              {/* Progress & Actions */}
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--muted)' }}>学习进度</span>
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>
                      {stats.completed} / {stats.total} 节 ({stats.percentage}%)
                    </span>
                  </div>
                  <div style={{ height: '5px', background: 'var(--border, #e5e5e0)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${stats.percentage}%`,
                        background: 'var(--accent, #1a56db)',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    to={pathsPath(p.id)}
                    className="btn btn--secondary"
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: '13px',
                      padding: '8px 12px',
                    }}
                  >
                    查看周计划与推荐 →
                  </Link>

                  {!isCurrentActive ? (
                    <button
                      type="button"
                      className="btn btn--outline"
                      onClick={() => handleSelectPath(p.id)}
                      style={{
                        fontSize: '13px',
                        padding: '8px 12px',
                        cursor: 'pointer',
                      }}
                      title="设为当前主路径，不影响已有进度"
                    >
                      设为主路径
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      style={{
                        fontSize: '13px',
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        color: 'var(--muted)',
                        cursor: 'default',
                        borderRadius: '4px',
                      }}
                    >
                      已激活
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
