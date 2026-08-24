/* primitives.ts */

/* ------------------------------------------------------------- */
/* -- Helper Generator ----------------------------------------- */
/* ------------------------------------------------------------- */

/**
 * Maps an array of raw numbers into an object record of `${N}px` string values.
 * Maintains strict string-literal types for autocompletion.
 */
const createPxRecord = <const T extends readonly number[]>(values: T) =>
	Object.fromEntries(values.map((v) => [v, `${v}px`])) as {
		[K in T[number]]: `${K}px`;
	};

/* ------------------------------------------------------------- */
/* -- Color ---------------------------------------------------- */
/* ------------------------------------------------------------- */

const primitiveColors = {
	lime: {
		50: '#EDFFE9',
		100: '#BCFFAB',
		200: '#A1E68F',
		300: '#8FCC7F',
		400: '#79AE6C',
		500: '#65915A',
		600: '#54794B',
		700: '#3B5434',
		800: '#1D2919',
		900: '#0D120B',
	},
	teal: {
		50: '#F4FBF9',
		100: '#DAF3EB',
		200: '#A3E1CE',
		300: '#6BCFAF',
		400: '#4CB292',
		500: '#40957A',
		600: '#357C65',
		700: '#255647',
		800: '#122A22',
		900: '#081310',
	},
	sky: {
		50: '#F7FBFC',
		100: '#E3F0F4',
		200: '#B9DAE4',
		300: '#91C5D4',
		400: '#5FABC0',
		500: '#2F91AD',
		600: '#117997',
		700: '#0C5569',
		800: '#062A34',
		900: '#031318',
	},
	violet: {
		50: '#FBF9FD',
		100: '#F1EBF9',
		200: '#DECFF0',
		300: '#CBB3E7',
		400: '#B492DD',
		500: '#9E72D3',
		600: '#8955C9',
		700: '#662AAF',
		800: '#331557',
		900: '#180A28',
	},
	charcoal: {
		50: '#FAFAFA',
		100: '#EEEEEE',
		200: '#D4D4D5',
		300: '#BDBDBE',
		400: '#A0A0A2',
		500: '#868688',
		600: '#6F6F71',
		700: '#4D4D50',
		800: '#252528',
		900: '#111113',
	},
	sage: {
		50: '#F9FAF9',
		100: '#ECEEEC',
		200: '#D1D6D2',
		300: '#B7BFB8',
		400: '#99A39A',
		500: '#7C8A7E',
		600: '#637465',
		700: '#445146',
		800: '#212722',
		900: '#0F120F',
	},
	black: {
		0: 'rgba(0, 0, 0, 0)',
		4: 'rgba(0, 0, 0, 0.04)',
		6: 'rgba(0, 0, 0, 0.06)',
		8: 'rgba(0, 0, 0, 0.08)',
		12: 'rgba(0, 0, 0, 0.12)',
		16: 'rgba(0, 0, 0, 0.16)',
		20: 'rgba(0, 0, 0, 0.2)',
		24: 'rgba(0, 0, 0, 0.24)',
		32: 'rgba(0, 0, 0, 0.32)',
		40: 'rgba(0, 0, 0, 0.4)',
		50: 'rgba(0, 0, 0, 0.5)',
		60: 'rgba(0, 0, 0, 0.6)',
		70: 'rgba(0, 0, 0, 0.7)',
		80: 'rgba(0, 0, 0, 0.8)',
		90: 'rgba(0, 0, 0, 0.9)',
		100: 'rgba(0, 0, 0, 1)',
	},
	white: {
		0: 'rgba(255, 255, 255, 0)',
		4: 'rgba(255, 255, 255, 0.04)',
		6: 'rgba(255, 255, 255, 0.06)',
		8: 'rgba(255, 255, 255, 0.08)',
		12: 'rgba(255, 255, 255, 0.12)',
		16: 'rgba(255, 255, 255, 0.16)',
		20: 'rgba(255, 255, 255, 0.2)',
		24: 'rgba(255, 255, 255, 0.24)',
		32: 'rgba(255, 255, 255, 0.32)',
		40: 'rgba(255, 255, 255, 0.4)',
		50: 'rgba(255, 255, 255, 0.5)',
		60: 'rgba(255, 255, 255, 0.6)',
		70: 'rgba(255, 255, 255, 0.7)',
		80: 'rgba(255, 255, 255, 0.8)',
		90: 'rgba(255, 255, 255, 0.9)',
		100: 'rgba(255, 255, 255, 1)',
	},
} as const;

/* ------------------------------------------------------------- */
/* -- Typography ------------------------------------------------ */
/* ------------------------------------------------------------- */

const fontSizeScale = [12, 14, 16, 18, 20, 24, 32, 40, 48, 56, 64] as const;

const primitiveTypography = {
	size: createPxRecord(fontSizeScale),
	family: {
		inter: "'Inter', sans-serif",
		manrope: "'Manrope', sans-serif",
		'roboto-mono': "'Roboto Mono', monospace",
	},
	'line-height': {
		'1-1': 1.1,
		'1-2': 1.2,
		'1-3': 1.3,
		'1-4': 1.4,
		'1-5': 1.5,
		'1-6': 1.6,
	},
	weight: {
		light: 300,
		regular: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		black: 900,
		300: 300,
		400: 400,
		500: 500,
		600: 600,
		700: 700,
		900: 900,
	},
	'letter-spacing': {
		'negative-05': '-0.05em',
		'negative-02': '-0.02em',
		0: '0em',
		'02': '0.02em',
		'05': '0.05em',
	},
} as const;

/* ------------------------------------------------------------- */
/* -- Size ----------------------------------------------------- */
/* ------------------------------------------------------------- */

const spaceScale = [0, 4, 8, 12, 16, 20, 24, 32, 40, 56, 64, 80] as const;
const radiusScale = [0, 4, 8, 12, 16, 20, 24] as const;
const breakpointScale = [320, 640, 768, 1024, 1280, 1536] as const;

const primitiveSizes = {
	space: createPxRecord(spaceScale),
	radius: {
		...createPxRecord(radiusScale),
		full: '9999px',
	},
	breakpoint: createPxRecord(breakpointScale),
} as const;

/* ------------------------------------------------------------- */
/* -- Single Export & Type ------------------------------------- */
/* ------------------------------------------------------------- */

export const primitives = {
	colors: primitiveColors,
	font: primitiveTypography,
	sizes: primitiveSizes,
} as const;

export type Primitives = typeof primitives;
