import React from 'react';
import Layout from '@components/Layout';
import Header from '@pages/Resume/components/Header';
import ExperienceSection from '@pages/Resume/components/ExperienceSection';
import SkillsSection from '@pages/Resume/components/SkillsSection';
import Footer from '@pages/Resume/components/Footer';
import styles from './Resume.module.scss';


const Resume: React.FC = () => (
  <Layout
    title="Jax Engel – Resume | Staff Product Designer"
    metaDescription="View the resume of Jax Engel, a staff-level product designer with 10+ years of experience in enterprise UX, design systems, accessibility, and internal tools."
    showFooter={false}
  >
    <div className={styles['resume-container']}>
      <Header />

      <ExperienceSection />
      
      <SkillsSection />

      <Footer />
    </div>
  </Layout>
);

export default Resume;