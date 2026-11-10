import React, { useEffect, useRef } from 'react';

export interface ReaderShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderShortcutsModal: React.FC<ReaderShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const shortcuts = [
    { key: '[', desc: '跳转到上一节' },
    { key: ']', desc: '跳转到下一节' },
    { key: 'f', desc: '开启 / 退出专注沉浸模式' },
    { key: 't', desc: '切换主题（浅色 / 深色）' },
    { key: '/', desc: '打开全文检索' },
    { key: '?', desc: '打开快捷键帮助' },
    { key: 'Esc', desc: '退出全屏抽屉或关闭弹窗' },
  ];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="键盘快捷键"
      onClick={onClose}
    >
      <div
        className="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>键盘快捷键帮助</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="关闭"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <p className="small muted" style={{ margin: '0 0 16px' }}>
          在阅读页面直接按下对应按键即可生效（文本输入时除外）：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {shortcuts.map((s) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid var(--line)',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--ink-secondary)' }}>{s.desc}</span>
              <kbd
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--line-strong)',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  color: 'var(--ink)',
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
