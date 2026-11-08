import React from 'react';
import { DifficultyLevel } from '../../features/content/types';

export interface DifficultyBadgeProps {
  level?: DifficultyLevel | number | null;
  range?: string | null;
  showDots?: boolean;
  className?: string;
}

function toBucket(level: DifficultyLevel | number | null | undefined): number | null {
  if (level === null || level === undefined) return null;
  if (typeof level === 'number') {
    if (!Number.isFinite(level)) return null;
    return Math.max(1, Math.min(5, Math.round(level)));
  }
  const match = /^D([1-5])$/.exec(level);
  return match ? Number(match[1]) : null;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  level,
  range,
  showDots = false,
  className = '',
}) => {
  if (range) {
    return <span className={`badge ${className}`.trim()}>{range}</span>;
  }

  const bucket = toBucket(level);
  if (bucket === null) {
    return null;
  }

  if (showDots) {
    return (
      <span className={`dlevel ${className}`.trim()} title={`难度 D${bucket}`}>
        <span>D{bucket}</span>
        <span className="dlevel__dots" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <i key={i} className={i <= bucket ? 'on' : ''} />
          ))}
        </span>
      </span>
    );
  }

  return <span className={`badge ${className}`.trim()}>D{bucket}</span>;
};
