import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrentDate } from '../../lib/format';
import { syllabusPath } from '../../lib/paths';

export const AppFooter: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__info">
          <div>量化数学学院 · Quant Math Academy</div>
          <div style={{ marginTop: '4px' }}>
            学习记录仅保存在本机 · 本地存储时间：{formatCurrentDate()}
          </div>
        </div>
        <div className="app-footer__links">
          <Link to={syllabusPath()}>教材目录</Link>
          <span className="muted">·</span>
          <span>内容底本：《量化数学进阶教材》</span>
        </div>
      </div>
    </footer>
  );
};
