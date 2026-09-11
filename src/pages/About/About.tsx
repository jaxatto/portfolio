import React from 'react';
import clsx from 'clsx';
import Layout from '#components/Layout';
import Image from '#components/Image';
import styles from './About.module.css';

import primaryImage from '@/assets/about/primary-image-min.png';
import secondaryImage from '@/assets/about/secondary-image-min.png';
import tertiaryImage from '@/assets/about/tertiary-image-min.png';

const meta = {
	title: 'About Jax Engel – Enterprise UX, Fintech, Internal Tools',
	description:
		'Jax Engel is a senior-level product designer specializing in enterprise UX, fintech, and internal tools. Figma expert with deep experience in design systems, accessibility, and cross-functional collaboration.',
	keywords: [],
};

const images = [
	{
		src: primaryImage,
		alt: "A cat named Midna rests on a person's arm at a computer desk, nestled beside a keyboard, coffee mug, and monitor. Midna the most chaotic rescue tortoiseshell cat. She secretly does all of my code, too.",
		iconFallback: 'cat',
		altFallback: 'A cat icon as fallback for the image of Midna the cat.',
	},
	{
		src: secondaryImage,
		alt: 'A black dog named Kirby lies on a couch with its head resting on a brightly colored video game controller. Kirby is a very lazy rescue dog.',
		iconFallback: 'controller',
		altFallback:
			'A controller icon as fallback for the image of Kirby the dog.',
	},
	{
		src: tertiaryImage,
		alt: 'A gray cat named Beauregard sits upright on a bed, wearing a pink bow collar with a fish-shaped name tag. The bow has little black skulls on it, because Beau is a little punk rock. Beau is also a rescue.',
		iconFallback: 'paw',
		altFallback: 'A paw icon as fallback for the image of Beauregard the cat.',
	},
];

const content = {
	header: {
		title: 'About me',
		bullets: [
			{
				text: '11+ years product design',
				emoji: '📆',
			},
			{
				text: 'Accessibility advocacy',
				emoji: '♿',
			},
			{
				text: 'Design systems leadership',
				emoji: '🎨',
			},
			{
				text: 'Cross-functional collaboration',
				emoji: '👥',
			},
		],
		description: [
			'I design accessible, scalable experiences that make complex tools feel straightforward. My work spans fintech, internal tools, and enterprise platforms.',
		],
	},
	currently: {
		title: 'Currently',
		titleEmoji: '🚀',
		description: [
			"I'm currently at Toyota, where I work with a dedicated team of designers and developers to build the PRIME Design System. PRIME serves the internal Supply Chain and Fulfillment product teams, with big plans for the future.",
			'My primary focus has been crafting our token library and developing AI tooling that  speeds up our workflows. I support product teams directly, transforming requests into scalable, accessible additions to the system.',
			'I especially enjoy my role at Toyota because I get to utilize both my design and code skills while elevating my skills in AI.',
		],
	},
	how: {
		title: 'How I work',
		titleEmoji: '🧠',
		description: [
			'I lead projects from beginning to end, from shaping the problem to shipping the solution. By staying close to the details, I ensure accessibility and consistency at every step.',
			"I'm at my best in collaborative, technical environments, partnering closely with engineers to sweat the details. My code background and experience with AI tools help teams stay unblocked and keep projects moving quickly.",
			'I also enjoy mentorship and knowledge sharing, whether through design critiques, pair design sessions, or leading workshops. I believe in building a culture of learning and growth, where everyone can participate in design.',
		],
	},
	more: {
		title: 'A little more',
		titleEmoji: '✨',
		description: [
			"I live in Fort Worth, Texas with my partner and our four pets (our cat Midna insists she is the project manager). I love narrative-heavy games, deep dives into Zelda timelines, and finding ways to improve workflows that make other people's jobs easier.",
		],
	},
	images: {
		srOnly: {
			intro:
				"Meet my pets! Midna, Kirby, Beauregard, and Zelda. Because I work remote, they're always around and up to no good (but are very cute).",
			outro:
				'Zelda, the black cat, is not pictured because she was sleeping somewhere.',
		},
	},
};

const About: React.FC = () => (
	<Layout
		title={meta.title}
		metaDescription={meta.description}
		className={clsx(styles.wrapper, 'general-content-wrapper')}
	>
		<section>
			<div className={styles['top-section']}>
				<h1 className={clsx(styles.title, 'page-title')}>
					{content.header.title}
				</h1>
				<ul>
					{content.header.bullets.map((bullet, i) => (
						<li key={i}>
							<span aria-hidden="true">{bullet.emoji}</span> {bullet.text}
						</li>
					))}
				</ul>
			</div>
			{content.header.description.map((desc, i) => (
				<p key={i}>{desc}</p>
			))}
		</section>
		<section className={styles['currently-section']}>
			<h2 className="heading-md">
				<span aria-hidden="true">{content.currently.titleEmoji}</span>{' '}
				{content.currently.title}
			</h2>
			{content.currently.description.map((desc, i) => (
				<p key={i}>{desc}</p>
			))}
		</section>
		<section className={styles['how-section']}>
			<h2 className="heading-md">
				<span aria-hidden="true">{content.how.titleEmoji}</span>{' '}
				{content.how.title}
			</h2>
			{content.how.description.map((desc, i) => (
				<p key={i}>{desc}</p>
			))}
		</section>
		<section>
			<h2 className="heading-md">
				<span aria-hidden="true">{content.more.titleEmoji}</span>{' '}
				{content.more.title}
			</h2>
			{content.more.description.map((desc, i) => (
				<p key={i}>{desc}</p>
			))}
		</section>
		<section>
			<ul className={styles['lifestyle-image-row']}>
				<span className="sr-only">{content.images.srOnly.intro}</span>
				{images.map((img, i) => (
					<li key={i} className={styles['lifestyle-line-item']}>
						<Image
							src={img.src}
							alt={img.alt}
							iconFallback={img.iconFallback}
							altFallback={img.altFallback}
							className={styles['lifestyle-fallback-wrapper']}
							fallbackClassName={styles['lifestyle-fallback-icon']}
						/>
					</li>
				))}
				<span className="sr-only">{content.images.srOnly.outro}</span>
			</ul>
		</section>
	</Layout>
);

export default About;
