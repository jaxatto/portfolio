import React from 'react';
import clsx from 'clsx';
import Link from '@components/Link';
import Image from '@components/Image';
import Icon from '@components/Icon';
import styles from './StudyCard.module.css';

// StudyCard displays a case study as a colored, linked card.
// Usage: <StudyCard title="Case Study Title" description={["Byline"]} image="image-url.jpg" linkUrl="/case-study" linkText="Read more" />
// `size="full"` puts the text and image side by side across the whole grid width; `half` stacks them.
// `variant` only affects how the card is labelled/placed (home page vs. case study page).

export type StudyCardPalette = 'brand' | 'secondary' | 'tertiary' | 'primary';

export type StudyCardProps = {
	title: string; // Card title
	description: string[]; // Byline text divided by dot
	image: string | React.ReactNode; // Image URL or React node
	imageAlt?: string; // Alt text for the image
	linkUrl: string; // URL for the study
	linkText: string; // Text for the link
	palette?: StudyCardPalette; // Color palette for the card
	size?: 'full' | 'half'; // Full grid width or half width
	count?: number; // Optional count for the card, e.g., "Case study 1"
	total?: number; // Optional total number of cards, e.g., "of 5"
	iconFallback?: string; // Fallback icon name if image fails to load
	variant?: 'work' | 'study'; // Variant used on home/work page or on case study page
	className?: string; // Layout classes from the parent (e.g. grid placement)
};

const StudyCard: React.FC<StudyCardProps> = ({
	title,
	description,
	image,
	imageAlt = '', // Image is decorative by default
	linkUrl,
	linkText,
	palette = 'brand',
	size = 'half',
	count,
	total,
	iconFallback = 'pencil-ruler',
	variant = 'work',
	className,
}) => {
	const accessibleLabel = [
		`Case study${typeof count === 'number' ? ` ${count}` : ''}${typeof total === 'number' ? ` of ${total}` : ''}:`,
		title,
		linkText,
	]
		.filter(Boolean)
		.join(' – ');

	return (
		<Link
			href={linkUrl}
			className={clsx(
				styles.card,
				styles[palette],
				styles[size],
				styles[variant],
				className,
			)}
			aria-label={accessibleLabel}
		>
			<div className={styles.content}>
				<div className={styles.copy}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>
						{description.map((desc) => (
							<span key={desc}>{desc}</span>
						))}
					</p>
				</div>
				<span className={styles['card-link']}>
					<span className={styles['link-text']}>{linkText}</span>
					<Icon name="arrow-right" className={styles.icon} aria-hidden="true" />
				</span>
			</div>
			<div className={styles.preview}>
				<div className={styles['image-box']}>
					{typeof image === 'string' ? (
						<Image
							src={image}
							alt={imageAlt}
							iconFallback={iconFallback}
							className={styles.frame}
							imgClassName={styles.image}
							fallbackClassName={styles.fallback}
						/>
					) : (
						image
					)}
				</div>
			</div>
		</Link>
	);
};

export default StudyCard;
