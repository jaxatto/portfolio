import React from 'react';
import type { StudyPanelsData } from '#pages/Studies/types/studySection';
import styles from './StudyPanels.module.css';

// Page crops side by side in a sunken box (D-054, Figma Indeed 2853:27124). Each panel is a pixel
// rectangle of one source image, positioned with percentages, so one file serves all of them and
// stays sharp. The box clips whatever runs past its bottom edge.
type StudyPanelsProps = StudyPanelsData & { className?: string };

const StudyPanels: React.FC<StudyPanelsProps> = ({
  src,
  sourceWidth,
  sourceHeight,
  slices,
  caption,
  framed,
  className,
}) => (
  <figure className={`${styles.figure} ${framed ? styles.framed : ''} ${className ?? ''}`}>
    <div className={styles.box}>
      {slices.map((slice) => (
        <div
          key={slice.alt}
          className={styles.panel}
          style={{ aspectRatio: `${slice.width} / ${slice.height}`, flexGrow: slice.weight }}
        >
          <img
            src={src}
            alt={slice.alt}
            className={styles.image}
            style={{
              width: `${(sourceWidth / slice.width) * 100}%`,
              left: `${(-slice.x / slice.width) * 100}%`,
              top: `${(-slice.y / slice.height) * 100}%`,
              height: `${(sourceHeight / slice.height) * 100}%`,
            }}
          />
        </div>
      ))}
    </div>
    {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
  </figure>
);

export default StudyPanels;
