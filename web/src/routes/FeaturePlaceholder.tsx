import React from 'react';
import { Link } from 'react-router-dom';
import { homePath, syllabusPath } from '../lib/paths';

export interface FeaturePlaceholderProps {
  featureName: string;
  phase: string;
  description: string;
}

export const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({
  featureName,
  phase,
  description,
}) => {
  return (
    <main className="shell" id="main-content" style={{ padding: '80px 32px', textAlign: 'center' }}>
      <div className="kicker">{phase} 规划功能</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', margin: '16px 0' }}>
        {featureName}
      </h1>
      <p style={{ maxWidth: '520px', margin: '0 auto 28px', color: 'var(--ink-secondary)', lineHeight: 1.8 }}>
        {description}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to={syllabusPath()} className="btn btn--primary">
          前往教材目录
        </Link>
        <Link to={homePath()} className="btn btn--secondary">
          返回首页
        </Link>
      </div>
    </main>
  );
};
