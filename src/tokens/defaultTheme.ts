/* defaultTheme.ts */

import { primitives } from './primitives';
import { withInteractionStates } from './colorSteps';
import {
	type BaseSemanticThemeColors,
	type SemanticTheme,
	type SemanticThemeShadow,
} from './types';
import { colorGroups } from './constants';

const theme: Omit<SemanticTheme, 'colors' | 'shadow'> & {
	colors: BaseSemanticThemeColors;
	shadow: Pick<SemanticThemeShadow, 'blur' | 'spread' | 'x' | 'y'>;
} = {
	name: 'Default Theme',
	colors: {
		content: {
			default: {
				light: primitives.colors.purple[950],
				dark: primitives.colors.purple[50],
			},
			variant: {
				light: primitives.colors.slate[900],
				dark: primitives.colors.slate[100],
			},
			muted: {
				light: primitives.colors.slate[600],
				dark: primitives.colors.slate[400],
			},
			link: {
				light: primitives.colors.violet[700],
				dark: primitives.colors.violet[300],
			},
			inverse: {
				light: primitives.colors.white,
				dark: primitives.colors.black,
			},
		},
		surface: {
			default: {
				light: primitives.colors.white,
				dark: primitives.colors.slate[900],
			},
			sunken: {
				light: primitives.colors.slate[200],
				dark: primitives.colors.slate[800],
			},
		},
		border: {
			decorative: {
				light: primitives.colors.slate[300],
				dark: primitives.colors.slate[700],
			},
		},
		brand: {
			default: {
				light: primitives.colors.purple[800],
				dark: primitives.colors.purple[300],
			},
			'on-brand': {
				light: primitives.colors.white,
				dark: primitives.colors.black,
			},
			'brand-container': {
				light: primitives.colors.purple[200],
				dark: primitives.colors.purple[800],
			},
			'on-brand-container': {
				light: primitives.colors.purple[900],
				dark: primitives.colors.purple[100],
			},
		},
		primary: {
			default: {
				light: primitives.colors.violet[700],
				dark: primitives.colors.violet[300],
			},
			'on-primary': {
				light: primitives.colors.white,
				dark: primitives.colors.black,
			},
			'primary-container': {
				light: primitives.colors.violet[200],
				dark: primitives.colors.violet[800],
			},
			'on-primary-container': {
				light: primitives.colors.violet[900],
				dark: primitives.colors.violet[100],
			},
		},
		secondary: {
			default: {
				light: primitives.colors.indigo[700],
				dark: primitives.colors.indigo[300],
			},
			'on-secondary': {
				light: primitives.colors.white,
				dark: primitives.colors.black,
			},
			'secondary-container': {
				light: primitives.colors.indigo[200],
				dark: primitives.colors.indigo[800],
			},
			'on-secondary-container': {
				light: primitives.colors.indigo[900],
				dark: primitives.colors.indigo[100],
			},
		},
		tertiary: {
			default: {
				light: primitives.colors.sky[700],
				dark: primitives.colors.sky[300],
			},
			'on-tertiary': {
				light: primitives.colors.white,
				dark: primitives.colors.black,
			},
			'tertiary-container': {
				light: primitives.colors.sky[200],
				dark: primitives.colors.sky[800],
			},
			'on-tertiary-container': {
				light: primitives.colors.sky[900],
				dark: primitives.colors.sky[100],
			},
		},
		state: {
			'focus-ring': {
				light: primitives.colors.purple[950],
				dark: primitives.colors.white,
			},
			'overlay-tint': {
				light: primitives.colors.indigo[900],
				dark: primitives.colors.indigo[100],
			},
			'overlay-tint-inverse': {
				light: primitives.colors.indigo[100],
				dark: primitives.colors.indigo[900],
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
			xs: primitives.sizes.space[4],
			sm: primitives.sizes.space[8],
			md: primitives.sizes.space[12],
			lg: primitives.sizes.space[16],
			xl: primitives.sizes.space[20],
			'2xl': primitives.sizes.space[24],
			'3xl': primitives.sizes.space[32],
			'4xl': primitives.sizes.space[40],
			'section-sm': primitives.sizes.space[48],
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
		'border-width': {
			none: primitives.sizes['border-width'][0],
			thin: primitives.sizes['border-width'][1],
			default: primitives.sizes['border-width'][2],
			thick: primitives.sizes['border-width'][4],
		},
	},
	shadow: {
		blur: {
			none: primitives.shadow.blur[0],
			sm: primitives.shadow.blur[8],
			md: primitives.shadow.blur[16],
			xl: primitives.shadow.blur[40],
			'2xl': primitives.shadow.blur[56],
			'3xl': primitives.shadow.blur[64],
		},
		spread: {
			none: primitives.shadow.spread[0],
			lg: primitives.shadow.spread[8],
			xl: primitives.shadow.spread[16],
			'2xl': primitives.shadow.spread[20],
		},
		x: {
			none: primitives.shadow.x[0],
		},
		y: {
			none: primitives.shadow.y[0],
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
			lg: primitives.font.size[20],
			xl: primitives.font.size[24],
			'2xl': primitives.font.size[32],
			'3xl': primitives.font.size[40],
			'4xl': primitives.font.size[48],
			'5xl': primitives.font.size[56],
		},
		weight: {
			subtle: primitives.font.weight.light,
			default: primitives.font.weight.regular,
			emphasis: primitives.font.weight.bold,
			strong: primitives.font.weight.black,
		},
		'line-height': {
			compact: primitives.font['line-height']['1-2'],
			default: primitives.font['line-height']['1-5'],
			relaxed: primitives.font['line-height']['1-6'],
		},
		'letter-spacing': {
			compact: primitives.font['letter-spacing']['negative-02'],
			default: primitives.font['letter-spacing']['none'],
			relaxed: primitives.font['letter-spacing']['02'],
		},
		'text-transform': {
			none: primitives.font['text-transform']['none'],
			uppercase: primitives.font['text-transform']['uppercase'],
			lowercase: primitives.font['text-transform']['lowercase'],
			'all-caps': primitives.font['text-transform']['capitalize'],
		},
		'text-decoration': {
			none: primitives.font['text-decoration']['none'],
			underline: primitives.font['text-decoration']['underline'],
			'strike-through': primitives.font['text-decoration']['line-through'],
		},
		'text-decoration-thickness': {
			auto: primitives.font['text-decoration-thickness']['auto'],
			sm: primitives.font['text-decoration-thickness']['1'],
			md: primitives.font['text-decoration-thickness']['2'],
		},
		'text-underline-offset': {
			auto: primitives.font['text-underline-offset']['auto'],
			sm: primitives.font['text-underline-offset']['1'],
			md: primitives.font['text-underline-offset']['2'],
		},
		styles: {
			'title-md': {
				family: 'heading',
				size: {
					min: '3xl',
					preferred: '1rem + 1.4vw',
					max: '5xl',
				},
				weight: 'strong',
				'line-height': 'compact',
			},
			'title-sm': {
				family: 'heading',
				size: {
					min: '2xl',
					preferred: '1rem + 1.4vw',
					max: '3xl',
				},
				weight: 'strong',
				'line-height': 'compact',
			},
			'heading-lg': {
				family: 'heading',
				size: {
					min: 'xl',
					preferred: '1rem + 1.4vw',
					max: '2xl',
				},
				weight: 'strong',
				'line-height': 'compact',
			},
			'heading-md': {
				family: 'heading',
				size: {
					min: 'lg',
					preferred: '1.1rem + 0.7vw',
					max: 'xl',
				},
				weight: 'strong',
				'line-height': 'compact',
			},
			'heading-sm': {
				family: 'heading',
				size: {
					min: 'md',
					preferred: '1.1rem + 0.7vw',
					max: 'lg',
				},
				weight: 'strong',
				'line-height': 'compact',
			},
			'body-lg': {
				family: 'body',
				size: {
					min: 'md',
					preferred: '0.875rem + 1.4vw',
					max: 'xl',
				},
				weight: 'default',
				'line-height': 'default',
			},
			'body-md': {
				family: 'body',
				size: {
					min: 'md',
					preferred: '0.875rem + 0.7vw',
					max: 'lg',
				},
				weight: 'default',
				'line-height': 'default',
			},
			'body-sm': {
				family: 'body',
				size: {
					min: 'sm',
					preferred: '0.8rem + 0.35vw',
					max: 'md',
				},
				weight: 'default',
				'line-height': 'default',
			},
		},
	},
};

const colors = withInteractionStates(theme.colors);
const shadowColors = Object.fromEntries(
	colorGroups.map((group) => [
		group,
		{
			default: {
				color: colors[group].default,
				opacity: primitives.utils.opacity[40],
			},
			hover: {
				color: colors[group]['default-hover'],
				opacity: primitives.utils.opacity[48],
			},
			active: {
				color: colors[group]['default-active'],
				opacity: primitives.utils.opacity[48],
			},
		},
	]),
) as Pick<SemanticThemeShadow, (typeof colorGroups)[number]>;

export const defaultTheme: SemanticTheme = {
	...theme,
	colors,
	shadow: {
		...theme.shadow,
		color: {
			default: {
				color: {
					light: primitives.colors.slate[800],
					dark: primitives.colors.slate[800],
				},
				opacity: primitives.utils.opacity[10],
			},
		},
		...shadowColors,
	},
};
