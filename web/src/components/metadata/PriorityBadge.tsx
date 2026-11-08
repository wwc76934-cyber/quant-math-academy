import React from 'react';
import { PriorityLevel } from '../../features/content/types';

export interface PriorityBadgeProps {
  priority?: PriorityLevel | null;
  label?: string | null;
  className?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  label,
  className = '',
}) => {
  if (label) {
    const isP0 = label.includes('P0');
    const isP1 = label.includes('P1');
    const badgeClass = isP0 ? 'badge--p0' : isP1 ? 'badge--p1' : '';
    return <span className={`badge ${badgeClass} ${className}`.trim()}>{label}</span>;
  }

  if (!priority) {
    return null;
  }

  const badgeClass =
    priority === 'P0'
      ? 'badge--p0'
      : priority === 'P1'
      ? 'badge--p1'
      : priority === 'P2'
      ? 'badge--p2'
      : 'badge--p3';

  return (
    <span className={`badge ${badgeClass} ${className}`.trim()}>
      {priority}
    </span>
  );
};
