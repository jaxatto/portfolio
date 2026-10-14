import React from 'react';
import Layout from '@components/Layout';
import StudyCardGrid from '@components/StudyCardGrid';
import { meta } from '@pages/Work/resources/meta';

const Work: React.FC = () => (
    <Layout
        title={meta.title}
        metaDescription={meta.description}
    >
        <section id="work">
            <StudyCardGrid />
        </section>
    </Layout>
);

export default Work;