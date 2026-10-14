import React from 'react';
import clsx from 'clsx';
import StudyCard, { StudyCardProps } from '#components/StudyCard';
import { studyLinks } from '@constants/studyLinks';
import themeweaverImage from '@assets/samples/servicenow-sample-min.png';
import indeedImage from '@assets/samples/indeed-sample-min.png';
import actblueImage from '@assets/samples/actblue-sample-min.png';
import styles from './StudyCardGrid.module.css';

// Cards for the Home page and the "next study" row under each case study (D-028).
// Copy is inline (D-003). Figma: Home 2839:21650. Outcome lines come from each study's own content (D-029).

const cards: StudyCardProps[] = [
	{
		title: 'Turning thousands of survey responses into themes in minutes',
		outcome:
			'Reshaped an AI research tool that replaces 10+ hours of manual coding per 100 responses; demoed to senior leadership and now in user testing.',
		description: ['ServiceNow', 'Product design', 'AI', 'Enterprise'],
		image: themeweaverImage,
		imageAlt: '',
		linkUrl: studyLinks.servicenow,
		linkText: 'Read the AI case study',
		palette: 'brand',
	},
	{
		title: 'Self-serve setup and visible syncs for campaign admins',
		outcome:
			'Rebuilt the integration end to end so admins fix sync issues without support, saving an estimated $1.5M a year.',
		description: ['ActBlue', 'Product design', 'Nonprofit', 'FinTech'],
		image: actblueImage,
		linkUrl: studyLinks.actblue,
		linkText: 'Read the integration case study',
		palette: 'primary',
	},
	{
		title: 'Scaling a design system through a rebrand',
		outcome:
			'Made the component library more accessible and easier to contribute to, and mentored a junior designer into system work.',
		description: ['Indeed', 'Design systems', 'Accessibility', 'PeopleTech'],
		image: indeedImage,
		linkUrl: studyLinks.indeed,
		linkText: 'Read the design system case study',
		palette: 'secondary',
	},
	{
		title: 'Building a multi-brand token system for cross-platform apps',
		description: ['Design systems', 'Tokens', 'Logistics'],
		image: themeweaverImage,
		linkText: 'Read the tokens case study',
		palette: 'tertiary',
		// TODO(jax): no tokens case study yet, so the card is inert. Add the outcome with it.
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
