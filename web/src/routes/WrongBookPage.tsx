import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../components/reader/Toast';
import { PageHeader } from '../components/layout/PageHeader';
import { StudyTabs } from '../components/layout/StudyTabs';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
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

  const formatDue = (iso: string) => {
    const d = new Date(iso);
    return `${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  };

  return (
    <main className="page page--narrow wrong-book-page" id="main-content">
      <PageHeader
        title="错题本"
        lede="练习时自评做错的题会收在这里。第二天提醒重做；重做答对后，间隔依次拉长到 1、3、7 天，连续答对 3 次或手动标记掌握就移出。"
      />
      <StudyTabs />

      <section className="stat-row" aria-label="错题概况">
        <div className="stat">
          <span className="stat__label">错题</span>
          <span className="stat__value">
            {totalWrongCount} <small>题</small>
          </span>
          <span className="stat__hint">涉及 {groupedByChapter.size} 章</span>
        </div>
        <div className="stat">
          <span className="stat__label">今天到期</span>
          <span className="stat__value">
            {dueItems.length} <small>题</small>
          </span>
        </div>
      </section>

      {totalWrongCount === 0 && (
        <EmptyState
          title="还没有错题"
          description="在章节练习里把某题标为“做错”，它就会出现在这里，并按间隔提醒你重做。"
          action={
            <Link to={practicePath()} className="btn btn--primary">
              去做练习
            </Link>
          }
        />
      )}

      {totalWrongCount > 0 &&
        Array.from(groupedByChapter.entries()).map(([chapId, items]) => {
          const chapInfo = chapterTitleMap.get(chapId) || { number: 0, title: chapId };
          const sorted = [...items].sort((a, b) => a.dueAt.localeCompare(b.dueAt));

          return (
            <section key={chapId} className="list-group" aria-labelledby={`wrong-${chapId}`}>
              <h2 id={`wrong-${chapId}`} className="list-group__title">
                第 {chapInfo.number} 章 {formatDisplayTitle(chapInfo.title)} · {items.length} 题
              </h2>
              <ul className="list">
                {sorted.map((item) => {
                  const isDue = item.dueAt <= nowIso;
                  const exInfo = store.exercises[item.exerciseId];

                  return (
                    <li key={item.exerciseId} className={`review-item${isDue ? ' is-due' : ''}`}>
                      <div className="review-item__main">
                        <strong>第 {item.number} 题</strong>
                        <span className={isDue ? 'review-item__due' : 'review-item__when'}>
                          {isDue ? '今日待复习' : `${formatDue(item.dueAt)}复习`}
                        </span>
                        <span className="review-item__meta">
                          连续答对 {item.correctStreak} / 3 次 · 共练 {exInfo?.attempts || 1} 次
                        </span>
                      </div>
                      <div className="review-item__actions">
                        <Link
                          to={`${practicePath(item.chapterId)}#${item.exerciseId}`}
                          className={`btn btn--sm ${isDue ? 'btn--primary' : 'btn--secondary'}`}
                        >
                          重做此题
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => handleMastered(item.exerciseId)}>
                          标记掌握
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemove(item.exerciseId)}
                          title="从错题本中移除"
                        >
                          移除
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
    </main>
  );
};
