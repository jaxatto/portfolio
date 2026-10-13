/* semanticGroups.ts */

// single source of truth for semantic color group names (type + runtime value)
export const colorGroups = [
	'brand',
	'primary',
	'secondary',
	'tertiary',
] as const;

// single source of truth for light/dark mode keys (type + runtime value)
export const colorModes = ['light', 'dark'] as const;
