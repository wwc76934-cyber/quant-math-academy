import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { PageHeader } from '../components/layout/PageHeader';
import { formatChinesePartLabel, formatDisplayTitle } from '../lib/format';

export const PracticePage: React.FC = () => {
  const { store } = useStore();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    loadBook()
      .then((data) => {
        if (!cancelled) {
          setBook(data);
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

  const totalExercises = useMemo(() => {
    if (!book) return 698;
    return book.chapters.reduce((acc, c) => acc + (c.exerciseCount || 0), 0);
  }, [book]);

  // Overall practice statistics
  const stats = useMemo(() => {
    const exerciseEntries = Object.values(store.exercises);
    const practicedCount = exerciseEntries.filter((e) => e.status !== 'unseen').length;
    const correctCount = exerciseEntries.filter((e) => e.status === 'correct').length;
    const wrongCount = Object.keys(store.review).length;

    const nowIso = new Date().toISOString();
    const dueCount = Object.values(store.review).filter((r) => r.dueAt <= nowIso).length;

    return {
      practicedCount,
      correctCount,
      wrongCount,
      dueCount,
      percentage: totalExercises > 0 ? Math.round((practicedCount / totalExercises) * 100) : 0,
    };
  }, [store.exercises, store.review, totalExercises]);

  // Chapter statistics map
  const chapterStatsMap = useMemo(() => {
    const map = new Map<string, { total: number; practiced: number; correct: number; wrong: number }>();
    if (!book) return map;

    for (const ch of book.chapters) {
      map.set(ch.id, {
        total: ch.exerciseCount || 0,
        practiced: 0,
        correct: 0,
        wrong: 0,
      });
    }

    for (const ex of Object.values(store.exercises)) {
      if (!ex.chapterId) continue;
      const chStat = map.get(ex.chapterId);
      if (chStat && ex.status !== 'unseen') {
        chStat.practiced++;
        if (ex.status === 'correct') {
          chStat.correct++;
        }
      }
    }

    for (const rev of Object.values(store.review)) {
      if (!rev.chapterId) continue;
      const chStat = map.get(rev.chapterId);
      if (chStat) {
        chStat.wrong++;
      }
    }

    return map;
  }, [book, store.exercises, store.review]);

  if (loading) {
    return (
      <main className="page practice-page" id="main-content">
        <p className="page-loading" role="status">正在载入习题目录…</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="page practice-page" id="main-content">
        <div role="alert" className="notice notice--error">
          习题目录没有载入成功：{error || '缺少章节数据'}。请刷新页面重试。
        </div>
      </main>
    );
  }

  const accuracy =
    stats.practicedCount > 0 ? Math.round((stats.correctCount / stats.practicedCount) * 100) : 0;

  const chaptersByPart = book.parts.map((part) => ({
    part,
    chapters: part.chapterIds
      .map((id) => book.chapters.find((c) => c.id === id))
      .filter((c): c is Book['chapters'][number] => Boolean(c)),
  }));

  return (
    <main className="page practice-page" id="main-content">
      <PageHeader
        title="章节练习"
        lede={`全书 ${totalExercises} 道习题，按章节编排。每题先独立作答，再展开解析，自评对错；做错的题会进入错题本，按 1、3、7 天的间隔提醒重做。`}
        actions={
          <Link to="/practice/wrong" className="btn btn--secondary">
            错题本{stats.wrongCount > 0 ? ` · ${stats.wrongCount}` : ''}
          </Link>
        }
      />

      <section className="stat-row" aria-label="练习概况">
        <div className="stat">
          <span className="stat__label">全书习题</span>
          <span className="stat__value">{totalExercises}</span>
        </div>
        <div className="stat">
          <span className="stat__label">已练习题数</span>
          <span className="stat__value">
            {stats.practicedCount} <small>({stats.percentage}%)</small>
          </span>
        </div>
        <div className="stat">
          <span className="stat__label">自评正确率</span>
          <span className="stat__value">{stats.practicedCount > 0 ? `${accuracy}%` : '—'}</span>
        </div>
        <div className="stat">
          <span className="stat__label">今天要复习</span>
          <span className="stat__value">{stats.dueCount}</span>
        </div>
      </section>

      {stats.dueCount > 0 && (
        <div className="notice">
          有 {stats.dueCount} 道错题今天到期。<Link to="/practice/wrong">去错题本重做</Link>
        </div>
      )}

      <div className="practice-chapters">
        {chaptersByPart.map(({ part, chapters }) => (
          <section key={part.id} className="list-group" aria-labelledby={`practice-${part.id}`}>
            <h2 id={`practice-${part.id}`} className="list-group__title">
              {formatChinesePartLabel(part.order)} {part.title}
            </h2>
            <ul className="list">
              {chapters.map((chapter) => {
                const chStat = chapterStatsMap.get(chapter.id) || {
                  total: chapter.exerciseCount || 0,
                  practiced: 0,
                  correct: 0,
                  wrong: 0,
                };
                const pct = chStat.total > 0 ? Math.round((chStat.practiced / chStat.total) * 100) : 0;
                return (
                  <li key={chapter.id}>
                    <Link to={`/practice/${chapter.id}`} className="list-row">
                      <span className="list-row__num">第 {chapter.number} 章</span>
                      <span className="list-row__title">{formatDisplayTitle(chapter.title)}</span>
                      <span className="list-row__meta">
                        {chStat.practiced > 0 ? `${chStat.practiced} / ${chStat.total} 题` : `${chStat.total} 题`}
                        {chStat.wrong > 0 && <em> · 错 {chStat.wrong}</em>}
                      </span>
                      <span className="list-row__bar" aria-hidden="true">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
};
