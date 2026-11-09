import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book } from '../features/content/types';
import { useStore } from '../features/store/store';
import { NoteRecord } from '../features/store/types';
import { formatDisplayTitle } from '../lib/format';
import { learnPath, syllabusPath } from '../lib/paths';

interface NoteItemWithMeta {
  sectionId: string;
  chapterId: string;
  chapterTitle: string;
  chapterLabel: string;
  sectionNumber: string;
  sectionTitle: string;
  note: NoteRecord;
}

export const NotesPage: React.FC = () => {
  const { store, deleteNote } = useStore();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadBook()
      .then((data) => {
        if (!cancelled) {
          setBook(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Section lookup map
  const sectionMap = useMemo(() => {
    const map = new Map<
      string,
      {
        chapterId: string;
        chapterLabel: string;
        chapterTitle: string;
        sectionNumber: string;
        sectionTitle: string;
      }
    >();

    if (!book) return map;

    for (const ch of book.chapters) {
      for (const sec of ch.sections) {
        map.set(sec.id, {
          chapterId: ch.id,
          chapterLabel: ch.label,
          chapterTitle: ch.title,
          sectionNumber: sec.number,
          sectionTitle: sec.title,
        });
      }
    }

    return map;
  }, [book]);

  // All notes with chapter & section metadata, sorted by updatedAt desc
  const allNotes = useMemo(() => {
    const list: NoteItemWithMeta[] = [];

    for (const [secId, note] of Object.entries(store.notes)) {
      if (!note || !note.text.trim()) continue;
      const info = sectionMap.get(secId);
      list.push({
        sectionId: secId,
        chapterId: info ? info.chapterId : secId.split('-')[0] || 'c01',
        chapterLabel: info ? info.chapterLabel : '',
        chapterTitle: info ? info.chapterTitle : '',
        sectionNumber: info ? info.sectionNumber : '',
        sectionTitle: info ? info.sectionTitle : secId,
        note,
      });
    }

    list.sort((a, b) => b.note.updatedAt.localeCompare(a.note.updatedAt));
    return list;
  }, [store.notes, sectionMap]);

  // Group by chapter
  const groupedByChapter = useMemo(() => {
    const map = new Map<string, NoteItemWithMeta[]>();
    for (const item of allNotes) {
      const arr = map.get(item.chapterId) || [];
      arr.push(item);
      map.set(item.chapterId, arr);
    }
    return map;
  }, [allNotes]);

  const handleDelete = (sectionId: string) => {
    if (deletingId === sectionId) {
      deleteNote(sectionId);
      setDeletingId(null);
    } else {
      setDeletingId(sectionId);
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const day = d.getDate().toString().padStart(2, '0');
      const hours = d.getHours().toString().padStart(2, '0');
      const mins = d.getMinutes().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${mins}`;
    } catch {
      return isoStr;
    }
  };

  return (
    <main
      className="content notes-page shell"
      id="main-content"
      style={{ padding: '36px 24px 64px', maxWidth: '960px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}
    >
      {/* 1. Header */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="kicker" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-muted)' }}>
            STUDY NOTES
          </span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>·</span>
          <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Phase 3</span>
        </div>
        <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', margin: '0 0 10px', fontWeight: 600, color: 'var(--ink)' }}>
          我的学习笔记
        </h1>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: '780px' }}>
          按章节汇总全书阅读过程中记录的数学推导、疑难思考与心得体会。所有笔记均保存在本机浏览器中。
        </p>
      </header>

      {/* 2. Total Count Indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border, #e5e5e0)',
          paddingBottom: '12px',
        }}
      >
        <span data-testid="notes-count-indicator" style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
          共记录 <strong>{allNotes.length}</strong> 条节笔记
        </span>
        <Link
          to={syllabusPath()}
          style={{ fontSize: '13px', color: 'var(--accent, #1a56db)', textDecoration: 'none' }}
        >
          浏览完整教材目录 →
        </Link>
      </div>

      {/* 3. Empty State */}
      {allNotes.length === 0 && !loading && (
        <section
          data-testid="notes-empty"
          style={{
            background: 'var(--bg-card, #ffffff)',
            border: '1px dashed var(--border, #e5e5e0)',
            borderRadius: '6px',
            padding: '48px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>📝</div>
          <h2 style={{ fontSize: '18px', margin: '0 0 8px', fontFamily: 'var(--font-serif)', color: 'var(--ink)' }}>
            还没有笔记
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', maxWidth: '460px', margin: '0 auto 20px', lineHeight: 1.6 }}>
            在阅读教材时，你可以在每一节末尾记录推导、疑问或心得体会，系统会自动在此汇集并支持一键直达。
          </p>
          <Link to={learnPath('c01')} className="btn btn--primary">
            前往第一章阅读 →
          </Link>
        </section>
      )}

      {/* 4. Grouped Notes List */}
      {allNotes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {Array.from(groupedByChapter.entries()).map(([chapId, notes]) => {
            const first = notes[0];
            const chapterLabel = first.chapterLabel || chapId.toUpperCase();
            const chapterTitle = first.chapterTitle || '';

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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '16px',
                    borderBottom: '1px solid var(--border, #e5e5e0)',
                    paddingBottom: '10px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--ink-muted)' }}>
                      {chapterLabel}
                    </span>
                    <h2 style={{ margin: '2px 0 0', fontSize: '18px', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--ink)' }}>
                      {formatDisplayTitle(chapterTitle)}
                    </h2>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                    {notes.length} 条笔记
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {notes.map((item) => {
                    const excerpt =
                      item.note.text.length > 120
                        ? `${item.note.text.slice(0, 120)}...`
                        : item.note.text;
                    const isConfirming = deletingId === item.sectionId;

                    return (
                      <article
                        key={item.sectionId}
                        style={{
                          background: 'var(--bg-subtle, #fcfcfb)',
                          border: '1px solid var(--border, #e5e5e0)',
                          borderRadius: '4px',
                          padding: '14px 16px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px',
                          }}
                        >
                          <Link
                            to={learnPath(item.chapterId, item.sectionId)}
                            style={{
                              fontWeight: 600,
                              fontSize: '14px',
                              color: 'var(--ink)',
                              textDecoration: 'none',
                            }}
                          >
                            {item.sectionNumber ? `${item.sectionNumber} ` : ''}
                            {formatDisplayTitle(item.sectionTitle)}
                          </Link>
                          <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>
                            {formatDate(item.note.updatedAt)}
                          </span>
                        </div>

                        {/* Pure text excerpt - no dangerouslySetInnerHTML */}
                        <p
                          style={{
                            margin: '0 0 12px',
                            fontSize: '13px',
                            lineHeight: 1.6,
                            color: 'var(--ink-secondary)',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          {excerpt}
                        </p>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderTop: '1px solid var(--border, #f0f0ee)',
                            paddingTop: '8px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleDelete(item.sectionId)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: isConfirming ? 'var(--warning, #c9510c)' : 'var(--ink-muted)',
                              fontSize: '12px',
                              cursor: 'pointer',
                              padding: 0,
                              fontWeight: isConfirming ? 600 : 400,
                            }}
                          >
                            {isConfirming ? '确认删除？' : '删除'}
                          </button>

                          <Link
                            to={learnPath(item.chapterId, item.sectionId)}
                            style={{
                              fontSize: '12px',
                              fontWeight: 500,
                              color: 'var(--accent, #1a56db)',
                              textDecoration: 'none',
                            }}
                          >
                            前往该节正文 →
                          </Link>
                        </div>
                      </article>
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
