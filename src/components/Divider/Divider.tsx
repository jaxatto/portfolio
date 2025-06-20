import React from 'react';
import type { JSX } from 'react';
import styles from './Divider.module.scss';

type DividerProps = {
  count?: number;
  className?: string;
  variant?: 'default' | 'section-divider' | 'section-header';
  text?: string;
  textTag?: keyof JSX.IntrinsicElements;
  contentAlign?: 'center' | 'left'; 
};

const Divider: React.FC<DividerProps> = ({
  count = 6,
  variant = 'default',
  className = '',
  text = '',
  textTag = 'h2',
  contentAlign = 'center',
}) => {
  const Tag = textTag as React.ElementType;

  const contentAlignClass =
    contentAlign === 'left' ? styles['align-left'] : styles['align-center'];

  if (variant === 'section-header') {
    return (
      <div className={[styles.wrapper, styles['section-header'], className, contentAlignClass].filter(Boolean).join(' ')}>
        <div className={styles.group}>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
        </div>
        <Tag className={styles.text}>{text}</Tag>
        <div className={styles.group}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.line} aria-hidden="true" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        styles.wrapper,
        contentAlignClass,
        variant === 'section-divider' ? styles['section-divider-wrapper'] : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {variant === 'section-divider' && <span className={styles.line} />}
      <span className={styles['dots-wrapper']}>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={styles.dot} />
        ))}
      </span>
      {variant === 'section-divider' && <span className={styles.line} />}
    </div>
  );
};

export default Divider;