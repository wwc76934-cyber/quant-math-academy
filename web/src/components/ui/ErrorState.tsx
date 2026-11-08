import React from 'react';
import { Link } from 'react-router-dom';
import { syllabusPath } from '../../lib/paths';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showReturnToSyllabus?: boolean;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = '加载失败',
  message,
  onRetry,
  showReturnToSyllabus = true,
  className = '',
}) => {
  return (
    <div className={`error-state ${className}`.trim()} role="alert">
      <h3 className="error-state__title">{title}</h3>
      <p className="error-state__msg">{message}</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {onRetry && (
          <Button variant="secondary" size="sm" onClick={onRetry}>
            重试
          </Button>
        )}
        {showReturnToSyllabus && (
          <Link to={syllabusPath()} className="btn btn--ghost btn--sm">
            返回教材目录 →
          </Link>
        )}
      </div>
    </div>
  );
};
