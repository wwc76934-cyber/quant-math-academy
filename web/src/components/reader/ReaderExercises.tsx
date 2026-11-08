import React, { useEffect, useRef, useState } from 'react';
import { loadExercises } from '../../features/content/loadChapter';
import { ExerciseData } from '../../features/content/types';
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

  const handlePhase3Notice = () => {
    showToast('该功能将在 Phase 3（题解与自适应复习）中正式开放');
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
          正在动态载入本章习题数据...
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
                  variant="ghost"
                  size="sm"
                  disabled
                  onClick={handlePhase3Notice}
                  title="Phase 3 开放"
                >
                  标记做对
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled
                  onClick={handlePhase3Notice}
                  title="Phase 3 开放"
                >
                  加入错题
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
