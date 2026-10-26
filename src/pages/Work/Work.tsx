import React from 'react';
import Layout from '#components/Layout';
import StudyCardGrid from '#components/StudyCardGrid';
import styles from './Work.module.css';
import { meta } from './resources/meta';

const Work: React.FC = () => (
  <Layout footerBand={false} title={meta.title} metaDescription={meta.description}>
    <section id="work" className={styles.work}>
      <StudyCardGrid />
    </section>
  </Layout>
);

export default Work;
