import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '#components/Icon';
import type { IconName } from '#constants/iconNames';
import styles from './Image.module.css';

// An <img> that swaps to a decorative icon when the file fails to load, so a broken photo leaves a
// tidy frame. Each part (container, image, fallback) takes its own class.

type ImageProps = {
  src: string;
  alt: string;
  width?: number; // Pixel size of `src`, so the browser reserves the space before it loads
  height?: number;
  imgClassName?: string; // Allows custom styling for the image element itself
  className?: string; // Allows custom styling for the image component container
  iconFallback?: IconName; // Defines the icon to show when the image fails to load
  iconClassName?: string; // Allows custom styling for the fallback icon
  altFallback?: string; // Provides alt text for the fallback icon, if desired
  fallbackClassName?: string; // Allows custom styling for the container of the fallback image component, within className container
};

const Image: React.FC<ImageProps> = ({
  src,
  width,
  height,
  alt,
  altFallback,
  className,
  iconFallback = 'image',
  imgClassName,
  iconClassName,
  fallbackClassName,
}) => {
  const [error, setError] = useState(false);

  return (
    <div className={clsx(styles['component-wrapper'], className)}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
          className={imgClassName}
        />
      ) : (
        <div className={clsx(styles['fallback-wrapper'], fallbackClassName)}>
          <Icon
            name={iconFallback}
            className={clsx(styles['fallback-icon'], iconClassName)}
            aria-hidden="true"
          />
          <span className="sr-only">{altFallback ?? alt}</span>
        </div>
      )}
    </div>
  );
};

export default Image;
