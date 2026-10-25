import React from 'react';
import clsx from 'clsx';
import Tooltip from '#components/Tooltip';
import Icon from '#components/Icon';
import styles from './ModeToggle.module.css';

// Light/dark toggle as an icon button (D-017; Figma had a pill switch). The icon shows the mode you
// will switch to, and the accessible name states that action ("Switch to dark mode"). Because the
// name changes with the state, this is a plain button, not a switch or aria-pressed (which would
// announce the state twice). The sun/moon icons are decorative.
// Usage: <ModeToggle checked={isDark} onChange={setIsDark} />

type ModeToggleProps = {
	/** True when the dark theme is showing. */
	checked: boolean;
	onChange: (checked: boolean) => void;
	className?: string;
};

const ModeToggle: React.FC<ModeToggleProps> = ({ checked, onChange, className }) => {
	const label = checked ? 'Switch to light mode' : 'Switch to dark mode';

	return (
	<Tooltip label={label}>
		<button
			type="button"
			aria-label={label}
			data-mode={checked ? 'dark' : 'light'}
			className={clsx(styles.button, className)}
			onClick={() => onChange(!checked)}
		>
			<span className={clsx(styles.icon, styles.sun)}>
				<Icon name="sun" aria-hidden="true" />
			</span>
			<span className={clsx(styles.icon, styles.moon)}>
				<Icon name="moon" aria-hidden="true" />
			</span>
		</button>
	</Tooltip>
	);
};

export default ModeToggle;
