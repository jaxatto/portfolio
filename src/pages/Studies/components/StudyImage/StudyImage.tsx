import React from 'react';
import clsx from 'clsx';
import type { StudyImageProps } from '@commonTypes/study/studyImage';
import styles from './StudyImage.module.css';

const StudyImage: React.FC<StudyImageProps> = ({ src, alt, caption, className, corners, variant = 'default' }) => (
  <figure className={clsx(styles.figure, className)}>
    <div className={clsx(variant === 'frame' && styles.frame)}>
      <img
        src={src}
        alt={alt}
        className={clsx(
          styles.image,
          corners === 'square' && styles.square,
          variant === 'banner' && styles.banner,
          variant === 'frame' && styles.framed,
        )}
      />
    </div>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyImage;
