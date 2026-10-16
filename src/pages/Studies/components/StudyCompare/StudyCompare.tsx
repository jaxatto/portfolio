import React from 'react';
import type { StudyImageProps } from '@commonTypes/study/studyImage';
import styles from './StudyCompare.module.css';

// Before / after pair (D-050, Figma Indeed 2853:27124): two columns, the "Before" on the sunken
// surface and the "After" on the secondary container, each with a text label over its image.
// Each image has its own alt text.
type StudyCompareProps = {
  before: StudyImageProps;
  after: StudyImageProps;
  caption?: string;
};

const StudyCompare: React.FC<StudyCompareProps> = ({ before, after, caption }) => (
  <figure className={styles.figure}>
    <div className={styles.pair}>
      <div className={`${styles.col} ${styles.before}`}>
        <div className={styles.shot}>
          <img src={before.src} alt={before.alt} className={styles.image} />
          <span className={styles.chip}>Before</span>
        </div>
      </div>
      <div className={`${styles.col} ${styles.after}`}>
        <div className={styles.shot}>
          <img src={after.src} alt={after.alt} className={styles.image} />
          <span className={styles.chip}>After</span>
        </div>
      </div>
    </div>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyCompare;
