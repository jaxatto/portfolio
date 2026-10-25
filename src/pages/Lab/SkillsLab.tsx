import React, { useEffect } from 'react';
import Layout from '#components/Layout';
import { Chip, ChipList } from '#components/Chip';
import TextLink from '#components/TextLink';
import { studyLinks } from '#constants/studyLinks';
import palettes from '#styles/palette.module.css';
import styles from './SkillsLab.module.css';

// Throwaway page to compare ways to show skills on Resume. Not linked, not prerendered, noindex.
// Skills come from the resume PDF. Delete this folder and its route once one option is chosen.

const groups = [
  {
    label: 'Design systems and engineering',
    items: [
      'Design tokens',
      'Token taxonomy',
      'Token automation',
      'Figma variables',
      'Component libraries',
      'Storybook',
      'React',
      'HTML',
      'CSS',
    ],
    to: studyLinks.toyota,
    linkText: 'Toyota case study',
  },
  {
    label: 'Product and UX',
    items: [
      'Accessibility (WCAG)',
      'Inclusive design',
      'Product discovery',
      'Usability testing',
      'User research',
    ],
    to: studyLinks.indeed,
    linkText: 'Indeed case study',
  },
  {
    label: 'Operations and leadership',
    items: [
      'Cross-functional governance',
      'Technical documentation',
      'Mentorship',
      'Team alignment',
    ],
  },
  {
    label: 'Tools',
    items: [
      'Figma',
      'Zeroheight',
      'GitHub',
      'Jira',
      'Confluence',
      'Notion',
      'Miro',
      'Claude Code',
      'Kiro',
    ],
  },
] as const;

const cards = [
  {
    title: 'Design tokens at enterprise scale',
    proof: 'Led token architecture and Figma-to-code automation for Toyota’s PRIME design system.',
    skills: ['Token taxonomy', 'Token automation', 'Figma variables'],
    palette: 'brand',
  },
  {
    title: 'Accessible, localized components',
    proof: '20 components for Indeed’s design system, documented with WCAG guidance.',
    skills: ['WCAG', 'Storybook', 'Technical documentation'],
    palette: 'tertiary',
  },
  {
    title: 'Self-serve enterprise workflows',
    proof: 'ActBlue admins set up and fix their Salesforce sync themselves.',
    skills: ['Product discovery', 'Usability testing', 'User research'],
    palette: 'quaternary',
  },
] as const;

const flat = groups.flatMap((group) => group.items).join(', ');

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
          Four ways to show skills on the Resume page. Pick one, or mix parts of them.
        </p>
      </header>

      <Option
        id="a"
        name="A. Grouped rows with proof"
        note="Quiet text lists under a label. Rows with a matching case study link to it."
      >
        <dl className={styles.rows}>
          {groups.map((group) => (
            <div key={group.label} className={styles.row}>
              <dt className={styles.label}>{group.label}</dt>
              <dd className={styles.items}>
                {group.items.join(' · ')}
                {'to' in group && (
                  <TextLink to={group.to} icon="arrow-right" className={styles.rowLink}>
                    {group.linkText}
                  </TextLink>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Option>

      <Option
        id="b"
        name="B. Grouped chips"
        note="The same groups with the code-style chips from About. Louder, easier to scan."
      >
        <div className={styles.rows}>
          {groups.map((group, index) => (
            <div key={group.label} className={styles.row}>
              <h4 className={styles.label}>{group.label}</h4>
              <ChipList>
                {group.items.map((item) => (
                  <Chip
                    key={item}
                    palette={(['primary', 'secondary', 'tertiary', 'quaternary'] as const)[index]}
                  >
                    {item}
                  </Chip>
                ))}
              </ChipList>
            </div>
          ))}
        </div>
      </Option>

      <Option
        id="c"
        name="C. Skills inside the case study cards"
        note="Each card gets a skills line next to its proof. The full list does not appear."
      >
        <ul className={styles.cards}>
          {cards.map((card) => (
            <li key={card.title} className={`${styles.card} ${palettes[card.palette]}`}>
              <h4 className={styles.cardTitle}>{card.title}</h4>
              <p className={styles.proof}>{card.proof}</p>
              <p className={styles.cardSkills}>{card.skills.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </Option>

      <Option
        id="d"
        name="D. One compact paragraph"
        note="Fastest to build and read. It reads as a keyword list."
      >
        <p className={styles.flat}>{flat}</p>
      </Option>
    </Layout>
  );
};

export default SkillsLab;
