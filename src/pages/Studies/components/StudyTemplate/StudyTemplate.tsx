import React from 'react';
import clsx from 'clsx';
import Layout from '#components/Layout';
import HeaderSection from '#pages/Studies/components/HeaderSection';
import StudySection from '#pages/Studies/components/StudySection';
import NextStudy from '#pages/Studies/components/NextStudy';
import type { StudyHeaderProps } from '#data/commonTypes/study/studyHeader';
import type { StudySectionProps } from '#data/commonTypes/study/studySection';
import type { StudyMetaProps } from '#data/commonTypes/study/studyMeta';
import styles from './StudyTemplate.module.css';

export type StudyTemplateProps = {
	meta: StudyMetaProps;
	content: {
		header: StudyHeaderProps;
		sections: StudySectionProps[];
	};
	renderSection?: (section: StudySectionProps, idx: number) => React.ReactNode;
};

const StudyTemplate: React.FC<StudyTemplateProps> = ({
	meta,
	content,
	renderSection,
}) => (
	<Layout
		title={meta.title}
		metaDescription={meta.description}
		className={clsx(styles.wrapper, 'general-content-wrapper')}
	>
		<HeaderSection
			title={content.header.title}
			roleDetails={content.header.roleDetails}
			chips={content.header.chips}
			description={content.header.description}
			image={content.header.image}
		/>
		{content.sections
			.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
			.map((section, idx) =>
				renderSection ? (
					renderSection(section, idx)
				) : (
					<StudySection
						key={idx}
						section={section}
						className={styles.section}
					/>
				),
			)}
		<NextStudy meta={meta} />
	</Layout>
);

export default StudyTemplate;
