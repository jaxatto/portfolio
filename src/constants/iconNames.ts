export const iconNames = [
  'ai',
  'arrow-right',
  'arrow-top-right',
  'cat',
  'clouds',
  'component',
  'controller',
  'dog',
  'download',
  'image',
  'paw',
  'pencil-ruler',
  'person'
] as const;

export type IconName = typeof iconNames[number];
