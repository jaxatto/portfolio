import React from 'react';
import Link from '#componentsLink';
import Divider from '#componentsDivider';
import { content } from './resources/content';
import styles from './Footer.module.css';
import { cn } from '@/utils/cn';

// Page level footer component

const Footer: React.FC = () => {
	return (
		<footer>
			<Divider />

			<div className={styles['footer-wrapper']}>
				<div className={styles.text}>
					<h2 className={cn(styles.description, 'title-md')}>
						{content.title}
					</h2>
					<p className={cn(styles.description, 'body-lg')}>
						{content.description}
					</p>
				</div>
				<div className={styles['footer-links']}>
					<Link href={content.email.src} iconName="arrow-top-right">
						<span className="sr-only">{content.email.preText}</span>
						{content.email.label}{' '}
						<span className="sr-only">{content.email.srOnly}</span>
					</Link>
					<Link href={content.linkedin.src} newTab iconName="arrow-top-right">
						{content.linkedin.preText} {content.linkedin.label}{' '}
						<span className="sr-only">{content.linkedin.srOnly}</span>
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
