import React from 'react';
import Layout from '#components/Layout';
import StudyCardGrid from '#components/StudyCardGrid';
import styles from './Work.module.css';

// Home page SEO copy, inline (D-003).
const meta = {
  title: 'Jax Engel | Staff Product Designer and Design Engineer',
  description:
    'Jax Engel is a staff product designer and design engineer with 11 years in design systems, accessibility, token automation and enterprise UX.',
};

const Work: React.FC = () => (
  <Layout footerBand={false} title={meta.title} metaDescription={meta.description}>
    <section id="work" className={styles.work}>
      <StudyCardGrid />
    </section>
  </Layout>
);

export default Work;
