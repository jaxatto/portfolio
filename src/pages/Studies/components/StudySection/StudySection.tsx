import React from 'react';
import CaptionedImage from '@pages/Studies/components/CaptionedImage';
import type { StudySectionProps } from '@commonTypes/study/studySection';
import styles from './StudySection.module.scss';

const StudySection: React.FC<{ section: StudySectionProps; className?: string }> = ({ section, className }) => {
  const image = section.image && section.image.length > 0 ? section.image[0] : undefined;
  return (
    <section className={className} data-order={section.order}>
      <h2 className={styles['section-title']}>
        {section.titleEmoji && <span aria-hidden='true'>{section.titleEmoji}</span>}
        {' '}
        {section.title}
      </h2>
      {section.description?.map((desc, i) => (
        <p key={i} className={styles['section-paragraph']}>{desc}</p>
      ))}
      {section.descriptionBullets?.length ? (
        <ul className={styles['section-list']}>
          {section.descriptionBullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {image?.src && (
        <CaptionedImage
          src={image.src}
          alt={image.alt || ''}
          caption={image.caption}
        />
      )}
    </section>
  );
};

export default StudySection;
