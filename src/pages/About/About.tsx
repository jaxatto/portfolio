import React from 'react';
import Layout from '@components/Layout';
import DotsRow from '@components/DotsRow';
import styles from './About.module.scss';

import primaryImage from '@assets/about/primary-image-min.png';
import secondaryImage from '@assets/about/secondary-image-min.png';
import tertiaryImage from '@assets/about/tertiary-image-min.png';

const lifeStyleImages = [
  {
    src: primaryImage,
    alt: 'A cat named Midna rests on a person\'s arm at a computer desk, nestled beside a keyboard, coffee mug, and monitor. Midna the most chaotic rescue tortoiseshell cat. She secretly does all of my code, too.',
  },
  {
    src: secondaryImage,
    alt: 'A black dog named Kirby lies on a couch with its head resting on a brightly colored video game controller. Kirby is a very lazy rescue dog.',
  },
  {
    src: tertiaryImage,
    alt: 'A gray cat named Beauregard sits upright on a bed, wearing a pink bow collar with a fish-shaped name tag. The bow has little black skulls on it, because Beau is a little punk rock. Beau is also a rescue.',
  },
];

const About: React.FC = () => (
  <Layout>
    <div className={styles['about-wrapper']}>
      <section>
        <div className={styles['top-section']}>
          <h1 className="heading-large"><span aria-hidden="true">🦄</span> About me</h1>
          <ul>
            <li><span aria-hidden="true">📆</span> 10+ years product design</li>
            <li><span aria-hidden="true">🏗</span> Design systems leadership</li>
            <li><span aria-hidden="true">♿</span> Accessibility advocacy</li>
            <li><span aria-hidden="true">🤝</span> Cross-functional collaboration</li>
          </ul>
        </div>
        <DotsRow variant='lines' divider className={styles.divider} />
        <p>I design accessible, scalable experiences that make complex tools feel straightforward. My work spans fintech, internal tools, and enterprise platforms, with a focus on making complex workflows easier to navigate. I'm currently at ServiceNow, where I help internal teams design and build tools that are practical, intuitive, and easy to maintain.</p>
      </section>
      <section className={styles['how-section']}>
        <h2><span aria-hidden="true">🧠</span> How I work</h2>
        <p>I lead projects from beginning to end, from shaping the problem to shipping the solution. By staying close to the details, I ensure accessibility and consistency at every step.</p>
        <p>I'm at my best in collaborative, technical environments, partnering closely with engineers to sweat the details but also keep projects moving quickly. My code background and experience with AI tools help teams stay unblocked, while mentoring designers and contributing to system-level patterns helps us scale good decisions.</p>
      </section>
      <section>
        <h2><span aria-hidden="true">✨</span> A little more</h2>
        <p>I live in Fort Worth, Texas with my partner and our four pets (our cat Midna insists she is the project manager). I love narrative-heavy games, deep dives into Zelda timelines, and finding ways to improve workflows that make other people's jobs easier.</p>
      </section>
      <section>
        <ul className={styles['image-row']}>
          <span className="sr-only">
            Meet my pets! Midna, Kirby, Beauregard, and Zelda. Because I work remote, they're always around and up to no good (but are very cute).
          </span>
          {lifeStyleImages.map((img, i) => (
            <li key={i}>
              <img src={img.src} alt={img.alt} />
            </li>
          ))}
          <span className="sr-only">
            Zelda, the black cat, is not pictured because she was sleeping somewhere.
          </span>
        </ul>
      </section>
    </div>
  </Layout>
);

export default About;