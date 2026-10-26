import React from 'react';
import clsx from 'clsx';
import Image from '#components/Image';
import type { StudyImageProps } from '#pages/Studies/types/studyImage';
import styles from './StudyImage.module.css';

const StudyImage: React.FC<StudyImageProps> = ({
  src,
  alt,
  width,
  height,
  caption,
  className,
  variant = 'default',
  priority = false,
}) => (
  <figure
    className={clsx(styles.figure, variant === 'column' && styles.column, className)}
    style={
      width && height
        ? ({ '--shot-ratio': `${width} / ${height}` } as React.CSSProperties)
        : undefined
    }
  >
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={styles.imageBox}
      imgClassName={clsx(styles.image, variant === 'banner' && styles.banner)}
      fallbackClassName={clsx(styles.fallback, variant === 'banner' && styles.banner)}
    />
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyImage;
