import React from 'react';
import clsx from 'clsx';
import StudyCard, { StudyCardProps } from '#components/StudyCard';
import { studyLinks } from '@constants/studyLinks';
import themeweaverImage from '@assets/samples/servicenow-sample-min.png';
import indeedImage from '@assets/samples/indeed-sample-min.png';
import actblueImage from '@assets/samples/actblue-sample-min.png';
import toyotaImage from '@assets/samples/toyota-sample-min.png';
import styles from './StudyCardGrid.module.css';

// Cards for the Home page and the "next study" row under each case study (D-028).
// Copy is inline (D-003). Figma: Home 2839:21650. Outcome lines come from each study's own content (D-028).

// `ready: false` keeps a card on Home but out of the "next study" row until its page exists.
type Card = StudyCardProps & { ready?: boolean };

const cards: Card[] = [
	{
		title: 'Building a multi‑brand token system',
		outcome:
			'Led token architecture and Figma-to-code automation for Toyota’s PRIME design system, a single source of truth for design and code.',
		image: toyotaImage,
		imageAlt: '',
		linkUrl: studyLinks.toyota,
		linkText: 'Read the Toyota case study',
		palette: 'brand',
		ready: false,
		// TODO(jax): the Toyota case study page doesn't exist yet (Figma node 2948:40398), so the link
		// shows the 404 until content is added before launch (slice 4). Then drop `ready: false`.
	},
	{
		title: 'Turning surveys into themes in minutes',
		outcome:
			'Shaped the experience of an internal AI tool that groups open-ended survey responses into themes, work that took 10+ hours per 100 responses by hand.',
		image: themeweaverImage,
		imageAlt: '',
		linkUrl: studyLinks.servicenow,
		linkText: 'Read the ServiceNow case study',
		enlargeImage: true,
		palette: 'secondary',
	},
	{
		title: 'Documenting a global design system',
		outcome:
			'Designed, documented and shipped 20 accessible, localized components for a design system used by 100+ designers across Indeed.',
		image: indeedImage,
		linkUrl: studyLinks.indeed,
		linkText: 'Read the Indeed case study',
		enlargeImage: true,
		palette: 'tertiary',
	},
	{
		title: 'Replacing support tickets with self‑serve setup',
		outcome:
			'Led design of the Salesforce integration end to end. Admins fix sync issues themselves, cutting support costs an estimated $1.5M a year.',
		image: actblueImage,
		linkUrl: studyLinks.actblue,
		linkText: 'Read the ActBlue case study',
		enlargeImage: true,
		palette: 'quaternary',
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
			: cards.filter((card) => card.ready !== false && card.linkUrl !== excludeUrl).slice(0, 2);

	return (
		<div className={clsx(styles.grid, variant === 'study' && styles.study)}>
			{visible.map(({ ready: _ready, ...card }) => (
				<StudyCard
					key={card.title}
					{...card}
					variant={variant}
					headingLevel={variant === 'work' ? 'h2' : 'h3'}
					// Work: every card is horizontal and stacked, so any number of studies works (D-028).
					layout={variant === 'work' ? 'horizontal' : 'vertical'}
				/>
			))}
		</div>
	);
};

// The card palette of a study, so its page can color the h1 like the card's title (D-052).
export const studyPalette = (linkUrl: string) => cards.find((card) => card.linkUrl === linkUrl)?.palette ?? 'brand';

export default StudyCardGrid;
