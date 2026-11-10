import React from 'react';
import { NavLink } from 'react-router-dom';
import { notesPath, progressPath } from '../../lib/paths';

const tabs = [
  { to: progressPath(), label: '进度' },
  { to: '/practice/wrong', label: '错题本' },
  { to: notesPath(), label: '笔记' },
  { to: '/bookmarks', label: '公式收藏' },
];

/** Secondary navigation shared by the personal study pages. */
export const StudyTabs: React.FC = () => (
  <nav className="study-tabs" aria-label="我的学习">
    {tabs.map((t) => (
      <NavLink key={t.to} to={t.to} end className={({ isActive }) => (isActive ? 'is-active' : '')}>
        {t.label}
      </NavLink>
    ))}
  </nav>
);
