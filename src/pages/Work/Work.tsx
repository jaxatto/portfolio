import React from 'react';
import Layout from '@components/Layout';
import StudyCardGrid from '@components/StudyCardGrid';

// Home page SEO copy, inline (D-003). TODO(jax): provisional, review with the hero copy (D-016).
const meta = {
    title: 'Jax Engel | Staff Product Designer and Design Engineer',
    description:
        'Jax Engel is a staff product designer who designs and builds accessible products and the systems behind them: enterprise tools, fintech, design systems and AI-assisted workflows.',
};

const Work: React.FC = () => (
    <Layout
        footerBand={false}
        legacy={false}
        title={meta.title}
        metaDescription={meta.description}
    >
        <section id="work">
            <StudyCardGrid />
        </section>
    </Layout>
);

export default Work;