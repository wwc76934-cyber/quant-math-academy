import React, { useEffect, useRef } from 'react';
import { useStore } from '../../features/store/store';
import { SectionProgressStatus } from '../../features/store/types';
import { STATUS_LABELS, StatusDot } from '../metadata/StatusDot';
import { useToast } from './Toast';

export interface ReaderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  sectionTitle: string;
}

const STATUS_DESCRIPTIONS: Record<SectionProgressStatus, string> = {
  empty: '尚未开始阅读，或仅粗略浏览过标题。',
  learn: '正在阅读正文，逐步推导核心概念与定理。',
  done: '已完整读完全节正文，理解所有定义与定理推导。',
  master: '能独立复现核心证明与公式，并能熟练完成相关习题。',
  review: '部分推导或细节尚存疑，需在后续复习周期中回看。',
};

export const ReaderStatusModal: React.FC<ReaderStatusModalProps> = ({
  isOpen,
  onClose,
  sectionId,
  sectionTitle,
}) => {
  const { store, updateSectionProgress } = useStore();
  const { showToast } = useToast();
  const currentStatus: SectionProgressStatus = store.progress[sectionId]?.status || 'empty';
  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (status: SectionProgressStatus) => {
    updateSectionProgress(sectionId, { status });
    showToast(`已将「${sectionTitle}」标记为：${STATUS_LABELS[status]}`);
    onClose();
  };

  const statuses: SectionProgressStatus[] = ['empty', 'learn', 'done', 'master', 'review'];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="选择学习状态"
      onClick={onClose}
    >
      <div
        className="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>学习状态设置</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        <p className="small muted" style={{ margin: '0 0 16px' }}>
          为当前节「{sectionTitle}」选择学习进展：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {statuses.map((s) => {
            const isSelected = currentStatus === s;

            return (
              <button
                key={s}
                type="button"
                onClick={() => handleSelect(s)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected
                    ? '2px solid var(--accent)'
                    : '1px solid var(--line)',
                  background: isSelected ? 'var(--bg-subtle)' : 'var(--bg-elevated)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.14s ease',
                }}
              >
                <div style={{ marginTop: '5px' }}>
                  <StatusDot status={s} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? 'var(--accent)' : 'var(--ink)',
                      marginBottom: '2px',
                    }}
                  >
                    {STATUS_LABELS[s]} {isSelected && '✓'}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      color: 'var(--ink-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {STATUS_DESCRIPTIONS[s]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
