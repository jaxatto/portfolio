import {
	primitiveColors as color,
	primitiveSizes as size,
	primitiveTypography as typography,
} from './primitives';
import { SemanticTheme } from './types';

export const defaultTheme: SemanticTheme = {
	name: 'Default Brand',
	colors: {
		content: {
			default: {
				light: color.sage[900],
				dark: color.sage[50],
			},
			muted: {
				light: color.sage[700],
				dark: color.sage[300],
			},
		},
		surface: {
			default: {
				light: color.white[100],
				dark: color.black[100],
			},
			sunken: {
				light: color.sage[100],
				dark: color.sage[900],
			},
			transparent: {
				light: color.white[0],
				dark: color.black[0],
			},
		},
		border: {
			decorative: {
				light: color.sage[300],
				dark: color.sage[700],
			},
		},
		primary: {
			default: {
				light: color.violet[700],
				dark: color.violet[300],
			},
			'on-primary': {
				light: color.white[100],
				dark: color.black[100],
			},
			'primary-container': {
				light: color.violet[100],
				dark: color.violet[800],
			},
			'on-primary-container': {
				light: color.violet[900],
				dark: color.violet[100],
			},
		},
		secondary: {
			default: {
				light: color.sky[700],
				dark: color.sky[300],
			},
			'on-secondary': {
				light: color.white[100],
				dark: color.black[100],
			},
			'secondary-container': {
				light: color.sky[100],
				dark: color.sky[800],
			},
			'on-secondary-container': {
				light: color.sky[900],
				dark: color.sky[100],
			},
		},
		tertiary: {
			default: {
				light: color.teal[700],
				dark: color.teal[300],
			},
			'on-tertiary': {
				light: color.white[100],
				dark: color.black[100],
			},
			'tertiary-container': {
				light: color.teal[100],
				dark: color.teal[800],
			},
			'on-tertiary-container': {
				light: color.teal[900],
				dark: color.teal[100],
			},
		},
	},
	sizes: {
		radius: {
			none: size.radius[0],
			xs: size.radius[4],
			sm: size.radius[8],
			md: size.radius[12],
			lg: size.radius[16],
			xl: size.radius[24],
		},
		space: {
			none: size.space[0],
			'2xs': size.space[0],
			xs: size.space[4],
			sm: size.space[8],
			md: size.space[12],
			lg: size.space[16],
			xl: size.space[20],
			'2xl': size.space[24],
			'3xl': size.space[32],
			'4xl': size.space[40],
			'section-sm': size.space[40],
			'section-md': size.space[56],
			'section-lg': size.space[64],
			'section-xl': size.space[80],
		},
		breakpoint: {
			xs: size.breakpoint[320],
			sm: size.breakpoint[640],
			md: size.breakpoint[768],
			lg: size.breakpoint[1024],
			xl: size.breakpoint[1280],
			'2xl': size.breakpoint[1536],
		},
		layout: {
			gutter: 'lg',
			'content-max': '960px',
			'popout-max': '1100px',
		},
	},
	typography: {
		fontFamily: {
			heading: typography.fontFamily.inter,
			body: typography.fontFamily.manrope,
			decorative: typography.fontFamily.manrope,
			mono: typography.fontFamily['roboto-mono'],
		},
		fontSize: {
			xs: typography.fontSize[12],
			sm: typography.fontSize[14],
			md: typography.fontSize[16],
			lg: typography.fontSize[18],
			xl: typography.fontSize[20],
			'2xl': typography.fontSize[24],
			'3xl': typography.fontSize[32],
		},
		fontWeight: {
			subtle: typography.fontWeight.light,
			default: typography.fontWeight.regular,
			emphasis: typography.fontWeight.medium,
			strong: typography.fontWeight.semibold,
			'extra-strong': typography.fontWeight.bold,
		},
		lineHeight: {
			compact: typography.lineHeight['1.2'],
			default: typography.lineHeight['1.5'],
			relaxed: typography.lineHeight['1.6'],
		},
		letterSpacing: {
			compact: typography.letterSpacing['negative-02'],
			default: typography.letterSpacing[0],
			relaxed: typography.letterSpacing['02'],
		},
		textTransform: {
			none: typography.textTransform.none,
			uppercase: typography.textTransform.uppercase,
			lowercase: typography.textTransform.lowercase,
			capitalize: typography.textTransform.capitalize,
		},
		textDecoration: {
			none: typography.textDecoration.none,
			underline: typography.textDecoration.underline,
			'line-through': typography.textDecoration['line-through'],
		},
		textDecorationStyle: {
			solid: typography.textDecorationStyle.solid,
			dotted: typography.textDecorationStyle.dotted,
			dashed: typography.textDecorationStyle.dashed,
			double: typography.textDecorationStyle.double,
		},
		textDecorationThickness: {
			auto: typography.textDecorationThickness.auto,
			sm: typography.textDecorationThickness['1'],
			md: typography.textDecorationThickness['2'],
		},
		textUnderlineOffset: {
			auto: typography.textUnderlineOffset.auto,
			sm: typography.textUnderlineOffset['2'],
			md: typography.textUnderlineOffset['4'],
		},
		styles: {
			'heading-lg': {
				fontFamily: 'heading',
				fontSize: '2xl',
				fontWeight: 'strong',
				lineHeight: 'compact',
			},
			'heading-md': {
				fontFamily: 'heading',
				fontSize: 'xl',
				fontWeight: 'strong',
				lineHeight: 'compact',
			},
			'heading-sm': {
				fontFamily: 'heading',
				fontSize: 'lg',
				fontWeight: 'emphasis',
				lineHeight: 'compact',
			},
			'body-lg': {
				fontFamily: 'body',
				fontSize: 'lg',
				fontWeight: 'default',
				lineHeight: 'default',
			},
			'body-md': {
				fontFamily: 'body',
				fontSize: 'md',
				fontWeight: 'default',
				lineHeight: 'default',
			},
			'body-sm': {
				fontFamily: 'body',
				fontSize: 'sm',
				fontWeight: 'default',
				lineHeight: 'default',
			},
		},
	},
};
