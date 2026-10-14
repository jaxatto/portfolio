import React from 'react';
import clsx from 'clsx';
import TextLink from '#components/TextLink';
import Icon from '#components/Icon';
import { useSiteConfig } from '#providers/SiteConfig';
import { contactInfo } from '#constants/contactInfo';
import styles from './Footer.module.css';

// Page footer: the call to action and links. Two variants (D-024):
// - 'quiet': hairline above, page ground. Used on Home, which already ends in colorful cards.
// - 'accent': full-bleed accent ground. Used on every other page.
// Copy is inline on purpose (D-003).

export type FooterVariant = 'quiet' | 'accent';

type FooterProps = {
	variant?: FooterVariant;
};

const Footer: React.FC<FooterProps> = ({ variant = 'accent' }) => {
	const { isJobSeeking } = useSiteConfig();

	return (
		<footer className={clsx(styles.footer, styles[variant])}>
			<div className={styles.inner}>
				<div className={styles.main}>
					<div className={styles.top}>
						<h2 className={styles.title}>Let’s work together</h2>
						{/* TODO(jax): provisional copy (D-021: Staff Product Designer, plus Design Engineer where it fits). */}
						<p className={styles.description}>
							Open to remote <span className={styles.nowrap}>Staff Product Designer</span>{' '}
							<span className={styles.nowrap}>and Design Engineer</span> roles.
						</p>
					</div>
					{isJobSeeking ? (
						<TextLink href={contactInfo.email.src} icon="arrow-top-right" size="lg" className={styles.email}>
							<span className="sr-only">Email me at </span>
							{contactInfo.email.label}
							<span className="sr-only"> (opens email client)</span>
						</TextLink>
					) : (
						<TextLink href={contactInfo.linkedin.src} newTab icon="arrow-top-right" size="lg" className={styles.email}>
							<span className="sr-only">Find me on </span>LinkedIn
							<span className="sr-only"> (opens in a new tab)</span>
						</TextLink>
					)}
				</div>
				{/* Icon-only links: each keeps a real accessible name (sr-only text) plus a tooltip, in a 40px target like the nav's mode toggle. */}
				<ul className={styles.row}>
					<li>
						<a
							href={contactInfo.resume.src}
							className={styles['icon-link']}
							target="_blank"
							rel="noopener noreferrer"
							data-tooltip="Resume"
						>
							<Icon name="file-arrow-down" aria-hidden="true" />
							<span className="sr-only">Resume (PDF, opens in a new tab)</span>
						</a>
					</li>
					{isJobSeeking && (
						<li>
							<a
								href={contactInfo.linkedin.src}
								className={styles['icon-link']}
								target="_blank"
								rel="noopener noreferrer"
								data-tooltip="LinkedIn"
							>
								<Icon name="linkedin" aria-hidden="true" />
								<span className="sr-only">LinkedIn (opens in a new tab)</span>
							</a>
						</li>
					)}
					<li>
						<a
							href={contactInfo.github.src}
							className={styles['icon-link']}
							target="_blank"
							rel="noopener noreferrer"
							data-tooltip="GitHub"
						>
							<Icon name="github" aria-hidden="true" />
							<span className="sr-only">GitHub (opens in a new tab)</span>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
