import React from 'react';
import { Link } from 'react-router-dom';
import { homePath, syllabusPath } from '../lib/paths';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="shell" id="main-content" style={{ padding: '80px 32px', textAlign: 'center' }}>
      <div className="kicker">404 NOT FOUND</div>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '44px', margin: '16px 0' }}>
        页面未找到
      </h1>
      <p style={{ maxWidth: '480px', margin: '0 auto 28px', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
        您请求的页面不存在或已被移动。请检查链接地址，或者返回首页与完整目录。
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to={homePath()} className="btn btn--primary">
          返回首页
        </Link>
        <Link to={syllabusPath()} className="btn btn--secondary">
          查看教材目录
        </Link>
      </div>
    </main>
  );
};
