import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import palettes from '#styles/palette.module.css';
import type { ColorGroup } from '#tokens/types';
import styles from './StudyCard.module.css';

// Figma "Study Card" (Home, node 2726:63413). Palette = container / on-container token pair.
// The whole card is clickable through a stretched link (the link text's ::after covers the card),
// so the heading stays a real heading and the link name is unique: "Read AI study: <title>".
// Anatomy: title, outcome, link naming the company (D-028).

export type StudyCardProps = {
  title: string; // The problem solved
  outcome?: string; // One sentence of proof: what changed and Jax's part
  image: string;
  imageAlt?: string; // Empty by default: the preview is decorative next to the title
  linkUrl: string;
  linkText: string; // Full label, e.g. "Read the Indeed case study"
  linkTextShort?: string; // Shown on phones so the link never wraps (D-031)
  headingLevel?: 'h2' | 'h3'; // h2 on Home, h3 under a case study (heading order)
  enlargeImage?: boolean; // Screenshot 40px larger inside the same window (D-028)
  palette?: ColorGroup;
  layout?: 'horizontal' | 'vertical'; // Horizontal: preview beside the text (desktop only)
  variant?: 'work' | 'study'; // 'study' = smaller type, used under a case study
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
  layout = 'vertical',
  priority = false,
  variant = 'work',
}) => {
  const Heading = headingLevel;
  return (
    <article
      className={clsx(
        styles.card,
        palettes[palette],
        layout === 'horizontal' && styles.horizontal,
        variant === 'study' && styles.study,
        enlargeImage && styles.enlarge,
      )}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          <Heading className={styles.title}>{title}</Heading>
          {outcome && <p className={styles.outcome}>{outcome}</p>}
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
          <img
            src={image}
            alt={imageAlt}
            className={styles.image}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
    </article>
  );
};

export default StudyCard;
