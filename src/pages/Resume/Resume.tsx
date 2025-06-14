import React from 'react';
import Layout from '@components/Layout';
import ExperienceSection from '@components/ExperienceSection';
import SkillList, { designSkills, toolSkills } from '@components/SkillList';
import styles from './Resume.module.scss';

const Resume: React.FC = () => (
  <Layout>
    <div className={styles['resume-container']}>
      <section>
        <h1>Resume</h1>
        <p>Download my <a href='/resume.pdf' target='_blank' rel='noopener noreferrer'>resume (PDF)</a>.</p>
      </section>

      <section>
        <h2>Jax Engel</h2>
        <span>Staff Product Designer</span>

        <div className={styles['contact-info']}>
          Fort Worth, TX · Remote · <a href="mailto:hello@jaxengeldesign.com">hello@jaxengeldesign.com</a> · <a href="tel:5129486910">512-948-6910</a><br />
          <a href="https://linkedin.com/in/jaxengel" target="_blank" rel="noopener noreferrer">linkedin.com/in/jaxengel</a> · <a href="https://jaxengeldesign.com" target="_blank" rel="noopener noreferrer">jaxengeldesign.com</a>
        </div>

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