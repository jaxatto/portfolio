import React from 'react';
import StudyCard from '#components/StudyCard';
import styles from './StudyCardGrid.module.css';

import { studyLinks } from '#data/constants/studyLinks';
import { StudyCardProps } from '#components/StudyCard';
import primaryImage from '@/assets/samples/servicenow-sample-min.png';
import secondaryImage from '@/assets/samples/indeed-sample-min.png';
import tertiaryImage from '@/assets/samples/actblue-sample-min.png';

const content: StudyCardProps[] = [
	{
		title:
			'Designing an AI-driven tool to accelerate qualitative survey workflows',
		description: ['Product design', 'Enterprise'],
		image: primaryImage,
		imageAlt: 'Design preview for an AI survey workflow tool interface',
		linkUrl: studyLinks.servicenow,
		linkText: 'Read AI study',
		palette: 'primary',
		iconFallback: 'ai',
		count: 1,
	},
	{
		title: "Scaling clarity and consistency across Indeed's hiring platform",
		description: ['Design system', 'Enterprise'],
		image: secondaryImage,
		imageAlt: 'Design preview for the Indeed.com hiring platform home page',
		linkUrl: studyLinks.indeed,
		linkText: 'Read system study',
		palette: 'secondary',
		iconFallback: 'component',
		count: 2,
	},
	{
		title:
			'Improving data visibility for teams managing critical donation data',
		description: ['Product design', 'Nonprofit'],
		image: tertiaryImage,
		imageAlt: 'Design preview for ActBlue Salesforce integration admin page',
		linkUrl: studyLinks.actblue,
		linkText: 'Read integration study',
		palette: 'tertiary',
		iconFallback: 'clouds',
		count: 3,
	},
];

// StudyCardGrid component that displays a grid of study cards
// It can be used on both work and study pages, with options to filter out specific cards
// and control the number of visible cards based on the variant ('work' or 'study')
// It accepts an optional `samples` prop to use a custom set of cards, and an `excludeUrl` prop to filter out a specific card by its link URL.
// Usage: <StudyCardGrid samples={customSamples} variant="work" excludeUrl="/case-study-1" />

type StudyCardGridProps = {
	samples?: typeof content; // Optional prop to pass a custom set of samples
	variant?: 'work' | 'study'; // 'work' for work page, 'study' for study page
	excludeUrl?: string; // Filters out a specific card by its linkUrl
};

const StudyCardGrid: React.FC<StudyCardGridProps> = ({
	samples,
	variant = 'work',
	excludeUrl,
}) => {
	const data = samples || content;
	// Filter out the current study
	const filteredData = excludeUrl
		? data.filter((card) => card.linkUrl !== excludeUrl)
		: data;
	// Show 3 cards for 'work', 2 cards for 'study'
	const visibleCount = variant === 'work' ? 3 : 2;
	const visibleData = filteredData.slice(0, visibleCount);

	return (
		<div
			className={[styles['card-grid'], styles[variant + '-grid']]
				.filter(Boolean)
				.join(' ')}
		>
			{visibleData.map((props, i) => (
				<StudyCard
					key={props.linkUrl}
					{...props}
					count={props.count}
					total={data.length}
					variant={variant}
					layout={variant === 'work' && i === 0 ? 'horizontal' : 'vertical'}
				/>
			))}
		</div>
	);
};

export default StudyCardGrid;
