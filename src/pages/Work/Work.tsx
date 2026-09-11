import React from 'react';
import Layout from '#components/Layout';
import Banner from '#pages/Work/components/Banner';
import StudyCardGrid from '#components/StudyCardGrid';
import { portfolioMeta } from '#data/constants/siteMeta';
import styles from './Work.module.css';

const Work: React.FC = () => (
	<Layout
		title={portfolioMeta.title}
		metaDescription={portfolioMeta.description}
	>
		<Banner />
		<StudyCardGrid />
	</Layout>
);

export default Work;
