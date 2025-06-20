import React from 'react';
import Link from '@components/Link';
import styles from './Header.module.scss';
import { content } from './resources/content';

const Header: React.FC = () => (
  <section className={styles.wrapper}>
    <h1 className="sr-only">{content.h1}</h1>
    
    <h2 className={styles['page-title']}>{content.heading}</h2>
    <p className={styles.description}>{content.description}</p>

    <p className={styles.byline}>{content.byline}</p>
    <Link href={content.buttonHref} className={styles.button} iconName="arrow-right" styleAs="button">
      {content.buttonLabel}
    </Link>
  </section>
);

export default Header;
