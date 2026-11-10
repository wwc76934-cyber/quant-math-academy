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
      <main className="content practice-session shell" id="main-content" style={{ padding: '40px 24px', maxWidth: '840px', margin: '0 auto' }}>
        <p className="muted" role="status">正在加载练习题目...</p>
      </main>
    );
  }

  if (error || !currentEx) {
    return (
      <main className="content practice-session shell" id="main-content" style={{ padding: '40px 24px', maxWidth: '840px', margin: '0 auto' }}>
        <div role="alert" style={{ padding: '20px', background: 'var(--bg-subtle)', border: '1px solid var(--accent)', borderRadius: '6px' }}>
          <h3>练习加载异常</h3>
          <p>{error || '未能加载本章习题'}</p>
          <Link to="/practice" className="btn btn--primary" style={{ marginTop: '12px', display: 'inline-block' }}>
            返回练习列表 →
          </Link>
        </div>
      </main>
    );
  }

  const progressPct = exercises.length > 0 ? Math.round(((currentIndex + 1) / exercises.length) * 100) : 0;

  return (
    <main
      className="content practice-session shell"
      id="main-content"
      style={{ padding: '28px 24px 64px', maxWidth: '840px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Sub-nav / Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <Link
          to="/practice"
          style={{ fontSize: '13px', color: 'var(--ink-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
        >
          ← 返回章节练习
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
          快捷键：[←/→] 切题 · [1] 做对 · [2] 错题 · [Space] 答案
        </div>
      </div>

      {/* 2. Top Progress Header */}
      <header
        style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e5e5e0)',
          borderRadius: '6px',
          padding: '16px 20px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div>
            <span className="kicker" style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
              第 {chapter?.number || chapterId} 章 习题演练
            </span>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
              {chapter ? formatDisplayTitle(chapter.title) : chapterId}
            </h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent, #1a56db)' }}>
              {currentIndex + 1} / {exercises.length}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)', display: 'block' }}>
              进度 {progressPct}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: '4px', background: 'var(--border, #e5e5e0)', borderRadius: '2px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${progressPct}%`,
              background: 'var(--accent, #1a56db)',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
      </header>

      {/* 3. Question Card */}
      <article
        className="exercise-card"
        style={{
          background: 'var(--bg-card, #ffffff)',
          border: '1px solid var(--border, #e5e5e0)',
          borderRadius: '6px',
          padding: '24px',
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '12px',
                background: 'var(--bg-hover, #f0f0eb)',
                color: 'var(--ink-secondary, #444)',
                padding: '2px 8px',
                borderRadius: '3px',
              }}
            >
              第 {currentEx.number} 题
            </span>
            {isCorrect && (
              <span className="badge badge--p0" style={{ fontSize: '10px', height: '18px' }}>
                ✓ 已做对
              </span>
            )}
            {isWrong && (
              <span className="badge" style={{ fontSize: '10px', height: '18px', borderColor: 'var(--warning, #c9510c)', color: 'var(--warning, #c9510c)' }}>
                ✕ 错题
              </span>
            )}
          </div>

          {exRecord && exRecord.attempts > 0 && (
            <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
              已练习 {exRecord.attempts} 次
            </span>
          )}
        </div>

        {/* Question Body */}
        <div
          className="exercise__body prose"
          style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ink)', marginBottom: '24px' }}
          dangerouslySetInnerHTML={{ __html: currentEx.questionHtml }}
        />

        {/* Action Toolbar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            borderTop: '1px solid var(--border, #e5e5e0)',
            paddingTop: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant={isCorrect ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleMark(true)}
              aria-pressed={isCorrect}
            >
              {isCorrect ? '✓ 已标记做对' : '标记做对 (1)'}
            </Button>
            <Button
              variant={isWrong ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleMark(false)}
              aria-pressed={isWrong}
            >
              {isWrong ? '✕ 已在错题本' : '加入错题 (2)'}
            </Button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowSolution((prev) => !prev)}
            aria-expanded={showSolution}
          >
            {showSolution ? '收起解析 (Space)' : '展开解析 (Space)'}
          </Button>
        </div>

        {/* Detailed Solution Region */}
        {showSolution && (
          <div
            className="exercise__solution"
            role="region"
            aria-label={`第 ${currentEx.number} 题详细解答`}
            style={{
              marginTop: '20px',
              padding: '18px 20px',
              background: 'var(--bg-subtle, #fbfbf9)',
              border: '1px solid var(--border, #e5e5e0)',
              borderRadius: '4px',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', marginBottom: '8px' }}>
              详细解答与推导过程
            </div>
            <div
              className="prose"
              style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-secondary)' }}
              dangerouslySetInnerHTML={{ __html: currentEx.solutionHtml }}
            />
          </div>
        )}
      </article>

      {/* 4. Navigation controls */}
      <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentIndex === 0}
          onClick={goToPrev}
        >
          ← 上一题
        </Button>

        <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
          {currentIndex + 1} of {exercises.length}
        </span>

        {currentIndex < exercises.length - 1 ? (
          <Button variant="primary" size="sm" onClick={goToNext}>
            下一题 →
          </Button>
        ) : (
          <Link to="/practice" className="btn btn--primary" style={{ padding: '6px 16px', fontSize: '13px' }}>
            完成本章练习 ✓
          </Link>
        )}
      </footer>
    </main>
  );
};
