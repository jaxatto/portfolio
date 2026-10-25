import React, { useEffect } from 'react';
import Layout from '#components/Layout';
import styles from './SkillsLab.module.css';

// Throwaway page to compare ways to show skills on Resume. Not linked, not prerendered, noindex.
// Every mark comes from the bullets in the resume PDF. Jax to correct anything that is wrong.
// Delete this folder and its route once one option is chosen.

type Role = { name: string; from: [number, number]; to: [number, number] };

// Oldest first. Dates are [year, month]. Spectrum runs to the chart's right edge.
const roles: Role[] = [
  { name: 'Visa', from: [2015, 11], to: [2020, 2] },
  { name: 'Indeed', from: [2020, 2], to: [2020, 10] },
  { name: 'FireHydrant', from: [2020, 11], to: [2021, 11] },
  { name: 'Routable', from: [2021, 11], to: [2022, 3] },
  { name: 'ActBlue', from: [2022, 3], to: [2023, 5] },
  { name: 'Albertsons', from: [2023, 6], to: [2023, 9] },
  { name: 'ServiceNow', from: [2024, 2], to: [2025, 10] },
  { name: 'Toyota', from: [2025, 10], to: [2026, 9] },
  { name: 'Spectrum', from: [2026, 9], to: [2026, 10] },
];

const skills: { label: string; usedAt: string[] }[] = [
  {
    label: 'Design systems',
    usedAt: [
      'Visa',
      'Indeed',
      'FireHydrant',
      'ActBlue',
      'Albertsons',
      'ServiceNow',
      'Toyota',
      'Spectrum',
    ],
  },
  { label: 'Design tokens', usedAt: ['Toyota', 'Spectrum'] },
  { label: 'Front-end code', usedAt: ['Visa', 'Toyota', 'Spectrum'] },
  { label: 'Accessibility', usedAt: ['Indeed', 'ActBlue', 'ServiceNow'] },
  { label: 'Enterprise workflows', usedAt: ['Visa', 'FireHydrant', 'Routable', 'ActBlue'] },
  { label: 'Research and testing', usedAt: ['Visa', 'Routable', 'ServiceNow'] },
  { label: 'AI-assisted tools', usedAt: ['ServiceNow'] },
];

const stats = [
  {
    skill: 'Design tokens',
    value: '40+',
    caption: 'product teams supported on the Toyota design system',
  },
  { skill: 'Design systems', value: '100+', caption: 'designers using Indeed assets I improved' },
  {
    skill: 'Component libraries',
    value: '60%',
    caption: 'less repetitive UI design after the ServiceNow library launch',
  },
  {
    skill: 'Adoption',
    value: '20+',
    caption: 'Albertsons teams on one design system, serving 5,000+ stores',
  },
  {
    skill: 'Enterprise workflows',
    value: '$1.5M',
    caption: 'estimated yearly ActBlue support savings',
  },
  {
    skill: 'Usability testing',
    value: '20%',
    caption: 'reduction in case resolution SLAs at Visa',
  },
];

const toYear = ([year, month]: [number, number]): number => year + (month - 1) / 12;
const start = toYear(roles[0].from);
const end = toYear([2026, 11]);
const span = end - start;
const pct = (value: number): string => `${((value - start) / span) * 100}%`;
const years = Array.from({ length: 6 }, (_, i) => 2016 + i * 2);

const rangeText = (role: Role): string => `${role.name} (${role.from[0]} to ${role.to[0]})`;

const Option: React.FC<{ id: string; name: string; note: string; children: React.ReactNode }> = ({
  id,
  name,
  note,
  children,
}) => (
  <section className={styles.option} aria-labelledby={id}>
    <header className={styles.optionHeader}>
      <h2 id={id} className={styles.optionTitle}>
        {name}
      </h2>
      <p className={styles.note}>{note}</p>
    </header>
    <div className={styles.stage}>
      <h3 className={styles.heading}>Skills</h3>
      {children}
    </div>
  </section>
);

const SkillsLab: React.FC = () => {
  useEffect(() => {
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, []);

  return (
    <Layout
      title="Skills lab | Jax Engel"
      metaDescription="Skills layouts to compare."
      className={styles.page}
    >
      <header className={styles.intro}>
        <h1 className={styles.title}>Skills lab</h1>
        <p className={styles.lead}>
          Three charts built from the bullets in your resume PDF. Check every mark and number before
          anything ships.
        </p>
      </header>

      <Option
        id="a"
        name="A. Skill by employer grid"
        note="Where each skill shows up in your resume. Scan a row to see how long it has been part of your work."
      >
        <div className={styles.scroll} role="region" aria-label="Skills by employer" tabIndex={0}>
          <table className={styles.grid}>
            <thead>
              <tr>
                <td />
                {roles.map((role) => (
                  <th key={role.name} scope="col" className={styles.colHead}>
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.label}>
                  <th scope="row" className={styles.rowHead}>
                    {skill.label}
                  </th>
                  {roles.map((role) => {
                    const used = skill.usedAt.includes(role.name);
                    return (
                      <td key={role.name} className={styles.cell}>
                        <span className={used ? styles.dotOn : styles.dotOff} aria-hidden="true" />
                        <span className="sr-only">{used ? 'Used' : 'Not listed'}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Option>

      <Option
        id="b"
        name="B. Skills over time"
        note="The same data on a 2015 to 2026 timeline. Bars show the roles where each skill appears."
      >
        <div className={styles.timeline}>
          <div className={styles.axis} aria-hidden="true">
            {years.map((year) => (
              <span key={year} className={styles.tick} style={{ left: pct(year) }}>
                {year}
              </span>
            ))}
          </div>
          <ul className={styles.lanes}>
            {skills.map((skill) => {
              const where = roles.filter((role) => skill.usedAt.includes(role.name));
              return (
                <li key={skill.label} className={styles.lane}>
                  <span className={styles.laneLabel}>{skill.label}</span>
                  <span className={styles.track} aria-hidden="true">
                    {where.map((role) => (
                      <span
                        key={role.name}
                        className={styles.bar}
                        style={{
                          left: pct(toYear(role.from)),
                          width: `calc(${pct(toYear(role.to) + 0.04)} - ${pct(toYear(role.from))})`,
                        }}
                      />
                    ))}
                  </span>
                  <span className="sr-only">{where.map(rangeText).join(', ')}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Option>

      <Option
        id="c"
        name="C. Skills with proof numbers"
        note="Six tiles. Each pairs a skill with one result from your resume."
      >
        <ul className={styles.tiles}>
          {stats.map((stat) => (
            <li key={stat.skill} className={styles.tile}>
              <p className={styles.tileSkill}>{stat.skill}</p>
              <p className={styles.tileValue}>{stat.value}</p>
              <p className={styles.tileCaption}>{stat.caption}</p>
            </li>
          ))}
        </ul>
      </Option>
    </Layout>
  );
};

export default SkillsLab;
