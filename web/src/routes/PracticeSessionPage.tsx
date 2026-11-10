import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useToast } from '../components/reader/Toast';
import { Button } from '../components/ui/Button';
import { loadBook } from '../features/content/loadBook';
import { loadExercises } from '../features/content/loadChapter';
import { Book, BookChapter, ExerciseData, ExerciseItem } from '../features/content/types';
import { useStore } from '../features/store/store';
import { formatDisplayTitle } from '../lib/format';

export const PracticeSessionPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const { showToast } = useToast();
  const { store, markExercise } = useStore();

  const [book, setBook] = useState<Book | null>(null);
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Fetch book TOC and chapter exercises
  useEffect(() => {
    if (!chapterId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([loadBook(), loadExercises(chapterId)])
      .then(([b, ex]) => {
        if (!cancelled) {
          setBook(b);
          setExerciseData(ex);

          // Support deep link hash e.g. #c01-ex-3
          if (location.hash && ex.exercises.length > 0) {
            const cleanHash = location.hash.replace('#', '');
            const targetIdx = ex.exercises.findIndex((item) => item.id === cleanHash);
            if (targetIdx >= 0) {
              setCurrentIndex(targetIdx);
            }
          }

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
  }, [chapterId, location.hash]);

  const chapter: BookChapter | undefined = useMemo(() => {
    if (!book || !chapterId) return undefined;
    return book.chapters.find((c) => c.id === chapterId);
  }, [book, chapterId]);

  const exercises = useMemo(() => exerciseData?.exercises || [], [exerciseData]);
  const currentEx: ExerciseItem | undefined = exercises[currentIndex];

  const exRecord = currentEx ? store.exercises[currentEx.id] : undefined;
  const isCorrect = exRecord?.status === 'correct';
  const isWrong = exRecord?.status === 'wrong';

  const goToNext = useCallback(() => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setShowSolution(false);
    }
  }, [currentIndex, exercises.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setShowSolution(false);
    }
  }, [currentIndex]);

  const handleMark = useCallback(
    (correct: boolean) => {
      if (!currentEx || !chapterId) return;
      markExercise(currentEx.id, {
        chapterId,
        number: currentEx.number,
        correct,
      });
      showToast(correct ? '已标记做对' : '已加入错题本与复习队列');
    },
    [currentEx, chapterId, markExercise, showToast]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      } else if (e.key === '1') {
        e.preventDefault();
        handleMark(true);
      } else if (e.key === '2') {
        e.preventDefault();
        handleMark(false);
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setShowSolution((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext, handleMark]);

  if (loading) {
    return (
      <main className="page page--narrow practice-session" id="main-content">
        <p className="page-loading" role="status">正在载入本章习题…</p>
      </main>
    );
  }

  if (error || !currentEx) {
    return (
      <main className="page page--narrow practice-session" id="main-content">
        <div role="alert" className="notice notice--error">
          本章习题没有载入成功：{error || '缺少习题数据'}。
        </div>
        <Link to="/practice" className="btn btn--secondary">
          返回练习列表
        </Link>
      </main>
    );
  }

  const progressPct = exercises.length > 0 ? Math.round(((currentIndex + 1) / exercises.length) * 100) : 0;
  const isLast = currentIndex >= exercises.length - 1;

  return (
    <main className="page page--narrow practice-session" id="main-content">
      <Link to="/practice" className="back-link">
        ← 章节练习
      </Link>

      <header className="session-head">
        <div>
          <h1>{chapter ? formatDisplayTitle(chapter.title) : chapterId}</h1>
          <div className="session-head__sub">第 {chapter?.number || chapterId} 章习题</div>
        </div>
        <div className="session-head__count" aria-label={`第 ${currentIndex + 1} 题，共 ${exercises.length} 题`}>
          {currentIndex + 1} / {exercises.length}
        </div>
        <div className="session-head__bar" aria-hidden="true">
          <i style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      <article className="exercise-card session-card">
        <div className="session-card__head">
          <span className="session-card__num">第 {currentEx.number} 题</span>
          {isCorrect && <span className="session-card__state is-correct">做对了</span>}
          {isWrong && <span className="session-card__state is-wrong">在错题本中</span>}
          {exRecord && exRecord.attempts > 0 && (
            <span className="session-card__attempts">练过 {exRecord.attempts} 次</span>
          )}
        </div>

        <div className="exercise__body prose session-card__body" dangerouslySetInnerHTML={{ __html: currentEx.questionHtml }} />

        <div className="session-card__toolbar">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowSolution((prev) => !prev)}
            aria-expanded={showSolution}
          >
            {showSolution ? '收起解析' : '展开解析'}
          </Button>
          <div className="session-card__marks">
            <span className="session-card__ask">自评：</span>
            <Button
              variant={isCorrect ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleMark(true)}
              aria-pressed={isCorrect}
            >
              {isCorrect ? '已做对' : '标记做对'}
            </Button>
            <Button
              variant={isWrong ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleMark(false)}
              aria-pressed={isWrong}
            >
              {isWrong ? '已在错题本' : '加入错题'}
            </Button>
          </div>
        </div>

        {showSolution && (
          <div className="exercise__solution session-card__solution" role="region" aria-label={`第 ${currentEx.number} 题解析`}>
            <div className="session-card__solution-label">解析</div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: currentEx.solutionHtml }} />
          </div>
        )}
      </article>

      <footer className="session-nav">
        <Button variant="secondary" size="sm" disabled={currentIndex === 0} onClick={goToPrev}>
          上一题
        </Button>
        <span className="session-nav__keys">
          <kbd>←</kbd> <kbd>→</kbd> 切换 · <kbd>空格</kbd> 解析 · <kbd>1</kbd> 做对 · <kbd>2</kbd> 做错
        </span>
        {!isLast ? (
          <Button variant="primary" size="sm" onClick={goToNext}>
            下一题
          </Button>
        ) : (
          <Link to="/practice" className="btn btn--primary btn--sm">
            完成本章
          </Link>
        )}
      </footer>
    </main>
  );
};
