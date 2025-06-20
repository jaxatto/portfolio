import React from 'react';
import Image from '@components/Image';
import { content } from './resources/content';
import styles from './Banner.module.scss';

const Banner: React.FC = () => (
  <section className={styles['banner-wrapper']}>
    <div className={styles.banner}>
      <div className={styles['image-wrapper']}>
        <Image
          src={content.image}
          alt={content.imageAlt}
          iconFallback="person"
          imgClassName={styles['image-main']}
          fallbackClassName={styles['image-fallback']}
        />
        <span className={styles.bubble} aria-hidden="true">{content.emoji}</span>
      </div>                    
      <div className={styles.text}>
        <h1 className={styles.heading}>{content.heading}</h1>
        <p className={styles.description} aria-hidden="true">
          {content.description.map((part, i) =>
            part.type === "underline" ? (
              <span key={i} className={styles.underline}>{part.value}</span>
            ) : (
              <React.Fragment key={i}>{part.value}</React.Fragment>
            )
          )}
        </p>
        <p className="sr-only">{content.srOnlyDescription}</p>
      </div>
    </div>
  </section>
);

export default Banner;
