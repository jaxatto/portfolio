export type StudyImageProps = {
  src: string;
  alt: string;
  width?: number; // Pixel size of `src`, so the browser reserves the space before it loads
  height?: number;
  caption?: string;
  className?: string;
  // 'banner': 3:1 crop from tablet up, 16:9 on phones. 'column': the 40rem reading column width, for a tall UI crop.
  variant?: 'default' | 'banner' | 'column';
  priority?: boolean; // The first image on the page: load now, not when it nears the viewport
  corners?: 'round' | 'square' | string; // Allow any string for flexibility
};
