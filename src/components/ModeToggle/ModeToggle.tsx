import React from 'react';
import clsx from 'clsx';
import Icon from '#components/Icon';
import styles from './ModeToggle.module.css';

// ModeToggle component for switching between light and dark mode
// Usage: <ModeToggle checked={isDarkMode} onChange={setIsDarkMode} />

type ModeToggleProps = {
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
	'aria-label'?: string;
};

const ModeToggle: React.FC<ModeToggleProps> = ({
	checked,
	onChange,
	className,
	'aria-label': ariaLabel = 'Toggle dark mode',
}) => (
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={ariaLabel}
		className={clsx(styles.track, className)}
		onClick={() => onChange(!checked)}
	>
		<span className={clsx(styles.icon, styles.sun)}>
			<Icon name="light_mode" filled />
		</span>
		<span className={clsx(styles.icon, styles.moon)}>
			{checked && <Icon name="dark_mode" filled />}
		</span>
	</button>
);

export default ModeToggle;
