import React from 'react';
import ChipGroup from '@components/ChipGroup';
import Divider from '@components/Divider';
import DateRange from '@components/DateRange';
import CaptionedImage from '@pages/Studies/components/CaptionedImage';
import type { StudyHeaderProps } from '@commonTypes/study/studyHeader';
import styles from './HeaderSection.module.scss';

const Header: React.FC<StudyHeaderProps> = ({
  title,
  roleDetails,
  chips,
  description,
  image,
}) => (
  <section>
    <div className={styles['top-section']}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.details}>
        <span className={styles.role}>
          {roleDetails[0].role}
        </span>
        <DateRange 
          startDate={roleDetails[0].startDate}
          endDate={roleDetails[0].endDate}
          className={styles.date}
        />
      </div>
    </div>
    <ChipGroup chips={chips} className={styles['chip-row']} size='small' />
    <Divider variant='section-divider' />
    <p className={styles.description}>{description}</p>
    {image[0] && (
      <CaptionedImage
        src={image[0].src}
        alt={image[0].alt}
        caption={image[0].caption}
      />
    )}
  </section>
);

export default Header;
