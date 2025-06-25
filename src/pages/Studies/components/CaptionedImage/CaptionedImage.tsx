import React from 'react';
import Image from '@components/Image';
import styles from './CaptionedImage.module.scss';

type CaptionedImageProps = {
  src: string;
  alt: string;
  caption?: string;
};

const CaptionedImage: React.FC<CaptionedImageProps> = ({ src, alt, caption }) => (
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
