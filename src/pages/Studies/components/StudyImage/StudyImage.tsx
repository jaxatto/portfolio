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
  priority = false,
}) => (
  <figure className={clsx(styles.figure, variant === 'column' && styles.column, className)}>
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
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
