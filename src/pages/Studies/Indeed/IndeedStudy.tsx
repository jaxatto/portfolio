import React from 'react';
import Layout from '@components/Layout';
import Divider from '@components/Divider';
import Image from '@components/Image';
import ChipGroup from '@components/ChipGroup';
import { content } from './resources/content';
import { meta } from './resources/meta';
import styles from './IndeedStudy.module.scss';

const IndeedStudy: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.wrapper}
  >
  <section>
    <div className={styles['top-section']}>
      <h1 className={styles.title}>{content.header.title}</h1>
      <div className={styles.details}>
        <span className={styles.role}>{content.header.roleDetails[0].role}</span>
        <span className={styles.date}>
          {content.header.roleDetails[0].startDate}
          {content.header.roleDetails[0].endDate && (
            <>
              <span aria-hidden='true'> — </span>
              <span className='sr-only'> to </span>
              {content.header.roleDetails[0].endDate}
            </>
          )}
        </span>
      </div>
    </div>
    <ChipGroup chips={content.header.chips} className={styles['chip-row']} size='small' />
    <Divider variant='section-divider' />
    <p className={styles.description}>{content.header.description}</p>
    <div className={styles['captioned-image']}>
      <Image src={content.header.image[0].src} alt={content.header.image[0].alt} imgClassName={styles.image} fallbackClassName={styles['image-fallback-wrapper']} />
      <p className={styles['image-caption']}>{content.header.image[0].caption}</p>
    </div>
  </section>
  {Object.entries(content)
    .filter(([key]) => key !== 'header')
    .map(([key, section]) => {
      const sec = section as {
        title?: string;
        titleEmoji?: string;
        description?: string[];
        descriptionBullets?: string[];
        image?: Array<{ src: string; alt?: string; caption?: string }>;
      };
      return (
        <section className={styles.section} key={key}>
          <h2 className={styles['section-title']}>
            <span aria-hidden='true'>{sec.titleEmoji}</span> {sec.title}
          </h2>
          {/* Render description paragraphs if present */}
          {sec.description && sec.description.length > 0 &&
            sec.description.map((desc: string, i: number) => (
              <p key={i} className={styles['section-paragraph']}>{desc}</p>
            ))
          }
          {/* Render bullets if present */}
          {sec.descriptionBullets && sec.descriptionBullets.length > 0 && (
            <ul>
              {sec.descriptionBullets.map((bullet: string, i: number) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          )}
          {/* Render image if present */}
          {sec.image && sec.image.length > 0 && sec.image[0].src && (
            <div className={styles['captioned-image']}>
              <Image src={sec.image[0].src} alt={sec.image[0].alt || ''} imgClassName={styles.image} fallbackClassName={styles['image-fallback-wrapper']} />
              {sec.image[0].caption && (
                <p className={styles['image-caption']}>{sec.image[0].caption}</p>
              )}
            </div>
          )}
        </section>
      );
    })}
  </Layout>
);

export default IndeedStudy;