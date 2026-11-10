import React from 'react';
import { Link } from 'react-router-dom';
import {
  Book,
  BookChapter,
  BookPart,
  BookSectionItem,
  PriorityLevel,
} from '../../features/content/types';
import { useStore } from '../../features/store/store';
import { SectionProgressStatus } from '../../features/store/types';
import {
  formatChapterNumber,
  formatChinesePartLabel,
  formatDisplayTitle,
  formatMinutes,
} from '../../lib/format';
import { learnPath } from '../../lib/paths';
import { DifficultyBadge } from '../metadata/DifficultyBadge';
import { PriorityBadge } from '../metadata/PriorityBadge';
import { STATUS_LABELS, StatusDot } from '../metadata/StatusDot';

export interface ChapterListProps {
  book: Book;
  openChapterIds: Set<string>;
  onToggleChapter: (chapterId: string) => void;
  filterMode?: 'all' | 'p0_p1' | 'unlearned' | 'annotated';
}

function getChapterMetaSummary(chapter: BookChapter) {
  const annotated = chapter.sections.filter(
    (s) => s.difficulty !== null || s.priority !== null
  );
  if (annotated.length === 0) {
    return { hasMeta: false };
  }

  const difficulties = annotated
    .map((s) => s.difficulty)
    .filter((d): d is NonNullable<BookSectionItem['difficulty']> => d !== null)
    .map((d) => Number(String(d).replace(/^D/, '')))
    .filter((d) => Number.isFinite(d));
  const priorities = annotated
    .map((s) => s.priority)
    .filter((p): p is PriorityLevel => p !== null);

  let dRange: string | null = null;
  if (difficulties.length > 0) {
    const minD = Math.min(...difficulties);
    const maxD = Math.max(...difficulties);
    dRange = minD === maxD ? `D${minD}` : `D${minD}–D${maxD}`;
  }

  const hasP0 = priorities.includes('P0');
  const hasP1 = priorities.includes('P1');
  let pLabel: string | null = null;
  if (hasP0 && hasP1) pLabel = 'P0/P1';
  else if (hasP0) pLabel = 'P0';
  else if (hasP1) pLabel = 'P1';

  return {
    hasMeta: true,
    dRange,
    pLabel,
  };
}

export const ChapterList: React.FC<ChapterListProps> = ({
  book,
  openChapterIds,
  onToggleChapter,
  filterMode = 'all',
}) => {
  const { store } = useStore();

  // Filter chapters
  const filteredChapters = book.chapters.filter((chapter) => {
    if (filterMode === 'all') return true;

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
      return chapter.sections.some((s) => {
        const item = store.progress[s.id];
        return !item || (item.status !== 'done' && item.status !== 'master');
      });
    }

    return true;
  });

  const filteredChapterMap = new Map(filteredChapters.map((c) => [c.id, c]));

  return (
    <div className="chapter-list">
      {book.parts.map((part: BookPart) => {
        // Chapters belonging to this part that passed the filter
        const partChapters = part.chapterIds
          .map((id) => filteredChapterMap.get(id))
          .filter((c): c is BookChapter => Boolean(c));

        if (partChapters.length === 0) {
          return null;
        }

        return (
          <section key={part.id} id={part.id} aria-labelledby={`head-${part.id}`}>
            <div className="part-head" id={`head-${part.id}`}>
              <span className="kicker">{formatChinesePartLabel(part.order)}</span>
              <h2>{part.title}</h2>
            </div>

            {partChapters.map((chapter) => {
              const isOpen = openChapterIds.has(chapter.id);
              const metaSummary = getChapterMetaSummary(chapter);

              let completedCount = 0;
              const totalSections = chapter.sections.length;
              chapter.sections.forEach((s) => {
                const status = store.progress[s.id]?.status;
                if (status === 'done' || status === 'master') {
                  completedCount++;
                }
              });

              const countText =
                completedCount > 0
                  ? `${completedCount} / ${totalSections} 已学`
                  : `0 / ${totalSections} 已学`;

              return (
                <div
                  key={chapter.id}
                  className={`chapter ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="chapter__row"
                    onClick={() => onToggleChapter(chapter.id)}
                    aria-expanded={isOpen}
                    aria-controls={`sections-${chapter.id}`}
                  >
                    <span className="chapter__num">
                      {formatChapterNumber(chapter.number)}
                    </span>
                    <span className="chapter__title">{formatDisplayTitle(chapter.title)}</span>
                    <span className="chapter__meta">
                      {metaSummary.hasMeta ? (
                        <>
                          {metaSummary.dRange && (
                            <DifficultyBadge range={metaSummary.dRange} />
                          )}
                          {metaSummary.pLabel && (
                            <PriorityBadge label={metaSummary.pLabel} />
                          )}
                        </>
                      ) : (
                        <span className="small muted">—</span>
                      )}
                      <span className="small muted">
                        {chapter.sectionCount || totalSections} 节
                      </span>
                    </span>
                    <span className="chapter__count">{countText}</span>
                  </button>

                  {isOpen && (
                    <div
                      id={`sections-${chapter.id}`}
                      className="sections"
                      role="region"
                      aria-label={`${chapter.title} 节列表`}
                    >
                      {chapter.sections.map((sec: BookSectionItem) => {
                        const secProgress = store.progress[sec.id];
                        const secStatus: SectionProgressStatus =
                          secProgress?.status || 'empty';
                        const hasSecMeta =
                          sec.difficulty !== null || sec.priority !== null;

                        return (
                          <Link
                            key={sec.id}
                            to={learnPath(chapter.id, sec.anchor || sec.id)}
                            className="section-row"
                          >
                            <span className="section-row__num">
                              {sec.number}
                            </span>
                            <span className="section-row__title">
                              {formatDisplayTitle(sec.title)}
                            </span>
                            <span className="section-row__meta">
                              {hasSecMeta ? (
                                <>
                                  <DifficultyBadge level={sec.difficulty} />
                                  <PriorityBadge priority={sec.priority} />
                                </>
                              ) : (
                                <span className="small muted">—</span>
                              )}
                            </span>
                            <span className="section-row__status">
                              <StatusDot status={secStatus} />
                              <span>{STATUS_LABELS[secStatus]}</span>
                            </span>
                            <span className="section-row__time">
                              {formatMinutes(sec.minutes)}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}
    </div>
  );
};
