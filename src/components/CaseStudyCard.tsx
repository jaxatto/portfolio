import React from 'react';
import styles from './CaseStudyCard.module.scss';
import Link from './Link';

export type CaseStudyCardProps = {
  title: string;
  description: string;
  image: string | React.ReactNode;
  imageAlt?: string;
  linkUrl: string;
  linkText: string;
  className?: string;
  layout?: 'horizontal' | 'vertical';
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  linkUrl,
  linkText,
  className = '',
  layout = 'vertical',
}) => {
  return (
    <div className={`${styles.card} ${styles[layout]} ${className}`}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Link href={linkUrl} className={styles.link} iconName='arrow-right'>
          {linkText}
        </Link>
      </div>
      <div className={styles.image}>
        {typeof image === 'string' ? <img src={image} alt={imageAlt} /> : image}
      </div>
    </div>
  );
};

export default CaseStudyCard;