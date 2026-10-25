/* semanticGroups.ts */

// single source of truth for semantic color group names (type + runtime value)
export const colorGroups = [
  'brand',
  'primary',
  'secondary',
  'tertiary',
  // Teal. Added for the Home card ramp: purple, indigo, sky, teal (D-030).
  'quaternary',
] as const;

// single source of truth for light/dark mode keys (type + runtime value)
export const colorModes = ['light', 'dark'] as const;
