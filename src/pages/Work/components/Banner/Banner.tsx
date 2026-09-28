import React from 'react';
import Image from '@components/Image';
import { content } from './resources/content';
import styles from './Banner.module.css';

const Banner: React.FC = () => (
  <section className={styles.banner}>
    <div className={styles['image-wrapper']}>
      <span className={styles.ring} aria-hidden="true" />
      <Image
        src={content.image}
        alt={content.imageAlt}
        iconFallback="person"
        className={styles.photo}
        imgClassName={styles['image-main']}
        fallbackClassName={styles['image-fallback']}
      />
      <span className={styles.bubble} aria-hidden="true">
        {content.emoji}
      </span>
    </div>
    <div className={styles.text}>
      <h1 className={styles.heading}>{content.heading}</h1>
      <p className={styles.description}>{content.description}</p>
    </div>
  </section>
);

export default Banner;
