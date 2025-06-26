import React from 'react';
import type { JSX } from 'react';
import styles from './Divider.module.scss';

// Divider component to visually separate sections with customizable styles and text
// Usage: <Divider />
// Advanced usage: <Divider count={6} variant="section-header" text="Section Title" textTag="h2" contentAlign="center" className="custom-class" />

type DividerProps = {
  count?: number; // How many dots to display
  className?: string; // Style the wrapper
  variant?: 'default' | 'section-divider' | 'section-header'; // Type of divider 'default' for simple dots, 'section-divider' for a line with dots, 'section-header' for a styled section header with text and dots
  text?: string; // Text to display in the section header variant
  textTag?: keyof JSX.IntrinsicElements; // What tag to use for the text in the section header variant, defaults to 'h2'
  contentAlign?: 'center' | 'left'; // How to align the content, defaults to 'center'
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