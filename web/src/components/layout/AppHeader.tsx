import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  homePath,
  pathsPath,
  practicePath,
  progressPath,
  searchPath,
  syllabusPath,
} from '../../lib/paths';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';

export const AppHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K
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

          <Link to={homePath()} className="brand">
            <span className="brand__cn">量化数学学院</span>
            <span className="brand__en">Quant Math Academy</span>
          </Link>

          <nav className="nav" aria-label="主导航">
            <NavLink
              to={syllabusPath()}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              教材
            </NavLink>
            <NavLink
              to={pathsPath()}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              学习路径
            </NavLink>
            <NavLink
              to={practicePath()}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              练习
            </NavLink>
            <NavLink
              to="/bookmarks"
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              收藏
            </NavLink>
            <NavLink
              to={progressPath()}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              学习进度
            </NavLink>
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
              <kbd>⌘K</kbd>
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
