import React from "react";
import Link from "@components/Link";
import { useSiteConfig } from "@providers/SiteConfig";
import { content } from "./resources/content";
import styles from "./Footer.module.css";

// Page level footer: "Let's work together" call to action with contact links.
// While job seeking, email is the primary link; otherwise LinkedIn is.

const Footer: React.FC = () => {
  const { isJobSeeking } = useSiteConfig();

  return (
    <footer className={styles.footer}>
      <div className={styles.stage}>
        <div className={styles.decorations} aria-hidden="true">
          <span className={styles.blob} />
          <span className={styles.dot} />
          <span className={styles.glow} />
          <span className={styles.arc} />
        </div>

        <div className={styles.card}>
          <div className={styles.top}>
            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.description}>{content.description}</p>
          </div>

          <div className={styles.links}>
            {isJobSeeking ? (
              <Link
                href={content.email.src}
                iconName="arrow-top-right"
                className={styles["primary-link"]}
              >
                <span className="sr-only">{content.email.preText}</span>
                {content.email.label}
                <span className="sr-only">{content.email.srOnly}</span>
              </Link>
            ) : (
              <Link
                href={content.linkedin.src}
                newTab
                iconName="arrow-top-right"
                className={styles["primary-link"]}
              >
                {content.linkedin.preText} {content.linkedin.label}
                <span className="sr-only">{content.linkedin.srOnly}</span>
              </Link>
            )}

            <div className={styles.row}>
              {[content.resume, content.linkedin, content.github].map((item) => (
                <Link key={item.label} href={item.src} newTab className={styles["row-link"]}>
                  {item.label}
                  <span className="sr-only">{item.srOnly}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
