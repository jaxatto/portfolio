import React from 'react';
import StudyImage from '@pages/Studies/components/StudyImage';
import type { StudySectionProps } from '@commonTypes/study/studySection';
import styles from './StudySection.module.css';

const StudySection: React.FC<{ section: StudySectionProps }> = ({ section }) => {
  const image = section.image && section.image.length > 0 ? section.image[0] : undefined;
  const hasBullets = Boolean(section.descriptionBullets?.length);
  return (
    <section className={styles.section} data-order={section.order}>
      <h2 className={styles.title}>{section.title}</h2>
      {(section.description?.length || hasBullets) && (
        <div className={styles.text}>
          {section.description?.map((desc, i) => (
            <p key={i}>{desc}</p>
          ))}
          {hasBullets && (
            <ul>
              {section.descriptionBullets!.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {image?.src && (
        <StudyImage src={image.src} alt={image.alt || ''} caption={image.caption} corners={image.corners} />
      )}
    </section>
  );
};

export default StudySection;
