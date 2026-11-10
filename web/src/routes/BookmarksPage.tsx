import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadBook } from '../features/content/loadBook';
import { Book, BookChapter, BookSectionItem } from '../features/content/types';
import { useStore } from '../features/store/store';
import { FormulaBookmarkMeta } from '../features/store/types';

interface GroupedBookmarks {
  chapterId: string;
  chapterLabel: string;
  items: Array<{
    id: string;
    meta?: FormulaBookmarkMeta;
    tagOrId: string;
    sectionTitle?: string;
    jumpUrl: string;
    isLegacy: boolean;
  }>;
}

export const BookmarksPage: React.FC = () => {
  const { store, toggleFormulaBookmark } = useStore();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadBook()
      .then((data) => {
        if (!cancelled) {
          setBook(data);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const { chapterMap, sectionMap } = useMemo(() => {
    const chMap = new Map<string, BookChapter>();
    const secMap = new Map<string, { section: BookSectionItem; chapter: BookChapter }>();

    if (book) {
      for (const ch of book.chapters) {
        chMap.set(ch.id.toLowerCase(), ch);
        for (const sec of ch.sections) {
          secMap.set(sec.id, { section: sec, chapter: ch });
        }
      }
    }
    return { chapterMap: chMap, sectionMap: secMap };
  }, [book]);

  const formulas = store.bookmarks?.formulas || [];
  const formulaMeta = store.bookmarks?.formulaMeta || {};

  const groupedList = useMemo(() => {
    if (formulas.length === 0) return [];

    const map = new Map<string, GroupedBookmarks['items']>();

    for (const id of formulas) {
      const meta = formulaMeta[id];
      const isLegacy = !meta;

      let chapterId = meta?.chapterId;
      if (!chapterId && meta?.sectionId) {
        const secEntry = sectionMap.get(meta.sectionId);
        if (secEntry) {
          chapterId = secEntry.chapter.id;
        }
      }
      if (!chapterId) {
        const match = id.match(/^(c\d+)/i);
        if (match) {
          chapterId = match[1].toLowerCase();
        } else {
          chapterId = 'unknown';
        }
      }

      let sectionTitle = '';
      if (meta?.sectionId) {
        const secInfo = sectionMap.get(meta.sectionId);
        if (secInfo) {
          sectionTitle = `${secInfo.section.number} ${secInfo.section.title}`;
        } else {
          sectionTitle = meta.sectionId;
        }
      }

      const tagOrId = meta?.tag || id;
      const jumpChapterId = chapterId === 'unknown' ? 'c01' : chapterId;
      const jumpUrl = `/learn/${jumpChapterId}#${id}`;

      const item = {
        id,
        meta,
        tagOrId,
        sectionTitle,
        jumpUrl,
        isLegacy,
      };

      const existing = map.get(chapterId) || [];
      existing.push(item);
      map.set(chapterId, existing);
    }

    const groups: GroupedBookmarks[] = [];
    for (const [chapterId, items] of map.entries()) {
      let chapterLabel = '';
      const ch = chapterMap.get(chapterId.toLowerCase());
      if (ch) {
        chapterLabel = `${ch.id.toUpperCase()} ${ch.label} ${ch.title}`;
      } else if (chapterId !== 'unknown') {
        chapterLabel = `${chapterId.toUpperCase()} 章节`;
      } else {
        chapterLabel = '其他收藏';
      }

      groups.push({
        chapterId,
        chapterLabel,
        items,
      });
    }

    return groups;
  }, [formulas, formulaMeta, chapterMap, sectionMap]);

  const handleRemove = (item: { id: string; meta?: FormulaBookmarkMeta }) => {
    toggleFormulaBookmark({
      id: item.id,
      latex: item.meta?.latex || '',
      tag: item.meta?.tag,
      chapterId: item.meta?.chapterId || '',
      sectionId: item.meta?.sectionId || '',
    });
  };

  return (
    <main className="content bookmarks-page shell" id="main-content">
      <header className="bookmarks-page__header">
        <h1>学习收藏夹</h1>
        <p className="bookmarks-page__intro">公式收藏保存在本机</p>
      </header>

      {formulas.length === 0 ? (
        <div className="bookmarks-page__empty">
          <p>还没有收藏公式</p>
          <div className="bookmarks-page__empty-links">
            <Link to="/syllabus" className="btn btn--secondary">
              浏览教材
            </Link>
            <Link to="/search" className="btn btn--secondary">
              搜索内容
            </Link>
          </div>
        </div>
      ) : (
        <div className="bookmarks-page__groups">
          {groupedList.map((group) => (
            <section key={group.chapterId} className="bookmarks-group">
              <h2 className="bookmarks-group__title">{group.chapterLabel}</h2>
              <ul className="bookmarks-list">
                {group.items.map((item) => (
                  <li key={item.id} className="bookmark-item">
                    <div className="bookmark-item__header">
                      <span className="bookmark-item__identifier">{item.tagOrId}</span>
                      {item.sectionTitle && (
                        <span className="bookmark-item__section">{item.sectionTitle}</span>
                      )}
                    </div>

                    <div className="bookmark-item__body">
                      {item.isLegacy ? (
                        <p className="bookmark-item__legacy-tip">
                          旧收藏，请重新收藏以保存公式
                        </p>
                      ) : (
                        <pre className="bookmark-item__latex">
                          <code>{item.meta?.latex}</code>
                        </pre>
                      )}
                    </div>

                    <div className="bookmark-item__actions">
                      <Link to={item.jumpUrl} className="bookmark-item__jump-link">
                        跳转公式
                      </Link>
                      <button
                        type="button"
                        className="bookmark-item__remove-btn"
                        onClick={() => handleRemove(item)}
                      >
                        取消收藏
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
};
