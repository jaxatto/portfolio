import React from 'react';
import Layout from '@components/Layout';
import Header from '@pages/Resume/components/Header';
import ExperienceSection from '@pages/Resume/components/ExperienceSection';
import SkillsSection from '@pages/Resume/components/SkillsSection';
import Footer from '@pages/Resume/components/Footer';
import styles from './Resume.module.scss';
import { meta } from '@pages/Work/resources/meta';


const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    showFooter={false}
  >
    <div className={styles.wrapper}>
      <Header />

      <ExperienceSection />
      
      <SkillsSection />

      <Footer />
    </div>
  </Layout>
);

export default Resume;