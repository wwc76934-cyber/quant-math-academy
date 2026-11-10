import React, { useEffect, useRef, useState } from 'react';
import { Book, BookChapter, BookPart } from '../../features/content/types';
import { useStore } from '../../features/store/store';
import {
  formatChinesePartLabel,
  formatDisplayTitle,
} from '../../lib/format';
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
              className="book-toc__part-btn"
              onClick={() => togglePart(part.id)}
              aria-expanded={isPartExpanded}
            >
              <span>
                {formatChinesePartLabel(part.order)} · {part.title}
              </span>
            </button>

            {isPartExpanded &&
              part.chapterIds.map((chapId) => {
                const chapter = book.chapters.find((c: BookChapter) => c.id === chapId);
                if (!chapter) return null;

                const isCurrentChap = chapter.id === currentChapterId;
                const firstSection = chapter.sections[0];

                return (
                  <div key={chapter.id} className="book-toc__chapter-wrap">
                    <button
                      type="button"
                      className={`book-toc__chapter ${isCurrentChap ? 'is-current' : ''}`}
                      title={isCurrentChap ? chapter.title : `打开 ${chapter.title}`}
                      onClick={() => {
                        if (!isCurrentChap && firstSection) {
                          onSelectSection(chapter.id, firstSection.id);
                          if (onClose) onClose();
                        }
                      }}
                      aria-current={isCurrentChap ? 'page' : undefined}
                    >
                      <span className="num">{chapter.number}</span>
                      <span className="label">{formatDisplayTitle(chapter.title)}</span>
                    </button>

                    {isCurrentChap && (
                      <div className="book-toc__sections">
                        {chapter.sections.map((sec) => {
                          const isCurrentSec = sec.id === currentSectionId;
                          const progress = store.progress[sec.id]?.status || 'empty';

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
                              <span className="label">{formatDisplayTitle(sec.title)}</span>
                            </a>
                          );
                        })}

                        {/* Chapter summary & exercises entries */}
                        <a
                          href="#summary"
                          className={`book-toc__section ${currentSectionId === 'summary' ? 'is-current' : ''}`}
                          onClick={(e) => handleSectionClick(e, chapter.id, 'summary')}
                        >
                          <span className="dot dot--empty" />
                          <span className="num">小结</span>
                          <span className="label">本章小结</span>
                        </a>
                        <a
                          href="#exercises"
                          className={`book-toc__section ${currentSectionId === 'exercises' ? 'is-current' : ''}`}
                          onClick={(e) => handleSectionClick(e, chapter.id, 'exercises')}
                        >
                          <span className="dot dot--empty" />
                          <span className="num">练习</span>
                          <span className="label">习题</span>
                        </a>
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
