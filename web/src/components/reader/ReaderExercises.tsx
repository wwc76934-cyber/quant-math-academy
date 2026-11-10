import React, { useEffect, useRef, useState } from 'react';
import { loadExercises } from '../../features/content/loadChapter';
import { ExerciseData } from '../../features/content/types';
import { useStore } from '../../features/store/store';
import { Button } from '../ui/Button';
import { useToast } from './Toast';

export interface ReaderExercisesProps {
  chapterId: string;
  exerciseCount: number;
}

export const ReaderExercises: React.FC<ReaderExercisesProps> = ({
  chapterId,
  exerciseCount,
}) => {
  const { showToast } = useToast();
  const { store, markExercise } = useStore();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSolutions, setExpandedSolutions] = useState<Set<string>>(new Set());

  const fetchExercises = async () => {
    if (loading || data) return;
    setLoading(true);
    setError(null);
    try {
      const res = await loadExercises(chapterId);
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  // Sentinel intersection observer (rootMargin 800px)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || data || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchExercises();
        }
      },
      { rootMargin: '800px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [chapterId, data, loading]);

  const toggleSolution = (exId: string) => {
    setExpandedSolutions((prev) => {
      const next = new Set(prev);
      if (next.has(exId)) next.delete(exId);
      else next.add(exId);
      return next;
    });
  };

  const handleMarkCorrect = (exId: string, exNumber: number) => {
    markExercise(exId, { chapterId, number: exNumber, correct: true });
    showToast('已标记做对');
  };

  const handleMarkWrong = (exId: string, exNumber: number) => {
    markExercise(exId, { chapterId, number: exNumber, correct: false });
    showToast('已加入错题本与复习队列');
  };

  return (
    <section id="exercises" aria-labelledby="exercises-heading" style={{ marginTop: '72px' }}>
      <div className="section-heading">
        <span className="num">练习</span>
        <h2 id="exercises-heading">本章习题（共 {exerciseCount} 题）</h2>
      </div>

      <p className="small muted" style={{ marginBottom: '24px' }}>
        本章习题为章末综合巩固练习，涵盖核心定理推导与量化应用场景。详细解析支持随时展开。
      </p>

      {/* Sentinel triggering lazy loading */}
      <div ref={sentinelRef} style={{ height: '1px' }} />

      {loading && !data && (
        <div
          style={{
            padding: '36px 20px',
            background: 'var(--bg-elevated)',
            border: '1px dashed var(--line)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            color: 'var(--ink-muted)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
          }}
        >
          正在载入本章习题…
        </div>
      )}

      {error && !data && (
        <div
          style={{
            padding: '24px',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--accent)', margin: '0 0 12px', fontSize: '14px' }}>
            习题加载失败：{error}
          </p>
          <Button variant="secondary" size="sm" onClick={fetchExercises}>
            重试加载习题
          </Button>
        </div>
      )}

      {!data && !loading && !error && (
        <div
          style={{
            padding: '28px 20px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <Button variant="secondary" size="sm" onClick={fetchExercises}>
            点击展开全部 {exerciseCount} 道习题
          </Button>
        </div>
      )}

      {data &&
        data.exercises.map((ex) => {
          const isExpanded = expandedSolutions.has(ex.id);

          return (
            <article key={ex.id} className="exercise" id={ex.id}>
              <div className="exercise__id">第 {ex.number} 题</div>
              <div
                className="exercise__body"
                dangerouslySetInnerHTML={{ __html: ex.questionHtml }}
              />

              <div className="exercise__actions">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSolution(ex.id)}
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? '收起解析' : '展开解析'}
                </Button>
                <Button
                  variant={store.exercises[ex.id]?.status === 'correct' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => handleMarkCorrect(ex.id, ex.number)}
                  aria-pressed={store.exercises[ex.id]?.status === 'correct'}
                  title="标记此题已做对"
                >
                  {store.exercises[ex.id]?.status === 'correct' ? '已做对' : '标记做对'}
                </Button>
                <Button
                  variant={store.exercises[ex.id]?.status === 'wrong' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => handleMarkWrong(ex.id, ex.number)}
                  aria-pressed={store.exercises[ex.id]?.status === 'wrong'}
                  title="标记做错，加入错题本与复习计划"
                >
                  {store.exercises[ex.id]?.status === 'wrong' ? '已在错题本' : '加入错题'}
                </Button>
              </div>

              {isExpanded && (
                <div
                  className="exercise__solution"
                  role="region"
                  aria-label={`第 ${ex.number} 题解析`}
                >
                  <div className="exercise__solution-label">详细解答与推导</div>
                  <div dangerouslySetInnerHTML={{ __html: ex.solutionHtml }} />
                </div>
              )}
            </article>
          );
        })}
    </section>
  );
};
