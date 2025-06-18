import React from 'react';
import Layout from '@components/Layout';
// import Icon from '@components/Icon';
import ResumeSectionRole from '@pages/Resume/components/ExperienceSection/ExperienceSection';
import styles from './Resume.module.scss';


const Resume: React.FC = () => (
  <Layout
    title="Jax Engel – Resume | Staff Product Designer"
    metaDescription="View the resume of Jax Engel, a staff-level product designer with 10+ years of experience in enterprise UX, design systems, accessibility, and internal tools."
    showFooter={false}
  >
    <div className={styles['resume-container']}>
      <h1 className="sr-only">Resume page</h1>

      <section>
        <h2>Jax Engel</h2>
        <p>Bridging the gap between design, code, and collaboration.</p>

        <p>Looking for a unicorn? 🦄</p>
        {/* <button>Get my resume <Icon name="arrow-right" /></button> */}
      </section>

      <section id="experience">
        <ResumeSectionRole />
      </section>
      
      <section className={styles.skills}>
        
      </section>
    </div>
  </Layout>
);

export default Resume;