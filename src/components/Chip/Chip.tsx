import React from 'react';
import styles from './Chip.module.scss';

// Chip component for displaying tags or labels
// It supports different variants and sizes for customization
// Usage: <Chip variant="secondary" size="small">Tag</Chip>

type ChipProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  className?: string;
  size?: 'large' | 'small';
};

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'neutral',
  className = '',
  size= 'large',
}) => (
  <div
    className={[
      styles.wrapper,
      styles[variant],
      styles[size],
      className,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export default Chip;
