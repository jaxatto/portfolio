import React from 'react';
import clsx from 'clsx';
import type { CSSProperties } from 'react';
import DateRange from '#components/DateRange';
import TextLink from '#components/TextLink';
import logos from '../../resources/logos';
import type { ResumeRole } from '../../resources/roles';
import typography from '#styles/type.module.css';
import styles from './Role.module.css';

// One job on the resume (D-124): a card with a colored band on top and a white body. The band is one line:
// logo, company, title, dates, place. The body holds the summary and the case study link. The band colors
// run along one ramp down the list: purple, violet, indigo, teal, green. Each band fades from its own point
// on that path to the next role's point.

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

// "Remote (contract)", and "Plano, TX (hybrid, contract)" where the place already has a note.
const placeLine = (role: ResumeRole): string => {
  if (!role.type) return role.location;
  const type = role.type.toLowerCase();
  return role.location.includes('(')
    ? role.location.replace(')', `, ${type})`)
    : `${role.location} (${type})`;
};

const Role: React.FC<{ role: ResumeRole; index: number; total: number }> = ({ role, index, total }) => {
  const Logo = logos[role.logo];
  return (
    <li className={styles.role} style={toneFor(index, total)}>
      <div className={styles.head}>
        <div className={styles.logo} aria-hidden="true">
          {Logo && <Logo />}
        </div>
        <p className={clsx(typography.headingSm, styles.company)}>{role.company}</p>
        <h3 className={clsx(typography.bodyMd, styles.title)}>{role.title}</h3>
        <p className={clsx(typography.bodySm, styles.meta)}>
          <DateRange startDate={role.startDate} endDate={role.endDate} className={styles.date} />
        </p>
        <p className={clsx(typography.bodySm, styles.meta)}>{placeLine(role)}</p>
      </div>
      <div className={styles.main}>
        {role.promotion && (
          <p className={clsx(typography.bodySm, styles.promotion)}>{role.promotion}</p>
        )}
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
