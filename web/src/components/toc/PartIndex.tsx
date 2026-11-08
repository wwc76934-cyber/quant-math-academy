import React, { useEffect, useState } from 'react';
import { BookPart } from '../../features/content/types';
import { formatPartNumber } from '../../lib/format';

export interface PartIndexProps {
  parts: BookPart[];
  activePartId?: string;
  onSelectPart?: (partId: string) => void;
}

export const PartIndex: React.FC<PartIndexProps> = ({
  parts,
  activePartId: propActivePartId,
  onSelectPart,
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>(
    propActivePartId || (parts[0]?.id ?? 'part-1')
  );

  const currentActiveId = propActivePartId || internalActiveId;

  // Scrollspy to detect active part
  useEffect(() => {
    if (propActivePartId) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = parts.length - 1; i >= 0; i--) {
        const el = document.getElementById(parts[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setInternalActiveId(parts[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parts, propActivePartId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, partId: string) => {
    e.preventDefault();
    setInternalActiveId(partId);
    if (onSelectPart) {
      onSelectPart(partId);
    }
    const el = document.getElementById(partId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="part-index" aria-label="篇章索引">
      <div className="kicker">篇</div>
      {parts.map((part) => {
        const isActive = currentActiveId === part.id;
        return (
          <a
            key={part.id}
            href={`#${part.id}`}
            className={isActive ? 'is-active' : ''}
            onClick={(e) => handleClick(e, part.id)}
            aria-current={isActive ? 'true' : undefined}
          >
            <span>{formatPartNumber(part.order)}</span>
            <span>{part.title}</span>
          </a>
        );
      })}
    </aside>
  );
};
