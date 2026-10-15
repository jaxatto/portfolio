import React from "react";
import Layout from "@components/Layout";
import Image from "@components/Image";
import { images } from "./resources/images";
import { content } from "./resources/content";
import { meta } from "./resources/meta";
import styles from "./About.module.css";

// About page on tokens and the 960px column (D-040). Two columns from tablet up: the title and
// facts on the left, the story on the right at a readable measure.

// "Label: sentence" paragraphs get the label as its own line. Copy is unchanged, only split here.
const LabelledParagraph: React.FC<{ text: string }> = ({ text }) => {
  const split = text.indexOf(": ");
  if (split === -1) return <p>{text}</p>;
  return (
    <p>
      <strong className={styles.label}>{text.slice(0, split)}</strong>
      {text.slice(split + 2)}
    </p>
  );
};

const About: React.FC = () => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    legacy={false}
    className={styles.page}
  >
    <div className={styles.intro}>
      <h1 className={styles.title}>{content.header.heading}</h1>
      <ul className={styles.facts}>
        {content.header.bullets.map((bullet, i) => (
          <li key={i}>{bullet.text}</li>
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
          <span className="sr-only">{content.images.srOnly.outro}</span>
        </ul>
      </section>
    </div>
  </Layout>
);

export default About;
