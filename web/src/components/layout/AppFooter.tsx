import React from 'react';
import { Link } from 'react-router-dom';
import { pathsPath, progressPath, searchPath, syllabusPath } from '../../lib/paths';

const REPO_URL = 'https://github.com/wwc76934-cyber/quant-math-academy';

export const AppFooter: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="app-footer__inner">
        <div className="app-footer__info">
          <div>量化数学学院 · 《量化数学进阶教材》在线版</div>
          <div className="app-footer__sub">
            学习记录只保存在本机浏览器，清除浏览器数据前请先导出备份。
          </div>
        </div>
        <nav className="app-footer__links" aria-label="页脚">
          <Link to={syllabusPath()}>目录</Link>
          <Link to={pathsPath()}>学习路径</Link>
          <Link to={searchPath()}>搜索</Link>
          <Link to={progressPath()}>导出数据</Link>
          <a href={`${REPO_URL}/issues/new?template=content_issue.md`} target="_blank" rel="noreferrer">
            报告内容错误
          </a>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
};
