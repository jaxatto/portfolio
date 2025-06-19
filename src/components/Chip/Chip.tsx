import React from 'react';
import styles from './Chip.module.scss';

type ChipProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  className?: string;
};

const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => (
  <div
    className={[
      styles.wrapper,
      styles[variant],
      className,
    ].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);

export default Chip;
