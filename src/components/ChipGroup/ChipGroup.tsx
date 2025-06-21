import React from 'react';
import Chip from '@components/Chip';
import styles from './ChipGroup.module.scss';

type ChipGroupProps = {
  chips: string[];
  variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  className?: string;
};

const ChipGroup: React.FC<ChipGroupProps> = ({ chips, variant, className }) => (
  <ul className={[styles.wrapper, className].filter(Boolean).join(' ')}>
    {chips.map((chip) => (
      <li key={chip}>
        <Chip variant={variant}>{chip}</Chip>
      </li>
    ))}
  </ul>
);

export default ChipGroup;