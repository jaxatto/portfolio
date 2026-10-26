/* defaultTheme.ts */

import { primitives } from './primitives';
import { withInteractionStates } from './colorSteps';
import { type BaseSemanticThemeColors, type SemanticTheme } from './types';

const theme: Omit<SemanticTheme, 'colors'> & {
  colors: BaseSemanticThemeColors;
} = {
  name: 'Default Theme',
  colors: {
    content: {
      default: {
        light: primitives.colors.purple[950],
        dark: primitives.colors.purple[50],
      },
      // Dark variant matches default so nav labels and the toggle share the page's purple-tinted white.
      variant: {
        light: primitives.colors.slate[900],
        dark: primitives.colors.purple[50],
      },
      // Role label: near-black like the nav in light, one step dimmer than default in dark. See D-019.
      secondary: {
        light: primitives.colors.slate[900],
        dark: primitives.colors.purple[200],
      },
      // Hero greeting and sentence: same as default in light, true white in dark. See D-019.
      // 98% white on dark so large white type isn't harsh (D-035).
      emphasis: {
        light: primitives.colors.purple[950],
        dark: primitives.colors['white-alpha-98'],
      },
      // Body copy on card and footer grounds: dark is white at 80% instead of a purple tint (D-035).
      soft: {
        light: primitives.colors.slate[900],
        dark: primitives.colors['white-alpha-80'],
      },
      // Long-form reading text (About): true black in light, the page's usual tint in dark (D-042).
      prose: {
        light: primitives.colors.black,
        dark: primitives.colors.purple[50],
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
      'on-accent': {
        light: primitives.colors.white,
        dark: primitives.colors['white-alpha-98'],
      },
      // Hover / pressed for interactive content on the accent ground: pale in both themes. D-022.
      'on-accent-hover': {
        light: primitives.colors.indigo[200],
        dark: primitives.colors.indigo[200],
      },
      'on-accent-active': {
        light: primitives.colors.indigo[300],
        dark: primitives.colors.indigo[300],
      },
    },
    surface: {
      default: {
        light: primitives.colors.white,
        dark: primitives.colors.night[900],
      },
      sunken: {
        light: primitives.colors.slate[200],
        dark: primitives.colors.night[800],
      },
      // Feature ground for full-bleed moments (the 404, the footer); content on it is content.on-accent. Same in both themes: indigo-950 vanished against the dark ground. D-022, D-024.
      accent: {
        light: primitives.colors.indigo[900],
        dark: primitives.colors.indigo[900],
      },
      // The 404's own ground: distinct from the page surface in both themes and a theme pair of its
      // own (indigo-900 light, one step lighter in dark so it separates from the night ground). D-038.
      error: {
        light: primitives.colors.indigo[900],
        dark: primitives.colors.indigo[800],
      },
    },
    border: {
      decorative: {
        light: primitives.colors.slate[300],
        dark: primitives.colors.night[700],
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
    quaternary: {
      default: {
        light: primitives.colors.teal[700],
        dark: primitives.colors.teal[300],
      },
      'on-quaternary': {
        light: primitives.colors.white,
        dark: primitives.colors.black,
      },
      'quaternary-container': {
        light: primitives.colors.teal[100],
        dark: primitives.colors.teal[800],
      },
      'on-quaternary-container': {
        light: primitives.colors.teal[900],
        dark: primitives.colors.teal[100],
      },
    },
    quinary: {
      default: {
        light: primitives.colors.green[700],
        dark: primitives.colors.green[300],
      },
      'on-quinary': {
        light: primitives.colors.white,
        dark: primitives.colors.black,
      },
      'quinary-container': {
        light: primitives.colors.green[100],
        dark: primitives.colors.green[800],
      },
      'on-quinary-container': {
        light: primitives.colors.green[900],
        dark: primitives.colors.green[100],
      },
    },
    state: {
      'focus-ring': {
        light: primitives.colors.purple[950],
        dark: primitives.colors['white-alpha-98'],
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
      full: primitives.sizes.radius.full,
    },
    space: {
      none: primitives.sizes.space[0],
      '2xs': primitives.sizes.space[2],
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
    layout: {
      gutter: 'lg',
      'content-max': primitives.sizes.dimension[640],
      // Site content column: 960px (D-029).
      'popout-max': primitives.sizes.dimension[960],
    },
    // 3px ring, 3px offset: thicker than Figma's 2/2 (D-014, D-032).
    'focus-ring': {
      width: primitives.sizes['border-width'][3],
      offset: primitives.sizes['border-width'][3],
    },
    // Smallest comfortable hit area for an icon-only control (md), and the height of the nav row (lg).
    target: {
      md: primitives.sizes.dimension[40],
      lg: primitives.sizes.dimension[44],
    },
    // Icon glyphs drawn at a fixed size (the em-sized ones in Button, TextLink and StudyCard follow their text).
    icon: {
      sm: primitives.sizes.dimension[16],
      md: primitives.sizes.dimension[24],
      lg: primitives.sizes.dimension[28],
    },
    'border-width': {
      none: primitives.sizes['border-width'][0],
      thin: primitives.sizes['border-width'][1],
      default: primitives.sizes['border-width'][2],
      // The accent line, the outline button and the focus ring are all 3px.
      thick: primitives.sizes['border-width'][3],
    },
  },
  font: {
    family: {
      heading: primitives.font.family.inter,
      body: primitives.font.family.manrope,
      decorative: primitives.font.family.manrope,
      mono: primitives.font.family['roboto-mono'],
    },
    // Named by role, never by value. Fluid body and heading sizes are the type styles below.
    size: {
      label: primitives.font.size[14],
      control: primitives.font.size[16],
      lead: primitives.font.size[32],
      'card-title-compact': primitives.font.size[28],
      'card-title': primitives.font.size[36],
      'display-sm': primitives.font.size[48],
      display: primitives.font.size[56],
    },
    weight: {
      subtle: primitives.font.weight.light,
      default: primitives.font.weight.regular,
      // Body copy on tinted grounds (card paragraphs): 400 read thin there. Manrope 500 is loaded. D-033.
      medium: primitives.font.weight.medium,
      emphasis: primitives.font.weight.bold,
      // NOTE: Figma sets Manrope text to 900, but Manrope stops at 800 (D-010). Use this for Manrope
      // bold text such as nav items and links; `strong` (900) is for Inter headings.
      'extra-strong': primitives.font.weight.extrabold,
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
      // Hover distance for links: the line moves from `md` out to `lg` (D-015).
      lg: primitives.font['text-underline-offset']['4'],
    },
    styles: {
      'title-md': {
        family: 'heading',
        size: {
          min: 40,
          preferred: 'rem-100-vw-140',
          max: 56,
        },
        weight: 'strong',
        'line-height': 'compact',
      },
      'title-sm': {
        family: 'heading',
        size: {
          min: 32,
          preferred: 'rem-125-vw-200',
          max: 40,
        },
        weight: 'strong',
        'line-height': 'compact',
      },
      'heading-lg': {
        family: 'heading',
        size: {
          min: 24,
          preferred: 'rem-100-vw-140',
          max: 32,
        },
        weight: 'strong',
        'line-height': 'compact',
      },
      'heading-md': {
        family: 'heading',
        size: {
          min: 20,
          preferred: 'rem-110-vw-070',
          max: 24,
        },
        weight: 'strong',
        'line-height': 'compact',
      },
      'heading-sm': {
        family: 'heading',
        size: {
          min: 16,
          preferred: 'rem-110-vw-070',
          max: 20,
        },
        weight: 'strong',
        'line-height': 'compact',
      },
      'body-lg': {
        family: 'body',
        size: {
          min: 16,
          preferred: 'rem-088-vw-140',
          max: 24,
        },
        weight: 'default',
        'line-height': 'default',
      },
      'body-md': {
        family: 'body',
        size: {
          min: 16,
          preferred: 'rem-088-vw-070',
          max: 20,
        },
        weight: 'default',
        'line-height': 'default',
      },
      'body-sm': {
        family: 'body',
        size: {
          min: 14,
          preferred: 'rem-080-vw-035',
          max: 16,
        },
        weight: 'default',
        'line-height': 'default',
      },
    },
  },
};

const colors = withInteractionStates(theme.colors);

export const defaultTheme: SemanticTheme = {
  ...theme,
  colors,
};
