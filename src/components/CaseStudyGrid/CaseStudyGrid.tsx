import React from 'react';
import CaseStudyCard from '@components/CaseStudyCard';
import { caseStudies } from './caseStudies';
import styles from './CaseStudyGrid.module.scss';

type CaseStudyGridProps = {
  studies?: typeof caseStudies;
};

const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ studies }) => {
  const data = studies || caseStudies;
  return (
    <div className={styles['work-grid']}>
      {data.map((props, i) => (
        <CaseStudyCard
          key={props.linkUrl}
          {...props}
          count={i + 1}
          total={data.length}
        />
      ))}
    </div>
  );
};

export default CaseStudyGrid;