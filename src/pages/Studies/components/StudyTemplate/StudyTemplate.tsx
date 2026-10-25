import React from 'react';
import Layout from '@components/Layout';
import HeaderSection from '@pages/Studies/components/HeaderSection';
import StudySection from '@pages/Studies/components/StudySection';
import { studyPalette } from '@components/StudyCardGrid';
import NextStudy from '@pages/Studies/components/NextStudy';
import type { StudyHeaderProps } from '@commonTypes/study/studyHeader';
import type { StudySectionProps } from '@commonTypes/study/studySection';
import type { StudyMetaProps } from '@commonTypes/study/studyMeta';
import styles from './StudyTemplate.module.css';

export type StudyTemplateProps = {
  meta: StudyMetaProps;
  content: {
    header: StudyHeaderProps;
    sections: StudySectionProps[];
  };
  renderSection?: (section: StudySectionProps, idx: number) => React.ReactNode;
};

const endsWithMedia = (section?: StudySectionProps) =>
  Boolean(section && (section.panels || section.compare || section.image?.some((img) => img.src)));

const StudyTemplate: React.FC<StudyTemplateProps> = ({ meta, content, renderSection }) => {
  const palette = studyPalette(meta.linkUrl);
  const sections = [...content.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={`${styles.page} ${styles[`pal-${palette}`]}`}
    backToTop
  >
    <HeaderSection
      className={content.header.image?.[0] || content.header.compare || content.header.panels ? undefined : styles.headerNoImage}
      title={content.header.title}
      subtitle={content.header.subtitle}
      roleDetails={content.header.roleDetails}
      chips={content.header.chips}
      description={content.header.description}
      image={content.header.image}
      compare={content.header.compare}
      panels={content.header.panels}
    />
    {sections.map((section, idx) =>
      renderSection ? renderSection(section, idx) : <StudySection key={idx} section={section} />
    )}
    <NextStudy meta={meta} afterMedia={endsWithMedia(sections[sections.length - 1])} />
  </Layout>
  );
};

export default StudyTemplate;
