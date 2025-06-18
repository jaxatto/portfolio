import React from 'react';
import styles from './Role.module.scss';

export type RoleProps = {
  title: string;
  company: string;
  logo: React.ReactNode;
  startDate: string;
  endDate?: string;
  location?: string;
  callout?: string;
  theme?: string;
  className?: string;
};

const Role: React.FC<RoleProps> = ({
  title,
  company,
  logo,
  startDate,
  endDate,
  location,
  callout,
  theme,
  className,
}) => (
  <div className={[styles.role, theme, className].filter(Boolean).join(' ')}>
    <div className={styles.logo}>{logo}</div>
    <div className={styles.details}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.company}>{company}</span>
      <span className={styles.date}>
        {startDate}
        {endDate && (
          <>
            <span aria-hidden="true"> — </span>
            <span className="sr-only"> to </span>
            {endDate}
          </>
        )}
        {location && <> · {location}</>}
      </span>
      {callout && <p className={styles.callout}>{callout}</p>}
    </div>
  </div>
);

export default Role;