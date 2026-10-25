import React from 'react';
import clsx from 'clsx';
import StudyCardGrid from '#components/StudyCardGrid';
import { content } from './resources/content';
import styles from './NextStudy.module.css';

const NextStudy: React.FC<{ meta: { linkUrl: string }; afterMedia?: boolean }> = ({
  meta,
  afterMedia,
}) => (
  <div className={clsx(styles.wrapper, afterMedia && styles.afterMedia)}>
    <h2 className={styles.title}>{content.title}</h2>
    <StudyCardGrid
      variant="study"
      excludeUrl={meta.linkUrl} // This will exclude the current study
    />
  </div>
);

export default NextStudy;
