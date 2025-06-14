import React from 'react';
import styles from './DotsRow.module.scss';

type DotsRowProps = {
  count?: number;
  className?: string;
};

const DotsRow: React.FC<DotsRowProps> = ({ count = 6, className }) => (
  <div className={`${styles['dots-row']} ${className || ''}`} aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className={styles.dot} />
    ))}
  </div>
);

export default DotsRow;