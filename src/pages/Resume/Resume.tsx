import React from 'react';
import Layout from '@components/Layout';
import ExperienceSection from '@components/ExperienceSection';
import SkillList, { designSkills, toolSkills } from '@components/SkillList';
import ContactInfo from '@components/ContactInfo';
import styles from './Resume.module.scss';

const Resume: React.FC = () => (
  <Layout
    title="Jax Engel – Resume | Staff Product Designer"
    metaDescription="View the resume of Jax Engel, a staff-level product designer with 10+ years of experience in enterprise UX, design systems, accessibility, and internal tools."
  >
    <div className={styles['resume-container']}>
      <section>
        <h1>Resume</h1>
        <a href='/resume.pdf' target='_blank' rel='noopener noreferrer'>resume (PDF)</a>
      </section>

      <section>
        <h2>Jax Engel</h2>
        <span>Staff Product Designer</span>

        <ContactInfo />

        <p>
          Product designer with 10+ years of experience creating scalable, accessible tools for enterprise teams. I specialize in design systems, cross-functional collaboration, and simplifying complex workflows. Currently leading system adoption and AI tooling initiatives at ServiceNow.
        </p>
      </section>

      <section>
        <h2>Experience</h2>
        <ExperienceSection />
      </section>

      <section className={styles.education}>
        <h2>Education</h2>
        <span className={styles.school}>The Art Institute of Austin</span>
        <span className={styles.degree}>Bachelor of Fine Arts, Web Design & Interactive Media</span>
      </section>

      <section className={styles.skills}>
        <h2>Skills &amp; Tools</h2>

        <h3>Design &amp; Collaboration</h3>
        <SkillList items={designSkills} />

        <h3>Tools &amp; Technologies</h3>
        <SkillList items={toolSkills} />
      </section>
    </div>
  </Layout>
);

export default Resume;