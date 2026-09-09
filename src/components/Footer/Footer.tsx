import React from 'react';
import clsx from 'clsx';
import Link from '#components/Link';
import Icon from '#components/Icon';
import { content } from './resources/content';
import styles from './Footer.module.css';

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
					<h2 className={styles.title}>{content.title}</h2>
					<p className={clsx(styles.description, 'body-lg')}>
						{content.description}
					</p>
				</div>

				<div className={styles.links}>
					<Link href={content.email.src} className={styles.emailLink}>
						<span className="sr-only">{content.email.preText}</span>
						{content.email.label}
						<span className="sr-only">{content.email.srOnly}</span>
						<Icon name="arrow_outward" className={styles.emailIcon} />
					</Link>

					<div className={styles.row}>
						<Link
							href={content.resume.src}
							newTab
							className={styles.rowLink}
							aria-label={content.resume.ariaLabel}
						>
							{content.resume.label}
						</Link>
						<Link
							href={content.linkedin.src}
							newTab
							className={styles.rowLink}
							aria-label={content.linkedin.ariaLabel}
						>
							{content.linkedin.label}
						</Link>
						<Link
							href={content.github.src}
							newTab
							className={styles.rowLink}
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
