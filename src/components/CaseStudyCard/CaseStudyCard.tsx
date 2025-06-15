import React, { useRef } from 'react';
import Link from '@components/Link';
import Image from '@components/Image';
import Icon from '@components/Icon';
import styles from './CaseStudyCard.module.scss';

export type CaseStudyCardProps = {
  title: string;
  description: [string, string?];  
  image: string | React.ReactNode;
  imageAlt?: string;
  linkUrl: string;
  linkText: string;
  palette?: 'primary' | 'secondary' | 'tertiary';
  layout?: 'horizontal' | 'vertical';
  count?: number;
  total?: number;
  iconFallback?: string;
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  linkUrl,
  linkText,
  palette = 'primary',
  layout = 'vertical',
  count,
  total,
  iconFallback = 'pencilRuler',
  
}) => {
  return (
    <Link
      href={linkUrl}
      className={[
        styles.card,
        styles[layout] ? styles[layout] : '',
        `${palette}-card`
      ].filter(Boolean).join(' ')}
      aria-label={title + ' – ' + linkText}
    >
      <div className={styles.content}>
        <div className={styles.text}>
            <span className='sr-only'>
              Case study {count}{typeof total === 'number' ? ` of ${total}` : ''}.
            </span>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>
              <span className='sr-only'>Project focuses on&nbsp;</span>
              {description.map((item, idx) => (
                <React.Fragment key={item}>
                  {item}
                  {idx === 0 && description.length > 1 && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="sr-only">for&nbsp;</span>
                    </>
                  )}
                </React.Fragment>
              ))}
            </p>
        </div>
        <span className={styles.link}>
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
};

export default CaseStudyCard;