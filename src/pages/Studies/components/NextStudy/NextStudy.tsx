import React from 'react';
import StudyCardGrid from '#components/StudyCardGrid';
import styles from './NextStudy.module.css';



const content = {
	title: 'More of my work',
	titleEmoji: '📚',
};

const NextStudy: React.FC<{ meta: { linkUrl: string } }> = ({ meta }) => (
	<div className={styles.wrapper}>
		<h2 className={styles.title}>
			<span aria-hidden="true">{content.titleEmoji}</span> {content.title}
		</h2>
		<StudyCardGrid
			variant="study"
			excludeUrl={meta.linkUrl} // This will exclude the current study
		/>
	</div>
);

export default NextStudy;
