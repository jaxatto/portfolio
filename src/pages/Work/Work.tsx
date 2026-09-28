import React from 'react';
import Layout from '@components/Layout';
import Banner from '@pages/Work/components/Banner';
import StudyCardGrid from '@components/StudyCardGrid';
import meta from '@pages/Work/resources/meta.json';

const Work: React.FC = () => (
    <Layout
        title={meta.title}
        metaDescription={meta.description}
        narrow
    >
        <Banner />

        <section aria-label="Case studies">
            <StudyCardGrid />
        </section>
    </Layout>
);

export default Work;
