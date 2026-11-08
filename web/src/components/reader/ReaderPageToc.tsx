import React from 'react';
import { ChapterData } from '../../features/content/types';

export interface ReaderPageTocProps {
  chapterData: ChapterData;
  currentSectionId: string;
  onScrollTo: (targetId: string) => void;
}

export const ReaderPageToc: React.FC<ReaderPageTocProps> = ({
  chapterData,
  currentSectionId,
  onScrollTo,
}) => {
  return (
    <div className="rail__block">
      <div className="rail__title">本页目录</div>
      <nav className="page-toc" aria-label="本章目录导航">
        {chapterData.sections.map((sec) => {
          const isCurrent = sec.id === currentSectionId;

          return (
            <React.Fragment key={sec.id}>
              <a
                href={`#${sec.id}`}
                className={isCurrent ? 'is-current' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onScrollTo(sec.id);
                }}
              >
                {sec.number} {sec.title}
              </a>

              {/* Subsections if current */}
              {isCurrent &&
                sec.subsections &&
                sec.subsections.map((sub) => (
                  <a
                    key={sub.id}
                    href={`#${sub.anchor || sub.id}`}
                    className="sub"
                    onClick={(e) => {
                      e.preventDefault();
                      onScrollTo(sub.anchor || sub.id);
                    }}
                  >
                    {sub.number} {sub.title}
                  </a>
                ))}
            </React.Fragment>
          );
        })}

        {chapterData.summaryHtml && (
          <a
            href="#summary"
            className={currentSectionId === 'summary' ? 'is-current' : ''}
            onClick={(e) => {
              e.preventDefault();
              onScrollTo('summary');
            }}
          >
            本章小结
          </a>
        )}

        <a
          href="#exercises"
          className={currentSectionId === 'exercises' ? 'is-current' : ''}
          onClick={(e) => {
            e.preventDefault();
            onScrollTo('exercises');
          }}
        >
          习题
        </a>
      </nav>
    </div>
  );
};
