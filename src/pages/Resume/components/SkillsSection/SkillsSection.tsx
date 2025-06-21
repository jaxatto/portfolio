import React from 'react';
import Divider from '@components/Divider';
import SkillCard from '@pages/Resume/components/SkillCard';
import { focus, skills, tools } from './resources/content';
import styles from './SkillsSection.module.scss';

const skillData = [focus, skills, tools];

const SkillsSection: React.FC = () => (
  <section className={styles.wrapper}>
    <Divider variant='section-header' text='Skills' />

    {skillData.map((item) => (
      <SkillCard
        key={item.heading}
        heading={item.heading}
        description={item.description}
        chips={item.list}
        theme={item.theme}
      />
    ))}
  </section>
);

export default SkillsSection;