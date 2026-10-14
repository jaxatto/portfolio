import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import styles from './StudyCard.module.css';

// Figma "Study Card" (Home, node 2726:63413). Palette = container / on-container token pair.
// Only the link text is clickable (D-033); its accessible name includes the title: "Read AI study: <title>".
// Without `linkUrl` the card is inert (case study not written yet) and shows `placeholder`.
// Anatomy: title, outcome, company + tags, link (D-029). See also D-028.

export type StudyCardProps = {
	title: string; // The problem solved
	outcome?: string; // One sentence of proof: what changed and Jax's part
	description: string[]; // Company then tags, joined with a middle dot (quiet, below the outcome)
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
	outcome,
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
			variant === 'work' && styles.band,
			!linkUrl && styles.inert,
		)}
	>
		<div className={styles.content}>
			<div className={styles.text}>
				<h3 className={styles.title}>{title}</h3>
				{outcome && <p className={styles.outcome}>{outcome}</p>}
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
