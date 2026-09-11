import React from 'react';
import clsx from 'clsx';
import Chip from '#components/Chip';
import type { Variant } from '#data/commonTypes/variant';
import styles from './ChipGroup.module.css';

// ChipGroup component for displaying a group of chips
// It allows customization of chip data, size, and variant
// Usage: <ChipGroup chips={[{ label: 'Chip 1' }, { label: 'Chip 2' }]} size="small" variant="primary" />
// Preferably pass an array of objects with label and optional variant to the chips prop

export type ChipData = {
	label: string;
	variant?: Variant;
};

type ChipGroupProps = {
	chips: ChipData[];
	className?: string;
	size?: 'medium' | 'small';
	variant?: Variant;
};

const ChipGroup: React.FC<ChipGroupProps> = ({
	chips,
	className,
	size = 'medium',
	variant,
}) => (
	<ul className={clsx(styles['chip-group'], className)}>
		{chips.map((chip) => (
			<li key={chip.label}>
				<Chip variant={chip.variant ?? variant} size={size}>
					{chip.label}
				</Chip>
			</li>
		))}
	</ul>
);

export default ChipGroup;
