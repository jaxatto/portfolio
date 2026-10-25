import React from 'react';
import clsx from 'clsx';
import type { StudyImageProps } from '#pages/Studies/types/studyImage';
import styles from './StudyImage.module.css';

const StudyImage: React.FC<StudyImageProps> = ({
  src,
  alt,
  caption,
  className,
  corners,
  variant = 'default',
}) => (
  <figure className={clsx(styles.figure, variant === 'column' && styles.column, className)}>
    <img
      src={src}
      alt={alt}
      className={clsx(
        styles.image,
        corners === 'square' && styles.square,
        variant === 'banner' && styles.banner,
      )}
    />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyImage;
