import React from 'react';
import clsx from 'clsx';
import Layout from '#components/Layout';
import Image from '#components/Image';
import { DesignSelection, Caret, CursorTag } from '#components/HeroMarks';
import TextLink from '#components/TextLink';
import { Chip, ChipList, chipPalettes } from '#components/Chip';
import { studyLinks } from '#constants/studyLinks';
import { images } from './resources/images';
import { meta } from './resources/meta';
import typography from '#styles/type.module.css';
import styles from './About.module.css';

// About page on tokens and the 960px column (D-040, D-041). One column: a hero with the Home
// header's Figma and code marks, the facts as chips, then the story at a readable measure.

// "Label: sentence" paragraphs get the label as an h3 above the sentence. Copy is unchanged, only split here.
const LabelledParagraph: React.FC<{ text: string }> = ({ text }) => {
  const split = text.indexOf(': ');
  if (split === -1) return <p>{text}</p>;
  return (
    <div className={styles.item}>
      <h3 className={clsx(typography.headingSm, styles.subheading)}>{text.slice(0, split)}</h3>
      <p>{text.slice(split + 2)}</p>
    </div>
  );
};

const facts = [
  '11+ years product design',
  'Accessibility advocacy',
  'Design systems leadership',
  'Design-to-code automation',
];

const intro = [
  'I design products and the systems behind them, and I write the code that carries both into production. I architect token systems for multi-brand products and build Figma-to-code pipelines. My background spans interface design, complex workflow automation and WCAG accessibility across fintech, automotive and SaaS.',
  'I recently joined Spectrum, where I work on the ecommerce design system. My most recent role was at Toyota, where I led design token architecture, token-to-code pipelines and developer tooling across a multi-brand product ecosystem.',
];

const approach = [
  'Curiosity and documentation: I start with questions and careful listening. What I learn goes into clear documentation, so the next person can pick it up without starting over. At Indeed I answered daily system questions and contributed to onboarding sessions.',
  'Focus and trade-offs: When I commit to a task, I aim to get it right the first time. I set honest expectations up front, rank the goals and agree with the team on how to weigh speed against quality. At Toyota I ran sprint planning for five designers.',
  'Accessibility and teaching: Accessibility is the part of the craft I most enjoy sharing. I coach teammates on WCAG, code and Figma, and I build the guidance into the components and documentation they already use. At Indeed I documented 20 components with WCAG and right-to-left guidance. At ActBlue I led accessibility work that other teams adopted.',
  'Prototyping with AI: AI is my newest way to prototype. Working in code lets me take an idea to a running prototype and hand engineers something they can build from. At Toyota I built a CLI that keeps Figma variables in line with code, and used Python and AI to create 200+ stories in bulk.',
];

const personal = [
  "I live in Fort Worth, Texas with my partner and our four rowdy pets: Kirby, Midna, Zelda, and Beau. When I'm not in Figma or VS Code, you can find me playing narrative-heavy video games, analyzing complex Zelda lore timelines, or watching 2-hour video essays on obscure topics.",
];

const petsIntro =
  "Meet my pets! Kirby, Beauregard, Midna, and Zelda. Because I work remote, they're always around and up to no good (but are very cute).";

const About: React.FC = () => (
  <Layout title={meta.title} metaDescription={meta.description} className={styles.page} backToTop>
    <div className={styles.hero}>
      <h1 className={clsx(typography.titleMd, styles.title)}>
        About <DesignSelection corner="top-right">me</DesignSelection>
      </h1>
      <ChipList>
        {facts.map((fact, i) => (
          <Chip key={fact} palette={chipPalettes[i % chipPalettes.length]} className={styles.chip}>
            {fact}
            {i === facts.length - 1 && <Caret />}
          </Chip>
        ))}
      </ChipList>
    </div>
    <div className={clsx(typography.bodyMd, styles.story)}>
      <section>
        {intro.map((desc) => (
          <p key={desc}>{desc}</p>
        ))}
        {/* Earlier roles link to their case studies. Copy is inline because it contains links (D-003). */}
        <p>
          Earlier work includes AI-assisted survey analysis at{' '}
          <TextLink inline to={studyLinks.servicenow}>
            ServiceNow<span className="sr-only"> case study</span>
          </TextLink>
          , an accessible, rebranded design system at{' '}
          <TextLink inline to={studyLinks.indeed}>
            Indeed<span className="sr-only"> case study</span>
          </TextLink>
          , and a self-serve Salesforce integration at{' '}
          <TextLink inline to={studyLinks.actblue}>
            ActBlue<span className="sr-only"> case study</span>
          </TextLink>
          .
        </p>
      </section>
      <section>
        <h2 className={clsx(typography.headingLg, styles.heading)}>Approach to work</h2>
        {approach.map((desc) => (
          <LabelledParagraph key={desc} text={desc} />
        ))}
      </section>
      <section>
        <h2 className={clsx(typography.headingLg, styles.heading)}>Personal life</h2>
        {personal.map((desc) => (
          <p key={desc}>{desc}</p>
        ))}
      </section>
    </div>
    <section>
      <p className="sr-only">{petsIntro}</p>
      <ul className={styles.photos}>
        {images.map((img) => (
          <li key={img.name} className={styles.photo}>
            <figure className={`${styles.figure} ${styles[img.palette]}`}>
              <div className={styles.frame}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  iconFallback={img.iconFallback}
                  altFallback={img.altFallback}
                  className={styles.photoFrame}
                  imgClassName={styles.photoImage}
                  fallbackClassName={styles.photoFallback}
                />
                <CursorTag name={img.name} className={styles.tag} />
              </div>
              <figcaption className={clsx(typography.bodySm, styles.caption)}>
                {img.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default About;
