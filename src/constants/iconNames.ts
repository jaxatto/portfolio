export const iconNames = [
  'arrow-right',
  'arrow-top-right',
  'arrow-up',
  'cat',
  'controller',
  'download',
  'envelope-simple',
  'file-arrow-down',
  'github',
  'image',
  'linkedin',
  'moon',
  'paw',
  'sun'
] as const;

export type IconName = typeof iconNames[number];
