import React from 'react';
import type { Variant } from '#data/commonTypes/variant';
import { getVariantVars } from '#data/commonTypes/variant';
import styles from './Chip.module.css';

// Chip component for displaying tags or labels
// It supports different variants and sizes for customization
// Usage: <Chip variant="secondary" size="small">Tag</Chip>

type ChipProps = {
	children: React.ReactNode;
	variant?: Variant | 'neutral';
	className?: string;
	size?: 'large' | 'small';
};

const Chip: React.FC<ChipProps> = ({
	children,
	variant = 'neutral',
	className = '',
	size = 'large',
}) => (
	<div
		className={[styles.wrapper, styles[variant], styles[size], className]
			.filter(Boolean)
			.join(' ')}
		style={variant !== 'neutral' ? getVariantVars(variant) : undefined}
	>
		{children}
	</div>
);

export default Chip;
