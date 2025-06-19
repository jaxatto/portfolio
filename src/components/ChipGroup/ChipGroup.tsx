import React from 'react';
import Chip from '@components/Chip';

type ChipGroupProps = {
  chips: string[];
  variant?: 'primary' | 'secondary' | 'tertiary' | 'neutral';
  className?: string;
};

const ChipGroup: React.FC<ChipGroupProps> = ({ chips, variant, className }) => (
  <ul className={className}>
    {chips.map((chip) => (
      <li key={chip}>
        <Chip variant={variant}>{chip}</Chip>
      </li>
    ))}
  </ul>
);

export default ChipGroup;