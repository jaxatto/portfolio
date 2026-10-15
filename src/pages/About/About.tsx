import React from "react";
import Layout from "@components/Layout";
import Image from "@components/Image";
import { DesignSelection, Caret } from "#components/HeroMarks";
import { images } from "./resources/images";
import { content } from "./resources/content";
import { meta } from "./resources/meta";
import styles from "./About.module.css";

// About page on tokens and the 960px column (D-040, D-041). One column: a hero with the Home
// header's Figma and code marks, the facts as chips, then the story at a readable measure.

// One palette per chip, the same four container pairs as the Home cards.
const chipPalettes = ["primary", "secondary", "tertiary", "quaternary"] as const;

// "Label: sentence" paragraphs get the label as an h3 above the sentence. Copy is unchanged, only split here.
const LabelledParagraph: React.FC<{ text: string }> = ({ text }) => {
  const split = text.indexOf(": ");
  if (split === -1) return <p>{text}</p>;
  return (
    <div className={styles.item}>
      <h3>{text.slice(0, split)}</h3>
      <p>{text.slice(split + 2)}</p>
    </div>
  );
};

const About: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    legacy={false}
    footerVariant="quiet"
    className={styles.page}
  >
    <div className={styles.hero}>
      <h1 className={styles.title}>
        About <DesignSelection corner="top-right">me</DesignSelection>
      </h1>
      <ul className={styles.chips}>
        {content.header.bullets.map((bullet, i) => (
          <li
            key={i}
            className={`${styles.chip} ${styles[chipPalettes[i % chipPalettes.length]]}`}
          >
            {bullet.text}
            {i === content.header.bullets.length - 1 && <Caret />}
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.story}>
      <section>
        {content.header.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>
      <section>
        <h2>{content.how.heading}</h2>
        {content.how.description.map((desc, i) => (
          <LabelledParagraph key={i} text={desc} />
        ))}
      </section>
      <section>
        <h2>{content.more.heading}</h2>
        {content.more.description.map((desc, i) => (
          <p key={i}>{desc}</p>
        ))}
      </section>
      <section>
        <ul className={styles.photos}>
          <span className="sr-only">{content.images.srOnly.intro}</span>
          {images.map((img, i) => (
            <li key={i} className={styles.photo}>
              <Image
                src={img.src}
                alt={img.alt}
                iconFallback={img.iconFallback}
                altFallback={img.altFallback}
                className={styles.photoFrame}
                imgClassName={styles.photoImage}
                fallbackClassName={styles.photoFallback}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  </Layout>
);

export default About;
