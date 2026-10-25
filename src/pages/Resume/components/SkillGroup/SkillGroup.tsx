import React from 'react';
import { Chip, ChipList } from '#components/Chip';
import styles from './SkillGroup.module.css';

// One skill group: an h3 and the shared chips. `palette` picks the container pair.

type SkillGroupProps = {
  heading: string;
  items: string[];
  palette: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
};

const SkillGroup: React.FC<SkillGroupProps> = ({ heading, items, palette }) => (
  <div className={styles.group}>
    <h3 className={styles.heading}>{heading}</h3>
    <ChipList>
      {items.map((item) => (
        <Chip key={item} palette={palette}>
          {item}
        </Chip>
      ))}
    </ChipList>
  </div>
);

export default SkillGroup;
