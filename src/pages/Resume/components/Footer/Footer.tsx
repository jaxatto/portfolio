import React from 'react';
import Link from '@components/Link';
import Divider from '@components/Divider';
import { content } from './resources/content';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  // Split the byline string at the placeholders
  const [beforeEmail, afterEmailAndLinkedin] = content.byline.split('{email}');
  const [between, afterLinkedin] = afterEmailAndLinkedin.split('{linkedin}');

  // Split heading into two parts (first two words, rest)
  const headingWords = content.heading.split(' ');
  const headingFirst = headingWords.slice(0, 2).join(' ');
  const headingRest = headingWords.slice(2).join(' ');

  return (
    <div className={styles.wrapper}>
      <Divider variant="section-divider" contentAlign="left" className={styles.divider} />
      <div className={styles.content}>
        <div className={styles.top}>
          <h2 className={styles.title}>
            <span>{headingFirst}</span>
            <span>{headingRest}</span>
          </h2>
          <p className={styles.description}>{content.description}</p>
        </div>

        <div className={styles.bottom}>
          <Link 
            href={content.resumeHref} 
            className={styles.button}
            styleAs="button"
            iconName="download"
            iconPosition="left"
          >
            {content.button}
          </Link>

          <p className={styles.byline}>
            <span>{beforeEmail}</span>
            <Link href={content.emailHref}>{content.emailLabel}</Link>
            <span>{between}</span>
            <Link href={content.linkedinHref}>{content.linkedinLabel}</Link>
            <span>{afterLinkedin}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
