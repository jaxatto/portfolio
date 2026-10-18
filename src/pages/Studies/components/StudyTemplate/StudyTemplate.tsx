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

// legacy={false}: the page no longer takes the global legacy link and dark-mode rules (D-036, D-046).
const StudyTemplate: React.FC<StudyTemplateProps> = ({ meta, content, renderSection }) => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.page}
    legacy={false}
  >
    <HeaderSection
      title={content.header.title}
      roleDetails={content.header.roleDetails}
      chips={content.header.chips}
      description={content.header.description}
      image={content.header.image}
      palette={studyPalette(meta.linkUrl)}
    />
    <div className={styles.body}>
      {[...content.sections]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((section, idx) =>
          renderSection ? renderSection(section, idx) : <StudySection key={idx} section={section} />
        )}
    </div>
    <NextStudy meta={meta} />
  </Layout>
);

export default StudyTemplate;
