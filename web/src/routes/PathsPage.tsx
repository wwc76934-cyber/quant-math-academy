import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
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
      <main className="page paths-page" id="main-content">
        <p className="page-loading" role="status">正在载入学习路径…</p>
      </main>
    );
  }

  if (error || !pathsData) {
    return (
      <main className="page paths-page" id="main-content">
        <div role="alert" className="notice notice--error">
          学习路径没有载入成功：{error || '缺少路径数据'}。请刷新页面重试。
        </div>
      </main>
    );
  }

  return (
    <main className="page paths-page" id="main-content">
      <PageHeader
        title="学习路径"
        lede="按目标挑一条路径，每周给出要读的小节和预计用时。随时可以换路径，已有进度不会丢。"
      />

      <p className="notice" role="note" aria-label="学习路径说明">
        学习路径只给出推荐顺序，不锁定任何章节。全书 34 章始终可以从
        <Link to={syllabusPath()}>完整目录</Link>
        直接打开。
      </p>

      <div className="path-overview-grid">
        {pathsData.paths.map((p: PathData) => {
          const isCurrentActive = currentActiveId === p.id;
          const stats = pathStats[p.id] || { completed: 0, total: p.totalSections, percentage: 0 };
          const hours = Math.round(p.totalEstimatedMinutes / 60);

          return (
            <article
              key={p.id}
              className={`path-overview-card${isCurrentActive ? ' is-active' : ''}`}
              data-path-id={p.id}
            >
              <div className="path-overview-card__top">
                <span className="path-overview-card__code">
                  {p.id === 'free' ? '自由阅读' : `路径 ${p.code}`}
                </span>
                {isCurrentActive && <span className="path-overview-card__current">正在进行</span>}
              </div>

              <h2>{p.title}</h2>

              <div className="path-overview-card__facts">
                <span>{p.weeks > 0 ? `${p.weeks} 周` : '不限时间'}</span>
                <span>{p.id === 'free' ? '全书 219 节' : `${stats.total} 节`}</span>
                {hours > 0 && <span>约 {hours} 小时</span>}
              </div>

              <p className="path-overview-card__desc">{p.description}</p>
              {p.audience && (
                <p className="path-overview-card__audience">
                  <span>适合</span>
                  {p.audience}
                </p>
              )}

              <div className="path-overview-card__progress">
                <div className="path-overview-card__progress-label">
                  <span>进度</span>
                  <span>
                    {stats.completed} / {stats.total} 节
                  </span>
                </div>
                <div className="list-row__bar">
                  <i style={{ width: `${stats.percentage}%` }} />
                </div>
              </div>

              <div className="path-overview-card__actions">
                <Link to={pathsPath(p.id)} className="btn btn--secondary">
                  查看周计划
                </Link>
                {!isCurrentActive ? (
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => handleSelectPath(p.id)}
                    title="首页“今天”会按这条路径推荐下一节，已有进度不受影响"
                  >
                    设为主路径
                  </button>
                ) : (
                  <span className="path-overview-card__hint">首页按这条路径推荐下一节</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};
