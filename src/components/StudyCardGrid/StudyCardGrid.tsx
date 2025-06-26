import React from 'react';
import StudyCard from '@components/StudyCard';
import { content } from './resources/content';
import styles from './StudyCardGrid.module.scss';

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
  // Filter out the current study
  const filteredData = excludeUrl
    ? data.filter((card) => card.linkUrl !== excludeUrl)
    : data;
  // Show 3 cards for 'work', 2 cards for 'study'
  const visibleCount = variant === 'work' ? 3 : 2;
  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <div className={[styles['card-grid'], styles[variant+'-grid']].filter(Boolean).join(' ')}>
      {visibleData.map((props, i) => (
        <StudyCard
          key={props.linkUrl}
          {...props}
          count={props.count}
          total={data.length}
          variant={variant}
          layout={variant === 'work' && i === 0 ? 'horizontal' : 'vertical'}
        />
      ))}
    </div>
  );
};

export default StudyCardGrid;