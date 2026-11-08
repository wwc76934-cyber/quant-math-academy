import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChapterList } from '../components/toc/ChapterList';
import { PartIndex } from '../components/toc/PartIndex';
import { Chip } from '../components/ui/Chip';
import { ErrorState } from '../components/ui/ErrorState';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';

type FilterMode = 'all' | 'p0_p1' | 'unlearned' | 'annotated';

const SESSION_OPEN_CHAPTERS_KEY = 'qma:syllabus:openChapters';

export const SyllabusPage: React.FC = () => {
  const { store } = useStore();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  // Track expanded chapters
  const [openChapterIds, setOpenChapterIds] = useState<Set<string>>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_OPEN_CHAPTERS_KEY);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
    return new Set<string>();
  });

  const fetchBookData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadBook();
      setBook(data);

      // Determine default open chapter if none is set yet
      setOpenChapterIds((prev) => {
        if (prev.size > 0) return prev;

        const next = new Set<string>();
        const lastChap = store.lastLocation?.chapterId;
        if (lastChap && data.chapters.some((c) => c.id === lastChap)) {
          next.add(lastChap);
        } else if (data.chapters.some((c) => c.id === 'c11')) {
          next.add('c11');
        } else if (data.chapters.length > 0) {
          next.add(data.chapters[0].id);
        }
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [store.lastLocation?.chapterId]);

  useEffect(() => {
    fetchBookData();
  }, [fetchBookData]);

  // Persist open chapters in session
  useEffect(() => {
    try {
      sessionStorage.setItem(
        SESSION_OPEN_CHAPTERS_KEY,
        JSON.stringify(Array.from(openChapterIds))
      );
    } catch {
      // Ignore
    }
  }, [openChapterIds]);

  const handleToggleChapter = useCallback((chapterId: string) => {
    setOpenChapterIds((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  }, []);

  const totalSections = useMemo(() => {
    if (!book) return 0;
    return book.chapters.reduce(
      (acc, c) => acc + (c.sectionCount || c.sections.length),
      0
    );
  }, [book]);

  const filteredChapterCount = useMemo(() => {
    if (!book) return 0;
    if (filterMode === 'all') return book.chapters.length;

    const pilotSet = new Set(book.pilotChapterIds || ['c01', 'c08', 'c11', 'c33']);

    return book.chapters.filter((chapter) => {
      if (filterMode === 'annotated') {
        return chapter.sections.some(
          (s) => s.difficulty !== null || s.priority !== null
        );
      }
      if (filterMode === 'p0_p1') {
        return chapter.sections.some(
          (s) => s.priority === 'P0' || s.priority === 'P1'
        );
      }
      if (filterMode === 'unlearned') {
        if (pilotSet.has(chapter.id)) {
          return chapter.sections.some((s) => {
            const item = store.progress[s.id];
            return !item || (item.status !== 'done' && item.status !== 'master');
          });
        }
        return true;
      }
      return true;
    }).length;
  }, [book, filterMode, store.progress]);

  if (loading) {
    return (
      <main className="syllabus shell" id="main-content">
        <header className="syllabus__head">
          <div>
            <div className="kicker">教材</div>
            <h1>完整目录</h1>
            <p>正在读取教材索引与目录数据...</p>
          </div>
        </header>
        <div style={{ marginTop: '48px', padding: '24px 0', color: 'var(--ink-muted)' }}>
          <p>加载中...</p>
        </div>
      </main>
    );
  }

  if (error || !book) {
    return (
      <main className="syllabus shell" id="main-content">
        <header className="syllabus__head">
          <div>
            <div className="kicker">教材</div>
            <h1>完整目录</h1>
          </div>
        </header>
        <ErrorState
          message={error || '加载教材数据失败'}
          onRetry={fetchBookData}
          showReturnToSyllabus={false}
        />
      </main>
    );
  }

  return (
    <main className="syllabus shell" id="main-content">
      <header className="syllabus__head">
        <div>
          <div className="kicker">教材</div>
          <h1>完整目录</h1>
          <p>
            {book.parts.length} 篇 {book.chapters.length} 章 · {totalSections} 个知识点 · 所有公式与证明保持教材原文
          </p>
        </div>
        <div className="syllabus__tools">
          <Chip
            active={filterMode === 'all'}
            onClick={() => setFilterMode('all')}
          >
            全部
          </Chip>
          <Chip
            active={filterMode === 'p0_p1'}
            onClick={() => setFilterMode('p0_p1')}
          >
            只看 P0/P1
          </Chip>
          <Chip
            active={filterMode === 'unlearned'}
            onClick={() => setFilterMode('unlearned')}
          >
            只看未学
          </Chip>
          <Chip
            active={filterMode === 'annotated'}
            onClick={() => setFilterMode('annotated')}
          >
            只看已标注
          </Chip>
        </div>
      </header>

      {filterMode !== 'all' && (
        <div className="syllabus__filter-status">
          <span>
            已筛选 {filteredChapterCount} / {book.chapters.length} 章
          </span>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => setFilterMode('all')}
          >
            清除筛选
          </button>
        </div>
      )}

      {filterMode === 'p0_p1' && (
        <div
          style={{
            margin: '24px 0',
            padding: '16px 20px',
            background: 'var(--bg-subtle)',
            borderLeft: '3px solid var(--accent)',
            fontSize: '13px',
            color: 'var(--ink-secondary)',
          }}
        >
          {filteredChapterCount === 0
            ? '其余章标注完善中，当前所有章节尚未完成 P0/P1 优先级标注。'
            : '其余章标注完善中，当前仅显示已标注 P0/P1 的试点章节。'}
        </div>
      )}

      <div className="syllabus__body">
        <PartIndex parts={book.parts} />
        <ChapterList
          book={book}
          openChapterIds={openChapterIds}
          onToggleChapter={handleToggleChapter}
          filterMode={filterMode}
        />
      </div>
    </main>
  );
};
