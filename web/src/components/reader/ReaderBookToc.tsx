import React, { useEffect, useRef, useState } from 'react';
import { Book, BookChapter, BookPart } from '../../features/content/types';
import { useStore } from '../../features/store/store';
import { formatChapterNumber, formatChinesePartLabel } from '../../lib/format';
import { StatusDot } from '../metadata/StatusDot';

export interface ReaderBookTocProps {
  book: Book;
  currentChapterId: string;
  currentSectionId: string;
  onSelectSection: (chapterId: string, sectionId: string) => void;
  onClose?: () => void;
}

export const ReaderBookToc: React.FC<ReaderBookTocProps> = ({
  book,
  currentChapterId,
  currentSectionId,
  onSelectSection,
  onClose,
}) => {
  const { store } = useStore();
  const pilotSet = new Set(book.pilotChapterIds || ['c01', 'c08', 'c11', 'c33']);

  // Find which part the current chapter belongs to
  const initialPart = book.parts.find((p) => p.chapterIds.includes(currentChapterId));

  const [expandedParts, setExpandedParts] = useState<Set<string>>(() => {
    const s = new Set<string>();
    if (initialPart) s.add(initialPart.id);
    return s;
  });

  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  // Auto-scroll current section into view on first load or section change
  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [currentSectionId]);

  const togglePart = (partId: string) => {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(partId)) next.delete(partId);
      else next.add(partId);
      return next;
    });
  };

  const handleSectionClick = (e: React.MouseEvent, chapterId: string, sectionId: string) => {
    e.preventDefault();
    onSelectSection(chapterId, sectionId);
    if (onClose) onClose();
  };

  return (
    <nav className="book-toc" aria-label="全书完整目录">
      {book.parts.map((part: BookPart) => {
        const isPartExpanded = expandedParts.has(part.id);

        return (
          <div key={part.id} className="book-toc__part">
            <button
              type="button"
              className="kicker"
              onClick={() => togglePart(part.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: '100%',
                textAlign: 'left',
              }}
              aria-expanded={isPartExpanded}
            >
              <span>{isPartExpanded ? '▾' : '▸'}</span>
              <span>
                {formatChinesePartLabel(part.order)} · {part.title}
              </span>
            </button>

            {isPartExpanded &&
              part.chapterIds.map((chapId) => {
                const chapter = book.chapters.find((c: BookChapter) => c.id === chapId);
                if (!chapter) return null;

                const isCurrentChap = chapter.id === currentChapterId;
                const isPilot = pilotSet.has(chapter.id);

                return (
                  <div key={chapter.id} style={{ marginBottom: '8px' }}>
                    <div
                      className={`book-toc__chapter ${isCurrentChap ? 'is-current' : ''}`}
                      title={chapter.title}
                    >
                      <span className="num">{formatChapterNumber(chapter.number)}</span>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {chapter.title}
                      </span>
                      {!isPilot && (
                        <span className="tiny" style={{ fontSize: '9px', color: 'var(--ink-faint)' }}>
                          接入中
                        </span>
                      )}
                    </div>

                    {/* If this chapter is current, or if pilot, show sections */}
                    {isCurrentChap && (
                      <div className="book-toc__sections">
                        {chapter.sections.map((sec) => {
                          const isCurrentSec = sec.id === currentSectionId;
                          const progress = store.progress[sec.id]?.status || 'empty';

                          if (!isPilot) {
                            return (
                              <div
                                key={sec.id}
                                className="book-toc__section is-disabled"
                                title="该章节内容接入中"
                              >
                                <span className="num">{sec.number}</span>
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {sec.title}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <a
                              key={sec.id}
                              ref={isCurrentSec ? activeItemRef : null}
                              href={`#${sec.id}`}
                              className={`book-toc__section ${isCurrentSec ? 'is-current' : ''}`}
                              onClick={(e) => handleSectionClick(e, chapter.id, sec.id)}
                              aria-current={isCurrentSec ? 'location' : undefined}
                            >
                              <StatusDot status={progress} />
                              <span className="num">{sec.number}</span>
                              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {sec.title}
                              </span>
                            </a>
                          );
                        })}

                        {/* Chapter summary & exercises entries */}
                        {isPilot && (
                          <>
                            <a
                              href="#summary"
                              className={`book-toc__section ${currentSectionId === 'summary' ? 'is-current' : ''}`}
                              onClick={(e) => handleSectionClick(e, chapter.id, 'summary')}
                            >
                              <span className="dot dot--empty" />
                              <span className="num">小结</span>
                              <span>本章小结</span>
                            </a>
                            <a
                              href="#exercises"
                              className={`book-toc__section ${currentSectionId === 'exercises' ? 'is-current' : ''}`}
                              onClick={(e) => handleSectionClick(e, chapter.id, 'exercises')}
                            >
                              <span className="dot dot--empty" />
                              <span className="num">练习</span>
                              <span>习题</span>
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        );
      })}
    </nav>
  );
};
