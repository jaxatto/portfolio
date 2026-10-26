import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import Image from '#components/Image';
import palettes from '#styles/palette.module.css';
import type { ColorGroup } from '#tokens/types';
import typography from '#styles/type.module.css';
import styles from './StudyCard.module.css';

// Figma "Study Card" (Home, node 2726:63413). Palette = container / on-container token pair.
// The whole card is clickable through a stretched link (the link text's ::after covers the card),
// so the heading stays a real heading and the link name is unique: "Read AI study: <title>".
// Anatomy: title, outcome, link naming the company (D-028).

export type StudyCardProps = {
  title: string; // The problem solved
  outcome?: string; // One sentence of proof: what changed and Jax's part
  image: { src: string; width: number; height: number }; // From `import x from './x.png?size'`
  imageAlt?: string; // Empty by default: the preview is decorative next to the title
  linkUrl: string;
  linkText: string; // Full label, e.g. "Read the Indeed case study"
  linkTextShort?: string; // Shown on phones so the link never wraps (D-031)
  headingLevel?: 'h2' | 'h3'; // h2 on Home, h3 under a case study (heading order)
  enlargeImage?: boolean; // Screenshot 40px larger inside the same window (D-028)
  palette?: ColorGroup;
  variant?: 'work' | 'study'; // 'work': preview beside the text from tablet up. 'study': stacked, smaller type, under a case study
  priority?: boolean; // Above the fold: load the preview now, not when it nears the viewport
};

const StudyCard: React.FC<StudyCardProps> = ({
  title,
  outcome,
  image,
  imageAlt = '',
  linkUrl,
  linkText,
  linkTextShort = 'Read the case study',
  headingLevel = 'h3',
  palette = 'brand',
  enlargeImage = false,
  priority = false,
  variant = 'work',
}) => {
  const Heading = headingLevel;
  return (
    <article
      className={clsx(
        styles.card,
        palettes[palette],
        variant === 'work' && styles.horizontal,
        variant === 'study' && styles.study,
        enlargeImage && styles.enlarge,
      )}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          <Heading className={clsx(typography.headingLg, styles.title)}>{title}</Heading>
          {outcome && (
            <p
              className={clsx(
                variant === 'study' ? typography.bodySm : typography.bodyMd,
                styles.outcome,
              )}
            >
              {outcome}
            </p>
          )}
        </div>
        <RouterLink to={linkUrl} className={styles.link}>
          <span className={styles.linkText}>
            <span className={styles.linkFull}>{linkText}</span>
            <span className={styles.linkShort}>{linkTextShort}</span>
            <span className="sr-only">: {title}</span>
          </span>
          <Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
        </RouterLink>
      </div>
      <div className={styles.preview}>
        <div className={styles.sample}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={imageAlt}
            priority={priority}
            className={styles.imageBox}
            imgClassName={styles.image}
            fallbackClassName={styles.fallback}
          />
        </div>
      </div>
    </article>
  );
};

export default StudyCard;
