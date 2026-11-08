import React, { useEffect, useRef } from 'react';
import { useStore } from '../../features/store/store';
import {
  FontSizeSetting,
  MeasureSetting,
  ProofDefaultSetting,
  ThemeSetting,
} from '../../features/store/types';

export interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    store,
    setFontSize,
    setMeasure,
    setProofDefault,
    setFocus,
    setTheme,
  } = useStore();

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

  const fontSizes: Array<{ value: FontSizeSetting; label: string; desc: string }> = [
    { value: 'sm', label: '小', desc: '16px' },
    { value: 'md', label: '适中', desc: '17px' },
    { value: 'lg', label: '默认', desc: '18px' },
    { value: 'xl', label: '放大', desc: '20px' },
  ];

  const measures: Array<{ value: MeasureSetting; label: string; desc: string }> = [
    { value: 'narrow', label: '紧凑', desc: '30em' },
    { value: 'standard', label: '标准', desc: '34em' },
    { value: 'wide', label: '宽幅', desc: '40em' },
  ];

  const proofOptions: Array<{ value: ProofDefaultSetting; label: string }> = [
    { value: 'open', label: '默认展开' },
    { value: 'closed', label: '默认折叠' },
  ];

  const themes: Array<{ value: ThemeSetting; label: string }> = [
    { value: 'system', label: '跟随系统' },
    { value: 'light', label: '浅色暖纸' },
    { value: 'dark', label: '深色墨夜' },
  ];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="阅读偏好设置"
      onClick={onClose}
    >
      <div
        className="modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h3>阅读偏好设置</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        {/* Font Size */}
        <div style={{ marginBottom: '20px' }}>
          <div className="rail__title" style={{ marginBottom: '8px' }}>
            正文字号
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {fontSizes.map((f) => (
              <button
                key={f.value}
                type="button"
                className={`chip ${store.settings.fontSize === f.value ? 'chip--active' : ''}`}
                style={{ justifyContent: 'center', height: '32px' }}
                onClick={() => setFontSize(f.value)}
              >
                <span>{f.label}</span>
                <span className="tiny" style={{ fontSize: '9px', opacity: 0.8 }}>
                  {f.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Measure Width */}
        <div style={{ marginBottom: '20px' }}>
          <div className="rail__title" style={{ marginBottom: '8px' }}>
            正文排版宽度
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {measures.map((m) => (
              <button
                key={m.value}
                type="button"
                className={`chip ${store.settings.measure === m.value ? 'chip--active' : ''}`}
                style={{ justifyContent: 'center', height: '32px' }}
                onClick={() => setMeasure(m.value)}
              >
                <span>{m.label}</span>
                <span className="tiny" style={{ fontSize: '9px', opacity: 0.8 }}>
                  {m.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Proof Default */}
        <div style={{ marginBottom: '20px' }}>
          <div className="rail__title" style={{ marginBottom: '8px' }}>
            数学证明初始状态
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {proofOptions.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`chip ${store.settings.proofDefault === p.value ? 'chip--active' : ''}`}
                style={{ justifyContent: 'center', height: '32px' }}
                onClick={() => setProofDefault(p.value)}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Appearance Theme */}
        <div style={{ marginBottom: '20px' }}>
          <div className="rail__title" style={{ marginBottom: '8px' }}>
            外观主题
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {themes.map((t) => (
              <button
                key={t.value}
                type="button"
                className={`chip ${store.settings.theme === t.value ? 'chip--active' : ''}`}
                style={{ justifyContent: 'center', height: '32px' }}
                onClick={() => setTheme(t.value)}
              >
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Focus Mode Switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid var(--line)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600 }}>
              专注沉浸模式 (f)
            </div>
            <div className="small muted">隐藏左右两侧栏，正文单栏居中阅读</div>
          </div>
          <button
            type="button"
            className={`chip ${store.settings.focus ? 'chip--active' : ''}`}
            onClick={() => setFocus(!store.settings.focus)}
          >
            {store.settings.focus ? '已开启' : '关闭'}
          </button>
        </div>
      </div>
    </div>
  );
};
