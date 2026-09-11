import React from 'react';
import clsx from 'clsx';
import type { Variant } from '#data/commonTypes/variant';
import { getVariantVars } from '#data/commonTypes/variant';
import styles from './Chip.module.css';

// Chip component for displaying tags or labels
// It supports different variants and sizes for customization
// Usage: <Chip variant="secondary" size="small">Label</Chip>

type ChipProps = {
	children: React.ReactNode;
	variant?: Variant;
	className?: string;
	size?: 'medium' | 'small';
};

const Chip: React.FC<ChipProps> = ({
	children,
	variant = 'brand',
	className = '',
	size = 'medium',
}) => (
	<div
		className={clsx(styles.chip, styles[variant], styles[size], className)}
		style={getVariantVars(variant)}
	>
		<span className={styles['chip-label']}>{children}</span>
	</div>
);

export default Chip;
