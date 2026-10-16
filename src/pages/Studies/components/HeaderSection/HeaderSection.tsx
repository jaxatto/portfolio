import React from 'react';
import DateRange from '@components/DateRange';
import StudyImage from '@pages/Studies/components/StudyImage';
import type { StudyHeaderProps } from '@commonTypes/study/studyHeader';
import styles from './HeaderSection.module.css';

// The one h1 on a study page. Chips are a list of plain labels (no interaction).
const HeaderSection: React.FC<StudyHeaderProps> = ({
  title,
  roleDetails,
  chips,
  description,
  image,
}) => (
  <header className={styles.header}>
    <div className={styles.top}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.details}>
        <span>{roleDetails[0].role}</span>
        <span className={styles.dot} aria-hidden="true" />
        <DateRange startDate={roleDetails[0].startDate} endDate={roleDetails[0].endDate} />
      </p>
    </div>
    <ul className={styles.chips}>
      {chips.map((chip) => (
        <li key={chip.label} className={`${styles.chip} ${styles[chip.theme ?? 'primary'] ?? ''}`}>
          {chip.label}
        </li>
      ))}
    </ul>
    <hr className={styles.rule} />
    <div className={styles.description}>
      {description.map((desc, i) => (
        <p key={i}>{desc}</p>
      ))}
    </div>
    {image && image[0] && (
      <StudyImage
        src={image[0].src}
        alt={image[0].alt}
        caption={image[0].caption}
        corners={image[0].corners}
      />
    )}
  </header>
);

export default HeaderSection;
