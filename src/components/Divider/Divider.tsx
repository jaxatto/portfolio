import React from 'react';
import type { JSX } from 'react';
import { cn } from '#utils/cn';
import styles from './Divider.module.css';

type DividerProps = {
	count?: number;
	className?: string;
	variant?: 'default' | 'section-divider' | 'section-header';
	text?: string;
	textTag?: keyof JSX.IntrinsicElements;
	contentAlign?: 'center' | 'left';
};

const Divider: React.FC<DividerProps> = ({
	count = 6,
	variant = 'default',
	className,
	text = '',
	textTag: TextComponent = 'h2',
	contentAlign = 'center',
}) => {
	const isLeftAligned = contentAlign === 'left';

	if (variant === 'section-header') {
		return (
			<div
				className={cn(
					styles.wrapper,
					styles['section-header'],
					isLeftAligned && styles['align-left'],
					className,
				)}
			>
				<div className={styles.group}>
					<span className={styles.line} aria-hidden="true" />
					<span className={styles.dot} aria-hidden="true" />
				</div>
				<TextComponent className={cn(styles.text, 'heading-lg')}>
					{text}
				</TextComponent>
				<div className={styles.group}>
					<span className={styles.dot} aria-hidden="true" />
					<span className={styles.line} aria-hidden="true" />
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				styles.wrapper,
				variant === 'section-divider' && styles['section-divider-wrapper'],
				isLeftAligned && styles['align-left'],
				className,
			)}
			aria-hidden="true"
		>
			{variant === 'section-divider' && <span className={styles.line} />}
			<span className={styles['dots-wrapper']}>
				{Array.from({ length: count }).map((_, i) => (
					<span key={i} className={styles.dot} />
				))}
			</span>
			{variant === 'section-divider' && <span className={styles.line} />}
		</div>
	);
};

export default Divider;
