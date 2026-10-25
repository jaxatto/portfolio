export type StudyImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  // 'banner': 3:1 crop from tablet up, 16:9 on phones. 'column': the 40rem reading column width, for a tall UI crop.
  variant?: 'default' | 'banner' | 'column';
  corners?: 'round' | 'square' | string; // Allow any string for flexibility
};