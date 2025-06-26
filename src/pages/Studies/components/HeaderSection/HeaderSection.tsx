import React from 'react';
import ChipGroup, { ChipData } from '@components/ChipGroup';
import Divider from '@components/Divider';
import CaptionedImage from '@pages/Studies/components/CaptionedImage';
import styles from './HeaderSection.module.scss';

type HeaderProps = {
  title: string;
  roleDetails: { role: string; startDate: string; endDate?: string }[];
  chips: ChipData[];
  description: string;
  image: { src: string; alt: string; caption?: string }[];
};

const Header: React.FC<HeaderProps> = ({
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
        <span className={styles.role}>{roleDetails[0].role}</span>
        <span className={styles.date}>
          {roleDetails[0].startDate}
          {roleDetails[0].endDate && (
            <>
              <span aria-hidden='true'>{' '}—{' '} </span>
              <span className='sr-only'>{' '}to{' '}</span>
              {roleDetails[0].endDate}
            </>
          )}
        </span>
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
