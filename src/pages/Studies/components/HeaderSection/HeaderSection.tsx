import React from 'react';
import DateRange from '@components/DateRange';
import StudyImage from '@pages/Studies/components/StudyImage';
import type { StudyHeaderProps } from '@commonTypes/study/studyHeader';
import styles from './HeaderSection.module.css';

// The one h1 on a study page. Chips are a list of plain labels (no interaction); all of them use the
// study's card palette, like the h1 (D-052), so a chip's own `theme` is not used here.
const HeaderSection: React.FC<StudyHeaderProps & { className?: string; palette?: 'brand' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' }> = ({
  title,
  roleDetails,
  chips,
  description,
  image,
  palette = 'brand',
  className,
}) => (
  <header className={`${styles.header} ${className ?? ''}`}>
    <div className={styles.intro}>
      <div className={styles.top}>
        <h1 className={`${styles.title} ${styles[`h1-${palette}`]}`}>{title}</h1>
        <p className={styles.details}>
          <span>{roleDetails[0].role}</span>
          {roleDetails[0].location && (
            <>
              <span className={styles.dot} aria-hidden="true" />
              <span>{roleDetails[0].location}</span>
            </>
          )}
          <span className={styles.dot} aria-hidden="true" />
          <DateRange startDate={roleDetails[0].startDate} endDate={roleDetails[0].endDate} />
        </p>
      </div>
      <ul className={styles.chips}>
        {chips.map((chip) => (
          <li key={chip.label} className={`${styles.chip} ${styles[palette]}`}>
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
    </div>
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
