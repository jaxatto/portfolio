import React from 'react';
import clsx from 'clsx';
import StudyCard, { StudyCardProps } from '#components/StudyCard';
import { studyLinks } from '@constants/studyLinks';
import themeweaverImage from '@assets/samples/servicenow-sample-min.png';
import indeedImage from '@assets/samples/indeed-sample-min.png';
import actblueImage from '@assets/samples/actblue-sample-min.png';
import styles from './StudyCardGrid.module.css';

// Cards for the Home page and the "next study" row under each case study (D-028).
// Copy is inline (D-003). Figma: Home 2839:21650. Palettes run brand, primary, secondary, tertiary.
// TODO(jax): outcomes/metrics for each card's byline; run portfolio-critique when the studies are written.

const cards: StudyCardProps[] = [
	{
		title: 'Building a multi-brand token system for cross-platform apps',
		description: ['Design systems', 'Tokens', 'Logistics'],
		image: themeweaverImage,
		linkText: 'Read tokens study',
		palette: 'brand',
		// TODO(jax): no tokens case study exists yet. The card is inert until it has a route.
	},
	{
		title: 'Designing AI tools to speed up qualitative survey analysis',
		description: ['Product design', 'AI', 'PeopleTech'],
		image: themeweaverImage,
		linkUrl: studyLinks.servicenow,
		linkText: 'Read AI study',
		palette: 'primary',
	},
	{
		title: 'Scaling clarity and consistency across Indeed’s platform',
		description: ['Design systems', 'PeopleTech'],
		image: indeedImage,
		linkUrl: studyLinks.indeed,
		linkText: 'Read system study',
		palette: 'secondary',
	},
	{
		title: 'Improving sync visibility for teams managing donations',
		description: ['Product design', 'Nonprofit', 'FinTech'],
		image: actblueImage,
		linkUrl: studyLinks.actblue,
		linkText: 'Read integration study',
		palette: 'tertiary',
	},
];

type StudyCardGridProps = {
	variant?: 'work' | 'study'; // 'work' = Home (all cards), 'study' = two linked cards under a study
	excludeUrl?: string; // Hides the current study
};

const StudyCardGrid: React.FC<StudyCardGridProps> = ({ variant = 'work', excludeUrl }) => {
	const visible =
		variant === 'work'
			? cards
			: cards.filter((card) => card.linkUrl && card.linkUrl !== excludeUrl).slice(0, 2);

	return (
		<div className={clsx(styles.grid, variant === 'study' && styles.study)}>
			{visible.map((card) => (
				<StudyCard
					key={card.title}
					{...card}
					variant={variant}
					// Work: every card is horizontal and stacked, so any number of studies works (D-028).
					layout={variant === 'work' ? 'horizontal' : 'vertical'}
				/>
			))}
		</div>
	);
};

export default StudyCardGrid;
