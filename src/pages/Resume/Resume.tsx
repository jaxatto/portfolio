import React from 'react';
import Layout from '@components/Layout';
import Icon from '#components/Icon';
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

// TODO(jax): proof points are numbers from the resume PDF. Confirm which three to lead with.
const facts = [
  { value: '11 years', label: 'Designing and building products' },
  { value: 'Remote', label: 'Central Time (US)' },
  // TODO(jax): third proof point is the number of design systems worked on. Needs the count.
];

const chipPalettes = ['primary', 'secondary', 'tertiary', 'quaternary'] as const;

const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
  >
    <header className={styles.header}>
      <div className={styles.intro}>
      <div className={styles.identity}>
        <h1 className={styles.title}>Jax Engel</h1>
        <p className={styles.role}>Staff Product Designer and Design Engineer</p>
      </div>
      <p className={styles.summary}>
        Staff product designer and design engineer with 11 years of experience in scalable design
        systems, enterprise tools and AI-assisted workflows. I work across product design and
        front-end engineering to reduce UX friction, unify multi-team ecosystems and build in
        accessibility at scale.
      </p>
      <div className={styles.actions}>
        <a className={styles.button} href={contactInfo.resume.src} target="_blank" rel="noopener noreferrer">
          <Icon name="download" className={styles.buttonIcon} aria-hidden="true" />
          Download resume (PDF)
        </a>
        <a className={`${styles.button} ${styles.outline}`} href={contactInfo.email.src}>
          Contact
        </a>
      </div>
      </div>
      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt className={styles.factLabel}>{fact.label}</dt>
            <dd className={styles.factValue}>{fact.value}</dd>
          </div>
        ))}
      </dl>
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
