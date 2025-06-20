import React from 'react';
import Layout from '@components/Layout';
import Divider from '@components/Divider';
import Image from '@components/Image';
import { images } from './resources/images';
import { content } from './resources/content';
import { meta } from './resources/meta';
import styles from './About.module.scss';

const About: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
  >
    <div className={styles['about-wrapper']}>
      <section>
        <div className={styles['top-section']}>
          <h1 className="title-md">
            <span aria-hidden="true">{content.header.headingEmoji}</span> {content.header.heading}
          </h1>
          <ul>
            {content.header.bullets.map((bullet, i) => (
              <li key={i}>
                <span aria-hidden="true">{bullet.emoji}</span> {bullet.text}
              </li>
            ))}
          </ul>
        </div>
        <Divider variant='section-divider' className={styles.divider} />
        <p>{content.header.description}</p>
      </section>
      <section className={styles['how-section']}>
        <h2>
          <span aria-hidden="true">{content.how.headingEmoji}</span> {content.how.heading}
        </h2>
        {content.how.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>
      <section>
        <h2>
          <span aria-hidden="true">{content.more.headingEmoji}</span> {content.more.heading}
        </h2>
        {content.more.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>
      <section>
        <ul className={styles['lifestyle-image-row']}>
          <span className="sr-only">
            {content.images.srOnly.intro}
          </span>
          {images.map((img, i) => (
            <li key={i} className={styles['lifestyle-line-item']}  >
              <Image
                src={img.src}
                alt={img.alt}
                iconFallback={img.iconFallback}
                altFallback={img.altFallback}
                className={styles['lifestyle-fallback-wrapper']}
                fallbackClassName={styles['lifestyle-fallback-icon']}
              />
            </li>
          ))}
          <span className="sr-only">
            {content.images.srOnly.outro}
          </span>
        </ul>
      </section>
    </div>
  </Layout>
);

export default About;