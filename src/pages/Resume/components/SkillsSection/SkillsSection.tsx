import React from 'react';
import clsx from 'clsx';
import SkillCard from '#pages/Resume/components/SkillCard';
import styles from './SkillsSection.module.css';

import { SkillCardProps } from '#pages/Resume/components/SkillCard';

const focus = {
	heading: 'Focus areas',
	description: 'Spaces where I excel at solving real problems.',
	theme: 'tertiary' as SkillCardProps['theme'],
	list: ['B2B', 'SaaS', 'FinTech', 'PeopleTech', 'DesignOps'],
};

const skills = {
	heading: 'Skills and expertise',
	description:
		'How I approach product design: clear structure, flexible process, and collaboration that sticks.',
	theme: 'secondary' as SkillCardProps['theme'],
	list: [
		'UX/UI Design',
		'Accessibility',
		'Design Systems',
		'Discovery',
		'Prototyping',
		'Documentation',
		'Agile',
		'Collaboration',
		'Research',
	],
};

const tools = {
	heading: 'Tools and technology',
	description: 'The tools I use to design, prototype, and collaborate.',
	theme: 'primary' as SkillCardProps['theme'],
	list: [
		'Figma',
		'HTML/CSS',
		'React',
		'Miro',
		'Notion',
		'Confluence',
		'GitHub',
		'Storybook',
		'Adobe CC',
	],
};

const skillData = [focus, skills, tools];

const SkillsSection: React.FC = () => (
	<section className={clsx(styles.wrapper, 'general-content-wrapper')}>
		<div className={styles.content}>
			{skillData.map((item) => (
				<SkillCard
					key={item.heading}
					heading={item.heading}
					description={item.description}
					chips={item.list}
					theme={item.theme}
				/>
			))}
		</div>
	</section>
);

export default SkillsSection;
