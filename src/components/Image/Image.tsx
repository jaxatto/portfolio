import React, { useState } from 'react';
import Icon from '@components/Icon';
import styles from './Image.module.scss';

type ImageProps = {
  src: string;
  alt: string;
  altFallback?: string;
  className?: string;
  iconFallback: string;
  imgClassName?: string;
  iconClassName?: string;
  fallbackClassName?: string;
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  altFallback,
  className,
  iconFallback,
  imgClassName,
  iconClassName,
  fallbackClassName,
}) => {
  const [error, setError] = useState(false);

  return (
    <div className={[styles['component-wrapper'], className].filter(Boolean).join(' ')}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={imgClassName}
        />
      ) : (
        <div className={[styles['fallback-wrapper'], fallbackClassName].filter(Boolean).join(' ')}>
          <Icon
            name={iconFallback}
            className={[styles['fallback-icon'], iconClassName].filter(Boolean).join(' ')}
            aria-hidden="true"
          />
          <span className="sr-only">{altFallback ?? alt}</span>
        </div>
      )}
    </div>
  );
};

export default Image;
