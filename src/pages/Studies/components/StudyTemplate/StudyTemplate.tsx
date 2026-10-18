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
  Boolean(section && (section.compare || section.image?.some((img) => img.src)));

// legacy={false}: the page no longer takes the global legacy link and dark-mode rules (D-036, D-046).
const StudyTemplate: React.FC<StudyTemplateProps> = ({ meta, content, renderSection }) => {
  const sections = [...content.sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
    legacy={false}
  >
    <HeaderSection
      className={content.header.image?.[0] ? undefined : styles.headerNoImage}
      title={content.header.title}
      roleDetails={content.header.roleDetails}
      chips={content.header.chips}
      description={content.header.description}
      image={content.header.image}
      palette={studyPalette(meta.linkUrl)}
    />
    {sections.map((section, idx) =>
      renderSection ? renderSection(section, idx) : <StudySection key={idx} section={section} />
    )}
    <NextStudy meta={meta} afterMedia={endsWithMedia(sections[sections.length - 1])} />
  </Layout>
  );
};

export default StudyTemplate;
