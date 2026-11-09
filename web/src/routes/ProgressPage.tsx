import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { formatDisplayTitle, formatPercentage } from '../lib/format';
import { learnPath, practicePath } from '../lib/paths';

export const ProgressPage: React.FC = () => {
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

  // Total sections across the whole book
  const totalSections = useMemo(() => {
    if (!book) return 219;
    return book.chapters.reduce((acc, c) => acc + (c.sectionCount || c.sections.length || 0), 0);
  }, [book]);

  const totalExercises = useMemo(() => {
    if (!book) return 698;
    return book.chapters.reduce((acc, c) => acc + (c.exerciseCount || 0), 0);
  }, [book]);

  // Overall KPIs
  const kpis = useMemo(() => {
    const progressValues = Object.values(store.progress);
    const learnedSections = progressValues.filter(
      (p) => p.status === 'done' || p.status === 'master'
    ).length;
    const masteredSections = progressValues.filter(
      (p) => p.status === 'master'
    ).length;

    const wrongReviews = Object.values(store.review);
    const wrongCount = wrongReviews.length;

    const nowIso = new Date().toISOString();
    const dueTodayCount = wrongReviews.filter((r) => r.dueAt <= nowIso).length;

    const learnedPct = totalSections > 0 ? (learnedSections / totalSections) * 100 : 0;

    return {
      learnedSections,
      masteredSections,
      wrongCount,
      dueTodayCount,
      learnedPct,
    };
  }, [store.progress, store.review, totalSections]);

  // Chapter mapping for reviews
  const chapterMap = useMemo(() => {
    const map = new Map<string, { label: string; title: string }>();
    if (!book) return map;
    for (const ch of book.chapters) {
      map.set(ch.id, { label: ch.label, title: ch.title });
    }
    return map;
  }, [book]);

  // Review Queue: sorted by dueAt asc, top 20
  const reviewQueue = useMemo(() => {
    const reviews = Object.values(store.review);
    reviews.sort((a, b) => a.dueAt.localeCompare(b.dueAt));
    return reviews.slice(0, 20);
  }, [store.review]);

  // Chapter table data
  const chapterTableData = useMemo(() => {
    if (!book) return [];

    return book.chapters.map((ch) => {
      let chLearned = 0;
      let chMastered = 0;
      for (const sec of ch.sections) {
        const item = store.progress[sec.id];
        if (item) {
          if (item.status === 'done' || item.status === 'master') chLearned++;
          if (item.status === 'master') chMastered++;
        }
      }

      let chPracticed = 0;
      for (const ex of Object.values(store.exercises)) {
        if (ex.chapterId === ch.id && ex.status !== 'unseen') {
          chPracticed++;
        }
      }

      let chWrong = 0;
      for (const rev of Object.values(store.review)) {
        if (rev.chapterId === ch.id) {
          chWrong++;
        }
      }

      const totalSecs = ch.sectionCount || ch.sections.length || 1;
      const sectionPct = Math.round((chLearned / totalSecs) * 100);

      return {
        id: ch.id,
        number: ch.number,
        label: ch.label,
        title: ch.title,
        sectionCount: totalSecs,
        learnedCount: chLearned,
        masteredCount: chMastered,
        sectionPct,
        exerciseCount: ch.exerciseCount || 0,
        practicedCount: chPracticed,
        wrongCount: chWrong,
      };
    });
  }, [book, store.progress, store.exercises, store.review]);

  if (loading) {
    return (
      <main className="content progress-page" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载学习进度与统计...</p>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="content progress-page" style={{ padding: '40px 24px', maxWidth: '1040px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '16px', background: 'var(--bg-subtle)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
          <h3>数据载入失败</h3>
          <p>{error || '无法获取章节数据'}</p>
        </div>
      </main>
    );
  }

  const nowIso = new Date().toISOString();

  return (
    <main
      className="content progress-page shell"
      id="main-content"
      style={{ padding: '36px 24px 64px', maxWidth: '1040px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Page Header */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            PROGRESS & METRICS
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 12px', fontWeight: 600, color: 'var(--ink)' }}>
          学习进度与复习队列
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: '780px' }}>
          追踪全书 34 章 219 节知识点掌握情况、{totalExercises} 道习题练习记录与基于间隔遗忘模型的错题复习队列。
        </p>
      </header>

      {/* 2. Four Core KPIs */}
      <section
        aria-label="核心进度指标"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div
          data-testid="kpi-learned"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>已学节数 (done / master)</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {kpis.learnedSections} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>/ {totalSections} 节 ({formatPercentage(kpis.learnedPct)})</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>已标记完成或掌握的知识点</span>
        </div>

        <div
          data-testid="kpi-mastered"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>重点掌握 (master)</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            {kpis.masteredSections} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>节</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>完全精通且可推导的核心节</span>
        </div>

        <div
          data-testid="kpi-wrong"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>错题本题目</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: kpis.wrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink)' }}>
            {kpis.wrongCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <Link
            to="/practice/wrong"
            style={{ fontSize: '11px', color: 'var(--accent, #1a56db)', textDecoration: 'none' }}
          >
            前往错题本管理 →
          </Link>
        </div>

        <div
          data-testid="kpi-due"
          style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 18px' }}
        >
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>今日待复习</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: kpis.dueTodayCount > 0 ? 'var(--accent, #1a56db)' : 'var(--ink)' }}>
            {kpis.dueTodayCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>到期等待重新练习检验</span>
        </div>
      </section>

      {/* 3. Review Queue Section */}
      <section aria-labelledby="review-queue-heading" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
          <div>
            <h2 id="review-queue-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
              复习队列
            </h2>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
              按到期时间排序，连续做对 3 次或标记掌握后移出队列（最多展示前 20 条）。
            </p>
          </div>
          <Link
            to="/practice/wrong"
            style={{ fontSize: '13px', color: 'var(--accent, #1a56db)', textDecoration: 'none', fontWeight: 500 }}
          >
            查看全部错题本 →
          </Link>
        </div>

        {reviewQueue.length === 0 ? (
          <div
            data-testid="review-queue-empty"
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px dashed var(--border, #e5e5e0)',
              borderRadius: '6px',
              padding: '32px 20px',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: '0 0 8px', fontSize: '15px', color: 'var(--ink-secondary)', fontWeight: 500 }}>
              当前复习队列为空
            </p>
            <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--ink-muted)' }}>
              在阅读教材或章节练习中做错的题目会自动进入复习队列，并按 1 天 / 3 天 / 7 天提示复习。
            </p>
            <Link
              to="/practice"
              className="btn btn--secondary"
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                fontSize: '13px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                textDecoration: 'none',
                color: 'var(--ink)',
              }}
            >
              浏览章节练习题库
            </Link>
          </div>
        ) : (
          <div
            style={{
              background: 'var(--bg-card, #ffffff)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 2fr) 110px 140px 100px',
                padding: '10px 16px',
                background: 'var(--bg-subtle, #f6f6f4)',
                borderBottom: '1px solid var(--border, #e5e5e0)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink-muted)',
              }}
            >
              <span>题目</span>
              <span>连续正确</span>
              <span>复习状态</span>
              <span style={{ textAlign: 'right' }}>操作</span>
            </div>
            <div role="list">
              {reviewQueue.map((item) => {
                const ch = chapterMap.get(item.chapterId);
                const isDue = item.dueAt <= nowIso;
                const dueDate = new Date(item.dueAt);
                const dueText = isDue
                  ? '今日待复习'
                  : `${dueDate.getMonth() + 1}月${dueDate.getDate()}日到期`;

                return (
                  <div
                    role="listitem"
                    key={item.exerciseId}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(220px, 2fr) 110px 140px 100px',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border, #e5e5e0)',
                      fontSize: '13px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                        {ch ? `${ch.label} 习题 ${item.number}` : `${item.chapterId.toUpperCase()} 习题 ${item.number}`}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                        {ch ? formatDisplayTitle(ch.title) : ''}
                      </div>
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 6px',
                          borderRadius: '3px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: item.correctStreak > 0 ? '#e6f4ea' : 'var(--bg-subtle, #f0f0ee)',
                          color: item.correctStreak > 0 ? '#137333' : 'var(--ink-muted)',
                        }}
                      >
                        {item.correctStreak} / 3 次
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: isDue ? 600 : 400,
                          color: isDue ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                        }}
                      >
                        {dueText}
                      </span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Link
                        to={`${practicePath(item.chapterId)}#ex-${item.number}`}
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: 'var(--accent, #1a56db)',
                          textDecoration: 'none',
                        }}
                      >
                        练习 →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* 4. Chapter Progress Table */}
      <section aria-labelledby="chapter-progress-heading">
        <div style={{ marginBottom: '16px' }}>
          <h2 id="chapter-progress-heading" style={{ fontSize: '20px', fontFamily: 'var(--font-serif)', margin: '0 0 4px', fontWeight: 600, color: 'var(--ink)' }}>
            章节明细
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
            全书 34 章节进度、习题完成度与错题一览表。
          </p>
        </div>

        <div
          style={{
            background: 'var(--bg-card, #ffffff)',
            border: '1px solid var(--border, #e5e5e0)',
            borderRadius: '6px',
            overflowX: 'auto',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'var(--bg-subtle, #f6f6f4)',
                  borderBottom: '1px solid var(--border, #e5e5e0)',
                  fontSize: '12px',
                  color: 'var(--ink-muted)',
                }}
              >
                <th style={{ padding: '10px 16px', fontWeight: 600 }}>章节</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '180px' }}>知识点进度</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '120px' }}>习题练习</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '90px' }}>错题</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, width: '140px', textAlign: 'right' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {chapterTableData.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid var(--border, #e5e5e0)',
                  }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <Link
                      to={learnPath(row.id)}
                      style={{
                        color: 'var(--ink)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      {row.label} {formatDisplayTitle(row.title)}
                    </Link>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          flex: 1,
                          height: '6px',
                          background: 'var(--bg-subtle, #eee)',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${row.sectionPct}%`,
                            height: '100%',
                            background: row.sectionPct === 100 ? '#137333' : 'var(--accent, #1a56db)',
                            borderRadius: '3px',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '11px', color: 'var(--ink-muted)', minWidth: '45px' }}>
                        {row.learnedCount}/{row.sectionCount}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink-secondary)' }}>
                    {row.practicedCount} / {row.exerciseCount} 题
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        color: row.wrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                        fontWeight: row.wrongCount > 0 ? 600 : 400,
                      }}
                    >
                      {row.wrongCount} 题
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Link
                      to={learnPath(row.id)}
                      style={{
                        marginRight: '12px',
                        color: 'var(--ink-muted)',
                        textDecoration: 'none',
                        fontSize: '12px',
                      }}
                    >
                      阅读
                    </Link>
                    <Link
                      to={practicePath(row.id)}
                      style={{
                        color: 'var(--accent, #1a56db)',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      练习 →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Storage Note */}
      <footer
        style={{
          marginTop: '40px',
          padding: '16px 20px',
          background: 'var(--bg-subtle, #f6f6f4)',
          borderRadius: '6px',
          fontSize: '12px',
          color: 'var(--ink-muted)',
          lineHeight: 1.6,
        }}
      >
        <strong>本地存储与数据隐私说明：</strong>
        全书 34 章的阅读标记、练习做题记录与错题复习队列完全保存在当前浏览器的 LocalStorage 中，不上传任何服务器。即使离线也可以正常记录与复习。
      </footer>
    </main>
  );
};
