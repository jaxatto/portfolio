import React from 'react';
import clsx from 'clsx';
import TextLink from '#components/TextLink';
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
							Open to remote Staff Product Designer and Design Engineer roles.
						</p>
					</div>
					{isJobSeeking ? (
						<TextLink href={contactInfo.email.src} icon="arrow-top-right" size="lg">
							<span className="sr-only">Email me at </span>
							{contactInfo.email.label}
							<span className="sr-only"> (opens email client)</span>
						</TextLink>
					) : (
						<TextLink href={contactInfo.linkedin.src} newTab icon="arrow-top-right" size="lg">
							<span className="sr-only">Find me on </span>LinkedIn
							<span className="sr-only"> (opens in a new tab)</span>
						</TextLink>
					)}
				</div>
				<ul className={styles.row}>
					<li>
						<TextLink href={contactInfo.resume.src} newTab>
							Resume<span className="sr-only"> (PDF, opens in a new tab)</span>
						</TextLink>
					</li>
					{isJobSeeking && (
						<li>
							<TextLink href={contactInfo.linkedin.src} newTab>
								LinkedIn<span className="sr-only"> (opens in a new tab)</span>
							</TextLink>
						</li>
					)}
					<li>
						<TextLink href={contactInfo.github.src} newTab>
							GitHub<span className="sr-only"> (opens in a new tab)</span>
						</TextLink>
					</li>
				</ul>
			</div>
		</footer>
	);
};

export default Footer;
