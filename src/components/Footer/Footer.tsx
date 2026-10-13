import React from 'react';
import TextLink from '#components/TextLink';
import { useSiteConfig } from '#providers/SiteConfig';
import { contactInfo } from '#constants/contactInfo';
import styles from './Footer.module.css';

// Page footer: call-to-action card over decorative shapes.
// Copy is inline on purpose (D-003).

const Footer: React.FC = () => {
	const { isJobSeeking } = useSiteConfig();

	return (
		<footer className={styles.footer}>
			{/* Decorative shapes, all drawn in CSS (Figma's SVG export isn't available to us). */}
			<div className={styles.decor} aria-hidden="true">
				<div className={styles['decor-frame']}>
					<div className={styles['decor-ring']} />
					<div className={styles['decor-circle']}>
						<div className={styles['decor-dot']} />
					</div>
					<div className={styles['decor-dashed']} />
				</div>
			</div>

			<div className={styles.card}>
				<div className={styles.top}>
					<h2 className={styles.title}>Let’s work together</h2>
					{/* Figma breaks the line after "or"; the spans keep that on desktop. */}
					<p className={styles.description}>
						<span className={styles.line}>Looking for remote Staff Product Designer or </span>
						<span className={styles.line}>Design Technologist roles.</span>
					</p>
				</div>
				<div className={styles.links}>
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
			</div>
		</footer>
	);
};

export default Footer;
