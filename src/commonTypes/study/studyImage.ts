export type StudyImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  // 'banner': 3:1 crop from tablet up, 16:9 on phones.
  variant?: 'default' | 'banner';
  corners?: 'round' | 'square' | string; // Allow any string for flexibility
};