import React from 'react';
import Layout from '#components/Layout';
import Button from '#components/Button';
import Image from '#components/Image';
import { CursorTag } from '#components/HeroMarks';
import portrait from '#assets/resume/portrait-min.jpg?size';
import RoleLines from '#components/RoleLines';
import { contactInfo } from '#constants/contactInfo';
import { roleLines } from '#constants/roleLines';
import Role from '#pages/Resume/components/Role';
import Strength from '#pages/Resume/components/Strength';
import { roles } from '#pages/Resume/resources/roles';
import { studyLinks } from '#constants/studyLinks';
import { meta } from '#pages/Resume/resources/meta';
import styles from './Resume.module.css';

// Resume page on tokens and the 960 column (slice 6, D-087). The page carries the resume's content so it
// can be read and searched in the browser, with the PDF as the download. Short copy is inline (D-003);
// the role list lives in resources/ because it is data.

// Case study cards with their proof. Each proof line uses a fact already on the study page it links to (D-124).
const strengths = [
  {
    title: 'Design tokens at enterprise scale',
    proof: 'Led token architecture and Figma-to-code automation for Toyota\u2019s PRIME design system. 40 product teams are set to adopt it across 10 web apps.',
    to: studyLinks.toyota,
    linkText: 'Toyota case study',
    palette: 'brand',
  },
  {
    title: 'Accessible, localized components',
    proof: '20 components for Indeed\u2019s design system, documented with WCAG and right-to-left guidance.',
    to: studyLinks.indeed,
    linkText: 'Indeed case study',
    palette: 'tertiary',
  },
  {
    title: 'Self-serve workflows',
    proof: 'ActBlue admins set up and fix their Salesforce sync themselves, cutting support costs an estimated $1.5M a year.',
    to: studyLinks.actblue,
    linkText: 'ActBlue case study',
    palette: 'quaternary',
  },
] as const;

const Resume: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
    backToTop
    headerLabel={roleLines}
  >
    <header className={styles.header}>
      <div className={styles.intro}>
      <div className={styles.identity}>
        {/* The visible heading is the name. "Resume:" is read by assistive tech only, so the h1 names the page. */}
        <h1 className={styles.title}>
          <span className="sr-only">Resume: </span>
          Jax Engel
        </h1>
        {/* Phones only: the nav's left slot is hidden there (like Home), so the role shows under the name. */}
        <p className={styles.byline}>
          <RoleLines lines={roleLines} />
        </p>
      </div>
      <p className={styles.summary}>
        11 years of experience in scalable design systems, enterprise tools and AI-assisted
        workflows. I work across product design and front-end engineering to reduce UX friction,
        unify multi-team ecosystems and build in accessibility at scale.
      </p>
      <div className={styles.actions}>
        <Button href={contactInfo.resume.src} newTab icon="download" iconPosition="start" className={styles.action}>
          Download resume (PDF)
        </Button>
        <Button variant="outline" href={contactInfo.email.src} icon="envelope-simple" iconPosition="start" className={styles.action}>
          Contact
        </Button>
      </div>
      </div>
      {/* Stacks above the name below 900px, beside the intro from 900px (D-135). */}
      <figure className={styles.portrait}>
        <Image
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          iconFallback="user"
          alt="Jax smiling at the camera outdoors, in a maroon hoodie with a white checkerboard print."
          className={styles.portraitFrame}
          imgClassName={styles.portraitImage}
        />
        <CursorTag name="Jax" className={styles.tag} />
      </figure>
    </header>

    <section className={styles.section} aria-labelledby="experience">
      <h2 id="experience" className={styles.heading}>Experience</h2>
      <ul className={styles.roles}>
        {roles.map((role, index) => (
          <Role key={`${role.company}-${role.startDate}`} role={role} index={index} total={roles.length} />
        ))}
      </ul>
    </section>

    <section className={styles.section} aria-labelledby="education">
      <h2 id="education" className={styles.heading}>Education</h2>
      <p className={styles.education}>
        The Art Institute of Austin, Bachelor of Fine Arts, Web Design and Interactive Media
      </p>
    </section>

    <section className={styles.section} aria-labelledby="case-studies">
      <h2 id="case-studies" className={styles.heading}>Case studies</h2>
      <ul className={styles.strengths}>
        {strengths.map((strength) => (
          <Strength key={strength.title} {...strength} />
        ))}
      </ul>
    </section>
  </Layout>
);

export default Resume;
