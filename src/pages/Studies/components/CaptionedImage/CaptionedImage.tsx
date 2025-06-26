import React from 'react';
import Image from '@components/Image';
import type { StudyImageProps } from '@commonTypes/studyImage';
import styles from './CaptionedImage.module.scss';

const CaptionedImage: React.FC<StudyImageProps> = ({ src, alt, caption }) => (
  <div className={styles['captioned-image']}>
    <Image
      src={src}
      alt={alt}
      imgClassName={styles.image}
      fallbackClassName={styles['image-fallback-wrapper']}
    />
    {caption && <p className={styles['image-caption']}>{caption}</p>}
  </div>
);

export default CaptionedImage;