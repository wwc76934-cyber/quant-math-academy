import React from 'react';
import { SectionProgressStatus } from '../../features/store/types';

export interface StatusDotProps {
  status?: SectionProgressStatus;
  showLabel?: boolean;
  className?: string;
}

export const STATUS_LABELS: Record<SectionProgressStatus, string> = {
  empty: '未开始',
  learn: '学习中',
  done: '已学习',
  master: '已掌握',
  review: '待复习',
};

export const StatusDot: React.FC<StatusDotProps> = ({
  status = 'empty',
  showLabel = false,
  className = '',
}) => {
  const dotClass = `dot dot--${status}`;
  const label = STATUS_LABELS[status] || '未开始';

  if (!showLabel) {
    return <span className={`${dotClass} ${className}`.trim()} title={label} />;
  }

  return (
    <span className={`status-item ${className}`.trim()}>
      <span className={dotClass} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
