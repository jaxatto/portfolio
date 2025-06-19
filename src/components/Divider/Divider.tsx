import React from 'react';
import type { JSX } from 'react';
import styles from './Divider.module.scss';

type DividerProps = {
  count?: number;
  className?: string;
  variant?: 'default' | 'section-divider' | 'section-header';
  text?: string;
  textTag?: keyof JSX.IntrinsicElements; // Allow custom HTML tag for text
};

const Divider: React.FC<DividerProps> = ({
  count = 6,
  variant = 'default',
  className = '',
  text = '',
  textTag = 'h2',
}) => {
  const Tag = textTag as React.ElementType;

  if (variant === 'section-header') {
    return (
      <div className={[styles.wrapper, styles['section-header'], className].filter(Boolean).join(' ')}>
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.dot} aria-hidden="true" />
        <Tag className={styles.text}>{text}</Tag>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.line} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={[
        styles.wrapper,
        variant === 'section-divider' ? styles['section-divider-wrapper'] : '',
        className,
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {variant === 'section-divider' && <span className={styles.line} />}
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className={styles.dot} />
      ))}
      {variant === 'section-divider' && <span className={styles.line} />}
    </div>
  );
};

export default Divider;