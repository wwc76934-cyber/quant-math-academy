import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { formatDisplayTitle } from '../lib/format';

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
      <main className="content practice-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载练习题目录...</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="content practice-page" id="main-content" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '16px', background: 'var(--bg-subtle)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
          <h3>练习数据载入失败</h3>
          <p>{error || '无法获取章节数据'}</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="content practice-page shell"
      id="main-content"
      style={{ padding: '36px 24px 64px', maxWidth: '1040px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Page Header */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            PRACTICE & SOLUTIONS
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 12px', fontWeight: 600, color: 'var(--ink)' }}>
          章节练习与错题本
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: '780px' }}>
          全书 34 章 698 道精选练习题，涵盖核心定理推导与量化应用场景。支持即时标记、错题归集与自适应间隔复习。
        </p>
      </header>

      {/* 2. Top Stats Overview */}
      <section
        aria-label="练习进度总览"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>全书习题总数</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {totalExercises} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>覆盖 34 章全部题库</span>
        </div>

        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>已练习题数</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {stats.practicedCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>({stats.percentage}%)</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>正确率 {stats.practicedCount > 0 ? Math.round((stats.correctCount / stats.practicedCount) * 100) : 0}%</span>
        </div>

        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>当前错题记录</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: stats.wrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink)' }}>
            {stats.wrongCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>已存入错题本</span>
        </div>

        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>今日待复习</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: stats.dueCount > 0 ? 'var(--accent, #1a56db)' : 'var(--ink)' }}>
            {stats.dueCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>基于间隔复习模型</span>
        </div>
      </section>

      {/* 3. Mistakes Notebook Entry Banner */}
      <section
        style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e5e5e0)',
          borderRadius: '6px',
          padding: '18px 22px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontWeight: 600, fontSize: '16px', color: 'var(--ink)' }}>错题本与复习队列</span>
            {stats.wrongCount > 0 && (
              <span className="badge badge--p0" style={{ fontSize: '11px', height: '18px', padding: '0 6px' }}>
                {stats.wrongCount} 题存入
              </span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
            {stats.wrongCount > 0
              ? `当前存有 ${stats.wrongCount} 道错题待复盘，其中 ${stats.dueCount} 道题目已到复习周期。`
              : '目前还没有记录错题。在练习或阅读时遇到疑问，点击“加入错题”即可自动收入。'}
          </p>
        </div>

        <Link
          to="/practice/wrong"
          className="btn btn--secondary"
          style={{ whiteSpace: 'nowrap', fontSize: '13px', padding: '8px 16px' }}
        >
          {stats.wrongCount > 0 ? '进入错题本重练 →' : '查看错题本 →'}
        </Link>
      </section>

      {/* 4. Chapter Exercise List */}
      <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: 0, fontWeight: 600 }}>
          章节练习列表
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
          按 8 篇 34 章脉络
        </span>
      </div>

      <div className="practice-chapters" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {book.chapters.map((chapter) => {
          const chStat = chapterStatsMap.get(chapter.id) || { total: chapter.exerciseCount || 0, practiced: 0, correct: 0, wrong: 0 };
          const isDone = chStat.total > 0 && chStat.practiced >= chStat.total;

          return (
            <div
              key={chapter.id}
              style={{
                background: 'var(--bg-card, #ffffff)',
                border: '1px solid var(--border, #e5e5e0)',
                borderRadius: '6px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ flex: '1 1 280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--ink-muted)' }}>
                    第 {chapter.number} 章
                  </span>
                  {chapter.pilot && (
                    <span className="badge badge--pilot" style={{ fontSize: '9px', height: '16px' }}>
                      PILOT
                    </span>
                  )}
                  {isDone && (
                    <span className="badge badge--p0" style={{ fontSize: '9px', height: '16px' }}>
                      全部已练
                    </span>
                  )}
                </div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-serif)' }}>
                  {formatDisplayTitle(chapter.title)}
                </h3>
              </div>

              {/* Progress info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '13px', color: 'var(--ink-muted)' }}>
                <span>
                  共 <strong style={{ color: 'var(--ink)' }}>{chStat.total}</strong> 题
                </span>
                <span>
                  已练 <strong style={{ color: 'var(--ink)' }}>{chStat.practiced}</strong>
                </span>
                {chStat.wrong > 0 && (
                  <span style={{ color: 'var(--warning, #c9510c)' }}>
                    错题 {chStat.wrong}
                  </span>
                )}
              </div>

              <Link
                to={`/practice/${chapter.id}`}
                className="btn btn--secondary"
                style={{ fontSize: '13px', padding: '6px 14px' }}
              >
                进入练习 →
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
};
