import React from "react";
import Link from "@components/Link";
import styles from "./Header.module.scss";
import { useSiteConfig } from "@providers/SiteConfig";
import { content } from "./resources/content";

const Header: React.FC = () => {
  const { isJobSeeking } = useSiteConfig();

  return (
    <section className={styles.wrapper}>
      <h1 className="sr-only">{content.h1}</h1>

      <h2 className={styles["page-title-lg"]}>{content.heading}</h2>
      <p className={styles.description}>
        <span className={styles.description1}>{content.description1}</span>
        <span className={styles.description2}>{content.description2}</span>
      </p>

      {isJobSeeking ? (
        <>
          <p className={styles.byline}>{content.byline}</p>
          <Link
            href={content.buttonHref}
            className={styles.button}
            iconName="arrow-right"
            styleAs="button"
            newTab={true}
          >
            {content.buttonLabel}
          </Link>
        </>
      ) : null}
    </section>
  );
};

export default Header;
