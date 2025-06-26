import React from 'react';
import Chip from '@components/Chip';
import styles from './ChipGroup.module.scss';

// ChipGroup component for displaying a group of chips
// It allows customization of chip data, size, and theme  
// Usage: <ChipGroup chips={[{ label: 'Chip 1' }, { label: 'Chip 2' }]} size="small" theme="primary" />
// Preferably pass an array of objects with label and optional theme to the chips prop

export type ChipData = {
  label: string;
  theme?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
};

type ChipGroupProps = {
  chips: ChipData[];
  className?: string;
  size?: 'large' | 'small';
  theme?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
};

const ChipGroup: React.FC<ChipGroupProps> = ({ 
  chips, 
  className,
  size = 'large',
  theme,
}) => (
  <ul
    className={[
      styles.wrapper,
      size === 'small' ? styles.small : '',
      className
    ].filter(Boolean).join(' ')}
  >
    {chips.map((chip) => (
      <li key={chip.label}>
        <Chip variant={chip.theme ?? theme} size={size}>
          {chip.label}
        </Chip>
      </li>
    ))}
  </ul>
);

export default ChipGroup;