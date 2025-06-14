import React from 'react';
import styles from './DotsRow.module.scss';

type DotsRowProps = {
  count?: number;
  className?: string;
  variant?: 'default' | 'lines';
  divider?: boolean;
};

const DotsRow: React.FC<DotsRowProps> = ({
  count = 6,
  className,
  variant = 'default',
  divider = false,
}) => (
  <div
    className={[
      styles['dots-row'],
      variant === 'lines' ? styles['dots-row--lines'] : '',
      divider ? styles['section-divider'] : '',
      className || ''
    ].filter(Boolean).join(' ')}
    aria-hidden="true"
  >
    {variant === 'lines' && <span className={styles.line} aria-hidden="true" />}
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className={styles.dot} />
    ))}
    {variant === 'lines' && <span className={styles.line} aria-hidden="true" />}
  </div>
);

export default DotsRow;