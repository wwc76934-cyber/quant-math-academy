import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { StudyTabs } from '../components/layout/StudyTabs';
import { EmptyState } from '../components/ui/EmptyState';
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
    <main className="page page--narrow notes-page" id="main-content">
      <PageHeader
        title="笔记"
        lede="阅读时在每节末尾写下的笔记都汇总在这里，按章节归类，最近修改的排在前面。"
      />
      <StudyTabs />

      <div className="notes-toolbar">
        <span data-testid="notes-count-indicator">共 {allNotes.length} 条笔记</span>
        <Link to={syllabusPath()}>打开目录</Link>
      </div>

      {allNotes.length === 0 && !loading && (
        <div data-testid="notes-empty">
          <EmptyState
            title="还没有笔记"
            description="打开任意一节，在正文末尾的笔记框里记下推导、疑问或心得，保存后会出现在这里。"
            action={
              <Link to={learnPath('c01')} className="btn btn--primary">
                从第 1 章开始读
              </Link>
            }
          />
        </div>
      )}

      {allNotes.length > 0 &&
        Array.from(groupedByChapter.entries()).map(([chapId, notes]) => {
          const first = notes[0];
          const chapterLabel = first.chapterLabel || chapId.toUpperCase();
          const chapterTitle = first.chapterTitle || '';

          return (
            <section key={chapId} className="list-group" aria-labelledby={`notes-${chapId}`}>
              <h2 id={`notes-${chapId}`} className="list-group__title">
                {chapterLabel} {formatDisplayTitle(chapterTitle)} · {notes.length} 条
              </h2>
              <ul className="list">
                {notes.map((item) => {
                  const excerpt =
                    item.note.text.length > 160 ? `${item.note.text.slice(0, 160)}…` : item.note.text;
                  const isConfirming = deletingId === item.sectionId;
                  const href = learnPath(item.chapterId, item.sectionId);

                  return (
                    <li key={item.sectionId} className="note-item">
                      <div className="note-item__head">
                        <Link to={href} className="note-item__title">
                          {item.sectionNumber ? `${item.sectionNumber} ` : ''}
                          {formatDisplayTitle(item.sectionTitle)}
                        </Link>
                        <time dateTime={item.note.updatedAt}>{formatDate(item.note.updatedAt)}</time>
                      </div>
                      {/* Plain text only: notes are never rendered as HTML */}
                      <p className="note-item__text">{excerpt}</p>
                      <div className="note-item__actions">
                        <Link to={href}>前往该节正文</Link>
                        <button
                          type="button"
                          className={isConfirming ? 'is-confirming' : ''}
                          onClick={() => handleDelete(item.sectionId)}
                          onBlur={() => isConfirming && setDeletingId(null)}
                        >
                          {isConfirming ? '确认删除？' : '删除'}
                        </button>
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
