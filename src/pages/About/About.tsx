import React from 'react';
import clsx from 'clsx';
import primaryImage from '@/assets/about/primary-image-min.png';
import secondaryImage from '@/assets/about/secondary-image-min.png';
import tertiaryImage from '@/assets/about/tertiary-image-min.png';
import Layout from '#components/Layout';
import Image from '#components/Image';
import Chip from '#components/Chip';
import styles from './About.module.css';

const meta = {
	title: 'About Jax Engel – Enterprise UX, Fintech, Internal Tools',
	description:
		'Jax Engel is a senior-level product designer specializing in enterprise UX, fintech, and internal tools. Figma expert with deep experience in design systems, accessibility, and cross-functional collaboration.',
};

const images = [
	{
		src: primaryImage,
		alt: "A tortoiseshell cat named Midna rests on a person's arm at a computer desk, nestled beside a keyboard, coffee mug, and monitor. Midna is very chaotic. She secretly does all of my code, too.",
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

const About: React.FC = () => (
	<Layout
		title={meta.title}
		metaDescription={meta.description}
		className={styles.about}
	>
		<section className={styles.intro}>
			<div className={styles.header}>
				<div className={styles.subheader}>
					<h1 className="heading-md">About Jax</h1>
					<span className={clsx(styles.title, 'title-sm')}>
						Staff Product Designer & Design Technologist
					</span>
				</div>
				<ul className={styles['chip-list']}>
					<li>
						<Chip variant="brand" size="small">
							11+ years expertise
						</Chip>
					</li>
					<li>
						<Chip variant="brand" size="small">
							Code + design
						</Chip>
					</li>
					<li>
						<Chip variant="brand" size="small">
							Accessibility advocate
						</Chip>
					</li>
					<li>
						<Chip variant="brand" size="small">
							Design systems leader
						</Chip>
					</li>
					<li>
						<Chip variant="brand" size="small">
							Tokens architecture
						</Chip>
					</li>
				</ul>
			</div>
			<p>
				I bridge the gap between product design and engineering to build
				scalable, production-ready product infrastructure. My background spans
				interface design, enterprise tokens, complex workflow automation, and
				WCAG accessibility standards across fintech, automotive, and SaaS
				environments.
			</p>
			<p>
				In my current role at Toyota, I design and specialize in design token
				automation, token-to-code pipelines, and developer tooling across our
				multi-brand product ecosystem. Over my career at companies like
				ServiceNow, Indeed, and Visa, I have focused on bringing systematic
				clarity and UX quality to diverse platforms.
			</p>
		</section>
		<section>
			<h2 className="heading-md">Approach to Work</h2>

			<div className={styles.content}>
				<div className={styles.subsection}>
					<h3>Strategic Product Design:</h3>
					<p>
						Working alongside business and product leadership, I define
						requirements and transform organizational goals into frictionless
						user experiences.
					</p>
				</div>

				<div className={styles.subsection}>
					<h3>Concept to Execution:</h3>
					<p>
						Using my strong front-end foundation, I build designs, handoff
						materials, and use modern AI workflows to set engineering teams up
						for success.
					</p>
				</div>

				<div className={styles.subsection}>
					<h3>Building Inclusive Design Culture:</h3>
					<p>
						I foster team cohesion through a strong feedback culture, candid
						critiques, and collaborative practices that invite everyone to
						participate in design.
					</p>
				</div>
			</div>
		</section>
		<section>
			<h2 className="heading-md">Personal Life</h2>
			<p>
				I live in Fort Worth, Texas with my partner and our four rowdy pets:
				Kirby, Midna, Zelda, and Beau. When I'm not in Figma or VS Code, you can
				find me playing narrative-heavy video games, analyzing complex Zelda
				lore timelines, or watching 2-hour video essays on obscure topics.
			</p>
		</section>
		<section className="break-out-pop">
			<ul className={styles['image-group']}>
				{images.map((img, i) => (
					<li key={i} className={styles['image-item']}>
						<Image
							src={img.src}
							alt={img.alt}
							iconFallback={img.iconFallback}
							altFallback={img.altFallback}
							className={styles.image}
							fallbackClassName={styles['lifestyle-fallback-icon']}
						/>
					</li>
				))}
			</ul>
		</section>
	</Layout>
);

export default About;
