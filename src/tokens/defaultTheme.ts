/* defaultTheme.ts */

import { primitives } from './primitives';
import { type SemanticTheme } from './types';

export const defaultTheme: SemanticTheme = {
	name: 'Default Brand',
	colors: {
		content: {
			default: {
				light: primitives.colors.sage[900],
				dark: primitives.colors.sage[50],
			},
			muted: {
				light: primitives.colors.sage[700],
				dark: primitives.colors.sage[300],
			},
		},
		surface: {
			default: {
				light: primitives.colors.white[100],
				dark: primitives.colors.black[100],
			},
			sunken: {
				light: primitives.colors.sage[100],
				dark: primitives.colors.sage[900],
			},
			transparent: {
				light: primitives.colors.white[0],
				dark: primitives.colors.black[0],
			},
		},
		border: {
			decorative: {
				light: primitives.colors.sage[300],
				dark: primitives.colors.sage[700],
			},
		},
		primary: {
			default: {
				light: primitives.colors.violet[700],
				dark: primitives.colors.violet[300],
			},
			'on-primary': {
				light: primitives.colors.white[100],
				dark: primitives.colors.black[100],
			},
			'primary-container': {
				light: primitives.colors.violet[100],
				dark: primitives.colors.violet[800],
			},
			'on-primary-container': {
				light: primitives.colors.violet[900],
				dark: primitives.colors.violet[100],
			},
		},
		secondary: {
			default: {
				light: primitives.colors.sky[700],
				dark: primitives.colors.sky[300],
			},
			'on-secondary': {
				light: primitives.colors.white[100],
				dark: primitives.colors.black[100],
			},
			'secondary-container': {
				light: primitives.colors.sky[100],
				dark: primitives.colors.sky[800],
			},
			'on-secondary-container': {
				light: primitives.colors.sky[900],
				dark: primitives.colors.sky[100],
			},
		},
		tertiary: {
			default: {
				light: primitives.colors.teal[700],
				dark: primitives.colors.teal[300],
			},
			'on-tertiary': {
				light: primitives.colors.white[100],
				dark: primitives.colors.black[100],
			},
			'tertiary-container': {
				light: primitives.colors.teal[100],
				dark: primitives.colors.teal[800],
			},
			'on-tertiary-container': {
				light: primitives.colors.teal[900],
				dark: primitives.colors.teal[100],
			},
		},
	},
	sizes: {
		radius: {
			none: primitives.sizes.radius[0],
			xs: primitives.sizes.radius[4],
			sm: primitives.sizes.radius[8],
			md: primitives.sizes.radius[12],
			lg: primitives.sizes.radius[16],
			xl: primitives.sizes.radius[24],
		},
		space: {
			none: primitives.sizes.space[0],
			'2xs': primitives.sizes.space[0],
			xs: primitives.sizes.space[4],
			sm: primitives.sizes.space[8],
			md: primitives.sizes.space[12],
			lg: primitives.sizes.space[16],
			xl: primitives.sizes.space[20],
			'2xl': primitives.sizes.space[24],
			'3xl': primitives.sizes.space[32],
			'4xl': primitives.sizes.space[40],
			'section-sm': primitives.sizes.space[40],
			'section-md': primitives.sizes.space[56],
			'section-lg': primitives.sizes.space[64],
			'section-xl': primitives.sizes.space[80],
		},
		breakpoint: {
			xs: primitives.sizes.breakpoint[320],
			sm: primitives.sizes.breakpoint[640],
			md: primitives.sizes.breakpoint[768],
			lg: primitives.sizes.breakpoint[1024],
			xl: primitives.sizes.breakpoint[1280],
			'2xl': primitives.sizes.breakpoint[1536],
		},
		layout: {
			gutter: 'lg',
			'content-max': '960px',
			'popout-max': '1100px',
		},
	},
	font: {
		family: {
			heading: primitives.font.family.inter,
			body: primitives.font.family.manrope,
			decorative: primitives.font.family.manrope,
			mono: primitives.font.family['roboto-mono'],
		},
		size: {
			xs: primitives.font.size[12],
			sm: primitives.font.size[14],
			md: primitives.font.size[16],
			lg: primitives.font.size[18],
			xl: primitives.font.size[20],
			'2xl': primitives.font.size[24],
			'3xl': primitives.font.size[32],
		},
		weight: {
			subtle: primitives.font.weight.light,
			default: primitives.font.weight.regular,
			emphasis: primitives.font.weight.medium,
			strong: primitives.font.weight.semibold,
			'extra-strong': primitives.font.weight.bold,
		},
		'line-height': {
			compact: primitives.font['line-height']['1-2'],
			default: primitives.font['line-height']['1-5'],
			relaxed: primitives.font['line-height']['1-6'],
		},
		'letter-spacing': {
			compact: primitives.font['letter-spacing']['negative-02'],
			default: primitives.font['letter-spacing'][0],
			relaxed: primitives.font['letter-spacing']['02'],
		},
		styles: {
			'heading-lg': {
				family: 'heading',
				size: '2xl',
				weight: 'strong',
				'line-height': 'compact',
			},
			'heading-md': {
				family: 'heading',
				size: 'xl',
				weight: 'strong',
				'line-height': 'compact',
			},
			'heading-sm': {
				family: 'heading',
				size: 'lg',
				weight: 'emphasis',
				'line-height': 'compact',
			},
			'body-lg': {
				family: 'body',
				size: 'lg',
				weight: 'default',
				'line-height': 'default',
			},
			'body-md': {
				family: 'body',
				size: 'md',
				weight: 'default',
				'line-height': 'default',
			},
			'body-sm': {
				family: 'body',
				size: 'sm',
				weight: 'default',
				'line-height': 'default',
			},
		},
	},
};
