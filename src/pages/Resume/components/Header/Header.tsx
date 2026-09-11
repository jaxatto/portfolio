import React from 'react';
import Link from '#components/Link';
import styles from './Header.module.css';

import { contactInfo } from '#data/constants/contactInfo';

const content = {
	h1: 'Resume',
	heading: 'Jax Engel',
	description1: 'Bridging the gap between design, code,',
	description2: 'and collaboration.',
	byline: 'Looking for a unicorn? 🦄',
	buttonLabel: 'Get my resume',
	buttonIcon: 'arrow-right',
	buttonHref: contactInfo.resume.src,
};

const Header: React.FC = () => (
	<section className={styles.wrapper}>
		<h1 className="sr-only">{content.h1}</h1>

		<h2 className={styles['page-title-lg']}>{content.heading}</h2>
		<p className={styles.description}>
			<span className={styles.description1}>{content.description1}</span>
			<span className={styles.description2}>{content.description2}</span>
		</p>

		<p className={styles.byline}>{content.byline}</p>
		<Link
			href={content.buttonHref}
			className={styles.button}
			iconName="arrow-right"
			styleAs="button"
			newTab={true}
		>
			{content.buttonLabel}
		</Link>
	</section>
);

export default Header;
