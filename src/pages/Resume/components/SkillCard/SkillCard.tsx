import React from 'react';
import ChipGroup, { ChipData } from '@components/ChipGroup';
import styles from './SkillCard.module.scss';

export type SkillCardProps = {
  heading: string;
  description: string;
  chips: string[]; // still just strings here
  theme?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
};

const SkillCard: React.FC<SkillCardProps> = ({
  heading,
  description,
  chips,
  theme = 'primary',
  className = '',
}) => (
  <div className={[styles.wrapper, styles[theme], className].filter(Boolean).join(' ')}>
    <div className={styles.top}>
      <h3 className={styles.title}>{heading}</h3>
      <p className={styles.description}>{description}</p>
    </div>
    <ChipGroup
      chips={chips.map(label => ({ label } as ChipData))}
      theme={theme}
      className={styles.chipRow}
    />
  </div>
);

export default SkillCard;
