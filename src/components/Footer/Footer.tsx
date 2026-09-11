import React from 'react';
import clsx from 'clsx';
import Link from '#components/Link';
import Icon from '#components/Icon';
import styles from './Footer.module.css';

import { contactInfo } from '#data/constants/contactInfo';

const content = {
	title: "Let's work together",
	description:
		'Looking for remote Staff Product Designer or Design Technologist roles.',
	email: {
		preText: 'Email me at',
		label: contactInfo.email.label,
		src: contactInfo.email.src,
		srOnly: '(opens email client)',
	},
	resume: {
		label: 'Resume',
		src: contactInfo.resume.src,
		ariaLabel: 'Resume (opens in a new tab)',
	},
	linkedin: {
		label: 'LinkedIn',
		src: contactInfo.linkedin.src,
		ariaLabel: 'LinkedIn (opens in a new tab)',
	},
	github: {
		label: 'GitHub',
		src: contactInfo.github.src,
		ariaLabel: 'GitHub (opens in a new tab)',
	},
};

// Page level footer component

const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.decorations} aria-hidden="true">
				<span className={styles.blob} />
				<span className={styles.dot} />
				<span className={styles.glow} />
				<span className={styles.arc} />
			</div>

			<div className={styles.card}>
				<div className={styles.top}>
					<h2 className={clsx(styles.title, 'title-sm')}>{content.title}</h2>
					<p className={clsx(styles.description, 'body-lg')}>
						{content.description}
					</p>
				</div>

				<div className={styles.links}>
					<Link href={content.email.src} className={styles['email-link']}>
						<span className="sr-only">{content.email.preText}</span>
						{content.email.label}
						<span className="sr-only">{content.email.srOnly}</span>
						<Icon name="arrow_outward" className={styles['email-icon']} />
					</Link>

					<div className={styles.row}>
						<Link
							href={content.resume.src}
							newTab
							className={styles['row-link']}
							aria-label={content.resume.ariaLabel}
						>
							{content.resume.label}
						</Link>
						<Link
							href={content.linkedin.src}
							newTab
							className={styles['row-link']}
							aria-label={content.linkedin.ariaLabel}
						>
							{content.linkedin.label}
						</Link>
						<Link
							href={content.github.src}
							newTab
							className={styles['row-link']}
							aria-label={content.github.ariaLabel}
						>
							{content.github.label}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
