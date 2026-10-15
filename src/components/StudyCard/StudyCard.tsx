import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Icon from '#components/Icon';
import styles from './StudyCard.module.css';

// Figma "Study Card" (Home, node 2726:63413). Palette = container / on-container token pair.
// The whole card is clickable through a stretched link (the link text's ::after covers the card),
// so the heading stays a real heading and the link name is unique: "Read AI study: <title>".
// Anatomy: title, outcome, link naming the company (D-035). See also D-028.

export type StudyCardProps = {
	title: string; // The problem solved
	outcome?: string; // One sentence of proof: what changed and Jax's part
	image: string;
	imageAlt?: string; // Empty by default: the preview is decorative next to the title
	linkUrl: string;
	linkText: string;
	enlargeImage?: boolean; // Screenshot 40px larger inside the same window (D-052)
	palette?: 'brand' | 'primary' | 'secondary' | 'tertiary';
	layout?: 'horizontal' | 'vertical'; // Horizontal: preview beside the text (desktop only)
	variant?: 'work' | 'study'; // 'study' = smaller type, used under a case study
};

const StudyCard: React.FC<StudyCardProps> = ({
	title,
	outcome,
	image,
	imageAlt = '',
	linkUrl,
	linkText,
	palette = 'brand',
	enlargeImage = false,
	layout = 'vertical',
	variant = 'work',
}) => (
	<article
		className={clsx(
			styles.card,
			styles[palette],
			layout === 'horizontal' && styles.horizontal,
			variant === 'study' && styles.study,
			enlargeImage && styles.enlarge,
		)}
	>
		<div className={styles.content}>
			<div className={styles.text}>
				<h3 className={styles.title}>{title}</h3>
				{outcome && <p className={styles.outcome}>{outcome}</p>}
			</div>
			<RouterLink to={linkUrl} className={styles.link}>
				<span className={styles.linkText}>
					{linkText}
					<span className="sr-only">: {title}</span>
				</span>
				<Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
			</RouterLink>
		</div>
		<div className={styles.preview}>
			<div className={styles.sample}>
				<img src={image} alt={imageAlt} className={styles.image} />
			</div>
		</div>
	</article>
);

export default StudyCard;
