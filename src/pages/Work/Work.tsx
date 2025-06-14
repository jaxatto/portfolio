import React from 'react';
import Layout from '@components/Layout';
import DotsRow from '@components/DotsRow';
import CaseStudyCard from '@components/CaseStudyCard';
import type { CaseStudyCardProps } from '@components/CaseStudyCard';

import styles from './Work.module.scss';

import profileImg from '@assets/jax-engel-min.png';
import primaryImage from '@assets/samples/placeholder-min.png';
import secondaryImage from '@assets/samples/indeed-sample-min.png';
import tertiaryImage from '@assets/samples/actblue-sample-min.png';

const caseStudies: CaseStudyCardProps[] = [
    {
        title: 'Designing an AI-driven tool to accelerate qualitative survey workflows',
        description: ['Product design', 'Enterprise'],   
        image: primaryImage,
        imageAlt: 'Design preview for an AI survey workflow tool interface',
        linkUrl: '/case-study/servicenow',
        linkText: 'Read AI study',
        palette: 'primary',
        layout: 'horizontal'
    },
    {
        title: 'Scaling clarity and consistency across Indeed\'s hiring platform',
        description: ['Design system', 'Enterprise'], 
        image: secondaryImage,
        imageAlt: 'Design preview for the Indeed.com hiring platform home page',
        linkUrl: '/case-study/indeed',
        linkText: 'Read system study',
        palette: 'secondary',
        layout: 'vertical'
    },
    {
        title: 'Improving data visibility for teams managing critical donation data',
        description: ['Product design', 'Nonprofit'], 
        image: tertiaryImage,
        imageAlt: 'Design preview for ActBlue Salesforce integration admin page',
        linkUrl: '/case-study/actblue',
        linkText: 'Read integration study',
        palette: 'tertiary',
        layout: 'vertical'
    },
];

const Work: React.FC = () => (
    <Layout
        title="Jax Engel | Staff Product Designer – Figma, Systems, UX, Accessibility"
        metaDescription="Jax Engel is a remote staff product designer at ServiceNow, building accessible, scalable tools for enterprise and fintech. Experienced in systems, Figma, and working closely with engineering."
    >
        <section className={styles['banner-wrapper']}>
            <div className={styles.banner}>
                <div className={styles['image-wrapper']}>
                    <img className={styles.image} src={profileImg} alt='Jax Engel is a feminine-looking person with short length brown hair and brown eyes. In this photo she is outside in the sunshine, wearing a maroon hooded sweater.' />
                    <span className={styles.bubble} role='img' aria-hidden="true">👋</span>
                </div>                    
                <div className={styles.text}>
                    <h1 className='heading-large'>Hello, I'm Jax!</h1>
                    <p className='body-large' aria-hidden="true">
                        I design product experiences that are{' '}
                        <span className={styles.underline}>accessible</span>, scalable, and built on{' '}
                        <span className={styles.underline}>systems-level thinking</span>.
                    </p>
                    <p className="sr-only">I design product experiences that are accessible, scalable, and built on systems-level thinking.</p>
                </div>
            </div>
        </section>
        <section>
            <div className={styles['work-intro-wrapper']}>
                <DotsRow />
                <h2 className={styles.heading}>
                    Here are a few product challenges I've helped solve
                </h2>
            </div>
            <div>
                <div className={styles['work-grid']}>
                    {caseStudies.map((props, i) => (
                        <CaseStudyCard key={i} {...props} count={i + 1} total={caseStudies.length} />
                        ))
                    }
                </div>
            </div>
        </section>
    </Layout>
);

export default Work;