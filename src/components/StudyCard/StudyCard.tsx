import React from 'react';
import Link from '@components/Link';
import Image from '@components/Image';
import Icon from '@components/Icon';
import styles from './StudyCard.module.scss';

// StudyCard component for displaying case studies or work examples
// It supports various props for customization, including title, description, image, link URL, and link text
// Usage: <StudyCard title="Case Study Title" description={["Byline text"]} image="image-url.jpg" linkUrl="/case-study" linkText="Read more" />
// The component can be used in different layouts (horizontal or vertical) and palettes (primary, secondary, tertiary)
// It also supports an optional count and total for displaying the number of case studies

export type StudyCardProps = {
  title: string; // Card title
  description: string[]; // Byline text divided by dot
  image: string | React.ReactNode; // Image URL or React node
  imageAlt?: string; // Alt text for the image
  linkUrl: string; // URL for the study
  linkText: string; // Text for the link
  palette?: 'primary' | 'secondary' | 'tertiary'; // Color palette for the card
  layout?: 'horizontal' | 'vertical'; // Orientation of the card content
  count?: number; // Optional count for the card, e.g., "Case study 1"
  total?: number; // Optional total number of cards, e.g., "of 5"
  iconFallback?: string; // Fallback icon name if image fails to load
  variant?: 'work' | 'study'; // Variant used on home/work page or on case study page
};

const StudyCard: React.FC<StudyCardProps> = ({
  title,
  description,
  image,
  imageAlt = '', // Image is decorative by default
  linkUrl,
  linkText,
  palette = 'primary',
  layout = 'vertical',
  count,
  total,
  iconFallback = 'pencilRuler', // Default icon fallback
  variant = 'work',
}) => {
  const accessibleLabel = [
    `Case study${typeof count === 'number' ? ` ${count}` : ''}${typeof total === 'number' ? ` of ${total}` : ''}:`,
    title,
    linkText
  ].filter(Boolean).join(' – ');

  return (
    <Link
      href={linkUrl}
      className={[
        styles.wrapper,
        styles[layout] ? styles[layout] : '',
        `${palette}-card`,
        styles[variant]
      ].filter(Boolean).join(' ')}
      aria-label={accessibleLabel}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>
            {description.map((desc, i) => (
              <span key={i}>{desc}</span>
            ))}
          </p>
        </div>
        <span className={styles['card-link']}>
          {linkText}
          <Icon 
            name="arrow-right" 
            className={styles.icon}
          />
        </span>
      </div>
      <div className={styles['case-study-image-wrapper']}>
        {typeof image === 'string'
          ? <Image 
              src={image} 
              alt={imageAlt} 
              iconFallback={iconFallback} 
              imgClassName={styles['case-study-image']}
              className={styles['case-study-component-wrapper']} 
              fallbackClassName={styles['case-study-image-fallback']}
            />
          : image}
      </div>
    </Link>
  );
}

export default StudyCard;