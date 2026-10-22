import React from 'react';
import Layout from '@components/Layout';
import Icon from '#components/Icon';
import TextLink from '#components/TextLink';
import { contactInfo } from '@constants/contactInfo';
import Role from '@pages/Resume/components/Role';
import SkillGroup from '@pages/Resume/components/SkillGroup';
import { roles } from '@pages/Resume/resources/roles';
import { skillGroups } from '@pages/Resume/resources/skills';
import { meta } from '@pages/Resume/resources/meta';
import styles from './Resume.module.css';

// Resume page on tokens and the 960 column (slice 6, D-087). The page carries the resume's content so it
// can be read and searched in the browser, with the PDF as the download. Short copy is inline (D-003);
// the role and skill lists live in resources/ because they are data.

const chipPalettes = ['primary', 'secondary', 'tertiary', 'quaternary'] as const;

const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
  >
    <header className={styles.header}>
      <h1 className={styles.title}>Jax Engel</h1>
      <p className={styles.role}>Staff Product Designer and Design Engineer</p>
      <p className={styles.summary}>
        Staff product designer and design engineer with 11 years of experience in scalable design
        systems, enterprise tools and AI-assisted workflows. I work across product design and
        front-end engineering to reduce UX friction, unify multi-team ecosystems and build in
        accessibility at scale.
      </p>
      <p className={styles.contact}>
        <span>Remote · Central Time</span>
        <TextLink line href={contactInfo.email.src}>{contactInfo.email.label}</TextLink>
        <TextLink line href={contactInfo.linkedin.src} newTab>
          LinkedIn
        </TextLink>
      </p>
      <a className={styles.button} href={contactInfo.resume.src} target="_blank" rel="noopener noreferrer">
        <Icon name="download" className={styles.buttonIcon} aria-hidden="true" />
        Download resume (PDF)
      </a>
    </header>

    <section className={styles.section} aria-labelledby="experience">
      <h2 id="experience" className={styles.heading}>Experience</h2>
      <ul className={styles.roles}>
        {roles.map((role) => (
          <Role key={`${role.company}-${role.startDate}`} role={role} />
        ))}
      </ul>
    </section>

    <section className={styles.section} aria-labelledby="skills">
      <h2 id="skills" className={styles.heading}>Skills and tools</h2>
      <div className={styles.skills}>
        {skillGroups.map((group, i) => (
          <SkillGroup
            key={group.heading}
            heading={group.heading}
            items={group.items}
            palette={chipPalettes[i % chipPalettes.length]}
          />
        ))}
      </div>
    </section>

    <section className={styles.section} aria-labelledby="education">
      <h2 id="education" className={styles.heading}>Education</h2>
      <p className={styles.education}>
        The Art Institute of Austin, Bachelor of Fine Arts, Web Design and Interactive Media
      </p>
    </section>
  </Layout>
);

export default Resume;
