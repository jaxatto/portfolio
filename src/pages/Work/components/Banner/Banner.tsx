import React from 'react';
import Image from '#components/Image';
import styles from './Banner.module.css';

import profileImg from '@/assets/jax-engel-min.png';

const content = {
	emoji: '👋',
	heading: "Hello, I'm Jax!",
	image: profileImg,
	imageAlt:
		'Jax Engel is a feminine-looking person with chin length brown hair and brown eyes. She is outside in the sunshine, wearing a maroon hooded sweater.',
	description: [
		{ type: 'text', value: 'I design product experiences that are ' },
		{ type: 'underline', value: 'accessible' },
		{ type: 'text', value: ', scalable, and built on ' },
		{ type: 'underline', value: 'systems-level thinking' },
		{ type: 'text', value: '.' },
	],
	srOnlyDescription:
		'I design product experiences that are accessible, scalable, and built on systems-level thinking.',
};

const Banner: React.FC = () => (
	<section className={styles['banner-wrapper']}>
		<div className={styles.banner}>
			<div className={styles['image-wrapper']}>
				<Image
					src={content.image}
					alt={content.imageAlt}
					iconFallback="person"
					imgClassName={styles['image-main']}
					fallbackClassName={styles['image-fallback']}
				/>
				<span className={styles.bubble} aria-hidden="true">
					{content.emoji}
				</span>
			</div>
			<div className={styles.text}>
				<h1 className={styles.heading}>{content.heading}</h1>
				<p className={styles.description} aria-hidden="true">
					{content.description.map((part, i) =>
						part.type === 'underline' ? (
							<span key={i} className={styles.underline}>
								{part.value}
							</span>
						) : (
							<React.Fragment key={i}>{part.value}</React.Fragment>
						),
					)}
				</p>
				<p className="sr-only">{content.srOnlyDescription}</p>
			</div>
		</div>
	</section>
);

export default Banner;
