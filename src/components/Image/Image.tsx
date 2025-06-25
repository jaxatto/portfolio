import React, { useState } from 'react';
import Icon from '@components/Icon';
import styles from './Image.module.scss';

type ImageProps = {
  src: string; 
  alt: string;
  imgClassName?: string; // Allows custom styling for the image element itself
  className?: string; // Allows custom styling for the image component container
  iconFallback?: string; // Defines the icon to show when the image fails to load
  iconClassName?: string; // Allows custom styling for the fallback icon
  altFallback?: string; // Provides alt text for the fallback icon, if desired
  fallbackClassName?: string; // Allows custom styling for the container of the fallback image component, within className container
};

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  altFallback,
  className,
  iconFallback = "image",
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
