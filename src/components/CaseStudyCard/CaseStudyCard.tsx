import React from 'react';
import Link from '@components/Link';
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
}) => {

  return (
    <div className={[
      styles.card,
      styles[layout] ? styles[layout] : '',
      `${palette}-card`
    ].filter(Boolean).join(' ')}
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