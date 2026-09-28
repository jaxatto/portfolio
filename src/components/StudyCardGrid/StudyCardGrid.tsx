import React from 'react';
import clsx from 'clsx';
import StudyCard from '@components/StudyCard';
import { content } from './resources/content';
import styles from './StudyCardGrid.module.css';

// StudyCardGrid displays study cards in a two column grid.
// 'work' uses each card's own size (full / half); 'study' shows two half-width cards
// and can leave out the study being viewed via `excludeUrl`.
// Usage: <StudyCardGrid samples={customSamples} variant="work" excludeUrl="/case-study-1" />

type StudyCardGridProps = {
  samples?: typeof content; // Optional prop to pass a custom set of samples
  variant?: 'work' | 'study'; // 'work' for work page, 'study' for study page
  excludeUrl?: string; // Filters out a specific card by its linkUrl
};

const StudyCardGrid: React.FC<StudyCardGridProps> = ({
  samples,
  variant = 'work',
  excludeUrl,
}) => {
  const data = samples || content;
  const filteredData = excludeUrl
    ? data.filter((card) => card.linkUrl !== excludeUrl)
    : data;
  const visibleData = variant === 'work' ? filteredData : filteredData.slice(0, 2);

  return (
    <div className={clsx(styles.grid, styles[variant])}>
      {visibleData.map((props) => (
        <StudyCard
          key={props.linkUrl}
          {...props}
          total={data.length}
          variant={variant}
          size={variant === 'work' ? props.size : 'half'}
          className={variant === 'work' && props.size === 'full' ? styles.span : undefined}
        />
      ))}
    </div>
  );
};

export default StudyCardGrid;
