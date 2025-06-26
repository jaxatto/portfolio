import React from 'react';
import Layout from '@components/Layout';
import Divider from '@components/Divider';
import Banner from '@pages/Work/components/Banner';
import Grid from '@components/Grid';
import { content } from '@pages/Work/resources/content';
import { meta } from '@pages/Work/resources/meta';
import styles from './Work.module.scss';

const Work: React.FC = () => (
    <Layout
        title={meta.title}
        metaDescription={meta.description}
    >
        <Banner />
        
        <section>
            <div className={styles['work-intro-wrapper']}>
                <Divider />
                <h2 className={styles['work-intro-title']}>{content.workIntro}</h2>
            </div>

            <Grid />
        </section>
    </Layout>
);

export default Work;