import React, { useState, ComponentType } from 'react';
import styles from './Image.module.scss';

type ImageProps = {
  src: string;
  alt: string;
  altFallback?: string;
  className?: string;
  icon: ComponentType;
};

const Image: React.FC<ImageProps> = ({ src, alt, altFallback = "Image failed to load", className, icon: Icon }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`${styles.imageWrapper} ${className || ''}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={styles.image}
        />
      ) : (
        <div className={styles.fallback}>
          <Icon aria-hidden="true" />
          <span className="sr-only">{altFallback}</span>
        </div>
      )}
    </div>
  );
};

export default Image;
