import React from 'react';
import { Link } from 'react-router-dom';
import { learnPath, syllabusPath } from '../../lib/paths';

export interface ReaderSubnavProps {
  chapterNumber: number;
  chapterLabel: string;
  chapterTitle: string;
  progressPercentage: number;
  onOpenSettings: () => void;
  onToggleFocus: () => void;
  isFocus: boolean;
  onToggleTocDrawer: () => void;
  onToggleRailDrawer: () => void;
  prevChapterId?: string;
  nextChapterId?: string;
}

export const ReaderSubnav: React.FC<ReaderSubnavProps> = ({
  chapterLabel,
  chapterTitle,
  progressPercentage,
  onOpenSettings,
  onToggleFocus,
  isFocus,
  onToggleTocDrawer,
  onToggleRailDrawer,
  prevChapterId,
  nextChapterId,
}) => {
  return (
    <nav className="reader-top" aria-label="章节工具栏">
      <div className="reader-top__inner">
        <div className="breadcrumb">
          <Link to={syllabusPath()}>教材</Link>
          <span>/</span>
          <span>{chapterLabel}</span>
        </div>

        <div className="reader-top__title" title={chapterTitle}>
          {chapterTitle}
        </div>

        <div
          className="reader-top__progress"
          aria-label={`本章阅读进度 ${progressPercentage}%`}
          title={`本章进度 ${progressPercentage}%`}
        >
          <i style={{ width: `${progressPercentage}%` }} />
        </div>

        <div className="reader-top__tools">
          {prevChapterId && (
            <Link
              to={learnPath(prevChapterId)}
              className="icon-btn"
              title="上一章"
              aria-label="上一章"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Link>
          )}

          {nextChapterId && (
            <Link
              to={learnPath(nextChapterId)}
              className="icon-btn"
              title="下一章"
              aria-label="下一章"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          )}

          <button
            type="button"
            className="icon-btn"
            onClick={onOpenSettings}
            title="阅读版式与字号设置 (Aa)"
            aria-label="字号与版式设置"
          >
            Aa
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleFocus}
            title={isFocus ? '退出专注模式 (f)' : '开启专注模式 (f)'}
            aria-label={isFocus ? '退出专注模式' : '开启专注模式'}
            aria-pressed={isFocus}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isFocus ? (
                <>
                  <path d="M4 14h6v6" />
                  <path d="M20 10h-6V4" />
                  <path d="M14 10l7-7" />
                  <path d="M10 14l-7 7" />
                </>
              ) : (
                <>
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M16 3h3a2 2 0 0 1 2 2v3" />
                  <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </>
              )}
            </svg>
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTocDrawer}
            title="全书目录"
            aria-label="查看全书目录"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="14" y2="12" />
              <line x1="4" y1="18" x2="18" y2="18" />
            </svg>
          </button>

          <button
            type="button"
            className="icon-btn"
            onClick={onToggleRailDrawer}
            title="本节信息与大纲"
            aria-label="查看本节信息与大纲"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
