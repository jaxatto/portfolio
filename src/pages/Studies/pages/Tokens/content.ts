import placeholderImage from '@/assets/samples/placeholder-min.png';
import type { ChipData } from '#components/ChipGroup';

const content = {
	header: {
		title: 'Building a multi-brand token system for cross-platform apps',
		roleDetails: [
			{
				role: 'Design Systems',
				startDate: '2026',
			},
		],
		description: [
			'This case study is still being written up. Check back soon for the full write-up on building a multi-brand design token system for cross-platform apps.',
		],
		chips: [
			{ label: 'Design systems', theme: 'primary' },
			{ label: 'Tokens', theme: 'secondary' },
			{ label: 'Logistics', theme: 'tertiary' },
		] as ChipData[],
		image: [
			{
				src: placeholderImage,
				caption: 'Case study coming soon.',
				alt: 'Placeholder image for the upcoming multi-brand token system case study.',
			},
		],
	},
	sections: [],
};

export default content;
