import React from 'react';
import CaptionedImage from '@pages/Studies/components/CaptionedImage';
import styles from './StudySection.module.scss';

export type StudySectionProps = {
  title?: string;
  titleEmoji?: string;
  description?: string[];
  descriptionBullets?: string[];
  image?: Array<{ src: string; alt?: string; caption?: string }>;
  order?: number;
};

const StudySection: React.FC<{ section: StudySectionProps; className?: string }> = ({ section, className }) => {
  const image = section.image && section.image.length > 0 ? section.image[0] : undefined;
  return (
    <section className={className} data-order={section.order}>
      <h2 className={styles['section-title']}>
        <span aria-hidden='true'>{section.titleEmoji}</span> {section.title}
      </h2>
      {section.description?.map((desc, i) => (
        <p key={i} className={styles['section-paragraph']}>{desc}</p>
      ))}
      {section.descriptionBullets?.length ? (
        <ul>
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
