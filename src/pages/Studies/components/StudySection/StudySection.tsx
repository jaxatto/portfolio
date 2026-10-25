import React from 'react';
import clsx from 'clsx';
import StudyPanels from '#pages/Studies/components/StudyPanels';
import StudyCompare from '#pages/Studies/components/StudyCompare';
import StudyImage from '#pages/Studies/components/StudyImage';
import type { StudySectionProps } from '#pages/Studies/types/studySection';
import styles from './StudySection.module.css';

// `**text**` in a paragraph is a highlighted phrase: bold in the study's tint (D-081).
const renderEmphasis = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className={styles.emphasis}>
        {part}
      </strong>
    ) : (
      part
    ),
  );

const StudySection: React.FC<{ section: StudySectionProps }> = ({ section }) => {
  const images = section.image?.filter((img) => img.src) ?? [];
  const endsWithMedia = Boolean(section.panels || section.compare || images.length);
  const hasBullets = Boolean(section.descriptionBullets?.length);
  return (
    <section
      className={clsx(styles.section, endsWithMedia && styles.endsWithMedia)}
      data-order={section.order}
    >
      <div className={styles.copy}>
        <h2 className={styles.title}>{section.title}</h2>
        {(section.description?.length || section.items?.length || hasBullets) && (
          <div className={styles.text}>
            {section.description?.map((desc, i) => (
              <p key={i}>{renderEmphasis(desc)}</p>
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
      {section.panels && <StudyPanels {...section.panels} className={styles.media} />}
      {section.compare && <StudyCompare {...section.compare} className={styles.media} />}
      {images.map((image) => (
        <StudyImage
          key={image.src}
          src={image.src}
          alt={image.alt || ''}
          caption={image.caption}
          corners={image.corners}
          variant={image.variant}
          className={styles.media}
        />
      ))}
    </section>
  );
};

export default StudySection;
