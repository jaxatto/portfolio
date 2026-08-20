import { primitiveColors } from './primitives';

export const semanticColors = {
	content: {
		default: {
			light: primitiveColors.sage[900],
			dark: primitiveColors.sage[50],
		},
		muted: {
			light: primitiveColors.sage[700],
			dark: primitiveColors.sage[300],
		},
		inverse: {
			light: primitiveColors.sage[50],
			dark: primitiveColors.sage[900],
		},
	},
	primary: {
		default: {
			light: primitiveColors.violet[700],
			dark: primitiveColors.violet[300],
		},
		'on-primary': {
			light: primitiveColors.white[100],
			dark: primitiveColors.black[100],
		},
		'primary-container': {
			light: primitiveColors.violet[100],
			dark: primitiveColors.violet[800],
		},
		'on-primary-container': {
			light: primitiveColors.violet[900],
			dark: primitiveColors.violet[100],
		},
	},
};
