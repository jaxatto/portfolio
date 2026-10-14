export const iconNames = [
  'ai',
  'arrow-right',
  'arrow-top-right',
  'automation',
  'cat',
  'clouds',
  'component',
  'controller',
  'dog',
  'download',
  'file',
  'file-arrow-down',
  'github',
  'image',
  'linkedin',
  'moon',
  'paw',
  'pencil-ruler',
  'person',
  'sun'
] as const;

export type IconName = typeof iconNames[number];
