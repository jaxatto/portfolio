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

export type ColorGroup = 'primary' | 'secondary' | 'tertiary';

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
	};
	surface: {
		default: ColorMode;
		sunken: ColorMode;
		transparent: ColorMode;
	};
	border: {
		decorative: ColorMode;
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
	size: keyof SemanticThemeTypography['size'];
	weight: keyof SemanticThemeTypography['weight'];
	'line-height': keyof SemanticThemeTypography['line-height'];
	'letter-spacing'?: keyof SemanticThemeTypography['letter-spacing'];
	'text-transform'?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
	'text-decoration'?: 'none' | 'underline' | 'line-through';
	'text-decoration-thickness'?: 'auto' | `${number}px`;
	'text-underline-offset'?: 'auto' | `${number}px`;
};

export type TextStyleKey =
	| `${'heading' | 'display'}-${'sm' | 'md' | 'lg' | 'xl'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}-${'subtle' | 'link' | 'strike-through'}`;

export type SemanticThemeTypography = {
	family: Record<string, string>;
	size: Record<string, string>;
	weight: Record<string, number>;
	'line-height': Record<string, number>;
	'letter-spacing'?: Record<string, string>;
	styles: Partial<Record<TextStyleKey, TextStyleDefinition>>;
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
