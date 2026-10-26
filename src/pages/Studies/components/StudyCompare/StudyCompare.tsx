import React from 'react';
import Image from '#components/Image';
import type { StudyCompareData } from '#pages/Studies/types/studySection';
import styles from './StudyCompare.module.css';

// Before / after pair (D-050, Figma Indeed 2853:27124): two columns, the "Before" on the sunken
// surface and the "After" on the secondary container, each with a text label over its image.
// Each image has its own alt text.
type StudyCompareProps = StudyCompareData & { className?: string; priority?: boolean };

const StudyCompare: React.FC<StudyCompareProps> = ({
  before,
  after,
  caption,
  aspectRatio,
  className,
  priority = false,
}) => (
  <figure className={`${styles.figure} ${className ?? ''}`}>
    <div className={styles.pair}>
      <div className={`${styles.col} ${styles.before}`}>
        <div className={styles.shot} style={aspectRatio ? { aspectRatio } : undefined}>
          <Image
            src={before.src}
            alt={before.alt}
            priority={priority}
            className={styles.imageBox}
            imgClassName={styles.image}
            fallbackClassName={styles.fallback}
          />
          <span className={styles.chip}>Before</span>
        </div>
      </div>
      <div className={`${styles.col} ${styles.after}`}>
        <div className={styles.shot} style={aspectRatio ? { aspectRatio } : undefined}>
          <Image
            src={after.src}
            alt={after.alt}
            priority={priority}
            className={styles.imageBox}
            imgClassName={styles.image}
            fallbackClassName={styles.fallback}
          />
          <span className={styles.chip}>After</span>
        </div>
      </div>
    </div>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyCompare;
