import React from 'react';
import Layout from '@components/Layout';
import Button from '#components/Button';
import { chipPalettes } from '#components/Chip';
import RoleLines from '#components/RoleLines';
import { contactInfo } from '@constants/contactInfo';
import { roleLines } from '@constants/roleLines';
import Role from '@pages/Resume/components/Role';
import SkillGroup from '@pages/Resume/components/SkillGroup';
import { roles } from '@pages/Resume/resources/roles';
import { skillGroups } from '@pages/Resume/resources/skills';
import { meta } from '@pages/Resume/resources/meta';
import styles from './Resume.module.css';

// Resume page on tokens and the 960 column (slice 6, D-087). The page carries the resume's content so it
// can be read and searched in the browser, with the PDF as the download. Short copy is inline (D-003);
// the role and skill lists live in resources/ because they are data.

// TODO(jax): proof point labels are provisional. The 8 counts Visa, Indeed, FireHydrant, ActBlue, Albertsons, ServiceNow, Toyota and Spectrum.
const facts = [
  { value: '11 years', label: 'Designing and building products' },
  { value: '8 systems', label: 'Design systems contributed to in production' },
  { value: 'Remote-first', label: 'Based in Texas, on Central Time' },
];

const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
    backToTop
    headerLabel={roleLines}
  >
    <header className={styles.header}>
      <div className={styles.intro}>
      <div className={styles.identity}>
        {/* The visible heading is the name. "Resume:" is read by assistive tech only, so the h1 names the page. */}
        <h1 className={styles.title}>
          <span className="sr-only">Resume: </span>
          Jax Engel
        </h1>
        {/* Phones only: the nav's left slot is hidden there (like Home), so the role shows under the name. */}
        <p className={styles.byline}>
          <RoleLines lines={roleLines} />
        </p>
      </div>
      <p className={styles.summary}>
        11 years of experience in scalable design systems, enterprise tools and AI-assisted
        workflows. I work across product design and front-end engineering to reduce UX friction,
        unify multi-team ecosystems and build in accessibility at scale.
      </p>
      <div className={styles.actions}>
        <Button href={contactInfo.resume.src} newTab icon="download" iconPosition="start" className={styles.action}>
          Download resume (PDF)
        </Button>
        <Button variant="outline" href={contactInfo.email.src} icon="envelope-simple" iconPosition="start" className={styles.action}>
          Contact
        </Button>
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
