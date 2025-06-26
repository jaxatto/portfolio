import React from 'react';
import StudyCard from '@components/StudyCard';
import { content } from './resources/content';
import styles from './StudyCardGrid.module.scss';

type StudyCardGridProps = {
  samples?: typeof content;
};

const StudyCardGrid: React.FC<StudyCardGridProps> = ({ samples }) => {
  const data = samples || content;
  return (
    <div className={styles['card-grid']}>
      {data.map((props, i) => (
        <StudyCard
          key={props.linkUrl}
          {...props}
          count={i + 1}
          total={data.length}
        />
      ))}
    </div>
  );
};

export default StudyCardGrid;