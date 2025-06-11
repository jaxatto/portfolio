import React from 'react';
import Layout from '../components/Layout';
import DotsRow from '../components/DotsRow';
import styles from './Work.module.scss';
import profileImg from '../assets/jax-engel.png';
import CaseStudyCard from '../components/CaseStudyCard';
import type { CaseStudyCardProps } from '../components/CaseStudyCard';

// Example images (replace with your actual images)
import servicenowImage from '../assets/samples/servicenow-sample.png';
import indeedImage from '../assets/samples/indeed-sample.png';
import actblueImage from '../assets/samples/actblue-sample.png';

const caseStudies: CaseStudyCardProps[] = [
  {
    title: "Designing an AI-driven tool to accelerate qualitative survey workflows",
    description: "Product design · AI · Enterprise",
    image: servicenowImage,
    imageAlt: "AI survey workflow screenshot",
    linkUrl: "/case-study/servicenow",
    linkText: "Read case study",
    className: styles.aiCard,
    layout: "horizontal",
  },
  {
    title: "Scaling clarity and consistency across Indeed's hiring platform",
    description: "Design systems · Enterprise",
    image: indeedImage,
    imageAlt: "Indeed hiring platform screenshot",
    linkUrl: "/case-study/indeed",
    linkText: "Read case study",
    className: styles.indeedCard,
    layout: "vertical",
  },
  {
    title: "Improving sync visibility for teams managing critical donation data",
    description: "Product design · Nonprofit",
    image: actblueImage,
    imageAlt: "ActBlue Salesforce integration screenshot",
    linkUrl: "/case-study/actblue",
    linkText: "Read case study",
    className: styles.actblueCard,
    layout: "vertical",
  },
];

const Work: React.FC = () => (
    <Layout>
        <div className={styles['banner-wrapper']}>
            <div className={styles.banner}>
                <div className={styles['image-wrapper']}>
                    <img className={styles.image} src={profileImg} alt='Jax Engel' />
                    <span className={styles.bubble} role='img' aria-label='Waving hand'>👋</span>
                </div>                    
                <div className={styles.text}>
                    <h1 className='heading-large'>Hello, I'm Jax!</h1>
                    <p className='body-large'>
                        I design product experiences that are{' '}
                        <span className={styles.underline}>accessible</span>, scalable, and built on{' '}
                        <span className={styles.underline}>systems-level thinking</span>.
                    </p>
                </div>
            </div>
        </div>
        <div className={styles['work-intro-wrapper']}>
            <DotsRow count={6} />
            <h2 className={styles.heading}>
                Here are a few product challenges I've helped solve
            </h2>
        </div>
        <main>
            <div className={styles['work-grid']}>
                {caseStudies.map((props, i) => (
                  <CaseStudyCard key={i} {...props} />
                ))}
            </div>
        </main>
    </Layout>
);

export default Work;