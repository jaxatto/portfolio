import React from 'react';
import Layout from '@components/Layout';
import StudyCardGrid from '@components/StudyCardGrid';

// Home page SEO copy, inline (D-003). TODO(jax): provisional, review with the hero copy (D-016).
// The old resources/meta.ts stays for the Resume page until its slice.
const meta = {
    title: 'Jax Engel | Staff Product Designer and Design Technologist',
    description:
        'Jax Engel is a staff product designer who designs and builds accessible products and the systems behind them: enterprise tools, fintech, design systems and AI-assisted workflows. Open to remote roles.',
};

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