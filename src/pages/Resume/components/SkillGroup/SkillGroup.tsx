import React from 'react';
import styles from './SkillGroup.module.css';

// One skill group: an h3 and code-style chips in the About chip look. `palette` picks the container pair.

type SkillGroupProps = {
  heading: string;
  items: string[];
  palette: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
};

const SkillGroup: React.FC<SkillGroupProps> = ({ heading, items, palette }) => (
  <div className={styles.group}>
    <h3 className={styles.heading}>{heading}</h3>
    <ul className={styles.chips}>
      {items.map((item) => (
        <li key={item} className={`${styles.chip} ${styles[palette]}`}>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default SkillGroup;
