import React from 'react';
import Link from '@components/Link';
import { content } from './resources/content';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  // Split the byline string at the placeholders
  const [beforeEmail, afterEmailAndLinkedin] = content.byline.split('{email}');
  const [between, afterLinkedin] = afterEmailAndLinkedin.split('{linkedin}');

  return (
    <div className={styles.wrapper}>
      <h2>{content.heading}</h2>
      <p>{content.description}</p>
      <Link href={content.resumeHref}>{content.button}</Link>
      <p>
        {beforeEmail}
        <Link href={content.emailHref}>{content.emailLabel}</Link>
        {between}
        <Link href={content.linkedinHref}>{content.linkedinLabel}</Link>
        {afterLinkedin}
      </p>
    </div>
  );
};

export default Footer;
