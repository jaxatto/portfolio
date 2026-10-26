/* types.ts */

import { type Primitives } from './primitives';
import { type colorGroups, type colorModes } from './constants';

/* ------------------------------------------------------------- */
/* -- Color  --------------------------------------------------- */
/* ------------------------------------------------------------- */

export type ColorFamily = keyof Primitives['colors'];
export type ColorStep<TFamily extends ColorFamily> = keyof Primitives['colors'][TFamily];

export type ColorMode = Record<(typeof colorModes)[number], string>;

export type ColorGroup = (typeof colorGroups)[number];

type StatefulPairingKey<TGroup extends string> =
  'default' | `${TGroup}-container` | `on-${TGroup}-container`;
type ForegroundPairingKey<TGroup extends string> = `on-${TGroup}`;

// shape before hover/active states have been derived
export type BaseColorPairingGroup<TGroup extends string> = {
  [K in StatefulPairingKey<TGroup>]: ColorMode;
} & {
  [K in ForegroundPairingKey<TGroup>]: ColorMode;
};

// Only the states a component reads are derived: the container and its foreground (palette.module.css).
type DerivedStateKey<TGroup extends string> =
  `${TGroup}-container-hover` | `on-${TGroup}-container-hover` | `on-${TGroup}-container-active`;

export type ColorPairingGroup<TGroup extends string> = BaseColorPairingGroup<TGroup> & {
  [K in DerivedStateKey<TGroup>]: ColorMode;
};

export type BaseSemanticBrandColors = {
  [K in ColorGroup]: BaseColorPairingGroup<K>;
};

export type SemanticBrandColors = {
  [K in ColorGroup]: ColorPairingGroup<K>;
} & {
  // Solid primary controls and links deepen on hover and press (deepen.module.css).
  primary: { 'default-hover': ColorMode; 'default-active': ColorMode };
};

export type BaseSemanticGeneralColor = {
  content: {
    default: ColorMode;
    variant: ColorMode;
    muted: ColorMode;
    link: ColorMode;
    'on-accent': ColorMode;
    'on-accent-hover': ColorMode;
    'on-accent-active': ColorMode;
    secondary: ColorMode;
    emphasis: ColorMode;
    soft: ColorMode;
    prose: ColorMode;
  };
  surface: {
    default: ColorMode;
    sunken: ColorMode;
    inverse: ColorMode;
  };
  border: {
    decorative: ColorMode;
  };
  state: {
    'focus-ring': ColorMode;
  };
};

export type SemanticGeneralColor = BaseSemanticGeneralColor;

export type SemanticThemeColors = SemanticGeneralColor & SemanticBrandColors;
export type BaseSemanticThemeColors = BaseSemanticGeneralColor & BaseSemanticBrandColors;

/* ------------------------------------------------------------- */
/* -- Typography  ---------------------------------------------- */
/* ------------------------------------------------------------- */

export type TypographyCategory = keyof Primitives['font'];
export type TypographyStep<TCategory extends TypographyCategory> =
  keyof Primitives['font'][TCategory];

export type TextStyleDefinition = {
  family: keyof SemanticThemeTypography['family'];
  size: FluidValue;
  weight: keyof SemanticThemeTypography['weight'];
  'line-height': keyof SemanticThemeTypography['line-height'];
  'letter-spacing'?: keyof SemanticThemeTypography['letter-spacing'];
};

export type TextStyleKey =
  `${'title'}-${'sm' | 'md'}` | `${'heading' | 'body'}-${'sm' | 'md' | 'lg'}`;

export type SemanticThemeTypography = {
  family: Record<string, string>;
  size: Record<string, string>;
  weight: Record<string, number>;
  'line-height': Record<string, number>;
  'letter-spacing'?: Record<string, string>;
  styles: Partial<Record<TextStyleKey, TextStyleDefinition>>;
};

// A fluid size is `clamp(min, preferred, max)`. All three are primitive steps, so a semantic type style
// never holds a raw number.
export type FluidValue = {
  min: keyof Primitives['font']['size'];
  preferred: keyof Primitives['font']['fluid'];
  max: keyof Primitives['font']['size'];
};

/* ------------------------------------------------------------- */
/* -- Size  ---------------------------------------------------- */
/* ------------------------------------------------------------- */

export type SizeCategory = keyof Primitives['sizes'];
export type SizeStep<TCategory extends SizeCategory> = keyof Primitives['sizes'][TCategory];

// Helper type to decouple the generic definition from the specific layout properties
// `dimension` is a primitive scale only: icon, target and layout tokens read it, nothing is named for it.
type BaseSemanticThemeSizes = {
  [K in Exclude<SizeCategory, 'dimension'>]: Record<string, string>;
};

export type SemanticThemeSizes = BaseSemanticThemeSizes & {
  layout: {
    'content-max': string;
    'popout-max': string;
  };
  // Keyboard focus ring: one definition for every component (D-032).
  'focus-ring': {
    width: keyof BaseSemanticThemeSizes['border-width'];
    offset: keyof BaseSemanticThemeSizes['border-width'];
  };
  target: { md: string; lg: string };
  icon: { xs: string; sm: string; md: string; lg: string; optical: string };
  'icon-inset': { md: string; lg: string };
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
