import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionData } from '../../features/content/types';
import { loadGraph } from '../../features/graph/loadGraph';
import { GraphData } from '../../features/graph/types';
import { useStore } from '../../features/store/store';
import { SectionProgressStatus } from '../../features/store/types';
import { formatMinutes } from '../../lib/format';
import { DifficultyBadge } from '../metadata/DifficultyBadge';
import { PriorityBadge } from '../metadata/PriorityBadge';
import { STATUS_LABELS, StatusDot } from '../metadata/StatusDot';

export interface ReaderSectionInfoProps {
  section?: SectionData | null;
  chapterTitle: string;
  sectionLookup?: Record<string, { number: string; title: string }>;
  onOpenStatusModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenSection?: (sectionId: string) => void;
}

export const ReaderSectionInfo: React.FC<ReaderSectionInfoProps> = ({
  section,
  chapterTitle,
  sectionLookup,
  onOpenStatusModal,
  onScrollToSection,
  onOpenSection,
}) => {
  const { store } = useStore();
  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  // Lazy load graph data for transitive prerequisite chains and incoming citations
  useEffect(() => {
    let active = true;
    loadGraph()
      .then((data) => {
        if (active) setGraphData(data);
      })
      .catch(() => {
        // Silently fallback if graph is unavailable
      });
    return () => {
      active = false;
    };
  }, []);

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

  // Graph ancestors and citations for current section
  const ancestors = graphData?.ancestors?.[section.id] || [];
  const incoming = graphData?.incoming?.[section.id];
  const incomingPrereqs = incoming?.prerequisites || [];
  const incomingRelated = incoming?.related || [];

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
            考查频率
            <b>
              {meta?.examFrequency === 'high'
                ? '高'
                : meta?.examFrequency === 'medium'
                ? '中'
                : meta?.examFrequency === 'low'
                ? '低'
                : '—'}
            </b>
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

      {/* Prerequisite Chain (Direct & Transitive 2-3 levels) */}
      {hasMeta && (
        <div className="rail__block" data-testid="reader-prereq-chain">
          <div className="rail__title">先修知识链</div>
          {ancestors.length > 0 ? (
            <ul className="rail-list">
              {ancestors.map((item, idx) => {
                const preProgress = store.progress[item.id]?.status || 'empty';
                const info = sectionLookup?.[item.id] || graphData?.nodeMap?.[item.id];
                const label = info ? `${info.number} ${info.title}` : item.id;
                const isReq = item.strength === 'required';
                const depthLabel =
                  item.depth === 1 ? '直接' : `${item.depth}层传递`;

                return (
                  <li key={idx} style={{ alignItems: 'baseline', gap: '6px' }}>
                    <StatusDot status={preProgress} />
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        (onOpenSection || onScrollToSection)(item.id);
                      }}
                      style={{ flex: 1 }}
                    >
                      {label}
                    </a>
                    <span className="tiny" style={{ color: 'var(--ink-secondary)' }}>
                      {depthLabel} · {isReq ? '必要' : '有益'}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : meta.prerequisites && meta.prerequisites.length > 0 ? (
            /* Fallback to direct prerequisites before graph loads */
            <ul className="rail-list">
              {meta.prerequisites.map((pre, idx) => {
                const preId = typeof pre === 'string' ? pre : pre.id;
                const strength = typeof pre === 'string' ? 'required' : pre.strength || 'required';
                const preProgress = store.progress[preId]?.status || 'empty';
                const info = sectionLookup?.[preId];
                const label = info ? `${info.number} ${info.title}` : preId;

                return (
                  <li key={idx}>
                    <StatusDot status={preProgress} />
                    <a
                      href={`#${preId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        (onOpenSection || onScrollToSection)(preId);
                      }}
                    >
                      {label}
                    </a>
                    <span className="tiny">{strength === 'required' ? '必要' : '有益'}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="rail-note" style={{ color: 'var(--ink-secondary)' }}>
              无前置先修（独立或基础章节）
            </p>
          )}
        </div>
      )}

      {/* Citations (Who references this section) */}
      {hasMeta && (
        <div className="rail__block" data-testid="reader-incoming-citations">
          <div className="rail__title">被引用情况</div>
          {incomingPrereqs.length > 0 || incomingRelated.length > 0 ? (
            <div>
              {incomingPrereqs.length > 0 && (
                <div style={{ marginBottom: incomingRelated.length > 0 ? '8px' : '0' }}>
                  <div
                    className="tiny"
                    style={{
                      color: 'var(--ink-secondary)',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    作为先修被引用 ({incomingPrereqs.length} 节)：
                  </div>
                  <ul className="rail-list">
                    {incomingPrereqs.map((inc, idx) => {
                      const info = sectionLookup?.[inc.id] || graphData?.nodeMap?.[inc.id];
                      const label = info ? `${info.number} ${info.title}` : inc.id;
                      return (
                        <li key={idx}>
                          <a
                            href={`#${inc.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              (onOpenSection || onScrollToSection)(inc.id);
                            }}
                          >
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {incomingRelated.length > 0 && (
                <div>
                  <div
                    className="tiny"
                    style={{
                      color: 'var(--ink-secondary)',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    相关横向关联 ({incomingRelated.length} 节)：
                  </div>
                  <ul className="rail-list">
                    {incomingRelated.slice(0, 6).map((relId, idx) => {
                      const info = sectionLookup?.[relId] || graphData?.nodeMap?.[relId];
                      const label = info ? `${info.number} ${info.title}` : relId;
                      return (
                        <li key={idx}>
                          <a
                            href={`#${relId}`}
                            onClick={(e) => {
                              e.preventDefault();
                              (onOpenSection || onScrollToSection)(relId);
                            }}
                          >
                            {label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="rail-note" style={{ color: 'var(--ink-secondary)' }}>
              暂无
            </p>
          )}
        </div>
      )}

      {/* Related Concepts (Fallback direct if no graph loaded yet) */}
      {hasMeta && meta.related && meta.related.length > 0 && !incoming && (
        <div className="rail__block">
          <div className="rail__title">相关知识点</div>
          <ul className="rail-list">
            {meta.related.slice(0, 6).map((item, idx) => {
              const info = sectionLookup?.[item];
              const label = info ? `${info.number} ${info.title}` : item;
              return (
                <li key={idx}>
                  <a
                    href={`#${item}`}
                    onClick={(e) => {
                      e.preventDefault();
                      (onOpenSection || onScrollToSection)(item);
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
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

      {/* Link to Full Graph */}
      <div className="rail__block" style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
        <Link
          to={`/graph?section=${section.id}`}
          className="rail-graph-link"
          style={{
            fontSize: '13px',
            color: 'var(--accent)',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>查看完整知识关系</span>
          <span>→</span>
        </Link>
      </div>
    </>
  );
};
