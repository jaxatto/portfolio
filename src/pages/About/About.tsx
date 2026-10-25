import React from 'react';
import Layout from '#components/Layout';
import Image from '#components/Image';
import { DesignSelection, Caret, CursorTag } from '#components/HeroMarks';
import TextLink from '#components/TextLink';
import { Chip, ChipList, chipPalettes } from '#components/Chip';
import { studyLinks } from '#constants/studyLinks';
import { images } from './resources/images';
import { content } from './resources/content';
import { meta } from './resources/meta';
import styles from './About.module.css';

// About page on tokens and the 960px column (D-040, D-041). One column: a hero with the Home
// header's Figma and code marks, the facts as chips, then the story at a readable measure.

// "Label: sentence" paragraphs get the label as an h3 above the sentence. Copy is unchanged, only split here.
const LabelledParagraph: React.FC<{ text: string }> = ({ text }) => {
  const split = text.indexOf(': ');
  if (split === -1) return <p>{text}</p>;
  return (
    <div className={styles.item}>
      <h3 className={styles.subheading}>{text.slice(0, split)}</h3>
      <p>{text.slice(split + 2)}</p>
    </div>
  );
};

const About: React.FC = () => (
  <Layout title={meta.title} metaDescription={meta.description} className={styles.page} backToTop>
    <div className={styles.hero}>
      <h1 className={styles.title}>
        About <DesignSelection corner="top-right">me</DesignSelection>
      </h1>
      <ChipList>
        {content.header.bullets.map((bullet, i) => (
          <Chip key={i} palette={chipPalettes[i % chipPalettes.length]} className={styles.chip}>
            {bullet.text}
            {i === content.header.bullets.length - 1 && <Caret />}
          </Chip>
        ))}
      </ChipList>
    </div>
    <div className={styles.story}>
      <section>
        {content.header.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
        {/* Earlier roles link to their case studies. Copy is inline because it contains links (D-003). */}
        <p>
          Earlier work includes AI-assisted survey analysis at{' '}
          <TextLink to={studyLinks.servicenow}>
            ServiceNow<span className="sr-only"> case study</span>
          </TextLink>
          , an accessible, rebranded design system at{' '}
          <TextLink to={studyLinks.indeed}>
            Indeed<span className="sr-only"> case study</span>
          </TextLink>
          , and a self-serve Salesforce integration at{' '}
          <TextLink to={studyLinks.actblue}>
            ActBlue<span className="sr-only"> case study</span>
          </TextLink>
          .
        </p>
      </section>
      <section>
        <h2 className={styles.heading}>{content.how.heading}</h2>
        {content.how.description.map((desc, i) => (
          <LabelledParagraph key={i} text={desc} />
        ))}
      </section>
      <section>
        <h2 className={styles.heading}>{content.more.heading}</h2>
        {content.more.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>
    </div>
    <section>
      <ul className={styles.photos}>
        <span className="sr-only">{content.images.srOnly.intro}</span>
        {images.map((img, i) => (
          <li key={i} className={styles.photo}>
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
              <figcaption className={styles.caption}>{img.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export default About;
