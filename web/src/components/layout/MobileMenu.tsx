import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  homePath,
  pathsPath,
  practicePath,
  progressPath,
  searchPath,
  syllabusPath,
} from '../../lib/paths';
import { ThemeToggle } from '../ui/ThemeToggle';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Esc key closes drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab' && drawerRef.current) {
        // Focus trap
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management: focus close button on open, return to trigger on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small timeout to ensure DOM is ready
      const t = setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    } else {
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="导航菜单"
      ref={drawerRef}
    >
      <div
        className="mobile-drawer__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="mobile-drawer__panel">
        <div className="mobile-drawer__head">
          <NavLink
            to={homePath()}
            className="brand"
            onClick={onClose}
          >
            <span className="brand__cn">量化数学学院</span>
            <span className="brand__en">Quant Math Academy</span>
          </NavLink>
          <button
            ref={closeBtnRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="关闭菜单"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="移动端导航">
          <NavLink
            to={syllabusPath()}
            onClick={onClose}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            教材
          </NavLink>
          <NavLink
            to={pathsPath()}
            onClick={onClose}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            学习路径
          </NavLink>
          <NavLink
            to={practicePath()}
            onClick={onClose}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            练习
          </NavLink>
          <NavLink
            to={progressPath()}
            onClick={onClose}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            学习进度
          </NavLink>
          <NavLink
            to={searchPath()}
            onClick={onClose}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            搜索
          </NavLink>
        </nav>

        <div className="mobile-drawer__footer">
          <span className="small muted">外观主题</span>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
