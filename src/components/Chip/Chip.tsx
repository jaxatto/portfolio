import React from 'react';
import styles from './Chip.module.scss';

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
