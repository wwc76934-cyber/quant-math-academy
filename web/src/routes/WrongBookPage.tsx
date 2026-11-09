import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/reader/Toast';
import { Button } from '../components/ui/Button';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { ReviewRecord } from '../features/store/types';
import { formatDisplayTitle } from '../lib/format';
import { practicePath } from '../lib/paths';

export const WrongBookPage: React.FC = () => {
  const { store, removeWrongExercise, markExerciseMastered } = useStore();
  const { showToast } = useToast();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    loadBook().then(setBook).catch(() => {});
  }, []);

  const reviewList = useMemo(() => {
    return Object.values(store.review);
  }, [store.review]);

  const totalWrongCount = reviewList.length;

  const nowIso = new Date().toISOString();
  const dueItems = useMemo(() => {
    return reviewList.filter((r) => r.dueAt <= nowIso);
  }, [reviewList, nowIso]);

  // Group by chapterId
  const groupedByChapter = useMemo(() => {
    const map = new Map<string, ReviewRecord[]>();
    for (const item of reviewList) {
      const list = map.get(item.chapterId) || [];
      list.push(item);
      map.set(item.chapterId, list);
    }
    return map;
  }, [reviewList]);

  const handleMastered = (exerciseId: string) => {
    markExerciseMastered(exerciseId);
    showToast('已标记掌握，移出错题本');
  };

  const handleRemove = (exerciseId: string) => {
    removeWrongExercise(exerciseId);
    showToast('已移出错题本');
  };

  const chapterTitleMap = useMemo(() => {
    const map = new Map<string, { number: number; title: string }>();
    if (!book) return map;
    for (const ch of book.chapters) {
      map.set(ch.id, { number: ch.number, title: ch.title });
    }
    return map;
  }, [book]);

  return (
    <main
      className="content wrong-book-page shell"
      id="main-content"
      style={{ padding: '36px 24px 64px', maxWidth: '960px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Header & Navigation */}
      <div style={{ marginBottom: '16px' }}>
        <Link
          to="/practice"
          style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
        >
          ← 返回章节练习
        </Link>
      </div>

      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            MISTAKES NOTEBOOK
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 10px', fontWeight: 600, color: 'var(--ink)' }}>
          错题本与自适应复习
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: '780px' }}>
          自动归集所有标记做错的题目。按照简单间隔复习原则（答对 1/3/7 天递增，连续做对 3 次或手动标记掌握即可彻底移出）。
        </p>
      </header>

      {/* 2. Overview Stats */}
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 20px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>当前收录错题</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: totalWrongCount > 0 ? 'var(--warning, #c9510c)' : 'var(--ink)' }}>
            {totalWrongCount} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>涉及 {groupedByChapter.size} 个章节</span>
        </div>

        <div style={{ background: 'var(--bg-card, #ffffff)', border: '1px solid var(--border, #e5e5e0)', borderRadius: '6px', padding: '16px 20px' }}>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>今日到期复习</span>
          <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-serif)', color: dueItems.length > 0 ? 'var(--accent, #1a56db)' : 'var(--ink)' }}>
            {dueItems.length} <small style={{ fontSize: '13px', fontWeight: 400, color: 'var(--ink-muted)' }}>题</small>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>到达推荐重练窗口</span>
        </div>
      </section>

      {/* 3. Empty State */}
      {totalWrongCount === 0 && (
        <section
          style={{
            background: 'var(--bg-card, #ffffff)',
            border: '1px solid var(--border, #e5e5e0)',
            borderRadius: '6px',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
          <h2 style={{ fontSize: '18px', margin: '0 0 8px', fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            错题本空空如也，状态极佳！
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            你还没有记录任何错题。在平时阅读教材或进行章节练习时，遇到易错题点击“加入错题”，系统将在此自动安排复习节奏。
          </p>
          <Link to="/practice" className="btn btn--primary">
            前往章节练习库 →
          </Link>
        </section>
      )}

      {/* 4. Grouped Chapter Cards */}
      {totalWrongCount > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {Array.from(groupedByChapter.entries()).map(([chapId, items]) => {
            const chapInfo = chapterTitleMap.get(chapId) || { number: 0, title: chapId };

            return (
              <section
                key={chapId}
                style={{
                  background: 'var(--bg-card, #ffffff)',
                  border: '1px solid var(--border, #e5e5e0)',
                  borderRadius: '6px',
                  padding: '20px 24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border, #e5e5e0)', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                      第 {chapInfo.number} 章
                    </span>
                    <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 600, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
                      {formatDisplayTitle(chapInfo.title)}
                    </h3>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                    {items.length} 道错题
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {items.map((item) => {
                    const isDue = item.dueAt <= nowIso;
                    const exInfo = store.exercises[item.exerciseId];

                    return (
                      <div
                        key={item.exerciseId}
                        style={{
                          background: 'var(--bg-subtle, #fbfbf9)',
                          border: isDue ? '1px solid var(--accent, #1a56db)' : '1px solid var(--border, #e5e5e0)',
                          borderRadius: '4px',
                          padding: '12px 16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '12px',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>
                              第 {item.number} 题
                            </strong>
                            {isDue ? (
                              <span className="badge badge--p0" style={{ fontSize: '10px', height: '18px' }}>
                                今日待复习
                              </span>
                            ) : (
                              <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                                {item.intervalDays} 天复习周期
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                            连续答对 {item.correctStreak} / 3 次 · 累计练习 {exInfo?.attempts || 1} 次
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Link
                            to={`${practicePath(item.chapterId)}#${item.exerciseId}`}
                            className="btn btn--primary"
                            style={{ fontSize: '12px', padding: '5px 12px' }}
                          >
                            重做此题 →
                          </Link>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleMastered(item.exerciseId)}
                            style={{ fontSize: '12px', padding: '5px 12px' }}
                          >
                            标记掌握
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(item.exerciseId)}
                            style={{ fontSize: '12px', padding: '5px 8px', color: 'var(--ink-muted)' }}
                            title="从错题本中移除"
                          >
                            移除
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
};
