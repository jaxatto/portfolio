import React from 'react';
import clsx from 'clsx';
import Icon from '@components/Icon';
import styles from './ModeToggle.module.css';

// Switch between light and dark mode.
// Usage: <ModeToggle checked={isDark} onChange={setIsDark} />

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
	'aria-label': ariaLabel = 'Dark mode',
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
			<Icon name="sun" aria-hidden="true" />
		</span>
		<span className={clsx(styles.icon, styles.moon)}>
			{checked && <Icon name="moon" aria-hidden="true" />}
		</span>
	</button>
);

export default ModeToggle;
