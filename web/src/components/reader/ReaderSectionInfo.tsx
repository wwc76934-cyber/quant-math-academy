import React, { useState } from 'react';
import { SectionData } from '../../features/content/types';
import { useStore } from '../../features/store/store';
import { SectionProgressStatus } from '../../features/store/types';
import { formatMinutes } from '../../lib/format';
import { DifficultyBadge } from '../metadata/DifficultyBadge';
import { PriorityBadge } from '../metadata/PriorityBadge';
import { STATUS_LABELS, StatusDot } from '../metadata/StatusDot';

export interface ReaderSectionInfoProps {
  section?: SectionData | null;
  chapterTitle: string;
  onOpenStatusModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const ReaderSectionInfo: React.FC<ReaderSectionInfoProps> = ({
  section,
  chapterTitle,
  onOpenStatusModal,
  onScrollToSection,
}) => {
  const { store } = useStore();
  const [rationaleOpen, setRationaleOpen] = useState(false);

  if (!section) {
    return (
      <div className="rail__block">
        <div className="rail__title">本章概览</div>
        <p className="rail-note" style={{ color: 'var(--ink-secondary)' }}>
          {chapterTitle}
        </p>
      </div>
    );
  }

  const meta = section.meta;
  const progress: SectionProgressStatus = store.progress[section.id]?.status || 'empty';
  const hasMeta = meta !== null && meta !== undefined;

  return (
    <>
      <div className="rail__block">
        <div className="rail__title">本节信息</div>
        <div className="section-meta__badges">
          {hasMeta && meta.difficulty ? (
            <DifficultyBadge
              level={
                typeof meta.difficulty === 'number'
                  ? meta.difficulty
                  : parseInt(meta.difficulty.replace('D', ''), 10)
              }
            />
          ) : null}
          {hasMeta && meta.priority ? <PriorityBadge priority={meta.priority} /> : null}
          {!hasMeta && <span className="small muted">标注完善中</span>}
        </div>

        <div className="section-meta__grid">
          <div>
            预计时间
            <b>{formatMinutes(meta?.minutes)}</b>
          </div>
          <div>
            高频考查
            <b>{meta?.priority === 'P0' ? '是' : '—'}</b>
          </div>
          <div>
            学习状态
            <button
              type="button"
              onClick={onOpenStatusModal}
              aria-label={`修改学习状态，当前：${STATUS_LABELS[progress]}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                marginTop: '2px',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink)',
                padding: '2px 6px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
              }}
              title="点击修改学习状态"
            >
              <StatusDot status={progress} />
              <span>{STATUS_LABELS[progress]} ▾</span>
            </button>
          </div>
          <div>
            习题关联
            <b>{section.exerciseIds.length > 0 ? `${section.exerciseIds.length} 道` : '章末统一'}</b>
          </div>
        </div>
      </div>

      {/* Learning Objective */}
      {hasMeta && meta.learningObjective && (
        <div className="rail__block">
          <div className="rail__title">学习目标</div>
          <p className="rail-note">{meta.learningObjective}</p>
        </div>
      )}

      {/* Prerequisites */}
      {hasMeta && meta.prerequisites && meta.prerequisites.length > 0 && (
        <div className="rail__block">
          <div className="rail__title">先修知识</div>
          <ul className="rail-list">
            {meta.prerequisites.map((pre, idx) => {
              const preId = typeof pre === 'string' ? pre : pre.id;
              const strength = typeof pre === 'string' ? 'required' : pre.strength || 'required';
              const preProgress = store.progress[preId]?.status || 'empty';

              return (
                <li key={idx}>
                  <StatusDot status={preProgress} />
                  <a
                    href={`#${preId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onScrollToSection(preId);
                    }}
                  >
                    {preId}
                  </a>
                  <span className="tiny">{strength === 'required' ? '必要' : '有益'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Related Concepts */}
      {hasMeta && meta.related && meta.related.length > 0 && (
        <div className="rail__block">
          <div className="rail__title">相关知识点</div>
          <ul className="rail-list">
            {meta.related.slice(0, 6).map((item, idx) => (
              <li key={idx}>
                <a
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection(item);
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quantitative Applications */}
      {hasMeta && meta.applications && meta.applications.length > 0 && (
        <div className="rail__block">
          <div className="rail__title">量化应用</div>
          <ul className="rail-list">
            {meta.applications.slice(0, 4).map((app, idx) => (
              <li key={idx} style={{ color: 'var(--ink-secondary)' }}>
                {app}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rationale Foldable */}
      {hasMeta && meta.rationale && (
        <div className="rail__block">
          <button
            type="button"
            className="rail__title"
            onClick={() => setRationaleOpen(!rationaleOpen)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              width: '100%',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            <span>为什么这样标注</span>
            <span>{rationaleOpen ? '▾' : '▸'}</span>
          </button>
          {rationaleOpen && <p className="rail-note">{meta.rationale}</p>}
        </div>
      )}
    </>
  );
};
