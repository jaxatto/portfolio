import React from 'react';
import DateRange from '#components/DateRange';
import TextLink from '#components/TextLink';
import logos from '../../resources/logos';
import type { ResumeRole } from '../../resources/roles';
import styles from './Role.module.css';

// One job on the resume: logo, title (h3), a soft line for company, place and dates, then bullets.
// The date drops to its own line on phones, like the study header (D-085).

const Role: React.FC<{ role: ResumeRole }> = ({ role }) => {
  const Logo = logos[role.logo];
  return (
    <li className={styles.role}>
      <div className={styles.logo} aria-hidden="true">
        {Logo && <Logo />}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{role.title}</h3>
        <p className={styles.details}>
          <span className={styles.where}>
            <span>{role.company}</span>
            {role.type && (
              <>
                <span className={styles.dot} aria-hidden="true" />
                <span>{role.type}</span>
              </>
            )}
            <span className={styles.dot} aria-hidden="true" />
            <span>{role.location}</span>
          </span>
          <span className={`${styles.dot} ${styles.dateDot}`} aria-hidden="true" />
          <DateRange startDate={role.startDate} endDate={role.endDate} className={styles.date} />
        </p>
        {role.promotion && <p className={styles.details}>{role.promotion}</p>}
        <ul className={styles.bullets}>
          {role.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {role.studyHref && (
          <TextLink to={role.studyHref} icon="arrow-right" className={styles.study}>
            Read the {role.studyName} case study
          </TextLink>
        )}
      </div>
    </li>
  );
};

export default Role;
