import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import styles from './StudyCard.module.css';

// Figma "Study Card" (Home, node 2726:63413). Palette = container / on-container token pair.
// The whole card is clickable through a stretched link (the link text's ::after covers the card),
// so the heading stays a real heading and the link name is unique: "Read AI study: <title>".
// Without `linkUrl` the card is inert (case study not written yet) and shows `placeholder`.
// See docs/decisions.md D-028.

export type StudyCardProps = {
	title: string;
	description: string[]; // Byline parts, joined with a middle dot
	image: string;
	imageAlt?: string; // Empty by default: the preview is decorative next to the title
	linkUrl?: string;
	linkText: string;
	palette?: 'brand' | 'primary' | 'secondary' | 'tertiary';
	layout?: 'horizontal' | 'vertical'; // Horizontal: preview beside the text (desktop only)
	variant?: 'work' | 'study'; // 'study' = smaller type, used under a case study
	placeholder?: string; // Replaces the link while the study doesn't exist
};

const StudyCard: React.FC<StudyCardProps> = ({
	title,
	description,
	image,
	imageAlt = '',
	linkUrl,
	linkText,
	palette = 'brand',
	layout = 'vertical',
	variant = 'work',
	placeholder = 'Case study coming soon',
}) => (
	<article
		className={clsx(
			styles.card,
			styles[palette],
			layout === 'horizontal' && styles.horizontal,
			variant === 'study' && styles.study,
			!linkUrl && styles.inert,
		)}
	>
		<div className={styles.content}>
			<div className={styles.text}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>
					{description.map((part, i) => (
						<React.Fragment key={part}>
							{i > 0 && <span aria-hidden="true" className={styles.dot}> · </span>}
							{part}
						</React.Fragment>
					))}
				</p>
			</div>
			{linkUrl ? (
				<RouterLink to={linkUrl} className={styles.link}>
					<span className={styles.linkText}>
						{linkText}
						<span className="sr-only">: {title}</span>
					</span>
					<Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
				</RouterLink>
			) : (
				<p className={styles.placeholder}>{placeholder}</p>
			)}
		</div>
		<div className={styles.preview}>
			<div className={styles.sample}>
				<img src={image} alt={imageAlt} className={styles.image} />
			</div>
		</div>
	</article>
);

export default StudyCard;
