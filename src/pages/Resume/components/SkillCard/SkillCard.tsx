import React from 'react';
import clsx from 'clsx';
import ChipGroup, { ChipData } from '#components/ChipGroup';
import styles from './SkillCard.module.css';

export type SkillCardProps = {
	heading: string;
	description: string;
	chips: string[];
	theme?: 'primary' | 'secondary' | 'tertiary';
	className?: string;
};

const SkillCard: React.FC<SkillCardProps> = ({
	heading,
	description,
	chips,
	theme = 'primary',
	className = '',
}) => (
	<div className={clsx(styles.wrapper, 'body-sm', styles[theme], className)}>
		<div className={styles.top}>
			<h3 className={clsx(styles.title, 'heading-md')}>{heading}</h3>
			<p className={styles.description}>{description}</p>
		</div>
		<ChipGroup
			chips={chips.map((label) => ({ label }) as ChipData)}
			theme={theme}
			className={styles.chipRow}
		/>
	</div>
);

export default SkillCard;
