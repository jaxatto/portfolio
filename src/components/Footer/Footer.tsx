import React from 'react';
import clsx from 'clsx';
import TextLink from '#components/TextLink';
import IconLink from '#components/IconLink';
import { isJobSeeking } from '#constants/siteConfig';
import { contactInfo } from '#constants/contactInfo';
import typography from '#styles/type.module.css';
import styles from './Footer.module.css';

// Page footer: the call to action and links, the same on every page (D-049). In dark mode it sits on
// a tinted band; Home passes `band={false}` to keep the plain page ground.
// Copy is inline on purpose (D-003).

type FooterProps = {
  band?: boolean;
};

const Footer: React.FC<FooterProps> = ({ band = true }) => {
  return (
    <footer
      className={clsx(styles.footer, band && styles.band)}
      data-tone={band ? 'blue' : undefined}
    >
      <div className={styles.inner}>
        <div className={styles.main}>
          <div className={styles.top}>
            <h2 className={clsx(typography.titleSm, styles.title)}>Let’s work together</h2>
            <p className={clsx(typography.bodyLg, styles.description)}>
              Open to remote <span className={styles.nowrap}>Staff Product Designer</span>{' '}
              <span className={styles.nowrap}>and Design Engineer</span> roles.
            </p>
          </div>
          {isJobSeeking ? (
            <TextLink
              href={contactInfo.email.src}
              icon="arrow-top-right"
              size="lg"
              className={styles.email}
            >
              <span className="sr-only">Email me at </span>
              {contactInfo.email.label}
              <span className="sr-only"> (opens email client)</span>
            </TextLink>
          ) : (
            <TextLink
              href={contactInfo.linkedin.src}
              newTab
              icon="arrow-top-right"
              size="lg"
              className={styles.email}
            >
              <span className="sr-only">Find me on </span>LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </TextLink>
          )}
        </div>
        <ul className={styles.row}>
          <li>
            <IconLink
              href={contactInfo.resume.src}
              icon="file-arrow-down"
              label="Resume"
              detail="PDF"
            />
          </li>
          {isJobSeeking && (
            <li>
              <IconLink href={contactInfo.linkedin.src} icon="linkedin" label="LinkedIn" />
            </li>
          )}
          <li>
            <IconLink href={contactInfo.github.src} icon="github" label="GitHub" />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
