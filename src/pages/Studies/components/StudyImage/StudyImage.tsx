import React from 'react';
import Image from '@components/Image';
import type { StudyImageProps } from '@commonTypes/study/studyImage';
import styles from './StudyImage.module.scss';

const StudyImage: React.FC<StudyImageProps> = ({ src, alt, caption, className, corners }) => (
  <div className={[styles['study-image'], className].filter(Boolean).join(' ')}>
    <Image
      src={src}
      alt={alt}
      imgClassName={[
        styles.image,
        corners === 'square' ? styles.square : ''
      ].filter(Boolean).join(' ')}
      fallbackClassName={styles['image-fallback-wrapper']}
    />
    {caption && <p className={styles['image-caption']}>{caption}</p>}
  </div>
);

export default StudyImage;