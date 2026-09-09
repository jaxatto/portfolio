import React from 'react';
import Layout from '#components/Layout';
import Banner from '#pages/Work/components/Banner';
import StudyCardGrid from '#components/StudyCardGrid';
import { content } from '#pages/Work/resources/content';
import { meta } from '#pages/Work/resources/meta';
import styles from './Work.module.css';

const Work: React.FC = () => (
	<Layout title={meta.title} metaDescription={meta.description}>
		<Banner />
		<StudyCardGrid />
	</Layout>
);

export default Work;
