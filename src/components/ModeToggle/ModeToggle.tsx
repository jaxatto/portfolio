import React from 'react';
import clsx from 'clsx';
import Icon from '#components/Icon';
import styles from './ModeToggle.module.css';

// Light/dark switch from the Figma "Mode Toggle" (58x32 track, 24px thumbs).
// Exposed to assistive tech as a labelled switch; the sun/moon icons are decorative.
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
		<span className={clsx(styles.thumb, styles.sun)}>
			<Icon name="sun" aria-hidden="true" />
		</span>
		<span className={clsx(styles.thumb, styles.moon)}>
			<Icon name="moon" aria-hidden="true" />
		</span>
	</button>
);

export default ModeToggle;
