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

const createPercentRecord = <const T extends readonly number[]>(values: T) =>
	Object.fromEntries(values.map((v) => [v, `${v}%`])) as {
		[K in T[number]]: `${K}%`;
	};

/* ------------------------------------------------------------- */
/* -- Color ---------------------------------------------------- */
/* ------------------------------------------------------------- */

const opacityScale = [
	0, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 76, 80, 90, 100,
] as const;

const primitiveColors = {
	red: {
		50: 'oklch(97.1% 0.013 17.38deg)',
		100: 'oklch(93.6% 0.032 17.717deg)',
		200: 'oklch(88.5% 0.062 18.334deg)',
		300: 'oklch(80.8% 0.114 19.571deg)',
		400: 'oklch(70.4% 0.191 22.216deg)',
		500: 'oklch(63.7% 0.237 25.331deg)',
		600: 'oklch(57.7% 0.245 27.325deg)',
		700: 'oklch(50.5% 0.213 27.518deg)',
		800: 'oklch(44.4% 0.177 26.899deg)',
		900: 'oklch(39.6% 0.141 25.723deg)',
		950: 'oklch(25.8% 0.092 26.042deg)',
	},
	orange: {
		50: 'oklch(98% 0.016 73.684deg)',
		100: 'oklch(95.4% 0.038 75.164deg)',
		200: 'oklch(90.1% 0.076 70.697deg)',
		300: 'oklch(83.7% 0.128 66.29deg)',
		400: 'oklch(75% 0.183 55.934deg)',
		500: 'oklch(70.5% 0.213 47.604deg)',
		600: 'oklch(64.6% 0.222 41.116deg)',
		700: 'oklch(55.3% 0.195 38.402deg)',
		800: 'oklch(47% 0.157 37.304deg)',
		900: 'oklch(40.8% 0.123 38.172deg)',
		950: 'oklch(26.6% 0.079 36.259deg)',
	},
	amber: {
		50: 'oklch(98.7% 0.022 95.277deg)',
		100: 'oklch(96.2% 0.059 95.617deg)',
		200: 'oklch(92.4% 0.12 95.746deg)',
		300: 'oklch(87.9% 0.169 91.605deg)',
		400: 'oklch(82.8% 0.189 84.429deg)',
		500: 'oklch(76.9% 0.188 70.08deg)',
		600: 'oklch(66.6% 0.179 58.318deg)',
		700: 'oklch(55.5% 0.163 48.998deg)',
		800: 'oklch(47.3% 0.137 46.201deg)',
		900: 'oklch(41.4% 0.112 45.904deg)',
		950: 'oklch(27.9% 0.077 45.635deg)',
	},
	yellow: {
		50: 'oklch(98.7% 0.026 102.212deg)',
		100: 'oklch(97.3% 0.071 103.193deg)',
		200: 'oklch(94.5% 0.129 101.54deg)',
		300: 'oklch(90.5% 0.182 98.111deg)',
		400: 'oklch(85.2% 0.199 91.936deg)',
		500: 'oklch(79.5% 0.184 86.047deg)',
		600: 'oklch(68.1% 0.162 75.834deg)',
		700: 'oklch(55.4% 0.135 66.442deg)',
		800: 'oklch(47.6% 0.114 61.907deg)',
		900: 'oklch(42.1% 0.095 57.708deg)',
		950: 'oklch(28.6% 0.066 53.813deg)',
	},
	lime: {
		50: 'oklch(98.6% 0.031 120.757deg)',
		100: 'oklch(96.7% 0.067 122.328deg)',
		200: 'oklch(93.8% 0.127 124.321deg)',
		300: 'oklch(89.7% 0.196 126.665deg)',
		400: 'oklch(84.1% 0.238 128.85deg)',
		500: 'oklch(76.8% 0.233 130.85deg)',
		600: 'oklch(64.8% 0.2 131.684deg)',
		700: 'oklch(53.2% 0.157 131.589deg)',
		800: 'oklch(45.3% 0.124 130.933deg)',
		900: 'oklch(40.5% 0.101 131.063deg)',
		950: 'oklch(27.4% 0.072 132.109deg)',
	},
	green: {
		50: 'oklch(98.2% 0.018 155.826deg)',
		100: 'oklch(96.2% 0.044 156.743deg)',
		200: 'oklch(92.5% 0.084 155.995deg)',
		300: 'oklch(87.1% 0.15 154.449deg)',
		400: 'oklch(79.2% 0.209 151.711deg)',
		500: 'oklch(72.3% 0.219 149.579deg)',
		600: 'oklch(62.7% 0.194 149.214deg)',
		700: 'oklch(52.7% 0.154 150.069deg)',
		800: 'oklch(44.8% 0.119 151.328deg)',
		900: 'oklch(39.3% 0.095 152.535deg)',
		950: 'oklch(26.6% 0.065 152.934deg)',
	},
	emerald: {
		50: 'oklch(97.9% 0.021 166.113deg)',
		100: 'oklch(95% 0.052 163.051deg)',
		200: 'oklch(90.5% 0.093 164.15deg)',
		300: 'oklch(84.5% 0.143 164.978deg)',
		400: 'oklch(76.5% 0.177 163.223deg)',
		500: 'oklch(69.6% 0.17 162.48deg)',
		600: 'oklch(59.6% 0.145 163.225deg)',
		700: 'oklch(50.8% 0.118 165.612deg)',
		800: 'oklch(43.2% 0.095 166.913deg)',
		900: 'oklch(37.8% 0.077 168.94deg)',
		950: 'oklch(26.2% 0.051 172.552deg)',
	},
	teal: {
		50: 'oklch(98.4% 0.014 180.72deg)',
		100: 'oklch(95.3% 0.051 180.801deg)',
		200: 'oklch(91% 0.096 180.426deg)',
		300: 'oklch(85.5% 0.138 181.071deg)',
		400: 'oklch(77.7% 0.152 181.912deg)',
		500: 'oklch(70.4% 0.14 182.503deg)',
		600: 'oklch(60% 0.118 184.704deg)',
		700: 'oklch(51.1% 0.096 186.391deg)',
		800: 'oklch(43.7% 0.078 188.216deg)',
		900: 'oklch(38.6% 0.063 188.416deg)',
		950: 'oklch(27.7% 0.046 192.524deg)',
	},
	cyan: {
		50: 'oklch(98.4% 0.019 200.873deg)',
		100: 'oklch(95.6% 0.045 203.388deg)',
		200: 'oklch(91.7% 0.08 205.041deg)',
		300: 'oklch(86.5% 0.127 207.078deg)',
		400: 'oklch(78.9% 0.154 211.53deg)',
		500: 'oklch(71.5% 0.143 215.221deg)',
		600: 'oklch(60.9% 0.126 221.723deg)',
		700: 'oklch(52% 0.105 223.128deg)',
		800: 'oklch(45% 0.085 224.283deg)',
		900: 'oklch(39.8% 0.07 227.392deg)',
		950: 'oklch(30.2% 0.056 229.695deg)',
	},
	sky: {
		50: 'oklch(97.7% 0.013 236.62deg)',
		100: 'oklch(95.1% 0.026 236.824deg)',
		200: 'oklch(90.1% 0.058 230.902deg)',
		300: 'oklch(82.8% 0.111 230.318deg)',
		400: 'oklch(74.6% 0.16 232.661deg)',
		500: 'oklch(68.5% 0.169 237.323deg)',
		600: 'oklch(58.8% 0.158 241.966deg)',
		700: 'oklch(50% 0.134 242.749deg)',
		800: 'oklch(44.3% 0.11 240.79deg)',
		900: 'oklch(39.1% 0.09 240.876deg)',
		950: 'oklch(29.3% 0.066 243.157deg)',
	},
	blue: {
		50: 'oklch(97% 0.014 254.604deg)',
		100: 'oklch(93.2% 0.032 255.585deg)',
		200: 'oklch(88.2% 0.059 254.128deg)',
		300: 'oklch(80.9% 0.105 251.813deg)',
		400: 'oklch(70.7% 0.165 254.624deg)',
		500: 'oklch(62.3% 0.214 259.815deg)',
		600: 'oklch(54.6% 0.245 262.881deg)',
		700: 'oklch(48.8% 0.243 264.376deg)',
		800: 'oklch(42.4% 0.199 265.638deg)',
		900: 'oklch(37.9% 0.146 265.522deg)',
		950: 'oklch(28.2% 0.091 267.935deg)',
	},
	indigo: {
		50: 'oklch(96.2% 0.018 272.314deg)',
		100: 'oklch(93% 0.034 272.788deg)',
		200: 'oklch(87% 0.065 274.039deg)',
		300: 'oklch(78.5% 0.115 274.713deg)',
		400: 'oklch(67.3% 0.182 276.935deg)',
		500: 'oklch(58.5% 0.233 277.117deg)',
		600: 'oklch(51.1% 0.262 276.966deg)',
		700: 'oklch(45.7% 0.24 277.023deg)',
		800: 'oklch(39.8% 0.195 277.366deg)',
		900: 'oklch(35.9% 0.144 278.697deg)',
		950: 'oklch(25.7% 0.09 281.288deg)',
	},
	violet: {
		50: 'oklch(96.9% 0.016 293.756deg)',
		100: 'oklch(94.3% 0.029 294.588deg)',
		200: 'oklch(89.4% 0.057 293.283deg)',
		300: 'oklch(81.1% 0.111 293.571deg)',
		400: 'oklch(70.2% 0.183 293.541deg)',
		500: 'oklch(60.6% 0.25 292.717deg)',
		600: 'oklch(54.1% 0.281 293.009deg)',
		700: 'oklch(49.1% 0.27 292.581deg)',
		800: 'oklch(43.2% 0.232 292.759deg)',
		900: 'oklch(38% 0.189 293.745deg)',
		950: 'oklch(28.3% 0.141 291.089deg)',
	},
	purple: {
		50: 'oklch(97.7% 0.014 308.299deg)',
		100: 'oklch(94.6% 0.033 307.174deg)',
		200: 'oklch(90.2% 0.063 306.703deg)',
		300: 'oklch(82.7% 0.119 306.383deg)',
		400: 'oklch(71.4% 0.203 305.504deg)',
		500: 'oklch(62.7% 0.265 303.9deg)',
		600: 'oklch(55.8% 0.288 302.321deg)',
		700: 'oklch(49.6% 0.265 301.924deg)',
		800: 'oklch(43.8% 0.218 303.724deg)',
		900: 'oklch(38.1% 0.176 304.987deg)',
		950: 'oklch(29.1% 0.149 302.717deg)',
	},
	fuschia: {
		50: 'oklch(97.7% 0.017 320.058deg)',
		100: 'oklch(95.2% 0.037 318.852deg)',
		200: 'oklch(90.3% 0.076 319.62deg)',
		300: 'oklch(83.3% 0.145 321.434deg)',
		400: 'oklch(74% 0.238 322.16deg)',
		500: 'oklch(66.7% 0.295 322.15deg)',
		600: 'oklch(59.1% 0.293 322.896deg)',
		700: 'oklch(51.8% 0.253 323.949deg)',
		800: 'oklch(45.2% 0.211 324.591deg)',
		900: 'oklch(40.1% 0.17 325.612deg)',
		950: 'oklch(29.3% 0.136 325.661deg)',
	},
	pink: {
		50: 'oklch(97.1% 0.014 343.198deg)',
		100: 'oklch(94.8% 0.028 342.258deg)',
		200: 'oklch(89.9% 0.061 343.231deg)',
		300: 'oklch(82.3% 0.12 346.018deg)',
		400: 'oklch(71.8% 0.202 349.761deg)',
		500: 'oklch(65.6% 0.241 354.308deg)',
		600: 'oklch(59.2% 0.249 0.584deg)',
		700: 'oklch(52.5% 0.223 3.958deg)',
		800: 'oklch(45.9% 0.187 3.815deg)',
		900: 'oklch(40.8% 0.153 2.432deg)',
		950: 'oklch(28.4% 0.109 3.907deg)',
	},
	rose: {
		50: 'oklch(96.9% 0.015 12.422deg)',
		100: 'oklch(94.1% 0.03 12.58deg)',
		200: 'oklch(89.2% 0.058 10.001deg)',
		300: 'oklch(81% 0.117 11.638deg)',
		400: 'oklch(71.2% 0.194 13.428deg)',
		500: 'oklch(64.5% 0.246 16.439deg)',
		600: 'oklch(58.6% 0.253 17.585deg)',
		700: 'oklch(51.4% 0.222 16.935deg)',
		800: 'oklch(45.5% 0.188 13.697deg)',
		900: 'oklch(41% 0.159 10.272deg)',
		950: 'oklch(27.1% 0.105 12.094deg)',
	},
	slate: {
		50: 'oklch(98.4% 0.003 247.858deg)',
		100: 'oklch(96.8% 0.007 247.896deg)',
		200: 'oklch(92.9% 0.013 255.508deg)',
		300: 'oklch(86.9% 0.022 252.894deg)',
		400: 'oklch(70.4% 0.04 256.788deg)',
		500: 'oklch(55.4% 0.046 257.417deg)',
		600: 'oklch(44.6% 0.043 257.281deg)',
		700: 'oklch(37.2% 0.044 257.287deg)',
		800: 'oklch(27.9% 0.041 260.031deg)',
		900: 'oklch(20.8% 0.042 265.755deg)',
		950: 'oklch(12.9% 0.042 264.695deg)',
	},
	gray: {
		50: 'oklch(98.5% 0.002 247.839deg)',
		100: 'oklch(96.7% 0.003 264.542deg)',
		200: 'oklch(92.8% 0.006 264.531deg)',
		300: 'oklch(87.2% 0.01 258.338deg)',
		400: 'oklch(70.7% 0.022 261.325deg)',
		500: 'oklch(55.1% 0.027 264.364deg)',
		600: 'oklch(44.6% 0.03 256.802deg)',
		700: 'oklch(37.3% 0.034 259.733deg)',
		800: 'oklch(27.8% 0.033 256.848deg)',
		900: 'oklch(21% 0.034 264.665deg)',
		950: 'oklch(13% 0.028 261.692deg)',
	},
	zinc: {
		50: 'oklch(98.5% 0 0deg)',
		100: 'oklch(96.7% 0.001 286.375deg)',
		200: 'oklch(92% 0.004 286.32deg)',
		300: 'oklch(87.1% 0.006 286.286deg)',
		400: 'oklch(70.5% 0.015 286.067deg)',
		500: 'oklch(55.2% 0.016 285.938deg)',
		600: 'oklch(44.2% 0.017 285.786deg)',
		700: 'oklch(37% 0.013 285.805deg)',
		800: 'oklch(27.4% 0.006 286.033deg)',
		900: 'oklch(21% 0.006 285.885deg)',
		950: 'oklch(14.1% 0.005 285.823deg)',
	},
	neutral: {
		50: 'oklch(98.5% 0 0deg)',
		100: 'oklch(97% 0 0deg)',
		200: 'oklch(92.2% 0 0deg)',
		300: 'oklch(87% 0 0deg)',
		400: 'oklch(70.8% 0 0deg)',
		500: 'oklch(55.6% 0 0deg)',
		600: 'oklch(43.9% 0 0deg)',
		700: 'oklch(37.1% 0 0deg)',
		800: 'oklch(26.9% 0 0deg)',
		900: 'oklch(20.5% 0 0deg)',
		950: 'oklch(14.5% 0 0deg)',
	},
	stone: {
		50: 'oklch(98.5% 0.001 106.423deg)',
		100: 'oklch(97% 0.001 106.424deg)',
		200: 'oklch(92.3% 0.003 48.717deg)',
		300: 'oklch(86.9% 0.005 56.366deg)',
		400: 'oklch(70.9% 0.01 56.259deg)',
		500: 'oklch(55.3% 0.013 58.071deg)',
		600: 'oklch(44.4% 0.011 73.639deg)',
		700: 'oklch(37.4% 0.01 67.558deg)',
		800: 'oklch(26.8% 0.007 34.298deg)',
		900: 'oklch(21.6% 0.006 56.043deg)',
		950: 'oklch(14.7% 0.004 49.25deg)',
	},
	mauve: {
		50: 'oklch(98.5% 0 0deg)',
		100: 'oklch(96% 0.003 325.6deg)',
		200: 'oklch(92.2% 0.005 325.62deg)',
		300: 'oklch(86.5% 0.012 325.68deg)',
		400: 'oklch(71.1% 0.019 323.02deg)',
		500: 'oklch(54.2% 0.034 322.5deg)',
		600: 'oklch(43.5% 0.029 321.78deg)',
		700: 'oklch(36.4% 0.029 323.89deg)',
		800: 'oklch(26.3% 0.024 320.12deg)',
		900: 'oklch(21.2% 0.019 322.12deg)',
		950: 'oklch(14.5% 0.008 326deg)',
	},
	olive: {
		50: 'oklch(98.8% 0.003 106.5deg)',
		100: 'oklch(96.6% 0.005 106.5deg)',
		200: 'oklch(93% 0.007 106.5deg)',
		300: 'oklch(88% 0.011 106.6deg)',
		400: 'oklch(73.7% 0.021 106.9deg)',
		500: 'oklch(58% 0.031 107.3deg)',
		600: 'oklch(46.6% 0.025 107.3deg)',
		700: 'oklch(39.4% 0.023 107.4deg)',
		800: 'oklch(28.6% 0.016 107.4deg)',
		900: 'oklch(22.8% 0.013 107.4deg)',
		950: 'oklch(15.3% 0.006 107.1deg)',
	},
	mist: {
		50: 'oklch(98.7% 0.002 197.1deg)',
		100: 'oklch(96.3% 0.002 197.1deg)',
		200: 'oklch(92.5% 0.005 214.3deg)',
		300: 'oklch(87.2% 0.007 219.6deg)',
		400: 'oklch(72.3% 0.014 214.4deg)',
		500: 'oklch(56% 0.021 213.5deg)',
		600: 'oklch(45% 0.017 213.2deg)',
		700: 'oklch(37.8% 0.015 216deg)',
		800: 'oklch(27.5% 0.011 216.9deg)',
		900: 'oklch(21.8% 0.008 223.9deg)',
		950: 'oklch(14.8% 0.004 228.8deg)',
	},
	taupe: {
		50: 'oklch(98.6% 0.002 67.8deg)',
		100: 'oklch(96% 0.002 17.2deg)',
		200: 'oklch(92.2% 0.005 34.3deg)',
		300: 'oklch(86.8% 0.007 39.5deg)',
		400: 'oklch(71.4% 0.014 41.2deg)',
		500: 'oklch(54.7% 0.021 43.1deg)',
		600: 'oklch(43.8% 0.017 39.3deg)',
		700: 'oklch(36.7% 0.016 35.7deg)',
		800: 'oklch(26.8% 0.011 36.5deg)',
		900: 'oklch(21.4% 0.009 43.1deg)',
		950: 'oklch(14.7% 0.004 49.3deg)',
	},
	black: 'oklch(0% 0 0deg)',
	white: 'oklch(100% 0 0deg)',
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
		none: '0em',
		'02': '0.02em',
		'05': '0.05em',
	},
	'text-transform': {
		none: 'none',
		uppercase: 'uppercase',
		lowercase: 'lowercase',
		capitalize: 'capitalize',
	},
	'text-decoration': {
		none: 'none',
		underline: 'underline',
		'line-through': 'line-through',
	},
	'text-decoration-thickness': {
		auto: 'auto',
		'1': '1px',
		'2': '2px',
		'3': '3px',
		'4': '4px',
	},
	'text-underline-offset': {
		auto: 'auto',
		'1': '1px',
		'2': '2px',
		'3': '3px',
		'4': '4px',
	},
} as const;

/* ------------------------------------------------------------- */
/* -- Size ----------------------------------------------------- */
/* ------------------------------------------------------------- */

const spaceScale = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80] as const;
const radiusScale = [0, 4, 8, 12, 16, 20, 24] as const;
const borderWidthScale = [0, 1, 2, 4] as const;
const breakpointScale = [320, 640, 768, 1024, 1280, 1536] as const;
const shadowBlurScale = [0, 40, 56] as const;
const shadowSpreadScale = [0, 8, 16] as const;
const shadowOffsetScale = [0] as const;

const primitiveSizes = {
	space: {
		...createPxRecord(spaceScale),
	},
	radius: {
		...createPxRecord(radiusScale),
		full: '9999px',
	},
	'border-width': createPxRecord(borderWidthScale),
	breakpoint: createPxRecord(breakpointScale),
} as const;

const primitiveShadow = {
	blur: createPxRecord(shadowBlurScale),
	spread: createPxRecord(shadowSpreadScale),
	x: createPxRecord(shadowOffsetScale),
	y: createPxRecord(shadowOffsetScale),
} as const;

/* ------------------------------------------------------------- */
/* -- Utils ----------------------------------------------------- */
/* ------------------------------------------------------------- */

const primitiveUtils = {
	opacity: createPercentRecord(opacityScale),
};

/* ------------------------------------------------------------- */
/* -- Single Export & Type ------------------------------------- */
/* ------------------------------------------------------------- */

export const primitives = {
	colors: primitiveColors,
	font: primitiveTypography,
	sizes: primitiveSizes,
	shadow: primitiveShadow,
	utils: primitiveUtils,
} as const;

export type Primitives = typeof primitives;
