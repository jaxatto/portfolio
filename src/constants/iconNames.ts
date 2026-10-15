export const iconNames = [
  'arrow-right',
  'arrow-top-right',
  'cat',
  'controller',
  'download',
  'file-arrow-down',
  'github',
  'image',
  'linkedin',
  'moon',
  'paw',
  'sun'
] as const;

export type IconName = typeof iconNames[number];
