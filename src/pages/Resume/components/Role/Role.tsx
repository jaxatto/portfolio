import React from 'react';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import DateRange from '#components/DateRange';
import TextLink from '#components/TextLink';
import logos from '../../resources/logos';
import type { ResumeRole } from '../../resources/roles';
import typography from '#styles/type.module.css';
import styles from './Role.module.css';

// One job on the resume (D-124): a split card. The colored side holds the logo, company, dates and place.
// The white side holds the title, a short summary and the case study link. The side colors run one gradient
// down the list: purple, violet, indigo, teal, green. Each side fades from its own point on that path to
// the next role's point, so the left column reads as one continuous gradient.

const ramp = ['brand', 'primary', 'secondary', 'quaternary', 'quinary'] as const;

// A point `pos` (0 to 4) along the ramp, for the container fill (k = 0) or its text color (k = 1).
const along = (pos: number, k: 'container' | 'on-container'): string => {
  const seg = Math.min(Math.floor(pos), ramp.length - 2);
  const percent = Math.round((pos - seg) * 100);
  return `color-mix(in oklab, var(--color-${ramp[seg + 1]}-${k}) ${percent}%, var(--color-${ramp[seg]}-${k}))`;
};

const toneFor = (index: number, total: number): CSSProperties => {
  const last = Math.max(total - 1, 1);
  const span = ramp.length - 1;
  const here = (index / last) * span;
  const next = (Math.min(index + 1, last) / last) * span;
  return {
    '--role-from': along(here, 'container'),
    '--role-to': along(next, 'container'),
    '--role-fg': along(here, 'on-container'),
  } as CSSProperties;
};

// "Remote · Contract" and "Plano, TX · Hybrid · Contract". The dot trails its item and is followed by a
// break point, so a wrapped line never starts with one.
const Dot: React.FC<{ className?: string }> = ({ className }) => (
  <>
    <span className={clsx(styles.dot, className)} aria-hidden="true">
      ·
    </span>
    <wbr />
  </>
);

const placeParts = (role: ResumeRole): string[] =>
  [role.location, role.workMode, role.type].filter((part): part is string => Boolean(part));

const Role: React.FC<{ role: ResumeRole; index: number; total: number }> = ({ role, index, total }) => {
  const Logo = logos[role.logo];
  return (
    <li className={styles.role} style={toneFor(index, total)}>
      <div className={styles.side}>
        <div className={styles.logo} aria-hidden="true">
          {Logo && <Logo />}
        </div>
        <p className={clsx(typography.headingSm, styles.company)}>{role.company}</p>
        {/* Two lines on desktop. On phones one flowing line under the company, dates first. */}
        <div className={styles.details}>
          <p className={clsx(typography.bodySm, styles.meta)}>
            <DateRange startDate={role.startDate} endDate={role.endDate} className={styles.date} />
            <Dot className={styles.dateDot} />
          </p>
          <p className={clsx(typography.bodySm, styles.meta)}>
            {placeParts(role).map((part, i, parts) => (
              <React.Fragment key={part}>
                <span className={styles.part}>{part}</span>
                {i < parts.length - 1 && <Dot />}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.heading}>
          <h3 className={clsx(typography.headingSm, styles.title)}>{role.title}</h3>
          {role.promotion && <p className={clsx(typography.bodySm, styles.promotion)}>{role.promotion}</p>}
        </div>
        <p className={clsx(typography.bodyMd, styles.summary)}>{role.summary}</p>
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
