import React from 'react';
import Divider from '@components/Divider';
import SkillCard from '@pages/Resume/components/SkillCard';
import type { SkillCardProps } from '@pages/Resume/components/SkillCard';
import content from './resources/content.json';
import styles from './SkillsSection.module.scss';

const skillData = [content.focus, content.skills, content.tools];

const SkillsSection: React.FC = () => (
  <section className={styles.wrapper}>
    <Divider variant='section-header' text='Skills' contentAlign="left" />
    <div className={styles.content}>
      {skillData.map((item) => (
        <SkillCard
          key={item.heading}
          heading={item.heading}
          description={item.description}
          chips={item.list}
          theme={item.theme as SkillCardProps['theme']}
        />
      ))}
    </div>
  </section>
);

export default SkillsSection;