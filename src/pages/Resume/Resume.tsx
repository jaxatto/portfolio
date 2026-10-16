import React from 'react';
import Layout from '@components/Layout';
import Header from '@pages/Resume/components/Header';
import ExperienceSection from '@pages/Resume/components/ExperienceSection';
import SkillsSection from '@pages/Resume/components/SkillsSection';
import { meta } from '@pages/Resume/resources/meta';


const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
  >
    <Header />

    <ExperienceSection />
    
    <SkillsSection />
  </Layout>
);

export default Resume;