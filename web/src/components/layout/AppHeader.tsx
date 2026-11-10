import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { homePath, searchPath } from '../../lib/paths';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from './navItems';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '');

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Cmd+K / Ctrl+K opens search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        navigate(searchPath());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <button
            ref={triggerRef}
            className="icon-btn mobile-menu-trigger"
            type="button"
            aria-label="打开菜单"
            onClick={() => setMobileMenuOpen(true)}
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
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>

          <Link to={homePath()} className="brand" aria-label="量化数学学院 首页">
            <span className="brand__cn">量化数学学院</span>
          </Link>

          <nav className="nav" aria-label="主导航">
            {NAV_ITEMS.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={active ? 'is-active' : ''}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="topbar__actions">
            <button
              className="search-btn"
              type="button"
              aria-label="搜索"
              onClick={() => navigate(searchPath())}
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
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span className="search-label">搜索</span>
              <kbd>{isMac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
};
