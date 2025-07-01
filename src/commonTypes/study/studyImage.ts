export type StudyImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  corners?: 'round' | 'square' | string; // Allow any string for flexibility
};