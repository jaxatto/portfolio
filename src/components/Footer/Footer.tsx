import React from 'react';
import clsx from 'clsx';
import TextLink from '#components/TextLink';
import Icon from '#components/Icon';
import Tooltip from '#components/Tooltip';
import { useSiteConfig } from '#providers/SiteConfig';
import { contactInfo } from '#constants/contactInfo';
import styles from './Footer.module.css';

// Page footer: the call to action and links, the same on every page (D-049). In dark mode it sits on
// a tinted band; Home passes `band={false}` to keep the plain page ground.
// Copy is inline on purpose (D-003).

type FooterProps = {
	band?: boolean;
};

const Footer: React.FC<FooterProps> = ({ band = true }) => {
	const { isJobSeeking } = useSiteConfig();

	return (
		<footer className={clsx(styles.footer, band && styles.band)}>
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
				{/* Icon-only links: each keeps a real accessible name (sr-only text) plus a tooltip (D-103), in a 40px target like the nav's mode toggle. */}
				<ul className={styles.row}>
					<li>
						<Tooltip label="Resume">
							<a
								href={contactInfo.resume.src}
								className={styles['icon-link']}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon name="file-arrow-down" aria-hidden="true" />
								<span className="sr-only">Resume (PDF, opens in a new tab)</span>
							</a>
						</Tooltip>
					</li>
					{isJobSeeking && (
						<li>
							<Tooltip label="LinkedIn">
								<a
									href={contactInfo.linkedin.src}
									className={styles['icon-link']}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Icon name="linkedin" aria-hidden="true" />
									<span className="sr-only">LinkedIn (opens in a new tab)</span>
								</a>
							</Tooltip>
						</li>
					)}
					<li>
						<Tooltip label="GitHub">
							<a
								href={contactInfo.github.src}
								className={styles['icon-link']}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon name="github" aria-hidden="true" />
								<span className="sr-only">GitHub (opens in a new tab)</span>
							</a>
						</Tooltip>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
