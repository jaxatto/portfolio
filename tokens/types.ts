import {
	primitiveColors,
	primitiveSizes,
	primitiveTypography,
} from './primitives';

/* ------------------------------------------------------------- */
/* -- Color  --------------------------------------------------- */
/* ------------------------------------------------------------- */

export type ColorFamily = keyof typeof primitiveColors;
export type ColorStep<TFamily extends ColorFamily> =
	keyof (typeof primitiveColors)[TFamily];

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

export type TypographyCategory = keyof typeof primitiveTypography;
export type TypographyStep<TCategory extends TypographyCategory> =
	keyof (typeof primitiveTypography)[TCategory];

export type TextStyleDefinition = {
	fontFamily: keyof SemanticThemeTypography['fontFamily'];
	fontSize: keyof SemanticThemeTypography['fontSize'];
	fontWeight: keyof SemanticThemeTypography['fontWeight'];
	lineHeight: keyof SemanticThemeTypography['lineHeight'];
	letterSpacing?: keyof SemanticThemeTypography['letterSpacing'];
	textTransform?: keyof SemanticThemeTypography['textTransform'];
	textDecoration?: keyof SemanticThemeTypography['textDecoration'];
	textDecorationThickness?: keyof SemanticThemeTypography['textDecorationThickness'];
	textUnderlineOffset?: keyof SemanticThemeTypography['textUnderlineOffset'];
};

export type TextStyleKey =
	| `${'heading' | 'display'}-${'sm' | 'md' | 'lg' | 'xl'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}`
	| `${'body' | 'label'}-${'sm' | 'md' | 'lg'}-${'subtle' | 'link' | 'strike-through'}`;

export type SemanticThemeTypography = Partial<{
	[K in TypographyCategory]: Record<string, string | number>;
}> & {
	fontFamily: Record<string, string | number>;
	fontSize: Record<string, string | number>;
	fontWeight: Record<string, string | number>;
	lineHeight: Record<string, string | number>;
	styles: Partial<Record<TextStyleKey, TextStyleDefinition>>;
};

/* ------------------------------------------------------------- */
/* -- Size  ---------------------------------------------------- */
/* ------------------------------------------------------------- */

export type SizeCategory = keyof typeof primitiveSizes;
export type SizeStep<TCategory extends SizeCategory> =
	keyof (typeof primitiveSizes)[TCategory];

export type SemanticThemeSizes = {
	[K in SizeCategory]: Record<string, string | number>;
} & {
	layout: {
		gutter: keyof SemanticThemeSizes['space'];
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
	typography: SemanticThemeTypography;
	sizes: SemanticThemeSizes;
};
