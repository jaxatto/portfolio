import React from 'react';
import Layout from '#components/Layout';
import Header from '#pages/Resume/components/Header';
import ExperienceSection from '#pages/Resume/components/ExperienceSection';
import SkillsSection from '#pages/Resume/components/SkillsSection';
import Footer from '#components/Footer';
import { portfolioMeta } from '#data/constants/siteMeta';

const Resume: React.FC = () => (
	<Layout
		title={portfolioMeta.title}
		metaDescription={portfolioMeta.description}
		showFooter={false}
	>
		<Header />

		<ExperienceSection />

		<SkillsSection />

		<Footer />
	</Layout>
);

export default Resume;
