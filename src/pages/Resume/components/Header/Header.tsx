import React from 'react';
import Link from '@components/Link';
import styles from './Header.module.scss';
import { content } from './resources/content';

const Header: React.FC = () => (
  <section className={styles.wrapper}>
    <h1 className="sr-only">{content.h1}</h1>
    
    <h2>{content.heading}</h2>
    <p>{content.description}</p>

    <p>{content.byline}</p>
    <Link href={content.buttonHref} className={styles.resumeLink}>
      {content.buttonLabel}
    </Link>
  </section>
);

export default Header;
