import React from 'react';
import clsx from 'clsx';
import StudyCard, { StudyCardProps } from '#components/StudyCard';
import { studyLinks } from '#constants/studyLinks';
import themeweaverImage from '#assets/samples/servicenow-sample-min.png?size';
import indeedImage from '#assets/samples/indeed-sample-min.webp?size';
import actblueImage from '#assets/samples/actblue-sample-min.webp?size';
import toyotaImage from '#assets/samples/toyota-sample-min.webp?size';
import styles from './StudyCardGrid.module.css';

// Cards for the Home page and the "next study" row under each case study (D-028).
// Copy is inline (D-003). Figma: Home 2839:21650. Outcome lines come from each study's own content (D-028).

const cards: StudyCardProps[] = [
  {
    title: 'Building a multi‑brand token system',
    outcome:
      'Led token architecture and Figma-to-code automation for Toyota’s PRIME design system, defining 680 primitive and theme tokens and 120 component tokens.',
    image: toyotaImage,
    imageAlt: '',
    linkUrl: studyLinks.toyota,
    linkText: 'Read the Toyota case study',
    palette: 'brand',
  },
  {
    title: 'Replacing support tickets with self‑serve setup',
    outcome:
      'Led design of the Salesforce integration end to end. Admins fix sync issues themselves, cutting support costs an estimated $1.5M a year.',
    image: actblueImage,
    linkUrl: studyLinks.actblue,
    linkText: 'Read the ActBlue case study',
    enlargeImage: true,
    palette: 'secondary',
  },
  {
    title: 'Turning surveys into themes in minutes',
    outcome:
      'Shaped the experience of an internal AI tool that codes open-ended survey responses into themes. Coding by hand took 10+ hours per 100 responses.',
    image: themeweaverImage,
    imageAlt: '',
    linkUrl: studyLinks.servicenow,
    linkText: 'Read the ServiceNow case study',
    enlargeImage: true,
    palette: 'tertiary',
  },
  {
    title: 'Documenting a global design system',
    outcome:
      'Designed, documented and shipped 20 accessible, localized components for a design system used by 100+ designers across Indeed.',
    image: indeedImage,
    linkUrl: studyLinks.indeed,
    linkText: 'Read the Indeed case study',
    enlargeImage: true,
    palette: 'quaternary',
  },
];

type StudyCardGridProps = {
  variant?: 'work' | 'study'; // 'work' = Home (all cards), 'study' = two linked cards under a study
  excludeUrl?: string; // Hides the current study
};

const StudyCardGrid: React.FC<StudyCardGridProps> = ({ variant = 'work', excludeUrl }) => {
  const visible =
    variant === 'work' ? cards : cards.filter((card) => card.linkUrl !== excludeUrl).slice(0, 2);

  return (
    <div className={clsx(styles.grid, variant === 'study' && styles.study)}>
      {visible.map((card, index) => (
        <StudyCard
          key={card.title}
          {...card}
          variant={variant}
          priority={variant === 'work' && index === 0}
          headingLevel={variant === 'work' ? 'h2' : 'h3'}
        />
      ))}
    </div>
  );
};

// The card palette of a study, so its page can color the h1 like the card's title (D-052).
export const studyPalette = (linkUrl: string) =>
  cards.find((card) => card.linkUrl === linkUrl)?.palette ?? 'brand';

export default StudyCardGrid;
