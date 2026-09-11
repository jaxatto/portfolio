import React from 'react';
import Link from '#components/Link';
import styles from './Footer.module.css';

import { contactInfo } from '#data/constants/contactInfo';

const content = {
	heading: 'Ready for new opportunities',
	description:
		"I'm interviewing now for remote design roles on highly collaborative teams.",
	button: 'Download resume',
	resumeHref: contactInfo.resume.src,
	email: {
		label: contactInfo.email.label,
		src: contactInfo.email.src,
	},
	linkedin: {
		label: 'LinkedIn',
		src: contactInfo.linkedin.src,
	},
	byline: 'Reach me at {email} or say hi on {linkedin}.',
};

const Footer: React.FC = () => {
	// Split the byline string at the placeholders
	const [beforeEmail, afterEmailAndLinkedin] = content.byline.split('{email}');
	const [between, afterLinkedin] = afterEmailAndLinkedin.split('{linkedin}');

	// Split heading into two parts (first two words, rest)
	const headingWords = content.heading.split(' ');
	const headingFirst = headingWords.slice(0, 2).join(' ');
	const headingRest = headingWords.slice(2).join(' ');

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.top}>
					<h2 className={styles.title}>
						<span>{headingFirst}</span>
						<span>{headingRest}</span>
					</h2>
					<p className={styles.description}>{content.description}</p>
				</div>

				<div className={styles.bottom}>
					<Link
						href={content.resumeHref}
						className={styles.button}
						styleAs="button"
						iconName="download"
						iconPosition="left"
						newTab={true}
					>
						{content.button}
					</Link>

					<p className={styles.byline}>
						<span>{beforeEmail}</span>
						<Link href={content.email.src}>{content.email.label}</Link>
						<span>{between}</span>
						<Link href={content.linkedin.src} newTab={true}>
							{content.linkedin.label}
						</Link>
						<span>{afterLinkedin}</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
