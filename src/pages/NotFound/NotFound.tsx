import React from 'react';
import Layout from '@components/Layout';
import TextLink from '#components/TextLink';
import { content } from '@pages/NotFound/resources/content';
import styles from './NotFound.module.css';

// 404: inside the shared Layout so it gets the same header, tokens and light/dark as every page.
// NOTE: the page is intentionally not indexed; the title says what it is.

const NotFound: React.FC = () => (
	<Layout
		title="Page not found | Jax Engel"
		metaDescription="This page doesn’t exist. Head back to Jax Engel’s portfolio."
		showFooter={false}
	>
		<div className={styles.wrapper}>
			<div className={styles.copy}>
				<h1 className={styles.title}>{content.title}</h1>
				<p className={styles.description}>{content.description}</p>
			</div>
			<TextLink to={content.button.src} icon="arrow-right" size="lg">
				{content.button.label}
			</TextLink>
			<p className={styles.subtext}>
				{content.subtext.preText}{' '}
				<TextLink href={content.subtext.src}>
					{content.subtext.label}
					<span className="sr-only"> {content.subtext.srOnly}</span>
				</TextLink>
				{content.subtext.endText}
			</p>
		</div>
	</Layout>
);

export default NotFound;
