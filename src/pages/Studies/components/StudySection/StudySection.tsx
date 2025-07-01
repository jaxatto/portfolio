import React from 'react';
import StudyImage from '@pages/Studies/components/StudyImage';
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
        <StudyImage
          src={image.src}
          alt={image.alt || ''}
          caption={image.caption}
          className={styles['section-image']}
          corners={image.corners}
        />
      )}
    </section>
  );
};

export default StudySection;
