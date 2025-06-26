import React from 'react';
import Layout from '@components/Layout';
import HeaderSection from '@pages/Studies/components/HeaderSection';
import StudySection, { StudySectionProps } from '@pages/Studies/components/StudySection';
import NextStudy from '@pages/Studies/components/NextStudy';
import { ChipData } from '@components/ChipGroup';
import styles from './StudyTemplate.module.scss';

export type StudyTemplateProps = {
  meta: { // Meta information for the page
    title: string; // Page title for SEO
    description: string; // Meta description for SEO
    linkUrl: string; // URL for the study, used to exclude it from the grid
  };
  content: {
    header: {
      title: string;
      roleDetails: { role: string; startDate: string; endDate?: string }[];
      chips: ChipData[];
      description: string[];
      image: { src: string; alt: string; caption?: string }[];
    };
    sections: StudySectionProps[];
  };
  renderSection?: (section: StudySectionProps, idx: number) => React.ReactNode;
};

const StudyTemplate: React.FC<StudyTemplateProps> = ({ meta, content, renderSection }) => (
  <Layout
    title={meta.title}
    metaDescription={meta.description}
    className={styles.wrapper}
  >
    <HeaderSection
      title={content.header.title}
      roleDetails={content.header.roleDetails}
      chips={content.header.chips}
      description={content.header.description.join('\n')}
      image={content.header.image}
    />
    {content.sections
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((section, idx) =>
        renderSection
          ? renderSection(section, idx)
          : <StudySection key={idx} section={section} className={styles.section} />
      )}
      <NextStudy meta={meta} />
  </Layout>
);

export default StudyTemplate;