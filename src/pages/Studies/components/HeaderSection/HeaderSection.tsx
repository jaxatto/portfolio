import React from 'react';
import DateRange from '#components/DateRange';
import StudyPanels from '#pages/Studies/components/StudyPanels';
import StudyCompare from '#pages/Studies/components/StudyCompare';
import StudyImage from '#pages/Studies/components/StudyImage';
import { Chip, ChipList } from '#components/Chip';
import type { StudyHeaderProps } from '#pages/Studies/types/studyHeader';
import styles from './HeaderSection.module.css';

// The one h1 on a study page. Chips are a list of plain labels (no interaction); all of them use the
// study's card palette from the page, like the h1 (D-052), so a chip's own `theme` is not used here.
const HeaderSection: React.FC<StudyHeaderProps & { className?: string }> = ({
  title,
  roleDetails,
  chips,
  description,
  image,
  compare,
  panels,
  className,
}) => (
  <header className={`${styles.header} ${className ?? ''}`}>
    <div className={styles.intro}>
      <div className={styles.top}>
        <h1 className={`${styles.title}`}>{title}</h1>
        <p className={styles.details}>
          <span className={styles.row}>
            <span className={styles.item}>{roleDetails[0].role}</span>
            {roleDetails[0].location && (
              <span className={`${styles.item} ${styles.sep}`}>{roleDetails[0].location}</span>
            )}
            <span className={`${styles.item} ${styles.sep} ${styles.date}`}>
              <DateRange startDate={roleDetails[0].startDate} endDate={roleDetails[0].endDate} />
            </span>
          </span>
        </p>
      </div>
      <ChipList className={styles.chips}>
        {chips.map((chip) => (
          <Chip key={chip.label}>{chip.label}</Chip>
        ))}
      </ChipList>
      <div className={styles.description}>
        {description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </div>
    </div>
    {panels && <StudyPanels {...panels} className={styles.media} />}
    {compare && <StudyCompare {...compare} className={styles.media} />}
    {image && image[0] && (
      <StudyImage
        src={image[0].src}
        alt={image[0].alt}
        caption={image[0].caption}
        corners={image[0].corners}
        variant={image[0].variant}
        className={styles.media}
      />
    )}
  </header>
);

export default HeaderSection;
