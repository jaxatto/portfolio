// Shared variant/color-palette logic used across components (Chip, ChipGroup,
// SkillCard, StudyCard, etc.) so they all agree on the same set of options.

import type { CSSProperties } from 'react';

export const VARIANTS = ['brand', 'primary', 'secondary', 'tertiary'] as const;

export type Variant = (typeof VARIANTS)[number];

export const isVariant = (value: unknown): value is Variant =>
	VARIANTS.includes(value as Variant);

// The 4 color roles every variant exposes in src/styles/variables.css, e.g.
// --color-primary-default, --color-primary-on-default, --color-primary-container,
// --color-primary-on-container.
export const VARIANT_COLOR_ROLES = [
	'default',
	'on-default',
	'container',
	'on-container',
] as const;

export type VariantColorRole = (typeof VARIANT_COLOR_ROLES)[number];

export type VariantCSSVars = CSSProperties &
	Record<`--variant-${VariantColorRole}`, string>;

// Maps a variant to generic `--variant-*` custom properties pointing at that variant's
// underlying `--color-{variant}-*` tokens. Apply the result as inline style on a
// component's root element, then reference `var(--variant-default)`, etc. in its
// stylesheet so switching the `variant`/`theme`/`palette` prop repaints all 4 color
// roles (default, on-default, container, on-container) at once.
export const getVariantVars = (variant: Variant): VariantCSSVars =>
	VARIANT_COLOR_ROLES.reduce(
		(vars, role) => ({
			...vars,
			[`--variant-${role}`]: `var(--color-${variant}-${role})`,
		}),
		{} as VariantCSSVars,
	);
