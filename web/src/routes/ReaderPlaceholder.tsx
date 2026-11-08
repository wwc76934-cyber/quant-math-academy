import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book, BookChapter } from '../features/content/types';
import { useStore } from '../features/store/store';
import { syllabusPath } from '../lib/paths';

export const ReaderPlaceholder: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const location = useLocation();
  const { setLastLocation } = useStore();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook()
      .then((data) => setBook(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const chapter: BookChapter | undefined = book?.chapters.find(
    (c) => c.id === chapterId
  );

  const isPilot =
    chapterId &&
    (book?.pilotChapterIds || ['c01', 'c08', 'c11', 'c33']).includes(chapterId);

  // Update lastLocation in store if it's a pilot chapter
  useEffect(() => {
    if (chapterId && isPilot && chapter && chapter.sections.length > 0) {
      const hash = location.hash.replace('#', '');
      const matchedSection = hash
        ? chapter.sections.find((s) => s.anchor === hash || s.id === hash)
        : chapter.sections[0];
      const sectionId = matchedSection ? matchedSection.id : chapter.sections[0].id;
      setLastLocation({ chapterId, sectionId });
    }
  }, [chapterId, isPilot, chapter, location.hash, setLastLocation]);

  if (loading) {
    return (
      <main className="shell" id="main-content" style={{ padding: '60px 0' }}>
        <p className="muted">正在加载章节...</p>
      </main>
    );
  }

  if (!chapter) {
    return (
      <main className="shell" id="main-content" style={{ padding: '60px 0' }}>
        <h1>未找到该章节</h1>
        <p className="muted">请检查链接是否正确，或返回目录浏览。</p>
        <Link to={syllabusPath()} className="btn btn--secondary" style={{ marginTop: '20px' }}>
          返回教材目录
        </Link>
      </main>
    );
  }

  return (
    <div>
      <div className="reader-top">
        <div className="reader-top__inner">
          <div className="breadcrumb">
            <Link to={syllabusPath()}>教材</Link>
            <span>/</span>
            <span>{chapter.label}</span>
          </div>
          <div className="reader-top__title">{chapter.title}</div>
        </div>
      </div>

      <main className="shell" id="main-content" style={{ padding: '48px 32px 96px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="kicker">
            {isPilot ? '试点章节 · 正文占位' : '内容接入中'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '36px', margin: '12px 0 20px' }}>
            {chapter.displayTitle || `${chapter.label} ${chapter.title}`}
          </h1>

          {isPilot ? (
            <div
              style={{
                padding: '24px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--line)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '32px',
                lineHeight: 1.8,
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: '17px' }}>
                📖 阅读页占位（T05 接手）
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-secondary)' }}>
                本章节属于 Phase 1 试点范围（含 HTML 正文切片与练习题）。
                正文渲染、KaTeX 数学排版、定义/定理环境交互、锚点滚动、字号调节及进度跟踪将在 <strong>T05 任务</strong> 中正式实现。
              </p>
            </div>
          ) : (
            <div
              style={{
                padding: '24px',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '32px',
                lineHeight: 1.8,
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: '17px' }}>
                🚧 内容接入中
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-secondary)' }}>
                本章尚未纳入 Phase 1 试点范围。请先体验试点章节：第 1 章（数学语言）、第 8 章（矩阵分解）、第 11 章（概率不等式）、第 33 章（定价与 Greeks）。
              </p>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginTop: '36px' }}>
            本章目录（{chapter.sections.length} 节）
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
            {chapter.sections.map((sec) => (
              <li
                key={sec.id}
                style={{
                  padding: '12px 0',
                  borderBottom: '1px solid var(--line)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <div>
                  <span style={{ color: 'var(--ink-muted)', marginRight: '12px' }}>
                    {sec.number}
                  </span>
                  <span>{sec.title}</span>
                </div>
                <span className="small muted">
                  {isPilot ? '就绪 (T05)' : '内容接入中'}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '40px' }}>
            <Link to={syllabusPath()} className="btn btn--secondary">
              ← 返回教材完整目录
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
