import React from 'react';

export interface PageHeaderProps {
  title: React.ReactNode;
  /** Short context line above the title, e.g. the section of the site. */
  eyebrow?: React.ReactNode;
  /** One or two plain sentences that tell the reader what this page is for. */
  lede?: React.ReactNode;
  /** Optional actions aligned to the right of the title on wide screens. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, eyebrow, lede, actions, children }) => (
  <header className="page-header">
    <div className="page-header__main">
      {eyebrow && <div className="page-header__eyebrow">{eyebrow}</div>}
      <h1>{title}</h1>
      {lede && <p className="page-header__lede">{lede}</p>}
      {children}
    </div>
    {actions && <div className="page-header__actions">{actions}</div>}
  </header>
);
