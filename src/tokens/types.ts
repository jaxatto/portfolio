/* types.ts */

import { type Primitives } from './primitives';

/* ------------------------------------------------------------- */
/* -- Color  --------------------------------------------------- */
/* ------------------------------------------------------------- */

export type ColorFamily = keyof Primitives['colors'];
export type ColorStep<TFamily extends ColorFamily> =
	keyof Primitives['colors'][TFamily];

export type ColorMode = {
	light: string;
	dark: string;
};

export type ColorGroup = 'brand' | 'primary' | 'secondary' | 'tertiary';

type DynamicColorPairings<TGroup extends string> = {
	[K in `on-${TGroup}`]: ColorMode;
} & {
	[K in `${TGroup}-container`]: ColorMode;
} & {
	[K in `on-${TGroup}-container`]: ColorMode;
};

export type ColorPairingGroup<TGroup extends string> = {
	default: ColorMode;
} & DynamicColorPairings<TGroup>;

export type SemanticBrandColors = {
	[K in ColorGroup]: ColorPairingGroup<K>;
};

export type SemanticGeneralColor = {
	content: {
		default: ColorMode;
		muted: ColorMode;
		inverse: ColorMode;
	};
	surface: {
		default: ColorMode;
		sunken: ColorMode;
		transparent: ColorMode;
	};
	border: {
		decorative: ColorMode;
	};
	state: {
		'focus-ring': ColorMode;
		'overlay-hover': ColorMode;
		'overlay-active': ColorMode;
		'overlay-hover-inverse': ColorMode;
		'overlay-active-inverse': ColorMode;
	};
};

export type SemanticThemeColors = SemanticGeneralColor & SemanticBrandColors;

/* ------------------------------------------------------------- */
/* -- Typography  ---------------------------------------------- */
/* ------------------------------------------------------------- */

export type TypographyCategory = keyof Primitives['font'];
export type TypographyStep<TCategory extends TypographyCategory> =
	keyof Primitives['font'][TCategory];

export type TextStyleDefinition = {
	family: keyof SemanticThemeTypography['family'];
	size: keyof SemanticThemeTypography['size'] | FluidValue;
	weight: keyof SemanticThemeTypography['weight'];
	'line-height': keyof SemanticThemeTypography['line-height'];
	'letter-spacing'?: keyof SemanticThemeTypography['letter-spacing'];
	'text-transform'?: keyof NonNullable<
		SemanticThemeTypography['text-transform']
	>;
	'text-decoration'?: keyof NonNullable<
		SemanticThemeTypography['text-decoration']
	>;
	'text-decoration-thickness'?: keyof NonNullable<
		SemanticThemeTypography['text-decoration-thickness']
	>;
	'text-underline-offset'?: keyof NonNullable<
		SemanticThemeTypography['text-underline-offset']
	>;
};

export type TextStyleKey =
	| `${'title'}-${'sm' | 'md'}`
	| `${'heading' | 'display'}-${'sm' | 'md' | 'lg'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}-${'bold' | 'link' | 'strike-through'}`;

export type SemanticThemeTypography = {
	family: Record<string, string>;
	size: Record<string, string>;
	weight: Record<string, number>;
	'line-height': Record<string, number>;
	'letter-spacing'?: Record<string, string>;
	'text-transform'?: Record<string, string>;
	'text-decoration'?: Record<string, string>;
	'text-decoration-thickness'?: Record<string, string>;
	'text-underline-offset'?: Record<string, string>;
	styles: Partial<Record<TextStyleKey, TextStyleDefinition>>;
};

export type FluidValue = {
	min: keyof SemanticThemeTypography['size'];
	preferred: string;
	max: keyof SemanticThemeTypography['size'];
};

/* ------------------------------------------------------------- */
/* -- Size  ---------------------------------------------------- */
/* ------------------------------------------------------------- */

export type SizeCategory = keyof Primitives['sizes'];
export type SizeStep<TCategory extends SizeCategory> =
	keyof Primitives['sizes'][TCategory];

// Helper type to decouple the generic definition from the specific layout properties
type BaseSemanticThemeSizes = {
	[K in SizeCategory]: Record<string, string>;
};

export type SemanticThemeSizes = BaseSemanticThemeSizes & {
	layout: {
		gutter: keyof BaseSemanticThemeSizes['space'];
		'content-max': string;
		'popout-max': string;
	};
	'border-width': {
		none: keyof BaseSemanticThemeSizes['border-width'];
		thin: keyof BaseSemanticThemeSizes['border-width'];
		default: keyof BaseSemanticThemeSizes['border-width'];
		thick: keyof BaseSemanticThemeSizes['border-width'];
	};
};

/* ------------------------------------------------------------- */
/* -- Theme  --------------------------------------------------- */
/* ------------------------------------------------------------- */

export type SemanticTheme = {
	name: string;
	colors: SemanticThemeColors;
	font: SemanticThemeTypography;
	sizes: SemanticThemeSizes;
};
