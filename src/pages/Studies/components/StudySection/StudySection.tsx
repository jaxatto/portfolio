import React from 'react';
import clsx from 'clsx';
import StudyCompare from '@pages/Studies/components/StudyCompare';
import StudyImage from '@pages/Studies/components/StudyImage';
import type { StudySectionProps } from '@commonTypes/study/studySection';
import styles from './StudySection.module.css';

const StudySection: React.FC<{ section: StudySectionProps }> = ({ section }) => {
  const image = section.image && section.image.length > 0 ? section.image[0] : undefined;
  const endsWithMedia = Boolean(section.compare || image?.src);
  const hasBullets = Boolean(section.descriptionBullets?.length);
  return (
    <section className={clsx(styles.section, endsWithMedia && styles.endsWithMedia)} data-order={section.order}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{section.title}</h2>
        {(section.description?.length || section.items?.length || hasBullets) && (
          <div className={styles.text}>
            {section.description?.map((desc, i) => (
              <p key={i}>{desc}</p>
            ))}
            {section.items?.map((item) => (
              <div key={item.label} className={styles.item}>
                <h3 className={styles.label}>{item.label}</h3>
                <p>{item.text}</p>
              </div>
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
      </div>
      {section.compare && <StudyCompare {...section.compare} className={styles.media} />}
      {image?.src && (
        <StudyImage src={image.src} alt={image.alt || ''} caption={image.caption} corners={image.corners} variant={image.variant} className={styles.media} />
      )}
    </section>
  );
};

export default StudySection;
