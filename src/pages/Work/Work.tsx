import React from 'react';
import Layout from '@components/Layout';
import DotsRow from '@components/DotsRow';
import Banner from '@pages/Work/components/Banner';
import Grid from '@pages/Work/components/Grid';
import styles from './Work.module.scss';

const Work: React.FC = () => (
    <Layout
        title="Jax Engel | Staff Product Designer – Figma, Systems, UX, Accessibility"
        metaDescription="Jax Engel is a remote staff product designer at ServiceNow, building accessible, scalable tools for enterprise and fintech. Experienced in systems, Figma, and working closely with engineering."
    >
        <Banner />
        
        <section>
            <div className={styles['work-intro-wrapper']}>
                <DotsRow />
                <h2>Here are a few product challenges I've helped solve</h2>
            </div>

            <Grid />
        </section>
    </Layout>
);

export default Work;