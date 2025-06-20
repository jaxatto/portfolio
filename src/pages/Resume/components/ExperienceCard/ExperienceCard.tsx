import React from 'react';
import styles from './ExperienceCard.module.scss';

export type ExperienceCardProps = {
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

const ExperienceCard: React.FC<ExperienceCardProps> = ({
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
  <div
    className={[
      styles.wrapper,
      theme ? `${theme}-experience-card` : '',
      className
    ].filter(Boolean).join(' ')}
  >
    <div className={styles.logo}>{logo}</div>
    <div className={styles.details}>
      <div className={styles.top}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles['sub-details']}>
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
          </span>
          <span className={styles.location}>{location}</span>
        </div>
      </div>
      {callout && <p className={styles.callout}>{callout}</p>}
    </div>
  </div>
);

export default ExperienceCard;